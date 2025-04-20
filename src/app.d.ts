// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />

declare module 'virtual:uno.css' {
	const styles: string;
	export default styles;
}

declare module '@unocss/reset/tailwind.css' {
	const styles: string;
	export default styles;
}
