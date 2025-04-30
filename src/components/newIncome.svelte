<script>
	let source = '';
	let amount = '';
	let date = '';
	let output = '';

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

		// Clear fields
		source = '';
		amount = '';
		date = '';
	
		// localStorage.setItem("source", source);
		// localStorage.setItem("amount", amount);
		// localStorage.setItem("date",date);
  }

// 	function getLocalData() {
// 		const source = localStorage.getItem('source');
// 		const amount = localStorage.getItem('amount');
// 		const date = localStorage.getItem('date');

// 		output = `
//     <strong>Source:</strong> ${source}<br>
//     <strong>Amount:</strong> ${amount}<br>
//     <strong>Date:</strong> ${date}
//   `;
// 	}

// Get and show all income entries

// function getLocalData() {
// 		const data = JSON.parse(localStorage.getItem('incomeList')) || [];

// 		if (data.length === 0) {
// 			output = '<p>No income records found.</p>';
// 			return;
// 		}

// 		output = data
// 			.map(
// 				(entry, index) => `
// 					<p><strong>Record ${index + 1}</strong><br>
// 					Source: ${entry.source}<br>
// 					Amount: ${entry.amount}<br>
// 					Date: ${entry.date}</p><hr>
// 				`
// 			)
// 			.join('');
// 	}


</script>

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

<!-- {@html output} -->
