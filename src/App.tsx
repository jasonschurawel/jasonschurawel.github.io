import { useState, useEffect } from 'react'
import './App.css'

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
}

interface ProjectResponse {
  projects: GitHubRepo[];
  lastUpdated: string;
}

function App() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/projects');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ProjectResponse = await response.json();
        setProjects(data.projects);
        setLastUpdated(data.lastUpdated);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'Go': '#00ADD8',
      'Java': '#b07219',
      'Ruby': '#701516',
      'PHP': '#4F5D95',
      'C++': '#f34b7d',
      'C': '#555555',
      'HTML': '#e34c26',
      'CSS': '#1572B6',
      'Shell': '#89e051',
    };
    return colors[language] || '#8b949e';
  };

  return (
    <div className="App">
      <header className="header">
        <nav className="nav">
          <h1 className="logo">My Projects</h1>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Welcome to My Project Portfolio</h2>
            <p>
              I'm sharing some projects online, starting with small learning and teaching tools, 
              particularly focused on tax-related applications. I'll be hosting more projects here in the future.
            </p>
            <a href="#projects" className="cta-button">View Projects</a>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <h2>About</h2>
            <p>
              This portfolio showcases my journey in software development, starting with educational 
              and practical tools. My current focus is on creating accessible tax calculation tools 
              that help people learn and understand tax concepts.
            </p>
          </div>
        </section>

        <section id="projects" className="projects">
          <div className="container">
            <h2>Projects</h2>
            
            {loading && (
              <div className="loading">
                <p>Loading projects from GitHub...</p>
              </div>
            )}

            {error && (
              <div className="error">
                <p>Error loading projects: {error}</p>
                <p>Showing fallback content...</p>
              </div>
            )}

            <div className="project-grid">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <h3>{project.name}</h3>
                      {project.language && (
                        <span 
                          className="language-badge"
                          style={{ backgroundColor: getLanguageColor(project.language) }}
                        >
                          {project.language}
                        </span>
                      )}
                    </div>
                    
                    <p className="project-description">
                      {project.description || 'No description available'}
                    </p>
                    
                    <div className="project-stats">
                      <span className="stat">⭐ {project.stargazers_count}</span>
                      <span className="stat">🔀 {project.forks_count}</span>
                      <span className="stat">📅 Updated: {formatDate(project.updated_at)}</span>
                    </div>

                    <div className="project-preview">
                      <div className="preview-placeholder">
                        <span>🔧 {project.language || 'Project'} Repository</span>
                      </div>
                    </div>
                    
                    <div className="project-links">
                      <a 
                        href={project.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                      >
                        View Repository
                      </a>
                      <a 
                        href="https://github.com/jasonschurawel" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link secondary"
                      >
                        GitHub Profile
                      </a>
                    </div>
                    
                    <p className="license-note">License details available on project page</p>
                  </div>
                ))
              ) : !loading && !error && (
                <div className="no-projects">
                  <p>No projects found.</p>
                </div>
              )}
              
              {/* Show a "more projects coming" card if we have projects */}
              {projects.length > 0 && (
                <div className="project-card coming-soon">
                  <h3>More Projects Coming Soon</h3>
                  <p>I'll be adding more educational and practical tools to this portfolio.</p>
                  <div className="project-preview">
                    <div className="preview-placeholder">
                      <span>🚀 Future Projects</span>
                    </div>
                  </div>
                  <div className="project-links">
                    <a href="https://github.com/jasonschurawel" target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub Profile
                    </a>
                  </div>
                </div>
              )}
            </div>

            {lastUpdated && (
              <div className="last-updated">
                <p>Projects last updated: {formatDate(lastUpdated)}</p>
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <h2>Get in Touch</h2>
            <p>Interested in collaborating or have questions about my projects?</p>
            <a href="mailto:your-email@example.com" className="contact-button">Contact Me</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Copyright Notice</h4>
              <p>&copy; 2025 Jason Schurawel. All rights reserved.</p>
              <p>This website and its design are protected by copyright.</p>
            </div>
            <div className="footer-section">
              <h4>Project Licenses</h4>
              <p>Individual projects may have different licenses.</p>
              <p>Please refer to each project's repository for specific license terms.</p>
            </div>
            <div className="footer-section">
              <h4>Links</h4>
              <a href="https://github.com/jasonschurawel" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Built with React and hosted on GitHub Pages</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
