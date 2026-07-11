# A Deep Dive into Kalman Filters

The Kalman filter is one of those algorithms that shows up everywhere once you know to look for it: GPS, spacecraft navigation, sensor fusion in robots, target tracking, even smoothing financial time series. At its heart it answers a deceptively simple question: *given a stream of noisy measurements, what is my best guess of the true state of a system right now?*

This post rebuilds the Kalman filter from the ground up: the intuition, the state-space model, the recursive equations, a worked example, and the nonlinear extensions (EKF, UKF) you actually reach for in practice.

---

## 1. The Problem: Estimating a Hidden State

Imagine you are tracking a drone. You care about its true position and velocity, but you can never observe them directly. Instead you get:

- A **process model** that predicts how the state evolves (physics: position changes by velocity × time).
- **Measurements** from sensors (GPS, IMU) that are noisy and incomplete.

Neither is trustworthy alone. The model drifts because it ignores wind gusts and unmodeled forces. The sensors are jittery. The Kalman filter is the *optimal* way to combine the two — provided the system is linear and the noise is Gaussian.

The key insight: represent your belief about the state not as a single point, but as a **Gaussian distribution** — a mean $\mathbf{x}$ and a covariance $P$ that encodes your uncertainty. The filter propagates this Gaussian forward in time and shrinks it every time a measurement arrives.

---

## 2. The State-Space Model

We model the system with two linear equations corrupted by Gaussian noise.

**Process (motion) model** — how the state evolves from step $k-1$ to $k$:

$$\mathbf{x}_k = F \mathbf{x}_{k-1} + B \mathbf{u}_k + \mathbf{w}_k, \qquad \mathbf{w}_k \sim \mathcal{N}(0, Q)$$

**Measurement model** — how a measurement relates to the state:

$$\mathbf{z}_k = H \mathbf{x}_k + \mathbf{v}_k, \qquad \mathbf{v}_k \sim \mathcal{N}(0, R)$$

| Symbol | Meaning |
|--------|---------|
| $\mathbf{x}_k$ | State vector (e.g. position & velocity) |
| $F$ | State-transition matrix (the dynamics) |
| $B, \mathbf{u}_k$ | Control matrix & input (e.g. throttle) |
| $\mathbf{z}_k$ | Measurement vector |
| $H$ | Observation matrix (maps state → measurement) |
| $Q$ | Process noise covariance (trust in the model) |
| $R$ | Measurement noise covariance (trust in sensors) |
| $P_k$ | State covariance (our uncertainty) |

The whole game is choosing $Q$ and $R$. Large $Q$ says "my model is rough, trust the sensors." Large $R$ says "my sensors are noisy, trust the model."

---

## 3. The Two-Step Dance: Predict and Update

The Kalman filter is **recursive**: it never stores history. Each cycle has two phases.

### Predict (time update)

Push the state forward using the dynamics, and *grow* the uncertainty because prediction adds error:

$$\hat{\mathbf{x}}_k^- = F \hat{\mathbf{x}}_{k-1} + B \mathbf{u}_k$$

$$P_k^- = F P_{k-1} F^T + Q$$

The minus superscript means "prior" — before seeing the measurement. Notice $P$ only ever grows here: $F P F^T$ propagates old uncertainty, $+Q$ injects new.

### Update (measurement update)

Now fold in the measurement $\mathbf{z}_k$. First compute the **innovation** (the surprise) — the gap between what we measured and what we expected:

$$\mathbf{y}_k = \mathbf{z}_k - H \hat{\mathbf{x}}_k^-$$

The **innovation covariance** tells us how much to expect that surprise to vary:

$$S_k = H P_k^- H^T + R$$

The star of the show — the **Kalman gain** — decides how much to trust the innovation:

$$K_k = P_k^- H^T S_k^{-1}$$

Then correct the estimate and *shrink* the uncertainty:

$$\hat{\mathbf{x}}_k = \hat{\mathbf{x}}_k^- + K_k \mathbf{y}_k$$

$$P_k = (I - K_k H) P_k^-$$

That's the entire algorithm. Predict, update, repeat.

---

## 4. The Kalman Gain Is the Whole Story

Everything interesting lives in $K_k = P_k^- H^T S_k^{-1}$. Think of it as a **dial between model and measurement**.

Consider the scalar case where $H = 1$. The gain becomes:

$$K = \frac{P^-}{P^- + R}$$

- If the **measurement is precise** ($R \to 0$): $K \to 1$. The filter throws away its prediction and snaps to the measurement.
- If the **measurement is garbage** ($R \to \infty$): $K \to 0$. The filter ignores the measurement and coasts on its model.
- In between, $K$ is a weighted blend — and crucially it is computed *optimally* from the current uncertainties, not hand-tuned.

This is why the Kalman filter is called a **Bayesian** estimator: each update is exactly a Bayesian posterior, the product of a Gaussian prior (prediction) and a Gaussian likelihood (measurement), which is again Gaussian.

---

## 5. A Worked 1D Example: Tracking Position from Velocity

