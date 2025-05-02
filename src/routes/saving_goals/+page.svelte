<script lang="ts">
	import { writable } from 'svelte/store';

	function createGoalsStore() {
		let storedGoals = [];

		if (typeof window !== 'undefined') {
			try {
				storedGoals = JSON.parse(localStorage.getItem('savingsGoals') || '[]');
			} catch (e) {
				console.error('Error parsing savingsGoals from localStorage', e);
				storedGoals = [];
			}
		}

		const { subscribe, set, update } = writable(storedGoals);

		if (typeof window !== 'undefined') {
			subscribe((value) => {
				localStorage.setItem('savingsGoals', JSON.stringify(value));
			});
		}

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

		goals.update((currentGoals) => {
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
		goals.subscribe((gs) => {
			const goal = gs[index];
			goalName = goal.name;
			targetAmount = goal.target;
			savedAmount = goal.saved;
			targetDate = goal.date;
			editIndex = index;
		})();
	}

	function deleteGoal(index) {
		if (confirm('Are you sure you want to delete this goal?')) {
			goals.update((gs) => gs.filter((_, i) => i !== index));
		}
	}
</script>

<div class="mx-auto max-w-xl p-4 dark:bg-gray-800 dark:text-gray-200">
	<h2 class="mb-4 text-2xl font-bold">Savings Goal</h2>
	<form on:submit|preventDefault={addGoal} class="space-y-3">
		<input
			placeholder="Goal name"
			bind:value={goalName}
			class="w-full appearance-none rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-500"
		/>
		<input
			type="number"
			placeholder="Target amount"
			bind:value={targetAmount}
			class="w-full appearance-none rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-500"
		/>
		<input
			type="number"
			placeholder="Saved amount (optional)"
			bind:value={savedAmount}
			class="w-full appearance-none rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-500"
		/>
		<input
			type="date"
			bind:value={targetDate}
			class="w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-500"
		/>
		<button
			class="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
		>
			{editIndex !== null ? 'Update Goal' : 'Add Goal'}
		</button>
	</form>
</div>
<div class="px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-gray-200">
	<h2 class="mt-8 mb-4 text-2xl font-bold">Goals Collection</h2>
	<div class="overflow-x-auto">
		<table class="min-w-full border border-gray-300 text-sm md:text-base dark:border-gray-700">
			<thead>
				<tr class="bg-gray-100 text-left dark:bg-gray-700">
					<th class="p-2">Goal Name</th>
					<th class="p-2">Target</th>
					<th class="p-2">Saved</th>
					<th class="p-2">Progress</th>
					<th class="p-2 text-center">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each $goals as goal, index}
					<tr class="border-t hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
						<td class="p-2">{goal.name}</td>
						<td class="p-2">${goal.target}</td>
						<td class="p-2">${goal.saved}</td>
						<td class="p-2">
							{Math.round((goal.saved / goal.target) * 100)}%
							<div class="mt-1 h-2 w-full rounded bg-gray-200 dark:bg-gray-700">
								<div
									class="h-2 rounded bg-green-500 dark:bg-green-400"
									style="width: {Math.min((goal.saved / goal.target) * 100, 100)}%"
								></div>
							</div>
						</td>
						<td class="space-x-2 p-2 text-center">
							<button
								on:click={() => editGoal(index)}
								class="text-blue-600 hover:underline dark:text-blue-400">Edit</button
							>
							<button
								on:click={() => deleteGoal(index)}
								class="text-red-600 hover:underline dark:text-red-400">Delete</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
