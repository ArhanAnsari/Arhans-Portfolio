import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
	{
		title: "Arhan Sales",
		url: "https://arhansales.000webhostapp.com",
		image: "projects/arhansales.png",
		description: "Website of my client.",
	},
	{
		title: "Car Game",
		url: "https://arhanansari.github.io/carGameThreeJS/",
		image: "projects/carGame.jpg",
		description: "A car game made in ThreeJS.",
	},
	{
		title: "vCard Personal Portfolio",
		url: "https://arhanansari.github.io/vcard-personal-portfolio/",
		image: "projects/vCard.png",
		description: "A personal portfolio.",
	},
	{
		title: "Task Manager App",
		url: "https://arhanansari.github.io/Task-Manager-App/",
		image: "projects/taskManager.jpg",
		description: "A task manager app.",
	},
	{
		title: "CodeWithArhan",
		url: "https://codewitharhan.infinityfreeapp.com/",
		image: "projects/CodeWithArhan.png",
		description: "My own website.",
	},
	{
		title: "Birthday Web",
		url: "https://birthday-web-pi.vercel.app/",
		image: "projects/Birthday-Web.jpg",
		description: "A Birthday Web.",
	},
	{
		title: "No Internet Spiderman Game",
		url: "https://no-internet-spiderman-game.vercel.app/",
		image: "projects/NoInternetSpidermanGame.jpg",
		description: "A Spiderman Game",
	},
	//{
	//	title: "AI ChatBot",
	//	url: "https://nextjs-chat-blue-beta-36.vercel.app/",
	//	image: "projects/AI-ChatBot.jpg",
	//	description: "An open-source AI chatbot app template built with Next.js, the Vercel AI SDK, OpenAI, and Vercel KV.",
	//},
	{
		title: "E-commerce Website",
		url: "https://e-commerce-emporium-xrw1em4.gamma.site/",
		image: "projects/ECommerce.jpg",
		description: "An e-commerce website.",
	},
	{
		title: "ChatGPT Clone",
		url: "https://chatgpt-clone-delta-pied.vercel.app/",
		image: "projects/ChatGPT.jpg",
		description: "A ChatGPT clone.",
	},
	{
		title: "ChatBot using JavaScript",
		url: "https://chatbot-dun-omega.vercel.app/",
		image: "projects/ChatBot.png",
		description: "A ChatBot using JavaScript.",
	},
	{
		title: "LeetCode Clone",
		url: "https://leetcode-clone-chi.vercel.app/",
		image: "projects/leetcode.jpg",
		description: "A Full Stack LeetCode Clone.",
	},
	{
		title: "Game Hub",
		url: "https://game-hub-iota-orpin.vercel.app/",
		image: "projects/gamehub.jpg",
		description: "A Gaming Website.",
	},
	{
		title: "Captcha App",
		url: "https://captcha-mu-five.vercel.app/",
		image: "projects/Captcha.jpg",
		description: "A Captcha App.",
	},
	{
		title: "ChatBot using JavaScript",
		url: "https://javascript-chatbot-seven.vercel.app/",
		image: "projects/js-chatbot.jpg",
		description: "A ChatBot using JavaScript.",
	},
	{
		title: "Code Editor",
		url: "https://code-editor-gilt-eta.vercel.app/",
		image: "projects/codeeditor.jpg",
		description: "A Code Editor that support multiple languages",
	},
	{
		title: "Zoom Clone (Yoom)",
		url: "https://zoom-clone-seven-delta.vercel.app/",
		image: "projects/Zoom-Clone(Yoom).jpg",
		description: "Yoom aka Zoom Clone is a full stack app.",
	},
	{
		title: "WhatsUp",
		url: "https://arhans-whatsup.vercel.app/",
		image: "projects/WhatsApp-Clone.jpg",
		description: "A Frontend WhatsApp Clone made with React.",
	},
	{
		title: "InstaSnap",
		url: "https://arhans-instasnap.vercel.app/",
		image: "projects/Instagram-Clone.jpg",
		description: "A Full Stack Instagram Clone.",
	},
	{
		title: "YouTube Clone",
		url: "https://youtube-clone-alpha-black.vercel.app/",
		image: "projects/Youtube.jpg",
		description: "A Youtube Clone made with React JS, Rapid API & Tailwind CSS.",
	},
	{
		title: "Figma Clone",
		url: "https://figma-clone-phi-eight.vercel.app/",
		image: "projects/figma-clone.jpg",
		description: "A minimalistic Figma clone to show how to add real-world features like live collaboration with cursor chat, comments, reactions, and drawing designs (shapes, image upload) on the canvas using fabric.js.",
	},
	{
		title: "Rediscord",
		url: "https://rediscord-eight.vercel.app/",
		image: "projects/discord-clone.jpg",
		description: "Rediscord is a study of Discord UI built in NextJS and TailwindCSS using some shadcn concepts and components showing how powerful are these libs and how they can replicate a specific design and complex UI.",
	},
	{
		title: "Cookmom",
		url: "https://recipe-app-phi-two.vercel.app/",
		image: "projects/cookmom.jpg",
		description: "Cookmom is a recipe app for finding recipe of your favorite food.",
	},
	{
		title: "Among Us",
		url: "https://among-us-gules.vercel.app/",
		image: "projects/AmongUs.png",
		description: "A Fan Made Among Us game made with HTML,CSS,JS,Socket.io.",
	},
	//{
	// 	title: "Collaborative Code Editor",
	// 	url: "https://spgr5d-3000.csb.app/",
	// 	image: "projects/collaborative-code-editor.jpg",
	// 	description: "A Collaborative Code Editor that supports real time collaboration.",
	// },
	// {
	// 	title: "Collaborative To-do List",
	// 	url: "https://75f3l4-3000.csb.app/",
	// 	image: "projects/Collaborative-ToDo-List.jpg",
	// 	description: "A Collaborative To-do List that supports real time collaboration.",
	// },
	// {
	// 	title: "Collaborative Whiteboard",
	// 	url: "https://3n77d7-3000.csb.app/",
	// 	image: "projects/collaborative-whiteboard.jpg",
	// 	description: "A Collaborative Whiteboard that supports real time collaboration.",
	// },
	// {
	// 	title: "Multiplayer 3D Builder",
	// 	url: "https://z37ys9-3000.csb.app/",
	// 	image: "projects/multiplayer-3d-builder.jpg",
	// 	description: "A Multiplayer 3D Builder that supports real time users.",
	// },
	// {
	// 	title: "Live Cursors",
	// 	url: "https://3vsmww-5173.csb.app/",
	// 	image: "projects/live-cursor.jpg",
	// 	description: "A Live Cursor that is made with Vue.js that supports real time users.",
	// },
	// {
	// 	title: "Collaborative Spreadsheet",
	// 	url: "https://ykqxd7-3000.csb.app/",
	// 	image: "projects/spreadsheet.jpg",
	// 	description: "A Collaborative Spreadsheet that supports real time collaboration.",
	// },
	// {
	// 	title: "Comments Primitives",
	// 	url: "https://pwxgj8-3000.csb.app/",
	// 	image: "projects/commentspri.jpg",
	// 	description: "A Comments Primitive that supports real time comments.",
	// },
	// {
	// 	title: "Live Form Selection",
	// 	url: "https://qlt5wd-3000.csb.app/",
	// 	image: "projects/live-form-selection.jpg",
	// 	description: "A Live Form Selection that supports real time users.",
	// },
	// {
	// 	title: "Video Comment",
	// 	url: "https://2sypdd-3000.csb.app/",
	// 	image: "projects/video-comment.jpg",
	// 	description: "A Video Comment that supports real time users and comments.",
	// },
	// {
	// 	title: "Connection Status",
	// 	url: "https://xv8mdp-3000.csb.app/",
	// 	image: "projects/connection-status.jpg",
	// 	description: "A Connection Status that supports real time users.",
	// },
	// {
	// 	title: "Discord Clone",
	// 	url: "https://pll9ft-3000.csb.app/",
	// 	image: "projects/discord.jpg",
	// 	description: "A Discord Clone that has already users profile that you can use it and it also has notification."
	// },
	// {
	// 	title: "Collaborative Rich Text Editor",
	// 	url: "https://xd6zzf-3000.csb.app/",
	// 	image: "projects/rich-text-editor.jpg",
	// 	description: "A Collaborative Rich Text Editor that supports real time users."
	// },
	// {
	// 	title: "Text Editor Comments",
	// 	url: "https://833gmf-3000.csb.app/",
	// 	image: "projects/text-editor-comments.jpg",
	// 	description: "A Text Editor Comments that supports real time users.",
	// },
	{
		title: "Stopwatch",
		url: "https://arhanansari.github.io/stopwatch/",
		image: "projects/stopwatch.jpg",
		description: "A Simple Stopwatch made with HTML,CSS,JS.",
	},
	{
		title: "RK Marketing",
		url: "https://rk-marketing.vercel.app/",
		image: "projects/rk-marketing.jpg",
		description: "This is a website of my client. This is a Shopping Website made with HTML,CSS,JS.",
	},
	{
		title: "Dictionary App",
		url: "https://dictionary-app-indol-one.vercel.app/",
		image: "projects/dictionary.jpg",
		description: "A simple dictionary app using HTML,CSS,JS and Dictionary API.",
	},
	{
		title: "Drawing App",
		url: "https://arhanansari.github.io/drawing-app/",
		image: "projects/drawing-app.jpg",
		description: "A simple drawing app using HTML,CSS,JS.",
	},
	{
		title: "Multiplayer Pirate Card Game",
		url: "https://multiplayer-pirate-card-game.vercel.app/#r=RHCFL",
		image: "projects/multiplayer-pirate-card-game.jpg",
		description: "A Card Game using JavaScript w/ React Three Fibre and Playroom Stream Room.",
	},
	{
		title: "Arhan Guys",
		url: "https://arhan-guys.vercel.app/",
		image: "projects/Arhan-Guys.jpg",
		description: "Arhan Guys is Fall Guys Game Clone made with React Three Fibre/ThreeJS.",
	},
	{
		title: "Crud Operation",
		url: "https://arhanansari.github.io/Crud/",
		image: "projects/Crud.jpg",
		description: "This is a simple CRUD Operation App made with using HTML,CSS,JS.",
	},
	{
		title: "Emoji Dice Roller",
		url: "https://arhanansari.github.io/Emoji_Dice_Roller/",
		image: "projects/emoji-dice-roller.jpg",
		description: "A simple Emoji Dice Roller using HTML,CSS,JS.",
	},
	{
		title: "Arhan Laptop.in",
		url: "https://arhanansari.github.io/Arhan-Laptop.in/",
		image: "projects/ArhanLaptop.in.jpg",
		description: "A simple shopping website made with HTML,CSS,JS.",
	},
	{
		title: "Quiz App",
		url: "https://arhanansari.github.io/Quiz_App/",
		image: "projects/quizapp.png",
		description: "This project is created with HTML, CSS and JavaScript that allows user to answer given questions.It includes sections for starting the quiz, displaying quiz information. There’s a timer, for each question and its options. If the user doesn’t answer within the time limit, then the next question appears automatically. After selecting an option, it checks if it’s correct or not. At the end,it displays your score with a result message.It also has the option to restart the quiz or quit.",
	},
	{
		title: "Paytm Clone",
		url: "https://arhanansari.github.io/Paytm-Clone/",
		image: "projects/paytmclone.png",
		description: "This Paytm Home Page Clone project replicates the user interface and design of the Paytm company's homepage. Utilizing a combination of HTML, CSS, and Bootstrap, the project aims to recreate the visual aesthetics of the original Paytm homepage. Notably, the implementation is designed to be responsive, ensuring a seamless and consistent user experience across various devices and screen sizes.",
	},
	{
		title: "Aaiza Cosmetics",
		url: "https://aaizacosmetics.vercel.app/",
		image: "projects/Aaiza-Cosmetics.jpg",
		description: "This is a website of my client. This is a Shopping Website made with HTML,CSS,JS.",
	},
	{
		title: "Father's Day",
		url: "https://fathers-day-tau.vercel.app/",
		image: "projects/Fathers-Day.png",
		description: "This is a professional Father's Day wishing website designed with HTML, CSS, and JavaScript.The clean and modern design ensures a delightful user experience, making it a perfect way to celebrate and honor fathers. The responsive layout ensures compatibility across various devices, while the simple JavaScript functionality adds a touch of interactivity.",
	},
	{
		title: "Password Generator",
		url: "https://arhanansari.github.io/Password-Generator-YT/",
		image: "projects/Password-Generator.jpg",
		description: "A simple and beautiful Password Generator built with HTML,CSS,JS. ",
	},
	{
		title: "Password Validator",
		url: "https://password-validator-yt.vercel.app/",
		image: "projects/Password-Validator.jpg",
		description: "A simple and beautiful Password Validator built with HTML,CSS,JS.",
	},
	{
		title: "Kanban Task Management",
		url: "https://kanban-task-management-project.vercel.app/",
		image: "projects/Karban-Task-Management.jpg",
		description: "This project is a recreation of the famous task management application Karban.It aims to provide a user-friendly and efficient interface for organizing your daily tasks.",
	},
	{
		title: "Colour Flipper",
		url: "https://simple-colour-flipper-app-yt.vercel.app/",
		image: "projects/Colour-Flipper.jpg",
		description: "A simple and beautiful Colour Flipper built with HTML,CSS,JS.",
	},
	{
		title: "Chat to PDF",
		url: "https://arhans-chat-to-pdf.vercel.app/",
		image: "projects/chattopdf.jpg",
		description: "My first AI SaaS app made with using Next.js, Clerk, React Dropzone, Shadcn UI, Pinecone, Langchain, Gemini, OpenAI, Stripe. Chat to PDF let's you PDF and then you can chat with AI if you any problems with PDF.",
	},
	{
		title: "SoundStream",
		url: "https://soundstream.vercel.app/",
		image: "projects/soundstream.jpg",
		description: "This is a Spotify Clone made with Vite, Vue 3, Tailwind CSS, and Pinia.",
	},
	{
		title: "hexta/ui",
		url: "https://ui-hexta.vercel.app/",
		image: "projects/ui-hexta.jpg",
		description: "HextaUI is a user interface library that offers contemporary components, making it effortless to integrate into your projects. With the HextaUI CLI, you can quickly install and utilize these components without any hassle.",
	},
	{
		title: "Language Translator",
		url: "https://language-translator-app-phi.vercel.app/",
		image: "projects/language-translator.jpg",
		description: "Language translator is a program that is used to translate text into multiple languages like Nepali, Hindi, Spanish, etc. In my language translator app, users can easily translate text into different languages, copy translated text, and convert text to speech. It is similar to Google Translate. Made with HTML, CSS, JS and MyMemory API",
	},
	{
		title: "Google Translate",
		url: "https://arhans-google-translate.vercel.app/",
		image: "projects/Google-Translate.jpg",
		description: "A simple Google Translate Clone made with HTML, CSS, JS and Google Translate API. It has a Dark mode feature too.",
	},
	{
		title: "Gemini",
		url: "https://gemini-ai-chatbot-pchm.vercel.app/",
		image: "projects/Gemini.jpg",
		description: "A Gemini Chatbot built with Next.js, Vercel AI SDK and Google Gemini.",
	},
	{
		title: "Carrefour",
		url: "https://arhans-ecommerce.vercel.app/",
		image: "projects/CareeFour.jpg",
		description: "This is a full stack Ecommerce website.",
	},
	{
		title: "Windows 11",
		url: "https://arhans-windows11.vercel.app/",
		image: "projects/Windows11.jpg",
		description: "A Windows 11 Clone app built with React, Tailwind CSS, Framer Motion, React Draggable, React Router DOM.",
	},
	{
		title: "RentUP",
		url: "https://arhans-rentup.vercel.app/",
		image: "projects/RentUP.png",
		description: "A Real Estate Website built with React. ",
	},
	{
		title: "Crousal Maker",
		url: "https://crousalmaker.vercel.app/",
		image: "projects/Crousal Maker.jpg",
		description: "My 2nd SaaS App. Crousal maker is a simple crousal editing platform with in-built crousals templates only you can edit heading , descriptions and Images and download it in both format PDF and JPEG. Built with Nextjs, Typescript, Shadcn UI, js-pdf, Html2canvas and tinyColor2.",
	},
	{
		title: "ArhanBlog",
		url: "https://arhanblog.vercel.app/",
		image: "projects/ArhanBlog.jpg",
		description: "A Markdown blog made with using Next.js, TailwindCSS, Shadcn, Pieces, Remark and Rehype.",
	},
	{
		title: "Mixcnui",
		url: "https://mixcnui.vercel.app/",
		image: "projects/Mixcnui.jpg",
		description: "My 3rd SaaS App. Mixcnui is 20+ free and open-source animated components built with React, Typescript, Tailwind CSS, and Framer Motion. Built with React, Next.js, TailwindCSS, Framer Motion. ",
	},
	{
		title: "Metaverse",
		url: "https://arhans-metaverse.vercel.app/",
		image: "projects/Metaverse.jpg",
		description: "A Metaverse Website made with Next.js, TailwindCSS & Framer Motion.",
	},
	{
		title: "Evogym",
		url: "https://evogym-brown-mu.vercel.app/",
		image: "projects/Evogym.png",
		description: "A Gym Website made with React.",
	},
	{
		title: "InspireGem",
		url: "https://inspiregem.vercel.app/",
		image: "projects/InspireGem.png",
		description: "InspireGem is a AI Powered Website made with Next.js, TailwindCSS, Google Gemini, Stripe amnd Google Firebase",
	},
];

