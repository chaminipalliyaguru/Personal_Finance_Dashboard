import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Personal Finance Dashboard',
				short_name: 'FinanceApp',
				start_url: '/',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#4A90E2',
				icons: [
					{
						src: '/favicon.ico',
						sizes: '16x16',
						type: 'image/png'
					},
					{
						src: '/favicon.ico',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: "/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png"
					},

				]
			},
			devOptions: {
				enabled: true
			}
		})
	]
});