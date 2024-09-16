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
			// height: {},
			// width: {},
			// colors: {
			// 	customColor: {
			// 		// color id: '#color code'
			// 	},
			// },
			// dropShadow: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
