# eSkolar — Student Hub Prototype (POC)

A Proof-of-Concept (POC) platform that helps Filipino students discover, understand, and track scholarship opportunities in one centralized hub. This repository showcases the student-facing features only, intended for demo and validation.

> ⚠️ Prototype Disclaimer  
> Some features are partially functional or static. Scholarship, profile, and application data are preloaded via Supabase. The AI Chatbot + RAG system is fully functional using real USLS scholarship data (available to their main webpage). POC is not deployed, but can be viewed through the video demo.

---

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Student Features (POC)](#student-features-poc)
- [AI & RAG System](#ai--rag-system)
- [Data & Limitations](#data--limitations)
- [Purpose of the Prototype](#purpose-of-the-prototype)

---

## Overview
eSkolar is a platform built to centralize scholarship discovery, guidance, and application tracking for Filipino students. It combines a browsable scholarship directory, an AI-powered scholarship matching assistant, a student profile hub, and a fully working scholarship chatbot that leverages a retrieval-augmented generation (RAG) pipeline.

---

## Tech Stack
Frontend / App
- Next.js
- TypeScript
- Tailwind CSS
- Supabase (preloaded demo data)

AI & RAG System
- FastAPI (retrieval backend)
- ChromaDB (vector embeddings)
- GroqAI (LLM)
- Render (Deployment)

RAG Dataset (via Web Scraping)
- USLS (University of St. La Salle) scholarship listings 

---

### Proof of Concept Demo
[eSkolar MVP Demo](https://drive.google.com/file/d/1KpD7h_In4kY5nfU-9-cHWYvwhosbC63s/view?usp=sharing)

### Proposed Process Flow Diagram
[ESkolar Process Flow Diagram](https://i.imgur.com/RXEmhZT.png)
## Student Features
1. Student Profile & Portfolio
   - Centralized student academic identity
   - Basic info, academic standing
   - Achievements & awards
   - Extracurriculars & leadership
   - Skills & interests
   - Scholarship-related documents
   - POC Notes: Fields are editable for demo. All records loaded from Supabase. File section may contain placeholder actions.

2. AI-Generated Profile Summary
   - Auto-generated summary of a student’s profile:
     - Academics
     - Credentials
     - Extracurriculars
     - Skills & interests
   - POC Notes: Uses preloaded profile data + LLM summary generation.

3. Scholarship Browse & Search
   - Explore scholarships in a directory with:
     - Text search
     - Filters: course, type, deadline, grade cutoff, location
     - Clear eligibility & award details
     - Quick “See full details” access
     - Match indicators: Strong / Fair / Poor
   - POC Notes: Listings are static/preloaded. Filters and search are functional.

4. eRecommend — AI Scholarship Matching
   - Tailored scholarship recommendations consider:
     - Academic performance
     - Background & demographics
     - Extracurriculars
     - Financial need
     - Relevant courses
     - Location alignment
   - POC Notes: Matching logic is simplified; scoring visuals are for demonstration.

5. Scholarship Application Tracker
   - Track application statuses:
     - Submitted / Under Review / Completed / Accepted / Rejected
   - Compact table of applications and quick view of details
   - POC Notes: Statuses and histories are preloaded.

6. AI-Powered Scholarship Chatbot (Fully Working)
   - 24/7 assistant for scholarship navigation:
     - Answers requirements, deadlines, eligibility
     - Fetches info from USLS scholarship dataset
     - Provides step-by-step guidance
   - Powered by FastAPI + ChromaDB + GroqAI and deployed on Render
   - This is the only fully dynamic, live feature in the POC.

---

## Data & Limitations

| Area                     | Status        |
|-------------------------:|:-------------:|
| Student Profiles         | Preloaded     |
| Scholarship Listings     | Preloaded     |
| Application Tracker      | Preloaded     |
| Matching System          | Partially functional (UI demo) |
| File Upload              | Demo only     |
| Chatbot                  | Fully functional |

Notes:
- The POC uses preloaded demo data stored in Supabase. Some UI elements are demonstrative and not connected to full backend workflows (e.g., file uploads and provider dashboard).
- The AI Chatbot is the primary live component and uses real USLS scholarship data in the RAG pipeline.

---

## Purpose of the Prototype
This POC aims to validate:
- Student experience and platform usability
- AI-powered scholarship assistance
- Centralized scholarship discovery workflow

## About ByteMe!
**ByteMe!** is a team of student innovators from the University of St. La Salle, composed of student developers and innovators. As students, they combine technical expertise with fresh, user-centered perspectives in solving real educational challenges. Driven by the mission to make scholarships more accessible for all Filipinos, ByteMe developed this prototype as part of being a **Finalist (out of 400+ submissions!)** in **DAP: NextGenPH - Youth Innovators Re-imagining Public Service**.

Members:
- Javelona, Ignatius Warren Benjamin — Chief Executive Officer
- Octavio, John Roland — Chief Technology Officer
- Labistre, Josh Dane — Chief Marketing Officer 
- Javellana, Jul Leo — Full-Stack Developer  
- Tamayo, Raean Chrissean — Full-Stack Developer

Mentor:
- Mary Jade C. Jakosalem, LPT, MBA