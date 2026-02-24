import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const CHALLENGES = [
  { id: 1, img: "https://cdn-icons-png.flaticon.com/512/616/616412.png", validSubjects: ["It", "He"], type: "animal" },
  { id: 2, img: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png", validSubjects: ["He"], type: "boy" },
  { id: 3, img: "https://cdn-icons-png.flaticon.com/512/1998/1998614.png", validSubjects: ["It"], type: "snake" },
  { id: 4, img: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png", validSubjects: ["I"], type: "kid" },
  { id: 5, img: "https://cdn-icons-png.flaticon.com/512/2314/2314660.png", validSubjects: ["They"], type: "girl" }
];

const OPTIONS = {
  subjects: ["I", "He", "She", "It", "They", "We"],
  verbs: ["am", "is", "are"],
  adjectives: ["Happy", "Sad", "Hungry", "Sleepy", "Strong", "Big", "Green", "Sick"]
};

const UnitReview = () => {
  const [completed, setCompleted] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [selections, setSelections] = useState([null, null, null]);
  const [errorType, setErrorType] = useState(null); // 'grammar' o 'logic'

  const checkLogic = () => {
    const current = CHALLENGES.find(c => c.id === activeId);
    const [sub, verb, adj] = selections;

    // 1. Validar Sujeto vs Imagen
    const isSubjectCorrect = current.validSubjects.includes(sub);
    
    // 2. Validar Concordancia Sujeto-Verbo (Gramática pura)
    let isGrammarCorrect = false;
    if (["He", "She", "It"].includes(sub) && verb === "is") isGrammarCorrect = true;
    if (["They", "We", "You"].includes(sub) && verb === "are") isGrammarCorrect = true;
    if (sub === "I" && verb === "am") isGrammarCorrect = true;

    if (isSubjectCorrect && isGrammarCorrect) {
      confetti({ particleCount: 150, spread: 70 });
      setCompleted([...completed, activeId]);
      setActiveId(null);
      setSelections([null, null, null]);
    } else {
      setErrorType(true);
      setTimeout(() => setErrorType(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      {/* HEADER Y PROGRESO (Igual al anterior) */}
      <div className="max-w-5xl mx-auto mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black text-indigo-900 tracking-tighter">MASTER REVIEW</h1>
          <p className="text-slate-400 font-bold uppercase">Build any correct sentence!</p>
        </div>
        <div className="text-3xl font-black text-indigo-600 bg-white px-6 py-2 rounded-2xl shadow-sm border-2 border-indigo-100">
          {completed.length} / {CHALLENGES.length}
        </div>
      </div>

      {/* GRID DE MISIONES */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CHALLENGES.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ y: -8 }}
            onClick={() => !completed.includes(card.id) && setActiveId(card.id)}
            className={`cursor-pointer p-8 rounded-[45px] shadow-xl transition-all relative overflow-hidden border-b-[10px] ${
              completed.includes(card.id) 
              ? 'bg-green-400 border-green-600' 
              : 'bg-white border-slate-200 hover:border-indigo-400'
            }`}
          >
            <img src={card.img} className={`w-32 h-32 mx-auto mb-4 ${completed.includes(card.id) ? 'brightness-110' : ''}`} />
            <p className={`text-center font-black text-xl ${completed.includes(card.id) ? 'text-white' : 'text-slate-400'}`}>
              {completed.includes(card.id) ? 'MISSION DONE!' : 'TAP TO START'}
            </p>
          </motion.div>
        ))}
      </div>

      {/* MODAL CON LÓGICA FLEXIBLE */}
      <AnimatePresence>
        {activeId && (
          <motion.div className="fixed inset-0 bg-indigo-950/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-white rounded-[50px] p-10 max-w-3xl w-full shadow-2xl">
              <div className="flex justify-between items-start mb-8">
                <img src={CHALLENGES.find(c => c.id === activeId).img} className="w-40 h-40 bg-slate-100 rounded-3xl p-4" />
                <button onClick={() => setActiveId(null)} className="text-4xl hover:rotate-90 transition-transform">✕</button>
              </div>

              {/* SENTENCE SLOTS */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {selections.map((sel, i) => (
                  <motion.div 
                    key={i} animate={errorType ? { x: [-10, 10, -10, 10, 0], backgroundColor: '#fee2e2' } : {}}
                    className="h-24 w-40 rounded-3xl border-4 border-dashed border-slate-200 flex items-center justify-center text-2xl font-black text-indigo-600 uppercase"
                  >
                    {sel || "?"}
                  </motion.div>
                ))}
              </div>

              {/* SELECTORS */}
              <div className="space-y-6">
                {[
                  { key: 0, title: 'WHO?', opts: OPTIONS.subjects },
                  { key: 1, title: 'ACTION', opts: OPTIONS.verbs },
                  { key: 2, title: 'HOW?', opts: OPTIONS.adjectives }
                ].map(group => (
                  <div key={group.key}>
                    <p className="text-center text-xs font-black text-slate-300 mb-2 tracking-[0.3em]">{group.title}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {group.opts.map(o => (
                        <button 
                          key={o} 
                          onClick={() => {let s=[...selections]; s[group.key]=o; setSelections(s)}}
                          className={`px-4 py-2 rounded-xl font-bold transition-all ${selections[group.key] === o ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={checkLogic}
                disabled={selections.includes(null)}
                className="mt-10 w-full py-6 bg-indigo-600 text-white rounded-[25px] font-black text-2xl shadow-[0_10px_0_#3730a3] active:shadow-none active:translate-y-2 disabled:bg-slate-200 disabled:shadow-none"
              >
                CHECK SENTENCE 🚀
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UnitReview;