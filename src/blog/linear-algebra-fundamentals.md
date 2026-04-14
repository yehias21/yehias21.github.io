# Linear Algebra Fundamentals: A Deep Dive into Everyday Mathematics

This is a comprehensive set of linear algebra fundamentals - these form the backbone of so much in ML. Let me rebuild these concepts for you with clear explanations and geometric intuition.

---

## 1. Eigenvectors and Eigenvalues: Geometric Interpretation & PCA

**The core idea:** When you apply a matrix $A$ to most vectors, they change both direction and magnitude. But *eigenvectors* are special - they only get scaled (stretched or compressed), not rotated.

$$A\mathbf{v} = \lambda \mathbf{v}$$

- $\mathbf{v}$ is the eigenvector (the direction that stays fixed)
- $\lambda$ is the eigenvalue (the scaling factor)

**Geometric picture:** Imagine $A$ as a transformation. The eigenvectors are the "principal axes" of that transformation - the directions along which the transformation acts most simply (pure scaling).

**Why crucial for PCA?**

PCA finds the directions of maximum variance in your data. The covariance matrix $\Sigma$ encodes how your data spreads. Its eigenvectors point in the directions of maximum spread, and the eigenvalues tell you *how much* variance exists along each direction.

- Eigenvector with largest $\lambda$ → first principal component (direction of most variance)
- You project data onto top-$k$ eigenvectors to reduce dimensionality while preserving the most information

---

## 2. SVD vs Eigendecomposition

**Eigendecomposition** (only for square matrices):
$$A = V \Lambda V^{-1}$$
where $V$ contains eigenvectors as columns, $\Lambda$ is diagonal with eigenvalues.

**SVD** (works for *any* matrix, even rectangular $m \times n$):
$$A = U \Sigma V^T$$

- $U$: $m \times m$ orthonormal matrix (left singular vectors)
- $\Sigma$: $m \times n$ diagonal matrix (singular values $\sigma_i \geq 0$)
- $V$: $n \times n$ orthonormal matrix (right singular vectors)

**Key differences:**

| Aspect | Eigendecomposition | SVD |
|--------|-------------------|-----|
| Matrix shape | Square only | Any shape |
| Always exists? | No (needs $n$ independent eigenvectors) | Always exists |
| Values | Can be negative/complex | Singular values always $\geq 0$ |

**Connection:** For symmetric positive semi-definite matrices, eigenvalues = singular values and eigenvectors = singular vectors.

**When to use each:**
- **SVD:** Low-rank approximation, pseudoinverse, recommender systems, solving least squares, numerical stability
- **Eigendecomposition:** PCA on covariance matrices, analyzing dynamics (Markov chains, differential equations), spectral graph theory

---

## 3. Rank, Null Space, and Column Space

**Rank:** The number of linearly independent columns (or rows) of a matrix. Equivalently, the dimension of the column space.

**Column space** $\text{Col}(A)$: All possible outputs $A\mathbf{x}$ - the "reachable" vectors.

**Null space** $\text{Null}(A)$: All vectors $\mathbf{x}$ such that $A\mathbf{x} = \mathbf{0}$ - inputs that get "killed."

**The rank-nullity theorem:**
$$\text{rank}(A) + \dim(\text{Null}(A)) = n$$
where $n$ is the number of columns.

**Intuition:** If your matrix is $m \times n$, you're mapping from $\mathbb{R}^n$ to $\mathbb{R}^m$. The null space represents the "dimensions you lose" in this mapping, and the rank represents "dimensions you keep."

---

## 4. Positive Semi-Definite (PSD) Matrices

**Definition:** A symmetric matrix $A$ is PSD if for all vectors $\mathbf{x}$:
$$\mathbf{x}^T A \mathbf{x} \geq 0$$

**Equivalent characterizations:**
- All eigenvalues $\geq 0$
- $A = B^T B$ for some matrix $B$
- All principal minors $\geq 0$

**Why covariance matrices are always PSD:**

The covariance matrix is $\Sigma = \mathbb{E}[(X - \mu)(X - \mu)^T]$.

For any vector $\mathbf{a}$:
$$\mathbf{a}^T \Sigma \mathbf{a} = \mathbb{E}[\mathbf{a}^T(X-\mu)(X-\mu)^T\mathbf{a}] = \mathbb{E}[(\mathbf{a}^T(X-\mu))^2] \geq 0$$

This is the variance of the projection onto direction $\mathbf{a}$, which is always non-negative. You can't have negative variance!

---

## 5. Condition Number

**Definition:**
$$\kappa(A) = \|A\| \cdot \|A^{-1}\| = \frac{\sigma_{\max}}{\sigma_{\min}}$$

