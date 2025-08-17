---
# Leave the homepage title empty to use the site title
title: ""
date: 2024-12-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  # Biography section showing profile and call‑to‑action
  - block: resume-biography-3
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call‑to‑action button under your biography
      button:
        text: Download CV
        url: uploads/resume.pdf
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: stacked-peaks.svg
          filters:
            brightness: 1.0
          size: cover
          position: center
          parallax: false
  # Display recent events (life events)
  - block: collection
    id: events
    content:
      title: Life Events
      count: 3
      filters:
        folders:
          - events
    design:
      view: article-grid
      columns: 3
  # Personal research heading (optional)
  - block: markdown
    content:
      title: '📚 My Research 📚'
      subtitle: ''
      text: |-
        
    design:
      columns: '1'
  # Display recent research publications or work
  - block: collection
    id: research
    content:
      title: Recent Work
      count: 3
      filters:
        folders:
          - publication
    design:
      view: article-grid
      columns: 3
  # New section to highlight idea proposals
  - block: collection
    id: ideas
    content:
      title: Idea Proposals
      count: 3
      filters:
        folders:
          - idea-proposals
    design:
      view: article-grid
      columns: 3
  # Latest blog posts or news updates
  - block: collection
    id: news
    content:
      title: News
      subtitle: ''
      text: ''
      page_type: post
      count: 3
      filters:
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      offset: 0
      order: desc
    design:
      view: date-title-summary
      spacing:
        padding: [0, 0, 0, 0]
---