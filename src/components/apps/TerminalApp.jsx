import React, { useState, useRef, useEffect } from 'react';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';

/**
 * Terminal App
 * macOS-style terminal with Arhan's portfolio commands
 */
const TerminalApp = ({ windowId, windowData }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    '✨ Arhan\'s Portfolio Terminal',
    'Type "help" for available commands',
    ''
  ]);
  const outputEndRef = useRef(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const commands = {
    help: () => [
      '📚 Available Commands:',
      '  about       - Learn about Arhan',
      '  projects    - List portfolio projects',
      '  skills      - Display tech stack',
      '  socials     - Show social links',
      '  contact     - Contact information',
      '  availability - Freelance status',
      '  whoami      - Quick identity check',
      '  clear       - Clear terminal',
    ],
    about: () => [
      `👤 ${profile.name}`,
      `📍 Role: ${profile.title}`,
      `💡 Brand: ${profile.brand}`,
      `${profile.bio.intro}`,
    ],
    projects: () => [
      `📂 Showing ${projects.length} projects:`,
      ...projects.slice(0, 5).map(p => `   • ${p.title}`),
      `   ... and ${projects.length - 5} more!`,
    ],
    skills: () => [
      '🛠️  Tech Stack:',
      '   Frontend: React, Next.js, Three.js, Tailwind',
      '   Backend: Node.js, Express, Prisma, Convex',
      '   Databases: MongoDB, PostgreSQL, Firebase',
      '   Mobile: React Native, Expo',
      '   AI: Gemini, OpenAI, LangChain',
      '   3D: Three.js, React Three Fiber, WebGL',
    ],
    socials: () => [
      '🔗 Connect with Arhan:',
      `   GitHub: ${profile.contact.github}`,
      `   LinkedIn: ${profile.contact.linkedin}`,
      `   Twitter: ${profile.contact.twitter}`,
      `   YouTube: ${profile.contact.youtube}`,
      `   Email: ${profile.contact.email}`,
    ],
    contact: () => [
      '📧 Contact Information:',
      `   Email: ${profile.contact.email}`,
      `   Discord: ${profile.contact.discord}`,
      `   Available for: Freelance, Collaboration, Hire`,
    ],
    availability: () => [
      `🟢 Status: ${profile.availability.message}`,
      'Available for:',
      ...profile.availability.services.map(s => `   ✅ ${s}`),
    ],
    whoami: () => [
      `${profile.name} • ${profile.stats.yearsExperience} years experience`,
      `${profile.stats.projects}+ projects • ${profile.stats.contributions} GitHub commits`,
      `${profile.stats.technologiesMastered} technologies mastered`,
    ],
    clear: () => [],
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim().toLowerCase();
      const newOutput = [...output, `$ ${input}`];

      if (commands[cmd]) {
        const result = commands[cmd]();
        newOutput.push(...result);
      } else if (cmd === '') {
        // empty command, just show prompt
      } else {
        newOutput.push(`Command not found: ${cmd}. Type "help" for available commands.`);
      }

      if (cmd !== 'clear') {
        newOutput.push('');
        setOutput(newOutput);
      } else {
        setOutput(['']);
      }
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-black">
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {output.map((line, i) => (
          <div key={i} className={`${
            line.startsWith('$') ? 'text-primary-400' :
            line.includes('📚') || line.includes('👤') || line.includes('📂') || 
            line.includes('🛠️') || line.includes('🔗') || line.includes('📧') ||
            line.includes('🟢') || line.includes('whoami') ? 'text-accent-300' :
            line.startsWith('   ') ? 'text-green-400 ml-4' :
            line.startsWith('ERROR') || line.startsWith('Command not') ? 'text-red-400' :
            'text-green-400'
          }`}>
            {line}
          </div>
        ))}
        <div ref={outputEndRef} />
      </div>
      <div className="p-3 border-t border-neutral-800 bg-neutral-950">
        <div className="flex items-center font-mono text-sm">
          <span className="text-green-400 mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleCommand}
            placeholder="type a command"
            className="flex-1 bg-transparent text-green-400 outline-none placeholder-neutral-600"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalApp;
