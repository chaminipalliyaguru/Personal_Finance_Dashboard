<script lang="ts">
	export let handleNewIncomeCreate: () => void;
</script>

<button
	on:click={handleNewIncomeCreate}
	class="my-5 cursor-pointer rounded bg-blue-600 px-6 py-2 font-semibold text-white shadow transition duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
>
	Add Income
</button>
