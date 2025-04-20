import { writable } from 'svelte/store';
import type { RoadmapStep } from '$lib/types';
import { roadmapSteps, getInitialStep, getNextStep } from '$lib/roadmapData';
import { browser } from '$app/environment';

export interface RoadmapState {
	currentStep: RoadmapStep;
	history: string[];
	progress: Record<string, boolean>;
}

const STORAGE_KEY = 'personal-finance-roadmap-state';

function loadState(): RoadmapState | null {
	if (!browser) return null;
	const saved = localStorage.getItem(STORAGE_KEY);
	if (!saved) return null;

	try {
		const parsed = JSON.parse(saved);
		const currentStep = roadmapSteps.find((step) => step.id === parsed.currentStep.id);
		if (!currentStep) return null;

		return {
			...parsed,
			currentStep
		};
	} catch {
		return null;
	}
}

function saveState(state: RoadmapState) {
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createRoadmapStore() {
	const initialStep = roadmapSteps.find((step) => step.id === getInitialStep());
	if (!initialStep) throw new Error('Initial step not found');

	const savedState = loadState();
	const { subscribe, set, update } = writable<RoadmapState>(
		savedState || {
			currentStep: initialStep,
			history: [initialStep.id],
			progress: {}
		}
	);

	return {
		subscribe,
		answer: (value: boolean) =>
			update((state) => {
				const nextStepId = getNextStep(state.currentStep, value);
				if (!nextStepId) return state;

				const nextStep = roadmapSteps.find((step) => step.id === nextStepId);
				if (!nextStep) return state;

				const newState = {
					currentStep: nextStep,
					history: [...state.history, nextStep.id],
					progress: { ...state.progress, [state.currentStep.id]: value }
				};

				saveState(newState);
				return newState;
			}),
		goBack: () =>
			update((state) => {
				if (state.history.length <= 1) return state;

				const newHistory = state.history.slice(0, -1);
				const previousStepId = newHistory[newHistory.length - 1];
				const previousStep = roadmapSteps.find((step) => step.id === previousStepId);

				if (!previousStep) return state;

				const newState = {
					currentStep: previousStep,
					history: newHistory,
					progress: { ...state.progress }
				};

				saveState(newState);
				return newState;
			}),
		reset: () => {
			const initialState = {
				currentStep: initialStep,
				history: [initialStep.id],
				progress: {}
			};
			saveState(initialState);
			set(initialState);
		}
	};
}

export const roadmapStore = createRoadmapStore();
