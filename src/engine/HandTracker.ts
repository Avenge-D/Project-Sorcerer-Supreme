import { Hands } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'

interface Hand {
  handedness: 'Left' | 'Right'
  landmarks: Array<{ x: number; y: number; z: number }>
}

type HandTrackerCallback = (hands: Hand[]) => void

export default class HandTracker {
  private hands: Hands
  private camera: Camera | null = null
  private callback: HandTrackerCallback
  private isRunning = false

  constructor(callback: HandTrackerCallback) {
    this.callback = callback

    this.hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      },
    })

    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    this.hands.onResults(this.onResults.bind(this))
  }

  private onResults(results: any): void {
    const hands: Hand[] = []

    if (results.multiHandLandmarks && results.multiHandedness) {
      for (let i = 0; i < results.multiHandLandmarks.length; i++) {
        hands.push({
          handedness: results.multiHandedness[i].label as 'Left' | 'Right',
          landmarks: results.multiHandLandmarks[i],
        })
      }
    }

    this.callback(hands)
  }

  public async start(): Promise<void> {
    if (this.isRunning) return

    try {
      const video = document.createElement('video')
      video.style.display = 'none'
      document.body.appendChild(video)

      this.camera = new Camera(video, {
        onFrame: async () => {
          await this.hands.send({ image: video })
        },
        width: 1280,
        height: 720,
      })

      await this.camera.initialize()
      this.camera.start()
      this.isRunning = true
    } catch (error) {
      console.error('Failed to initialize hand tracking:', error)
    }
  }

  public stop(): void {
    if (this.camera) {
      this.camera.stop()
    }
    this.isRunning = false
  }
}
