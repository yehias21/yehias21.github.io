# Academic Website

Source for [yehias21.github.io](https://yehias21.github.io). Built with Vite + React + TypeScript. Content lives in [src/data/content.ts](src/data/content.ts) and blog posts in [src/blog/](src/blog/).

## 🧭 Research Background

A year by year walk through how I got here, what I built, and what I learned.

### 2021. Underwater robotics and early perception work

I was leading the robotics and perception subteam on my undergraduate team's remotely operated underwater vehicle (ROV), built from scratch. We developed a model free 6-DoF multi phase feedback controller that gave the pilot three discrete control modes depending on the task: heavy load control (up to 2 kg payload), fine movement control, and fast maneuvering. On top of that we built a sub second camera to actuation feedback loop for fully autonomous movement.

Separately, I worked on a dark channel prior approach to preprocess the video input before segmentation. Underwater footage loses colors in a known order (red first), and the dark channel prior gave us a principled way to normalize the input before downstream perception.

### 2022. Scale graph research at DELL Technologies

I spent a full year at DELL Technologies on a pre LLM era internal research project: a deep research agent whose goal was to forecast the next financial trend and serve as an alpha signal for financial analysis. We designed a multi graph that mixed information signals across Twitter, Yahoo News, and a large citation authorship graph.

Because of the scale, I owned the citation graph: **10M nodes and 100M edges**, reproducing and extending the MIT Delphi work. I added signals from clusters, motifs, and communities, weighted each citation by where in the citing paper it appeared, and introduced a **temporal centrality** that mirrors PageRank with an extra *information diffusion factor* I coined: it captures the tree of citations up to a chosen depth. Papers were normalized by community and year to remove publication volume bias.

Working at that scale pushed me toward two questions I still care about: *idea synergy* (given a query and context, what solution can be composed?) and *human in the loop information composability*, how to aggregate signals across modalities when humans stay on the critical path.

### 2023. Federated recommender systems at Flower Labs (bachelor thesis)

I wanted to sharpen my systems and implementation skills, so I worked with Flower Labs on a **federated recommender system for implicit feedback with secure multi party computation**. With my team we integrated SecAgg with active signatures into the Flower framework, forked from main, working with Ray and Google Protobuf and adhering to the upstream code guidelines. We analyzed multiple aggregators.

My own focus was implementation and *personalization*. I implemented cPCA, then reformulated the personalization problem as a **sparse + dense representation split**: each client keeps its dense embedding locally and shares only the sparse part with the server. That construction gave us **+3% on our benchmark dataset** and became the core contribution of my thesis.

### 2024. Remote sensing at AIC (Applied Innovation Center)

At AIC, Egypt's national applied AI lab, I led the geospatial crop segmentation pipeline end to end: data annotation orchestration, training dataset and benchmark construction, and model training. The best model reached **~80% IoU** on our held out benchmark and was deployed internally.

### 2024–2025. Learned observers for non autonomous systems (with Dr. Muhamed Umar Niazi)

Working closely with Dr. Muhamed Umar Niazi, we extended **neural KKL observers to non autonomous systems**. I combined **curriculum learning** with **hypernetworks** so that the observer weights are generated as a function of the exogenous input signal, producing genuinely time varying transformation maps. We paused the project for a few months; the extended paper is targeted for **CDC 2026**, and an intermediate workshop paper has been accepted at the **ICLR 2026 Workshop on AI and PDE**.

### 2025. MBZUAI

- 🥇 **1st place** at the InSilico hackathon for drug discovery.
- 🥇 Collaborated with **Dr. Nils Lukas**'s team and won both tracks of the **NeurIPS 2024 *Erasing the Invisible*** watermark removal challenge (published at ICLR 2025 workshop).
- 🥇 At the **Rotman International Trading Competition** in Toronto, our team ranked **1st** in the Equities Trading Case.
- 🎓 Ranked **1st in my cohort** after the first semester, graduating with **Honored Distinction**.
- 📄 Co authored **SVRPBench**, accepted at **NeurIPS 2025 Datasets & Benchmarks** (main conference).
- 🛢️ Thesis with **AIQ Intelligence (G42 / ADNOC)** on multimodal time series + text. I started by extending the team's existing CLIP style alignment (DriMM) with hard negative mining, then proposed and implemented an encoder to decoder architecture (LiveDrill + Flamingo variant). The new pipeline yields an average **+30% improvement** over the CLIP baseline and led to **two NeurIPS 2025 workshop papers** plus an IEEE Big Data 2025 paper.

## 🧪 Research Questions I Care About

1. **Cross modal attention.** How do you let a model attend to information from a modality different from the one it was trained on?
2. **Human in the loop.** How do agents decide what information to surface, and when to ask a human? Active selection, composability, uncertainty.
3. **System modeling.** Modeling the dynamics of a system and modeling the *decision making* inside that system as two linked problems.
4. **Cross scale information extraction.** Pulling signal out of data that lives at very different temporal or physical scales.
5. **Building big systems.** End to end pipelines from sensors to language, from training to deployment.
