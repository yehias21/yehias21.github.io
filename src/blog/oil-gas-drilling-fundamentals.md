# Oil & Gas Drilling: From Bits to Bytes

*A field guide to drilling operations, sensors, and why this domain is such a rich testbed for time-series foundation models. Drawn from my M.Sc. thesis on IndusTSLM with AIQ Intelligence.*

![IndusTSLM: time-series language models for drilling data.](./blog/industslm_logo.gif)

---

## Why drilling is one of the most data-intensive industrial processes on Earth

![A rotary rig. The eight sensor channels map one-to-one onto these surface components.](./blog/drilling.png)

A single wellbore generates on average **700,000 sensor measurements per day**, recorded at up to 1 Hz across channels that monitor mechanical forces, hydraulic pressures, rotational speeds, and depth progression. Over a typical campaign spanning multiple wells and several years, this produces **billions of timestamped observations** encoding the full operational history of the rig.

Concurrently, drilling engineers produce **Daily Drilling Reports (DDRs)**: concise natural language summaries documenting the activities performed during each shift, the depths reached, the equipment used, and any anomalies encountered.

Despite the richness of these paired data streams, the industry still relies heavily on manual interpretation. Experienced engineers read sensor traces, cross-reference them with operational logs, and compose DDR entries by hand. That is expensive, time-consuming, and dangerously slow during stuck-pipe incidents or unexpected pressure transients. It is also exactly where modern multimodal ML can help.

---

## What is oil and gas drilling?

Drilling creates a borehole (a *wellbore*) that penetrates rock formations to access hydrocarbon reservoirs, sometimes several kilometers below the surface. Four broad families:

1. **Exploration (wildcat) drilling**: unproven areas to discover new reserves.
2. **Development drilling**: additional wells in proven fields.
3. **Directional drilling**: at angles to reach reserves not directly below the rig.
4. **Horizontal drilling**: along the reservoir layer to maximize contact area.

### The drilling process in four phases

**Phase 1: Planning.** Geological surveys, seismic analysis, and environmental review feed a detailed well plan: target depth and trajectory, casing design, mud weight, expected formations, and safety procedures.

**Phase 2: Rig setup.** Derrick, drawworks, rotary table / top drive, mud pumps, and the blowout preventer (BOP).

**Phase 3: Drilling.** This is the loop the sensors capture: *spud in* (first penetration), *drilling ahead* (monitored through ROP, WOB, RPM, torque, SPP), *tripping* (pulling the drill string out and back in for bit changes, casing runs, or logging), *casing and cementing* (successive steel casings, conductor → surface → intermediate → production, cemented to stabilize the well and isolate zones), *Total Depth* (target reached).

**Phase 4: Completion.** Production tubing, perforation, packers, safety valves, well testing.

---

## Activity codes: the language of drilling time

Operations are tracked with standardized **activity codes** that feed the DDR. After consolidating notation variants, our proprietary ADNOC dataset contained **61 unique codes** and **491 sub-codes**. A short tour of the dominant ones:

| Code | Meaning | Share | | Code | Meaning | Share |
|---|---|---|---|---|---|---|
| `DRILL` | Rotary or slide drilling | 16.5% | | `LOG` | Wireline or MWD logging | 4.1% |
| `TRIP` | Run in / pull out of hole | 15.2% | | `CIRC` | Circulating drilling fluid | 4.0% |
| `CM` | Corrective maintenance | 8.8% | | `BOP` | BOP operations | 3.6% |
| `CSG` | Running / pulling casing | 6.5% | | `FISH` | Fishing operations | 3.4% |
| `WAIT` | Waiting (weather, orders) | 4.1% | | `CMT` | Cementing | 2.9% |

The distribution is **heavily imbalanced**. DRILL + TRIP alone account for nearly a third of all timesteps, while many codes contribute less than 1%. About 12% of timesteps are unlabeled. The label space also contains spelling inconsistencies (`DRILL`/`DRIL`, `RIGMT`/`RGMT`/`RIGMNT`) that need canonicalization before any training can happen.

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

