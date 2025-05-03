<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Chart from 'chart.js/auto';

	let chartInstance;
	export let title = '';
	export let labels = [];
	export let data = [];
	export let colors = [];

	let canvas;

	function renderChart() {
		if (chartInstance) {
			chartInstance.destroy();
		}

		const ctx = canvas?.getContext('2d');
		if (!ctx) return;

		const defaultColors = [
			'#60a5fa', '#f87171', '#4ade80', '#facc15', '#a78bfa', '#fb923c', '#f472b6', '#34d399'
		];

		chartInstance = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: labels.length ? labels : ['No data'],
				datasets: [
					{
						label: title || 'Pie Chart',
						data: data.length ? data : [1], 
						backgroundColor: colors.length ? colors : defaultColors.slice(0, data.length || 1),
						borderWidth: 1
					}
				]
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
					},
					title: {
						display: true,
						color: "blue",
						text: title || 'Pie Chart',
						font: {
							size: 18
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

	$: if (browser && canvas && (labels.length || data.length || title)) {
		renderChart();
	}

	onDestroy(() => {
		if (chartInstance) {
			chartInstance.destroy();
		}
	});
</script>

<div class="mx-auto mt-6 w-full rounded-2xl p-4 md:ml-8 md:w-1/2">
	<div class="relative h-80 w-full">
		<canvas bind:this={canvas} class="h-full w-full"></canvas>
	</div>
</div>
