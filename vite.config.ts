import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import UnoCSS from '@unocss/vite';
import { presetUno, presetAttributify, presetIcons, presetTypography } from 'unocss';

export default defineConfig({
	plugins: [
		UnoCSS({
			presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
			mode: 'global'
		}),
		sveltekit()
	]
});
