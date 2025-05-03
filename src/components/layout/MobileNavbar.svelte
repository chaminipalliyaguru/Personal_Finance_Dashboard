<script lang="ts"></script>

<div class={`fixed bottom-0 left-0 z-50 mt-4 flex w-full sm:flex md:hidden`}>
	<ul
		class="flex w-full flex-row items-center justify-between bg-white p-4 text-lg font-medium text-blue-500 shadow-2xl sm:flex-row sm:items-center"
	>
		<li class="flex flex-col items-center justify-center">
			<a href="/" aria-label="Home">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
			</a>
			<p class="text-xs">Home</p>
		</li>
		<li class="flex flex-col items-center justify-center">
			<a href="/income" aria-label="Income"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"
					/>
				</svg>
			</a>
			<p class="text-xs">Income</p>
		</li>
		<li class="flex flex-col items-center justify-center">
			<a href="/expense" aria-label="Expenses"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
					/>
				</svg>
			</a>
			<p class="text-xs">Expenses</p>
		</li>
		<li class="flex flex-col items-center justify-center">
			<a href="/saving_goals" aria-label="Saved"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
					/>
				</svg>
			</a>
			<p class="text-xs">Goals</p>
		</li>
	</ul>
</div>
