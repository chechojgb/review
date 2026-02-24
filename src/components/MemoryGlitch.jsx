import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const ANIMALS = [
  { word: "LION", emoji: "🦁", color: "text-orange-600", type: "roar", bg: "bg-orange-100" },
  { word: "RABBIT", emoji: "🐰", color: "text-pink-400", type: "jump", bg: "bg-pink-100" },
  { word: "SNAKE", emoji: "🐍", color: "text-green-600", type: "slither", bg: "bg-green-100" },
  { word: "MONKEY", emoji: "🐒", color: "text-amber-800", type: "jump", bg: "bg-amber-100" },
  { word: "PENGUIN", emoji: "🐧", color: "text-slate-700", type: "waddle", bg: "bg-slate-100" },
  { word: "BIRD", emoji: "🐦", color: "text-blue-400", type: "fly", bg: "bg-blue-100" },
  { word: "ELEPHANT", emoji: "🐘", color: "text-gray-500", type: "heavy", bg: "bg-gray-100" },
  { word: "FROG", emoji: "🐸", color: "text-lime-500", type: "jump", bg: "bg-lime-100" },
];

const MagicAnimalBox = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Animaciones personalizadas por tipo de animal
  const animalVariants = {
    roar: { scale: [0, 1.5, 1], rotate: [-10, 10, -10, 0] },
    jump: { y: [0, -100, 0], scale: [0, 1, 1.1, 1] },
    slither: { x: [-20, 20, -20, 20, 0], scale: [0, 1] },
    fly: { y: [-20, 20, -20, 20, 0], x: [-10, 10, -10, 10, 0], scale: [0, 1] },
    waddle: { rotate: [-15, 15, -15, 15, 0], scale: [0, 1] },
    heavy: { scale: [0, 1.8, 1.5], y: [0, -20, 0] }
  };

  const openBox = () => {
    if (isOpen) return;
    setIsOpen(true);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#4ade80', '#facc15', '#f87171']
    });

    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANIMALS.length);
      }, 500);
    }, 1500); 
  };

  const current = ANIMALS[currentIndex];

  return (
    <div className={`h-screen w-full transition-colors duration-1000 flex flex-col items-center justify-center font-sans overflow-hidden ${isOpen ? current.bg : 'bg-yellow-50'}`}>
      
      <div className="text-center mb-10">
        <motion.h1 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl font-black text-amber-600 drop-shadow-sm"
        >
          ANIMAL BOX 🐾
        </motion.h1>
        <p className="text-amber-500 font-bold text-xl uppercase tracking-[0.3em]">Who is hiding?</p>
      </div>

      <div className="relative">
        <motion.div
          onClick={openBox}
          whileHover={{ scale: 1.05 }}
          animate={isOpen ? { y: [0, -20, 0] } : { rotate: [0, -1, 1, 0] }}
          transition={isOpen ? { duration: 0.3 } : { repeat: Infinity, duration: 1.5 }}
          className={`
            w-80 h-80 md:w-96 md:h-96 rounded-[70px] cursor-pointer shadow-2xl
            flex items-center justify-center relative z-20 border-[16px] border-white
            ${isOpen ? 'bg-white' : 'bg-gradient-to-br from-amber-400 to-orange-500'}
          `}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div 
                key="q"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <span className="text-[120px] text-white font-black">?</span>
              </motion.div>
            ) : (
              <motion.div
                key="animal"
                initial={{ scale: 0 }}
                animate={animalVariants[current.type]}
                transition={{ duration: 0.8, type: "spring" }}
                className="text-center"
              >
                <span className="text-[150px] block leading-none drop-shadow-lg">{current.emoji}</span>
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-6xl font-black block mt-4 ${current.color} tracking-tighter`}
                >
                  {current.word}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sombras dinámicas */}
        <motion.div 
          animate={isOpen ? { scale: 1.5, opacity: 0.2 } : { scale: 1, opacity: 0.4 }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/20 rounded-full blur-2xl"
        />
      </div>

      <button
        onClick={openBox}
        disabled={isOpen}
        className={`
          mt-16 px-14 py-6 rounded-[30px] text-3xl font-black shadow-[0_12px_0_#b45309]
          active:shadow-none active:translate-y-[12px] transition-all
          ${isOpen ? 'bg-gray-300 text-gray-500 shadow-none' : 'bg-orange-500 text-white hover:bg-orange-400'}
        `}
      >
        {isOpen ? "WOW!" : "LET'S SEE!"}
      </button>

      {/* Miniaturas de progreso */}
      <div className="mt-12 flex gap-4">
        {ANIMALS.map((_, i) => (
          <div key={i} className={`h-3 w-3 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-orange-600 w-8' : 'bg-orange-200'}`} />
        ))}
      </div>
    </div>
  );
};

export default MagicAnimalBox;