import { useState, useEffect } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Fab,
  Divider,
  Link,
  useScrollTrigger,
  Slide,
} from '@mui/material'
import {
  Star,
  CallSplit,
  OpenInNew,
  GitHub,
  Email,
  KeyboardArrowUp,
  Code,
  Update,
} from '@mui/icons-material'

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

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ScrollToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Slide direction="up" in={trigger} mountOnEnter unmountOnExit>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Slide>
  );
}

function App() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Try local API first (for development)
        let response;
        let responseText = '';
        
        try {
          response = await fetch('http://localhost:8080/api/projects');
          if (!response.ok) throw new Error('API not available');
        } catch {
          // Fallback to static JSON (for production/GitHub Pages)
          response = await fetch('/api/projects.json');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        
        // Get the response as text first to debug any issues
        responseText = await response.text();
        
        // Trim any whitespace and check for empty response
        responseText = responseText.trim();
        if (!responseText) {
          throw new Error('Empty response received');
        }

        // Clean up any extra content that might be appended (like "HTTP Status: 200")
        if (responseText.includes('HTTP Status:')) {
          const jsonEndIndex = responseText.lastIndexOf('}');
          if (jsonEndIndex !== -1) {
            responseText = responseText.substring(0, jsonEndIndex + 1);
          }
        }
        
        // Parse JSON
        let data: ProjectResponse;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          console.error('Full JSON response:');
          console.error(responseText);
          throw new Error(`JSON parsing failed: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        }
        
        // Validate data structure
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid data structure received');
        }
        
        if (!Array.isArray(data.projects)) {
          throw new Error('Projects data is not an array');
        }
        
        setProjects(data.projects);
        setLastUpdated(data.lastUpdated || '');
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll>
        <AppBar position="fixed" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              My Projects
            </Typography>
            <Button color="inherit" onClick={() => scrollToSection('about')}>
              About
            </Button>
            <Button color="inherit" onClick={() => scrollToSection('projects')}>
              Projects
            </Button>
            <Button color="inherit" onClick={() => scrollToSection('contact')}>
              Contact
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Toolbar /> {/* Spacer for fixed AppBar */}

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #A8C8EC 0%, #E8B4CB 100%)',
          color: '#2C3E50',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 400 }}>
            Welcome to My Project Portfolio
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            I'm sharing some projects online, starting with small learning and teaching tools, 
            particularly focused on tax-related applications. I'll be hosting more projects here in the future.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => scrollToSection('projects')}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
              },
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            View Projects
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
            About
          </Typography>
          <Card elevation={0} sx={{ bgcolor: 'background.paper', p: 3 }}>
            <CardContent>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                This portfolio showcases my journey in software development, starting with educational 
                and practical tools. My current focus is on creating accessible tax calculation tools 
                that help people learn and understand tax concepts.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box id="projects" sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ mb: 6 }}>
            Projects
          </Typography>
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress size={40} />
              <Typography variant="body1" sx={{ ml: 2, alignSelf: 'center' }}>
                Loading projects from GitHub...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="warning" sx={{ mb: 4 }}>
              <strong>Error loading projects:</strong> {error}
              <br />
              Showing fallback content...
            </Alert>
          )}

          <Grid container spacing={3}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <Grid item xs={12} md={6} lg={4} key={project.id}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {project.name}
                        </Typography>
                        {project.language && (
                          <Chip
                            label={project.language}
                            size="small"
                            sx={{
                              bgcolor: getLanguageColor(project.language),
                              color: 'white',
                              fontWeight: 500,
                            }}
                          />
                        )}
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {project.description || 'No description available'}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<Star />}
                          label={project.stargazers_count}
                          variant="outlined"
                          size="small"
                        />
                        <Chip
                          icon={<CallSplit />}
                          label={project.forks_count}
                          variant="outlined"
                          size="small"
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Update sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          Updated: {formatDate(project.updated_at)}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          bgcolor: 'rgba(0, 0, 0, 0.02)',
                          borderRadius: 1,
                          p: 2,
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: 80,
                        }}
                      >
                        <Code sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {project.language || 'Project'} Repository
                        </Typography>
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        size="small"
                        variant="contained"
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNew />}
                        fullWidth
                      >
                        View Repository
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : !loading && !error && (
              <Grid item xs={12}>
                <Card elevation={0} sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No projects found.
                  </Typography>
                </Card>
              </Grid>
            )}
            
            {/* Show a "more projects coming" card if we have projects */}
            {projects.length > 0 && (
              <Grid item xs={12} md={6} lg={4}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    border: '2px dashed',
                    borderColor: 'primary.light',
                    bgcolor: 'primary.light',
                    opacity: 0.7,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h6" component="h3" gutterBottom color="primary">
                      More Projects Coming Soon
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      I'll be adding more educational and practical tools to this portfolio.
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: 'rgba(103, 80, 164, 0.1)',
                        borderRadius: 1,
                        p: 3,
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 80,
                      }}
                    >
                      <Typography variant="h4">🚀</Typography>
                      <Typography variant="body2" color="primary" sx={{ ml: 1 }}>
                        Future Projects
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      href="https://github.com/jasonschurawel"
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={<GitHub />}
                      fullWidth
                    >
                      GitHub Profile
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )}
          </Grid>

          {lastUpdated && (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Projects last updated: {formatDate(lastUpdated)}
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
            Get in Touch
          </Typography>
          <Card elevation={0} sx={{ bgcolor: 'background.paper', p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Interested in collaborating or have questions about my projects?
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="mailto:your-email@example.com"
              startIcon={<Email />}
              sx={{ mt: 2 }}
            >
              Contact Me
            </Button>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: '#E8B4CB', color: '#2C3E50', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Copyright Notice
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                © 2025 Jason Schurawel. All rights reserved.
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                This website and its design are protected by copyright.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Project Licenses
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Individual projects may have different licenses.
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Please refer to each project's repository for specific license terms.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Links
              </Typography>
              <Link
                href="https://github.com/jasonschurawel"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                sx={{ display: 'flex', alignItems: 'center', opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                <GitHub sx={{ mr: 1 }} />
                GitHub Profile
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <ScrollToTop />
    </Box>
  )
}

export default App
