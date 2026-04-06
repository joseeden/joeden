---
title: Project Card Tags for Filtering
description: "Add tags to project cards and implement filtering functionality"
tags:
- Docusaurus
- React
sidebar_position: 24
---

## Overview

This page provides the details for adding tags to project cards in Docusaurus and implementing tag-based filtering to display specific projects. Tags help organize and categorize projects, which allows users to filter the projects page to show only the content they're interested in.

## Background

The projects page displays project cards in a grid layout. By adding tags to each project, you can:

- Categorize projects by technology, domain, or scope
- Implement filtering to show/hide projects based on selected tags
- Improve user experience by allowing focused browsing

Example tags might include:

- **Technology**: `web`, `backend`, `frontend`, `devops`, `cloud`, `data`, `ml`
- **Category**: `lab`, `project`, `jupyter-notebook`, `demo`
- **Platform**: `aws`, `kubernetes`, `jenkins`, `docker`

Files to modify:

- `src/components/projects/Project.tsx` - Update interface and component
- `src/pages/projects.tsx` - Add tags to project objects
- `src/components/projects/Project.module.scss` - Add tag styling (optional)

Additional notes:

- Tags are optional; projects without tags will still render without the tags section
- Tag names should be lowercase and use hyphens for multi-word tags (e.g., `ci-cd`)
- Consider creating a consistent taxonomy of tags to avoid duplication
- Filtering can be implemented using React state management or external libraries like Zustand


## Implementation

### 1. Update `ProjectData` Interface

Update the `ProjectData` interface in `src/components/projects/Project.tsx` to include an optional tags array:

```typescript
export interface ProjectData {
  title: string;
  description: string;
  url: string;
  image: string;
  tags?: string[];  // Add this property
}
```

### 2. Render Tags in Project Component

Update the `Project` component to accept and render tags:

```typescript
export const Project: FunctionComponent<ProjectData> = ({
  title,
  description,
  url,
  image,
  tags,  // Add this parameter
}) => {
  return (
    <div className={clsx("col col--6", styles.cardContainer)}>
      <div className={clsx("card", styles.card)}>
        <div className={clsx("card__image", styles.image)}>
          <Image img={image} alt={description} title={title} />
        </div>
        <div className={clsx("card__body", styles.card__body)}>
          <h2>{title}</h2>
          <p>{description}</p>
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={clsx("badge", styles.tag)}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className={clsx("card__footer", styles.card__footer)}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="button button--primary button--outline"
          >
            <span className="button__icon">
              <DiscoverIcon />
            </span>
            See Project
          </a>
        </div>
      </div>
    </div>
  );
};
```

### 3. Add Tags to Projects

Update your projects array in `src/pages/projects.tsx` to include tags:

```typescript
const projects: ProjectData[] = [
  {
    title: "Swiftlink",
    description: "A responsive landing page for a fictional logistics company",
    url: `${baseUrl}/docs/Software-Engineering/Web-Development/Projects/Swiftlink/`,
    image: require(`/img/docs/Screenshot-2025-04-18-144904.png`),
    tags: ["web", "frontend", "responsive"],
  },
  {
    title: "CI/CD Pipeline for Flask Application",
    description: "Automate code deployment with testing, packaging, and server deployment.",
    url: `${baseUrl}/docs/Version-Control-and-CICD/Jenkins-Labs/Single-Server-Deployment`,
    image: require(`/img/docs/jenkins-flask.png`),
    tags: ["devops", "jenkins", "ci-cd", "flask"],
  },
  // Add tags to remaining projects...
];
```

### 4. Add Tag Styling (Optional)

Add CSS styling for project tags in `src/components/projects/Project.module.scss`:

```scss
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.tag {
  font-size: 0.75rem;
  padding: 4px 8px;
  background-color: #2e8555;
  color: #ffffff;
  border-radius: 4px;
  text-transform: lowercase;
}
```

### 5. Implement Filtering (Future Enhancement)

To add filtering functionality:

1. Convert `projects.tsx` to use React state with `useState` hook
2. Track selected tags in state
3. Filter the projects array based on selected tags
4. Render tag filter buttons/toggles
5. Update the displayed projects based on the filter selection

Example structure:

```typescript
const [selectedTags, setSelectedTags] = useState<string[]>([]);

const filteredProjects = selectedTags.length === 0
  ? projects
  : projects.filter(project =>
      project.tags?.some(tag => selectedTags.includes(tag))
    );
```

