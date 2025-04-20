export interface RoadmapStep {
	id: string;
	title: string;
	question: string;
	description: string;
	learnMoreUrl?: string;
	type: 'action' | 'decision';
	nextStepId?: string;
	yesStepId?: string;
	noStepId?: string;
	color?: 'red' | 'yellow' | 'green' | 'blue' | 'purple';
}

export interface UserProgress {
	currentStepId: string;
	completedSteps: Set<string>;
	answers: Record<string, boolean>;
}
