import { BlogPost, Profile, Project, Publication, Experience, Education, GalleryItem } from '../types';
import profileImage from '../assets/figures/profile_image.jpg';
import { quotes } from './quotes';

// Project images
import industslmImg from '../assets/projects/industslm_logo.gif';
import drimmImg from '../assets/projects/drimm.png';
import svrpPipelineImg from '../assets/projects/svrp_pipeline.png';
import hyperkklImg from '../assets/projects/hyperkkl.png';
import watermarkImg from '../assets/projects/watermark_teaser.png';
import rlexploreImg from '../assets/projects/rlexplore.gif';
import fedsecaggImg from '../assets/projects/fedsecagg.svg';
import arabicColbertImg from '../assets/projects/arabic_colbert.png';

// Blog markdown files (raw imports)
import linearAlgebraMd from '../blog/linear-algebra-fundamentals.md?raw';
import oilGasMd from '../blog/oil-gas-drilling-fundamentals.md?raw';

export const PROFILE: Profile = {
  name: "Yahia Salaheldin Shaaban",
  role: "M.Sc. in Machine Learning",
  institution: "Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)",
  email: "yahia.shaaban@mbzuai.ac.ae",
  bio: "Machine learning researcher specializing in time-series foundation models, dynamical systems, and multimodal learning. I build end-to-end ML systems spanning sensor-level signal modeling to large-scale language model integration, with expertise in federated learning, model deployment, and benchmark construction for industrial applications. Ranked 1st in NeurIPS 2024 Watermark Removal Challenge.",
  image: profileImage,
  quotes,
  socials: {
    github: "https://github.com/yehias21/",
    linkedin: "https://www.linkedin.com/in/yehiasalah21/",
    scholar: "https://scholar.google.com/citations?user=wRtW0zMAAAAJ&hl=en",
  },
  meetingLink: "https://calendly.com/yahia-abudhabi/30min"
};

