<script>
    import Expense from "../routes/Payments/+page.svelte"

    let title = '';
    let amount = '';
    let category = '';
    let date = '';
    let output = false;
	let successMessage = '';


	function setLocalData() {
		
		const expenseList = {
			title,
			amount: parseFloat(amount),
			category,
            date
		};

		console.log('New Income:', expenseList);

		// Get existing list from local storage or initialize
		let existingList = JSON.parse(localStorage.getItem('expenseList')) || [];

		// Add new entry
		existingList.push(expenseList);

		// Save back to local storage
		localStorage.setItem('expenseList', JSON.stringify(existingList));
		successMessage = 'Expense successfully added!';
		output = true;

		// Remove message after 3 seconds
		setTimeout(() => {
			successMessage = '';
		}, 3000);

  
      // Clear fields
      title = '';
      amount = '';
      category = '';
      date = '';
    }
  </script>
  

  {#if output}
		<p class="text-xl font-semibold bg-green-100 border text-green-800 rounded-lg text-center shadow-md animate-fade-in">{successMessage}</p>
	<Expense />
{:else}


  <div class="max-w-md mx-auto mt-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
    <h2 class="text-2xl font-bold mb-4 text-red-700">Add New Expense</h2>
    <form on:submit|preventDefault={setLocalData} class="space-y-4">
      <div>
        <label class="block text-gray-700">Title</label>
        <input
          type="text"
          bind:value={title}
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>
  
      <div>
        <label class="block text-gray-700">Amount</label>
        <input
          type="number"
          bind:value={amount}
          min="0"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>
  
      <div>
        <label class="block text-gray-700">Category</label>
        <input
          type="text"
          bind:value={category}
          placeholder="e.g. Food, Travel, Bills"
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>
  
      <div>
        <label class="block text-gray-700">Date</label>
        <input
          type="date"
          bind:value={date}
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
      </div>
  
      <button
        type="submit"
        on:click={setLocalData}
        class="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
      >
        Add Expense
      </button>
    </form>
  </div>
  {/if}