import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
				inter: ['var(--font-inter)'],
			},
			// screens: {},
			// maxWidth: {},
			// maxHeight: {},
			// width: {},
			height: {
				'page-custom': 'calc(100vh - 56px)',
			},
			colors: {
				customBlack: {
					// color id: '#color code'
					100: "#2b2d42",
					200: '#787878'
				},
				customBlue: {
					100: '#8d99ae',
					200: '#328CA5'
				},
				customWhite: {
					100: '#edf2f4'
				}
			},
			dropShadow: {
        default: '0px 0px 8px rgba(0, 0, 0, 0.10)'
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
