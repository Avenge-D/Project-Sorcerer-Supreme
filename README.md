# 🪄 Sorcerer Supreme VFX Engine

A highly optimized, browser-native interactive application that uses real-time webcam multi-hand tracking to cast high-fidelity, particle-based magical VFX inspired by the mystic arts.
# My Project

🌐 Live Website: https://project-sorcerer-supreme.netlify.app

## Features
- Fast
- Responsive

## ✨ Features
- **Real-Time Hand Tracking:** Utilizes MediaPipe's computer vision models to accurately track up to two hands simultaneously at 60 FPS.
- **Dual-Wielding Spells:** Cast independent spells on each hand simultaneously.
- **Procedural 3D Geometry:** High-performance rendering via Three.js with additive blending, custom shaders, and thousands of chaotic particles.
- **Time-Scaled "Overload" Mechanic:** Spells dynamically scale in rotational velocity and glow intensity (up to 4x power) if held for more than 3 seconds.
- **Immersive Audio:** Dynamic Web Audio API synthesized soundscapes for each spell that fade in and out.

---

## 🖐️ Grimoire of Gestures

| Gesture | Description | VFX Effect | Interaction & Overload |
| :--- | :--- | :--- | :--- |
| **Flat Palm** 🖐️ | All 5 fingers extended facing the camera. | **Mandala Shield** (Yellow) | Rotate your wrist to counter-spin the shield's intricate inner geometry. |
| **Fist** ✊ | Hand closed tight. | **Fiery Portal** (Orange) | Thousands of chaotic, outward-bursting sparks shooting from a glowing portal ring. |
| **Two-Finger Twist** ✌️ | Index & Middle fingers extended. | **Time Rune** (Green) | Twist your two fingers like a dial to offset the spin of the temporal rings. |
| **Clap** 👏 | Bring both palms close together. | **Hexagram Flare** (Orange to Green) | *Combined Spell!* Fades out single-hand spells and blooms massive dual-hexagrams that shift color from orange to emerald green over 3 seconds while shooting sparks. |

> **Note:** Hold any spell for longer than 3 seconds to watch it *Overload*, increasing rotation speed and visual intensity exponentially.

---

## 🛠️ Technology Stack
- **Frontend:** React, TypeScript, TailwindCSS
- **State Management:** Zustand (for reactive, high-speed gesture states without re-rendering the Three.js canvas)
- **Computer Vision:** Google MediaPipe (`@mediapipe/hands`, `@mediapipe/camera_utils`)
- **Graphics Engine:** Three.js (WebGL rendering, BufferGeometries, PointsMaterials)
- **Build Tool:** Vite

---

## 🚀 Installation & Setup

**Prerequisites:** You must have [Node.js](https://nodejs.org/) installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/sorcerer-supreme.git
   cd sorcerer-supreme
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Cast your spells:**
   - Open `http://localhost:5173/` in your browser (Chrome or Edge recommended).
   - **Allow camera permissions** when prompted.
   - Step back slightly so your hands are clearly visible in the frame!

> **Note:** Access to the webcam API requires either a `localhost` environment or a secure `HTTPS` connection if deployed.

---

## 🏗️ Architecture Notes
The application utilizes a hybrid architectural approach to maximize performance:
- **React/Zustand layer** handles the UI state and the asynchronous camera/tracking loop. 
- **The VFXEngine** operates entirely outside of the React lifecycle. It subscribes to the Zustand store for lightning-fast coordinate updates and manages its own independent `requestAnimationFrame` loop, allowing the Three.js renderer to push maximum frames without being bottlenecked by React state reconciliations.

---

## ⚠️ Known Limitations
- The tracking relies on `@mediapipe/hands` running efficiently on your CPU/GPU. Ensure hardware acceleration is enabled in your browser.
- The camera requires adequate ambient lighting for accurate MediaPipe landmark tracking. Complex backgrounds or backlighting may cause the gesture classifier to flicker.
