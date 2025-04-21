<script lang="ts">
	import RoadmapStep from '$lib/components/RoadmapStep.svelte';
	import { roadmapStore } from '$lib/stores/roadmapStore';
	import type { RoadmapState } from '$lib/stores/roadmapStore';

	$: store = $roadmapStore as RoadmapState;
	$: isStartPage = store.currentStep.id === 'start';
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
	<!-- Header -->
	<header class="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div>
					<h1
						class="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent"
					>
						Personal Finance Roadmap
					</h1>
					<p class="mt-2 text-gray-400">Your step-by-step guide to financial success</p>
				</div>
				{#if !isStartPage}
					<button
						class="group rounded-xl border border-gray-600 bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all hover:bg-gray-700 hover:text-white"
						on:click={() => roadmapStore.reset()}
					>
						<span class="flex items-center gap-2">
							<svg
								class="h-4 w-4 transition-transform group-hover:rotate-180"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
							Start Over
						</span>
					</button>
				{/if}
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl grow px-4 py-8 sm:px-6 lg:px-8">
		<RoadmapStep />
	</main>

	<!-- Footer -->
	<footer class="mt-auto border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<p class="text-center text-sm text-gray-500">
				This guide is for educational purposes only. Please consult with financial professionals for
				personalized advice.
			</p>
		</div>
	</footer>
</div>
