import { BlogPost, Profile, Project, Publication, Experience, Education, GalleryItem, RoomEncounter, Award, VisitedCountry, ServiceItem, NewsItem } from '../types';
import profileImage from '../assets/figures/profile_image.jpg';
import { quotes } from './quotes';

// Project images
import industslmImg from '../assets/projects/industslm_logo.gif';
import drimmImg from '../assets/projects/drimm.png';
import svrpPipelineImg from '../assets/projects/svrp_teaser.png';
import hyperkklImg from '../assets/projects/hyperkkl.png';
import watermarkImg from '../assets/projects/watermark_teaser.png';
import rlexploreImg from '../assets/projects/rlexplore.gif';
import fedsecaggImg from '../assets/projects/fedsecagg.svg';
import arabicColbertImg from '../assets/projects/arabic_colbert.png';

// Gallery images
import yannLeCunPhoto from '../assets/gallery/yann-lecun-iclr-rio.png';
import charlotteBunnePhoto from '../assets/gallery/charlotte-bunne-neurips-sandiego.png';
import lexFridmanPhoto from '../assets/gallery/lex-fridman-neurips-sandiego.png';
import jamesGatesPhoto from '../assets/gallery/sylvester-james-gates-mbzuai.png';
import careyBunksPhoto from '../assets/gallery/carey-bunks-eeml-bosnia.png';
import courvilleBengioPhoto from '../assets/gallery/aaron-courville-samy-bengio-eeml-bosnia.png';
import ivanVulicPhoto from '../assets/gallery/ivan-vulic-m2l-split-croatia.png';
import jessicaHamrickPhoto from '../assets/gallery/jessica-hamrick-m2l-split-croatia.png';
import nicholasLanePhoto from '../assets/gallery/nicholas-lane-iclr-rio.png';

// Blog markdown files (raw imports)
import linearAlgebraMd from '../blog/linear-algebra-fundamentals.md?raw';
import oilGasMd from '../blog/oil-gas-drilling-fundamentals.md?raw';

