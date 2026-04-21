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
      <p className="font-pacifico text-xl" style={{
        background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</p>
      <p className="font-nunito text-xs mt-0.5" style={{ color: '#7a6b8a' }}>{label}</p>
    </div>
  )
}

export default function Hero() {
  const [ready, setReady] = useState(false)

  useEffect(() => { setReady(true) }, [])

  const stagger = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section id="home" className="relative overflow-hidden" style={{ height: '100vh' }}>

      {/* VIDEO vollflächig */}
      <motion.div className="absolute inset-0"
        initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 1.2 }}>
        <video src="/hund.mp4" autoPlay loop muted playsInline
          className="w-full h-full object-cover" style={{ filter: 'brightness(0.85)' }} />
      </motion.div>

      {/* CONTENT — zentriert, mit Navbar-Abstand oben */}
      <div className="relative h-full flex items-center" style={{ paddingTop: '72px' }}>
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
          <div style={{ display: 'inline-block', width: '400px', maxWidth: '92vw' }}>
            <div className="rounded-3xl p-5 md:p-6" style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)'
            }}>

              {/* Badge */}
              <motion.div {...stagger(0.1)} className="mb-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                  style={{ background: 'rgba(255,181,216,0.2)', border: '1px solid rgba(255,181,216,0.5)' }}>
                  <span className="text-xs">🐾</span>
                  <span className="font-nunito font-700 text-xs tracking-[0.2em] uppercase" style={{ color: '#FFB5D8' }}>Hundeschule · Karlsbad</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="font-pacifico leading-[1.05] mb-3"
                style={{ fontSize: 'clamp(1.9rem, 3.5vw, 3.5rem)', color: '#1a1025' }}
                initial={{ opacity: 0, y: 30 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                Die Hundeflüsterin<br />
                <span style={{
                  background: 'linear-gradient(135deg, #FFB5D8, #C5B5EA)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>Iris</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p {...stagger(0.35)}
                className="font-nunito font-400 mb-3 leading-relaxed text-sm"
                style={{ color: '#3a2a4a' }}>
                Professionelle Hundeschule in Karlsbad — liebevolle Ausbildung für Ihren Vierbeiner.
              </motion.p>

              {/* Trust chips */}
              <motion.div {...stagger(0.45)} className="flex flex-wrap gap-1.5 mb-3">
                {['Erfahrene Trainerin', 'Positive Verstärkung', 'Alle Rassen'].map(chip => (
                  <span key={chip} className="font-nunito font-600 text-xs px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.5)', color: '#3a2a4a' }}>
                    {chip}
                  </span>
                ))}
              </motion.div>

              {/* Google badge + open */}
              <motion.div {...stagger(0.55)} className="flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.35)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div className="flex text-yellow-400 text-xs">★★★★★</div>
                  <span className="font-nunito font-800 text-xs" style={{ color: '#1a1025' }}>5.0</span>
                  <span className="font-nunito text-xs" style={{ color: '#7a6b8a' }}>· 14 Bewertungen</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.35)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 5px #4ade80' }} />
                  <span className="font-nunito font-700 text-green-700 text-xs">Heute geöffnet</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div {...stagger(0.65)} className="flex flex-wrap gap-2 mb-4">
                <motion.a href="#buchen"
                  className="font-nunito font-800 text-sm px-6 py-3 rounded-2xl text-white"
                  style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow: '0 6px 20px rgba(255,181,216,0.4)' }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  Termin buchen →
                </motion.a>
                <motion.a href="tel:01736853692"
                  className="font-nunito font-700 text-sm px-5 py-3 rounded-2xl flex items-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)', color: '#1a1025' }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <span>📞</span> 0173 6853692
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div {...stagger(0.75)} className="flex gap-6 pt-3"
                style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <StatItem target={200} suffix="+" label="Ausgebildete Hunde" duration={4000} />
                <StatItem target={10} suffix=" J." label="Erfahrung" duration={3500} />
                <StatItem target={5.0} suffix="★" label="Google Rating" decimals={1} duration={3000} />
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div className="absolute hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{ right: '6%', top: '25%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        initial={{ opacity: 0, y: -20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1, duration: 0.8 }}>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }} className="flex items-center gap-2">
          <span className="text-xl">🎓</span>
          <div>
            <p className="font-nunito font-800 text-xs text-white">Profi-Training</p>
            <p className="font-nunito text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Alle Rassen</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="absolute hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{ right: '10%', bottom: '18%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(197,181,234,0.4)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.15, duration: 0.8 }}>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }} className="flex items-center gap-2">
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
