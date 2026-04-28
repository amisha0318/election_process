import { motion } from 'framer-motion';
import { useState, useCallback, useMemo } from 'react';
import { ChevronRight, UserPlus, Mic, CheckSquare, Flag, Vote, Award, Landmark } from 'lucide-react';

const TimelineStep = ({ step, index, isActive, onToggle }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="relative pl-10 pb-12 border-l-2 border-slate-800 last:border-0 last:pb-0">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 border-slate-950 ${
          isActive ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-700'
        } transition-all duration-300`}
      />
      
      <div 
        role="button"
        tabIndex="0"
        aria-expanded={isActive}
        onKeyDown={handleKeyDown}
        onClick={onToggle}
        className="cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-2 -m-2"
      >
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm font-bold text-blue-500 tracking-wider uppercase">{step.period}</span>
          <div className="h-[1px] flex-grow bg-slate-800 group-hover:bg-blue-500/30 transition-colors" />
        </div>
        
        <h3 className={`text-xl font-bold mb-3 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
          {step.title}
        </h3>

        <motion.div
          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="glass-card p-6 border-white/5 bg-white/[0.02]">
            <p className="text-slate-400 mb-4 leading-relaxed">{step.description}</p>
            <div className="flex flex-wrap gap-2">
              {step.details.map((detail, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                  {detail}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        
        {!isActive && (
          <p className="text-slate-500 text-sm flex items-center gap-1 group-hover:text-slate-400 transition-colors">
            Click or press Enter to expand <ChevronRight size={14} />
          </p>
        )}
      </div>
    </div>
  );
};

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleIndex = useCallback((index) => {
    setActiveIndex(prev => prev === index ? -1 : index);
  }, []);

  const steps = useMemo(() => [
    {
      period: "Spring (Year Before)",
      title: "Candidate Registration",
      icon: UserPlus,
      description: "Candidates start forming exploratory committees and registering with the Federal Election Commission (FEC).",
      details: ["FEC Filing", "Fundraising", "Staffing"]
    },
    {
      period: "Summer-Spring",
      title: "Primary Debates",
      icon: Mic,
      description: "Candidates from the same party engage in televised debates to differentiate their platforms.",
      details: ["Policy Platforms", "Public Exposure", "Polling Thresholds"]
    },
    {
      period: "January-June (Election Year)",
      title: "Primaries and Caucuses",
      icon: CheckSquare,
      description: "States hold votes to select their preferred candidate for each party.",
      details: ["Super Tuesday", "Delegates", "Proportional Allocation"]
    },
    {
      period: "July-September",
      title: "National Conventions",
      icon: Flag,
      description: "Parties officially nominate their presidential and vice-presidential candidates.",
      details: ["Party Platform", "Nomination Acceptance", "Unity Rallies"]
    },
    {
      period: "September-October",
      title: "Presidential Debates",
      icon: Mic,
      description: "Nominees from major parties face off in high-stakes televised debates.",
      details: ["National Audience", "Moderated Discussion", "Swing Voter Impact"]
    },
    {
      period: "November",
      title: "Election Day",
      icon: Vote,
      description: "Voters across the country cast ballots for their chosen candidate.",
      details: ["Popular Vote", "In-person Voting", "Mail-in Ballots"]
    },
    {
      period: "December",
      title: "Electoral College Vote",
      icon: Award,
      description: "Electors in each state cast official votes for the presidency.",
      details: ["270 to Win", "Certificate of Ascertainment", "Safe Harbor Deadline"]
    },
    {
      period: "January",
      title: "Inauguration Day",
      icon: Landmark,
      description: "Congress counts the electoral votes and the new President is sworn into office.",
      details: ["Congressional Certification", "Oath of Office", "Peaceful Transfer of Power"]
    }
  ], []);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <header className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">The Election Cycle</h2>
        <p className="text-slate-400">Follow the path from registration to the White House.</p>
      </header>

      <div className="relative" role="list">
        {steps.map((step, index) => (
          <TimelineStep 
            key={index} 
            step={step} 
            index={index} 
            isActive={activeIndex === index}
            onToggle={() => toggleIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
