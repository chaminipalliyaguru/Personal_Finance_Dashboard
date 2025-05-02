<script>
	import { browser } from '$app/environment';
  	import NewExpenses from '../../components/newExpenses.svelte';
	import { editableExpense } from '../../store/expenseStore';

	let showComponent = false;
	let expenseList = [];
	let filteredList = [];
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

		expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];
		filteredList = [...expenseList];
	}

	function filterByDate() {
		if (!fromDate || !toDate) {
			filteredList = [...expenseList];
			return;
		}

		filteredList = expenseList.filter(entry => {
			const entryDate = new Date(entry.date);
			return entryDate >= new Date(fromDate) && entryDate <= new Date(toDate);
		});
	}

	function deleteEntry(index) {
		if (confirm('Are you sure you want to delete this entry?')) {
			expenseList.splice(index, 1);
			localStorage.setItem('incomeList', JSON.stringify(expenseList));
			filterByDate();
		}
	}

	function editEntry(index) {
		editableExpense.set(filteredList[index]); 
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
<div class="max-w-3xl mx-auto p-6">

	<!-- Top Bar -->
	<div class="flex justify-between items-center mb-6">
		<div class="space-x-4">
			<input
				type="date"
				bind:value={fromDate}
				class="border rounded px-3 py-1"
				placeholder="From"
				on:change={filterByDate}
			/>
			<input
				type="date"
				bind:value={toDate}
				class="border rounded px-3 py-1"
				placeholder="To"
				on:change={filterByDate}
			/>
		</div>

		<button
			on:click={handleClick}
			class="rounded bg-red-600 px-6 py-2 font-semibold text-white shadow hover:bg-red-700 transition duration-200"
		>
			Add Expense
		</button>
	</div>

	<!-- Records Section -->
	{#if filteredList.length > 0}
		{#each filteredList as entry, index}
			<div class="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white relative">
				<div class="absolute top-2 right-2 space-x-2">
					<button on:click={() => editEntry(index)} title="Edit" class="text-blue-500 hover:text-blue-700">
						✏️
					</button>
					<button on:click={() => deleteEntry(index)} title="Delete" class="text-red-500 hover:text-red-700">
						🗑️
					</button>
				</div>
				<p class="font-bold text-blue-700">Record {index + 1}</p>
				<p><span class="font-semibold">Source:</span> {entry.title}</p>
				<p><span class="font-semibold">Amount:</span> {entry.amount}</p>
				<p><span class="font-semibold">Date:</span> {entry.date}</p>
			</div>
		{/each}
	{:else}
		<p class="text-gray-500">No income records found for selected range.</p>
	{/if}
</div>
{/if}
