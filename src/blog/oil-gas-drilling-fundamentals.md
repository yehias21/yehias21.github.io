# Oil & Gas Drilling: From Bits to Bytes

*A field guide to drilling operations, sensors, and why this domain is such a rich testbed for time-series foundation models: drawn from my M.Sc. thesis work on IndusTSLM with AIQ Intelligence.*

![IndusTSLM Flamingo architecture for drilling data](./blog/industslm.png)

---

## Why drilling is one of the most data-intensive industrial processes on Earth

A single wellbore generates on average **700,000 sensor measurements per day**, recorded at up to 1 Hz across channels that monitor mechanical forces, hydraulic pressures, rotational speeds, and depth progression. Over a typical campaign spanning multiple wells and several years, this produces **billions of timestamped observations** encoding the full operational history of the rig.

Concurrently, drilling engineers produce **Daily Drilling Reports (DDRs)**: concise natural language summaries documenting the activities performed during each shift, the depths reached, the equipment used, and any anomalies encountered.

Despite the richness of these paired data streams, the industry still relies heavily on manual interpretation. That is exactly where modern multimodal ML can help.

---

## What is oil and gas drilling?

Drilling creates a borehole (a *wellbore*) that penetrates rock formations to access hydrocarbon reservoirs, sometimes several kilometers below the surface. Four broad families:

1. **Exploration (wildcat) drilling**: unproven areas to discover new reserves.
2. **Development drilling**: additional wells in proven fields.
3. **Directional drilling**: at angles to reach reserves not directly below the rig.
4. **Horizontal drilling**: along the reservoir layer to maximize contact area.

### Surface components at a glance

![Drilling rig schematic](./blog/drilling.png)

Key surface components measured by the 8 channels discussed below: the **traveling block** (hook load, block position), the **rotary drive** (torque, rotary velocity), the **standpipe / mud pump** (standpipe pressure, flow rate), the **mud pit** (tank volume), and the drill bit (bit depth, hole depth).

---

## The drilling process

### Phase 1: Planning
Geological surveys, seismic analysis, and environmental review feed a detailed **well plan**: target depth and trajectory, casing design, mud weight, expected formations, and safety procedures.

### Phase 2: Rig setup
Derrick, drawworks, rotary table / top drive, mud pumps, blowout preventer (BOP).

### Phase 3: Drilling
- **Spud in** → first penetration.
- **Drilling ahead** → monitored through ROP, WOB, RPM, torque, SPP.
- **Tripping** → pulling the drill string out and back in for bit changes, casing runs, or logging.
- **Casing and cementing** → successive steel casing strings (conductor → surface → intermediate → production) cemented to stabilize the well and isolate zones.
- **Total Depth (TD)** → target reached, well ready for completion.

### Phase 4: Completion
Production tubing, perforation, packers, safety valves, well testing.

---

## Activity codes: the language of drilling time

Operations are tracked with standardized **activity codes** that feed the DDR. After consolidating notation variants, our proprietary ADNOC dataset contained **61 unique codes** and **491 sub-codes**. A short tour of the dominant ones:

| Code | Meaning | Share |
|---|---|---|
| `DRILL` | Rotary or slide drilling | 16.5% |
| `TRIP` | Run in / pull out of hole | 15.2% |
| `CM` | Corrective maintenance | 8.8% |
| `CSG` | Running / pulling casing | 6.5% |
| `WAIT` | Waiting (weather, orders) | 4.1% |
| `LOG` | Wireline or MWD logging | 4.1% |
| `CIRC` | Circulating drilling fluid | 4.0% |
| `BOP` | BOP operations | 3.6% |
| `FISH` | Fishing operations | 3.4% |
| `CMT` | Cementing | 2.9% |

![Distribution of drilling activity labels across the dataset](./blog/activity_distribution.png)
*Major activity codes (left) and top sub-codes (right). DRILL + TRIP alone account for nearly a third of all timesteps.*

The distribution is **heavily imbalanced**: DRILL + TRIP alone account for nearly a third of all timesteps, while many codes contribute less than 1%. About 12% of timesteps are unlabeled. The label space also contains spelling inconsistencies (`DRILL`/`DRIL`, `RIGMT`/`RGMT`/`RIGMNT`) that need canonicalization.

---

## The 8 surface sensors that matter

Modern rigs record far more than 8 channels, but for sensor-to-language alignment these are the backbone:

