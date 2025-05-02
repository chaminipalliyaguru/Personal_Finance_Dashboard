<script>
	import '../app.css'
	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}
</script>

<nav class="bg-blue-900 shadow-lg">
	<div class="container mx-auto px-4 py-3">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="text-white text-2xl font-bold">FinanceTracker</a>

			<!-- Toggle Button -->
			<button
				class="text-white sm:hidden focus:outline-none"
				on:click={toggleMenu}
				aria-label="Toggle Menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>

		<!-- Menu Items -->
		<div class={`mt-4 sm:flex ${isOpen ? 'block' : 'hidden'}`}>
			<ul class="flex flex-col sm:flex-row gap-4 text-white text-lg font-medium sm:items-center">
				<li><a href="/" class="px-3 py-2 hover:text-red-300 transition" on:click={closeMenu}>Dashboard</a></li>
				<li><a href="/investing" class="px-3 py-2 hover:text-red-300 transition" on:click={closeMenu}>Investing</a></li>
				<li><a href="/payments" class="px-3 py-2 hover:text-red-300 transition" on:click={closeMenu}>Payments</a></li>
				<li><a href="/saving_goals" class="px-3 py-2 hover:text-red-300 transition" on:click={closeMenu}>Saving Goals</a></li>
			</ul>
		</div>
	</div>
</nav>

<slot />
