<script lang="ts">
	export let amount: number = 0;
	export let title: string = '';
	export let icon: any = null;
</script>

<article
	class="flex w-full items-center gap-4 rounded-lg border border-blue-500 bg-white p-6 dark:bg-gray-800 dark:text-white"
>
	<span class="rounded-full bg-blue-100 p-3 text-blue-600">
		{#if icon}
			<svelte:component this={icon} />
		{/if}
	</span>

	<div>
		<p class="text-2xl font-medium text-gray-900 dark:text-white">{amount}</p>

		<p class="text-sm text-gray-500 dark:text-white">{title}</p>
	</div>
</article>
