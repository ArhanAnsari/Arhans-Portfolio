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
