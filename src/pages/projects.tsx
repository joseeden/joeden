import React, { useState } from "react";
import Layout from "@theme/Layout";
import styles from "../components/projects/Project.module.scss";
import { Project, ProjectData } from "../components/projects/Project";

// const assetsDir = "./assets/projects";
const baseUrl = "/joeden";

const projects: ProjectData[] = [
  {
    title: "Link Shortener using NextJS",
    description: "Full-stack link shortener application built with Github Copilot and Next.js",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Link-Shortener-NextJS/`, 
    image: require(`/img/docs/Screenshot2026-05-03131335.png`),
    tags: ["Web Development", "Javascript"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Swiftlink",
    description: "A responsive landing page for a fictional logistics company with modern sections",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Swiftlink/`, 
    image: require(`/img/docs/Screenshot-2025-04-18-144904.png`),
    tags: ["Web Development", "JavaScript"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Circuit Minds",
    description: "Landing page for a fictional electronics and engineering company",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Circuit-Minds/`, 
    image: require(`/img/docs/Screenshot-2025-03-28-195824.png`),
    tags: ["Web Development", "JavaScript"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Just Keep Running",
    description: "A simple landing page for a fictional running event with a signup form",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Just-Keep-Running/`, 
    image: require(`/img/docs/Screenshot-2025-03-24-075843.png`),
    tags: ["Web Development", "JavaScript"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },   
  {
    title: "Probably Important",
    description: "Full-stack note-taking app with authentication and rich text editing",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Probably-Important/`,
    image: require(`/img/docs/Screenshot2026-06-24131132.png`),
    tags: ["Web Development", "JavaScript"],
    // level: "Intermediate", // Full-stack Next.js app with auth, database, and rich text editing
  },  
  {
    title: "Capstone: Google IT Automation with Python",
    description: "Collection of scripts for Google IT Automation with Python Course",
    url: "https://github.com/joseeden/Capstone-Google-IT-Automation-with-Python/blob/main/README.md", 
    image: require(`/img/docs/coursera-google-it-automation-with-python.png`),
    tags: ["DevOps", "Python", "Automation"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },   
  {
    title: "AI Content Processing Workflow",
    description: "LLM workflow for extracting and transforming website content",
    url: "https://github.com/joseeden/llm-engineering-sandbox/blob/master/building-ai-workflows/05-multi-step-workflow/README.md", 
    image: require(`/img/docs/ai-content-process-thumbnail.png`),
    tags: ["Artificial Intelligence", "LLM"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },    
  {
    title: "AI Invoice Processing Pipeline",
    description: "Automated invoice extraction using LLM structured outputs and validation",
    url: "https://github.com/joseeden/llm-engineering-sandbox/blob/master/building-ai-workflows/07-ai-invoice-procesing-pipeline/README.md", 
    image: require(`/img/docs/ai-invoice-processing-pipeline-2.png`),
    tags: ["Artificial Intelligence", "LLM"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },    
  {
    title: "AI Content Publishing Workflow",
    description: "Multi-step AI workflow for content, image, and social post generation",
    url: "https://github.com/joseeden/llm-engineering-sandbox/blob/master/building-ai-workflows/10-ai-content-publishing-pipeline/README.md", 
    image: require(`/img/docs/ai-content-publishing-workflow-thumbnail.png`),
    tags: ["Artificial Intelligence", "LLM"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },    
  {
    title: "AI Content Workflow with HITL",
    description: "Multi-step content generation with human-in-the-loop (HITL) review and approval",
    url: "https://github.com/joseeden/llm-engineering-sandbox/blob/master/building-ai-workflows/11-ai-content-workflow-with-hitl/README.md", 
    image: require(`/img/docs/ai-content-workflow-with-hitl.png`),
    tags: ["Artificial Intelligence", "LLM"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },    
  {
    title: "Slack Integrations for AI Workflows",
    description: "Extending AI workflows with Slack notifications for real-time status updates",
    url: "https://github.com/joseeden/llm-engineering-sandbox/blob/master/building-ai-workflows/20-slack-integration-for-ai-workflows/README.md", 
    image: require(`/img/docs/slack-integrations-forai-workflow-thumbnail.png`),
    tags: ["Artificial Intelligence", "LLM"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },    
  {
    title: "WhatsApp API for AI Workflows",
    description: "Automated WhatsApp notifications and alerts for multi-step AI workflows",
    url: "https://github.com/joseeden/llm-engineering-sandbox/blob/master/building-ai-workflows/21-whatsapp-integration-for-ai-workflows/README.md", 
    image: require(`/img/docs/whatsapp-integrations-forai-workflow-thumbnail.png`),
    tags: ["Artificial Intelligence", "LLM"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },    
  {
    title: "AI Blog Post Generator",
    description: "Using AI to generate structured blog posts from outlines and example posts",
    url: "https://github.com/joseeden/llm-engineering-sandbox/blob/master/building-ai-workflows/09-ai-blog-post-generator/README.md", 
    image: require(`/img/docs/ai-blog-psot-generator-thumbnail.png`),
    tags: ["Artificial Intelligence", "LLM"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },      
  {
    title: "AI-Assisted Testing and CI/CD",
    description: "Using AI for software testing and CI/CD with pytest and GitHub Actions",
    url: "https://github.com/joseeden/labs-ai-assisted-software-testing/blob/master/README.md", 
    image: require(`/img/docs/pytest-python-usage.jpg`),
    tags: ["Artificial Intelligence", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },    
  {
    title: "AI-Assisted DB Lifecycle Pipeline",
    description: "Using AI for database lifecycle management with automated testing",
    url: "https://github.com/joseeden/labs-ai-assisted-database-lifecycle-pipeline/blob/master/README.md", 
    image: require(`/img/docs/Screenshot2026-06-06033245.png`),
    tags: ["DevOps", "Artificial Intelligence"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },    
  {
    title: "Multi-Tool Customer Service Agent",
    description: "AI agent using tool calling, customer verification, and refund workflows",
    url: "https://github.com/joseeden/llm-engineering-sandbox/tree/master/building-ai-agents/03-multi-tool-customer-service-agent/README.md",
    image: require(`/img/docs/multi-tool-cs-agent-proj.png`),
    tags: ["Artificial Intelligence", "LLM"],
  },
  {
    title: "Multi-Agent Research Workflow",
    description: "AI research assistant using planner, web search, and reporting agents",
    url: "https://github.com/joseeden/LLM-Engineering-Sandbox/blob/master/building-ai-agents/05-multi-agent-research-workflow/README.md",
    image: require(`/img/docs/multi-agent-workflow-thumbnail.png`),
    tags: ["Artificial Intelligence", "LLM"],
  },  
  {
    title: "CrewAI Research Report Agent",
    description: "Multi-agent research workflow built with CrewAI and SearXNG tooling for reports",
    url: "https://github.com/joseeden/LLM-Engineering-Sandbox/blob/master/crewai-projects/01-research-report-agent/README.md",
    image: require(`/img/docs/crewai-research-report-agent-thumbnail.png`),
    tags: ["Artificial Intelligence", "LLM"],
  },
  {
    title: "LLM Engineering Sandbox",
    description: "Collection of engineering patterns for building decoupled LLM integrations",
    url: "https://github.com/joseeden/LLM-Engineering-Sandbox/blob/master/README.md", 
    // image: require(`/img/docs/llm-engineering-thumbnail.png`), 
    image: require(`/img/docs/llm-engineering-thumbnail.jpg`), 
    tags: ["Artificial Intelligence", "LLM"],
    // level: "Intermediate", // Perfect for an engineering sandbox that focuses on decoupled architecture
  },  
  {
    title: "KodeKloud Engineer Labs",
    description: "Collection of 130+ labs and exercises from the KodeKloud Engineer platform",
    url: "https://github.com/joseeden/KodeKloud_Engineer_Labs/blob/main/README.md", 
    image: require(`/img/docs/all-things-devops-kodekloud-img.png`),
    tags: ["DevOps", "Docker", "Kubernetes"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },     
  {
    title: "CI/CD Pipeline for Flask Application",
    description: "Automated code testing, packaging, and deployment with Jenkins",
    url: `${baseUrl}/docs/Version-Control-and-CICD/Jenkins-Labs/Single-Server-Deployment`, 
    image: require(`/img/docs/jenkins-flask.png`),
    tags: ["DevOps", "Docker", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },   
  {
    title: "AWS Serverless Deployment using Jenkins",
    description: "Using Jenkins to deploy a serverless application to AWS Cloud",
    url: `${baseUrl}/docs/Amazon-Web-Services/Projects/Deploy-Serverless-App-using-Jenkins/`, 
    image: require(`/img/docs/AWS-SAM.png`),
    tags: ["DevOps", "AWS", "Serverless"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Setting Up Jenkins with Ansible",
    description: "Automated Jenkins installation and setup using Ansible playbooks",
    url: `${baseUrl}/docs/Version-Control-and-CICD/Jenkins-Labs/Setup-Ansible-and-Jenkins/`, 
    image: require(`/img/docs/ansible-jenkins.png`),
    tags: ["DevOps", "Ansible", "Jenkins"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Kong Gateway Setup with Docker Compose",
    description: "Setup Kong API Gateway with ELK, Prometheus, Grafana, and more",
    url: `${baseUrl}/docs/Software-Engineering/Kong-API-Gateway/Containerized-Kong-and-Other-Apps`, 
    image: require(`/img/docs/kong-elk-prom-graf.png`),
    tags: ["DevOps", "Docker", "Observability"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "GetItDone Automation with Boto3",
    description: "Python automation for AWS S3, SNS, Rekognition, and Comprehend services",
    url: `${baseUrl}/docs/Amazon-Web-Services/Projects/Boto3-Lab-GetItDone/Starter-Notes`,
    image: require(`/img/docs/3add1a95-4c25-4728-8b92-1513eac1a63f.png`),
    tags: ["DevOps", "AWS", "Python"],
  },
  {
    title: "Restaurant APIs with Azure Function App",
    description: "Serverless API built with HTTP-triggered endpoints on Azure Cloud",
    url: `${baseUrl}/docs/Microsoft-Azure/Projects/Building-a-Weather-API-with-Azure-Function-App/`,
    image: require(`/img/docs/e7f31254-a5fe-4b38-9c54-0fab1631a229.png`),
    tags: ["DevOps", "Azure", "Serverless"],
  },
  {
    title: "NGINX Deployment using Flux and Helm",
    description: "GitOps-based deployment of NGINX using Flux and Helm charts",
    url: `${baseUrl}/docs/Kubernetes-Tools/Flux/FluxCD-with-Helm/Deploy-Nginx-with-Helm`,
    image: require(`/img/docs/a8973bba-5a64-4bd5-83c9-f2f4b95149cc.png`),
    tags: ["DevOps", "Kubernetes"],
  },
  {
    title: "Traefik Edge Routing Labs",
    description: "Reverse proxy labs with routing, TLS, middleware, and observability",
    url: `${baseUrl}/docs/Kubernetes-Tools/Traefik/Traefik-Labs`,
    image: require(`/img/docs/bce18e5d-d8d4-45bc-8925-4fdc360ad8ad.png`),
    tags: ["DevOps", "Observability"],
  },
  {
    title: "Prometheus Monitoring Labs",
    description: "Monitoring labs with exporters, PromQL, dashboards, and alerts in practice",
    url: `${baseUrl}/docs/Observability/Prometheus/Prometheus-Labs`,
    image: require(`/img/docs/ba815455-ac09-49dd-b093-dcdc7715d5c1.png`),
    tags: ["DevOps", "Observability"],
  },
  {
    title: "Elastic Stack Logging Labs",
    description: "Centralized logging labs with Elasticsearch, Logstash, and Kibana (ELK Stack)",
    url: `${baseUrl}/docs/Observability/Elastic-Stack/Elastic-Stack-Labs`,
    image: require(`/img/docs/99877e9f-c902-4e4b-bd7f-664561028686.png`),
    tags: ["DevOps", "Observability"],
  },
  {
    title: "All Things Terraform",
    description: "Terraform projects for AWS, Azure, and infrastructure automation.",
    url: "https://github.com/joseeden/All-Things-Terraform/blob/master/README.md",
    image: require(`/img/docs/d02abcfa-c53c-4e00-91d5-696f1772e46b.png`),
    tags: ["DevOps", "Terraform", "Infrastructure as Code"],
  },  
  {
    title: "OpenStack Private Cloud Setup",
    description: "Manual OpenStack deployment across compute, network, and storage",
    url: `${baseUrl}/docs/OpenStack/Manual-Install/Lab-Setup`,
    image: require(`/img/docs/a0254144-dd3e-4bc4-91cc-ba5e4af7c26c.png`),
    tags: ["DevOps", "OpenStack"],
  },
  {
    title: "RHCSA Linux Labs",
    description: "Collection of Linux labs for the RHCSA exam preparation",
    url: `${baseUrl}/docs/Linux/RHCSA-Labs/RHCSA-Labs`,
    image: require(`/img/docs/a4eb2c86-c129-4fc0-ac8e-57ac7191146d.png`),
    tags: ["DevOps", "Linux"],
  },
  {
    title: "Visual History of Nobel Prize Winners",
    description: "Analyze the age and demographics of Nobel Prize winners over time",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/023-A-Visual-History-of-Nobel-Prize-Winners/A-Visual-History-of-Nobel-Prize-Winners.ipynb",
    image: require(`/img/docs/nobelinstituttet-prize-medal.jpg`),
    tags: ["Data Analysis", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Analyze Runkeeper Running Data",
    description: "Analyze running data from the Runkeeper app over time",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/024-Analyze-Runkeeper-Fitness-Data/Analyze-Runkeeper-Fitness-Data.ipynb", 
    // image: require(`/img/docs/Screenshot2026-05-09203336.png`),
    image: require(`/img/docs/Screenshot2026-06-07154855.png`),
    tags: ["Data Analysis", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "A Network Analysis of Game of Thrones",
    description: "Analyze co-occurrence networks of characters in the Game of Thrones books",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/020-A-Network-Analysis-of-Game-of-Thrones/network-analysis-on-game-of-thrones.ipynb",
    image: require(`/img/docs/got_network.jpeg`),
    tags: ["Data Analysis", "Python"]
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "A New Era of Data Analysis in Baseball",
    description: "Using Statcast data to compare home runs of two of MLB's brightest stars ",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/021-A-New-Era-of-Data-Analysis-in-Baseball/A-New-Era-of-Data-Analysis-in-Baseball.ipynb",
    // image: require(`/img/docs/stanton_wide.jpg`),
    image: require(`/img/docs/Aaron-Judge-2025-Postseason.jpg`),
    tags: ["Data Analysis", "Python"]
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "Investigating Netflix Movies",
    description: "Exploratory data analysis on 90s movie collection using Netflix data",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/010-Investigating-Netflix-Movies/netflix-movies.ipynb",
    image: require(`/img/docs/redpopcorn.jpg`),
    tags: ["Data Analysis", "Python"]
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },
  {
    title: "Hacker Statistics with Python",
    description: "Using hacker statistics to calculate your chances of winning a bet",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/009-Hacker-Statistics/Hacker_Statistics.ipynb",
    image: require(`/img/docs/hacker-statistics.png`),
    tags: ["Data Analysis", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  {
    title: "Exploring NYC Public School Test Result Scores",
    description: "Analyze scores using summary statistics and data manipulation using Pandas",
    url: "https://colab.research.google.com/github/joseeden/joeden/blob/master/docs/065-Software-Engineering/021-Jupyter-Notebooks/022-Exploring-NYC-Public-School-Test-Result-Scores/Exploring-NYC-Public-School-Test-Result-Scores.ipynb",
    image: require(`/img/docs/schoolbus.jpg`),
    tags: ["Data Analysis", "Python"],
    // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  },  
  // {
  //   title: "Centralized Logging with Graylog SIEM",
  //   description: "Deploy Graylog as an SIEM solution to collect logs from AWS resources.",
  //   url: "",
  //   image: require(`/img/docs/graylog.png`),
  //   tags: ["DevOps", "Security", "AWS"],
  //   // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  // },
  // {
  //   title: "Microservices Deployment on Kubernetes",
  //   description: "Deploy microservices-based application on Kubernetes.",
  //   url: "",
  //   image: require(`/img/docs/aws-eks.png`),
  //   tags: ["DevOps", "Kubernetes", "Docker"],
  //   // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  // },
  // {
  //   title: "End-to-End DevSecOps Pipeline",
  //   description: "CICD pipeline with automated testing, security scans, and compliance checks.",
  //   url: "",
  //   image: require(`/img/docs/devsecops.png`),
  //   tags: ["DevOps", "Security"],
  //   // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  // },
  // {
  //   title: "Machine Learning Pipeline Deployment",
  //   description: "Build an ML pipeline for data preprocessing and model training.",
  //   url: "",
  //   image: require(`/img/docs/mlops.png`),
  //   tags: ["Machine Learning", "MLOps", "Python"],
  //   // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  // },
  // {
  //   title: "ETL Pipeline Deployment",
  //   description: "Develop an ETL pipeline to extract, transform, and load large datasets.",
  //   url: "",
  //   image: require(`/img/docs/etl-pipeline.png`),
  //   tags: ["Data Engineering", "ETL", "Python"],
  //   // level: "Basic",     // "Basic", "Intermediate", "Advanced"
  // },
];


// Set the layout of the Projects page, including the title and categories for filtering projects. 
//    Left column: Categories filter sidebar
//    Right column: Project cards
// The categories are defined as an array of objects, each with an `id` and a `label`. 
// The `id` is used for internal logic, while the `label` is displayed to users.
const title = "Projects";

const categories = [
  { id: "devops", label: "DevOps" },
  { id: "observability", label: "Observability" },
  { id: "security", label: "Security" },
  { id: "webdev", label: "Web Development" },
  { id: "dataanalysis", label: "Data Analysis" },
  { id: "dataengineering", label: "Data Engineering" },
  { id: "ml", label: "Machine Learning" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "llm", label: "LLM" },
];

export default function Projects(): JSX.Element {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((currentCategories) => {
      if (currentCategories.includes(category)) {
        return currentCategories.filter((item) => item !== category);
      }

      return [...currentCategories, category];
    });
  };

  const filteredProjects =
    selectedCategories.length === 0
      ? projects
      : projects.filter((project) =>
          project.tags?.some((tag) => selectedCategories.includes(tag)),
        );

  return (
    <Layout title={title}>
      <main className={`${styles.projectsMain}`}>
        <div className={styles.projectsPage}>
          <div className={styles.outerpageContainer}>
            <div className={styles.headerBox}>
              <h1 className={styles.projectsTitle}>{title}</h1>
            </div>
            <div className={styles.pageContainer}>
              <div className={styles.leftColumn}>
                <div className={styles.sidebarContainer}>
                  <div className={styles.categoriesHeader}>
                    CATEGORIES
                  </div>
                  <div className={styles.categoriesList}>
                    {categories.map((category) => (
                      <div key={category.id} className={styles.categoryItem}>
                        <input
                          type="checkbox"
                          id={category.id}
                          className={styles.categoryToggle}
                          checked={selectedCategories.includes(category.label)}
                          onChange={() => handleCategoryToggle(category.label)}
                        />
                        <label htmlFor={category.id} className={styles.categoryLabel}>
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <button
                    className={styles.clearAllButton}
                    onClick={() => setSelectedCategories([])}
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <div className={styles.rightColumn}>
                <div className={styles.cardsList}>
                  {filteredProjects.map((project) => (
                    <Project key={project.title} {...project} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
