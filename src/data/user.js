import {
	Bicycle,
	GameController,
	MusicNotes,
	TreePalm,
} from "@phosphor-icons/react";

const INFO = {
	main: {
		title: "Vinicius Gomes",
		name: "Vinicius G.",
		email: "contact@viniciusgomes.tech",
		logo: "../logo.png",
		logoBackgroundColor: "#FFEE58",
		linkedin: "https://www.linkedin.com/in/vinicius-gomes-384397156",
	},

	socials: {
		twitter: "https://twitter.com/DevNoComando",
		github: "https://github.com/viniciussantos45",
		linkedin: "https://www.linkedin.com/in/vinicius-gomes-384397156",
		instagram: "https://www.instagram.com/vini.ssgomes/",
	},

	homepage: {
		title: "Full-stack web and mobile app developer, and amateur DJ.",
		description:
			"I am a Full-stack developer with expertise in Node.js, React, PHP, Python, C#, mobile development, and more. I have experience in building scalable, secure and reliable web applications using various frameworks and technologies. I enjoy solving complex problems and learning new skills. I am passionate about creating high-quality code that follows best practices and industry standards. I am always looking for new challenges and opportunities to grow as a developer.",
	},

	about: {
		title: "I’m Vinicius Gomes. I live in Sao Paulo - Brazil, where I design the future.",
		description:
			"I've worked on a variety of projects over the years and I'm proud of the progress I've made. Many of these projects are open-source and available for others to explore and contribute to. If you're interested in any of the projects I've worked on, please feel free to check out the code and suggest any improvements or enhancements you might have in mind. Collaborating with others is a great way to learn and grow, and I'm always open to new ideas and feedback.",
	},

	articles: {
		title: "I'm passionate about pushing the boundaries of what's possible and inspiring the next generation of innovators.",
		description:
			"Chronological collection of my long-form thoughts on programming, leadership, product design, and more.",
	},

	projects: [
		{
			title: "Tik Tech",
			description:
				"The Tik Tech is a video generator application that explains Node.js and Python frameworks and libraries. It automates the creation of explanatory videos on how to use different frameworks and libraries, generating sample code, narrating the steps, and combining everything into a video.",
			logo: "https://skillicons.dev/icons?i=typescript",
			linkText: "View Repository",
			link: "https://github.com/viniciussantos45/tik-tech",
			videoLink:
				"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7126679555683024896?compact=1",
		},

		{
			title: "Coffee delivery",
			description:
				"It's a sleek front-end coffee sales application developed using React, Styled Components, and Axios for a seamless user experience. It features functionalities like order creation, viewing, and coffee item management, with a focus on responsive design and efficient data handling. The application is built with a robust stack, including TypeScript and Vite, ensuring high performance and maintainability.",
			logo: "https://skillicons.dev/icons?i=react",
			linkText: "View Project",
			link: "https://viniciussantos45.github.io/coffee-delivery/",
			videoLink:
				"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7066193114192912384?compact=1",
		},

		{
			title: "Coffee delivery API",
			description:
				"This is a simple coffee shop application built with Rust and the Axum web framework. The application allows users to create orders, view their orders, and manage coffee items.",
			logo: "https://skillicons.dev/icons?i=rust",
			linkText: "View Repository",
			link: "https://github.com/viniciussantos45/coffee-delivery-api",
			videoLink:
				"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7078840395555643392?compact=1",
		},

		{
			title: "Kronos Partners",
			description:
				"The Kronos Partners is an application that was developed with the goal of making inventory control, entries, exits, and promotions of the tobacco shop (Kronos Hookah) as simple as possible.",
			logo: "https://skillicons.dev/icons?i=nodejs",
			videoLink:
				"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:6815082129089691648?compact=1",
		},

		{
			title: "Uaupaper",
			description:
				"It was with the need to download images directly from Pexels and transfer them to the cell phone that the idea of creating Uaupaper came about. And that is what the application consists of, in searching for and downloading beautiful images directly to the smartphone gallery.",
			logo: "https://skillicons.dev/icons?i=javascript",
			videoLink:
				"https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:6804926664359845888?compact=1",
		},

		{
			title: "To-do list",
			description:
				"This is a simple to-do list application built with React and TypeScript. The application allows users to create, view, and delete tasks. The taks are stored in the browser's local storage.",
			logo: "https://skillicons.dev/icons?i=react",
			linkText: "View Project",
			link: "https://viniciussantos45.github.io/01-desafio-fundamentos-reactjs-ts",
		},
		{
			title: "Timer",
			description:
				"This is a simple timer pomodoro application built with React and TypeScript. The application uses concepts of hooks, context API and reducers.",
			logo: "https://skillicons.dev/icons?i=react",
			linkText: "View Project",
			link: "https://viniciussantos45.github.io/02-ignite-timer/",
		},
	],

	works: [
		{
			title: "Tecban",
			subtitle: "Software Developer Fullstack",
			duration: "2022 - Present",
			logo: "./tecban.png",
		},

		{
			title: "Turim",
			subtitle: "Software Developer Fullstack",
			duration: "2019 - 2022",
			logo: "./turim.png",
		},

		{
			title: "Datasist",
			subtitle: "Administrative Assistant",
			duration: "04/2019 - 08/2019",
			logo: "./datasist.jpg",
		},

		{
			title: "Wilton Roveri Associates",
			subtitle: "Billing Operator",
			duration: "02/2016 - 08/2016",
			logo: "./roveri.jpg",
		},
	],

	hobbies: [
		{
			icon: <MusicNotes size={18} color="#ff8e00" weight="fill" />,
			color: "#ff8e00",
			title: "Music",
			description:
				"I love music, I listen to it all the time. I like to play the guitar and I also like to DJ.",
		},
		{
			icon: <TreePalm size={18} color="#03A9F4" weight="fill" />,
			color: "#03A9F4",
			title: "Beach",
			description:
				"I like to go to the beach, it is a great place to relax and enjoy nature.",
		},
		{
			icon: <Bicycle size={18} color="#4CAF50" weight="fill" />,
			color: "#4CAF50",
			title: "Cycling",
			description:
				"I like to ride a bike, it is a great way to exercise and enjoy nature.",
		},
		{
			icon: <GameController size={18} color="#F44336" weight="fill" />,
			color: "#F44336",
			title: "Games",
			description:
				"I like to play games, especially races, FPS and soccer.",
		},
	],
};

export default INFO;
