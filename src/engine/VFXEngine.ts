import * as THREE from 'three'

interface Hand {
  handedness: 'Left' | 'Right'
  landmarks: Array<{ x: number; y: number; z: number }>
}

export default class VFXEngine {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private cube: THREE.Mesh
  private particles: THREE.Points | null = null
  private animationId: number | null = null
  private hands: Hand[] = []

  constructor(canvas: HTMLCanvasElement) {
    // Scene setup
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    )
    this.camera.position.z = 5

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0x000000, 1)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(10, 10, 10)
    this.scene.add(pointLight)

    // Create test cube
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      emissive: 0x00aa00,
    })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

    // Create particle system
    this.createParticles()

    // Start animation loop
    this.animate()
  }

  private createParticles(): void {
    const particleCount = 1000
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40
      positions[i + 1] = (Math.random() - 0.5) * 40
      positions[i + 2] = (Math.random() - 0.5) * 40
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0xff00ff,
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    })

    this.particles = new THREE.Points(geometry, material)
    this.scene.add(this.particles)
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate)

    // Rotate cube
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    // Rotate particles
    if (this.particles) {
      this.particles.rotation.x += 0.0005
      this.particles.rotation.y += 0.0005
    }

    this.renderer.render(this.scene, this.camera)
  }

  public updateHands(hands: Hand[]): void {
    this.hands = hands
    // Hands will be used for future spell effects
  }

  public resize(width: number, height: number): void {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  public dispose(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
    }
    this.renderer.dispose()
  }
}
