<script>
	import LineChart from '../components/LineChart.svelte';
	import PieChart from '../components/PieChart.svelte'; // Add this

	let incomeList = JSON.parse(localStorage.getItem('incomeList')) || [];
	let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];

	let income = incomeList.reduce((sum, item) => sum + Number(item.amount), 0);
	let expense = expenseList.reduce((sum, item) => sum + Number(item.amount), 0);

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

	let expenses = getMonthlyTotals(expenseList);
	let incomes = getMonthlyTotals(incomeList);

	// Pie chart related states
	let saved = 0;

	function loadSavingsFromLocalStorage() {
		const savingsGoals = JSON.parse(localStorage.getItem('savingsGoals') || '[]');
		saved = savingsGoals.reduce((total, goal) => total + (goal.saved || 0), 0);
	}

	loadSavingsFromLocalStorage();
</script>



<div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
	<!-- Current Status Section -->
	<div class="w-full md:w-1/2 mx-auto md:ml-10 mt-4">
		<h2 class="mt-6 md:mt-10 mb-6 text-2xl font-bold italic">Current Status:</h2>
		<div class="space-y-3 rounded-xl bg-blue-300 p-6 text-left font-semibold text-gray-800 shadow-lg h-64">
			<div class="space-y-4 text-left">
				<div class="text-2xl font-semibold text-slate-800">Net Income:</div>
				<div class="text-4xl font-extrabold text-green-600 mb-4">${income - expense}</div>
			  
				<div class="text-base md:text-lg text-slate-700 space-y-2">
				  <div class="flex items-center justify-between">
					<span>Total Income:</span>
					<span class="font-semibold text-green-700">${income}</span>
				  </div>
				  <div class="flex items-center justify-between">
					<span>Total Expenses:</span>
					<span class="font-semibold text-red-600">${expense}</span>
				  </div>
				</div>
			  </div>
			  
		</div>
	</div>
	
	<!-- Pie Chart Section -->
	<div class="relative mt-10 md:mt-14 md:ml-10 w-full">
		<h2 class="text-2xl font-bold italic">Monthly Summary</h2>
		<PieChart {saved} invested={income} expenses={expense} />
	</div>
</div>

<!-- Monthly Line Chart Section -->
<section class="max-w-8xl mx-auto p-6 mt-12 md:ml-10 md:mr-10">
	<h2 class="mb-4 text-2xl font-bold text-slate-800 ">Overview</h2>
	<LineChart {labels} {expenses} {incomes} />
</section>