export const EDUCATION: Education[] = [
  {
    id: "e1",
    institution: "Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)",
    degree: "M.Sc. in Machine Learning (GPA: 3.83/4.0)",
    period: "Aug 2024 – May 2026",
    location: "Abu Dhabi, UAE",
    details: [
      "Thesis: IndusTSLM: integrating raw sensor signals as a native modality into pretrained LLMs for oil-well drilling data. Supervised by Dr. Salem Lahlou and Dr. Martin Takáč.",
      "Courses: Advanced Machine Learning, Probabilistic and Statistical Inference, Convex Optimization, Advanced NLP."
    ]
  },
  {
    id: "e2",
    institution: "Faculty of Engineering, Alexandria University",
    degree: "B.Sc. in Computer and Communication Engineering (Top 10%)",
    period: "Sept 2018 – Jul 2023",
    location: "Alexandria, Egypt",
    details: [
      "Thesis: Personalization scheme for federated learning with neural collaborative filtering and secure multi-party computation aggregation, integrated into the Flower library. Supervised by Dr. Ahmed Kosba."
    ]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: "ex1",
    company: "AIQ Intelligence",
    role: "Research Intern",
    period: "May 2025 – Present",
    location: "Abu Dhabi, UAE",
    description: [
      "Developing time-series large language models for oil-well drilling sensor data as part of my master's thesis.",
      "Multimodal alignment of sensor streams and natural language reports; LiveDrill streaming pipeline and Flamingo-style cross-attention variant."
    ]
  },
  {
    id: "ex2",
    company: "Applied Innovation Center (AIC-MCIT)",
    role: "Full-Time R&D Engineer",
    period: "Sept 2023 – Sept 2024",
    location: "Alexandria, Egypt",
    description: [
      "Remote sensing: multi-spectral crop-field segmentation, boosted IoU by ~42%. Built internal multi-source satellite benchmark and led annotation pipeline.",
      "Biomedical imaging: DICOM preprocessing pipeline and breast cancer segmentation deployed at Baheya Hospital.",
      "Model deployment: pruning / quantization reducing inference latency ~3×; serving with Ray, Slurm, Docker, TorchServe."
    ]
  },
  {
    id: "ex3",
    company: "Fatima Fellowship",
    role: "Predoctoral Research Fellow",
    period: "Jul 2023 – Sept 2024",
    location: "Remote",
    description: [
      "Extended learning-based KKL observers to non-autonomous nonlinear dynamical systems using low-rank meta-learning; ~9% improvement.",
      "Built Python framework for PINN experiments. Published at ICLR 2026 Workshop on AI and PDE."
    ]
  },
  {
    id: "ex4",
    company: "Flower Labs",
    role: "Summer of Reproducibility Contributor",
    period: "Jul 2023 – Oct 2023",
    location: "Remote: Cambridge University",
    description: [
      "Replicated FedPara (ICLR 2022) and integrated the implementation into the Flower federated learning framework."
    ]
  },
  {
    id: "ex5",
    company: "DELL Technologies",
    role: "Full-Time Software Engineer",
    period: "Sept 2022 – Aug 2023",
    location: "Cairo, Egypt",
    description: [
      "Built 10M-node citation graph from the S2AG dataset; temporal PageRank improved influential-paper identification by ~23%.",
      "Applied GNNs to NS3-simulated 5G networks (Lena dual-stripe) for latency-aware resource allocation."
    ]
  },
  {
    id: "ex6",
    company: "Incorta",
    role: "Machine Learning Intern",
    period: "Jul 2021 – Oct 2021",
    location: "Alexandria, Egypt",
    description: [
      "Aspect-based sentiment analysis on client data; raised classification F1 by ~24%."
    ]
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "hyperkkl",
    title: "HyperKKL: Enabling Non-Autonomous State Estimation through Dynamic Weight Conditioning",
    authors: ["Yahia Salaheldin Shaaban", "Salem Lahlou", "Abdelrahman Sayed Sayed"],
    venue: "ICLR 2026 Workshop on AI and PDE",
    year: 2026,
    abstract: "Extends learning-based KKL observers to controlled non-autonomous nonlinear systems via hypernetwork-based input conditioning, producing time-varying transformation maps that track the attractor geometry under forcing.",
    tags: ["Dynamical Systems", "Observers", "Hypernetworks"],
    link: "https://github.com/yehias21/HyperKKL"
  },
  {
    id: "svrpbench",
    title: "SVRPBench: A Realistic Benchmark for Stochastic Vehicle Routing Problem",
    authors: ["Ahmed Heakl*", "Yahia Salaheldin Shaaban*", "Salem Lahlou", "Martin Takáč", "Zangir Iklassov"],
    venue: "NeurIPS 2025 (Datasets and Benchmarks Track)",
    year: 2025,
    abstract: "A comprehensive benchmark suite for evaluating stochastic vehicle routing algorithms, introducing realistic urban constraints, travel-time variability, and operational uncertainty calibrated against real city networks.",
    tags: ["Optimization", "Benchmarks", "RL"],
    link: "https://github.com/yehias21/svrpbench",
    bibtex: `@inproceedings{heakl2025svrpbench,
  title={SVRPBench: A Realistic Benchmark for Stochastic Vehicle Routing Problem},
  author={Heakl, Ahmed and Shaaban, Yahia Salaheldin and Lahlou, Salem and Takáč, Martin and Iklassov, Zangir},
  booktitle={Advances in Neural Information Processing Systems},
  year={2025}
}`
  },
  {
    id: "streaming-drilling",
    title: "Streaming Drilling Report Generation with Live Segmentation and Multimodal Text Generation",
    authors: ["Soumyadipta Sengupta*", "Sebastiaan Buiting*", "Amine El Khair*", "Imane Khaouja", "Yahia Salaheldin Shaaban*", "Abdallah Benzine"],
    venue: "IEEE Big Data Conference 2025",
    year: 2025,
    abstract: "A streaming pipeline that couples real-time activity segmentation on drilling sensor streams with multimodal text generation to produce Daily Drilling Report entries at segment boundaries.",
    tags: ["Multimodal", "Industry 4.0", "NLP"]
  },
  {
    id: "livedrill",
    title: "LiveDrill: Multimodal Segment-Triggered Data-to-Text for Time Series Foundation Models",
    authors: ["Soumyadipta Sengupta*", "Amine El Khair*", "Sebastiaan Buiting*", "Imane Khaouja*", "Yahia Salaheldin Shaaban*", "Abdallah Benzine*"],
    venue: "NeurIPS 2025 Workshop (Bert2S)",
    year: 2025,
    abstract: "Segment-triggered data-to-text for time-series foundation models on industrial drilling data; soft-prompted LLM conditioned on projected sensor embeddings to generate DDR text.",
    tags: ["Time Series", "Foundation Models", "Multimodal"]
  },
  {
    id: "llm-judge-drilling",
    title: "LLMs as Judges for Domain-Specific Text: Evidence from Drilling Reports",
    authors: ["Abdallah Benzine", "Soumyadipta Sengupta", "Sebastiaan Buiting", "Imane Khaouja", "Yahia Salaheldin Shaaban", "Amine El Khair"],
    venue: "NeurIPS 2025 Workshop (Evaluating the Evolving LLM Lifecycle)",
    year: 2025,
    abstract: "Systematic evaluation of LLM-as-judge protocols against human expert ratings for domain-specific DDR generation, comparing minimal, weighted multi-criteria, and externally-aggregated multi-criteria prompts across multiple judge scales.",
    tags: ["LLM Evaluation", "Drilling", "NLP"]
  },
  {
    id: "watermark-removal",
    title: "First-Place Solution to NeurIPS 2024 Invisible Watermark Removal Challenge",
    authors: ["Fahad Shamshad", "Tewodros Bakr", "Yahia Salaheldin Shaaban", "Noor Hazim Hussein", "Karthik Nandakumar", "Nils Lukas"],
    venue: "ICLR 2025 Workshop on GenAI Watermarking",
    year: 2025,
    abstract: "Winning approach combining frequency-domain analysis, adaptive VAE inversion of StegaStamp watermarks, and cluster-specific diffusion regeneration attacks. Ranked 1st in both tracks of the NeurIPS 2024 challenge.",
    tags: ["Security", "GenAI", "Watermarking"],
    link: "https://github.com/yehias21/watermark-analysis"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "industslm",
    title: "IndusTSLM: Time-Series Language Models for Drilling",
    description: "Master's thesis. Multimodal alignment of 1 Hz industrial sensor streams and Daily Drilling Report text: DriMM (dual-encoder contrastive), LiveDrill (soft-prompt generation), and a Flamingo-style cross-attention variant. Includes DrillBench, a 7-task benchmark with a knowledge-decoupling framework.",
    image: industslmImg,
    techStack: ["PyTorch", "Time Series", "LLMs", "Multimodal"],
    github: "https://github.com/yehias21/IndusTSLM"
  },
  {
    id: "svrpbench",
    title: "SVRPBench: Stochastic Vehicle Routing Benchmark",
    description: "NeurIPS 2025 Datasets & Benchmarks. 500+ instances (10–1000 customers) for stochastic VRP with time-dependent travel delays, log-normal disruptions, and realistic time windows calibrated against real city road networks.",
    image: svrpPipelineImg,
    techStack: ["Optimization", "Benchmarks", "RL", "OR"],
    github: "https://github.com/yehias21/svrpbench",
    link: "https://huggingface.co/datasets/Yahias21/vrp_benchmark"
  },
  {
    id: "hyperkkl",
    title: "HyperKKL: Non-Autonomous Observer Learning",
    description: "ICLR 2026 Workshop on AI and PDE. Hypernetwork-conditioned KKL observers for controlled nonlinear systems. Two variants: input-dependent latent correction, and LoRA/full weight deltas generated from the input history. Collapses exactly to the autonomous observer when u ≡ 0.",
    image: hyperkklImg,
    techStack: ["PyTorch", "Dynamical Systems", "Hypernetworks"],
    github: "https://github.com/yehias21/HyperKKL"
  },
  {
    id: "watermark-analysis",
    title: "Watermark Analysis: NeurIPS 2024 1st Place",
    description: "First-place solution to the NeurIPS 2024 Erasing the Invisible Stress-Test Challenge. Encoders/decoders (RivaGAN, StegaStamp, DWT-DCT, Tree-Ring), removal attacks (distortion, diffusion regeneration, adaptive VAE, embedding-space PGD), and quality metrics.",
    image: watermarkImg,
    techStack: ["Diffusion", "Security", "Computer Vision"],
    github: "https://github.com/yehias21/watermark-analysis"
  },
  {
    id: "rlexplore",
    title: "RLeXplore: Exploration in RL",
    description: "Value-based, discrete-action RL on MiniGrid, organized around the taxonomy of Amin et al. (2021). SOLID plugin registry for strategies (ε-greedy, εz-greedy, NoisyNets, Bootstrapped DQN, count-based, RND) with a single declarative config and CLI.",
    image: rlexploreImg,
    techStack: ["PyTorch", "RL", "MiniGrid"],
    github: "https://github.com/yehias21/RLeXplore"
  },
  {
    id: "fedsecagg",
    title: "FedSecAgg: Federated Learning with Secure Aggregation",
    description: "Federated learning with secure aggregation on Flower + PyTorch. SOLID layout: swappable dataset providers, model factories, strategy decorators, and pluggable metric loggers. Default task: CIFAR-10 across many simulated clients with SecAgg primitives.",
    image: fedsecaggImg,
    techStack: ["Flower", "PyTorch", "Privacy", "SMPC"],
    github: "https://github.com/yehias21/FedRs"
  },
  {
    id: "arabic-retrieval",
    title: "Arabic Dense Retrieval",
    description: "ColBERT-based neural retrieval for Arabic, trained via knowledge distillation from cross-lingual teachers and fine-tuned on large-scale Arabic corpora. Competitive MRR and recall on standard Arabic IR benchmarks.",
    image: arabicColbertImg,
    techStack: ["NLP", "Retrieval", "Arabic", "ColBERT"],
    github: "https://github.com/yehias21/arabic-retrieval"
  },
  {
    id: "undergrad-archive",
    title: "Undergraduate Archive",
    description: "Consolidated archive of bachelor-era coursework imported as git subtrees (full commit history preserved): mini-blockchain, federated neural collaborative filtering, multi-threaded web server, Linux shell, Pthreads algorithms, page-replacement algorithms, SQL assignments, and more.",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #0f766e 55%, #134e4a 100%)",
    placeholderLabel: "Undergraduate Archive",
    techStack: ["C++", "Python", "Systems", "SQL"],
    github: "https://github.com/yehias21/Bachelor-Assignments"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "oil-gas-drilling-fundamentals",
    title: "Oil & Gas Drilling: From Bits to Bytes",
    date: "Mar 25, 2026",
    readTime: "18 min read",
    excerpt: "A field guide to drilling operations, sensors, and why this domain is such a rich testbed for time-series foundation models: drawn from my M.Sc. thesis on IndusTSLM with AIQ Intelligence.",
    content: oilGasMd,
    tags: ["Oil & Gas", "Time Series", "Multimodal", "Industry 4.0"]
  },
  {
    id: "linear-algebra-fundamentals",
    title: "Linear Algebra Fundamentals: A Deep Dive into Everyday Mathematics",
    date: "Jan 18, 2026",
    readTime: "25 min read",
    excerpt: "A comprehensive exploration of linear algebra concepts that power machine learning, from eigenvectors to SVD, with geometric intuitions and practical applications.",
    content: linearAlgebraMd,
    tags: ["Mathematics", "Linear Algebra", "Machine Learning"]
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600",
    caption: "M.I.A Robotics: Underwater ROV"
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=600",
    caption: "Pro Swimmer: National Competition"
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=600",
    caption: "NeurIPS 2025 Conference"
  }
];

export const FACTS = [
  "Did you know? Removing invisible watermarks often requires attacking the frequency domain of the image.",
  "Federated learning allows training on decentralized data without moving it from the device.",
  "CLIP-style contrastive objectives can be sharpened by mining hard negatives from time-series data.",
  "KKL observers reconstruct state from output by mapping into a Hurwitz-stable latent space."
];
