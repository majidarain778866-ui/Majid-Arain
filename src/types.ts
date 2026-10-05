export interface ServicePhase {
  step: string;
  title: string;
  duration: string;
  description: string;
  keyDeliverables: string[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  valueProposition?: string;
  iconName: string; // Used to reference Lucide icons dynamically
  category: "Design" | "Development" | "Marketing" | "Automation";
  startingPrice?: string;
  turnaroundTime?: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  techStack: string[];
  process: string[];
  detailedPhases?: ServicePhase[];
  faqs?: ServiceFAQ[];
  interactiveDemo?: string; // Type of interactive demo to load
  relatedProjectIds?: string[];
}

export interface ProjectChallenge {
  headline: string;
  description: string;
  keyPoints: string[];
}

export interface ProjectSolution {
  headline: string;
  description: string;
  architectureHighlights: { title: string; desc: string }[];
}

export interface ProjectMetric {
  value: string;
  label: string;
  change?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  client: string;
  clientIndustry: string;
  year: string;
  duration: string;
  category: string;
  serviceId: string;
  description: string;
  challenge: ProjectChallenge;
  solution: ProjectSolution;
  technologies: string[];
  result: string;
  metric: ProjectMetric;
  additionalMetrics?: ProjectMetric[];
  deliverables: string[];
  liveDemoType: "fintech" | "horology" | "synthetic-ai" | "automation-pipeline" | "conversion-funnel";
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatarUrl?: string;
  };
  featured: boolean;
  projectUrl?: string;
  imageUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  timeline: string;
  deliverables: string[];
}

export interface ArticleCodeSnippet {
  language: string;
  code: string;
}

export interface ArticleSection {
  subheading: string;
  content: string[];
  codeSnippet?: ArticleCodeSnippet;
  keyTakeaway?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  category: "Engineering" | "Design & UX" | "Performance Marketing" | "Automation";
  tags: string[];
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  sections: ArticleSection[];
  relatedServiceId?: string;
  relatedProjectId?: string;
  seoKeywords: string[];
  metaDescription: string;
}

