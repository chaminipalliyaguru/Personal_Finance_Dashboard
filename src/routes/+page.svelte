<script>

	let incomeList = JSON.parse(localStorage.getItem('incomeList')) || [];
	let expenseList = JSON.parse(localStorage.getItem('expenseList')) || [];

	let income = incomeList.reduce((sum, item) => sum + Number(item.amount), 0);
	let expense = expenseList.reduce((sum, item) => sum + Number(item.amount),0);
	
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
		<!-- <div
			class="item-center absolute w-64 rounded bg-pink-300 text-left leading-[80px] font-bold shadow"
		>
			<img src="../../static/image.png" alt="images"/>
		</div> -->
	</div>
</div>
