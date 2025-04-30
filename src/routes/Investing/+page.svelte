<script>
	let source = '';
	let amount = '';
	let date = '';
	let output = '';

	function handleSubmit(event) {
		event.preventDefault();

		const newIncome = {
			source,
			amount: parseFloat(amount),
			date
		};

		console.log('New Income:', newIncome);

		// Clear fields
		source = '';
		amount = '';
		date = '';
	}

	function setLocalData() {
		localStorage.setItem("source", source);
		localStorage.setItem("amount", amount);
		localStorage.setItem("date",date);
  }

	function getLocalData() {
		const source = localStorage.getItem('source');
		const amount = localStorage.getItem('amount');
		const date = localStorage.getItem('date');

		output = `
    <strong>Source:</strong> ${source}<br>
    <strong>Amount:</strong> ${amount}<br>
    <strong>Date:</strong> ${date}
  `;
	}
</script>

<div class="mx-auto mt-6 max-w-md rounded bg-white px-8 pt-6 pb-8 shadow-md">
	<h2 class="mb-4 text-2xl font-bold text-blue-900">Add New Income</h2>
	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
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
	<button
		on:click={getLocalData}
		class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700">Get Local Data</button
	>
</div>

{@html output}
