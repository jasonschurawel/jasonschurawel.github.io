package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"
)

type GitHubRepo struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	FullName    string `json:"full_name"`
	Description string `json:"description"`
	HTMLURL     string `json:"html_url"`
	Language    string `json:"language"`
	StargazersCount int `json:"stargazers_count"`
	ForksCount  int    `json:"forks_count"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
	Topics      []string `json:"topics"`
}

type ProjectResponse struct {
	Projects []GitHubRepo `json:"projects"`
	LastUpdated string   `json:"lastUpdated"`
}

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		next(w, r)
	}
}

func fetchGitHubRepos(username string) ([]GitHubRepo, error) {
	url := fmt.Sprintf("https://api.github.com/users/%s/repos?sort=updated&per_page=100", username)
	
	client := &http.Client{
		Timeout: 10 * time.Second,
	}
	
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}
	
	// Add GitHub token if available
	if token := os.Getenv("GITHUB_TOKEN"); token != "" {
		req.Header.Set("Authorization", "token "+token)
		log.Printf("Using GitHub token for authentication")
	} else {
		log.Printf("No GitHub token found, using unauthenticated requests (rate limited)")
	}
	
	req.Header.Set("Accept", "application/vnd.github.v3+json")
	req.Header.Set("User-Agent", "GitHub-Portfolio-API/1.0")
	
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch repositories: %v", err)
	}
	defer resp.Body.Close()
	
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %v", err)
	}
	
	if resp.StatusCode != http.StatusOK {
		log.Printf("GitHub API response: %s", string(body))
		return nil, fmt.Errorf("GitHub API returned status: %d, body: %s", resp.StatusCode, string(body))
	}
	
	var repos []GitHubRepo
	if err := json.Unmarshal(body, &repos); err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON: %v", err)
	}
	
	// Filter out forked repositories and keep only meaningful projects
	var filteredRepos []GitHubRepo
	for _, repo := range repos {
		// Skip if it's the username.github.io repo (this website itself)
		if repo.Name == username+".github.io" {
			continue
		}
		// You can add more filtering logic here
		filteredRepos = append(filteredRepos, repo)
	}
	
	return filteredRepos, nil
}

func getProjectsHandler(w http.ResponseWriter, r *http.Request) {
	username := "jasonschurawel" // Your GitHub username
	
	log.Printf("📡 Fetching repositories for user: %s", username)
	
	repos, err := fetchGitHubRepos(username)
	if err != nil {
		log.Printf("❌ Error fetching repositories: %v", err)
		http.Error(w, fmt.Sprintf("Error fetching repositories: %v", err), http.StatusInternalServerError)
		return
	}
	
	log.Printf("✅ Successfully fetched %d repositories", len(repos))
	
	response := ProjectResponse{
		Projects:    repos,
		LastUpdated: time.Now().Format(time.RFC3339),
	}
	
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("❌ Error encoding response: %v", err)
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
	
	log.Printf("✅ Response sent successfully")
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status": "healthy",
		"time":   time.Now().Format(time.RFC3339),
	})
}

func main() {
	http.HandleFunc("/api/projects", enableCORS(getProjectsHandler))
	http.HandleFunc("/api/health", enableCORS(healthHandler))
	
	port := "8080"
	fmt.Printf("Server starting on port %s...\n", port)
	fmt.Printf("API endpoints:\n")
	fmt.Printf("  GET http://localhost:%s/api/projects\n", port)
	fmt.Printf("  GET http://localhost:%s/api/health\n", port)
	
	// Check if GitHub token is available
	if token := os.Getenv("GITHUB_TOKEN"); token != "" {
		fmt.Printf("✅ GitHub token available (length: %d)\n", len(token))
	} else {
		fmt.Printf("⚠️  No GitHub token - using unauthenticated requests\n")
	}
	
	server := &http.Server{
		Addr:         ":" + port,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
	
	fmt.Printf("🚀 Server ready and listening...\n")
	log.Fatal(server.ListenAndServe())
}