| Channel | Unit | Category | Physical meaning |
|---|---|---|---|
| Rotary Velocity | RPM | Mechanical | Drill string rotation rate |
| Standpipe Pressure | psi | Hydraulic | Mud pressure pumped downhole |
| Surface Torque | kft·lbs | Mechanical | Rotational force at surface |
| Flow Rate In | GPM | Hydraulic | Drilling fluid volume per minute |
| Bit Depth | ft | Depth | Current depth of the drill bit |
| Block Position | ft | Depth | Height of traveling block on derrick |
| Hook Load | klbs | Mechanical | Weight hanging from the hook |
| Hole Depth | ft | Depth | Max depth drilled (monotonic) |

### Different activities have very different signatures

![Eight sensor channels over a 3.3 hour window from well BB-1282](./blog/sensor_timeseries.png)
*A real ~3.3 hour window from well BB-1282 (16" hole section). Shaded regions mark DRILL → TRIP → CIRC transitions. Each activity leaves a distinct fingerprint across the eight channels.*

During **DRILL**: elevated WOB, active torque, high SPP and flow, steadily increasing bit depth.
During **TRIP**: WOB drops to zero, hook load and block position exhibit a characteristic sawtooth as stands are handled.
During **CIRC**: hydraulic system active but mechanical indicators near zero.

This contrast is precisely what makes a learnable mapping between sensor trajectories and language possible.

---

## The Daily Drilling Report (DDR)

At the end of each 24 hour shift, a drilling engineer logs every activity segment in a table like this (one real day from the dataset):

| From | To | Elapsed | End MD (ft) | Code | Operations Description |
|---|---|---|---|---|---|
| 00:00 | 01:00 | 1.0 h | 469 | TRIP | Made up BHA; made up 8.5" PDC bit with 8-3/8" near bit reamer. Checked scribe line and picked up new drilling jar. |
| 01:00 | 03:30 | 2.5 h | 3,136 | TRIP | RIH to 956 m. Recorded serial numbers on HWDP. |
| 10:00 | 12:00 | 2.0 h | 7,014 | CIRC | Precautionary wash from 2,053 m to 2,138 m. |
| 13:30 | 16:30 | 3.0 h | 7,146 | RIGMT | Inspected crown and traveling blocks. Found wooden bumper and clamps broken. Performed visual inspection of derrick. No damage found. |
| 19:00 | 00:00 | 5.0 h | 7,359 | DRILL | Drilled in oriented mode to kick off well from 2,231 m to 2,243 m. Held toolface at 90° left. 60–70% cement in cuttings at 2,243 m. |

Telegraphic, numeric, acronym-heavy. This is the text side of the multimodal problem: the model has to learn to map those wiggly sensor traces to sentences that look like the ones above.

### What end-to-end generation looks like

![Reasoning trace: a 2-hour sensor window goes in, a DDR entry comes out](./blog/reasoning_trace.png)
*A 2-hour window spanning CIRCM → PACKER → DISPL → MONITOR. IndusTSLM reads the eight sensor channels and generates the DDR entry at the bottom, evaluated along three dimensions: numeric fidelity, factual alignment, and completeness.*

---

## Data cleaning is half the work

![DriMM contrastive alignment](./blog/drimm.png)

Before any modeling, both modalities go through a multi-stage pipeline:

**Sensor streams**
1. Gap interpolation for dropouts < 10 s.
2. Negative-value correction (forward-fill physically impossible readings).
3. Sanity checks against rated bounds; out-of-range samples flagged as missing.
4. Low-pass smoothing and unit standardization across wells and rigs.

**DDR text**
1. Acronym expansion (`RIH` → Run In Hole, `BHA` → Bottom Hole Assembly).
2. Sentence-structure and punctuation normalization.
3. Removal of entries without a sensor signature (safety meetings, crew changes).

**Rig state inference**
Per-timestep physics-based rules map four binary conditions (block direction, bit on bottom, pumps on, rotating) to **19 discrete rig states** at 1 Hz: a far finer temporal label than the 24-hour DDR.

---

## From sensors to language: what I explored in my thesis

The question my thesis asks is simple: **can the multimodal recipes that bridged vision and language also bridge industrial sensor streams and natural language?**

![VLM architecture families adapted to time series](./blog/vlm_arch.png)

I attacked it in three progressive stages:

### 1. DriMM: dual-encoder contrastive alignment

![DriMM contrastive training setup](./blog/drimm_teaser.png)
*Sensor windows and DDR sentences are embedded independently, then pulled together in a shared 256-d space with a symmetric InfoNCE loss.*

A CLIP-style model where a time-series encoder (Moirai or MOMENT) and a domain-adapted RoBERTa map sensor windows and DDR text into a shared 256-d space. Training objective: symmetric InfoNCE with **hard negative mining** from semantically similar but operationally distinct DDR entries. Result: up to +30 pp on linear probing over the pretrained time-series checkpoint, and ~8% average gain from hard negatives on retrieval / zero-shot / linear probing.

### 2. IndusTSLM: generative time-series language models

Two architectural paradigms on identical drilling data.

**LiveDrill** (soft prompting): live activity segmentation triggers DDR generation through a frozen LLM.

![LiveDrill multimodal text generation module](./blog/mtgm.png)
*A binary region-of-interest mask marks the most recent completed segment. The multivariate window is encoded, projected, and handed to the frozen LLM as soft tokens that condition DDR generation.*

**Flamingo variant** (cross attention): gated cross-attention layers inject time-series latents into the frozen LLM via a Perceiver Resampler, trained with a two-stage curriculum (activity-code classification → DDR generation).

![IndusTSLM Flamingo architecture adapted from OpenTSLM](./blog/opentslm_flamingo.png)
*Patches are compressed by a Perceiver Resampler into a fixed number of latent vectors. Gated cross-attention layers interleave inside the frozen LLM so memory stays near-constant regardless of input length.*

Evaluation uses an **LLM-as-judge** rubric with eight weighted criteria, validated against human expert ratings (ICC up to 0.864 for Qwen-72B).

### 3. DrillBench: a standardized benchmark
7 task types across 4 groups (classification, generation, physical reasoning, forecasting) built on public Volve Field and Utah FORGE data. Introduces a **knowledge-decoupling framework** that separates genuine sensor analysis from pretrained-knowledge recall: a real issue when commercial LLMs can answer drilling questions from memory without reading the signal.

---

## The obstacles that make drilling a great ML playground

### 1. Data quality and availability
Harsh environments cause sensor drift; communication dropouts create gaps; data is fragmented across WITSML servers and historians; labels are sparse (NPT events are rare).

### 2. Real-time and edge constraints
Decisions in seconds (kick detection); limited satellite bandwidth offshore; on-rig hardware.

### 3. Multimodal fusion
Sensors at 100 Hz, DDRs daily, seismic static, mud logs image-like. Temporal alignment and the semantic gap between raw signal and geological concept are both hard.

### 4. Rare event prediction
Stuck pipe, lost circulation, kicks are < 1% of time but operationally decisive. False-positive cost is high: operators tune out a noisy system.

### 5. Causal inference and interpretability
Many confounders (formation, equipment, operator skill, mud). Black-box models are a non-starter in a safety-critical domain.

### 6. Numeric fidelity in generative models
This is the open problem I keep hitting. Every architecture I tried reliably identifies the **type** of activity (primary-operation match ~0.6–0.7) but struggles with **numbers**: depth accuracy below 0.06, parameter fidelity below 0.04. The encoder preserves patterns but loses exact values, and the projection into LLM token space degrades them further.

---

## Why this matters

Drilling is a domain where data science can have enormous impact: safer operations, fewer lost days, faster wells: but the constraints are real:

- **Data** is noisy, sparse, fragmented, and proprietary.
- **Real-time** means edge deployment with latency and bandwidth limits.
- **Safety** is non-negotiable. Wrong predictions can blow out wells.
- **Domain complexity** demands close collaboration with engineers and geologists.

The combinations that seem to work are: domain expertise + physics-informed priors + robust methods + explainability + human-in-the-loop augmentation rather than replacement.

The future of drilling isn't just deeper and faster: it's more observable, and hopefully more honest about what the sensors actually say.

---

*This post distills background material from my M.Sc. thesis *IndusTSLM: Exploring Time-Series Language Models for Drilling Data* (MBZUAI, 2026), supervised by Dr. Salem Lahlou and Dr. Martin Takáč, in collaboration with [AIQ Intelligence](https://aiqintelligence.ai). Code and figures: [github.com/yehias21/IndusTSLM](https://github.com/yehias21/IndusTSLM).*