export const PROFILE: Profile = {
  name: "Yahia Salaheldin Shaaban",
  role: "M.Sc. in Machine Learning",
  institution: "Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)",
  email: "yahia.shaaban@mbzuai.ac.ae",
  bio: "A physicist, polymath, and part time linguist who found himself doing ML for a living. Driven by a never ending curiosity to understand the beauty and simplicity of this world; I love connecting ideas and meeting people. On the technical side, I work on mathematical modeling (recently foundation models for time series), domain adaptation, and careful inductive bias injection in deep learning models.",
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
    role: "AI Researcher",
    period: "May 2025 – Apr 2026",
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
    link: "https://github.com/yehias21/HyperKKL",
    bibtex: `@inproceedings{shaaban2026hyperkkl,
  title={HyperKKL: Enabling Non-Autonomous State Estimation through Dynamic Weight Conditioning},
  author={Shaaban, Yahia Salaheldin and Lahlou, Salem and Sayed, Abdelrahman Sayed},
  booktitle={ICLR 2026 Workshop on AI and PDE},
  year={2026}
}`
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
    tags: ["Multimodal", "Industry 4.0", "NLP"],
    bibtex: `@inproceedings{sengupta2025streaming,
  title={Streaming Drilling Report Generation with Live Segmentation and Multimodal Text Generation},
  author={Sengupta, Soumyadipta and Buiting, Sebastiaan and El Khair, Amine and Khaouja, Imane and Shaaban, Yahia Salaheldin and Benzine, Abdallah},
  booktitle={2025 IEEE International Conference on Big Data (BigData)},
  year={2025},
  organization={IEEE}
}`
  },
  {
    id: "livedrill",
    title: "LiveDrill: Multimodal Segment-Triggered Data-to-Text for Time Series Foundation Models",
    authors: ["Soumyadipta Sengupta*", "Amine El Khair*", "Sebastiaan Buiting*", "Imane Khaouja*", "Yahia Salaheldin Shaaban*", "Abdallah Benzine*"],
    venue: "NeurIPS 2025 Workshop (Bert2S)",
    year: 2025,
    abstract: "Segment-triggered data-to-text for time-series foundation models on industrial drilling data; soft-prompted LLM conditioned on projected sensor embeddings to generate DDR text.",
    tags: ["Time Series", "Foundation Models", "Multimodal"],
    bibtex: `@inproceedings{sengupta2025livedrill,
  title={LiveDrill: Multimodal Segment-Triggered Data-to-Text for Time Series Foundation Models},
  author={Sengupta, Soumyadipta and El Khair, Amine and Buiting, Sebastiaan and Khaouja, Imane and Shaaban, Yahia Salaheldin and Benzine, Abdallah},
  booktitle={NeurIPS 2025 Workshop on Breaking the Barriers of Time Series (Bert2S)},
  year={2025}
}`
  },
  {
    id: "llm-judge-drilling",
    title: "LLMs as Judges for Domain-Specific Text: Evidence from Drilling Reports",
    authors: ["Abdallah Benzine", "Soumyadipta Sengupta", "Sebastiaan Buiting", "Imane Khaouja", "Yahia Salaheldin Shaaban", "Amine El Khair"],
    venue: "NeurIPS 2025 Workshop (Evaluating the Evolving LLM Lifecycle)",
    year: 2025,
    abstract: "Systematic evaluation of LLM-as-judge protocols against human expert ratings for domain-specific DDR generation, comparing minimal, weighted multi-criteria, and externally-aggregated multi-criteria prompts across multiple judge scales.",
    tags: ["LLM Evaluation", "Drilling", "NLP"],
    bibtex: `@inproceedings{benzine2025llmjudges,
  title={LLMs as Judges for Domain-Specific Text: Evidence from Drilling Reports},
  author={Benzine, Abdallah and Sengupta, Soumyadipta and Buiting, Sebastiaan and Khaouja, Imane and Shaaban, Yahia Salaheldin and El Khair, Amine},
  booktitle={NeurIPS 2025 Workshop on Evaluating the Evolving LLM Lifecycle},
  year={2025}
}`
  },
  {
    id: "watermark-removal",
    title: "First-Place Solution to NeurIPS 2024 Invisible Watermark Removal Challenge",
    authors: ["Fahad Shamshad", "Tewodros Bakr", "Yahia Salaheldin Shaaban", "Noor Hazim Hussein", "Karthik Nandakumar", "Nils Lukas"],
    venue: "ICLR 2025 Workshop on GenAI Watermarking",
    year: 2025,
    abstract: "Winning approach combining frequency-domain analysis, adaptive VAE inversion of StegaStamp watermarks, and cluster-specific diffusion regeneration attacks. Ranked 1st in both tracks of the NeurIPS 2024 challenge.",
    tags: ["Security", "GenAI", "Watermarking"],
    link: "https://github.com/yehias21/watermark-analysis",
    bibtex: `@inproceedings{shamshad2025watermark,
  title={First-Place Solution to NeurIPS 2024 Invisible Watermark Removal Challenge},
  author={Shamshad, Fahad and Bakr, Tewodros and Shaaban, Yahia Salaheldin and Hussein, Noor Hazim and Nandakumar, Karthik and Lukas, Nils},
  booktitle={ICLR 2025 Workshop on GenAI Watermarking},
  year={2025}
}`
  }
];

