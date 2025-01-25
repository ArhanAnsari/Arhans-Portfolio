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
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
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

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
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
        I make websites to help developers
        <br />
        learn how to build 3D apps
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
    level: 80,
  },
  {
    title: "Full Stack Web Development",
    level: 90,
  },
  {
    title: "React / React Native",
    level: 90,
  },
  {
    title: "Nodejs",
    level: 90,
  },
  {
    title: "Programming",
    level: 90,
  },
  {
    title: "Typescript",
    level: 60,
  },
  {
    title: "3D Modeling",
    level: 40,
  },
];
const languages = [
  {
    title: "🇮🇳 Hindi",
    level: 100,
  },
  {
    title: "🇺🇸 English",
    level: 90,
  },
  {
    title: "🇮🇳 Marathi",
    level: 75,
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
      <div className="flex w-full h-full gap-8 items-center justify-center">
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
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
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