(ratio of largest to smallest singular value)

**Meaning:** It measures how sensitive the solution of $A\mathbf{x} = \mathbf{b}$ is to perturbations in $A$ or $\mathbf{b}$.

- $\kappa \approx 1$: Well-conditioned, stable
- $\kappa \gg 1$: Ill-conditioned, small errors get amplified

**In optimization:** When minimizing $f(\mathbf{x}) = \frac{1}{2}\mathbf{x}^T A \mathbf{x} - \mathbf{b}^T\mathbf{x}$, the condition number of $A$ determines how "elongated" the level sets are. High $\kappa$ means gradient descent oscillates and converges slowly. This is why preconditioning matters!

---

## 6. Linear Least Squares Derivation

**Problem:** Find $\mathbf{x}$ minimizing $\|A\mathbf{x} - \mathbf{b}\|^2$ when $A\mathbf{x} = \mathbf{b}$ has no exact solution.

**Derivation:**

Let $f(\mathbf{x}) = \|A\mathbf{x} - \mathbf{b}\|^2 = (A\mathbf{x} - \mathbf{b})^T(A\mathbf{x} - \mathbf{b})$

Expanding:
$$f(\mathbf{x}) = \mathbf{x}^T A^T A \mathbf{x} - 2\mathbf{b}^T A \mathbf{x} + \mathbf{b}^T \mathbf{b}$$

Taking gradient and setting to zero:
$$\nabla f = 2A^T A \mathbf{x} - 2A^T \mathbf{b} = 0$$

This gives the **normal equations:**
$$A^T A \mathbf{x} = A^T \mathbf{b}$$

**Geometric interpretation:** The residual $(\mathbf{b} - A\mathbf{x})$ must be orthogonal to the column space of $A$. That's exactly what $A^T(\mathbf{b} - A\mathbf{x}) = 0$ says.

---

## 7. Moore-Penrose Pseudoinverse

**Definition:** For any matrix $A$, the pseudoinverse $A^+$ satisfies:
1. $AA^+A = A$
2. $A^+AA^+ = A^+$
3. $(AA^+)^T = AA^+$
4. $(A^+A)^T = A^+A$

**Via SVD:** If $A = U\Sigma V^T$, then $A^+ = V\Sigma^+ U^T$ where $\Sigma^+$ inverts non-zero singular values.

**When you need it:**
- When $A$ is not invertible (rectangular or rank-deficient)
- Solving least squares: $\mathbf{x} = A^+ \mathbf{b}$ gives the minimum-norm solution
- When $A^T A$ is singular, you can't use normal equations directly

**Key property:** $A^+ \mathbf{b}$ gives:
- The exact solution if one exists
- The least-squares solution otherwise
- Among all least-squares solutions, the one with smallest $\|\mathbf{x}\|$

---

## 8. Orthogonal Matrices and Rotations

**Orthogonal matrix:** $Q^T Q = Q Q^T = I$, equivalently $Q^{-1} = Q^T$.

**Properties:**
- Columns (and rows) form an orthonormal basis
- Preserves lengths: $\|Q\mathbf{x}\| = \|\mathbf{x}\|$
- Preserves angles: $(Q\mathbf{x})^T(Q\mathbf{y}) = \mathbf{x}^T\mathbf{y}$
- $\det(Q) = \pm 1$

**Relationship to rotations:**
- $\det(Q) = +1$: pure rotation
- $\det(Q) = -1$: rotation + reflection

**Why important in neural networks:**
1. **Gradient stability:** Orthogonal weight matrices have condition number 1, preventing vanishing/exploding gradients in RNNs
2. **Preserves information:** No dimension collapse or expansion
3. **Efficient inversion:** $W^{-1} = W^T$ is free
4. **Used in:** Orthogonal initialization, unitary RNNs, normalizing flows

---

## 9. Trace and the Proof that Tr(AB) = Tr(BA)

**Trace:** Sum of diagonal elements: $\text{Tr}(A) = \sum_i A_{ii}$

**Also:** $\text{Tr}(A) = \sum_i \lambda_i$ (sum of eigenvalues)

**Proof that $\text{Tr}(AB) = \text{Tr}(BA)$:**

$$\text{Tr}(AB) = \sum_i (AB)_{ii} = \sum_i \sum_j A_{ij} B_{ji}$$

$$\text{Tr}(BA) = \sum_i (BA)_{ii} = \sum_i \sum_j B_{ij} A_{ji} = \sum_j \sum_i A_{ji} B_{ij}$$

Relabeling indices $i \leftrightarrow j$ in the second expression gives the same double sum. ∎

**Useful consequence:** $\text{Tr}(ABC) = \text{Tr}(CAB) = \text{Tr}(BCA)$ (cyclic permutation)

