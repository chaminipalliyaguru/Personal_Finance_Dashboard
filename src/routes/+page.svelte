<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import LineChart from '../components/LineChart.svelte';
	import PieChart from '../components/PieChart.svelte';

	let incomeList = [];
	let expenseList = [];
	let saved = 0;

	let labels = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'June',
		'July',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	function getMonthlyTotals(list) {
		const monthlyTotals = new Array(12).fill(0);
		for (const item of list) {
			const date = new Date(item.date);
			const month = date.getMonth();
			monthlyTotals[month] += Number(item.amount);
		}
		return monthlyTotals;
	}

	onMount(() => {
		if (browser) {
			const incomeRaw = localStorage.getItem('incomeList');
			const expenseRaw = localStorage.getItem('expenseList');
			const savingsRaw = localStorage.getItem('savingsGoals');

			incomeList = incomeRaw ? JSON.parse(incomeRaw) : [];
			expenseList = expenseRaw ? JSON.parse(expenseRaw) : [];

			const savingsGoals = savingsRaw ? JSON.parse(savingsRaw) : [];
			saved = savingsGoals.reduce((total, goal) => total + (goal.saved || 0), 0);
		}
	});

	// Reactive derived values
	$: income = incomeList.reduce((sum, item) => sum + Number(item.amount), 0);
	$: expense = expenseList.reduce((sum, item) => sum + Number(item.amount), 0);
	$: incomes = getMonthlyTotals(incomeList);
	$: expenses = getMonthlyTotals(expenseList);
</script>

<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
	<!-- Current Status Section -->
	<div class="mx-auto mt-4 w-full md:ml-10 md:w-1/2">
		<h2 class="mt-6 mb-6 text-2xl font-bold italic md:mt-10">Current Status:</h2>
		<div
	class="h-[22.5rem] w-full max-w-md space-y-3 rounded-xl bg-blue-300 p-6 text-left font-semibold text-gray-800 md:max-w-lg lg:max-w-xl flex flex-col justify-between"
>
	<div class="space-y-4 text-left">
		<div class="text-2xl font-semibold text-slate-800">Net Income:</div>
		<div class="text-4xl font-extrabold text-green-600">${income - expense}</div>
	</div>

	<div class="space-y-2 text-base text-slate-700 md:text-lg">
		<div class="flex items-center justify-between">
			<span>Total Income:</span>
			<span class="font-semibold text-green-700">${income}</span>
		</div>
		<div class="flex items-center justify-between">
			<span>Total Expenses:</span>
			<span class="font-semibold text-red-600">${expense}</span>
		</div>
	</div>

	<div class="pt-4 text-sm text-slate-700 italic text-center">
		Financial summary as of today.
	</div>
</div>

	</div>

	<!-- Pie Chart Section -->
	<div class="relative mt-10 w-full md:mt-14 md:ml-10">
		<h2 class="text-2xl font-bold italic">Monthly Summary</h2>
		<PieChart {saved} invested={income} expenses={expense} />
	</div>
</div>

<!-- Monthly Line Chart Section -->
<section class="max-w-8xl mx-auto mt-12 p-6 md:mr-10 md:ml-10">
	<h2 class="mb-4 text-2xl font-bold text-slate-800">Overview</h2>
	<LineChart {labels} {expenses} {incomes} />
</section>
