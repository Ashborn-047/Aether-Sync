# Aether-Sync // Shader[LAB]

![Aether-Sync-Hero](https://img.shields.io/badge/WebGL-2.0-cyan) ![Vite](https://img.shields.io/badge/Vite-Ready-purple) ![Three.js](https://img.shields.io/badge/Three.js-R160-white)

**Aether-Sync** is a high-performance WebGL visual system designed for next-generation user interfaces. More than just a collection of shaders, it is a cinematic dashboard exploration of mathematics, light, and procedural generation.

---

## ⚡ Core Features

- 🌌 **Cinematic Landing**: A high-contrast, HUD-inspired hero section with dynamic GLSL backgrounds.
- 📺 **Infinite Gallery**: A virtualized shader library using `IntersectionObserver` to manage WebGL contexts efficiently.
- 📟 **HUD Animation Engine**: Programmatic typewriter and "boot-loader" effects for authentic terminal aesthetics.
- 🧪 **Premium Micro-kernels**: 20+ curated fragment shaders ranging from VHS tracking to cosmic nebulas.
- 🛠️ **Modular Architecture**: Clean ES6 class-based renderer (`ShaderCanvas`) for easy integration into existing projects.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ashborn-047/Aether-Sync.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
```

---

## �️ Tech Stack & Architecture

### Graphics Engine
- **[Three.js (R160)](https://threejs.org/)**: Leveraged for its robust WebGL abstraction, scene graph management, and efficient renderer lifecycle.
- **WebGL 2.0**: Utilizing the power of modern GPUs for advanced fragment shading and high-performance rendering.
- **GLSL ES 3.0**: The language of the GPU. All micro-kernels are written in raw GLSL for maximum performance and visual precision.

### Frontend Infrastructure
- **[Vite](https://vitejs.dev/)**: Used as the lightning-fast build tool and dev server. It handles our hot-module replacement and production bundling with zero configuration.
- **Intersection Observer API**: The secret behind our "Infinite Gallery". It dynamically manages WebGL contexts by only rendering what's on screen, preventing browser crashes.
- **Vanilla CSS + Tailwind**: A blend of custom neon-noir styling for the HUD and Tailwind's utility-first classes for rapid layout adjustments.

---

## 📂 Deep Dive: Project Structure

Understanding the anatomy of Chroma Kinetics:

- **`src/core/ShaderCanvas.js`**: The heartbeat of the app. A reusable class that encapsulates the Three.js boilerplate (Scene, Camera, Renderer, Animation Loop, and Disposal).
- **`src/data/shaders.js`**: The central registry. It imports `.frag` files as raw strings and maps them to descriptive metadata (name, description, etc.).
- **`src/shaders/`**: A library of raw GLSL files. Each file is a standalone fragment shader that follows the internal uniform standard.
- **`src/styles/main.css`**: Contains our custom design system, including the `hero-shield` for text legibility, terminal flicker animations, and glassmorphism utilities.
- **`src/main.js`**: The orchestrator. It handles view transitions, HUD "boot-up" animations, and the virtualized gallery logic.

---

## 🏗️ Developer Usage Guide

### 1. How to add a New Shader
Adding your own visual creations is simple:
1. Create a new `.frag` file in `src/shaders/` (e.g., `my_shader.frag`).
2. Follow the standard uniforms: `u_time`, `u_resolution`, and `u_mouse`.
3. Import it in `src/data/shaders.js` and add an entry to the `shaders` array:
   ```javascript
   import myShaderCode from '../shaders/my_shader.frag?raw';
   // ...
   {
       id: 'my-shader',
       name: 'My Masterpiece',
       code: myShaderCode,
       desc: 'A brief description of the effect.'
   }
   ```

### 2. Using the `ShaderCanvas` Elsewhere
You can drop our renderer into any project:
```javascript
import { ShaderCanvas } from './core/ShaderCanvas';

const container = document.getElementById('my-container');
const shaderData = { code: 'void main() { ... }' };
const instance = new ShaderCanvas(container, shaderData, true); // true for mouse tracking

// To cleanup and free WebGL memory:
instance.dispose();
```

### 3. Modifying HUD Animations
The "boot-up" sequence is controlled in `src/main.js` within the `runHudAnimations()` method. You can adjust the `typewriter` speed or change the `logLines` to customize your system's personality.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Visualizing mathematics through light, code, and time.*
