<script lang="ts">
	import Investing from "../routes/income/+page.svelte";
	import { editableIncome } from "../store/incomeStore";
	import { onMount } from "svelte";

	let source = '';
	let amount = '';
	let date = '';
	let title = '';
	let output = false;
	let successMessage = '';
	let isEditMode = false;
	let editIndex = -1;

	onMount(() => {
		const storedEditable = $editableIncome;
		if (storedEditable && storedEditable.source && storedEditable.date) {
			source = storedEditable.title;
			amount = storedEditable.amount;
			date = storedEditable.date;
			isEditMode = true;

			// Find the index of the income item to update
			const existingList = JSON.parse(localStorage.getItem('incomeList')) || [];
			editIndex = existingList.findIndex(
				(income) =>
					income.title === storedEditable.source &&
					income.amount === storedEditable.amount &&
					income.date === storedEditable.date
			);
		}
	});

	function setLocalData() {
		let existingList = JSON.parse(localStorage.getItem('incomeList')) || [];

		const updatedIncome = {
			title,
			amount: parseFloat(amount),
			date
		};

		if (isEditMode && editIndex !== -1) {
			// Update existing income
			existingList[editIndex] = updatedIncome;
			successMessage = 'Income successfully updated!';
		} else {
			// Add new income
			existingList.push(updatedIncome);
			successMessage = 'Income successfully added!';
		}

		localStorage.setItem('incomeList', JSON.stringify(existingList));

		output = true;
		setTimeout(() => {
			successMessage = '';
		}, 3000);

		// Clear fields and reset edit mode
		title = '';
		amount = '';
		date = '';
		isEditMode = false;
		editIndex = -1;
		editableIncome.set({}); // Clear editableIncome store
	}

	function closeForm() {
		output = true;
	}
</script>

{#if output}
	<p class="text-xl font-semibold bg-green-100 text-green-800 rounded-lg text-center shadow-md animate-fade-in">
		{successMessage}
	</p>
	<Investing />
{:else}
	<div class="relative mx-auto mt-6 max-w-md rounded bg-white px-8 pt-6 pb-8 shadow-md">
		<!-- Cross Icon -->
		<button on:click={closeForm} class="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl font-bold">
			&times;
		</button>

		<h2 class="mb-4 text-2xl font-bold text-blue-900">
			{isEditMode ? 'Edit Income' : 'Add New Income'}
		</h2>

		<form on:submit|preventDefault={setLocalData} class="space-y-4">
			<div>
				<label class="block text-gray-700">Source</label>
				<input
					type="text"
					bind:value={title}
					class="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					required
				/>
			</div>

			<div>
				<label class="block text-gray-700">Amount</label>
				<input
					type="number"
					bind:value={amount}
					class="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					required
					min="0"
				/>
			</div>

			<div>
				<label class="block text-gray-700">Date</label>
				<input
					type="date"
					bind:value={date}
					class="w-full rounded border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					required
				/>
			</div>

			<button
				type="submit"
				class="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
			>
				{isEditMode ? 'Update Income' : 'Add Income'}
			</button>
		</form>
	</div>
{/if}
