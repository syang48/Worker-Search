# FleetWatch

**FleetWatch** is a high-density management dashboard designed for real-time worker monitoring and device tracking. This repository showcases the evolution from a static frontend prototype to a full-stack, mobile-responsive application.

---

## 🚀 Live Deployments

* **Modern Version (v2):** [View Live App](https://fleet-watch-v2.vercel.app) — *Built with Next.js, React, & MongoDB Atlas.*
* **Legacy Prototype (v1):** [View Comparison](https://sampsonyang.github.io/fleet-watch-v2/) — *Static HTML/JS prototype.*

---

## 🔄 The Technical Evolution

This project marks a complete migration from a "mock data" architecture to a persistent, server-side infrastructure.

### Version Comparison

| Feature | Legacy Version (`v1`) | Modern Version (`v2`) |
| :--- | :--- | :--- |
| **Tech Stack** | Vanilla HTML / CSS / JS | **Next.js 15 / React / TypeScript** |
| **Data Engine** | Static `sample-data.js` | **Live MongoDB Atlas Database** |
| **Styling** | Custom CSS | **Tailwind CSS (Utility-First)** |
| **Backend** | N/A | **Next.js Serverless API Routes** |
| **Search Logic** | Simple string match | **Multi-term space-separated filtering** |
| **Responsiveness** | Basic Desktop | **Fluid Mobile-First Grid** |

---

## 🛠️ Key Enhancements in v2

* **Dynamic Data Sync:** Real-time fetching via MongoDB, ensuring worker statuses and IDs are always accurate and persistent.
* **Advanced Multi-Filter:** The search engine allows for complex queries (e.g., searching for a specific company and a status like "Offline" simultaneously).
* **High-Density "ID Mode":** A UI toggle that optimizes the layout for monitoring large fleets by collapsing details into a compact view.
* **Refined Selection Engine:** A modernized selection UI with bulk "copy-to-clipboard" functionality for specific data fields (IDs, Phones, or full tab-separated rows).
* **Semantic Status UI:** Improved visual feedback with custom status styles, including a dedicated yellow warning state for "Degraded" workers.

---

## 📂 Project Structure

```text
.
├── app/                # Next.js App Router (React & API)
│   ├── api/workers/    # Backend: MongoDB Serverless Logic
│   └── page.tsx        # Frontend: Main Dashboard UI
├── legacy-v1/          # Original Static Files (v1)
├── public/             # Static Assets (Images/Icons)
├── .github/workflows/  # Automation: GitHub Actions for Legacy deployment
└── package.json        # Project Dependencies
