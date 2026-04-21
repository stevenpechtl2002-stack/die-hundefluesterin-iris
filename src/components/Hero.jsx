import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, duration = 1800, decimals = 0) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setCount(parseFloat((ease * target).toFixed(decimals)))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, decimals])

  return { count, ref }
}

function StatItem({ target, suffix, label, decimals = 0, duration = 1600 }) {
  const { count, ref } = useCountUp(target, duration, decimals)
  return (
    <div ref={ref}>
      <p className="font-pacifico text-2xl" style={{
        background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</p>
      <p className="font-nunito text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</p>
    </div>
  )
}

export default function Hero() {
  const [ready, setReady] = useState(false)

  useEffect(() => { setReady(true) }, [])

  const stagger = (delay) => ({
    initial: { opacity: 0, y: 28 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── VIDEO: vollflächig im Hintergrund ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}>
        <video
          src="/hund.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dunkler Gradient-Overlay für Lesbarkeit */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.03) 100%)'
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 50%)'
      }} />

      {/* ── CONTENT ── */}
      <div className="relative max-w-7xl mx-auto px-8 md:px-16 py-24 w-full">
        <div className="max-w-xl">

          {/* Tag badge */}
          <motion.div {...stagger(0.1)} className="mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
              style={{ background: 'rgba(255,181,216,0.2)', border: '1px solid rgba(255,181,216,0.5)', backdropFilter: 'blur(12px)' }}>
              <span className="text-sm">🐾</span>
              <span className="font-nunito font-700 text-xs tracking-[0.25em] uppercase" style={{ color: '#FFB5D8' }}>Hundeschule · Karlsbad</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-pacifico leading-[1.05] mb-6 text-white"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            Die Hundeflüsterin<br />
            <span style={{
              background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Iris</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...stagger(0.42)}
            className="font-nunito font-400 mb-7 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', maxWidth: '38ch', color: 'rgba(255,255,255,0.85)' }}>
            Professionelle Hundeschule in Karlsbad — liebevolle Ausbildung für Ihren Vierbeiner.
          </motion.p>

          {/* Trust chips */}
          <motion.div {...stagger(0.52)} className="flex flex-wrap gap-2 mb-8">
            {['Erfahrene Trainerin', 'Positive Verstärkung', 'Alle Rassen'].map(chip => (
              <span key={chip} className="font-nunito font-600 text-xs px-3.5 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', backdropFilter: 'blur(8px)' }}>
                {chip}
              </span>
            ))}
          </motion.div>

          {/* Google badge + open */}
          <motion.div {...stagger(0.62)} className="flex flex-wrap items-center gap-3 mb-9">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
              <span className="font-nunito font-800 text-sm text-white">5.0</span>
              <span className="font-nunito text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>· 14 Bewertungen</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl"
              style={{ background: 'rgba(74,222,128,0.2)', border: '1px solid rgba(74,222,128,0.4)', backdropFilter: 'blur(8px)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px #4ade80' }} />
              <span className="font-nunito font-700 text-green-300 text-xs">Heute geöffnet</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div {...stagger(0.75)} className="flex flex-wrap gap-3">
            <motion.a href="#buchen"
              className="font-nunito font-800 text-sm px-8 py-4 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow: '0 8px 28px rgba(255,181,216,0.45)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 14px 44px rgba(255,181,216,0.65)' }}
              whileTap={{ scale: 0.97 }}>
              Termin buchen →
            </motion.a>
            <motion.a href="tel:01736853692"
              className="font-nunito font-700 text-sm px-7 py-4 rounded-2xl flex items-center gap-2 text-white"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(12px)' }}
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.25)' }}
              whileTap={{ scale: 0.97 }}>
              <span>📞</span> 0173 6853692
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div {...stagger(0.9)} className="flex gap-8 mt-10 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <StatItem target={200} suffix="+" label="Ausgebildete Hunde" duration={4000} />
            <StatItem target={10} suffix=" J." label="Erfahrung" duration={3500} />
            <StatItem target={5.0} suffix="★" label="Google Rating" decimals={1} duration={3000} />
          </motion.div>

        </div>
      </div>

      {/* Floating badges */}
      <motion.div
        className="absolute hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{
          right: '6%', top: '22%',
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.8 }}>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <div>
            <p className="font-nunito font-800 text-xs text-white">Profi-Training</p>
            <p className="font-nunito text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Alle Rassen</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{
          right: '10%', bottom: '20%',
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(197,181,234,0.4)', boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.15, duration: 0.8 }}>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
          className="flex items-center gap-2">
          <span className="text-xl">❤️</span>
          <div>
            <p className="font-nunito font-800 text-xs text-white">Positive Methoden</p>
            <p className="font-nunito text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Liebevoll & effektiv</p>
          </div>
        </motion.div>
      </motion.div>

    </section>
  )
}
