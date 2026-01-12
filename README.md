# 🎧 Lumina - Premium Headphones Showcase

A modern, interactive product showcase website for premium wireless headphones featuring stunning WebGL animations, smooth scroll effects, and a sleek dark theme design.

![Lumina Preview](assets/lumina-logo-white.png)

## ✨ Features

- **5 Premium Headphone Variants** - Matte Black, Royal Gold, Sterling Silver, Midnight Blue, Deep Forest
- **WebGL Animated Background** - Beautiful rainbow mist shader effect
- **Smooth Scroll Navigation** - CSS scroll-snap with optional smooth scrolling
- **3D Product Interactions** - Mouse-follow tilt effect on product images
- **GSAP Animations** - Smooth entrance animations and micro-interactions
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **Accessibility Ready** - ARIA labels, skip links, reduced motion support
- **Dark Theme** - Premium dark aesthetic with gradient accents

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom properties, animations, scroll-snap
- **JavaScript (ES6+)** - Modular architecture
- **GSAP** - Animation library
- **Three.js** - WebGL shader background
- **Vitest** - Testing framework

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/sachinsaroj/lumina-headphones.git
```

2. Navigate to project directory
```bash
cd lumina-headphones
```

3. Install dependencies
```bash
npm install
```

4. Open `index.html` in your browser or use a local server
```bash
npx serve .
```

## 📁 Project Structure

```
lumina-headphones/
├── assets/                 # Product images and logo
│   ├── headphone-black.png
│   ├── headphone-gold.png
│   ├── headphone-silver.png
│   ├── headphone-blue.png
│   ├── headphone-green.png
│   └── lumina-logo-white.png
├── index.html              # Main HTML file
├── style.css               # Styles and animations
├── main.js                 # Application entry point
├── webgl-shader.js         # WebGL background shader
├── product-adapter.js      # Product rendering logic
├── product-data.js         # Product information
├── runtime-controller.js   # Performance detection
├── error-handler.js        # Error handling utilities
└── package.json            # Project dependencies
```

## 🎨 Color Variants

| Variant | Theme Color | Price |
|---------|-------------|-------|
| Matte Black | `#1f1f1f` | $340 |
| Royal Gold | `#d4af37` | $380 |
| Sterling Silver | `#c0c0c0` | $340 |
| Midnight Blue | `#4f86f7` | $340 |
| Deep Forest | `#4ade80` | $340 |

## ⚡ Performance Features

- Lazy loading for images
- Runtime capability detection
- Reduced motion support for accessibility
- Optimized WebGL shader
- Debounced scroll handlers

## 🧪 Running Tests

```bash
npm test
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 👨‍💻 Author

**Sachin Saroj**

- GitHub: [@sachinsaroj](https://github.com/sachinsaroj)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ If you like this project, give it a star on GitHub!
