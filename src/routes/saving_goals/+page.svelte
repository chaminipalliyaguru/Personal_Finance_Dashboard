<script>
	import { writable } from 'svelte/store';

	function createGoalsStore() {
		const storedGoals = JSON.parse(localStorage.getItem('savingsGoals') || '[]');
		const { subscribe, set, update } = writable(storedGoals);

		subscribe(value => {
			localStorage.setItem('savingsGoals', JSON.stringify(value));
		});

		return { subscribe, set, update };
	}

	let goals = createGoalsStore();
	let goalName = '';
	let targetAmount = '';
	let savedAmount = '';
	let targetDate = '';
	let editIndex = null;

	function addGoal() {
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
	if (confirm("Are you sure you want to delete this goal?")) {
		goals.update(gs => gs.filter((_, i) => i !== index));
	}
}
</script>

<div class="p-4 max-w-xl mx-auto">
	<h2 class="text-2xl font-bold mb-4">Savings Goal</h2>
	<form on:submit|preventDefault={addGoal} class="space-y-3">
		<input
			placeholder="Goal name"
			bind:value={goalName}
			class="w-full p-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
		/>
		<input
			type="number"
			placeholder="Target amount"
			bind:value={targetAmount}
			class="w-full p-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
		/>
		<input
			type="number"
			placeholder="Saved amount (optional)"
			bind:value={savedAmount}
			class="w-full p-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
		/>
		<input
			type="date"
			bind:value={targetDate}
			class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
		/>
		<button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
			{editIndex !== null ? 'Update Goal' : 'Add Goal'}
		</button>
	</form>


</div>
<div class="px-4 sm:px-6 lg:px-8">
	<h2 class="text-2xl font-bold mt-8 mb-4">Goals Collection</h2>
	<div class="overflow-x-auto">
		<table class="min-w-full border border-gray-300 text-sm md:text-base">
			<thead>
				<tr class="bg-gray-100 text-left">
					<th class="p-2">Goal Name</th>
					<th class="p-2">Target</th>
					<th class="p-2">Saved</th>
					<th class="p-2">Progress</th>
					<th class="p-2 text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each $goals as goal, index}
					<tr class="border-t hover:bg-gray-50">
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
						<td class="p-2 text-center space-x-2">
							<button on:click={() => editGoal(index)} class="text-blue-600 hover:underline">Edit</button>
							<button on:click={() => deleteGoal(index)} class="text-red-600 hover:underline">Delete</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>


