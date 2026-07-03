import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Wraps any element (typically a button) and gives it a subtle magnetic
 * pull toward the cursor on hover, snapping back with a spring on leave.
 * Does not change the child's markup, styling, or click behaviour.
 */
export default function Magnetic({ children, strength = 0.35, style = {} }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: 'inline-block', x: springX, y: springY, ...style }}
    >
      {children}
    </motion.div>
  )
}
