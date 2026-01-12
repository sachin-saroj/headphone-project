/**
 * Main Application Module
 * Coordinates all application functionality
 */

import { runtime } from './runtime-controller.js'
import { ProductAdapter } from './product-adapter.js'
import { getAllProducts } from './product-data.js'
import { errorHandler } from './error-handler.js'

/**
 * Main Application Class
 */
class App {
  constructor() {
    this.runtime = runtime
    this.adapter = ProductAdapter
    this.initialized = false
  }

  /**
   * Initialize application
   */
  async init() {
    try {
      console.log('🚀 Lumina Headphones - Initializing...')

      // Wait for DOM
      await this.waitForDOM()

      // Check runtime capabilities
      const runtimeState = this.runtime.getState()
      console.log('📊 Runtime Score:', runtimeState.score)
      console.log('🎯 Performance decisions:', runtimeState.decisions)

      // Load product data
      const productData = getAllProducts()

      // Render products with error handling
      const renderResult = this.adapter.renderAllProducts({
        products: productData,
      })

      if (!renderResult.success) {
        throw new Error(renderResult.error)
      }

      console.log(
        '✅ Products rendered:',
        renderResult.successful,
        '/',
        renderResult.total
      )

      // Initialize features based on capabilities
      if (runtimeState.decisions.allowAnimations) {
        this.initializeAnimations()
      }

      if (runtimeState.decisions.allowWebGL) {
        this.initializeWebGL()
      }

      // Setup scroll functionality
      this.initializeScroll()

      this.initialized = true
      console.log('🎉 Application initialized successfully')
    } catch (error) {
      console.error('❌ Application initialization failed:', error)
      errorHandler.report(error, { phase: 'initialization' })
      this.showFallbackUI(error)
    }
  }

  /**
   * Wait for DOM to be ready
   */
  waitForDOM() {
    return new Promise(resolve => {
      if (
        document.readyState === 'complete' ||
        document.readyState === 'interactive'
      ) {
        resolve()
      } else {
        document.addEventListener('DOMContentLoaded', resolve)
      }
    })
  }

  /**
   * Initialize animations (GSAP)
   */
  initializeAnimations() {
    try {
      // Check if GSAP is available
      if (typeof window.gsap !== 'undefined') {
        // Import and initialize GSAP features
        this.loadGSAPAnimations()
        console.log('✨ Animations enabled')
      } else {
        console.warn('⚠️ GSAP not available - animations disabled')
      }
    } catch (error) {
      errorHandler.report(error, { phase: 'animations' })
    }
  }

  /**
   * Load GSAP animations
   */
  loadGSAPAnimations() {
    // Animation timeline creation
    const introTL = window.gsap.timeline({ defaults: { ease: 'power3.out' } })

    introTL
      .from('.product-section', { opacity: 0, duration: 0.8 })
      .from('.info h2', { y: 40, opacity: 0, duration: 0.5 }, '-=0.4')
      .from(
        '.info p, .mini-label, .specs-row, .buy-btn',
        {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.25,
        },
        '-=0.2'
      )
      .from(
        '.main-img',
        {
          scale: 0.9,
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.5'
      )

    // Start floating animation for main image
    introTL.eventCallback('onComplete', () => {
      if (this.runtime.isAllowed('allowHeavy')) {
        window.gsap.to('.main-img', {
          y: 10,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    })

    // Mouse interaction for desktop
    if (window.innerWidth > 1024 && this.runtime.isAllowed('allowHeavy')) {
      this.setupMouseInteractions()
    }

    // Button interactions
    this.setupButtonInteractions()
  }

  /**
   * Setup mouse interactions for 3D effect
   */
  setupMouseInteractions() {
    const productImages = document.querySelectorAll('.main-img')

    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12
      const y = (e.clientY / window.innerHeight - 0.5) * -12

      productImages.forEach(img => {
        window.gsap.to(img, {
          rotateY: x,
          rotateX: y,
          duration: 0.25,
          overwrite: true,
          transformPerspective: 1000,
          transformStyle: 'preserve-3d',
        })
      })
    })

    document.addEventListener('mouseleave', () => {
      productImages.forEach(img => {
        window.gsap.to(img, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
        })
      })
    })
  }

  /**
   * Setup button hover interactions
   */
  setupButtonInteractions() {
    const buttons = document.querySelectorAll('.buy-btn, .cart-btn')

    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        window.gsap.to(btn, { scale: 1.06, duration: 0.25 })
      })

      btn.addEventListener('mouseleave', () => {
        window.gsap.to(btn, { scale: 1, duration: 0.25 })
      })

      btn.addEventListener('mousedown', () => {
        window.gsap.to(btn, { scale: 0.94, duration: 0.1 })
      })

      btn.addEventListener('mouseup', () => {
        window.gsap.to(btn, { scale: 1.06, duration: 0.1 })
      })
    })
  }

  /**
   * Initialize WebGL background
   */
  initializeWebGL() {
    try {
      // Check if Three.js is available
      if (typeof window.THREE !== 'undefined') {
        // WebGL initialization would go here
        console.log('🎨 WebGL available')
      } else {
        console.warn('⚠️ Three.js not available - WebGL disabled')
      }
    } catch (error) {
      errorHandler.report(error, { phase: 'webgl' })
    }
  }

  /**
   * Initialize scroll behavior
   */
  initializeScroll() {
    // Native scroll behavior with CSS scroll-snap
    console.log('📜 Scroll initialized')
  }

  /**
   * Show fallback UI on errors
   * @param {Error} error - The error that occurred
   */
  showFallbackUI(error) {
    const fallbackHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #1a1a1a;
        color: white;
        padding: 32px;
        border-radius: 12px;
        text-align: center;
        max-width: 400px;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <h2 style="margin: 0 0 16px 0;">⚠️ Loading Error</h2>
        <p style="margin: 0 0 24px 0; color: #ccc;">
          We encountered an issue loading the content. Please refresh the page.
        </p>
        <button onclick="location.reload()" style="
          background: #ffd166;
          color: #000;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        ">
          Refresh Page
        </button>
      </div>
    `

    document.body.innerHTML = fallbackHTML
  }
}

// Initialize application when DOM is ready
const app = new App()
app.init()
