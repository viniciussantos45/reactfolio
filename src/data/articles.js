function article_1() {
	return {
		date: "18 Feb 2023",
		title: "14 Habits of Highly Productive Programmers",
		description:
			"Here are 14 habits of highly productive programmers that you can use to improve your own productivity.",
		keywords: [
			"Habits of highly productive programmers",
			"Productivity Techniques",
			"Software Development",
			"Vinicius G",
			"Vinicius G.",
			"Vinicius Gomes",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}
				`,
		md: "14-habits",
	};
}

function article_2() {
	return {
		date: "7 May 2023",
		title: "Why not return Base64 in an HTTP request response and how to properly implement image rendering from a specific route using StreamableFile from NestJS.",
		description:
			"Here I explain why it is not a good idea to return Base64 in an HTTP request response and how to properly implement image rendering from a specific route using StreamableFile from NestJS.",
		style: ``,
		keywords: [
			"Base64",
			"HTTP",
			"HTTP Request",
			"HTTP Response",
			"Image Rendering",
			"NestJS",
			"Software Development",
			"StreamableFile",
			"Vinicius",
			"Vinicius G",
			"Vinicius Gomes",
		],
		md: "base64",
	};
}

function article_3() {
	return {
		date: "4 Jul 2023",
		title: "Free deployment of any specific API or WebService on the Render platform using only a Dockerfile.",
		description:
			"Here I explain how to deploy any API or WebService on the Render platform using only a Dockerfile.",
		keywords: [
			"API",
			"Deployment",
			"Docker",
			"Dockerfile",
			"NestJS",
			"Free",
			"Render",
			"WebService",

			"Vinicius",
			"Vinicius G",
			"Vinicius Gomes",
		],
		md: "deploy-render",
	};
}

function article_4() {
	return {
		date: "5 Nov 2023",
		title: "[Pitch | Open Source] ▶Tik Tech: Automatically Generating Programming Videos with AI.",
		description:
			"In this article, I showcase the Tik Tech app and make a call for contributions.",
		keywords: [
			"AI",
			"Artificial Intelligence",
			"Automatic Video Generation",
			"Contribution",
			"Open Source",
			"Programming",
			"Tik Tech",
			"Vinicius",
			"Vinicius G",
			"Vinicius Gomes",
		],
		md: "tik-tech",
	};
}

function article_5() {
	return {
		date: "6 Jan 2024",
		title: "The so-called 'productivity' will lead us to Burnout.",
		description:
			"My perspective on how productivity is sold, and the importance of self-awareness.",
		keywords: [
			"Productivity",
			"Self-awareness",
			"Vinicius",
			"Vinicius G",
			"Vinicius Gomes",
		],
		md: "productivity",
	};
}

const myArticles = [article_1, article_2, article_3, article_4, article_5];

export default myArticles;
