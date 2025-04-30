<script>
    let source = '';
    let amount = '';
    let date = '';
  
    function handleSubmit(event) {
      event.preventDefault();
  
      const newIncome = {
        source,
        amount: parseFloat(amount),
        date,
      };
  
      console.log('New Income:', newIncome);
  
      // Clear fields
      source = '';
      amount = '';
      date = '';
    }
  </script>
  
  <div class="max-w-md mx-auto mt-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
    <h2 class="text-2xl font-bold mb-4 text-blue-900">Add New Income</h2>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label class="block text-gray-700">Source</label>
        <input
          type="text"
          bind:value={source}
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <div>
        <label class="block text-gray-700">Amount</label>
        <input
          type="number"
          bind:value={amount}
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min="0"
        />
      </div>
  
      <div>
        <label class="block text-gray-700">Date</label>
        <input
          type="date"
          bind:value={date}
          class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
      >
        Add Income
      </button>
    </form>
  </div>
  