import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy', color: 'bg-yellow-400' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: 'bg-blue-400' },
  { id: 'angry', emoji: '😡', label: 'Angry', color: 'bg-red-500' },
  { id: 'sleepy', emoji: '😴', label: 'Sleepy', color: 'bg-purple-500' },
];

const WarmUp = () => {
  const [votes, setVotes] = useState([]);

  const addVote = (mood) => {
    const newVote = { id: Date.now(), ...mood };
    setVotes((prev) => [...prev, newVote]);
    
    // Limpiamos el emoji después de 2 segundos para no saturar el DOM
    setTimeout(() => {
      setVotes((prev) => prev.filter(v => v.id !== newVote.id));
    }, 2000);
  };

  return (
    <div className="h-screen w-full bg-slate-100 flex flex-col items-center justify-between py-10 overflow-hidden relative">
      
      <div className="text-center z-10">
        <motion.h1 
          initial={{ y: -50 }} animate={{ y: 0 }}
          className="text-6xl font-black text-slate-800"
        >
          HOW DO YOU FEEL <span className="text-indigo-600">TODAY?</span>
        </motion.h1>
        <p className="text-xl text-slate-500 mt-2 font-medium uppercase tracking-widest">Click your mood!</p>
      </div>

      {/* Área de partículas de Emojis */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {votes.map((vote) => (
            <motion.div
              key={vote.id}
              initial={{ scale: 0, x: '50%', y: '80%' }}
              animate={{ 
                scale: [1, 2, 1.5], 
                x: `${Math.random() * 80 + 10}%`, 
                y: `${Math.random() * 40 + 20}%`,
                rotate: Math.random() * 360 
              }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute text-8xl"
            >
              {vote.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Botonera de Selección */}
      <div className="flex gap-6 z-10">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => addVote(mood)}
            className={`${mood.color} p-6 rounded-3xl shadow-2xl hover:scale-110 active:scale-90 transition-transform group flex flex-col items-center border-b-8 border-black/20`}
          >
            <span className="text-6xl group-hover:animate-bounce">{mood.emoji}</span>
            <span className="text-white font-black text-xl mt-2 uppercase">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WarmUp;