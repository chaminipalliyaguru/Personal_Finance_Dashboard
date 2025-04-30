<script>
    let title = '';
    let amount = '';
    let category = '';
    let date = '';
  
    function handleSubmit(event) {
      event.preventDefault();
  
      const newExpense = {
        title,
        amount: parseFloat(amount),
        category,
        date
      };
  
      console.log('New Expense:', newExpense);
  
      // Clear fields
      title = '';
      amount = '';
      category = '';
      date = '';
    }
  </script>
  
  <div class="max-w-md mx-auto mt-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
    <h2 class="text-2xl font-bold mb-4 text-red-700">Add New Expense</h2>
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
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
        class="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
      >
        Add Expense
      </button>
    </form>
  </div>
  