// Projects listed in reverse-chronological order (most recent first).
export const PROJECTS: Project[] = [
  {
    id: "hyperkkl",
    title: "HyperKKL",
    description: "A hypernetwork reads the input signal and reshapes a neural observer on the fly, so it keeps tracking nonlinear systems even when they are driven by inputs. Published at ICLR 2026 Workshop on AI and PDE.",
    image: hyperkklImg,
    techStack: ["PyTorch", "Dynamical Systems", "Hypernetworks"],
    github: "https://github.com/yehias21/HyperKKL"
  },
  {
    id: "industslm",
    title: "IndusTSLM",
    description: "My master's thesis. Teaches a language model to read raw drilling sensor streams and write the operator's daily report. Three stages: contrastive alignment, soft-prompt generation, and a Flamingo-style cross-attention variant, all benchmarked on DrillBench.",
    image: industslmImg,
    techStack: ["PyTorch", "Time Series", "LLMs", "Multimodal"],
    github: "https://github.com/yehias21/IndusTSLM"
  },
  {
    id: "svrpbench",
    title: "SVRPBench",
    description: "A benchmark for stochastic vehicle routing that actually looks like a real city: 500+ instances with time-dependent traffic, random delays, and realistic delivery windows calibrated to real road networks. NeurIPS 2025 Datasets & Benchmarks.",
    image: svrpPipelineImg,
    techStack: ["Optimization", "Benchmarks", "RL", "OR"],
    github: "https://github.com/yehias21/svrpbench",
    link: "https://huggingface.co/datasets/Yahias21/vrp_benchmark",
    linkLabel: "Benchmark"
  },
  {
    id: "watermark-analysis",
    title: "Watermark Analysis",
    description: "First place at the NeurIPS 2024 Erasing the Invisible challenge. A toolkit of invisible watermark encoders, several removal attacks (including adaptive VAE and diffusion regeneration), and the metrics to score them.",
    image: watermarkImg,
    techStack: ["Diffusion", "Security", "Computer Vision"],
    github: "https://github.com/yehias21/watermark-analysis"
  },
  {
    id: "arabic-retrieval",
    title: "Arabic Dense Retrieval",
    description: "A ColBERT-style retriever for Arabic. Distilled from cross-lingual teachers, fine-tuned on large Arabic corpora, and evaluated on the standard Arabic IR benchmarks.",
    image: arabicColbertImg,
    techStack: ["NLP", "Retrieval", "Arabic", "ColBERT"]
  },
  {
    id: "rlexplore",
    title: "RLeXplore",
    description: "A clean playground for exploration strategies in reinforcement learning. Single config, plug-in registry, everything from ε-greedy to Noisy Nets and RND, running on MiniGrid.",
    image: rlexploreImg,
    techStack: ["PyTorch", "RL", "MiniGrid"],
    github: "https://github.com/yehias21/RLeXplore"
  },
  {
    id: "fedsecagg",
    title: "FedSecAgg",
    description: "Federated learning with secure aggregation, so the server sees only the sum of client updates. Built on Flower and PyTorch; datasets, models, and strategies are swappable without touching the training loop.",
    image: fedsecaggImg,
    techStack: ["Flower", "PyTorch", "Privacy", "SMPC"],
    github: "https://github.com/yehias21/FedRs"
  },
  {
    id: "undergrad-archive",
    title: "Undergraduate Archive",
    description: "A single repo that collects my bachelor coursework, with each project's full git history preserved: mini-blockchain, federated NCF, a multi-threaded web server, a Linux shell, page-replacement algorithms, SQL exercises, and more.",
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

// Top Academics gallery — photos with researchers and academics, rendered on
// the /gallery page.
//
// To add a photo:
//   1. Drop the image file into src/assets/gallery/.
//   2. Import it at the top of this file, e.g.:
//        import elonPhoto from '../assets/gallery/elon-musk.png';
//   3. Add an entry to the array below, e.g.:
//        { id: "cg1", src: elonPhoto, caption: "With Elon Musk — Dubai, 2025" }
//
// `src` can also be a direct image URL string instead of a local import.
// `id` just needs to be unique. `caption` is shown on hover and in the lightbox.
export const GALLERY: GalleryItem[] = [
  {
    id: "cg1",
    src: yannLeCunPhoto,
    caption: "With Yann LeCun at ICLR's AMI Lab event in Rio, Brazil"
  },
  {
    id: "cg2",
    src: charlotteBunnePhoto,
    caption: "With Charlotte Bunne at NeurIPS in San Diego"
  },
  {
    id: "cg3",
    src: lexFridmanPhoto,
    caption: "With Lex Fridman at NeurIPS in San Diego"
  },
  {
    id: "cg4",
    src: jamesGatesPhoto,
    caption: "With Sylvester James Gates at MBZUAI"
  },
  {
    id: "cg5",
    src: careyBunksPhoto,
    caption: "With Carey Bunks and friends Berra and Ertugrul at EEML in Bosnia"
  },
  {
    id: "cg6",
    src: courvilleBengioPhoto,
    caption: "With Aaron Courville and Samy Bengio at EEML in Bosnia"
  },
  {
    id: "cg7",
    src: ivanVulicPhoto,
    caption: "With Ivan Vulić at M2L in Split, Croatia"
  },
  {
    id: "cg8",
    src: jessicaHamrickPhoto,
    caption: "With Jessica Hamrick at M2L in Split, Croatia"
  },
  {
    id: "cg9",
    src: nicholasLanePhoto,
    caption: "With Nicholas Lane at ICLR in Rio, Brazil"
  },
];

// Notable figures shared a room/event with — rendered below the photo grid on
// the /gallery page. No photos, just the story.
export const ROOM_ENCOUNTERS: RoomEncounter[] = [
  {
    id: "re1",
    name: "Mohamed bin Zayed Al Nahyan",
    title: "President of the United Arab Emirates",
    note: "Visited our Convex Optimization class, taught by Samuel Horvath, during his tour of Masdar City."
  },
  {
    id: "re2",
    name: "Abdel Fattah el-Sisi",
    title: "President of Egypt",
    note: "Selected as a university ambassador for a lunch with him and President Mohamed bin Zayed."
  },
  {
    id: "re3",
    name: "Željko Komšić",
    title: "President of Bosnia and Herzegovina",
    note: "Gave the opening talk at the EEML summer school in Sarajevo."
  },
];

// Travel log. IDs are numeric ISO 3166-1 codes used by the world-atlas topojson.
// Color fades with exponential decay in months since lastVisit (permanent = always full).
export const VISITED_COUNTRIES: VisitedCountry[] = [
  {
    id: "818",
    name: "Egypt",
    permanent: true,
    note: "Home country",
    lastVisit: "2026-04",
    cities: [
      { name: "Cairo", lon: 31.2357, lat: 30.0444 },
      { name: "Alexandria", lon: 29.9187, lat: 31.2001 },
    ],
  },
  {
    id: "784",
    name: "United Arab Emirates",
    permanent: true,
    note: "Residence",
    lastVisit: "2026-04",
    cities: [
      { name: "Dubai", lon: 55.2708, lat: 25.2048 },
      { name: "Abu Dhabi", lon: 54.3773, lat: 24.4539 },
    ],
  },
  {
    id: "070",
    name: "Bosnia and Herzegovina",
    lastVisit: "2025-08",
    cities: [
      { name: "Mostar", lon: 17.8078, lat: 43.3438 },
      { name: "Sarajevo", lon: 18.4131, lat: 43.8563 },
    ],
  },
  {
    id: "191",
    name: "Croatia",
    lastVisit: "2025-09",
    cities: [
      { name: "Dubrovnik", lon: 18.0944, lat: 42.6507 },
      { name: "Split", lon: 16.4402, lat: 43.5081 },
    ],
  },
  {
    id: "792",
    name: "Turkey",
    lastVisit: "2025-09",
    cities: [
      { name: "Istanbul", lon: 28.9784, lat: 41.0082 },
    ],
  },
  {
    id: "840",
    name: "United States of America",
    lastVisit: "2025-12",
    cities: [
      { name: "San Diego", lon: -117.1611, lat: 32.7157 },
      { name: "New York", lon: -74.0060, lat: 40.7128 },
      { name: "Richmond (VA)", lon: -77.4360, lat: 37.5407 },
      { name: "Baltimore (MD)", lon: -76.6122, lat: 39.2904 },
    ],
  },
  {
    id: "076",
    name: "Brazil",
    lastVisit: "2026-04",
    cities: [
      { name: "Rio de Janeiro", lon: -43.1729, lat: -22.9068 },
    ],
  },
  {
    id: "380",
    name: "Italy",
    lastVisit: "2026-04",
    cities: [
      { name: "Rome", lon: 12.4964, lat: 41.9028 },
    ],
  },
];

export const SERVICE: ServiceItem[] = [
  {
    id: "s-icml-2026",
    role: "Workshop Reviewer",
    venue: "ICML 2026 Workshop",
    year: 2026
  },
  {
    id: "s-iclr-2026",
    role: "Workshop Reviewer",
    venue: "ICLR 2026 Workshop",
    year: 2026
  }
];

// Awards & honors. `link` points to the official competition / program page.
// Ordered most-recent first.
export const AWARDS: Award[] = [
  {
    id: "aw-mlss-2026",
    title: "MLSS 2026, Columbia University",
    description: "Full travel award to attend the Machine Learning Summer School in New York.",
    link: "https://cfe.columbia.edu/events/machine-learning-summer-school-2026"
  },
  {
    id: "aw-m2l-eeml-2025",
    title: "M2L 2025 | EEML 2025",
    description: "Awarded grants by Google DeepMind to attend the Mediterranean and Eastern European Machine Learning Summer Schools.",
    links: [
      { label: "M2L 2025", url: "https://www.m2lschool.org/" },
      { label: "EEML 2025", url: "https://www.eeml.eu/" }
    ]
  },
  {
    id: "aw-rotman-2025",
    title: "Rotman Trading Competition",
    description: "Top 10 in the Liquidity Case (2025).",
    link: "https://www.rotman.utoronto.ca/faculty-and-research/education-labs/bmo-financial-group-finance-research-and-trading-lab/rotman-international-trading-competition/"
  },
  {
    id: "aw-neurips-2024",
    title: "NeurIPS 2024 Competition",
    description: "Ranked 1st in both tracks of the \"Erasing the Invisible\" Watermark Removal Challenge.",
    link: "https://erasinginvisible.github.io/"
  },
  {
    id: "aw-insilico",
    title: "Insilico Hackathon",
    description: "Ranked 1st in the Drug Discovery challenge.",
    link: "https://insilico.com/ism-events/abu-dhabi/hackathon2024"
  },
  {
    id: "aw-hashcode-2022",
    title: "Google Hash Code 2022",
    description: "Top 5% worldwide.",
    link: "https://blog.google/technology/developers/hash-code-2022-returns-new-look/"
  },
  {
    id: "aw-mate-rov-2021",
    title: "MATE ROV / Microsoft Azure",
    description: "3rd worldwide (ROV); 1st Place (Azure ML); Best ML Team (2021).",
    link: "https://materovcompetition.org/"
  }
];

// Certificates & training programs. Reuses the Award shape.
export const CERTIFICATES: Award[] = [
  {
    id: "ct-mckinsey-forward",
    title: "McKinsey Forward Program",
    description: "Program focused on leadership, problem-solving, and business skills development."
  },
  {
    id: "ct-vt-hardware-ml-2022",
    title: "Virginia Tech Hardware Design for Machine Learning Summer Training 2022",
    description: "Developed an FPGA accelerator with a systolic array architecture for accelerating convolutional neural network inference."
  },
  {
    id: "ct-six-sigma-yellow",
    title: "Lean Six Sigma Yellow Belt",
    description: "Project on accelerating the research cycle."
  }
];

// Latest first. Use absolute dates so they stay interpretable over time.
export const NEWS: NewsItem[] = [
  {
    id: "n-reviewer-2026",
    date: "2026-05-01",
    title: "Reviewing for ICML 2026 and ICLR 2026 workshops",
    body: "Joined the program committees of an ICML 2026 workshop and an ICLR 2026 workshop as a reviewer.",
    tag: "Service"
  },
  {
    id: "n-iclr-pde-2026",
    date: "2026-04-20",
    title: "HyperKKL accepted at ICLR 2026 Workshop on AI and PDE",
    body: "Our work extending learning-based KKL observers to non-autonomous nonlinear systems was accepted at the ICLR 2026 Workshop on AI and PDE.",
    link: "https://github.com/yehias21/HyperKKL",
    linkLabel: "Code",
    tag: "Paper"
  },
  {
    id: "n-neurips-svrp-2025",
    date: "2025-12-10",
    title: "SVRPBench accepted at NeurIPS 2025 (Datasets & Benchmarks)",
    body: "A realistic benchmark for stochastic vehicle routing problems, calibrated against real city networks.",
    link: "https://github.com/yehias21/svrpbench",
    linkLabel: "Code",
    tag: "Paper"
  },
  {
    id: "n-bigdata-2025",
    date: "2025-11-15",
    title: "Streaming Drilling Report Generation accepted at IEEE Big Data 2025",
    body: "Paper on live segmentation + multimodal text generation for daily drilling reports.",
    tag: "Paper"
  },
  {
    id: "n-aiq-intern-2025",
    date: "2025-05-01",
    title: "Joined AIQ Intelligence as an AI researcher",
    body: "Working on time-series foundation models for oil-well drilling sensor data as part of my M.Sc. thesis.",
    tag: "Career"
  }
];

export const FACTS = [
  "Did you know? Removing invisible watermarks often requires attacking the frequency domain of the image.",
  "Federated learning allows training on decentralized data without moving it from the device.",
  "CLIP-style contrastive objectives can be sharpened by mining hard negatives from time-series data.",
  "KKL observers reconstruct state from output by mapping into a Hurwitz-stable latent space."
];
