import { BlogPost, Profile, Project, Publication, Experience, Education, GalleryItem } from '../types';

export const PROFILE: Profile = {
  name: "Yahia Salaheldin Shaaban",
  role: "M.Sc. in Machine Learning",
  institution: "Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)",
  email: "yahia.shaaban@mbzuai.ac.ae",
  bio: "I am a researcher specializing in Time Series, Large Language Models, and Reasoning. My work bridges the gap between foundation models and complex, structured modalities like sensors and oil-well drilling data. Ranked 1st in NeurIPS 2024 Watermark Removal Challenge.",
  image: "https://i.imgur.com/7J5y9Xh.jpeg", // Placeholder for the user uploaded image
  quotes: [
    "\"The purpose of computation is insight, not numbers.\" — Richard Hamming",
    "\"We can only see a short distance ahead, but we can see plenty there that needs to be done.\" — Alan Turing",
    "\"Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.\" — 1984",
    "\"It is not enough to have a good mind; the main thing is to use it well.\" — René Descartes"
  ],
  socials: {
    github: "https://github.com/yahia-shaaban", // Inferred pattern
    linkedin: "https://linkedin.com/in/yahia-shaaban", // Inferred pattern
    scholar: "https://scholar.google.com",
  },
  meetingLink: "https://calendly.com/"
};

