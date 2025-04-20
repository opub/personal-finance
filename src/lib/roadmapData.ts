import roadmapData from './roadmap.json';

export interface RoadmapStep {
	id: string;
	title: string;
	question: string;
	description: string;
	type: 'info' | 'decision' | 'action';
	next?: string | { yes: string; no: string };
	nextStepId?: string;
	yesStepId?: string;
	noStepId?: string;
}

export const roadmapSteps = roadmapData.steps as RoadmapStep[];

export function getInitialStep(): string {
	return 'start';
}

export function getNextStep(currentStep: RoadmapStep, answer: boolean): string | null {
	// Handle nextStepId for all step types
	if (currentStep.nextStepId) {
		return currentStep.nextStepId;
	}

	// Handle yesStepId/noStepId for decision steps
	if (currentStep.type === 'decision' && currentStep.yesStepId && currentStep.noStepId) {
		return answer ? currentStep.yesStepId : currentStep.noStepId;
	}

	// Handle legacy next property
	if (typeof currentStep.next === 'string') {
		return currentStep.next;
	}

	if (currentStep.type === 'decision' && currentStep.next) {
		return answer ? currentStep.next.yes : currentStep.next.no;
	}

	return null;
}
