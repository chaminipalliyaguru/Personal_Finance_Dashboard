<script>
	import '../app.css';
	let { children } = $props();
</script>

<nav class="bg-blue-900 shadow-lg">
	<div class="container mx-auto">
		<div class="sm:flex">
			<a href="#" class="p-3 text-3xl font-bold text-white">APP LOGO</a>

			<!-- Menus -->
			<div class="mt-4 ml-55">
				<ul class="text-xl text-white sm:self-center">
					<li class="sm:inline-block">
						<a href="/" class="p-3 hover:text-red-900">Dashboard</a>
					</li>
					<li class="sm:inline-block">
						<a href="/investing" class="p-3 hover:text-red-900">Investing</a>
					</li>
					<li class="sm:inline-block">
						<a href="/payments" class="p-3 hover:text-red-900">Payments</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</nav>

{@render children()}
