<script lang="ts">
	import { browser } from '$app/environment';
	import NewExpenses from '../../components/newExpenses.svelte';
	import { editableExpense } from '../../store/expenseStore';
	import type { ExpenseEntry } from '../../types/types';

	let showComponent = false;
	let expenseList: ExpenseEntry[] = [];
	let filteredList: ExpenseEntry[] = [];
	let fromDate = '';
	let toDate = '';

	function handleClick() {
		editableExpense.set(null);
		showComponent = true;
	}

	function handleCloseForm() {
		showComponent = false;
	}

	function loadData() {
		if (!browser) return;
		
		const storedData = localStorage.getItem('expenseList')
		expenseList = storedData ? JSON.parse(storedData) : [];
		filteredList = [...expenseList];
	}

	function filterByDate() {
		if (!fromDate || !toDate) {
			filteredList = [...expenseList];
			return;
		}

		filteredList = expenseList.filter((entry) => {
			const entryDate = new Date(entry.date);
			return entryDate >= new Date(fromDate) && entryDate <= new Date(toDate);
		});
	}

	function deleteEntry(index: number) {
		if (confirm('Are you sure you want to delete this entry?')) {
			expenseList.splice(index, 1);
			localStorage.setItem('incomeList', JSON.stringify(expenseList));
			filterByDate();
		}
	}

	function editEntry(index: number) {
		const entry = expenseList[index];
		if (!entry) return;
		editableExpense.set(entry);
		showComponent = true;
	}

	$: if (!showComponent && browser) {
		loadData();
	}
</script>

{#if showComponent}
	<NewExpenses on:close={handleCloseForm} />
{:else}
	<!-- Page Container -->
	<div class="mx-auto max-w-3xl p-6 dark:bg-gray-800 dark:text-gray-200">
		<!-- Top Bar -->
		<div class="mb-6 flex items-center justify-between">
			<div class="space-x-4">
				<input
					type="date"
					bind:value={fromDate}
					class="rounded border px-3 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
					placeholder="From"
					on:change={filterByDate}
				/>
				<input
					type="date"
					bind:value={toDate}
					class="rounded border px-3 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
					placeholder="To"
					on:change={filterByDate}
				/>
			</div>

			<button
				on:click={handleClick}
				class="rounded bg-red-600 px-6 py-2 font-semibold text-white shadow transition duration-200 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
			>
				Add Expense
			</button>
		</div>

		<!-- Records Section -->
		{#if filteredList.length > 0}
			{#each filteredList as entry, index}
				<div
					class="relative mb-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700"
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
					<p><span class="font-semibold">Source:</span> {entry.title}</p>
					<p><span class="font-semibold">Amount:</span> {entry.amount}</p>
					<p><span class="font-semibold">Date:</span> {entry.date}</p>
				</div>
			{/each}
		{:else}
			<p class="text-gray-500 dark:text-gray-400">No income records found for selected range.</p>
		{/if}
	</div>
{/if}
