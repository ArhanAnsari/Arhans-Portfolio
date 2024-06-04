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
		description: "Website of my clien.",
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
	{
		title: "AI ChatBot",
		url: "https://nextjs-chat-blue-beta-36.vercel.app/",
		image: "projects/AI-ChatBot.jpg",
		description: "An open-source AI chatbot app template built with Next.js, the Vercel AI SDK, OpenAI, and Vercel KV.",
	},
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
		title: "WhatsApp Clone",
		url: "https://whatsapp-clone-next14-two.vercel.app/",
		image: "projects/WhatsApp-Clone.jpg",
		description: "A Full Stack WhatsApp.",
	},
	{
		title: "Instagram Clone",
		url: "https://instagram-clone-fifteen.vercel.app/",
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
		title: "Among Us",
		url: "https://among-us-gules.vercel.app/",
		image: "projects/AmongUs.png",
		description: "A Fan Made Among Us game made with HTML,CSS,JS,Socket.io.",
	},
	{
		title: "Collaborative Code Editor",
		url: "https://spgr5d-3000.csb.app/",
		image: "projects/collaborative-code-editor.jpg",
		description: "A Collaborative Code Editor that supports real time collaboration.",
	},
	{
		title: "Collaborative To-do List",
		url: "https://75f3l4-3000.csb.app/",
		image: "projects/Collaborative-ToDo-List.jpg",
		description: "A Collaborative To-do List that supports real time collaboration.",
	},
	{
		title: "Collaborative Whiteboard",
		url: "https://3n77d7-3000.csb.app/",
		image: "projects/collaborative-whiteboard.jpg",
		description: "A Collaborative Whiteboard that supports real time collaboration.",
	},
	{
		title: "Multiplayer 3D Builder",
		url: "https://z37ys9-3000.csb.app/",
		image: "projects/multiplayer-3d-builder.jpg",
		description: "A Multiplayer 3D Builder that supports real time users.",
	},
	{
		title: "Live Cursors",
		url: "https://3vsmww-5173.csb.app/",
		image: "projects/live-cursor.jpg",
		description: "A Live Cursor that is made with Vue.js that supports real time users.",
	},
	{
		title: "Collaborative Spreadsheet",
		url: "https://ykqxd7-3000.csb.app/",
		image: "projects/spreadsheet.jpg",
		description: "A Collaborative Spreadsheet that supports real time collaboration.",
	},
	{
		title: "Comments Primitives",
		url: "https://pwxgj8-3000.csb.app/",
		image: "projects/commentspri.jpg",
		description: "A Comments Primitive that supports real time comments.",
	},
	{
		title: "Live Form Selection",
		url: "https://qlt5wd-3000.csb.app/",
		image: "projects/live-form-selection.jpg",
		description: "A Live Form Selection that supports real time users.",
	},
	{
		title: "Video Comment",
		url: "https://2sypdd-3000.csb.app/",
		image: "projects/video-comment.jpg",
		description: "A Video Comment that supports real time users and comments.",
	},
	{
		title: "Connection Status",
		url: "https://xv8mdp-3000.csb.app/",
		image: "projects/connection-status.jpg",
		description: "A Connection Status that supports real time users.",
	},
	{
		title: "Discord Clone",
		url: "https://pll9ft-3000.csb.app/",
		image: "projects/discord.jpg",
		description: "A Discord Clone that has already users profile that you can use it and it also has notification."
	},
	{
		title: "Collaborative Rich Text Editor",
		url: "https://xd6zzf-3000.csb.app/",
		image: "projects/rich-text-editor.jpg",
		description: "A Collaborative Rich Text Editor that supports real time users."
	},
	{
		title: "Text Editor Comments",
		url: "https://833gmf-3000.csb.app/",
		image: "projects/text-editor-comments.jpg",
		description: "A Text Editor Comments that supports real time users.",
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