---

## 10. Gradient of Quadratic Form

**Result:**
$$\nabla_{\mathbf{x}} (\mathbf{x}^T A \mathbf{x}) = (A + A^T)\mathbf{x}$$

If $A$ is symmetric: $\nabla_{\mathbf{x}} (\mathbf{x}^T A \mathbf{x}) = 2A\mathbf{x}$

**Derivation (index notation):**

$$f = \mathbf{x}^T A \mathbf{x} = \sum_{i,j} x_i A_{ij} x_j$$

$$\frac{\partial f}{\partial x_k} = \sum_j A_{kj} x_j + \sum_i x_i A_{ik} = (A\mathbf{x})_k + (A^T\mathbf{x})_k$$

So $\nabla f = A\mathbf{x} + A^T\mathbf{x} = (A + A^T)\mathbf{x}$.

---

## 11. Spectral Theorem

**Statement:** Every real symmetric matrix $A$ can be diagonalized by an orthogonal matrix:
$$A = Q \Lambda Q^T$$
where $Q$ is orthogonal (columns are orthonormal eigenvectors) and $\Lambda$ is diagonal (real eigenvalues).

**What it tells us:**
1. Symmetric matrices always have **real eigenvalues**
2. Eigenvectors corresponding to distinct eigenvalues are **orthogonal**
3. There's always a full set of $n$ orthonormal eigenvectors
4. $A = \sum_i \lambda_i \mathbf{q}_i \mathbf{q}_i^T$ (outer product decomposition)

**Why it matters:** This is the theoretical foundation for PCA, spectral clustering, and understanding quadratic forms.

---

## 12. Frobenius Norm and SVD

**Definition:**
$$\|A\|_F = \sqrt{\sum_{i,j} |A_{ij}|^2} = \sqrt{\text{Tr}(A^T A)}$$

**Connection to SVD:** If $A = U\Sigma V^T$, then:
$$\|A\|_F = \sqrt{\sum_i \sigma_i^2}$$

The Frobenius norm is the $\ell_2$ norm of the singular values.

**Why useful:**
- Low-rank approximation: truncated SVD minimizes Frobenius error (Eckart-Young theorem)
- Matrix regularization: $\|W\|_F^2$ penalizes large weights
- Comparing matrices

---

## 13. Matrix Factorization & NMF for Recommender Systems

**Setup:** You have a user-item rating matrix $R$ (sparse, with missing entries).

**Goal:** Factor $R \approx WH$ where:
- $W$: user × latent factors (user preferences)
- $H$: latent factors × items (item characteristics)

**NMF (Non-negative Matrix Factorization):** Adds constraint $W, H \geq 0$.

**Why non-negativity?**
- Interpretability: factors represent "topics" or "genres"
- Additive parts-based representation
- Natural for ratings (no negative preferences)

**Objective:**
$$\min_{W, H \geq 0} \|R - WH\|_F^2$$

Often solved via multiplicative update rules or projected gradient descent.

---

## 14. Determinant: Geometric Interpretation

**Definition:** For $2\times 2$: $\det\begin{pmatrix}a & b \\ c & d\end{pmatrix} = ad - bc$

**Geometric meaning:** The determinant measures the **signed volume scaling factor** of the transformation.

- $|\det(A)| = $ factor by which volumes are scaled
- $\det(A) > 0$: orientation preserved
- $\det(A) < 0$: orientation flipped
- $\det(A) = 0$: collapses dimension (maps to lower-dimensional space)

**When $\det(A) = 0$:**
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
| Eigendecomposition | $A = V\Lambda V^{-1}$ | PCA, dynamics |
| SVD | $A = U\Sigma V^T$ | Low-rank, pseudoinverse |
| Normal equations | $A^T A \mathbf{x} = A^T \mathbf{b}$ | Least squares |
| Pseudoinverse via SVD | $A^+ = V\Sigma^+ U^T$ | Rank-deficient systems |
| Quadratic gradient | $\nabla(\mathbf{x}^T A \mathbf{x}) = 2A\mathbf{x}$ | Optimization |
| Spectral theorem | $A = Q\Lambda Q^T$ | Symmetric matrices |
| Condition number | $\kappa = \sigma_{\max}/\sigma_{\min}$ | Numerical stability |

---

## Conclusion

These linear algebra concepts form the mathematical backbone of machine learning, optimization, and data science. Understanding the geometric intuition behind eigenvectors, SVD, and matrix decompositions provides deep insights into why algorithms work the way they do.

Whether you're implementing PCA, solving least squares problems, or debugging gradient descent convergence issues, these fundamentals will guide your intuition and help you make better design decisions.