import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		vite:{
			optimizeDeps:{
				include:['just-throttle', 'dayjs']
			}
		},
		adapter: adapter()
	}
};

export default config;
