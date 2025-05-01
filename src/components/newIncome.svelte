<script>
	import Investing from "../routes/Investing/+page.svelte";

	let source = '';
	let amount = '';
	let date = '';
	let output = false;
	let successMessage = '';


	function setLocalData() {
		
		const newIncome = {
			source,
			amount: parseFloat(amount),
			date
		};

		console.log('New Income:', newIncome);

		// Get existing list from local storage or initialize
		let existingList = JSON.parse(localStorage.getItem('incomeList')) || [];

		// Add new entry
		existingList.push(newIncome);

		// Save back to local storage
		localStorage.setItem('incomeList', JSON.stringify(existingList));
		successMessage = 'Income successfully added!';
		output = true;

		// Remove message after 3 seconds
		setTimeout(() => {
			successMessage = '';
		}, 3000);


		// Clear fields
		source = '';
		amount = '';
		date = '';		
  }

</script>



{#if output}
		<p class="text-xl font-semibold bg-green-100 border text-green-800 rounded-lg text-center shadow-md animate-fade-in">{successMessage}</p>
	<Investing />
{:else}


<div class="mx-auto mt-6 max-w-md rounded bg-white px-8 pt-6 pb-8 shadow-md">
	<h2 class="mb-4 text-2xl font-bold text-blue-900">Add New Income</h2>
	<form on:submit|preventDefault={setLocalData} class="space-y-4">
		<div>
			<label class="block text-gray-700">Source</label>
			<input
				type="text"
				bind:value={source}
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
			on:click={setLocalData}
			class="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
		>
			Add Income
		</button>
	</form>		
</div>
{/if}
