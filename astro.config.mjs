// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import remarkMermaid from './src/plugins/remark-mermaid.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://jsyang-dev.github.io',
	base: '/lucid-log',
	integrations: [mdx(), sitemap()],
	markdown: {
		// ```mermaid 코드펜스를 Shiki 하이라이팅 전에 <pre class="mermaid">로 변환
		// → 클라이언트에서 mermaid.js가 다이어그램으로 렌더 (BlogPost.astro)
		remarkPlugins: [remarkMermaid],
		// 외부 링크는 새 창으로 (내부 링크는 그대로)
		rehypePlugins: [
			[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
		],
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
