<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    function createGoalsStore() {
      const storedGoals = JSON.parse(localStorage.getItem('savingsGoals') || '[]');
      const { subscribe, set, update } = writable(storedGoals);
  
      subscribe(value => {
        localStorage.setItem('savingsGoals', JSON.stringify(value));
      });
  
      return {
        subscribe,
        set,
        update
      };
    }
  
    let goals = createGoalsStore();
    let goalName = '';
    let targetAmount = '';
    let savedAmount = '';
    let targetDate = '';
    let editIndex = null;
  
    function addOrUpdateGoal() {
      const newGoal = {
        name: goalName,
        target: parseFloat(targetAmount),
        saved: parseFloat(savedAmount) || 0,
        date: targetDate
      };
  
      goals.update(currentGoals => {
        if (editIndex !== null) {
          currentGoals[editIndex] = newGoal;
          editIndex = null;
        } else {
          currentGoals.push(newGoal);
        }
        return [...currentGoals];
      });
  
      goalName = targetAmount = savedAmount = targetDate = '';
    }
  
    function editGoal(index) {
      goals.subscribe(gs => {
        const goal = gs[index];
        goalName = goal.name;
        targetAmount = goal.target;
        savedAmount = goal.saved;
        targetDate = goal.date;
        editIndex = index;
      })();
    }
  
    function deleteGoal(index) {
      goals.update(gs => gs.filter((_, i) => i !== index));
    }
  </script>
  
  <div class="p-4 max-w-xl mx-auto">
    <h2 class="text-xl font-bold mb-4">Add or Edit Savings Goal</h2>
    <form on:submit|preventDefault={addOrUpdateGoal} class="space-y-2">
      <input placeholder="Goal name" bind:value={goalName} class="w-full p-2 border rounded" />
      <input type="number" placeholder="Target amount" bind:value={targetAmount} class="w-full p-2 border rounded" />
      <input type="number" placeholder="Saved amount (optional)" bind:value={savedAmount} class="w-full p-2 border rounded" />
      <input type="date" bind:value={targetDate} class="w-full p-2 border rounded" />
      <button class="bg-blue-500 text-white px-4 py-2 rounded">{editIndex !== null ? 'Update Goal' : 'Add Goal'}</button>
    </form>
  
    <h2 class="text-xl font-bold mt-8 mb-4">Savings Goals</h2>
    <table class="w-full border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 text-left">Goal Name</th>
          <th class="p-2 text-left">Target</th>
          <th class="p-2 text-left">Saved</th>
          <th class="p-2 text-left">Progress</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each $goals as goal, index}
          <tr class="border-t">
            <td class="p-2">{goal.name}</td>
            <td class="p-2">${goal.target}</td>
            <td class="p-2">${goal.saved}</td>
            <td class="p-2">
              {Math.round((goal.saved / goal.target) * 100)}%
              <div class="w-full bg-gray-200 rounded h-2 mt-1">
                <div
                  class="bg-green-500 h-2 rounded"
                  style="width: {Math.min((goal.saved / goal.target) * 100, 100)}%"
                ></div>
              </div>
            </td>
            <td class="p-2 space-x-2">
              <button on:click={() => editGoal(index)} class="text-blue-600">Edit</button>
              <button on:click={() => deleteGoal(index)} class="text-red-600">Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
  <style>
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  </style>
  