![A real ~3.3 hour window from well BB-1282 (16" hole section). Shaded regions mark DRILL → TRIP → CIRC transitions. Each activity leaves a distinct fingerprint across the eight channels.](./blog/sensor_timeseries.png)

During **DRILL**, weight on bit stays elevated, surface torque is active, mud flow rate and standpipe pressure are high, and bit depth increases steadily. During **TRIP**, weight on bit drops to zero, and hook load and block position exhibit the sawtooth pattern associated with pipe handling. During **CIRC**, the hydraulic system remains active but all mechanical drilling indicators sit near zero. This contrast is precisely what makes a learnable mapping between sensor trajectories and language possible.

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

![A 2-hour window spanning CIRCM → PACKER → DISPL → MONITOR. IndusTSLM reads the eight sensor channels and generates the DDR entry at the bottom, evaluated along three dimensions: numeric fidelity, factual alignment, and completeness.](./blog/reasoning_trace.png)

---

## Data cleaning is half the work

Before any modeling, both modalities go through a multi-stage pipeline.

**Sensor streams** get (1) gap interpolation for dropouts under 10 s, (2) negative-value correction (forward-fill physically impossible readings), (3) sanity checks against rated bounds, and (4) low-pass smoothing with unit standardization across wells and rigs.

**DDR text** gets (1) acronym expansion (`RIH` → Run In Hole, `BHA` → Bottom Hole Assembly), (2) sentence-structure and punctuation normalization, and (3) removal of entries without a sensor signature (safety meetings, crew changes).

**Rig state inference.** Per-timestep physics-based rules map four binary conditions (block direction, bit on bottom, pumps on, rotating) to **19 discrete rig states** at 1 Hz. That is a much finer temporal label than the 24-hour DDR and serves as cheap supervision for segmentation.

---

## From sensors to language: what I built in the thesis

The thesis asks a simple question: **can the multimodal recipes that bridged vision and language also bridge industrial sensor streams and natural language?**

![The four VLM architecture families that map one-to-one onto the time-series case: encoder-decoder, dual-encoder, cross-modal, and natively multimodal.](./blog/vlm_arch.png)

The analogy to vision-language models is exact. CLIP-style dual encoders teach us how to share a semantic space between modalities. Flamingo teaches us how to bolt a new modality onto a frozen LLM through gated cross-attention. LLaVA teaches us how to inject visual tokens via a single linear projector. OpenTSLM (2026) already made the parallel explicit for healthcare time series. I carried the same patterns over to industrial drilling and measured what actually works.

### 1. DriMM: dual-encoder contrastive alignment

![DriMM contrastive training: sensor windows and DDR sentences embed independently, then get pulled together in a shared 256-d space with a symmetric InfoNCE loss.](./blog/drimm_teaser.png)

A CLIP-style model. A time-series encoder (Moirai or MOMENT, frozen pretrained) and a domain-adapted RoBERTa map sensor windows and DDR text into a shared 256-d space, then ℓ₂-normalize. Training is symmetric InfoNCE. I extended the baseline with **hard negative mining**: a small LLM (Phi-3.5 mini) scores all DDR pairs for semantic similarity, picks k=5 entries that are textually close but belong to a different activity code, and injects them into each training batch. The goal is to force the model to learn the sensor-level distinction between *RIH to 5,200 ft* and *POOH from 5,350 ft*, which share vocabulary but correspond to opposite tripping directions.

**Results.** Three evaluation axes, 145,715 paired samples from 1,787 time series, 80/20 split by distinct wells to block leakage:

| | Retrieval F1@10 | Zero-shot (9-class) | Linear probing (9-class) |
|---|---|---|---|
| Moirai-L + DriMM | 55.5% | 26.3% | 74.1% |
| MOMENT-L + DriMM | 37.0% | 24.4% | **72.2% (+30.7 pp over init)** |
| Moirai-L + hard negatives | 60.1% | 29.4% | 79.3% |
| MOMENT-L + hard negatives | 40.2% | 27.5% | 77.4% |

Two patterns stand out. First, multimodal pretraining dramatically improves representational quality: MOMENT-Large jumps from **41.5% → 72.2%** on 9-class linear probing (+30.7 pp) without the classifier ever seeing text. Second, hard negatives add another **+4 to +5 pp** on top across all axes. There is also a clear tradeoff: freezing the text encoder preserves pretrained priors and boosts zero-shot classification (up to 75.7% on 3 classes) at the cost of pair-level retrieval, while fine-tuning has the opposite effect.

### 2. IndusTSLM: generative time-series language models

Two architectures on identical data.

**LiveDrill** uses *soft prompting*. A lightweight CNN segmentation module watches the stream and marks boundaries; when a segment completes, a region-of-interest mask hands the encoded window to a frozen LLM as soft tokens that condition DDR generation.

![LiveDrill multimodal text generation module. A binary ROI mask marks the most recent completed segment. The multivariate window is encoded, projected, and passed to the frozen LLM as soft tokens.](./blog/mtgm.png)

**The Flamingo variant** uses *cross attention*. A Perceiver Resampler compresses the time-series patches into a small fixed set of latents, and gated cross-attention layers interleaved inside the frozen LLM attend to those latents during generation. Training follows OpenTSLM's two-stage curriculum, adapted to real drilling data instead of synthetic series: Stage 1 learns activity-code classification as encoder warmup; Stage 2 unlocks free-form DDR generation.

![IndusTSLM Flamingo architecture. Patches are compressed by a Perceiver Resampler into a fixed number of latent vectors. Gated cross-attention layers interleave inside the frozen LLM so memory stays near-constant regardless of input length.](./blog/opentslm_flamingo.png)

**Evaluation is non-trivial.** Standard lexical metrics (BLEU, ROUGE) are useless here: DDRs are telegraphic, domain-specific, and shuffle order freely. I use **LLM-as-judge** with an eight-criterion rubric weighted by domain experts (primary operation match at 50%, depth match at 12.5%, conciseness / all-ops match / parameter match / hole size / BHA type / other details at 6.25% each). The protocol was validated against human expert ratings:

| Judge | Prompt | ICC(2,1) | Pearson | MAE |
|---|---|---|---|---|
| Llama-3-8B | multi-criteria | 0.544 | 0.579 | 0.258 |
| Llama-3-70B | multi-criteria | **0.769** | 0.781 | **0.174** |
| Qwen-2.5-72B | multi-criteria | **0.864** | **0.866** | **0.117** |

Externally-aggregated multi-criteria scoring is the most reliable protocol, but only at 70B+ scale. With smaller judges it amplifies noise (the 8B's ICC collapses from 0.72 under minimal prompts to 0.54 under structured rubrics). I settle on **Llama-3-70B-MC** as the standard throughout the thesis.

### Head-to-head results

Text generation scores (normalized 0–1, best per row **bold**):

| Architecture | TS Encoder | LLM | CM | CMT | DRILL | TRIP | Avg |
|---|---|---|---|---|---|---|---|
| Soft Prompt | CNN | Phi-3 (frozen) | 0.226 | 0.321 | 0.517 | 0.315 | 0.367 |
| Soft Prompt | MOMENT | Phi-3 (frozen) | 0.122 | 0.214 | 0.516 | 0.221 | 0.346 |
| Cross-Attn | scratch | Phi-3 | 0.198 | 0.296 | 0.489 | 0.298 | 0.343 |
| Cross-Attn | Chronos-2 | Phi-3 | **0.237** | **0.338** | **0.541** | **0.329** | **0.381** |

Combined with the segmentation bottleneck (CNN LSM at F1IoU = 0.510), the full system peaks at **0.436** under the harmonic mean — just ahead of soft prompting at 0.427. Two observations survive the setup:

**The encoder matters more than the fusion mechanism.** A lightweight CNN trained on drilling data beats the much larger MOMENT foundation model across both paradigms. Drilling dynamics (bit-depth progression, hook-load cycling, pressure transients) seem underrepresented in general-purpose TSFM pretraining corpora. Chronos-2 initialization on top of cross-attention adds a consistent +0.037, hinting that forecasting-pretrained encoders carry useful temporal primitives even when the domain adapter does the heavy lifting.

**Cross-attention scales better but wins by a small margin.** The memory argument is real: soft prompting's token count grows with input length while the Perceiver latent count is fixed. But on this task the quality gap is only +0.014. The real bottleneck is elsewhere.

### 3. DrillBench: a standardized benchmark

DrillBench is the first comprehensive benchmark for TSLMs in drilling. Seven task types across four groups (**classification, generation, physical reasoning, forecasting**), roughly 150,000 instances built from the public Volve Field and Utah FORGE datasets. Split at the well level to prevent leakage.

The distinctive piece is the **knowledge-decoupling framework**. Counterfactual-reasoning tasks come with a prompt-only baseline that strips the sensor data and keeps only the textual context; if a model's sensor-informed accuracy is not meaningfully above its prompt-only accuracy, the model is just recalling memorized drilling facts instead of reading the signal. Baseline numbers on the stratified evaluation subset show exactly this failure mode:

| Model | Prompt-only | +Sensor | ∆ |
|---|---|---|---|
| Claude 3.5 Sonnet | 63.2 | 68.8 | +5.6 |
| Gemini-3-Flash | 62.5 | 66.5 | +4.0 |
| GPT-4o | 58.8 | 62.1 | +3.3 |
| Qwen3-VL (30B, A3B) | 52.4 | 56.8 | +4.4 |
| IndusTSLM (zero-shot) | 50.2 | 54.2 | +4.0 |
| **IndusTSLM (SFT)** | 53.8 | **72.5** | **+18.7** |

Commercial LLMs answer these questions mostly from prior knowledge (Δ below +6 pp, binary chance = 50%). Only after instruction tuning does IndusTSLM's gap widen to +18.7, which says the fine-tuned model is genuinely reading the sensor. The same picture holds on the full benchmark average: Claude leads zero-shot at 51.2%, but instruction-tuned IndusTSLM climbs to **70.8%**, with the largest gains on classification (+34 pp) and segmentation (+35 pp). Generation gains less because of the issue discussed next.

---

## The one gap that stays open

Every architecture I tried reliably identifies the **type** of activity (primary-operation match between 0.52 and 0.65 zero-shot, 0.73 fine-tuned) but struggles with **numbers**. Depth-match accuracy stays below 0.06 zero-shot and 0.19 fine-tuned. Parameter fidelity stays below 0.04 zero-shot and 0.13 fine-tuned. The encoder learns the *shape* of what happened; the specific quantities get smeared through the patching, pooling, and projection pipeline, and the next-token objective treats all tokens equally so numeric tokens never get privileged.

This is the real open problem in industrial TSLMs. Getting the model to confidently say *"drilled from 2,231 m to 2,243 m"* rather than *"drilled an interval"* likely requires one of: number-aware tokenization, auxiliary regression heads that predict key quantities alongside the LM loss, or retrieval-augmented generation that grounds numeric claims in the actual sensor window. I think that is the direction the next paper has to go.

---

*This post distills background material and the headline findings from my M.Sc. thesis *IndusTSLM: Exploring Time-Series Language Models for Drilling Data* (MBZUAI, 2026), supervised by Dr. Salem Lahlou and Dr. Martin Takáč, in collaboration with [AIQ Intelligence](https://aiqintelligence.ai). Code and figures: [github.com/yehias21/IndusTSLM](https://github.com/yehias21/IndusTSLM).*
