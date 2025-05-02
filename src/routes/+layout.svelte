<!-- <script>
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
		
			<a href="/" class="text-white text-2xl font-bold">FinanceTracker</a>

			
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

<slot /> -->

<script>
	import '../app.css';
	let isOpen = false;

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}

	let darkMode = false;

	function toggleDarkMode() {
		darkMode = !darkMode;
		const html = document.documentElement;
		html.classList.toggle('dark', darkMode);
	}
</script>

<nav class="bg-blue-900 shadow-lg dark:bg-gray-800 dark:text-white">
	<div class="container mx-auto flex items-baseline justify-between px-4 py-3">
		<div class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="text-2xl font-bold text-white">FinanceTracker</a>

			<!-- Toggle Button -->
			<button
				class="text-white focus:outline-none sm:hidden"
				on:click={toggleMenu}
				aria-label="Toggle Menu"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
			<ul class="flex flex-col gap-4 text-lg font-medium text-white sm:flex-row sm:items-center">
				<li>
					<a href="/" class="px-3 py-2 transition hover:text-red-300" on:click={closeMenu}
						>Dashboard</a
					>
				</li>
				<li>
					<a href="/investing" class="px-3 py-2 transition hover:text-red-300" on:click={closeMenu}
						>Investing</a
					>
				</li>
				<li>
					<a href="/payments" class="px-3 py-2 transition hover:text-red-300" on:click={closeMenu}
						>Payments</a
					>
				</li>
				<li>
					<a
						href="/saving_goals"
						class="px-3 py-2 transition hover:text-red-300"
						on:click={closeMenu}>Saving Goals</a
					>
				</li>
			</ul>
		</div>

		<div>
			{#if !darkMode}
				<button
					on:click={toggleDarkMode}
					aria-label="Toggle dark mode"
					class="cursor-pointer text-white"
				>
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
							d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
						/>
					</svg>
				</button>
			{:else}
				<button
					on:click={toggleDarkMode}
					aria-label="Toggle light mode"
					class="cursor-pointer text-white"
				>
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
							d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
						/>
					</svg>
				</button>
			{/if}
		</div>
	</div>
</nav>

<slot />

