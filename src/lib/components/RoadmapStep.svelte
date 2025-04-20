<script lang="ts">
	import { roadmapStore } from '$lib/stores/roadmapStore';
	import { roadmapSteps } from '$lib/roadmapData';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { RoadmapState } from '$lib/stores/roadmapStore';

	$: store = $roadmapStore as RoadmapState;
	$: isStartPage = store.currentStep.id === 'start';
	$: isWrapupPage = store.currentStep.id === 'wrapup';
	$: progress = Math.min((store.history.length / (roadmapSteps.length - 1)) * 100, 100);
</script>

<div class="mx-auto max-w-3xl p-4 md:p-6" transition:slide={{ duration: 300, easing: quintOut }}>
	<div class="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-700">
		<!-- Progress Bar -->
		{#if !isStartPage}
			<div class="h-1 bg-gray-700">
				<div
					class="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300"
					style="width: {progress}%"
				></div>
			</div>
		{/if}

		<!-- Header -->
		<div class="border-b border-gray-700 bg-gradient-to-br from-gray-800 to-gray-700 p-8">
			<h2 class="mb-3 text-3xl font-bold tracking-tight text-white">
				{store.currentStep.title}
			</h2>
			<p class="text-xl font-medium text-gray-300">
				{store.currentStep.question}
			</p>
		</div>

		<!-- Description -->
		<div class="space-y-4 bg-gray-800/50 p-8 leading-relaxed text-gray-300">
			{#each store.currentStep.description.split('\n\n') as paragraph}
				{#if paragraph.includes('•')}
					<ul class="list-disc space-y-2 pl-6">
						{#each paragraph.split('\n').filter((line) => line.trim().startsWith('•')) as bullet}
							<li>{bullet.replace('•', '').trim()}</li>
						{/each}
					</ul>
				{:else}
					<p>{paragraph}</p>
				{/if}
			{/each}
		</div>

		<!-- Actions -->
		<div class="border-t border-gray-700 bg-gradient-to-br from-gray-800 to-gray-700 p-8">
			<div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
				{#if !isStartPage}
					<button
						class="group w-full rounded-xl border border-gray-600 bg-gray-700/50 px-8 py-3 font-medium text-gray-300 backdrop-blur-sm transition-all hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:hover:bg-gray-700/50 disabled:hover:text-gray-300 sm:w-auto"
						on:click={() => roadmapStore.goBack()}
						disabled={store.history.length <= 1}
					>
						<span class="flex items-center gap-2">
							<svg
								class="h-5 w-5 transition-transform group-hover:-translate-x-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
							Back
						</span>
					</button>
				{/if}
				<div class="flex w-full gap-4 sm:w-auto">
					{#if store.currentStep.type === 'decision'}
						<button
							class="flex-1 rounded-xl bg-gradient-to-br from-red-500 to-red-600 px-8 py-3 font-medium text-white shadow-lg shadow-red-500/25 transition-all hover:from-red-600 hover:to-red-700 hover:shadow-red-500/35 sm:flex-none"
							on:click={() => roadmapStore.answer(false)}
						>
							No
						</button>
						<button
							class="flex-1 rounded-xl bg-gradient-to-br from-green-500 to-green-600 px-8 py-3 font-medium text-white shadow-lg shadow-green-500/25 transition-all hover:from-green-600 hover:to-green-700 hover:shadow-green-500/35 sm:flex-none"
							on:click={() => roadmapStore.answer(true)}
						>
							Yes
						</button>
					{:else if !isWrapupPage}
						<button
							class="flex-1 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 px-8 py-3 font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/35 sm:flex-none"
							on:click={() => roadmapStore.answer(true)}
						>
							Continue
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
