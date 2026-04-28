import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Flag, MapPin, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

const EligibilityChecker = () => {
  const [formData, setFormData] = useState({
    age: '',
    citizenship: '',
    state: '',
    felony: ''
  });
  const [result, setResult] = useState(null);

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const checkEligibility = (e) => {
    e.preventDefault();
    const age = parseInt(formData.age);
    
    if (formData.citizenship === 'no') {
      setResult({
        status: 'ineligible',
        message: 'Only US citizens are eligible to vote in federal elections.',
        recommendation: 'You can still participate in local community advocacy and volunteer for campaigns.'
      });
      return;
    }

    if (age < 18) {
      setResult({
        status: 'pending',
        message: `You'll be eligible to vote when you turn 18.`,
        recommendation: `You have ${18 - age} year(s) to go! Many states allow 17-year-olds to register if they will be 18 by Election Day.`
      });
      return;
    }

    if (formData.felony === 'yes') {
      setResult({
        status: 'conditional',
        message: 'Voting rights after a conviction vary by state.',
        recommendation: `In ${formData.state}, rules differ. Some states restore rights automatically, others require an application. Check RestoreYourVote.org.`
      });
      return;
    }

    setResult({
      status: 'eligible',
      message: 'You are likely eligible to vote!',
      recommendation: `Next step: Register in ${formData.state} before the deadline. Visit vote.gov to start.`
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Can I Vote?</h2>
        <p className="text-slate-400">Check your eligibility based on federal and state requirements.</p>
      </div>

      <div className="glass-card p-8 border-white/5 shadow-2xl">
        <form onSubmit={checkEligibility} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <User size={16} /> Age
              </label>
              <input
                type="number"
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-colors"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <MapPin size={16} /> State
              </label>
              <select
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Flag size={16} /> Are you a US Citizen?
            </label>
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
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <ShieldAlert size={16} /> Do you have a felony conviction?
            </label>
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
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-4 text-lg">
            Check Eligibility
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
                {result.status === 'eligible' ? <CheckCircle2 className="text-green-500 flex-shrink-0" /> : 
                 result.status === 'ineligible' ? <ShieldAlert className="text-red-500 flex-shrink-0" /> : 
                 <AlertCircle className="text-yellow-500 flex-shrink-0" />}
                <div>
                  <h4 className="font-bold mb-1">{result.message}</h4>
                  <p className="text-sm text-slate-400">{result.recommendation}</p>
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
