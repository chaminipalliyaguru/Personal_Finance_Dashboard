<script>
	import LineChart from "../components/LineChart.svelte";

	let incomeList = JSON.parse(localStorage.getItem('incomeList')) || [];
	let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];

	let income = incomeList.reduce((sum, item) => sum + Number(item.amount), 0);
	let expense = expenseList.reduce((sum, item) => sum + Number(item.amount), 0);

	let labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	// Helper function to get monthly totals
	function getMonthlyTotals(list) {
		const monthlyTotals = new Array(12).fill(0); // Jan to Dec
		for (const item of list) {
			const date = new Date(item.date); // assumes item.date is in a valid format
			const month = date.getMonth(); // 0-11
			monthlyTotals[month] += Number(item.amount);
		}
		return monthlyTotals;
	}

	let expenses = getMonthlyTotals(expenseList);
	let incomes = getMonthlyTotals(incomeList);
</script>


<h2 class="mt-10 ml-10 text-2xl font-bold italic">Current Status:</h2>
<div class="grid grid-cols-2 gap-2">
	<div class="relative mt-4 ml-10 w-1/2">
		<div
			class="space-y-3 rounded-xl bg-blue-300 p-6 text-left font-semibold text-gray-800 shadow-lg"
		>
			<div class="text-lg">Net Income:</div>
			<div class="text-3xl font-bold text-green-600">${income-expense}</div>

			<div class="text-sm">
				<span class="block">
					Total Income: <span class="font-medium text-green-700">${income}</span></span
				>
				<span class="block">Total Expenses: <span class="font-medium text-red-600">${expense}</span></span
				>
			</div>
		</div>
	</div>

	<div class="...">
		<div
			class="item-center absolute w-64 rounded bg-pink-300 text-left leading-[80px] font-bold shadow"
		>
			<img src="../../static/image.png" alt="images"/>
		</div>
	</div>
</div>

<section class="p-6 max-w-8xl mx-auto">
	<h2 class="text-2xl font-semibold mb-4 text-slate-800">Monthly Expenses</h2>
	<LineChart {labels} expenses={expenses} incomes={incomes} />
</section>