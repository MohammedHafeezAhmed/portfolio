import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT || 3001);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== 'production' ? 'portfolio123' : '');
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(express.json({ limit: '1mb' }));

const initial = {
  profile: {
    name: 'Mohammed Hafeez Ahmed',
    role: 'AI & Software Development Enthusiast · B.Tech CSE',
    intro: 'I build from first principles, follow bugs to their roots, and turn stubborn technical questions into working systems. My favourite part of engineering is the moment a difficult implementation finally clicks.',
    location: 'Bengaluru, Karnataka, India',
    email: 'mohammedhafeezahmed01@gmail.com',
    availability: 'Open to hackathons & engineering opportunities',
    initials: 'HA',
    siteTitle: 'NOVACORE',
    tagline: 'Engineering ideas into reality.',
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
    instagram: '',
    resumeUrl: '',
    extraFields: {
      'Professional summary': 'Experimental builder with a strong interest in AI systems, software engineering, debugging, and building original projects.',
      'Career direction': 'Software engineering, AI engineering, and building reliable developer-facing products.',
      'Core strengths': 'Problem solving, experimental building, persistence, independent learning, debugging, analytical thinking',
      'Programming languages': 'Python (working knowledge), Java (working knowledge)',
      'AI & agent systems': 'LLM evaluation, LangChain, LangGraph, MCP, Gemini AI APIs, API integration, prompt experimentation',
      'Backend & APIs': 'FastAPI, REST APIs, API testing and integration',
      'Data & storage': 'MySQL, SQL fundamentals',
      'Frontend & prototyping': 'React (working knowledge), Figma',
      'Developer tools': 'Git, GitHub, VS Code',
      'Education': 'B.Tech in Computer Science Engineering, CMR University — Lakeside Campus; 2024–2028; current CGPA 7.8',
      'Relevant coursework': 'Programming fundamentals, data structures, database management systems, software engineering, computer networks, operating systems, AI fundamentals',
      'Certifications': 'Anthropic — Model Context Protocol (MCP) course; Google Gemini AI learning',
      'Languages': 'English, Hindi, Kannada',
      'Hobbies': 'Cricket, fitness, indoor and outdoor games, mobile gaming, PC gaming, PlayStation 5 gaming, exploring new technology, debugging and learning from other projects',
      'Fun fact': 'A stubborn bug can turn into an entire evening of detective work—and that is often the fun part.',
      'Personal motto': 'Build to understand. Debug to discover. Ship to learn.',
      'Internships': '', 'Work experience': '', 'Research & publications': '',
      'Volunteering': '', 'Awards': '', 'Talks & events': '',
      'Open-source contributions': '', 'Leadership': '',
      'Additional projects': '', 'Resume file': '', 'Contact phone': '',
      'Website URL': '', 'Blog URL': '', 'LeetCode URL': '',
      'Other social links': '', 'Future certifications': '',
      'Future achievements': '', 'Hackathons': '',
      'Hackathon roles & outcomes': '', 'Technical writing': '',
      'Blog posts': '', 'Open-source projects': '',
      'Open-source pull requests': '', 'AI experiments': '',
      'LLM evaluation projects': '', 'Agent workflows': '',
      'API portfolio': '', 'Deployment links': '', 'Cloud platforms': '',
      'System design notes': '', 'Architecture diagrams': '',
      'Datasets & benchmarks': '', 'Research interests': '',
      'Patents & inventions': '', 'Community involvement': '',
      'Mentoring': '', 'Leadership roles': '',
      'Professional memberships': '', 'Awards & recognition': '',
      'Speaking engagements': '', 'Workshop participation': '',
      'Portfolio highlights': '', 'Services I can offer': '',
      'Career milestones': '', 'Goals for this year': '',
      'Goals for the next five years': '', 'References': '',
      'Custom field 1': '', 'Custom field 2': '', 'Custom field 3': ''
    }
  },

  sections: [
    {
      id: 'about',
      title: 'The Engineer Behind the Experiments',
      type: 'about',
      subtitle: 'Independent thinker. Persistent debugger. Experimental builder.',
      content: 'I am Mohammed Hafeez Ahmed, a B.Tech Computer Science Engineering student at CMR University, Lakeside Campus. I enjoy getting deep into technical problems, building ideas from scratch, studying how other people’s projects work, and debugging until the underlying issue makes sense. I am especially interested in AI-enabled software, agent workflows, and practical tools that turn a rough idea into something people can use. I prefer learning by implementing, testing, breaking, and improving—not just collecting tutorials.',
      visible: true,
      order: 0
    },
    {
      id: 'skills',
      title: 'How I Build',
      type: 'skills',
      subtitle: 'Working habits that shape my engineering approach',
      content: 'I enjoy exploring unfamiliar systems, tracing errors to their source, and iterating until the implementation works as intended.',
      items: ['Problem solving', 'Experimental building', 'Debugging & root-cause analysis', 'Independent learning', 'Persistence', 'Analytical thinking', 'Hackathon mindset'],
      visible: true,
      order: 1
    },
    {
      id: 'tech',
      title: 'My Current Stack',
      type: 'technologies',
      subtitle: 'Tools and frameworks I am actively exploring',
      content: 'My current focus is AI application development and backend systems, supported by practical web and database skills.',
      items: ['Python', 'Java', 'LangChain', 'LangGraph', 'LLM Evaluation', 'Model Context Protocol (MCP)', 'FastAPI', 'Gemini AI APIs', 'REST API Integration', 'MySQL', 'React', 'Git & GitHub', 'VS Code', 'Figma'],
      visible: true,
      order: 2
    },
    {
      id: 'projects',
      title: 'Selected Builds & Experiments',
      type: 'projects',
      subtitle: 'Work in progress, built to solve practical problems',
      projects: [
        {
          name: 'MT Classroom Finder',
          category: 'Campus Utility · Full-Stack Web App',
          description: 'A classroom availability finder designed to help users identify free classrooms from timetable data instead of walking between rooms to check availability. Includes CSV-based timetable input and room availability views.',
          status: 'Prototype · Not yet deployed',
          tags: ['React', 'JavaScript', 'CSV Parsing', 'Scheduling Logic'],
          link: '',
          github: '',
          images: ['', '', ''],
          features: ['Import timetable data', 'Identify rooms by schedule', 'Reduce unnecessary room-to-room searching'],
          contribution: 'Designed and implemented the prototype workflow.',
          slug: 'mt-classroom-finder'
        },
        {
          name: 'Notary Draft Reference Assistant',
          category: 'Legal-Tech Utility · AI-Assisted Drafting',
          description: 'A drafting reference tool concept for Karnataka notary workflows, intended to help prepare structured document drafts as a starting point for professional review. It is a reference aid, not a substitute for legal judgement.',
          status: 'In development · Not yet deployed',
          tags: ['AI APIs', 'Prompt Design', 'Document Workflows'],
          link: '',
          github: '',
          images: ['', '', ''],
          features: ['Structured draft generation', 'Reusable document prompts', 'Professional review-first workflow'],
          contribution: 'Project concept and implementation in progress.',
          slug: 'notary-draft-assistant'
        },
        {
          name: 'Junior IQ Quest',
          category: 'Python · Educational Mini-Game',
          description: 'A small Python game prototype with simple logic challenges intended to make reasoning practice more playful for younger users.',
          status: 'Prototype · Not yet deployed',
          tags: ['Python', 'Game Logic', 'Problem Solving'],
          link: '',
          github: '',
          images: ['', '', ''],
          features: ['Short reasoning challenges', 'Score-based progress', 'Simple game interaction'],
          contribution: 'Built as a learning project.',
          slug: 'junior-iq-quest'
        }
      ],
      visible: true,
      order: 3
    },
    {
      id: 'education',
      title: 'Education & Learning',
      type: 'education',
      subtitle: 'Computer Science Engineering · 2024–2028',
      content: 'B.Tech in Computer Science Engineering at CMR University, Lakeside Campus. Current CGPA: 7.8.',
      items: ['CMR University — Lakeside Campus', 'B.Tech, Computer Science Engineering', '2024–2028 (expected)', 'Current CGPA: 7.8', 'Relevant study: programming, data structures, DBMS, software engineering, operating systems, networks, AI fundamentals'],
      visible: true,
      order: 4
    },
    {
      id: 'certifications',
      title: 'Courses & Certifications',
      type: 'custom',
      subtitle: 'Learning through focused technical exploration',
      content: 'Completed learning in Model Context Protocol (MCP) through Anthropic and Google Gemini AI.',
      items: ['Anthropic — Model Context Protocol (MCP) course', 'Google Gemini AI learning'],
      visible: true,
      order: 5
    },
    {
      id: 'hobbies',
      title: 'Beyond the Terminal',
      type: 'hobbies',
      subtitle: 'Competition, movement, games, and curiosity',
      content: 'I like staying active, competing, and exploring game worlds as much as I enjoy exploring technical systems.',
      items: ['Cricket', 'Fitness', 'Indoor & outdoor games', 'Mobile gaming', 'PC gaming', 'PlayStation 5', 'Exploring new technology', 'Learning from and debugging other projects'],
      visible: true,
      order: 6
    },
    {
      id: 'contact',
      title: 'Have a Technical Challenge?',
      type: 'contact',
      subtitle: 'Good ideas get better when they are discussed.',
      content: 'Interested in AI applications, software engineering, hackathons, or building something useful? Send a short message and let’s connect.',
      visible: true,
      order: 7
    }
  ],

  history: [],
  future: []
};

