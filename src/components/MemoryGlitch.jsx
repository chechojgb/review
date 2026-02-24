import React, { useState, useEffect } from 'react';
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
  { word: "TIGER", emoji: "🐯", color: "text-orange-700", type: "roar", bg: "bg-orange-50" },
  { word: "CHICKEN", emoji: "🐥", color: "text-yellow-500", type: "jump", bg: "bg-yellow-50" },
  { word: "SHARK", emoji: "🦈", color: "text-blue-700", type: "slither", bg: "bg-blue-200" },
  { word: "BEAR", emoji: "🐻", color: "text-amber-900", type: "heavy", bg: "bg-orange-200" },
  { word: "BUTTERFLY", emoji: "🦋", color: "text-cyan-400", type: "fly", bg: "bg-cyan-50" },
  { word: "KANGAROO", emoji: "🦘", color: "text-orange-800", type: "jump", bg: "bg-orange-100" },
  { word: "OWL", emoji: "🦉", color: "text-brown-600", type: "waddle", bg: "bg-slate-200" },
  { word: "WOLF", emoji: "🐺", color: "text-gray-600", type: "roar", bg: "bg-gray-200" },
  { word: "PIG", emoji: "🐷", color: "text-pink-500", type: "waddle", bg: "bg-pink-50" },
  { word: "BEE", emoji: "🐝", color: "text-yellow-600", type: "fly", bg: "bg-yellow-100" },
  { word: "CAT", emoji: "🐱", color: "text-orange-400", type: "roar", bg: "bg-orange-50" },
  { word: "DOG", emoji: "🐶", color: "text-brown-500", type: "jump", bg: "bg-amber-50" }
];

const MagicAnimalBox = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [speed, setSpeed] = useState(2000); // Tiempo en milisegundos (2s inicial)

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

    // CIERRE AUTOMÁTICO BASADO EN EL "SPEED"
    setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ANIMALS.length);
      }, 500);
    }, speed); 
  };

  const current = ANIMALS[currentIndex];

  return (
    <div className={`h-screen w-full transition-colors duration-1000 flex flex-col items-center justify-center font-sans overflow-hidden ${isOpen ? current.bg : 'bg-yellow-50'}`}>
      
      {/* SELECTOR DE VELOCIDAD (Para el Profe) */}
      <div className="absolute top-5 right-5 flex flex-col gap-2 bg-white p-4 rounded-2xl shadow-lg z-50">
        <p className="text-xs font-black text-slate-400 uppercase text-center">Difficulty</p>
        <div className="flex gap-2">
          {[2000, 1500, 1000].map((s) => (
            <button 
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-4 py-2 rounded-xl font-black transition-all ${speed === s ? 'bg-indigo-600 text-white scale-110' : 'bg-slate-100 text-slate-400'}`}
            >
              {s / 1000}s
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mb-10">
        <motion.h1 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl font-black text-amber-600 drop-shadow-sm"
        >
          ANIMAL BOX 🐾
        </motion.h1>
        <p className="text-amber-500 font-bold text-xl uppercase">Fast! What is it?</p>
      </div>

      <div className="relative">
        {/* BARRA DE TIEMPO (Solo visible cuando se abre) */}
        <AnimatePresence>
          {isOpen && (
            <div className="absolute -top-10 left-0 w-full h-4 bg-white rounded-full overflow-hidden border-4 border-white shadow-sm z-30">
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: speed / 1000, ease: "linear" }}
                className="h-full bg-orange-500"
              />
            </div>
          )}
        </AnimatePresence>

        <motion.div
          onClick={openBox}
          animate={isOpen ? { scale: 1.1 } : { rotate: [0, -1, 1, 0] }}
          className={`
            w-80 h-80 md:w-96 md:h-96 rounded-[70px] cursor-pointer shadow-2xl
            flex items-center justify-center relative z-20 border-[16px] border-white
            ${isOpen ? 'bg-white' : 'bg-gradient-to-br from-amber-400 to-orange-500'}
          `}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div key="q" className="text-[120px] text-white font-black">?</motion.div>
            ) : (
              <motion.div
                key="animal"
                initial={{ scale: 0 }}
                animate={animalVariants[current.type]}
                className="text-center"
              >
                <span className="text-[150px] block leading-none">{current.emoji}</span>
                <span className={`text-6xl font-black block mt-4 ${current.color}`}>
                  {current.word}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <button
        onClick={openBox}
        disabled={isOpen}
        className={`mt-16 px-14 py-6 rounded-[30px] text-3xl font-black shadow-[0_12px_0_#b45309] active:shadow-none active:translate-y-[12px] transition-all
          ${isOpen ? 'bg-gray-300 text-gray-500 shadow-none' : 'bg-orange-500 text-white hover:bg-orange-400'}
        `}
      >
        {isOpen ? "GUESS!" : "START ROUND!"}
      </button>
    </div>
  );
};

export default MagicAnimalBox;