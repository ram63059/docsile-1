
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			main: '#3B5D8F',
  			second: '#F0B284',
  			'main-2': '#319191',
  			back: '#e5ebf4',
			jobColor1 : '#e0eafd',
			jobColor2 : '#dbf5ed',
			jobColor3 : '#f7e3f4',
			jobColor4 : '#e1dbf7',
			jobColor5 : '#edeff3',
			jobColor6 : '#fcebdb',
			maincl:'#3B5D8F',
			fillc:"#6688CC",
			urgentbg:"#F7ECD1",
			urgenttxt:"#D9A21B",
			buttonclr:"#F0F4FA"

  		},
		fontFamily:{
			fontsm:['Lexend', 'sans-serif']},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		fontSize:{
			fontlit:"10px",
			fontvlit:"8px"
		},
		
  	}
  },
  plugins: [require("tailwindcss-animate",)],
}