let store = structuredClone(initial);
let portfolioCollection;

async function save() {
  if (!portfolioCollection) {
    throw new Error('MongoDB is not connected.');
  }

  await portfolioCollection.replaceOne(
    { _id: 'main' },
    { _id: 'main', ...store },
    { upsert: true }
  );
}

const sessions = new Set();

function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');

  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Please sign in again.' });
  }

  next();
}

function record(action) {
  const snapshot = {
    profile: structuredClone(store.profile),
    sections: structuredClone(store.sections)
  };

  store.history.push({
    id: crypto.randomUUID(),
    action,
    at: new Date().toISOString(),
    snapshot
  });

  if (store.history.length > 80) store.history.shift();
  store.future = [];
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Admin login
app.post('/api/login', (req, res) => {
  if (!ADMIN_PASSWORD || String(req.body?.password || '') !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'That password didn’t match.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  sessions.add(token);
  res.json({ token });
});

// Public portfolio
app.get('/api/portfolio', (_req, res) => {
  res.json({
    profile: store.profile,
    sections: store.sections
      .filter(s => s.visible !== false)
      .sort((a, b) => a.order - b.order)
  });
});

// Admin data
app.get('/api/admin', auth, (_req, res) => {
  res.json({
    profile: store.profile,
    sections: store.sections.sort((a, b) => a.order - b.order),
    history: store.history.map(({ id, action, at }) => ({ id, action, at })),
    canUndo: store.history.length > 0,
    canRedo: store.future.length > 0
  });
});

// Update profile
app.put('/api/profile', auth, async (req, res) => {
  try {
    record('Updated profile details');
    store.profile = { ...store.profile, ...req.body };
    await save();
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not save profile changes.' });
  }
});

// Add section
app.post('/api/sections', auth, async (req, res) => {
  try {
    const section = req.body || {};

    if (!String(section.title || '').trim()) {
      return res.status(400).json({ error: 'A section title is required.' });
    }

    record(`Added “${section.title}” section`);

    store.sections.push({
      id: crypto.randomUUID(),
      type: section.type || 'custom',
      title: String(section.title).trim(),
      subtitle: section.subtitle || '',
      content: section.content || '',
      items: Array.isArray(section.items) ? section.items : [],
      visible: true,
      order: store.sections.length
    });

    await save();
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not create section.' });
  }
});

// Update section
app.put('/api/sections/:id', auth, async (req, res) => {
  try {
    const i = store.sections.findIndex(s => s.id === req.params.id);

    if (i < 0) {
      return res.status(404).json({ error: 'Section not found.' });
    }

    record(`Updated “${store.sections[i].title}” section`);

    store.sections[i] = {
      ...store.sections[i],
      ...req.body,
      id: store.sections[i].id
    };

    await save();
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not update section.' });
  }
});

// Delete section
app.delete('/api/sections/:id', auth, async (req, res) => {
  try {
    const section = store.sections.find(s => s.id === req.params.id);

    if (!section) {
      return res.status(404).json({ error: 'Section not found.' });
    }

    record(`Removed “${section.title}” section`);
    store.sections = store.sections.filter(s => s.id !== req.params.id);

    await save();
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete section.' });
  }
});

// Undo
app.post('/api/history/undo', auth, async (_req, res) => {
  try {
    if (!store.history.length) {
      return res.status(400).json({ error: 'Nothing to undo.' });
    }

    const last = store.history.pop();

    store.future.push({
      ...last,
      current: {
        profile: structuredClone(store.profile),
        sections: structuredClone(store.sections)
      }
    });

    store.profile = last.snapshot.profile;
    store.sections = last.snapshot.sections;

    await save();
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not undo changes.' });
  }
});

// Redo
app.post('/api/history/redo', auth, async (_req, res) => {
  try {
    if (!store.future.length) {
      return res.status(400).json({ error: 'Nothing to redo.' });
    }

    const next = store.future.pop();

    store.history.push({
      id: crypto.randomUUID(),
      action: `Redo: ${next.action}`,
      at: new Date().toISOString(),
      snapshot: {
        profile: structuredClone(store.profile),
        sections: structuredClone(store.sections)
      }
    });

    store.profile = next.current.profile;
    store.sections = next.current.sections;

    await save();
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not redo changes.' });
  }
});

// Undo a specific history entry
app.post('/api/history/undo/:id', auth, async (req, res) => {
  try {
    const idx = store.history.findIndex(h => h.id === req.params.id);

    if (idx < 0) {
      return res.status(404).json({
        error: 'That history entry is no longer available to undo.'
      });
    }

    const entry = store.history[idx];

    store.future.push({
      ...entry,
      current: {
        profile: structuredClone(store.profile),
        sections: structuredClone(store.sections)
      }
    });

    store.profile = entry.snapshot.profile;
    store.sections = entry.snapshot.sections;
    store.history = store.history.slice(0, idx);

    await save();
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not undo that change.' });
  }
});

// Serve frontend
app.use(express.static(path.join(ROOT, 'dist')));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();

  const index = path.join(ROOT, 'dist', 'index.html');

  if (fs.existsSync(index)) {
    return res.sendFile(index);
  }

  res.status(404).send('Frontend not built yet. Run npm run dev.');
});

// Connect MongoDB and start server
async function startServer() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing. Add it to .env or Render environment variables.');
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();

  const database = client.db();
  portfolioCollection = database.collection('portfolio');

  const savedPortfolio = await portfolioCollection.findOne({ _id: 'main' });

  if (savedPortfolio) {
    const { _id, ...savedStore } = savedPortfolio;
    store = savedStore;
  } else {
    await portfolioCollection.insertOne({ _id: 'main', ...store });
  }

  app.listen(PORT, () => {
    console.log(`NOVACORE portfolio API ready on port ${PORT}`);
  });
}

startServer().catch(error => {
  console.error('Server startup failed:', error);
  process.exit(1);
});