const Project = (props) => {
	const { project, highlighted } = props;

	const background = useRef();
	const bgOpacity = useMotionValue(0.4);

	useEffect(() => {
		animate(bgOpacity, highlighted ? 0.7 : 0.4);
	}, [highlighted]);

	useFrame(() => {
		background.current.material.opacity = bgOpacity.get();
	});

	return (
		<group {...props}>
			<mesh
				position-z={-0.001}
				onClick={() =>
					window.open(project.url, "_blank")
				}
				ref={background}
			>
				<planeGeometry args={[2.2, 2]} />
				<meshBasicMaterial
					color="black"
					transparent
					opacity={0.4}
				/>
			</mesh>
			<Image
				scale={[2, 1.2, 1]}
				url={project.image}
				toneMapped={false}
				position-y={0.3}
			/>
			<Text
				maxWidth={2}
				anchorX={"left"}
				anchorY={"top"}
				fontSize={0.2}
				position={[-1, -0.4, 0]}
			>
				{project.title.toUpperCase()}
			</Text>
			<Text
				maxWidth={2}
				anchorX="left"
				anchorY="top"
				fontSize={0.1}
				position={[-1, -0.6, 0]}
			>
				{project.description}
			</Text>
		</group>
	);
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
	const { viewport } = useThree();
	const [currentProject] = useAtom(currentProjectAtom);

	return (
		<group position-y={-viewport.height * 2 + 1}>
			{projects.map((project, index) => (
				<motion.group
					key={"project_" + index}
					position={[index * 2.5, 0, -3]}
					animate={{
						x:
							0 +
							(index -
								currentProject) *
								2.5,
						y:
							currentProject === index
								? 0
								: -0.1,
						z:
							currentProject === index
								? -2
								: -3,
						rotateX:
							currentProject === index
								? 0
								: -Math.PI / 3,
						rotateZ:
							currentProject === index
								? 0
								: -0.1 *
									Math.PI,
					}}
				>
					<Project
						project={project}
						highlighted={
							index === currentProject
						}
					/>
				</motion.group>
			))}
		</group>
	);
};