export const EDUCATION: Education[] = [
  {
    id: "e1",
    institution: "Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)",
    degree: "M.Sc. in Machine Learning (GPA: 3.83/4.0)",
    period: "Aug 2024 – May 2026",
    location: "Abu Dhabi, UAE",
    details: [
      "Thesis: Reasoning on top of integration of time series modality in LLMs, RL reasoning.",
      "Courses: Advanced ML, Probabilistic Inference, Convex Optimization, Advanced NLP."
    ]
  },
  {
    id: "e2",
    institution: "Faculty of Engineering, Alexandria University",
    degree: "B.Sc. in Computer and Communication Engineering (Top 10%)",
    period: "Sept 2018 – Jul 2023",
    location: "Alexandria, Egypt",
    details: [
      "Thesis: Personalization scheme for federated learning with secure multi-party computation (SMPC) in Flower library."
    ]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: "ex1",
    company: "AIQ Intelligence",
    role: "Full-time Research Engineer",
    period: "May 2025 – Present",
    location: "Abu Dhabi, UAE",
    description: [
      "Developing time-series large language models for oil-well drilling sensor data.",
      "Enhanced CLIP-style multimodal encoder for aligning time-series signals and language, improving retrieval recall by 8%."
    ]
  },
  {
    id: "ex2",
    company: "AIC-MCIT",
    role: "Full Time R&D Engineer",
    period: "Sept 2023 – Sept 2024",
    location: "Alexandria, Egypt",
    description: [
      "Remote Sensing: Boosted IoU scores by 42% for crop field segmentation.",
      "Biomedical Imaging: Deployed breast cancer segmentation model at Baheya hospital.",
      "Model Deployment: Optimized DL models with pruning/quantization using Ray, Slurm, Docker, TorchServe."
    ]
  },
  {
    id: "ex3",
    company: "Flower Labs",
    role: "Summer of Reproducibility Fellow",
    period: "Jul 2023 – Oct 2023",
    location: "Remote - Cambridge University",
    description: [
      "Replicated FedPara (ICLR 2022) and integrated implementation into Flower framework."
    ]
  },
  {
    id: "ex4",
    company: "Fatima Fellowship",
    role: "Predoctoral Research Fellow",
    period: "Jul 2023 – Sept 2024",
    location: "Remote",
    description: [
      "Extended learning-based Luenberger observer to non-autonomous nonlinear dynamical systems.",
      "Achieved 9% performance improvement using low-rank meta-learning."
    ]
  },
  {
    id: "ex5",
    company: "DELL Technologies",
    role: "Full-time Software Engineer",
    period: "Sept 2022 – Aug 2023",
    location: "Cairo, Egypt",
    description: [
      "Built 10M-node citation graph from S2AG dataset, replicating Delphi paper.",
      "Improved influential-paper identification by 23%."
    ]
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "p1",
    title: "SVRPBench: A Realistic Benchmark for Stochastic Vehicle Routing Problem",
    authors: ["Ahmed Heakl*", "Yahia Salaheldin Shaaban*", "Salem Lahlou", "Martin Takáč", "Zangir Iklassov"],
    venue: "NeurIPS 2025 (Datasets and Benchmarks Track)",
    year: 2025,
    abstract: "A comprehensive benchmark suite for evaluating stochastic vehicle routing algorithms, introducing realistic constraints and variability patterns derived from real-world logistics data.",
    tags: ["Optimization", "Benchmarks", "RL"],
    link: "#",
    pdf: "#"
  },
  {
    id: "p2",
    title: "Streaming Drilling Report Generation with Live Segmentation and Multimodal Text Generation",
    authors: ["Soumyadipta Sengupta*", "Yahia Salaheldin Shaaban*", "et al."],
    venue: "IEEE Big Data Conference 2025",
    year: 2025,
    abstract: "A novel framework for real-time generation of drilling reports using multimodal data streams, integrating live video segmentation with text generation capabilities.",
    tags: ["Multimodal", "Industry 4.0", "NLP"],
    link: "#",
    pdf: "#"
  },
  {
    id: "p3",
    title: "First-Place Solution to NeurIPS 2024 Invisible Watermark Removal Challenge",
    authors: ["Fahad Shamshad", "Tewodros Bakr", "Yahia Salaheldin Shaaban", "Noor Hazim Hussein", "et al."],
    venue: "ICLR 2025 Workshop on GenAI Watermarking",
    year: 2025,
    abstract: "Our winning approach utilized a combination of frequency domain analysis and adversarial perturbations to robustly remove invisible watermarks while maintaining image quality.",
    tags: ["Security", "GenAI", "Watermarking"],
    link: "#",
    pdf: "#"
  },
  {
    id: "p4",
    title: "LiveDrill: Multimodal Segment-Triggered Data-to-Text for Time Series Foundation Models",
    authors: ["Soumyadipta Sengupta*", "Amine El Khair*", "Yahia Salaheldin Shaaban*", "et al."],
    venue: "NeurIPS 2025 Workshop (Bert2S)",
    year: 2025,
    abstract: "Exploring the intersection of time-series data and language models to generate textual descriptions triggered by specific segmentation events in sensor data.",
    tags: ["Time Series", "Foundation Models"],
    link: "#",
    pdf: "#"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "pr1",
    title: "Systems Engineering Core",
    description: "Implemented core components from scratch in C++/Python: multi-threaded HTTP/2 server, mini-blockchain ledger, distributed file system, and custom graph algorithms.",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=800",
    techStack: ["C++", "Python", "Systems"],
    github: "#"
  },
  {
    id: "pr2",
    title: "Neuro-Symbolic Logic Solver",
    description: "Developed a transformer-based model to autoformalize natural language math problems into symbolic logic, integrating a Python-based theorem prover.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    techStack: ["Transformers", "Symbolic Logic", "Python"],
    github: "#"
  },
  {
    id: "pr3",
    title: "Distributed Zeroth-Order Optimization",
    description: "Designed a gradient-free optimization algorithm for black-box functions deployed on a Ray cluster (50+ nodes).",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    techStack: ["Ray", "Optimization", "Distributed Systems"],
    github: "#"
  },
  {
    id: "pr4",
    title: "Arabic Information Retrieval",
    description: "Built multi-granular text retrieval model for Arabic language; improved retrieval accuracy by 11% using hybrid dense-sparse vector search.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    techStack: ["NLP", "Retrieval", "Arabic"],
    github: "#"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "Breaking Down the NeurIPS Watermark Challenge",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    excerpt: "How we secured 1st place by attacking invisible watermarks in the frequency domain.",
    content: "...",
    tags: ["Security", "NeurIPS"]
  },
  {
    id: "b2",
    title: "Federated Learning: Personalization Schemes",
    date: "Nov 22, 2024",
    readTime: "8 min read",
    excerpt: "Insights from my Bachelor's thesis on secure multi-party computation.",
    content: "...",
    tags: ["Federated Learning", "Privacy"]
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600",
    caption: "M.I.A Robotics - Underwater ROV"
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=600",
    caption: "Pro Swimmer - National Competition"
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=600",
    caption: "NeurIPS 2025 Conference"
  }
];

export const FACTS = [
  "Did you know? Removing invisible watermarks often requires attacking the frequency domain of the image.",
  "Federated Learning allows training on decentralized data without moving it from the device.",
  "CLIP models can be significantly improved by mining 'hard negatives' from sensor data.",
  "Zeroth-order optimization doesn't require gradients, making it perfect for black-box systems."
];
