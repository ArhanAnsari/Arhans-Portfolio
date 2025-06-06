import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
	{
		title: "Arhan Sales",
		url: "https://arhan-sales.infinityfreeapp.com/",
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
		title: "No Internet Spiderman Game",
		url: "https://no-internet-spiderman-game.vercel.app/",
		image: "projects/NoInternetSpidermanGame.jpg",
		description: "A Spiderman Game",
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
		title: "Nike Landing Page",
		url: "https://nike-landing-page-seven-tan.vercel.app/",
		image: "projects/Nike-Landing-Page.png",
		description: "A Nike Landing Page made with TailwindCSS.",
	},
	{
		title: "InspireGem",
		url: "https://inspiregem.vercel.app/",
		image: "projects/InspireGem.png",
		description: "InspireGem is a AI Powered Website made with Next.js, TailwindCSS, Google Gemini, Stripe amnd Google Firebase",
	},
	{
		title: "YC DIRECTORY",
		url: "https://yc-directory-red.vercel.app/",
		image: "projects/YC-DIRECTORY.jpg",
		description: "A Next.js 15 platform where entrepreneurs can submit their startup ideas for virtual pitch competitions, browse other pitches, and gain exposure through a clean minimalistic design for a smooth user experience. It is made with React 19, Next.js 15, Sanity, TailwindCSS, ShadCN, TypeScript",
	},
	{
		title: "StoreIt",
		url: "https://storeit-five.vercel.app/",
		image: "projects/StoreIt.png",
		description: "A storage management and file sharing platform that lets users effortlessly upload, organize, and share files. Built with the latest Next.js 15 and the Appwrite Node SDK, utilizing advanced features for seamless file management. It is made with React 19, Next.js 15, Appwrite, TailwindCSS, ShadCN, TypeScript.",
	},
	{
		title: "An Awwwards Winning Website",
		url: "https://award-winning-website-iota.vercel.app/",
		image: "projects/Award-Winning-Website.png",
		description: "Build a visually captivating website inspired by Zentry, featuring scroll-triggered animations, geometric transitions, and engaging video storytelling. Learn how to deliver a luxurious, modern feel, focusing on engaging UI/UX and smooth responsiveness, capturing the essence of what makes an Awwwards winner. It is made with GSAP, React.js, Tailwind CSS",
	},
	{
		title: "Restyled",
		url: "https://restyled-ecru.vercel.app/",
		image: "projects/restyled.png",
		description: "Restyled is a Image Editor & Video Editor also having AI support and is made with Next.js, TailwindCSS and Cloudinary.",
	},
	{
		title: "Immersilearn",
		url: "https://immersilearn.vercel.app/",
		image: "projects/immersilearn.png",
		description: "Immersilearn is a platform for learning and it has a clean and minimalistic design for a smooth user experience. It is made with React 19, Next.js 15, TailwindCSS, TypeScript and Appwrite.",
	},
	{
		title: "CodeFount",
		url: "https://codefount.vercel.app/",
		image: "projects/CodeFount.png",
		description: "A sleek and modern online IDE built with Next.js 15, Convex, Sentry, Lemon Squeezy, Clerk and EmailJS, offering multi-language support, customization, and community-driven collaboration. Perfect for developers seeking a powerful and seamless coding environment. ",
	},
	{
		title: "Happy New Year 2025",
		url: "https://happynewyear2025-olive.vercel.app/",
		image: "projects/happynewyear2025.png",
		description: "A Happy New Year 2025 Website made with HTML, CSS, JS.",
	},
	{
		title: "Happy Republic Day 2025",
		url: "https://happy-republic-day-one.vercel.app/",
		image: "projects/happyrepublicday2025.png",
		description: "A Happy Republic Day 2025 Website made with HTML, CSS, JS.",
	},
	{
		title: "Moodflix",
		url : "https://moodflix-theta.vercel.app/",
		image : "projects/moodflix.png",
		description : "Moodflix is a platform that allows users to discover movies based on their mood. It is made with React 19, Tailwind CSS, and the TMDb API.",
	},
	{
		title: "Synthara",
		url: "https://synthara.is-a.dev/",
		image: "projects/Synthara.png",
		description: "Synthara is an advanced AI-powered application designed to process and generate insights from various types of files. Initially focused on image processing. Made with Next.js, Tailwind CSS, Gemini, Shadcn/ui and Together AI.",
	},
	{
		title: "Clipgen AI",
		url: "https://clipgen-ai.vercel.app/",
		image: "projects/Clipgen AI.png",
		description: "This is an AI-powered content analysis platform that helps content creators get insights from their YouTube videos. The platform uses advanced AI to analyze video content, generate transcriptions, create thumbnails, and provide content recommendations. Made with Next.js 15, React 19, TailwindCSS, AI SDK, Gemini, Together AI, Clerk, Convex, Radix UI components and youtubei.js for video data extraction.",
	},
	{
		title: "Reddish",
		url: "https://arhans-reddish.vercel.app/",
		image: "projects/Reddish.jpg",
		description: "Reddish is a Reddit Clone made with Next.js 15, TailwindCSS, ShadCN, Radix UI, TypeScript, Sanity CMS, Sentry, Clerk, Lucide Icons, Gemini API, Vercel.",
	},
	{
		title: "Clystra Networks Pvt. Ltd.",
		url: "https://www.clystranetworks.com/",
		image: "projects/Clystra-Networks.png",
		description: "This is a website of my client. This is a Network Infrastructure Provider Company made with Next.js 15, TailwindCSS, ShadCN, TypeScript, Framer Motion, React, Sentry and Resend.",
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
