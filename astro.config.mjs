// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeExquisitus from 'starlight-theme-exquisitus';
import starlightLinksValidator from 'starlight-links-validator';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [
				starlightThemeExquisitus(),
				// Fails the build on broken internal links and invalid heading
				// anchors. External links are checked separately by lychee in CI.
				starlightLinksValidator(),
			],
			title: "The technical writer's guide to AI",
			description:
				'A collaborative record of how technical writers are actually using AI, and what it cost them. Most of the questions are still open.',
			// Site-level styles only; Exquisitus owns the visual system. The cascade
			// layer order this file relies on is declared inside it — see the comment there.
			customCss: ['./src/styles/site.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/anaxite/technical-writers-guide-to-ai' }],
			sidebar: [
				{ label: 'Home', slug: 'index' },
				{ label: 'About this guide', slug: 'about' },
				{ label: 'Contribute', slug: 'contribute' },
			],
		}),
	],
});
