<script lang="ts">
	import { browser } from '$app/environment';
	import AddIncomButton from '../../components/feature/income/AddIncomButton.svelte';
	import DateFilter from '../../components/feature/income/DateFilter.svelte';
	import FeedbackArea from '../../components/feature/income/FeedbackArea.svelte';
	import IncomeMethodItem from '../../components/feature/income/IncomeMethodItem.svelte';
	import NewIncome from '../../components/newIncome.svelte';
	import { editableIncome } from '../../store/incomeStore';
	import type { FilterOptions, IncomeEntry } from '../../types/types';

	let showNewIncomeComponent = false;
	let incomeList: IncomeEntry[] = [];
	let filteredList: IncomeEntry[] = [];
	let fromDate: string = '';
	let toDate: string = '';

	function handleNewIncomeCreate() {
		editableIncome.set(null);
		showNewIncomeComponent = true;
	}

	function handleCloseForm() {
		showNewIncomeComponent = false;
	}

	function loadData() {
		if (!browser) return;

		// get the data from local storage
		const storedData = localStorage.getItem('incomeList');
		incomeList = storedData ? JSON.parse(storedData) : [];
		filteredList = [...incomeList];
	}

	function handleDateChange(event: CustomEvent<FilterOptions>) {
		fromDate = event.detail.fromDate;
		toDate = event.detail.toDate;
	}

	function filterByDate() {
		if (!fromDate || !toDate) {
			filteredList = [...incomeList];
			return;
		}

		if (new Date(fromDate) > new Date(toDate)) {
			alert('Invalid date range. Please select a valid range.');
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

	function clearFilter() {
		fromDate = '';
		toDate = '';
		filteredList = [...incomeList];
	}

	function editEntry(index: number) {
		const entry = incomeList[index];
		if (!entry) return;
		editableIncome.set(entry);
		showNewIncomeComponent = true;
	}

	$: if (!showNewIncomeComponent && browser) {
		loadData();
	}
</script>

{#if showNewIncomeComponent}
	<div class="m-5">
		<NewIncome on:close={handleCloseForm} />
	</div>
{:else}
	<!-- Updated styles for dark mode -->
	<div
		class="mx-auto mt-12 max-w-3xl bg-white p-6 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
	>
	<div class="grid grid-cols-2">
		<div>
		<!-- Date Filter Component -->
		{#if incomeList.length > 0}
			<DateFilter bind:fromDate bind:toDate {filterByDate} on:dateChange={handleDateChange} />
		{:else}
			<p class="text-gray-500 dark:text-gray-400">No income records available.</p>
		{/if}
	</div>

		<div class="ml-56">
		<!-- Add income button -->
		<AddIncomButton {handleNewIncomeCreate} />
	</div>
	</div>

		<!-- Records Section -->
		{#if filteredList.length > 0}
			{#each filteredList as entry, index}
				<IncomeMethodItem {entry} {index} {deleteEntry} {editEntry} />
			{/each}
		{:else}
		<FeedbackArea {fromDate} {toDate} {clearFilter} />
		{/if}
	</div>
{/if}
