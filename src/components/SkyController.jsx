import React, { useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const SECTIONS = [
  { id: 1, label: "Good Morning", icon: "☀️", color: "#FFD700" },
  { id: 2, label: "Good Afternoon", icon: "🌤️", color: "#FF8C00" },
  { id: 3, label: "Good Evening", icon: "🌇", color: "#483D8B" },
  { id: 4, label: "Good Night", icon: "🌙", color: "#191970" },
];

const OPTIONS = ["Good Morning", "Good Afternoon", "Good Evening", "Good Night"];

const GreetingsGame = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetSection, setTargetSection] = useState(null);
  const [gameState, setGameState] = useState('idle'); 
  const [wrongAnswer, setWrongAnswer] = useState(null); // Estado para el botón que falló
  const controls = useAnimation();

  const spinWheel = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setGameState('idle');
    setWrongAnswer(null);
    
    const randomRotation = Math.floor(Math.random() * 360) + 1800;
    await controls.start({
      rotate: randomRotation,
      transition: { duration: 3, ease: "circOut" }
    });

    const actualRotation = randomRotation % 360;
    const sectionIndex = Math.floor(((360 - actualRotation) % 360) / (360 / SECTIONS.length));
    
    setTargetSection(SECTIONS[sectionIndex]);
    setIsSpinning(false);
    setGameState('guessing');
  };

  const checkAnswer = (answer) => {
    if (answer === targetSection.label) {
      confetti({ 
        particleCount: 150, 
        spread: 70, 
        origin: { y: 0.6 },
        colors: [targetSection.color, '#ffffff']
      });
      setGameState('win');
      setWrongAnswer(null);
    } else {
      // Activar error visual
      setWrongAnswer(answer);
      // Limpiar el error después de 500ms para que puedan reintentar
      setTimeout(() => setWrongAnswer(null), 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
      
      <div className="text-center mb-8">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 italic uppercase">
          Spin & Guess!
        </h1>
      </div>

      <div className="relative mb-16">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 text-5xl drop-shadow-md">📍</div>

        <motion.div
          animate={controls}
          className="w-80 h-80 md:w-[450px] md:h-[450px] rounded-full border-[12px] border-slate-700 shadow-[0_0_60px_rgba(0,0,0,0.5)] relative"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {SECTIONS.map((s, i) => {
              const angle = 360 / SECTIONS.length;
              const x1 = 50 + 50 * Math.cos((Math.PI * (i * angle)) / 180);
              const y1 = 50 + 50 * Math.sin((Math.PI * (i * angle)) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * ((i + 1) * angle)) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * ((i + 1) * angle)) / 180);
              return (
                <path key={s.id} d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} fill={s.color} stroke="#1e293b" strokeWidth="1" />
              );
            })}
          </svg>

          {SECTIONS.map((s, i) => (
            <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: `rotate(${(i * 90) + 45}deg) translateY(-120px)` }}>
              <span className="text-6xl" style={{ transform: `rotate(-${(i * 90) + 45 + (isSpinning ? 0 : 0)}deg)` }}>
                {s.icon}
              </span>
            </div>
          ))}
        </motion.div>

        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full text-slate-900 text-xl font-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-90 transition-all z-30"
        >
          {isSpinning ? '🌀' : 'PUSH'}
        </button>
      </div>

      <div className="h-40 w-full max-w-4xl flex items-center justify-center">
        <AnimatePresence mode="wait">
          {gameState === 'guessing' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="grid grid-cols-2 gap-4 w-full px-4"
            >
              {OPTIONS.map((opt) => (
                <motion.button
                  key={opt}
                  // Animación de SHAKE si la respuesta es incorrecta
                  animate={wrongAnswer === opt ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  onClick={() => checkAnswer(opt)}
                  className={`
                    py-5 rounded-2xl font-black text-2xl transition-all shadow-lg border-b-8
                    ${wrongAnswer === opt 
                      ? 'bg-red-500 border-red-700 text-white' 
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-yellow-400 hover:border-yellow-600 hover:-translate-y-1'
                    }
                  `}
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>
          )}

          {gameState === 'win' && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="flex flex-col items-center"
            >
              <div className="text-6xl mb-2">🎉</div>
              <h2 className="text-5xl font-black text-green-400 drop-shadow-md">CORRECT!</h2>
              <button 
                onClick={() => setGameState('idle')}
                className="mt-4 text-slate-400 hover:text-white underline font-bold"
              >
                Try Another One
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GreetingsGame;