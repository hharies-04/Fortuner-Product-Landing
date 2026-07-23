# Toyota Fortuner — Apple Style Landing Page

A cinematic, premium product landing page for the Toyota Fortuner SUV, designed in the signature **Apple (España) Style Reference** guidelines (often referred to as the "Obsidian Gallery Vitrine").

## 🌟 Key Features

*   **Obsidian Showroom Canvas**: Full-bleed near-black and pure black canvas backgrounds that let automotive photography stand out.
*   **Showroom Color Selector**: Interactive color picker dots allowing users to seamlessly view the Toyota Fortuner in *Titanium Gray*, *Obsidian Black*, *Bronze Copper*, and *Pearl White*.
*   **Smartwatch Complication Widget**: Fully interactive smartwatch dial mock featuring:
    *   SVG Circular fuel progress tracking.
    *   One-tap remote Engine Start sequence.
    *   Smart cabin HVAC pre-cooling controls.
    *   Interactive door lock state toggling.
*   **Apple Typographic Contrast**: Scaled headline hierarchy using the Inter font family with tight letter-spacing and compact line-heights.
*   **Clean Structural Depth**: Zero box-shadows, dropshadows, or CSS elevations. Architectural depth is created solely by contrasting surfaces (Pure Black, Carbon, Graphite, and Obsidian).
*   **Micro-Animations**: Under-the-hood scroll reveal triggers (fade-in slides) powered by vanilla Javascript `IntersectionObserver`.
*   **Fully Responsive**: Fluid layout transitions optimizing pages across desktop views, mobile browsers, and tablets.

---

## 🛠️ Tech Stack

*   **Structure**: Semantic HTML5 markup.
*   **Styling**: Pure CSS3 utilizing custom properties, Flexbox/Grid structures, and custom keyframes.
*   **Logic**: Lightweight vanilla ES6 Javascript with no external frameworks or libraries.
*   **Assets**: Premium desaturated lifestyle imagery and custom high-end automotive studio shots.

---

## 📂 Project Structure

```text
├── index.html         # Main web page structure & content
├── styles.css         # Apple design system style tokens & layout rules
├── script.js         # Interactive showroom, scroll reveals, and smartwatch simulator
└── images/            # Showcase images
    ├── fortuner_hero.png
    ├── fortuner_black.png
    ├── fortuner_bronze.png
    ├── fortuner_white.png
    ├── fortuner_adventure_bw.png
    └── fortuner_interior.png
```

---

## 🚀 Getting Started

1. Clone or download the repository to your local system.
2. Ensure the directory matches the structure above.
3. Open `index.html` in any modern web browser (Chrome, Safari, Firefox, Edge).
4. Scroll through the page to experience the animations and interact with the smartwatch remote widget and showroom color pickers.