Let the state be position and velocity, $\mathbf{x} = \begin{bmatrix} p \\ v \end{bmatrix}$, with a constant-velocity model over a timestep $\Delta t$:

$$F = \begin{bmatrix} 1 & \Delta t \\ 0 & 1 \end{bmatrix}, \qquad H = \begin{bmatrix} 1 & 0 \end{bmatrix}$$

$F$ encodes "new position = old position + velocity × $\Delta t$; velocity stays the same." $H$ says "we only measure position, not velocity." The remarkable part: the filter *infers velocity* even though no sensor ever measures it, purely from how position changes over time. This coupling — observing one variable to estimate another through the dynamics — is the Kalman filter's superpower, and it is exactly what powers dead-reckoning navigation.

A minimal implementation:

```python
import numpy as np

dt = 1.0
F = np.array([[1, dt], [0, 1]])
H = np.array([[1, 0]])
Q = np.array([[0.05, 0.0], [0.0, 0.05]])   # trust in the model
R = np.array([[2.0]])                        # sensor noise variance

x = np.array([[0.0], [1.0]])                 # initial: pos 0, vel 1
P = np.eye(2) * 500.0                         # huge initial uncertainty

def step(x, P, z):
    # --- predict ---
    x = F @ x
    P = F @ P @ F.T + Q
    # --- update ---
    y = z - H @ x                             # innovation
    S = H @ P @ H.T + R
    K = P @ H.T @ np.linalg.inv(S)            # Kalman gain
    x = x + K @ y
    P = (np.eye(2) - K @ H) @ P
    return x, P

for z in [1.2, 2.1, 2.7, 4.3, 5.0]:
    x, P = step(x, P, np.array([[z]]))
    print(f"pos={x[0,0]:.2f}  vel={x[1,0]:.2f}")
```

Start with a wild uncertainty ($P = 500 I$), and the gain stays near 1 — the filter leans hard on early measurements. As $P$ shrinks, the filter grows confident and starts smoothing through sensor jitter on its own.

---

## 6. When the World Isn't Linear

The classic Kalman filter assumes $F$ and $H$ are linear. Real systems — a robot turning, a radar tracking range and bearing — are not. Two extensions handle this.

### Extended Kalman Filter (EKF)

Linearize the nonlinear functions $f$ and $h$ around the current estimate using their **Jacobians**:

$$F_k = \left. \frac{\partial f}{\partial \mathbf{x}} \right|_{\hat{\mathbf{x}}_{k-1}}, \qquad H_k = \left. \frac{\partial h}{\partial \mathbf{x}} \right|_{\hat{\mathbf{x}}_k^-}$$

You run the nonlinear functions for the mean, but use the Jacobians to propagate covariance. It's the workhorse of GPS and navigation, but it can diverge when nonlinearities are strong, and computing Jacobians by hand is error-prone.

### Unscented Kalman Filter (UKF)

Instead of linearizing, the UKF picks a deterministic set of **sigma points** around the mean, pushes each through the *true* nonlinear function, and recovers the transformed mean and covariance from the results. This **unscented transform** captures the distribution to second order with no Jacobians at all — usually more accurate than the EKF for highly nonlinear systems, at a modest extra cost.

| | EKF | UKF |
|---|-----|-----|
| Nonlinearity handling | Jacobian linearization | Sigma-point sampling |
| Needs derivatives? | Yes | No |
| Accuracy | 1st order | 2nd+ order |
| Cost | Lower | Higher |
| Failure mode | Diverges on strong nonlinearity | More robust |

For very high dimensions or non-Gaussian noise, you eventually leave the Kalman family entirely for **particle filters**, which represent the belief with thousands of weighted samples.

---

## 7. Practical Notes & Gotchas

- **Tuning $Q$ and $R$ is the real work.** $R$ often comes from sensor datasheets; $Q$ is usually tuned empirically. The ratio matters more than the absolute scale.
- **Initialize $P$ large.** If you're unsure of the initial state, a big $P$ lets early measurements dominate and the filter converges fast.
- **Watch covariance for numerical decay.** Repeated updates can make $P$ lose symmetry or positive-definiteness. Use the **Joseph form** of the covariance update, or a square-root filter, for stability.
- **Check the innovation.** If $\mathbf{y}_k$ is consistently large relative to $S_k$, your model is wrong or you have outliers — gate measurements that fall outside a few standard deviations.
- **Steady state.** For time-invariant systems the gain $K$ converges to a constant; you can precompute it (the algebraic Riccati equation) and skip the per-step covariance math.

---

## Takeaways

The Kalman filter is, at its core, **recursive Bayesian estimation for linear-Gaussian systems**:

1. Represent belief as a Gaussian — mean and covariance.
2. **Predict** with the dynamics; uncertainty grows.
3. **Update** with measurements; uncertainty shrinks.
4. The **Kalman gain** optimally balances model against measurement.
5. Nonlinear? Linearize (EKF) or sample (UKF). Non-Gaussian? Go particle.

Once the predict-update rhythm clicks, you start seeing it everywhere — and you have a principled, optimal tool for turning noisy data into confident estimates.
