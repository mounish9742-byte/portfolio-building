import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';

const Starfield3D = lazy(() => import('./components/ThreeComponents').then(m => ({ default: m.Starfield3D })));
const TechOrbit3D = lazy(() => import('./components/ThreeComponents').then(m => ({ default: m.TechOrbit3D })));

// Custom Minimalist SVG Icon Components to ensure compatibility without external packages
const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const IconUnlock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
);
const IconPencil = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
);
const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);
const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const IconGithub = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const IconLinkedin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const IconExternal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
);
const IconSchool = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>
);
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const IconAward = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
);

export default function App() {
  // --- STATE SYSTEM ---
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminToast, setShowAdminToast] = useState(false);

  // Hero State
  const [hero, setHero] = useState({
    name: 'Mounish B',
    headline: '3rd Semester BTech CSIT • Software Engineer Aspirant',
    tagline: 'Passionate about building practical software, core computer science concepts, problem solving, and modern web technologies.',
    avatar: '/assets/images/mounish.jpeg'
  });
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [heroForm, setHeroForm] = useState({ ...hero });

  // Skills Inventory
  const [skills, setSkills] = useState({
    languages: ['C', 'Python', 'Java'],
    webdev: ['HTML']
  });
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [skillsForm, setSkillsForm] = useState({
    languages: skills.languages.join(', '),
    webdev: skills.webdev.join(', ')
  });

  // Projects State
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Typing Test',
      problem: 'Standard typing tests are cluttered with distracting ads and lack granular, local-first performance metrics.',
      solution: 'Built a sleek, distraction-free typing diagnostic tool using clientside React state to measure real-time WPM and errors.',
      impact: 'Enables developers to run locally cached typing drills with zero network requests or third-party tracking scripts.',
      tags: ['React', 'Tailwind', 'JavaScript'],
      link: '#',
      type: 'typing'
    },
    {
      id: 2,
      title: 'Smart Medicine Reminder',
      problem: 'Patients frequently experience dosage schedule drift due to overly complex interfaces or privacy issues in cloud reminder apps.',
      solution: 'Created a secure, privacy-first medication adherence logger that synchronizes schedule lists directly to browser LocalStorage.',
      impact: 'Restores user agency over prescription tracking with immediate mock system alerts, operating fully client-side.',
      tags: ['React', 'Tailwind', 'LocalStorage'],
      link: '#',
      type: 'medicine'
    },
    {
      id: 3,
      title: '2D Graphics Editor',
      problem: 'Generating basic vector assets or SVGs in public spaces usually requires launching resource-intensive graphic suites.',
      solution: 'Engineered a lightweight HTML5 Canvas workbench with dynamic shape parameters, color palettes, and SVG output generation.',
      impact: 'Provides a zero-install vector editor that runs in the browser, outputting clean standard SVG files instantly.',
      tags: ['HTML5 Canvas', 'SVG', 'React State'],
      link: '#',
      type: 'graphics'
    }
  ]);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({ id: null, title: '', problem: '', solution: '', impact: '', tags: '', link: '', type: 'custom' });

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      title: 'Activity 1: Hello World (C Programming)',
      issuer: 'GitHub / Programming Fundamentals',
      date: 'Aug 2026',
      link: 'https://github.com/mounish9742-byte/hello-world-c.git'
    },
    {
      id: 2,
      title: 'Activity 2: Pair Programming & Collaboration',
      issuer: 'GitHub / Teamwork & Code Review',
      date: 'Sept 2026',
      link: 'https://github.com/mounish9742-byte/ACP_project.git'
    },
    {
      id: 3,
      title: 'Activity 3: GitLens & VS Code Live Share',
      issuer: 'GitHub / Version Control & Remote Editing',
      date: 'Sept 2026',
      link: 'https://github.com/mounish9742-byte/lineeditor.c.git'
    },
    {
      id: 4,
      title: 'Activity 4: LeetCode Solutions & Data Structures',
      issuer: 'GitHub / Problem Solving & Algorithms',
      date: 'Oct 2026',
      link: 'https://github.com/mounish9742-byte/leetcode-solutions.git'
    }
  ]);
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [certForm, setCertForm] = useState({ id: null, title: '', issuer: '', date: '', link: '' });

  // Active Project Demo Drawer
  const [activeDemoProject, setActiveDemoProject] = useState(null);

  // Contact Form State
  const [contact, setContact] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  // --- ACTIONS & HANDLERS ---
  const toggleAdminMode = () => {
    const nextMode = !isAdminMode;
    setIsAdminMode(nextMode);
    if (nextMode) {
      setShowAdminToast(true);
      setTimeout(() => setShowAdminToast(false), 5000);
    }
  };

  // Hero Handlers
  const handleEditHeroSubmit = (e) => {
    e.preventDefault();
    setHero({ ...heroForm });
    setIsEditingHero(false);
    triggerSuccessToast('Hero section updated successfully!');
  };

  // Skills Handlers
  const handleEditSkillsSubmit = (e) => {
    e.preventDefault();
    setSkills({
      languages: skillsForm.languages.split(',').map(s => s.trim()).filter(Boolean),
      webdev: skillsForm.webdev.split(',').map(s => s.trim()).filter(Boolean)
    });
    setIsEditingSkills(false);
    triggerSuccessToast('Skills inventory updated successfully!');
  };

  // Project Modals & Form
  const openProjectModal = (proj = null) => {
    if (proj) {
      setProjectForm({
        id: proj.id,
        title: proj.title,
        problem: proj.problem || '',
        solution: proj.solution || '',
        impact: proj.impact || '',
        tags: proj.tags.join(', '),
        link: proj.link,
        type: proj.type || 'custom'
      });
    } else {
      setProjectForm({ id: null, title: '', problem: '', solution: '', impact: '', tags: '', link: '#', type: 'custom' });
    }
    setIsEditingProject(true);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.problem || !projectForm.solution || !projectForm.impact) return;

    const formattedTags = projectForm.tags.split(',').map(t => t.trim()).filter(Boolean);

    if (projectForm.id) {
      // Edit
      setProjects(projects.map(p => p.id === projectForm.id ? {
        ...p,
        title: projectForm.title,
        problem: projectForm.problem,
        solution: projectForm.solution,
        impact: projectForm.impact,
        tags: formattedTags,
        link: projectForm.link
      } : p));
      triggerSuccessToast('Project details updated!');
    } else {
      // Add
      const newProj = {
        id: Date.now(),
        title: projectForm.title,
        problem: projectForm.problem,
        solution: projectForm.solution,
        impact: projectForm.impact,
        tags: formattedTags,
        link: projectForm.link,
        type: 'custom'
      };
      setProjects([...projects, newProj]);
      triggerSuccessToast('New project added to your portfolio!');
    }
    setIsEditingProject(false);
  };

  const handleDeleteProject = (id, e) => {
    e.stopPropagation();
    setProjects(projects.filter(p => p.id !== id));
    triggerSuccessToast('Project deleted successfully.');
  };

  // Certification Modals & Form
  const openCertModal = (cert = null) => {
    if (cert) {
      setCertForm({
        id: cert.id,
        title: cert.title,
        issuer: cert.issuer,
        date: cert.date,
        link: cert.link
      });
    } else {
      setCertForm({ id: null, title: '', issuer: '', date: '', link: '#' });
    }
    setIsEditingCert(true);
  };

  const handleCertSubmit = (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) return;

    if (certForm.id) {
      // Edit
      setCertifications(certifications.map(c => c.id === certForm.id ? { ...c, title: certForm.title, issuer: certForm.issuer, date: certForm.date, link: certForm.link } : c));
      triggerSuccessToast('Certification updated!');
    } else {
      // Add
      const newCert = {
        id: Date.now(),
        title: certForm.title,
        issuer: certForm.issuer,
        date: certForm.date || 'Present',
        link: certForm.link
      };
      setCertifications([...certifications, newCert]);
      triggerSuccessToast('Certification added!');
    }
    setIsEditingCert(false);
  };

  const handleDeleteCert = (id, e) => {
    e.stopPropagation();
    setCertifications(certifications.filter(c => c.id !== id));
    triggerSuccessToast('Certification deleted.');
  };

  // Contact Form Handlers
  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!contact.name.trim()) errors.name = 'Name is required';
    if (!contact.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      errors.email = 'Invalid email address';
    }
    if (!contact.message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const subject = contact.subject.trim() || `Portfolio message from ${contact.name.trim()}`;
    const body = [
      `Name: ${contact.name.trim()}`,
      `Email: ${contact.email.trim()}`,
      '',
      contact.message.trim()
    ].join('\n');
    const mailtoUrl = `mailto:mounish9742@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    triggerSuccessToast('Your email app should open with the message ready. Press Send there to deliver it.');
  };

  const triggerSuccessToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --- SUB-WIDGET COMPONENTS (Mini-demos) ---

  // 1. TYPING TEST WIDGET
  const TypingTestWidget = () => {
    const textToType = "Computer Science and Information Technology is the engine of modern innovation.";
    const [typedText, setTypedText] = useState('');
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isStarted, setIsStarted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
      const value = e.target.value;
      if (!isStarted) {
        setIsStarted(true);
        setStartTime(Date.now());
      }

      setTypedText(value);

      // Accuracy Calc
      let correctChars = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] === textToType[i]) correctChars++;
      }
      const acc = value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100;
      setAccuracy(acc);

      // WPM Calc
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      if (timeElapsed > 0) {
        const words = value.length / 5;
        setWpm(Math.round(words / timeElapsed));
      }

      // Finish Check
      if (value.length >= textToType.length) {
        setIsFinished(true);
      }
    };

    const resetTest = () => {
      setTypedText('');
      setWpm(0);
      setAccuracy(100);
      setIsStarted(false);
      setIsFinished(false);
      setStartTime(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    };

    return (
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 font-sans shadow-sm">
        <span className="block font-mono text-[10px] text-accent-signal uppercase tracking-[0.2em] mb-2">Interactive Simulator</span>
        <h3 className="text-lg font-display font-medium text-primary-text mb-4">Speed Typing Test</h3>

        <p className="bg-slate-50 border border-slate-100 rounded-lg p-4 font-mono text-sm text-slate-500 mb-4 leading-relaxed select-none">
          {textToType.split('').map((char, index) => {
            let colorClass = "text-slate-300";
            if (index < typedText.length) {
              colorClass = typedText[index] === char ? "text-accent-copper font-medium" : "text-red-500 bg-red-50 font-medium px-0.5 rounded";
            }
            return <span key={index} className={colorClass}>{char}</span>;
          })}
        </p>

        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInputChange}
          disabled={isFinished}
          placeholder="Start typing the text above to test WPM..."
          className="w-full px-4 py-3 bg-white border border-slate-200 text-primary-text rounded-lg font-mono text-sm focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all mb-4"
        />

        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
            <span className="block text-2xl font-display font-medium text-primary-text">{wpm}</span>
            <span className="text-[10px] font-mono text-muted-text uppercase tracking-wider">WPM</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
            <span className="block text-2xl font-display font-medium text-primary-text">{accuracy}%</span>
            <span className="text-[10px] font-mono text-muted-text uppercase tracking-wider">Accuracy</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
            <span className="block text-2xl font-display font-medium text-primary-text">
              {isStarted && !isFinished ? Math.max(0, Math.round((Date.now() - startTime) / 1000)) + 's' : '0s'}
            </span>
            <span className="text-[10px] font-mono text-muted-text uppercase tracking-wider">Time</span>
          </div>
        </div>

        {isFinished && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-lg text-sm mb-4 text-center font-medium animate-fade-in">
            🎉 Completed! Speed: {wpm} WPM | Accuracy: {accuracy}%
          </div>
        )}

        <button
          onClick={resetTest}
          className="w-full py-2.5 bg-slate-900 hover:bg-accent-copper text-white rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 font-semibold"
        >
          Reset Test
        </button>
      </div>
    );
  };

  // 2. MEDICINE REMINDER WIDGET
  const MedicineReminderWidget = () => {
    const [meds, setMeds] = useState([
      { id: 1, name: 'Vitamin D3', time: '08:00 AM', status: 'Taken' },
      { id: 2, name: 'Omega-3 Acid', time: '01:30 PM', status: 'Pending' }
    ]);
    const [newMedName, setNewMedName] = useState('');
    const [newMedTime, setNewMedTime] = useState('09:00 AM');

    const addMedicine = (e) => {
      e.preventDefault();
      if (!newMedName.trim()) return;
      const newMed = {
        id: Date.now(),
        name: newMedName,
        time: newMedTime,
        status: 'Pending'
      };
      setMeds([...meds, newMed]);
      setNewMedName('');
    };

    const toggleStatus = (id) => {
      setMeds(meds.map(m => m.id === id ? { ...m, status: m.status === 'Taken' ? 'Pending' : 'Taken' } : m));
    };

    const deleteMed = (id) => {
      setMeds(meds.filter(m => m.id !== id));
    };

    return (
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 font-sans shadow-sm">
        <span className="block font-mono text-[10px] text-accent-signal uppercase tracking-[0.2em] mb-2">Interactive Simulator</span>
        <h3 className="text-lg font-display font-medium text-primary-text mb-4">Smart Medicine Reminder</h3>

        <form onSubmit={addMedicine} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newMedName}
            onChange={(e) => setNewMedName(e.target.value)}
            placeholder="e.g. Paracetamol"
            className="flex-1 px-3 py-2.5 bg-white border border-slate-200 text-primary-text rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
          />
          <select
            value={newMedTime}
            onChange={(e) => setNewMedTime(e.target.value)}
            className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-accent-copper transition-all text-primary-text"
          >
            <option>08:00 AM</option>
            <option>09:00 AM</option>
            <option>01:30 PM</option>
            <option>06:00 PM</option>
            <option>09:30 PM</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-accent-copper text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-all font-semibold"
          >
            Add
          </button>
        </form>

        <div className="space-y-2 max-h-48 overflow-y-auto mb-4 pr-1">
          {meds.length === 0 ? (
            <p className="text-center text-xs text-muted-text font-mono uppercase py-6">No scheduled reminders</p>
          ) : (
            meds.map((med) => (
              <div key={med.id} className="flex items-center justify-between bg-slate-50 border border-slate-100 p-3 rounded-lg hover:border-slate-300 transition-all">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleStatus(med.id)}
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${med.status === 'Taken'
                        ? 'bg-accent-copper border-accent-copper text-white'
                        : 'border-slate-300 hover:border-slate-400 bg-transparent text-transparent'
                      }`}
                  >
                    {med.status === 'Taken' && <IconCheck />}
                  </button>
                  <div>
                    <span className={`text-sm font-medium ${med.status === 'Taken' ? 'line-through text-slate-400' : 'text-primary-text'}`}>
                      {med.name}
                    </span>
                    <span className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mt-0.5">{med.time}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteMed(med.id)}
                  className="text-slate-300 hover:text-red-600 p-1 transition-colors"
                >
                  <IconTrash />
                </button>
              </div>
            ))
          )}
        </div>

        <p className="text-[10px] font-mono text-muted-text text-center uppercase tracking-wider">
          💡 Click circles to toggle status between Pending and Taken.
        </p>
      </div>
    );
  };

  // 3. 2D GRAPHICS EDITOR WIDGET
  const GraphicsEditorWidget = () => {
    const canvasRef = useRef(null);
    const [color, setColor] = useState('#C77B4A');
    const [tool, setTool] = useState('brush'); // brush, line, circle, rect
    const [lineWidth, setLineWidth] = useState(4);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
      // Clear canvas to light grey initially
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = (e) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setIsDrawing(true);
      setStartPos({ x, y });

      if (tool === 'brush') {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
      }
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (tool === 'brush') {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };

    const stopDrawing = (e) => {
      if (!isDrawing) return;
      setIsDrawing(false);

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.strokeStyle = color;
      ctx.fillStyle = color + '20'; // transparency
      ctx.lineWidth = lineWidth;

      if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === 'rect') {
        ctx.beginPath();
        ctx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
        ctx.fill();
        ctx.stroke();
      } else if (tool === 'circle') {
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    };

    const clearCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    return (
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 font-sans shadow-sm">
        <span className="block font-mono text-[10px] text-accent-signal uppercase tracking-[0.2em] mb-2">Interactive Simulator</span>
        <h3 className="text-lg font-display font-medium text-primary-text mb-4">2D Canvas Graphics Editor</h3>

        <div className="flex flex-wrap gap-2 mb-4 justify-between items-center">
          {/* Tools */}
          <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-0.5 shadow-sm">
            {['brush', 'line', 'rect', 'circle'].map(t => (
              <button
                key={t}
                onClick={() => setTool(t)}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md transition-all ${tool === t ? 'bg-slate-900 text-white font-semibold' : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Color & Size */}
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 rounded-full border border-slate-200 cursor-pointer overflow-hidden p-0 bg-transparent"
            />
            <input
              type="range"
              min="1"
              max="20"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-20 accent-accent-copper bg-slate-200 rounded-lg appearance-none h-1 cursor-pointer"
            />
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={400}
          height={220}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={() => setIsDrawing(false)}
          className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg shadow-inner cursor-crosshair mb-4 block touch-none"
        />

        <button
          onClick={clearCanvas}
          className="w-full py-2.5 bg-slate-900 hover:bg-accent-copper text-white rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 font-semibold"
        >
          Clear Canvas
        </button>
      </div>
    );
  };

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [projects, certifications, isAdminMode]);

  // --- RENDER LAYOUT ---
  return (
    <div className="min-h-screen bg-bg-ink text-primary-text flex flex-col font-sans relative overflow-x-hidden select-none">

      {/* 3D Background Starfield */}
      <Suspense fallback={null}>
        <Starfield3D />
      </Suspense>

      {/* Background glow blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-accent-copper/[0.08] rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-accent-signal/[0.08] rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Dynamic Toast Success Popups */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-slate-800 border border-slate-200 px-5 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-slide-up max-w-sm">
          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <IconCheck />
          </div>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Admin Mode Toast Indicator */}
      {showAdminToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-accent-copper text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-fade-in font-mono text-xs uppercase tracking-wider font-bold">
          <span>🔧</span>
          <span>CMS Mode Active: Click fields to edit inline</span>
        </div>
      )}

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 bg-bg-ink/80 backdrop-blur-md">
        <div className="max-w-[1152px] mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="font-display text-xl font-medium tracking-tight text-primary-text flex items-center gap-1.5">
            Mounish<span className="text-accent-copper">.</span>
          </a>

          {/* Nav Menu */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.25em]">
            <a href="#about" className="text-muted-text hover:text-accent-copper transition-colors">About</a>
            <a href="#skills" className="text-muted-text hover:text-accent-copper transition-colors">Stack</a>
            <a href="#certifications" className="text-muted-text hover:text-accent-copper transition-colors">Path</a>
            <a href="#projects" className="text-muted-text hover:text-accent-copper transition-colors">Works</a>
            <a href="#contact" className="text-muted-text hover:text-accent-copper transition-colors">Contact</a>
          </nav>

          {/* Admin Toggler Widget */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAdminMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300 shadow-sm ${isAdminMode
                  ? 'bg-accent-copper/10 border-accent-copper text-accent-copper'
                  : 'bg-slate-100 border-slate-200 text-muted-text hover:border-slate-300 hover:text-primary-text'
                }`}
            >
              {isAdminMode ? <IconUnlock /> : <IconLock />}
              <span>{isAdminMode ? 'Exit CMS' : 'CMS Login'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="about" className="py-20 md:py-32 max-w-[1152px] mx-auto px-6 w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
        <div className="md:col-span-7 flex flex-col items-start text-left relative reveal">

          <div className="flex items-center gap-4 mb-10 w-full">
            <span className="font-mono text-[11px] text-accent-signal uppercase tracking-[0.25em]">01 — Profile</span>
            <div className="h-[1px] flex-1 bg-slate-200/60"></div>
          </div>

          {/* Admin Wrapper for Hero Headline */}
          <div className={`w-full group rounded-xl transition-all ${isAdminMode ? 'border-2 border-dashed border-accent-copper/45 p-3 bg-accent-copper/[0.01] hover:bg-accent-copper/[0.03] relative' : ''
            }`}>
            {isAdminMode && (
              <button
                onClick={() => { setHeroForm({ ...hero }); setIsEditingHero(true); }}
                className="absolute top-2 right-2 bg-accent-copper hover:bg-accent-copper/80 text-white p-1.5 rounded-lg shadow-sm z-10 transition-colors"
                title="Edit Hero Details"
              >
                <IconPencil />
              </button>
            )}

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200/80 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-copper animate-ping"></span>
              <span className="text-[10px] font-mono text-primary-text uppercase tracking-widest">Available for Collaboration</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight text-primary-text leading-[1.08] mb-6">
              Hi, I'm <span className="text-accent-copper">{hero.name}</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-muted-text font-display mb-6 tracking-tight">
              {hero.headline}
            </p>
            <p className="text-base md:text-lg text-muted-text font-normal leading-relaxed max-w-xl font-sans">
              {hero.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#projects"
              className="px-8 py-3.5 bg-slate-900 hover:bg-accent-copper text-white rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 bg-transparent border border-slate-300 hover:border-slate-400 text-slate-800 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-sm"
            >
              Contact Me
            </a>
          </div>

          <div className="w-full mt-8 select-none">
            <Suspense fallback={<div className="h-[300px] md:h-[400px] flex items-center justify-center text-[10px] font-mono text-muted-text uppercase tracking-widest bg-white border border-slate-100 rounded-2xl">Loading tech spectrum...</div>}>
              <TechOrbit3D />
            </Suspense>
          </div>
        </div>

        {/* Hero Visual Avatar Area */}
        <div className="md:col-span-5 flex justify-center items-center reveal">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-accent-copper/5 rounded-[2rem] rotate-6 scale-95 border border-slate-200/50"></div>
            <div className="absolute inset-0 bg-white border border-slate-200/80 rounded-[2rem] overflow-hidden shadow-lg transition-all hover:scale-[1.02] hover:border-slate-300 duration-500">
              <img
                src={hero.avatar}
                alt="Mounish Profile Avatar"
                onError={(e) => {
                  e.target.src = '/assets/images/mounish.jpeg';
                }}
                className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- EDUCATION & SKILLS SECTION --- */}
      <section id="skills" className="py-20 border-b border-slate-200/60 relative z-10">
        <div className="max-w-[1152px] mx-auto px-6 w-full">
          <div className="flex items-center gap-4 mb-10 w-full reveal">
            <span className="font-mono text-[11px] text-accent-signal uppercase tracking-[0.25em]">02 — Stack</span>
            <div className="h-[1px] flex-1 bg-slate-200/60"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">

            {/* Education Card */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between reveal">
              <div>
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 shadow-sm text-accent-copper mb-6">
                  <IconSchool />
                </div>
                <span className="block font-mono text-[10px] text-accent-signal uppercase tracking-[0.2em] mb-1">Program</span>
                <h4 className="text-xl font-display font-medium text-primary-text mb-2">BTech in CSIT</h4>

                <span className="block font-mono text-[10px] text-muted-text uppercase tracking-[0.2em] mt-4 mb-1">Status</span>
                <p className="text-xs font-mono text-accent-copper uppercase tracking-wider mb-4">3rd Semester Student</p>

                <span className="block font-mono text-[10px] text-muted-text uppercase tracking-[0.2em] mt-4 mb-1">Focus</span>
                <p className="text-sm text-muted-text leading-relaxed font-normal">
                  Eager to learn, grow, and collaborate on new technical horizons. Developing a solid foundation in core computer science subjects, algorithms, data structures, and standard web technologies.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[10px] font-mono text-accent-signal uppercase tracking-wider bg-slate-100 border border-slate-200/60 px-3 py-1 rounded-full">Active Learner</span>
              </div>
            </div>

            {/* Skills Card */}
            <div className={`glass-card p-8 rounded-2xl flex flex-col justify-between relative group reveal ${isAdminMode ? 'border-2 border-dashed border-accent-copper/40 bg-accent-copper/[0.01]' : ''
              }`}>
              {isAdminMode && (
                <button
                  onClick={() => {
                    setSkillsForm({ languages: skills.languages.join(', '), webdev: skills.webdev.join(', ') });
                    setIsEditingSkills(true);
                  }}
                  className="absolute top-4 right-4 bg-accent-copper hover:bg-accent-copper/80 text-white p-1.5 rounded-lg shadow-sm z-10 transition-colors"
                  title="Edit Skills Inventory"
                >
                  <IconPencil />
                </button>
              )}

              <div>
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 shadow-sm text-accent-copper mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <span className="block font-mono text-[10px] text-accent-signal uppercase tracking-[0.2em] mb-1">Inventory</span>
                <h4 className="text-xl font-display font-medium text-primary-text mb-6">Skills & Tools</h4>

                <div className="space-y-6">
                  {/* Languages sub-category */}
                  <div>
                    <span className="text-[10px] font-mono text-muted-text uppercase tracking-widest block mb-3">Programming Languages</span>
                    <div className="flex flex-wrap gap-2">
                      {skills.languages.map((lang, i) => (
                        <span key={i} className="px-3.5 py-1.5 bg-white border border-slate-200 text-xs font-mono uppercase tracking-wider text-primary-text rounded-lg hover:border-accent-copper/50 hover:text-accent-copper transition-all duration-200">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* WebDev sub-category */}
                  <div>
                    <span className="text-[10px] font-mono text-muted-text uppercase tracking-widest block mb-3">Web Development</span>
                    <div className="flex flex-wrap gap-2">
                      {skills.webdev.map((tech, i) => (
                        <span key={i} className="px-3.5 py-1.5 bg-white border border-slate-200 text-xs font-mono uppercase tracking-wider text-primary-text rounded-lg hover:border-accent-copper/50 hover:text-accent-copper transition-all duration-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/60 text-[10px] font-mono text-muted-text">
                💡 Toggling Admin Mode allows instant modification of skillset categories.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CERTIFICATIONS SECTION --- */}
      <section id="certifications" className="py-20 border-b border-slate-200/60 relative z-10">
        <div className="max-w-[1152px] mx-auto px-6 w-full">
          <div className="flex items-center gap-4 mb-10 w-full reveal">
            <span className="font-mono text-[11px] text-accent-signal uppercase tracking-[0.25em]">03 — Path</span>
            <div className="h-[1px] flex-1 bg-slate-200/60"></div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal">
            <div>
              <span className="block font-mono text-[10px] text-accent-copper uppercase tracking-[0.2em] mb-1">Validated Knowledge</span>
              <h3 className="font-display text-3xl font-medium text-primary-text tracking-tight">Certifications & Achievements</h3>
            </div>
            {isAdminMode && (
              <button
                onClick={() => openCertModal()}
                className="mt-4 md:mt-0 flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-accent-copper text-white rounded-full text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300 shadow-sm"
              >
                <IconPlus /> Add Certificate
              </button>
            )}
          </div>

          <div className="relative border-l border-slate-200 pl-8 ml-4 space-y-12">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className={`relative reveal transition-all duration-300 ${isAdminMode ? 'border-2 border-dashed border-accent-copper/45 p-4 rounded-2xl' : ''
                  }`}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent-copper border-2 border-slate-50 shadow-[0_0_8px_rgba(217,119,6,0.3)]"></div>

                {/* Timeline Content */}
                <div className="grid md:grid-cols-12 gap-4 items-start">
                  {/* Left side: Monospace Date */}
                  <div className="md:col-span-2">
                    <span className="font-mono text-[11px] text-accent-signal uppercase tracking-wider">
                      {cert.date}
                    </span>
                  </div>

                  {/* Right side: Structured Card */}
                  <div className="md:col-span-10 glass-card p-6 rounded-2xl relative">
                    {isAdminMode && (
                      <div className="absolute top-3 right-3 flex gap-1 z-10">
                        <button
                          onClick={() => openCertModal(cert)}
                          className="bg-accent-copper hover:bg-accent-copper/80 text-white p-1.5 rounded-lg shadow-sm transition-colors"
                        >
                          <IconPencil />
                        </button>
                        <button
                          onClick={(e) => handleDeleteCert(cert.id, e)}
                          className="bg-red-500/80 hover:bg-red-600 text-primary-text p-1.5 rounded-lg shadow-sm transition-colors"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <span className="block font-mono text-[10px] text-accent-signal uppercase tracking-[0.2em] mb-1">Certification</span>
                        <h4 className="text-lg font-display font-medium text-primary-text leading-tight">{cert.title}</h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 border-t border-slate-200/60 pt-4">
                        <div>
                          <span className="block font-mono text-[10px] text-muted-text uppercase tracking-[0.2em] mb-1">Provider</span>
                          <p className="text-sm text-primary-text">{cert.issuer}</p>
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] text-muted-text uppercase tracking-[0.2em] mb-1">Verification</span>
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-accent-copper hover:text-accent-copper/80 transition-colors mt-0.5"
                          >
                            View Credential <IconExternal />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CMS Admin Placeholder Card */}
            {isAdminMode && certifications.length === 0 && (
              <div className="py-12 bg-slate-100 border-2 border-dashed border-slate-200 rounded-2xl text-center text-muted-text font-mono text-xs uppercase tracking-wider">
                No certifications listed. Click "Add Certificate" to fill this section.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- PROJECTS GRID --- */}
      <section id="projects" className="py-20 border-b border-slate-200/60 relative z-10">
        <div className="max-w-[1152px] mx-auto px-6 w-full">
          <div className="flex items-center gap-4 mb-10 w-full reveal">
            <span className="font-mono text-[11px] text-accent-signal uppercase tracking-[0.25em]">04 — Works</span>
            <div className="h-[1px] flex-1 bg-slate-200/60"></div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal">
            <div>
              <span className="block font-mono text-[10px] text-accent-copper uppercase tracking-[0.2em] mb-1">Recent Work</span>
              <h3 className="font-display text-3xl font-medium text-primary-text tracking-tight">Interactive Projects</h3>
            </div>
            {isAdminMode && (
              <button
                onClick={() => openProjectModal()}
                className="mt-4 md:mt-0 flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-accent-copper text-white rounded-full text-[11px] font-mono uppercase tracking-[0.2em] transition-all duration-300 shadow-sm"
              >
                <IconPlus /> Add Project
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  if (!isAdminMode) {
                    setActiveDemoProject(proj);
                  }
                }}
                className={`glass-card rounded-2xl overflow-hidden flex flex-col justify-between relative group reveal ${isAdminMode ? 'border-2 border-dashed border-accent-copper/45 cursor-default' : 'cursor-pointer hover:-translate-y-1'
                  }`}
              >
                {isAdminMode && (
                  <div className="absolute top-3 right-3 flex gap-1.5 z-10" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => openProjectModal(proj)}
                      className="bg-accent-copper hover:bg-accent-copper/80 text-white p-1.5 rounded-lg shadow-sm transition-colors"
                      title="Edit details"
                    >
                      <IconPencil />
                    </button>
                    <button
                      onClick={(e) => handleDeleteProject(proj.id, e)}
                      className="bg-red-500/80 hover:bg-red-600 text-primary-text p-1.5 rounded-lg shadow-sm transition-colors"
                      title="Delete project"
                    >
                      <IconTrash />
                    </button>
                  </div>
                )}

                <div className="p-6">
                  {/* Decorative Project Pattern Header */}
                  <div className="h-28 bg-slate-50 rounded-xl mb-6 flex items-center justify-center border border-slate-200/60">
                    <span className="text-3xl">
                      {proj.type === 'typing' && '⌨️'}
                      {proj.type === 'medicine' && '💊'}
                      {proj.type === 'graphics' && '🎨'}
                      {proj.type === 'custom' && '💡'}
                    </span>
                  </div>

                  <h4 className="text-xl font-display font-medium text-primary-text mb-4 leading-tight group-hover:text-accent-copper transition-colors">
                    {proj.title}
                  </h4>

                  {/* Structured Card Content */}
                  <div className="space-y-4">
                    <div>
                      <span className="block font-mono text-[10px] text-accent-copper uppercase tracking-[0.2em] mb-1">Problem</span>
                      <p className="text-xs text-muted-text font-normal leading-relaxed">{proj.problem}</p>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-accent-signal uppercase tracking-[0.2em] mb-1">Solution</span>
                      <p className="text-xs text-primary-text font-normal leading-relaxed">{proj.solution}</p>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-accent-copper uppercase tracking-[0.2em] mb-1">Impact</span>
                      <p className="text-xs text-muted-text font-normal leading-relaxed">{proj.impact}</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono text-accent-signal bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-slate-200/60 pt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-accent-copper group-hover:text-accent-copper/80 flex items-center gap-1 transition-colors">
                      {isAdminMode ? 'Edit Mode Active' : 'Launch Interactive Demo'} <IconExternal />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE DEMO DRAWER MODAL --- */}
      {activeDemoProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh] rounded-3xl">

            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] text-accent-signal uppercase tracking-widest">Interactive Simulator</span>
                <h3 className="text-xl font-display font-medium text-primary-text">{activeDemoProject.title}</h3>
              </div>
              <button
                onClick={() => setActiveDemoProject(null)}
                className="text-muted-text hover:text-primary-text hover:bg-slate-100 p-1.5 rounded-full transition-all"
              >
                <IconX />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              {activeDemoProject.type === 'typing' && <TypingTestWidget />}
              {activeDemoProject.type === 'medicine' && <MedicineReminderWidget />}
              {activeDemoProject.type === 'graphics' && <GraphicsEditorWidget />}
              {activeDemoProject.type === 'custom' && (
                <div className="text-center py-8">
                  <span className="text-4xl mb-4 block">💡</span>
                  <h4 className="font-display font-medium text-primary-text text-lg mb-2">Simulated Interactive Core</h4>
                  <p className="text-sm text-muted-text max-w-sm mx-auto mb-6">
                    This custom utility or service simulation is active. The application connects to local state stores to manage dynamic variables.
                  </p>
                  <div className="bg-slate-50 p-4 border border-slate-200/60 rounded-xl text-left font-mono text-xs text-slate-800">
                    <span className="text-accent-copper">const</span> projectObj = &#123;<br />
                    &nbsp;&nbsp;title: "{activeDemoProject.title}",<br />
                    &nbsp;&nbsp;problem: "{activeDemoProject.problem.substring(0, 30)}...",<br />
                    &nbsp;&nbsp;solution: "{activeDemoProject.solution.substring(0, 30)}...",<br />
                    &nbsp;&nbsp;tags: {JSON.stringify(activeDemoProject.tags)}<br />
                    &#125;;
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveDemoProject(null)}
                className="px-5 py-2 bg-slate-900 text-white font-mono text-[11px] uppercase tracking-wider rounded-full font-semibold hover:bg-accent-copper transition-colors shadow-sm"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 max-w-[1152px] mx-auto px-6 w-full grid md:grid-cols-12 gap-12 relative z-10">
        <div className="md:col-span-5 reveal">
          <div className="flex items-center gap-4 mb-10 w-full">
            <span className="font-mono text-[11px] text-accent-signal uppercase tracking-[0.25em]">05 — Inbox</span>
            <div className="h-[1px] flex-1 bg-slate-200/60"></div>
          </div>

          <span className="block font-mono text-[10px] text-accent-copper uppercase tracking-[0.2em] mb-1">Get in Touch</span>
          <h3 className="font-display text-3xl font-medium text-primary-text tracking-tight mb-6">Let's Connect</h3>
          <p className="text-base text-muted-text leading-relaxed font-normal mb-8">
            I'm currently seeking internships, collaborative web projects, and community engagements. Drop me a line if you want to chat about code or build something together.
          </p>

          <div className="space-y-4">
            <a href="mailto:mounish9742@gmail.com" className="flex items-center gap-3.5 text-muted-text hover:text-accent-copper transition-colors font-medium">
              <span className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-500">
                <IconMail />
              </span>
              mounish9742@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/mounish-b-704aba383/?isSelfProfile=true" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 text-muted-text hover:text-accent-copper transition-colors font-medium">
              <span className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-500">
                <IconLinkedin />
              </span>
              linkedin.com/in/mounish-b-704aba383
            </a>
            <a href="https://github.com/mounish9742-byte/line-editor-main" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 text-muted-text hover:text-accent-copper transition-colors font-medium">
              <span className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-500">
                <IconGithub />
              </span>
              github.com/mounish9742-byte/line-editor-main
            </a>
            <a href="https://wa.me/919742325804" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 text-muted-text hover:text-accent-copper transition-colors font-medium">
              <span className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700" aria-hidden="true">
                <span className="text-lg">◉</span>
              </span>
              WhatsApp: +91 97423 25804
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleContactSubmit} className="md:col-span-7 bg-white border border-slate-200 p-8 md:p-10 rounded-3xl reveal shadow-sm">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2.5">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={contact.name}
                onChange={handleContactChange}
                placeholder="Name"
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all ${formErrors.name ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-slate-200'
                  }`}
              />
              {formErrors.name && <p className="text-xs text-red-400 mt-1.5 font-medium">{formErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2.5">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contact.email}
                onChange={handleContactChange}
                placeholder="email@example.com"
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all ${formErrors.email ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-slate-200'
                  }`}
              />
              {formErrors.email && <p className="text-xs text-red-400 mt-1.5 font-medium">{formErrors.email}</p>}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2.5">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={contact.subject}
              onChange={handleContactChange}
              placeholder="Inquiry Topic"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2.5">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={contact.message}
              onChange={handleContactChange}
              placeholder="Hi Mounish, let's build something..."
              className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all resize-none ${formErrors.message ? 'border-red-500/50 bg-red-500/[0.02]' : 'border-slate-200'
                }`}
            ></textarea>
            {formErrors.message && <p className="text-xs text-red-400 mt-1.5 font-medium">{formErrors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-slate-900 hover:bg-accent-copper text-white rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-md font-semibold"
          >
            Open Email App
          </button>
          <p className="mt-4 text-center text-xs text-muted-text">
            This opens your email app with the message filled in. Press Send there to deliver it.
          </p>
        </form>
      </section>

      {/* --- FOOTER --- */}
      <footer className="mt-auto border-t border-slate-200/60 py-12 text-center relative z-10 bg-slate-50">
        <div className="max-w-[1152px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-mono text-muted-text uppercase tracking-wider">
            © {new Date().getFullYear()} Mounish | Portfolio. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/mounish9742-byte/line-editor-main" target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-slate-900 transition-colors p-2" aria-label="GitHub">
              <IconGithub />
            </a>
            <a href="https://www.linkedin.com/in/mounish-b-704aba383/?isSelfProfile=true" target="_blank" rel="noopener noreferrer" className="text-muted-text hover:text-slate-900 transition-colors p-2" aria-label="LinkedIn">
              <IconLinkedin />
            </a>
            <a href="mailto:mounish9742@gmail.com" className="text-muted-text hover:text-slate-900 transition-colors p-2" aria-label="Email">
              <IconMail />
            </a>
            <a href="https://wa.me/919742325804" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-900 transition-colors p-2 text-xs font-mono uppercase tracking-wider" aria-label="WhatsApp Mounish">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* ======================= DYNAMIC ADMIN CMS MODALS ======================= */}
      {/* ========================================================================= */}

      {/* HERO EDIT MODAL */}
      {isEditingHero && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleEditHeroSubmit} className="bg-white border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-display font-medium text-primary-text">Edit Hero Details</h3>
              <button type="button" onClick={() => setIsEditingHero(false)} className="text-muted-text hover:text-primary-text"><IconX /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Display Name</label>
                <input
                  type="text"
                  value={heroForm.name}
                  onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Headline</label>
                <input
                  type="text"
                  value={heroForm.headline}
                  onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Tagline Description</label>
                <textarea
                  value={heroForm.tagline}
                  onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditingHero(false)}
                className="px-4 py-2 bg-transparent border border-slate-200 rounded-full text-xs font-mono uppercase tracking-wider text-muted-text hover:text-slate-900 hover:border-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-accent-copper text-white rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SKILLS EDIT MODAL */}
      {isEditingSkills && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleEditSkillsSubmit} className="bg-white border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-display font-medium text-primary-text">Edit Skills Inventory</h3>
              <button type="button" onClick={() => setIsEditingSkills(false)} className="text-muted-text hover:text-primary-text"><IconX /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-1">Programming Languages</label>
                <span className="text-[10px] text-muted-text block mb-2">Separate skills with a comma (e.g. C, Python, Java)</span>
                <input
                  type="text"
                  value={skillsForm.languages}
                  onChange={(e) => setSkillsForm({ ...skillsForm, languages: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-1">Web Development Tools</label>
                <span className="text-[10px] text-muted-text block mb-2">Separate skills with a comma (e.g. HTML, CSS, React)</span>
                <input
                  type="text"
                  value={skillsForm.webdev}
                  onChange={(e) => setSkillsForm({ ...skillsForm, webdev: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditingSkills(false)}
                className="px-4 py-2 bg-transparent border border-slate-200 rounded-full text-xs font-mono uppercase tracking-wider text-muted-text hover:text-slate-900 hover:border-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-accent-copper text-white rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm"
              >
                Save Skills
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PROJECT EDIT/ADD MODAL */}
      {isEditingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleProjectSubmit} className="bg-white border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-display font-medium text-primary-text">
                {projectForm.id ? 'Edit Project Details' : 'Add New Project'}
              </h3>
              <button type="button" onClick={() => setIsEditingProject(false)} className="text-muted-text hover:text-primary-text"><IconX /></button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Project Title</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Problem Statement</label>
                <textarea
                  value={projectForm.problem}
                  onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Technical Solution</label>
                <textarea
                  value={projectForm.solution}
                  onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Quantifiable Impact</label>
                <textarea
                  value={projectForm.impact}
                  onChange={(e) => setProjectForm({ ...projectForm, impact: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-1">Technologies / Tags</label>
                <span className="text-[10px] text-muted-text block mb-2">Separate tags with a comma (e.g. React, Tailwind, Canvas)</span>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Demo Link</label>
                <input
                  type="text"
                  value={projectForm.link}
                  onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditingProject(false)}
                className="px-4 py-2 bg-transparent border border-slate-200 rounded-full text-xs font-mono uppercase tracking-wider text-muted-text hover:text-slate-900 hover:border-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-accent-copper text-white rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm"
              >
                {projectForm.id ? 'Save Changes' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CERTIFICATION EDIT/ADD MODAL */}
      {isEditingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <form onSubmit={handleCertSubmit} className="bg-white border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-display font-medium text-primary-text">
                {certForm.id ? 'Edit Certificate Details' : 'Add New Certification'}
              </h3>
              <button type="button" onClick={() => setIsEditingCert(false)} className="text-muted-text hover:text-primary-text"><IconX /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Certification Title</label>
                <input
                  type="text"
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Issuer / Authority</label>
                <input
                  type="text"
                  value={certForm.issuer}
                  onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Date Earned</label>
                <input
                  type="text"
                  value={certForm.date}
                  onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                  placeholder="e.g. May 2026"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-muted-text uppercase tracking-wider mb-2">Verification Link</label>
                <input
                  type="text"
                  value={certForm.link}
                  onChange={(e) => setCertForm({ ...certForm, link: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-primary-text focus:outline-none focus:ring-1 focus:ring-accent-copper focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditingCert(false)}
                className="px-4 py-2 bg-transparent border border-slate-200 rounded-full text-xs font-mono uppercase tracking-wider text-muted-text hover:text-slate-900 hover:border-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-accent-copper text-white rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm"
              >
                {certForm.id ? 'Save Changes' : 'Add Certificate'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
