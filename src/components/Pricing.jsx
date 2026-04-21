import { motion } from 'framer-motion'

const packages = [
  {
    name: 'Schnupperstunde',
    price: 39,
    icon: '🐾',
    desc: 'Erstes Kennenlernen — wir schauen gemeinsam, was Ihr Hund braucht',
    highlight: false,
  },
  {
    name: 'Einzelstunde',
    price: 75,
    icon: '🤝',
    desc: 'Intensives 1:1 Training, individuell abgestimmt auf Ihren Hund',
    highlight: false,
  },
  {
    name: '5er Kurs',
    price: 320,
    icon: '🎓',
    desc: '5 Einheiten Einzeltraining — ideal für nachhaltige Fortschritte',
    highlight: true,
  },
  {
    name: 'Welpengruppe',
    price: 35,
    icon: '🐶',
    desc: 'Gruppentraining für Welpen — Sozialisation & erste Kommandos',
    highlight: false,
  },
  {
    name: 'Verhaltensberatung',
    price: 89,
    icon: '🧠',
    desc: 'Analyse & Lösung bei Angst, Aggression oder anderen Problemen',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="preise" className="py-24" style={{ background: '#FAFAFA' }}>
      <div className="max-w-4xl mx-auto px-8 md:px-16">

        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block font-nunito text-xs font-700 tracking-[0.25em] uppercase mb-3 px-4 py-1.5 rounded-full"
            style={{ background: '#C5B5EA18', color: '#a99bd4' }}>
            Preisliste
          </span>
          <h2 className="font-pacifico text-3xl md:text-4xl text-gray-900 mt-2">
            Unsere Trainingsangebote 🐾
          </h2>
          <p className="font-nunito text-gray-400 mt-3 text-sm">Transparente Preise — für jeden Bedarf das passende Angebot</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.06)' }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>

          {packages.map((item, i) => (
            <motion.div key={item.name}
              className={`flex items-center justify-between px-6 py-5 ${i < packages.length - 1 ? 'border-b border-gray-50' : ''} ${item.highlight ? 'relative overflow-hidden' : ''}`}
              style={item.highlight ? { background: 'linear-gradient(135deg, #FFB5D808, #C5B5EA08)' } : {}}
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}>

              {item.highlight && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <span className="font-nunito font-700 text-xs px-2.5 py-1 rounded-full text-white"
                    style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)' }}>
                    Beliebt
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: item.highlight ? 'linear-gradient(135deg,#FFB5D820,#C5B5EA20)' : '#f9f9f9' }}>
                  {item.icon}
                </div>
                <div>
                  <span className={`font-nunito font-${item.highlight ? '800' : '600'} text-gray-800 block`}>
                    {item.name}
                  </span>
                  <span className="font-nunito text-gray-400 text-xs">{item.desc}</span>
                </div>
              </div>
              <span className="font-pacifico text-xl ml-8 flex-shrink-0" style={{ color: '#FFB5D8' }}>
                ab {item.price}€
              </span>
            </motion.div>
          ))}

          <div className="px-6 py-5 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-nunito text-gray-400 text-sm">Preise inkl. MwSt. · Individuelle Beratung auf Anfrage</p>
            <motion.a href="#buchen"
              className="font-nunito font-700 text-sm px-6 py-3 rounded-2xl text-white whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg,#FFB5D8,#C5B5EA)', boxShadow: '0 4px 16px rgba(255,181,216,0.4)' }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Jetzt buchen →
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
