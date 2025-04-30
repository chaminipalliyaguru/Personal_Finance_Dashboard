<script>
	import NewIncome from '../../components/newIncome.svelte';

	let showComponent = false;
	let source = '';
	let amount = '';
	let date = '';
	let output = '';

	function handleClick() {
		showComponent = true;
	}

	function getLocalData() {
		const data = JSON.parse(localStorage.getItem('incomeList')) || [];

		if (data.length === 0) {
			output = '<p class="text-gray-500">No income records found.</p>';
			return;
		}

		output = data
			.map(
				(entry, index) => `
					<div class="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
						<p class="font-bold text-blue-700">Record ${index + 1}</p>
						<p><span class="font-semibold">Source:</span> ${entry.source}</p>
						<p><span class="font-semibold">Amount:</span> ${entry.amount}</p>
						<p><span class="font-semibold">Date:</span> ${entry.date}</p>
					</div>
				`
			)
			.join('');
	}

	// Show all data when Add Income is not clicked
	$: if (!showComponent) {
		getLocalData();
	}
</script>

<!-- Page Container -->
<div class="max-w-3xl mx-auto p-6">

	<!-- Top Bar -->
	<div class="flex justify-end mb-6">
		<button
			type="submit"
			on:click={handleClick}
			class="rounded bg-blue-600 px-6 py-2 font-semibold text-white shadow hover:bg-blue-700 transition duration-200"
		>
			Add Income
		</button>
	</div>

	<!-- Conditional Component -->
	{#if showComponent}
		<NewIncome />
	{/if}

	<!-- Output Section -->
	<div class="space-y-4">
		{@html output}
	</div>

</div>
