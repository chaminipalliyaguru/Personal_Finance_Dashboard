<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import LineChart from '../components/LineChart.svelte';
	import PieChart from '../components/PieChart.svelte';
	import type { ExpenseEntry, GoalEntry, IncomeEntry } from '../types/types';
	import StatCard from '../components/StatCard.svelte';
	import IncomeIcon from '../components/icons/IncomeIcon.svelte';
	import DollarIcon from '../components/icons/DollarIcon.svelte';
	import BankNoteIcon from '../components/icons/BankNoteIcon.svelte';
	import { goals } from '../store/goals';
	import { derived } from 'svelte/store';

	let incomeList: IncomeEntry[] = [];
	let expenseList: ExpenseEntry[] = [];
	let saved = 0;

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

			const savingsGoals: GoalEntry[] = savingsRaw ? JSON.parse(savingsRaw) : [];
			saved = savingsGoals.reduce((total: number, goal: GoalEntry) => total + (goal.saved || 0), 0);
		}
	});

	function getThisMonthData(list) {
		const now = new Date();
		const currentMonth = now.getMonth();
		const currentYear = now.getFullYear();

		return list.filter((item) => {
			const date = new Date(item.date);
			return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
		});
	}

	//Take goal summary
	const goalSummaries = derived(goals, ($goals) =>
		$goals.map((goal) => ({
			name: goal.name,
			progress: Math.round((goal.saved / goal.target) * 100),
		}))
	);

	// Reactive derived values
	$: income = incomeList.reduce((sum, item) => sum + Number(item.amount), 0);
	$: expense = expenseList.reduce((sum, item) => sum + Number(item.amount), 0);
	$: incomes = getMonthlyTotals(incomeList);
	$: expenses = getMonthlyTotals(expenseList);

	$: thisMonthIncomes = getThisMonthData(incomeList);
	$: thisMonthExpenses = getThisMonthData(expenseList);
</script>

<section>
	<div
		class="mt-5 flex flex-col items-center justify-center gap-10 px-4 py-2 text-gray-800 md:flex-row md:p-20 dark:text-white"
	>
		<StatCard amount={income} title="Total Income" icon={IncomeIcon} />
		<StatCard amount={expense} title="Total Expenses" icon={DollarIcon} />
		<StatCard amount={saved} title="Total Saved" icon={BankNoteIcon} />
	</div>
</section>
<div
	class="grid grid-cols-1 justify-items-center gap-4 px-4 md:grid-cols-2 dark:bg-gray-900 dark:text-white"
>
	<!-- Current Status Section -->

	<!-- Pie Chart Section -->
	<!-- Income Pie Chart -->
	<div class="relative mt-10 w-full md:mt-14 md:ml-10">
		<PieChart
			title="Month's Income"
			labels={thisMonthIncomes.map((item) => item.title)}
			data={thisMonthIncomes.map((item) => Number(item.amount))}
		/>
	</div>

	<!-- Expense Pie Chart -->
	<div class="relative mt-10 w-full md:mt-14 md:ml-10">
		<PieChart
			title="Month's Expense"
			labels={thisMonthExpenses.map((item) => item.title)}
			data={thisMonthExpenses.map((item) => Number(item.amount))}
		/>
	</div>
</div>

<!-- Responsive Grid Container -->
<div class="grid grid-cols-1 gap-6 md:grid-cols-2">

	<!-- Comparison Section -->
	<div class="mx-auto mt-4 w-full px-4 md:ml-10">
		<h2 class="mt-6 mb-6 text-2xl font-bold text-gray-800 italic md:mt-10 dark:text-gray-200">
			Income vs. Expenses
		</h2>
		<div
			class="flex h-[22.5rem] w-full max-w-md flex-col justify-between space-y-3 rounded-xl border border-blue-200 p-6 text-left font-semibold text-gray-800 md:max-w-lg lg:max-w-xl dark:bg-blue-800 dark:text-gray-200"
		>
			<div class="space-y-4 text-left">
				<div class="text-2xl font-semibold text-slate-800 dark:text-slate-200">Net Income:</div>
				<div class="text-4xl font-extrabold text-green-600 dark:text-green-400">
					${income - expense}
				</div>
			</div>

			<div class="space-y-2 text-base text-slate-700 md:text-lg dark:text-slate-300">
				<div class="flex items-center justify-between">
					<span>Total Income:</span>
					<span class="font-semibold text-green-700 dark:text-green-400">${income}</span>
				</div>
				<div class="flex items-center justify-between">
					<span>Total Expenses:</span>
					<span class="font-semibold text-red-600 dark:text-red-400">${expense}</span>
				</div>
			</div>

			<div class="pt-4 text-center text-sm text-slate-700 italic dark:text-slate-400">
				Financial summary as of today.
			</div>
		</div>
	</div>

	<!-- Goal Summary Section -->
	<div class="mx-auto mt-4 w-full px-4 md:ml-10">
		<h2 class="mt-6 mb-6 text-2xl font-bold text-gray-800 italic md:mt-10 dark:text-gray-200">
			Savings Goals Progress
		</h2>
		<div
			class="flex w-full max-w-md flex-col space-y-4 rounded-xl border border-blue-200 p-6 font-semibold text-gray-800 md:max-w-lg lg:max-w-xl dark:bg-blue-800 dark:text-gray-200"
		>
			{#each $goalSummaries as g}
				<div class="space-y-2">
					<div class="text-lg font-semibold">{g.name}</div>
					<div class="w-full h-3 rounded bg-gray-200 dark:bg-gray-700">
						<div
							class="h-3 rounded bg-green-500 dark:bg-green-400"
							style="width: {g.progress}%"
						></div>
					</div>
					<div class="text-right text-sm text-gray-600 dark:text-gray-300">
						{g.progress}%
					</div>
				</div>
			{/each}

			<div class="pt-4 text-center text-sm italic text-slate-700 dark:text-slate-400">
				Stay focused to achieve your goals!
			</div>
		</div>
	</div>
</div>


<!-- Monthly Line Chart Section -->
<section class="max-w-8xl z-10 mx-auto mt-5 p-6 md:ml-10">
	<h2 class="mb-4 text-2xl font-bold text-slate-800 dark:text-slate-200">Overview</h2>
	<LineChart {expenses} {incomes} />
</section>
