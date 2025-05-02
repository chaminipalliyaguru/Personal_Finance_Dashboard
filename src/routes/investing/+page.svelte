<script lang="ts">
	import { browser } from '$app/environment';
	import NewIncome from '../../components/newIncome.svelte';
	import { editableIncome } from '../../store/incomeStore';
	import type { IncomeEntry } from '../../types/types';

	let showComponent = false;
	let incomeList: IncomeEntry[] = [];
	let filteredList: IncomeEntry[] = [];
	let fromDate: Date | null = null;
	let toDate: Date | null = null;

	function handleClick() {
		editableIncome.set(null);
		showComponent = true;
	}

	function handleCloseForm() {
		showComponent = false;
	}

	function loadData() {
		if (!browser) return;
		// get the data from local storage
		const storedData = localStorage.getItem('incomeList');
		incomeList = storedData ? JSON.parse(storedData) : [];
		filteredList = [...incomeList];
	}

	function filterByDate() {
		if (!fromDate || !toDate) {
			filteredList = [...incomeList];
			return;
		}

		filteredList = incomeList.filter((entry) => {
			const entryDate = new Date(entry.date);
			return entryDate >= new Date(fromDate) && entryDate <= new Date(toDate);
		});
	}

	function deleteEntry(index: number) {
		if (confirm('Are you sure you want to delete this entry?')) {
			incomeList.splice(index, 1);
			localStorage.setItem('incomeList', JSON.stringify(incomeList));
			filterByDate();
		}
	}

	function editEntry(index: number) {
		const entry = incomeList[index];
		if (!entry) return;
		editableIncome.set(entry);
		showComponent = true;
	}

	$: if (!showComponent && browser) {
		loadData();
	}
</script>

{#if showComponent}
	<div class="m-5">
		<NewIncome on:close={handleCloseForm} />
	</div>
{:else}
	<!-- Updated styles for dark mode -->
	<div
		class="mx-auto mt-12 max-w-3xl bg-white p-6 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
	>
		<button
			on:click={handleClick}
			class="my-5 cursor-pointer rounded bg-blue-600 px-6 py-2 font-semibold text-white shadow transition duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
		>
			Add Income
		</button>
		<!-- Top Bar -->
		<p class="text-sm">Filter Records by Date:</p>
		<div class="mb-6 flex items-center justify-between">
			<div class="items-center space-x-4 md:flex">
				<div>
					<p class="text-sm">From:</p>
					<input
						type="date"
						bind:value={fromDate}
						class="rounded border bg-gray-100 px-3 py-1 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
						placeholder="From"
						on:change={filterByDate}
					/>
				</div>
				<div>
					<p class="text-sm">To:</p>
					<input
						type="date"
						bind:value={toDate}
						class="rounded border bg-gray-100 px-3 py-1 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
						placeholder="To"
						on:change={filterByDate}
					/>
				</div>
			</div>
		</div>

		<!-- Records Section -->
		{#if filteredList.length > 0}
			{#each filteredList as entry, index}
				<div
					class="relative mb-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-800"
				>
					<div class="absolute top-2 right-2 space-x-2">
						<button
							on:click={() => editEntry(index)}
							title="Edit"
							class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
						>
							✏️
						</button>
						<button
							on:click={() => deleteEntry(index)}
							title="Delete"
							class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
						>
							🗑️
						</button>
					</div>
					<p class="font-bold text-blue-700 dark:text-blue-400">Record {index + 1}</p>
					<p><span class="font-semibold">Source:</span> {entry.source}</p>
					<p><span class="font-semibold">Amount:</span> {entry.amount}</p>
					<p><span class="font-semibold">Date:</span> {entry.date}</p>
				</div>
			{/each}
		{:else}
			<p class="text-gray-500 dark:text-gray-400">No income records found for selected range.</p>
			<!--  clear filter button -->
			{#if fromDate || toDate}
				<button
					on:click={() => {
						fromDate = '';
						toDate = '';
						filterByDate();
					}}
					class="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
				>
					Clear Filter
				</button>
			{/if}
		{/if}
	</div>
{/if}
