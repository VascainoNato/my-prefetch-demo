# Prefetch Demo - React Application

This project demonstrates the impact of **prefetching**, **caching**, and **polling** on frontend performance using React and the JSONPlaceholder API. It compares a traditional approach with no optimizations against an optimized version leveraging SWR for data fetching, cache management, and prefetching.

---

## Features

- **Single Query (Unoptimized):**  
  Fetches data on demand with no caching or prefetching. Each user interaction triggers a new API request.

- **Optimized with Prefetch, Cache & Polling:**  
  Uses SWR to prefetch data on hover, cache responses, and poll the server periodically to keep data fresh. This results in significantly faster load times and smoother user experience.

- **Performance Measurement:**  
  Includes timing measurements to compare load times between the two approaches.


---

## Technologies Used

- React  
- TypeScript  
- TailwindCSS  
- SWR (Stale-While-Revalidate)  
- JSONPlaceholder API (for test data)  

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)  
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/VascainoNato/my-prefetch-demo.git
cd my-prefetch-demo
Install dependencies:
bash
Copy Code
npm install
# or
yarn install
Run the development server:
bash
Copy Code
npm run dev
# or
yarn dev
Open your browser and navigate to http://localhost:3000 to see the app in action.
Usage
Explore the two sections on the page:
Single Query: Click on posts to fetch comments with no caching.
Optimized: Hover over posts to prefetch comments, then click to view instantly from cache.
Use Chrome DevTools and Lighthouse to measure and compare performance.
Live Demo
Try the live demo hosted on Vercel:
https://my-prefetch-demo.vercel.app/

Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

License
This project is licensed under the MIT License.