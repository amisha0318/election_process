import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Flag, MapPin, AlertCircle, CheckCircle2, ShieldAlert, Clock } from 'lucide-react';

const EligibilityChecker = () => {
  const [formData, setFormData] = useState({
    age: '',
    citizenship: '',
    state: '',
    felony: ''
  });
  const [result, setResult] = useState(null);

  const states = useMemo(() => [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ], []);

  const checkEligibility = (e) => {
    e.preventDefault();
    const age = parseInt(formData.age);
    
    if (formData.citizenship === 'no') {
      setResult({
        status: 'ineligible',
        message: 'US Citizenship Required',
        recommendation: 'Only US citizens are eligible to vote in federal elections. You can still participate through community advocacy.'
      });
      return;
    }

    if (age < 18) {
      const yearsLeft = 18 - age;
      setResult({
        status: 'pending',
        message: `Future Voter Status`,
        recommendation: `You'll be eligible to vote in ${yearsLeft} year${yearsLeft > 1 ? 's' : ''}! In many states, you can pre-register at 16 or 17.`,
        countdown: yearsLeft
      });
      return;
    }

    if (formData.felony === 'yes') {
      setResult({
        status: 'conditional',
        message: 'State-Specific Review Needed',
        recommendation: `In ${formData.state}, rules for restoration of voting rights vary. Visit RestoreYourVote.org for a personalized guide.`
      });
      return;
    }

    setResult({
      status: 'eligible',
      message: 'You Are Eligible!',
      recommendation: `Great news! You can register to vote in ${formData.state} right now.`,
      link: 'https://vote.gov'
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <header className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Voting Eligibility Checker</h2>
        <p className="text-slate-400">Answer 4 quick questions to verify your eligibility for the 2026 Elections.</p>
      </header>

      <div className="glass-card p-8 border-white/5 shadow-2xl">
        <form onSubmit={checkEligibility} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <User size={16} /> Age
              </label>
              <input
                id="age"
                type="number"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-colors"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <MapPin size={16} /> State
              </label>
              <select
                id="state"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-colors"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              >
                <option value="">Select State</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
              <Flag size={16} /> US Citizenship Status
            </legend>
            <div className="flex gap-4">
              {['yes', 'no'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFormData({ ...formData, citizenship: opt })}
                  className={`flex-1 py-3 rounded-xl border transition-all ${
                    formData.citizenship === opt 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {opt === 'yes' ? 'Citizen' : 'Non-Citizen'}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-2">
              <ShieldAlert size={16} /> Past Felony Conviction?
            </legend>
            <div className="flex gap-4">
              {['yes', 'no'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFormData({ ...formData, felony: opt })}
                  className={`flex-1 py-3 rounded-xl border transition-all ${
                    formData.felony === opt 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {opt === 'yes' ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="w-full btn-primary py-4 text-lg font-bold shadow-xl">
            Check My Eligibility
          </button>
        </form>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-6 rounded-2xl border ${
                result.status === 'eligible' ? 'bg-green-500/10 border-green-500/20' : 
                result.status === 'ineligible' ? 'bg-red-500/10 border-red-500/20' : 
                'bg-yellow-500/10 border-yellow-500/20'
              }`}
            >
              <div className="flex gap-4">
                <div className="mt-1">
                  {result.status === 'eligible' ? <CheckCircle2 className="text-green-500" size={24} /> : 
                   result.status === 'ineligible' ? <ShieldAlert className="text-red-500" size={24} /> : 
                   <Clock className="text-yellow-500" size={24} />}
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-lg mb-1">{result.message}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{result.recommendation}</p>
                  
                  {result.countdown !== undefined && (
                    <div className="bg-white/5 rounded-lg p-3 inline-flex items-center gap-3">
                      <div className="text-2xl font-bold text-blue-400">{result.countdown}</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 leading-tight">Years until<br/>eligibility</div>
                    </div>
                  )}

                  {result.link && (
                    <a 
                      href={result.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 font-bold hover:underline"
                    >
                      Register Now at Vote.gov
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EligibilityChecker;
