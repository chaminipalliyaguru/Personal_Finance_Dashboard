<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { editableExpense } from "../store/expenseStore";

	const dispatch = createEventDispatcher();

	let title = '';
	let amount = '';
	let category = '';
	let date = '';
	let isEditMode = false;
	let output = false;
	let successMessage = '';
	let originalIndex = null;

	// Close form
	function closeForm() {
		editableExpense.set(null);
		dispatch('close');
	}

	onMount(() => {
		const unsubscribe = editableExpense.subscribe(data => {
			if (data) {
				title = data.title;
				amount = data.amount;
				category = data.category || '';
				date = data.date;
				isEditMode = true;

				const existingList = JSON.parse(localStorage.getItem('expenseList')) || [];
				originalIndex = existingList.findIndex(item =>
					item.title === data.title &&
					item.amount === data.amount &&
					item.date === data.date
				);
			}
		});
		return unsubscribe;
	});

	function setLocalData() {
		const newEntry = { title, amount: parseFloat(amount), category, date };
		let existingList = JSON.parse(localStorage.getItem('expenseList')) || [];

		if (isEditMode && originalIndex !== null && originalIndex > -1) {
			existingList[originalIndex] = newEntry;
			successMessage = 'Expense successfully updated!';
		} else {
			existingList.push(newEntry);
			successMessage = 'Expense successfully added!';
		}

		localStorage.setItem('expenseList', JSON.stringify(existingList));
		output = true;

		setTimeout(() => {
			successMessage = '';
			closeForm(); // go back after success
		}, 2000);
	}
</script>

{#if output}
	<p class="text-xl font-semibold bg-green-100 text-green-800 rounded-lg text-center shadow-md animate-fade-in">{successMessage}</p>
{:else}
<div class="relative max-w-md mx-auto mt-6 bg-white shadow-md rounded px-8 pt-6 pb-8">

	<!-- ❌ Cross icon -->
	<button class="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl" on:click={closeForm} title="Close">
		&times;
	</button>

	<h2 class="text-2xl font-bold mb-4 text-red-700">Add New Expense</h2>

	<form on:submit|preventDefault={setLocalData} class="space-y-4">
		<!-- Form Fields -->
		<!-- Title -->
		<div>
			<label class="block text-gray-700">Title</label>
			<input type="text" bind:value={title} class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500" required />
		</div>

		<!-- Amount -->
		<div>
			<label class="block text-gray-700">Amount</label>
			<input type="number" bind:value={amount} min="0" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500" required />
		</div>

		<!-- Category -->
		<div>
			<label class="block text-gray-700">Category</label>
			<input type="text" bind:value={category} class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500" required />
		</div>

		<!-- Date -->
		<div>
			<label class="block text-gray-700">Date</label>
			<input type="date" bind:value={date} class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500" required />
		</div>

		<!-- Submit -->
		<button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">
			{isEditMode ? 'Update Expense' : 'Add Expense'}
		</button>
	</form>
</div>
{/if}
