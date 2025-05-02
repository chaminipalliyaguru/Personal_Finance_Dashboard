<script lang="ts">
	import type { IncomeEntry } from '../../../types/types';

	export let entry: IncomeEntry;
	export let index: number;
	export let deleteEntry: (index: number) => void;
	export let editEntry: (index: number) => void;
</script>

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
