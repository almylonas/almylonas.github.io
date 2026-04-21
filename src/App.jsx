import { useState } from "react";

const NAV_LINKS = ["Home", "CV", "Projects"];

const PROJECTS = [
  {
    id: 1,
    title: "HPlot",
    tags: ["React"],
    description:
      "A web app for visualising LHC invariant mass datasets created in Hypatia, backed by Neon PostgreSQL.",
    image: "https://www.anthoscope.com/images/hplot.png",
    link: "https://github.com/almylonas/HPloT",
  },
  {
    id: 2,
    title: "Anthoscope",
    tags: ["React", "Flask","Python"],
    description:
      "Anthoscope is an interactive web platform designed to help people manage their pollen allergies more effectively. It combines real-time pollen data, user input, and geospatial visualization to deliver clear, map-based insights into allergy risks across regions. Through a color-coded map, users can instantly identify safe or high-risk areas based on pollen concentration. What makes Anthoscope unique is its community-driven component: users can share their personal experiences and rate areas according to their allergy symptoms. This feedback loop creates a continuously improving, human-centered database that complements scientific forecasts with lived experiences. By combining environmental data and citizen input, Anthoscope promotes public awareness and healthier decisions for individuals with allergies, supporting both preventive healthcare and outdoor well-being. The project prototype already visualizes pollen data on an interactive map, marking the first step toward a comprehensive environmental health platform.",
    image: "https://www.anthoscope.com/images/map.png",
    link: "https://github.com/Anthoscope",
  },
  {
    id: 3,
    title: "Neutron Star Parameters Solver"
",
    tags: ["Python", "Flask"],
    description:
      "A Flask-based web application for solving Tolman–Oppenheimer–Volkoff (TOV) equations for neutron stars using various Equations of State (EOS).",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    link: "https://github.com/almylonas/Neutron-Star-Solver-Web",
  },
  {
    id: 4,
    title: "Exoworlds",
    tags: ["Javascript"],
    description:
      "A 3D exoplanet generator and simulator, using real parameters, providing third and first person view",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    link: "https://github.com/Exoworlds",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #1a0a2e;
    --surface: #231040;
    --border: #3a2060;
    --accent: #ffffff;
    --text: #f0eaf8;
    --muted: #7a6a9a;
    --font-display: 'Cormorant Garamond', serif;
    --font-mono: 'DM Mono', monospace;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-mono);
    min-height: 100vh;
  }

  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }

  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: flex-end;
    padding: 1.4rem 3rem;
    background: rgba(26,10,46,0.92);
    backdrop-filter: blur(12px);
  }

  .nav-logo { display: none; }

  .nav-links { display: flex; gap: 2.5rem; }

  .nav-link {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    transition: color 0.2s;
    background: none; border: none; font-family: var(--font-mono);
  }
  .nav-link:hover, .nav-link.active { color: var(--accent); }

  /* PAGES */
  .page {
    min-height: 100vh;
    padding: 8rem 3rem 4rem;
    position: relative; z-index: 1;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* HOME */
  .home {
    display: flex; flex-direction: column;
    justify-content: center; align-items: flex-start;
    width: 100%; min-height: 100vh;
    padding: 0 3rem 0 7rem;
    box-sizing: border-box;
    position: relative; z-index: 1;
    animation: fadeUp 0.5s ease both;
  }

  .home-eyebrow {
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.2rem;
    text-align: left;
  }

  .home-name {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 300;
    line-height: 1.05;
    letter-spacing: -0.01em;
    margin-bottom: 1.2rem;
    text-align: left;
  }

  .home-name em {
    font-style: italic;
    color: var(--accent);
  }

  .home-role {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 2.5rem;
    text-align: left;
  }

  .home-divider { display: none; }

  .home-links { display: flex; gap: 1.5rem; padding-left: 0; }

  .icon-link {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--muted); text-decoration: none;
    padding: 0.4rem 0;
    border: none;
    transition: color 0.25s;
  }
  .icon-link:hover { color: var(--text); }
  .icon-link svg { width: 14px; height: 14px; }

  /* CV */
  .cv-page {
    max-width: 680px;
    margin: 0 auto;
  }
  .page-heading {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
  .page-heading em { font-style: italic; color: var(--accent); }
  .page-sub {
    font-size: 0.65rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 3rem;
  }
  .cv-card {
    border: 1px solid var(--border);
    padding: 2.5rem;
    display: flex; align-items: center; gap: 2rem;
    transition: border-color 0.25s;
  }
  .cv-card:hover { border-color: var(--accent); }
  .cv-icon {
    width: 48px; height: 48px; flex-shrink: 0;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent);
  }
  .cv-icon svg { width: 20px; height: 20px; }
  .cv-card-text { flex: 1; }
  .cv-card-title {
    font-family: var(--font-display);
    font-size: 1.3rem; margin-bottom: 0.3rem;
  }
  .cv-card-desc {
    font-size: 0.65rem; letter-spacing: 0.1em;
    color: var(--muted); margin-bottom: 1.2rem;
  }
  .cv-btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); text-decoration: none;
    padding: 0.55rem 1rem;
    border: 1px solid var(--accent);
    transition: all 0.2s; font-family: var(--font-mono);
  }
  .cv-btn:hover { background: var(--accent); color: var(--bg); }

  /* PROJECTS */
  .projects-page { max-width: 1100px; margin: 0 auto; }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    background: transparent;
    border: none;
  }
  .project-card {
    background: var(--surface);
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: background 0.2s;
    border: none;
  }
  .project-card:hover { background: #2a1550; }
  .project-card:hover .project-img { transform: scale(1.04); }
  .project-img-wrap {
    height: 180px; overflow: hidden;
  }
  .project-img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: grayscale(40%);
    transition: transform 0.5s ease;
  }
  .project-info { padding: 1.4rem; }
  .project-tags { display: flex; gap: 0.4rem; margin-bottom: 0.7rem; flex-wrap: wrap; }
  .tag {
    font-size: 0.55rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--accent); border: 1px solid rgba(255,255,255,0.25);
    padding: 0.2rem 0.5rem;
  }
  .project-title {
    font-family: var(--font-display);
    font-size: 1.35rem; font-weight: 400;
    margin-bottom: 0.2rem;
  }
  .project-arrow {
    position: absolute; bottom: 1.2rem; right: 1.2rem;
    color: var(--muted); font-size: 1rem; transition: color 0.2s;
  }
  .project-card:hover .project-arrow { color: var(--accent); }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 2rem;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal {
    background: var(--surface);
    border: none;
    max-width: 640px; width: 100%;
    max-height: 90vh; overflow-y: auto;
    animation: slideUp 0.3s ease;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .modal-img { width: 100%; height: 240px; object-fit: cover; filter: grayscale(20%); }
  .modal-body { padding: 2rem; }
  .modal-tags { display: flex; gap: 0.4rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .modal-title {
    font-family: var(--font-display);
    font-size: 2rem; font-weight: 300;
    margin-bottom: 0.2rem;
  }
  .modal-title em { font-style: italic; color: var(--accent); }
  .modal-desc {
    font-size: 0.75rem; line-height: 1.8;
    color: #aaa; margin: 1rem 0 1.6rem;
    letter-spacing: 0.03em;
  }
  .modal-footer { display: flex; align-items: center; justify-content: space-between; }
  .modal-link {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); text-decoration: none;
    padding: 0.6rem 1.2rem;
    border: 1px solid var(--accent);
    transition: all 0.2s; font-family: var(--font-mono);
  }
  .modal-link:hover { background: var(--accent); color: var(--bg); }
  .modal-close {
    background: none; border: none;
    color: var(--muted); cursor: pointer;
    font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 0.6rem 1rem; font-family: var(--font-mono);
    transition: all 0.2s;
  }
  .modal-close:hover { color: var(--text); }

  @media (max-width: 600px) {
    nav { padding: 1rem 1.2rem; }
    .page { padding: 7rem 1.2rem 3rem; }
    .home { padding-top: 0; }
  }
`;

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={project.image} alt={project.title} className="modal-img" />
        <div className="modal-body">
          <div className="modal-tags">
            {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
          <div className="modal-title">{project.title}</div>
          <p className="modal-desc">{project.description}</p>
          <div className="modal-footer">
            <a href={project.link} target="_blank" rel="noreferrer" className="modal-link">
              View Project <ExternalIcon />
            </a>
            <button className="modal-close" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="home">
      <p className="home-eyebrow"></p>
      <h1 className="home-name">
        Alexandros<br /><em>Mylonas</em>
      </h1>
      <p className="home-role">MSC PHYSICS STUDENT, UNIVERSITY OF BONN</p>
      <div className="home-links">
        <a href="https://github.com/almylonas" target="_blank" rel="noreferrer" className="icon-link">
          <GitHubIcon /> GitHub
        </a>
        <a href="https://linkedin.com/in/alexmyl" target="_blank" rel="noreferrer" className="icon-link">
          <LinkedInIcon /> LinkedIn
        </a>
      </div>
    </div>
  );
}

function CVPage() {
  return (
    <div className="page cv-page">
      <h2 className="page-heading">Curricu<em>lum</em><br />Vitae</h2>
      <p className="page-sub">Experience &amp; Background</p>
      <div className="cv-card">
        <div className="cv-icon"><DocIcon /></div>
        <div className="cv-card-text">
          <div className="cv-card-title">My CV</div>
          <div className="cv-card-desc">Full resume · PDF · Last updated 2025</div>
          <a href="#" className="cv-btn">Download PDF <ExternalIcon /></a>
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [active, setActive] = useState(null);
  return (
    <div className="page projects-page">
      <h2 className="page-heading">Se<em>lected</em><br />Projects</h2>
      <p className="page-sub">Work &amp; Experiments</p>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <div key={p.id} className="project-card" onClick={() => setActive(p)}>
            <div className="project-img-wrap">
              <img src={p.image} alt={p.title} className="project-img" />
            </div>
            <div className="project-info">
              <div className="project-tags">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="project-title">{p.title}</div>
            </div>
            <span className="project-arrow">↗</span>
          </div>
        ))}
      </div>
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");

  return (
    <>
      <style>{styles}</style>
      <div className="noise" />
      <nav>
        <div className="nav-logo" onClick={() => setPage("Home")}>YN</div>
        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`nav-link ${page === l ? "active" : ""}`}
              onClick={() => setPage(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </nav>
      {page === "Home" && <HomePage />}
      {page === "CV" && <CVPage />}
      {page === "Projects" && <ProjectsPage />}
    </>
  );
}