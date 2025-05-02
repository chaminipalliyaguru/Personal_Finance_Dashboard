<script lang="ts">
	import { createEventDispatcher, type EventDispatcher } from 'svelte';
	import type { FilterOptions } from '../../../types/types';

	export let fromDate: string;
	export let toDate: string;
	export let filterByDate: () => void;

	const dispatch: EventDispatcher<{ dateChange: FilterOptions }> = createEventDispatcher();

	function handleDateChange() {
		dispatch('dateChange', { fromDate, toDate });
		filterByDate();
	}
</script>

<section>
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
					on:change={handleDateChange}
				/>
			</div>
			<div>
				<p class="text-sm">To:</p>
				<input
					type="date"
					bind:value={toDate}
					class="rounded border bg-gray-100 px-3 py-1 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
					placeholder="To"
					on:change={handleDateChange}
				/>
			</div>
		</div>
	</div>
</section>
