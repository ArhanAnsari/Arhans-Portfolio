import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import axios from "axios";

const Section = (props) => {
  const { children, mobileTop } = props;

  return (
    <motion.section
      className={`
  relative min-h-screen w-full p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start
  ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

const testimonials = [
  {
    name: "Clystra Networks Pvt. Ltd.",
    role: "Client",
    content: "Working with Arhan was an exceptional experience. His expertise in full-stack development and attention to detail helped us create a robust and scalable solution. His ability to understand our requirements and translate them into practical solutions was impressive.",
    image: "/testimonials/clystra-logo.png"
  },
];

const currentWork = {
  title: "AI-Powered Redit Clone (Reddish)",
  description: "Currently developing a cutting-edge Redit Clone (Reddish) that leverages artificial intelligence for moderating and classifying content. The project utilizes React, Node.js, and TensorFlow.",
  progress: 85,
  technologies: ["Next.js", "TypeScript", "Sanity CMS", "Clerk", "Tailwind CSS", "Radix UI", "Lucide Icons", "Gemini API", "Vercel"],
  startDate: "April 2025"
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="relative flex flex-col w-full overflow-y-auto overflow-x-hidden">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <CurrentWorkSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section mobileTop>
      <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic">Arhan Ansari</span>
      </h1>
      <motion.p
        className="text-lg text-gray-600 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        I'm a versatile Full Stack Developer  
        <br />
        mastering all aspects of modern web development
      </motion.p>
      <motion.button
        onClick={() => setSection(3)}
        className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 100,
  },
  {
    title: "Full Stack Web Development",
    level: 100,
  },
  {
    title: "React / React Native",
    level: 100,
  },
  {
    title: "Nodejs",
    level: 100,
  },
  {
    title: "Programming",
    level: 100,
  },
  {
    title: "Typescript",
    level: 100,
  },
  {
    title: "3D Modeling",
    level: 95,
  },
];
const languages = [
  {
    title: "🇮🇳 Hindi",
    level: 100,
  },
  {
    title: "🇺🇸 English",
    level: 100,
  },
  {
    title: "🇮🇳 Marathi",
    level: 85,
  },
];

const SkillsSection = () => {
  return (
    <Section>
      <motion.div className="w-full" whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
        <div className="mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-full md:w-64" key={index}>
              <motion.h3
                className="text-lg md:text-xl font-bold text-gray-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">
            Languages
          </h2>
          <div className="mt-8 space-y-4">
            {languages.map((lng, index) => (
              <div className="w-full md:w-64" key={index}>
                <motion.h3
                  className="text-lg md:text-xl font-bold text-gray-100"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full "
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-10 items-center justify-center">
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-3xl md:text-5xl font-bold">Projects</h2>
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};

const TestimonialsSection = () => {
  return (
    <Section>
      <motion.div className="w-full" whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 p-4 md:p-6 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 1,
                    delay: 0.5 + index * 0.2,
                  },
                },
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                <div className="w-16 h-16 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-lg font-bold text-white">{testimonial.name}</h3>
                  <p className="text-gray-300 text-sm md:text-base">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-200 italic text-sm md:text-base leading-relaxed">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

const CurrentWorkSection = () => {
  return (
    <Section>
      <motion.div className="w-full max-w-[90vw] md:max-w-[800px]" whileInView={"visible"}>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Currently Working On</h2>
        <motion.div
          className="bg-white bg-opacity-10 p-6 md:p-8 rounded-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                delay: 0.5,
              },
            },
          }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{currentWork.title}</h3>
          <p className="text-gray-200 text-sm md:text-base mb-6 leading-relaxed">{currentWork.description}</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm md:text-base text-gray-300 mb-2">
              <span>Progress</span>
              <span>{currentWork.progress}%</span>
            </div>
            <div className="h-2 md:h-3 w-full bg-gray-200 bg-opacity-20 rounded-full">
              <motion.div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${currentWork.progress}%` }}
                initial={{ scaleX: 0, originX: 0 }}
                variants={{
                  visible: {
                    scaleX: 1,
                    transition: {
                      duration: 1,
                      delay: 1,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3">
            {currentWork.technologies.map((tech, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-indigo-500 bg-opacity-20 rounded-full text-indigo-300 text-xs md:text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                variants={{
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.4,
                      delay: 1.2 + index * 0.1,
                    },
                  },
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <p className="text-gray-400 text-xs md:text-sm mt-6">Started: {currentWork.startDate}</p>
        </motion.div>
      </motion.div>
    </Section>
  );
};

const ContactSection = () => {
  const [state, handleSubmit] = useForm("mayzgjbd");
  const [formValues, setFormValues] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isFormValid =
    formValues.user_name.trim() &&
    formValues.user_email.trim() &&
    formValues.message.trim();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Get the reCAPTCHA token
      const recaptchaToken = await executeRecaptcha();

      if (!recaptchaToken) {
        alert("reCAPTCHA verification failed.");
        setIsSubmitting(false);
        return;
      }

      // Proceed with form submission
      emailjs
        .sendForm("service_oxjis4c", "template_ho0bwum", e.target, {
          publicKey: "7i7_YEAdQWQzN_UBZ",
        })
        .then(
          () => {
            alert("Form submitted successfully!");
            setFormValues({ user_name: "", user_email: "", message: "" });
          },
          (error) => {
            console.error("Failed to send email:", error.text);
            alert("Form submission failed. Please try again.");
          }
        );
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const executeRecaptcha = async () => {
    return new Promise((resolve) => {
      if (!window.grecaptcha) {
        console.error("reCAPTCHA script is not loaded.");
        resolve("");
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute( import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
            action: "submit",
          })
          .then((token) => {
            setRecaptchaToken(token);
            resolve(token);
          })
          .catch((error) => {
            console.error("reCAPTCHA execution failed:", error);
            resolve("");
          });
      });
    });
  };

  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        {state.succeeded ? (
          <p className="text-gray-900 text-center">Thanks for your message!</p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            {/* Name Field */}
            <label
              htmlFor="name"
              className="font-medium text-gray-900 block mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="user_name"
              id="name"
              value={formValues.user_name}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />

            {/* Email Field */}
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="user_email"
              id="email"
              value={formValues.user_email}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              prefix="Email"
              field="email"
              errors={state.errors}
            />

            {/* Message Field */}
            <label
              htmlFor="message"
              className="font-medium text-gray-900 block mb-1 mt-8"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              value={formValues.message}
              onChange={handleInputChange}
              className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError
              className="mt-1 text-red-500"
              errors={state.errors}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`py-4 px-8 rounded-lg font-bold text-lg mt-16 ${
                isFormValid
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};
