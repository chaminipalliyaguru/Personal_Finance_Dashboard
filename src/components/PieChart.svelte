<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Chart from 'chart.js/auto';

	let chartInstance;
	export let saved = 0;
	export let invested = 0;
	export let expenses = 0;

	let canvas;

	function renderChart() {
		if (chartInstance) {
			chartInstance.destroy();
		}

		const ctx = canvas?.getContext('2d');
		if (!ctx) return;

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

	onMount(() => {
		if (!browser) return;
		renderChart();
	});

	// Update chart whenever inputs change
	$: if (browser && chartInstance && (saved || invested || expenses)) {
		renderChart();
	}

	onDestroy(() => {
		if (chartInstance) {
			chartInstance.destroy();
		}
	});
</script>

<div class="w-full md:w-1/2 mx-auto bg-teal-400 rounded-2xl p-4 mt-6 md:ml-8 ">
	<div class="relative h-2/4 w-full">
		<canvas bind:this={canvas} class="w-full h-full"></canvas>
	</div>
</div>
