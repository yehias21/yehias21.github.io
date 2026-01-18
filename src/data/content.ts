import { BlogPost, Profile, Project, Publication, Experience, Education, GalleryItem } from '../types';
import profileImage from '../assets/figures/profile_image.jpg';
import { quotes } from './quotes';
export const PROFILE: Profile = {
  name: "Yahia Salaheldin Shaaban",
  role: "M.Sc. in Machine Learning",
  institution: "Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)",
  email: "yahia.shaaban@mbzuai.ac.ae",
  bio: "I am a researcher specializing in Time Series, Large Language Models, and Reasoning. My work bridges the gap between foundation models and complex, structured modalities like sensors and oil-well drilling data. Ranked 1st in NeurIPS 2024 Watermark Removal Challenge.",
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
    link: "https://github.com/example/svrpbench",
    pdf: "https://arxiv.org/abs/example",
    bibtex: `@inproceedings{heakl2025svrpbench,
  title={SVRPBench: A Realistic Benchmark for Stochastic Vehicle Routing Problem},
  author={Heakl, Ahmed and Shaaban, Yahia Salaheldin and Lahlou, Salem and Takáč, Martin and Iklassov, Zangir},
  booktitle={Advances in Neural Information Processing Systems},
  year={2025}
}`,
    comment: "Spotlight (2.6%)"
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
    github: "https://github.com/yehias21/systems-core"
  },
  {
    id: "pr2",
    title: "Neuro-Symbolic Logic Solver",
    description: "Developed a transformer-based model to autoformalize natural language math problems into symbolic logic, integrating a Python-based theorem prover.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    techStack: ["Transformers", "Symbolic Logic", "Python"],
    github: "https://github.com/yehias21/neuro-symbolic-solver"
  },
  {
    id: "pr3",
    title: "Distributed Zeroth-Order Optimization",
    description: "Designed a gradient-free optimization algorithm for black-box functions deployed on a Ray cluster (50+ nodes).",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    techStack: ["Ray", "Optimization", "Distributed Systems"],
    github: "https://github.com/yehias21/distributed-optimization"
  },
  {
    id: "pr4",
    title: "Arabic Information Retrieval",
    description: "Built multi-granular text retrieval model for Arabic language; improved retrieval accuracy by 11% using hybrid dense-sparse vector search.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    techStack: ["NLP", "Retrieval", "Arabic"],
    github: "https://github.com/yehias21/arabic-retrieval"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "linear-algebra-fundamentals",
    title: "Linear Algebra Fundamentals: A Deep Dive into Everyday Mathematics",
    date: "Jan 18, 2026",
    readTime: "25 min read",
    excerpt: "A comprehensive exploration of linear algebra concepts that power machine learning, from eigenvectors to SVD, with geometric intuitions and practical applications.",
    content: `# Linear Algebra Fundamentals: A Deep Dive into Everyday Mathematics

This is a comprehensive set of linear algebra fundamentals - these form the backbone of so much in ML. Let me rebuild these concepts for you with clear explanations and geometric intuition.

---

## 1. Eigenvectors and Eigenvalues: Geometric Interpretation & PCA

**The core idea:** When you apply a matrix $A$ to most vectors, they change both direction and magnitude. But *eigenvectors* are special - they only get scaled (stretched or compressed), not rotated.

$$A\\mathbf{v} = \\lambda \\mathbf{v}$$

- $\\mathbf{v}$ is the eigenvector (the direction that stays fixed)
- $\\lambda$ is the eigenvalue (the scaling factor)

**Geometric picture:** Imagine $A$ as a transformation. The eigenvectors are the "principal axes" of that transformation - the directions along which the transformation acts most simply (pure scaling).

**Why crucial for PCA?**

PCA finds the directions of maximum variance in your data. The covariance matrix $\\Sigma$ encodes how your data spreads. Its eigenvectors point in the directions of maximum spread, and the eigenvalues tell you *how much* variance exists along each direction.

- Eigenvector with largest $\\lambda$ → first principal component (direction of most variance)
- You project data onto top-$k$ eigenvectors to reduce dimensionality while preserving the most information

---

## 2. SVD vs Eigendecomposition

**Eigendecomposition** (only for square matrices):
$$A = V \\Lambda V^{-1}$$
where $V$ contains eigenvectors as columns, $\\Lambda$ is diagonal with eigenvalues.

**SVD** (works for *any* matrix, even rectangular $m \\times n$):
$$A = U \\Sigma V^T$$

- $U$: $m \\times m$ orthonormal matrix (left singular vectors)
- $\\Sigma$: $m \\times n$ diagonal matrix (singular values $\\sigma_i \\geq 0$)
- $V$: $n \\times n$ orthonormal matrix (right singular vectors)

**Key differences:**

| Aspect | Eigendecomposition | SVD |
|--------|-------------------|-----|
| Matrix shape | Square only | Any shape |
| Always exists? | No (needs $n$ independent eigenvectors) | Always exists |
| Values | Can be negative/complex | Singular values always $\\geq 0$ |

**Connection:** For symmetric positive semi-definite matrices, eigenvalues = singular values and eigenvectors = singular vectors.

**When to use each:**
- **SVD:** Low-rank approximation, pseudoinverse, recommender systems, solving least squares, numerical stability
- **Eigendecomposition:** PCA on covariance matrices, analyzing dynamics (Markov chains, differential equations), spectral graph theory

---

## 3. Rank, Null Space, and Column Space

**Rank:** The number of linearly independent columns (or rows) of a matrix. Equivalently, the dimension of the column space.

**Column space** $\\text{Col}(A)$: All possible outputs $A\\mathbf{x}$ - the "reachable" vectors.

**Null space** $\\text{Null}(A)$: All vectors $\\mathbf{x}$ such that $A\\mathbf{x} = \\mathbf{0}$ - inputs that get "killed."

**The rank-nullity theorem:**
$$\\text{rank}(A) + \\dim(\\text{Null}(A)) = n$$
where $n$ is the number of columns.

**Intuition:** If your matrix is $m \\times n$, you're mapping from $\\mathbb{R}^n$ to $\\mathbb{R}^m$. The null space represents the "dimensions you lose" in this mapping, and the rank represents "dimensions you keep."

---

## 4. Positive Semi-Definite (PSD) Matrices

**Definition:** A symmetric matrix $A$ is PSD if for all vectors $\\mathbf{x}$:
$$\\mathbf{x}^T A \\mathbf{x} \\geq 0$$

**Equivalent characterizations:**
- All eigenvalues $\\geq 0$
- $A = B^T B$ for some matrix $B$
- All principal minors $\\geq 0$

**Why covariance matrices are always PSD:**

The covariance matrix is $\\Sigma = \\mathbb{E}[(X - \\mu)(X - \\mu)^T]$.

For any vector $\\mathbf{a}$:
$$\\mathbf{a}^T \\Sigma \\mathbf{a} = \\mathbb{E}[\\mathbf{a}^T(X-\\mu)(X-\\mu)^T\\mathbf{a}] = \\mathbb{E}[(\\mathbf{a}^T(X-\\mu))^2] \\geq 0$$

This is the variance of the projection onto direction $\\mathbf{a}$, which is always non-negative. You can't have negative variance!

---

## 5. Condition Number

**Definition:**
$$\\kappa(A) = \\|A\\| \\cdot \\|A^{-1}\\| = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}}$$

(ratio of largest to smallest singular value)

**Meaning:** It measures how sensitive the solution of $A\\mathbf{x} = \\mathbf{b}$ is to perturbations in $A$ or $\\mathbf{b}$.

- $\\kappa \\approx 1$: Well-conditioned, stable
- $\\kappa \\gg 1$: Ill-conditioned, small errors get amplified

**In optimization:** When minimizing $f(\\mathbf{x}) = \\frac{1}{2}\\mathbf{x}^T A \\mathbf{x} - \\mathbf{b}^T\\mathbf{x}$, the condition number of $A$ determines how "elongated" the level sets are. High $\\kappa$ means gradient descent oscillates and converges slowly. This is why preconditioning matters!

---

## 6. Linear Least Squares Derivation

**Problem:** Find $\\mathbf{x}$ minimizing $\\|A\\mathbf{x} - \\mathbf{b}\\|^2$ when $A\\mathbf{x} = \\mathbf{b}$ has no exact solution.

**Derivation:**

Let $f(\\mathbf{x}) = \\|A\\mathbf{x} - \\mathbf{b}\\|^2 = (A\\mathbf{x} - \\mathbf{b})^T(A\\mathbf{x} - \\mathbf{b})$

Expanding:
$$f(\\mathbf{x}) = \\mathbf{x}^T A^T A \\mathbf{x} - 2\\mathbf{b}^T A \\mathbf{x} + \\mathbf{b}^T \\mathbf{b}$$

Taking gradient and setting to zero:
$$\\nabla f = 2A^T A \\mathbf{x} - 2A^T \\mathbf{b} = 0$$

This gives the **normal equations:**
$$A^T A \\mathbf{x} = A^T \\mathbf{b}$$

**Geometric interpretation:** The residual $(\\mathbf{b} - A\\mathbf{x})$ must be orthogonal to the column space of $A$. That's exactly what $A^T(\\mathbf{b} - A\\mathbf{x}) = 0$ says.

---

## 7. Moore-Penrose Pseudoinverse

**Definition:** For any matrix $A$, the pseudoinverse $A^+$ satisfies:
1. $AA^+A = A$
2. $A^+AA^+ = A^+$
3. $(AA^+)^T = AA^+$
4. $(A^+A)^T = A^+A$

**Via SVD:** If $A = U\\Sigma V^T$, then $A^+ = V\\Sigma^+ U^T$ where $\\Sigma^+$ inverts non-zero singular values.

**When you need it:**
- When $A$ is not invertible (rectangular or rank-deficient)
- Solving least squares: $\\mathbf{x} = A^+ \\mathbf{b}$ gives the minimum-norm solution
- When $A^T A$ is singular, you can't use normal equations directly

**Key property:** $A^+ \\mathbf{b}$ gives:
- The exact solution if one exists
- The least-squares solution otherwise
- Among all least-squares solutions, the one with smallest $\\|\\mathbf{x}\\|$

---

## 8. Orthogonal Matrices and Rotations

**Orthogonal matrix:** $Q^T Q = Q Q^T = I$, equivalently $Q^{-1} = Q^T$.

**Properties:**
- Columns (and rows) form an orthonormal basis
- Preserves lengths: $\\|Q\\mathbf{x}\\| = \\|\\mathbf{x}\\|$
- Preserves angles: $(Q\\mathbf{x})^T(Q\\mathbf{y}) = \\mathbf{x}^T\\mathbf{y}$
- $\\det(Q) = \\pm 1$

**Relationship to rotations:**
- $\\det(Q) = +1$: pure rotation
- $\\det(Q) = -1$: rotation + reflection

**Why important in neural networks:**
1. **Gradient stability:** Orthogonal weight matrices have condition number 1, preventing vanishing/exploding gradients in RNNs
2. **Preserves information:** No dimension collapse or expansion
3. **Efficient inversion:** $W^{-1} = W^T$ is free
4. **Used in:** Orthogonal initialization, unitary RNNs, normalizing flows

---

## 9. Trace and the Proof that Tr(AB) = Tr(BA)

**Trace:** Sum of diagonal elements: $\\text{Tr}(A) = \\sum_i A_{ii}$

**Also:** $\\text{Tr}(A) = \\sum_i \\lambda_i$ (sum of eigenvalues)

**Proof that $\\text{Tr}(AB) = \\text{Tr}(BA)$:**

$$\\text{Tr}(AB) = \\sum_i (AB)_{ii} = \\sum_i \\sum_j A_{ij} B_{ji}$$

$$\\text{Tr}(BA) = \\sum_i (BA)_{ii} = \\sum_i \\sum_j B_{ij} A_{ji} = \\sum_j \\sum_i A_{ji} B_{ij}$$

Relabeling indices $i \\leftrightarrow j$ in the second expression gives the same double sum. ∎

**Useful consequence:** $\\text{Tr}(ABC) = \\text{Tr}(CAB) = \\text{Tr}(BCA)$ (cyclic permutation)

---

## 10. Gradient of Quadratic Form

**Result:**
$$\\nabla_{\\mathbf{x}} (\\mathbf{x}^T A \\mathbf{x}) = (A + A^T)\\mathbf{x}$$

If $A$ is symmetric: $\\nabla_{\\mathbf{x}} (\\mathbf{x}^T A \\mathbf{x}) = 2A\\mathbf{x}$

**Derivation (index notation):**

$$f = \\mathbf{x}^T A \\mathbf{x} = \\sum_{i,j} x_i A_{ij} x_j$$

$$\\frac{\\partial f}{\\partial x_k} = \\sum_j A_{kj} x_j + \\sum_i x_i A_{ik} = (A\\mathbf{x})_k + (A^T\\mathbf{x})_k$$

So $\\nabla f = A\\mathbf{x} + A^T\\mathbf{x} = (A + A^T)\\mathbf{x}$.

---

## 11. Spectral Theorem

**Statement:** Every real symmetric matrix $A$ can be diagonalized by an orthogonal matrix:
$$A = Q \\Lambda Q^T$$
where $Q$ is orthogonal (columns are orthonormal eigenvectors) and $\\Lambda$ is diagonal (real eigenvalues).

**What it tells us:**
1. Symmetric matrices always have **real eigenvalues**
2. Eigenvectors corresponding to distinct eigenvalues are **orthogonal**
3. There's always a full set of $n$ orthonormal eigenvectors
4. $A = \\sum_i \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T$ (outer product decomposition)

**Why it matters:** This is the theoretical foundation for PCA, spectral clustering, and understanding quadratic forms.

---

## 12. Frobenius Norm and SVD

**Definition:**
$$\\|A\\|_F = \\sqrt{\\sum_{i,j} |A_{ij}|^2} = \\sqrt{\\text{Tr}(A^T A)}$$

**Connection to SVD:** If $A = U\\Sigma V^T$, then:
$$\\|A\\|_F = \\sqrt{\\sum_i \\sigma_i^2}$$

The Frobenius norm is the $\\ell_2$ norm of the singular values.

**Why useful:**
- Low-rank approximation: truncated SVD minimizes Frobenius error (Eckart-Young theorem)
- Matrix regularization: $\\|W\\|_F^2$ penalizes large weights
- Comparing matrices

---

## 13. Matrix Factorization & NMF for Recommender Systems

**Setup:** You have a user-item rating matrix $R$ (sparse, with missing entries).

**Goal:** Factor $R \\approx WH$ where:
- $W$: user × latent factors (user preferences)
- $H$: latent factors × items (item characteristics)

**NMF (Non-negative Matrix Factorization):** Adds constraint $W, H \\geq 0$.

**Why non-negativity?**
- Interpretability: factors represent "topics" or "genres"
- Additive parts-based representation
- Natural for ratings (no negative preferences)

**Objective:**
$$\\min_{W, H \\geq 0} \\|R - WH\\|_F^2$$

Often solved via multiplicative update rules or projected gradient descent.

---

## 14. Determinant: Geometric Interpretation

**Definition:** For $2\\times 2$: $\\det\\begin{pmatrix}a & b \\\\ c & d\\end{pmatrix} = ad - bc$

**Geometric meaning:** The determinant measures the **signed volume scaling factor** of the transformation.

- $|\\det(A)| = $ factor by which volumes are scaled
- $\\det(A) > 0$: orientation preserved
- $\\det(A) < 0$: orientation flipped
- $\\det(A) = 0$: collapses dimension (maps to lower-dimensional space)

**When $\\det(A) = 0$:**
- Matrix is **singular** (not invertible)
- Columns are linearly dependent
- Null space is non-trivial
- At least one eigenvalue is 0
- The transformation "flattens" space

---

## 15. Change of Basis & Similarity Transformations

**The idea:** A linear transformation $T$ can be represented by different matrices depending on your choice of basis.

If $A$ represents $T$ in the standard basis, and $P$ is a change-of-basis matrix (columns are new basis vectors), then:
$$B = P^{-1} A P$$

represents the **same transformation** $T$ in the new basis.

**$A$ and $B$ are called *similar*.**

**What stays the same (similarity invariants):**
- Eigenvalues
- Determinant
- Trace
- Rank
- Characteristic polynomial

**What changes:** The actual matrix entries (how the transformation "looks").

**Why this matters:**
- **Diagonalization:** Choose eigenvector basis → matrix becomes diagonal → powers/exponentials become trivial
- **Jordan form:** Canonical representation for any matrix
- **Neural networks:** Different parameterizations of the same function

---

## Quick Reference Card

| Concept | Key Formula | When You Need It |
|---------|-------------|------------------|
| Eigendecomposition | $A = V\\Lambda V^{-1}$ | PCA, dynamics |
| SVD | $A = U\\Sigma V^T$ | Low-rank, pseudoinverse |
| Normal equations | $A^T A \\mathbf{x} = A^T \\mathbf{b}$ | Least squares |
| Pseudoinverse via SVD | $A^+ = V\\Sigma^+ U^T$ | Rank-deficient systems |
| Quadratic gradient | $\\nabla(\\mathbf{x}^T A \\mathbf{x}) = 2A\\mathbf{x}$ | Optimization |
| Spectral theorem | $A = Q\\Lambda Q^T$ | Symmetric matrices |
| Condition number | $\\kappa = \\sigma_{\\max}/\\sigma_{\\min}$ | Numerical stability |

---

## Conclusion

These linear algebra concepts form the mathematical backbone of machine learning, optimization, and data science. Understanding the geometric intuition behind eigenvectors, SVD, and matrix decompositions provides deep insights into why algorithms work the way they do.

Whether you're implementing PCA, solving least squares problems, or debugging gradient descent convergence issues, these fundamentals will guide your intuition and help you make better design decisions.`,
    tags: ["Mathematics", "Linear Algebra", "Machine Learning"]
  },
  {
    id: "oil-gas-drilling-fundamentals",
    title: "Oil & Gas Drilling: From Bits to Bytes",
    date: "Jan 18, 2026",
    readTime: "30 min read",
    excerpt: "A comprehensive guide to drilling operations, sensors, and the data science challenges in the oil and gas industry.",
    content: `# Oil & Gas Drilling: From Bits to Bytes

Oil and gas drilling is one of the most complex industrial operations in the world, combining mechanical engineering, geology, and increasingly, data science. This post provides a comprehensive introduction to drilling operations, key terminology, sensors, and the exciting data science challenges in this domain.

---

## What is Oil and Gas Drilling?

Oil and gas drilling is the process of creating a borehole (wellbore) that penetrates underground rock formations to access hydrocarbon reservoirs. The goal is to extract oil and natural gas from deep beneath the Earth's surface—sometimes several kilometers down.

### Types of Drilling

1. **Exploration Drilling (Wildcat Wells)**: Drilling in unproven areas to discover new reserves
2. **Development Drilling**: Drilling additional wells in proven fields to maximize extraction
3. **Directional Drilling**: Drilling at angles to reach reserves not directly below the rig
4. **Horizontal Drilling**: Drilling horizontally through the reservoir to maximize contact area

---

## The Drilling Process: From Surface to Target

### Phase 1: Planning and Site Preparation

Before any drilling begins, extensive geological surveys, seismic analysis, and environmental assessments are conducted. The drilling team develops a detailed **well plan** that specifies:

- Target depth and trajectory
- Casing and cementing design
- Mud weight and composition
- Expected geological formations
- Safety procedures and contingencies

### Phase 2: Rig Setup

The drilling rig is assembled on-site. A typical rig includes:

- **Derrick/Mast**: The tall tower structure that supports the drill string
- **Drawworks**: The hoisting system for raising and lowering drill pipe
- **Rotary Table or Top Drive**: Provides rotational force to the drill string
- **Mud Pumps**: Circulate drilling fluid down the well
- **Blowout Preventer (BOP)**: Critical safety device to control well pressure

### Phase 3: Drilling Operations

The actual drilling process involves several stages:

#### 3.1 Spud In
The initial penetration of the drill bit into the ground. This is ceremonial but marks the official start of drilling.

#### 3.2 Drilling Ahead
The drill bit grinds through rock formations. Key parameters monitored include:

- **Rate of Penetration (ROP)**: How fast the bit advances (feet/hour or meters/hour)
- **Weight on Bit (WOB)**: Downward force applied to the bit
- **Rotary Speed (RPM)**: Rotation rate of the drill string
- **Torque**: Resistance encountered while drilling
- **Standpipe Pressure (SPP)**: Pressure of mud being pumped into the well

#### 3.3 Tripping
Periodically, the drill string must be pulled out ("trip out") to:
- Replace worn drill bits
- Run casing
- Perform logging operations
- Address downhole issues

After completing the task, the string is run back in ("trip in").

#### 3.4 Casing and Cementing
As drilling progresses, steel casing is installed and cemented in place to:
- Prevent wellbore collapse
- Isolate different geological zones
- Provide pressure control
- Protect groundwater aquifers

Multiple casing strings are typically used:
1. **Conductor Casing**: Largest diameter, shallowest
2. **Surface Casing**: Protects shallow freshwater zones
3. **Intermediate Casing**: Provides stability through problematic formations
4. **Production Casing**: Runs to or near the reservoir

#### 3.5 Reaching Total Depth (TD)
When the target depth is reached, the well is prepared for completion or further evaluation.

### Phase 4: Well Completion

Once drilling is complete, the well is "completed"—prepared for production. This involves:
- Installing production tubing
- Perforating the casing to allow hydrocarbons to enter
- Installing downhole equipment (packers, safety valves)
- Conducting well testing

---

## Basic Operation Codes (Activity Codes)

Drilling operations are categorized into standardized activity codes that help track time and efficiency. Common codes include:

### Productive Time
- **Drilling (DR)**: Actively advancing the hole
- **Reaming (RM)**: Enlarging or smoothing the wellbore
- **Circulating (CIR)**: Circulating mud without rotating (cleaning hole, conditioning mud)
- **Tripping In (TI)**: Running drill string into the hole
- **Tripping Out (TO)**: Pulling drill string out of the hole

### Non-Productive Time (NPT)
- **Stuck Pipe (SP)**: Drill string is immobilized
- **Lost Circulation (LC)**: Drilling fluid escaping into formation
- **Well Control (WC)**: Managing unexpected pressure influx (kick)
- **Equipment Failure (EF)**: Mechanical or electrical failures
- **Weather Downtime (WD)**: Operations suspended due to weather

### Other Operations
- **Casing Running (CR)**: Installing casing strings
- **Cementing (CM)**: Pumping cement
- **Logging (LG)**: Running wireline tools to evaluate formations
- **BOP Testing (BT)**: Testing blowout preventer
- **Rig Maintenance (RM)**: Scheduled or unscheduled maintenance

### Invisible Time (IT)
Small delays and inefficiencies that add up:
- Rig repairs
- Connection time
- Waiting on equipment or instructions

Optimizing these activities is a major focus of drilling efficiency improvements.

---

## Key Drilling Terminology

### Geological Terms
- **Formation**: A body of rock with distinct characteristics
- **Pay Zone**: The reservoir formation containing hydrocarbons
- **Caprock**: Impermeable layer trapping hydrocarbons below
- **Pore Pressure**: Pressure of fluids within rock pores
- **Fracture Pressure**: Pressure at which formation will crack

### Drilling Fluid (Mud) Terms
- **Mud Weight**: Density of drilling fluid, critical for pressure control
- **Viscosity**: Resistance to flow, affects hole cleaning
- **Gel Strength**: Ability to suspend cuttings when circulation stops
- **Filtrate**: Liquid portion of mud that seeps into formation
- **Oil-Based Mud (OBM)**: Mud with oil as the continuous phase
- **Water-Based Mud (WBM)**: Mud with water as the continuous phase

### Drill String Components
- **Drill Bit**: Cutting tool at the bottom
- **Drill Collar**: Heavy thick-walled pipe providing WOB
- **Drill Pipe**: Connects surface to bottom, transmits rotation
- **Bottom Hole Assembly (BHA)**: Lower portion of drill string including bit, collars, stabilizers, and measurement tools

### Measurement Terms
- **Measured Depth (MD)**: Total length of wellbore
- **True Vertical Depth (TVD)**: Vertical distance from surface to point in well
- **Dogleg Severity (DLS)**: Rate of change in wellbore direction
- **Inclination**: Angle from vertical
- **Azimuth**: Compass direction of the wellbore

---

## 8 Main Oil Rig Sensors

Modern drilling rigs are equipped with numerous sensors that continuously monitor operations. Here are the 8 most critical sensor types:

### 1. **Hook Load Sensor**
- **What it measures**: Total weight suspended from the hook
- **Why it matters**: Indicates weight on bit, detects stuck pipe, monitors overpull during tripping
- **Typical range**: 0 - 1,000,000+ lbs (depends on rig capacity)
- **Data science applications**: Anomaly detection for stuck pipe prediction, ROP optimization

### 2. **Standpipe Pressure (SPP) Sensor**
- **What it measures**: Pressure of drilling fluid at the standpipe (inlet to drill string)
- **Why it matters**: Indicates circulation efficiency, detects downhole restrictions or washouts
- **Typical range**: 0 - 5,000+ psi
- **Data science applications**: Washout detection, hydraulics optimization, real-time formation pressure estimation

### 3. **Rate of Penetration (ROP) Sensor**
- **What it measures**: Speed at which the bit advances through formation
- **Why it matters**: Primary indicator of drilling efficiency and formation characteristics
- **Typical range**: 0 - 300+ ft/hr (highly variable)
- **Data science applications**: Formation identification, drilling optimization, bit wear prediction

### 4. **Rotary Speed (RPM) Sensor**
- **What it measures**: Rotation rate of the drill string
- **Why it matters**: Controls drilling mechanics, affects bit performance and hole quality
- **Typical range**: 0 - 300 RPM (higher for downhole motors)
- **Data science applications**: Drilling dynamics analysis, stick-slip detection, optimal parameter selection

### 5. **Torque Sensor**
- **What it measures**: Rotational resistance of the drill string
- **Why it matters**: Indicates formation hardness, hole conditions, potential for stuck pipe
- **Typical range**: 0 - 50,000+ ft-lbs
- **Data science applications**: Formation hardness prediction, stuck pipe risk assessment, bit wear monitoring

### 6. **Weight on Bit (WOB) Sensor**
- **What it measures**: Downward force applied to the drill bit (calculated from hook load)
- **Why it matters**: Critical parameter for ROP and bit longevity
- **Typical range**: 0 - 80,000+ lbs
- **Data science applications**: ROP optimization models, bit performance analysis, real-time drilling parameter adjustment

### 7. **Flow Rate Sensors (Mud In/Out)**
- **What it measures**:
  - **Flow In**: Volume of mud pumped into well
  - **Flow Out**: Volume of mud returning from well
- **Why it matters**: Difference indicates fluid loss or influx (kick detection)
- **Typical range**: 0 - 1,500+ gallons per minute (GPM)
- **Data science applications**: Early kick detection, lost circulation prediction, automated well control

### 8. **Gamma Ray Sensor (LWD - Logging While Drilling)**
- **What it measures**: Natural radioactivity of rock formations
- **Why it matters**: Primary tool for identifying rock types and correlating to geological models
- **Typical range**: 0 - 200+ API units
- **Data science applications**: Real-time formation identification, geosteering, automated stratigraphic correlation

### Additional Important Sensors

While the above are the core 8, modern rigs also include:

- **Mud Temperature In/Out**: Detects downhole temperature anomalies
- **Mud Weight In/Out**: Monitors mud properties
- **Gas Sensors**: Detect hydrocarbons in mud returns (early kick indication)
- **Vibration Sensors**: Monitor drilling dynamics (stick-slip, whirl, vibration)
- **Position Sensors**: Track block position for depth measurement

All these sensors generate time-series data sampled at frequencies from 1 Hz to 100+ Hz, creating massive datasets ripe for machine learning applications.

---

## Daily Drilling Report (DDR)

The Daily Drilling Report is a comprehensive document that summarizes all activities, progress, and issues from a 24-hour period. It serves as the official record of drilling operations.

### Key Sections of a DDR

#### 1. **Header Information**
- Well name and location
- Rig name and contractor
- Report date and time period (usually 06:00 to 06:00)
- Weather conditions
- Current depth (MD and TVD)

#### 2. **Summary Statistics**
- **Footage drilled**: Total depth gained
- **ROP average**: Average drilling rate
- **Time breakdown**:
  - Productive time (drilling, tripping, etc.)
  - Non-productive time (NPT)
  - Invisible time
- **Cumulative days**: Total days since spud

#### 3. **Operations Narrative**
A chronological description of all activities:

Example:
\`\`\`
06:00-08:30: POOH with BHA from 12,450 ft to surface. Average trip speed 180 ft/hr.
08:30-10:15: Rig maintenance - replaced rotary hose.
10:15-12:45: RIH with new 8.5" bit to 12,450 ft.
12:45-18:00: Drilling ahead from 12,450 ft to 12,687 ft. Average ROP 47 ft/hr.
18:00-20:30: Circulating and conditioning mud. Lost circulation observed, pumped 15 bbls LCM.
20:30-06:00: Drilling ahead from 12,687 ft to 12,891 ft. Average ROP 22 ft/hr (slow drilling in shale section).
\`\`\`

#### 4. **Mud Properties**
- Mud weight in/out
- Viscosity
- pH
- Solid content
- Additives used

#### 5. **Personnel On Board (POB)**
- List of all personnel on location

#### 6. **Safety and Environmental**
- Safety meetings held
- Incidents or near-misses
- Environmental observations
- H2S readings (if applicable)

#### 7. **BHA and Bit Record**
- Current BHA configuration
- Bit type, size, serial number
- Hours on bit, total footage drilled with bit

#### 8. **Future Operations**
- Plan for next 24 hours
- Expected challenges
- Required materials or services

### Why DDRs Matter for Data Science

DDRs are semi-structured text documents rich with operational context. They contain:
- **Activity labels**: Ground truth for time-series classification
- **NPT events**: Targets for anomaly detection and prediction
- **Expert annotations**: Domain knowledge about formation changes, equipment performance
- **Contextual information**: Weather, personnel changes, mud properties

**Challenge**: Extracting structured data from narrative text to link with sensor time series is a major NLP problem in drilling analytics.

---

## Data Science Obstacles and Opportunities in Drilling

The oil and gas drilling domain presents unique challenges for data science and machine learning. Here are the major obstacles and exciting research directions:

### 1. **Data Quality and Availability**

**Obstacles:**
- **Sensor drift and calibration issues**: Sensors operate in harsh environments (high temperature, pressure, vibration) leading to drift
- **Missing data**: Communication disruptions, sensor failures, manual recording gaps
- **Data fragmentation**: Data stored in disparate systems (WITSML servers, historian databases, paper reports)
- **Proprietary formats**: Lack of standardization across operators and service companies
- **Sparse labels**: Limited ground truth for supervised learning (e.g., NPT events are rare)

**Opportunities:**
- Develop robust imputation methods for time-series with domain-aware constraints
- Create transfer learning approaches to leverage data across wells and fields
- Build semi-supervised and self-supervised models for rare event detection
- Standardize data pipelines with WITSML standards and open-source tools

---

### 2. **Real-Time Streaming and Edge Computing**

**Obstacles:**
- **Latency requirements**: Decisions must be made in seconds (e.g., kick detection, drilling automation)
- **Bandwidth limitations**: Offshore rigs have limited satellite communication
- **Edge hardware constraints**: Computing must happen on-rig with limited resources
- **Synchronization issues**: Multiple data streams at different sampling rates

**Opportunities:**
- Deploy lightweight models optimized for edge deployment (quantization, pruning)
- Develop online learning algorithms that adapt to changing conditions
- Create hierarchical architectures: edge for real-time, cloud for heavy computation
- Build digital twins that run in parallel with physical operations

**Example Application**: Real-time kick detection system that processes flow rate and pressure data at 10 Hz, triggering alarms within 5 seconds of anomaly detection.

---

### 3. **Multi-Modal Data Fusion**

**Obstacles:**
- **Heterogeneous data types**: Time-series sensors, text (DDRs), images (drilling fluids, core samples), 3D seismic
- **Different temporal scales**: Some sensors at 100 Hz, DDRs daily, seismic static
- **Alignment challenges**: Depth-based vs time-based indexing, depth measurement errors
- **Semantic gap**: Linking sensor patterns to geological or operational concepts

**Opportunities:**
- Develop multimodal encoders (similar to CLIP) for aligning sensor data with text
- Create attention mechanisms that fuse information across modalities
- Build knowledge graphs that connect sensor observations, activities, and geological concepts
- Design retrieval systems for "find me similar drilling scenarios"

**Example Application**: A model that takes sensor time-series + DDR text + mud log images and predicts formation type and optimal drilling parameters.

---

### 4. **Causal Inference and Interpretability**

**Obstacles:**
- **Confounding factors**: Many variables affect outcomes (formation, equipment, operator skill, mud properties)
- **Black-box models**: Operators won't trust models they don't understand
- **Safety-critical domain**: Wrong predictions can lead to blowouts, injuries, or environmental damage
- **Non-stationarity**: Drilling conditions change continuously as depth increases

**Opportunities:**
- Develop physics-informed neural networks that embed drilling mechanics equations
- Create explainable AI methods tailored to time-series (saliency maps, counterfactuals)
- Use causal discovery methods to build directed acyclic graphs of drilling processes
- Design human-in-the-loop systems where models provide recommendations, not commands

**Example Application**: An ROP optimization model that not only predicts optimal WOB/RPM but also explains "Increase WOB by 5K lbs because current formation is softer based on gamma ray drop and torque decrease."

---

### 5. **Rare Event Prediction (NPT Forecasting)**

**Obstacles:**
- **Class imbalance**: NPT events like stuck pipe, lost circulation, or kicks are rare (< 1% of time)
- **Leading indicators**: Subtle precursors may appear hours before event
- **High false positive cost**: Too many false alarms lead operators to ignore the system
- **Event diversity**: Many types of NPT with different signatures

**Opportunities:**
- Apply anomaly detection with uncertainty quantification (Bayesian deep learning)
- Use survival analysis to model "time until next NPT event"
- Develop hierarchical models: first detect "something unusual," then classify event type
- Create cost-sensitive learning objectives that penalize false negatives heavily

**Example Application**: A stuck pipe prediction system that analyzes torque, drag, and mud properties to issue warnings 30 minutes before pipe becomes immobilized, achieving 80% recall with 10% false positive rate.

---

### 6. **Formation and Lithology Identification**

**Obstacles:**
- **Ground truth scarcity**: Core samples are expensive and sparse
- **Label ambiguity**: Geological interpretations can be subjective
- **Regional variation**: Models trained in one basin may not transfer to another
- **Real-time requirements**: Decisions needed while drilling (geosteering)

**Opportunities:**
- Build self-supervised models using sensor relationships (e.g., predict gamma ray from ROP pattern)
- Use weakly supervised learning with coarse labels from seismic or offset wells
- Develop domain adaptation methods for cross-basin transfer
- Create generative models for synthetic data augmentation

**Example Application**: A real-time lithology classifier that processes gamma ray, resistivity, and drilling mechanics to identify formations (sandstone, shale, limestone) with 90%+ accuracy, enabling automated geosteering decisions.

---

### 7. **Natural Language Processing on DDRs**

**Obstacles:**
- **Unstructured text**: Free-form narratives with high variability
- **Domain-specific language**: Technical jargon, abbreviations, inconsistent terminology
- **Temporal event extraction**: Need to parse chronological activities and align with sensor data
- **Information extraction**: Extracting structured fields (activity codes, NPT durations, equipment)

**Opportunities:**
- Fine-tune large language models (LLMs) on drilling corpus
- Build named entity recognition (NER) models for drilling-specific entities
- Develop timeline extraction models to create structured activity logs from narratives
- Create summarization models that generate concise summaries for management

**Example Application**: An LLM-based system that reads DDRs and automatically:
1. Extracts all NPT events with start/end times, causes, and resolutions
2. Links these to sensor time-series for anomaly correlation
3. Generates a weekly summary report highlighting trends and recommendations

---

### 8. **Drilling Optimization and Automation**

**Obstacles:**
- **High-dimensional parameter space**: WOB, RPM, flow rate, mud weight, and dozens of other variables
- **Delayed feedback**: Outcomes (e.g., bit wear) manifest over hours or days
- **Safety constraints**: Optimization must respect hard constraints (pressure limits, torque limits)
- **Operator acceptance**: Autonomous drilling systems face cultural resistance

**Opportunities:**
- Apply reinforcement learning with safety constraints (safe RL, constrained MDPs)
- Use Bayesian optimization for expensive parameter tuning
- Develop model-predictive control (MPC) with learned dynamics models
- Create "copilot" systems that suggest actions for operator approval

**Example Application**: An RL-based drilling optimizer that learns to maximize ROP while minimizing bit wear and NPT risk. The system runs in "suggestion mode" for 6 months to build trust before operators enable "auto mode."

---

### 9. **Transfer Learning and Few-Shot Learning**

**Obstacles:**
- **New wells**: Limited data when drilling a new well in a new area
- **Equipment changes**: New rigs, bits, or BHA configurations
- **Basin variation**: Geological differences between regions
- **Cold start problem**: How to make predictions with minimal data?

**Opportunities:**
- Pre-train foundation models on large datasets across multiple wells/basins
- Use meta-learning to quickly adapt to new wells with few samples
- Develop physics-based priors that reduce data requirements
- Create "well twins" that match historical wells to new situations

**Example Application**: A time-series foundation model pre-trained on 10,000 wells that can be fine-tuned with just 1 day of data from a new well to achieve state-of-the-art formation prediction.

---

### 10. **Uncertainty Quantification and Risk Assessment**

**Obstacles:**
- **Aleatory uncertainty**: Inherent randomness in geological properties
- **Epistemic uncertainty**: Model uncertainty due to limited data
- **Decision-making under uncertainty**: How to act when predictions are uncertain?
- **Regulatory requirements**: Need to quantify risk for safety assessments

**Opportunities:**
- Use Bayesian neural networks or ensemble methods for uncertainty estimates
- Develop conformal prediction methods for time-series with coverage guarantees
- Create risk-aware decision frameworks (e.g., expected value of information)
- Build probabilistic digital twins that quantify "what-if" scenarios

**Example Application**: A probabilistic model that predicts "ROP will be 40-60 ft/hr with 90% confidence" and uses this to estimate well completion time distributions, helping planners manage risk.

---

## Conclusion: Bridging Drilling and Data Science

Oil and gas drilling is a domain where data science can have enormous impact—improving safety, reducing costs, and accelerating operations. However, the challenges are substantial:

- **Data**: Noisy, sparse, fragmented, and proprietary
- **Real-time**: Edge deployment with latency and bandwidth constraints
- **Safety**: High stakes where errors have severe consequences
- **Domain complexity**: Requires deep understanding of physics, geology, and operations

The most promising approaches combine:
1. **Domain expertise**: Collaborate closely with drilling engineers and geologists
2. **Physics-informed models**: Embed known equations and constraints
3. **Robust methods**: Handle missing data, outliers, and distribution shift
4. **Explainability**: Build trust through interpretable predictions
5. **Human-in-the-loop**: Augment rather than replace human decision-makers

As time-series foundation models, multimodal learning, and edge AI continue to advance, the oil and gas industry is poised for a data-driven transformation. The challenge is to build solutions that are not just technically sophisticated, but practical, trustworthy, and deployable in the field.

The future of drilling is not just deeper and faster—it's smarter.`,
    tags: ["Oil & Gas", "Data Science", "Time Series", "Industry 4.0"]
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
