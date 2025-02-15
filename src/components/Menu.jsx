import { FaGithub, FaYoutube, FaDiscord, FaGlobe, FaXTwitter } from "react-icons/fa6";

export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-20 fixed top-4 right-4 md:top-12 md:right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md"
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45  translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-full md:w-80" : "w-0"}`}
      >
        <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
          <MenuButton label="About" onClick={() => onSectionChange(0)} />
          <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
          <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
          <MenuButton label="Contact" onClick={() => onSectionChange(3)} />
        </div>
        <div className="flex items-center justify-center gap-4 p-4 border-t">
          <SocialLink
            href="https://github.com/ArhanAnsari"
            icon={<FaGithub size={24} />}
            label="GitHub"
          />
          <SocialLink
            href="https://youtube.com/@codewitharhanofficial"
            icon={<FaYoutube size={24} />}
            label="YouTube"
          />
          <SocialLink
            href="https://discord.com/invite/bwjCXVwS8k"
            icon={<FaDiscord size={24} />}
            label="Discord"
          />
          <SocialLink
            href="https://codewitharhan.infinityfreeapp.com"
            icon={<FaGlobe size={24} />}
            label="Website"
          />
          <SocialLink
            href="https://x.com/codewitharhan"
            icon={<FaXTwitter size={24} />}
            label="X (Twitter)"
          />
        </div>
      </div>
    </>
  );
};

const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
    >
      {label}
    </button>
  );
};

const SocialLink = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  );
};
