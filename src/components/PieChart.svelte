<script>
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	let chartInstance;
	export let saved;
	export let invested;
	export let expenses;

	onMount(() => {
		const savingsGoals = JSON.parse(localStorage.getItem('savingsGoals') || '[]');
		saved = savingsGoals.reduce((total, goal) => total + (goal.saved || 0), 0);

		const ctx = document.getElementById('myPieChart')?.getContext('2d');
		if (ctx) {
			chartInstance = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: ['Savings Goals', 'Investing', 'Expenses'],
					datasets: [{
						label: 'Monthly Summary',
						data: [saved, invested, expenses],
						backgroundColor: ['#4ade80', '#60a5fa', '#f87171'],
						borderWidth: 1
					}]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							position: 'bottom',
							labels: {
								boxWidth: 20,
								padding: 15
							}
						}
					}
				}
			});
		}
	});

	onDestroy(() => {
		if (chartInstance) {
			chartInstance.destroy();
		}
	});
</script>


<div class="w-full md:w-1/2 mx-auto bg-teal-400 rounded-2xl p-4 mt-6 md:ml-8">
	<div class="relative h-60 w-full">
		<canvas id="myPieChart" class="w-full h-full"></canvas>
	</div>
</div>

