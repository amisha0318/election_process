import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Info, Shield } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        2026 Midterm & Local Election Guide
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold mb-6 heading-gradient"
      >
        Empowering Every <br /> American Voice.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
      >
        Navigate the complex US election process with ease. From registration to the ballot box, 
        our AI-powered assistant is here to ensure your vote counts.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
        <button onClick={onStart} className="btn-primary flex items-center gap-2 group">
          Explore Election Cycle
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="btn-secondary">Download Guide</button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left"
      >
        {[
          { icon: Shield, title: 'Verified Data', desc: 'Sourced from Google Civic API and official government records.' },
          { icon: CheckCircle, title: 'Easy Compliance', desc: 'Stay updated with your state specific registration requirements.' },
          { icon: Info, title: '24/7 AI Support', desc: 'Ask any question about the voting process and get instant answers.' }
        ].map((feature, i) => (
          <div key={i} className="glass-card p-6 border-white/5 hover:border-blue-500/30 transition-colors">
            <feature.icon className="text-blue-500 mb-4" size={32} />
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Hero;
