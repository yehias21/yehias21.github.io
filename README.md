# Academic Website

Source for [yehias21.github.io](https://yehias21.github.io). Built with Vite + React + TypeScript. Content lives in [src/data/content.ts](src/data/content.ts) and blog posts in [src/blog/](src/blog/).

## Research Background

A year by year walk through how I got here, what I built, and what I learned.

### 2021. Underwater robotics and early perception work

I was leading the robotics and perception subteam on my undergraduate team's remotely operated underwater vehicle (ROV), built from scratch. We developed a model free 6-DoF multi phase feedback controller that gave the pilot three discrete control modes depending on the task: heavy load control (up to 2 kg payload), fine movement control, and fast maneuvering. On top of that we built a sub second camera to actuation feedback loop for fully autonomous movement.

Separately, I worked on a dark channel prior approach to preprocess the video input before segmentation. Underwater footage loses colors in a known order (red first), and the dark channel prior gave us a principled way to normalize the input before downstream perception.

### 2022. Scale graph research at DELL Technologies

I spent a full year at DELL Technologies as a research intern on a pre LLM era internal research project: a deep research agent whose goal was to forecast the next financial trend and serve as an alpha signal for financial analysis. We designed a multi graph that mixed information signals across Twitter, Yahoo News, and a large citation authorship graph.

Because of the scale, I owned the citation graph: **10M nodes and 100M edges**, reproducing and extending the MIT Delphi work. I added signals from clusters, motifs, and communities, weighted each citation by where in the citing paper it appeared, and introduced a **temporal centrality** that mirrors PageRank with an extra *information diffusion factor* I coined: it captures the tree of citations up to a chosen depth. Papers were normalized by community and year to remove publication volume bias.

Working at that scale pushed me toward two questions I still care about: *idea synergy* (given a query and context, what solution can be composed?) and *human in the loop information composability*, how to aggregate signals across modalities when humans stay on the critical path.

### 2023. Federated recommender systems at Flower Labs (bachelor thesis)

I wanted to sharpen my systems and implementation skills, so I worked with Flower Labs on a **federated recommender system for implicit feedback with secure multi party computation**. With my team we integrated SecAgg with active signatures into the Flower framework, forked from main, working with Ray and Google Protobuf and adhering to the upstream code guidelines. We analyzed multiple aggregators.

My own focus was implementation and *personalization*. I implemented cPCA, then reformulated the personalization problem as a **sparse + dense representation split**: each client keeps its dense embedding locally and shares only the sparse part with the server. That construction gave us **+3% on our benchmark dataset** and became the core contribution of my thesis.

### 2024. Remote sensing at AIC (Applied Innovation Center)

At AIC, Egypt's national applied AI lab, I led the geospatial crop segmentation pipeline end to end: data annotation orchestration, training dataset and benchmark construction, and model training. The best model reached **~80% IoU** on our held out benchmark and was deployed internally.

### 2024–2025. Learned observers for non autonomous systems (HyperKKL)

We extended **neural KKL observers to non autonomous systems**: a hypernetwork generates the observer weights as a function of the exogenous input signal, producing genuinely time varying transformation maps. A workshop paper was accepted at the **ICLR 2026 Workshop on AI and PDE**.

### 2025. MBZUAI

- **1st place** at the InSilico hackathon for drug discovery.
- Collaborated with **Dr. Nils Lukas**'s team and won both tracks of the **NeurIPS 2024 *Erasing the Invisible*** watermark removal challenge (published at ICLR 2025 workshop).
- At the **Rotman International Trading Competition** in Toronto, our team placed in the **top 10** of the Liquidity Case.
- Ranked **1st in my cohort** after the first semester, graduating with **Honored Distinction**.
- Co authored **SVRPBench**, accepted at **NeurIPS 2025 Datasets & Benchmarks** (main conference).

### 2026. Thesis, benchmarks and agentic search

- **M.Sc. thesis (IndusTSLM)** with **AIQ Intelligence (G42 × ADNOC)**: teaching a language model to read raw drilling sensor streams and write the operator's daily report. Moving from CLIP style alignment to an encoder to decoder design (LiveDrill + Flamingo variant) gave an average **+30% improvement** and led to **two NeurIPS 2025 workshop papers** plus an IEEE Big Data 2025 paper.
- **DrillBench**, the first comprehensive benchmark for time series language models in drilling, with seven task types and **~150K instances** from the public Volve and Utah FORGE data. Its knowledge decoupling test checks whether a model actually reads the sensor signal or just recalls drilling facts.
- **TMLR extension of HyperKKL** with Dr. Muhamed Umar Niazi and Prof. Karl Henrik Johansson (KTH): a low rank hypernetwork conditions the observer on a fading memory summary of the input, with error bounds to match. It ships with **HyperKKL-Bench 2.0**, covering 13 input driven plants, 7 autonomous systems and real data tracks.
- **Agentic search as a POMDP** *(in progress)*: framing an agent's search over information as a partially observable decision problem. What to look at next becomes a decision under uncertainty instead of a fixed retrieval pipeline.
- **Open source for Open Design** *(in progress)*: contributing to the Open Design open source project. More details once the first contributions land.

## Research Questions I Care About

1. **Cross modal attention.** How do you let a model attend to information from a modality different from the one it was trained on?
2. **Human in the loop.** How do agents decide what information to surface, and when to ask a human? Active selection, composability, uncertainty.
3. **System modeling.** Modeling the dynamics of a system and modeling the *decision making* inside that system as two linked problems.
4. **Cross scale information extraction.** Pulling signal out of data that lives at very different temporal or physical scales.
5. **Building big systems.** End to end pipelines from sensors to language, from training to deployment.