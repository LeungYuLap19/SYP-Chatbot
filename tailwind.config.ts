import type { Config } from "tailwindcss";
import { custom } from "zod";

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
  			inter: [
  				'var(--font-inter)'
  			]
  		},
  		height: {
  			'page-custom': 'calc(100vh - 56px)'
  		},
  		colors: {
  			customBlack: {
  				'100': '#2b2d42',
  				'200': '#787878'
  			},
  			customBlue: {
  				'100': '#8d99ae',
  				'200': '#2171a3'
  			},
  			customWhite: {
  				'100': '#FAF9F9',
  				'200': '#f8fcff'
  			},
  			customGreen: {
  				'100': '#618685'
  			}
  		},
  		dropShadow: {
  			default: '0px 0px 4px rgba(0, 0, 0, 0.05)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
