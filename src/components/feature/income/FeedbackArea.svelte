<script lang="ts">
	export let fromDate: string = '';
	export let toDate: string = '';
	export let filterByDate: () => void;
</script>

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
