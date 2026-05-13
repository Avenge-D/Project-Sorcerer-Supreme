import { useEffect, useRef } from 'react'
import VFXEngine from './engine/VFXEngine'
import HandTracker from './engine/HandTracker'
import { useHandStore } from './store/handStore'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<VFXEngine | null>(null)
  const trackerRef = useRef<HandTracker | null>(null)
  const setHandState = useHandStore((state) => state.setHandState)

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize VFX Engine
    engineRef.current = new VFXEngine(canvasRef.current)

    // Initialize Hand Tracker
    trackerRef.current = new HandTracker((hands) => {
      setHandState(hands)
      if (engineRef.current) {
        engineRef.current.updateHands(hands)
      }
    })

    // Start tracking
    trackerRef.current.start()

    // Handle window resize
    const handleResize = () => {
      if (engineRef.current) {
        engineRef.current.resize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (trackerRef.current) {
        trackerRef.current.stop()
      }
      if (engineRef.current) {
        engineRef.current.dispose()
      }
    }
  }, [setHandState])

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ display: 'block' }}
      />
    </div>
  )
}
