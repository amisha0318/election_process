import { useState } from 'react';
import { motion as fm } from 'framer-motion';
import { Search, MapPin, Navigation, Info, ExternalLink, Clock, Accessibility, Phone, Mail, User } from 'lucide-react';
import axios from 'axios';

const PollingFinder = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/voter-info`, {
        params: { address }
      });
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError('Could not find information for this address. Please try a more specific address.');
    } finally {
      setLoading(false);
    }
  };

  const LocationCard = ({ loc, type }) => (
    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 ${type === 'Early Voting' ? 'text-green-400' : 'text-blue-400'}`}>
            {type}
          </span>
          <h4 className="font-bold text-lg mt-2">{loc.address.locationName || 'Polling Station'}</h4>
          <p className="text-slate-400 text-sm">
            {loc.address.line1}, {loc.address.city}, {loc.address.state} {loc.address.zip}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock size={14} className="text-blue-500" />
          <span>{loc.pollingHours || 'Hours not specified'}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Accessibility size={14} className="text-blue-500" />
          <span>{loc.notes?.includes('accessible') ? 'Fully Accessible' : 'Contact for accessibility info'}</span>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-900 border border-white/5">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
          src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(`${loc.address.line1}, ${loc.address.city}, ${loc.address.state}`)}`}
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex gap-3 pt-2">
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${loc.address.line1}, ${loc.address.city}, ${loc.address.state}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-blue-400 flex items-center gap-1 hover:underline"
        >
          <ExternalLink size={14} /> Get Directions
        </a>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Polling Place & Local Info</h2>
        <p className="text-slate-400">Find where to vote, check accessibility, and connect with your election officials.</p>
      </div>

      <div className="glass-card p-4 mb-12 max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="text"
              required
              aria-label="Enter your residential address"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-4 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary px-8 flex items-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={20} />}
            <span>Find</span>
          </button>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center mb-8">
          {error}
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Polling & Early Voting */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Navigation className="text-blue-500" /> Voting Locations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.pollingLocations?.map((loc, i) => (
                  <LocationCard key={i} loc={loc} type="Polling Place" />
                ))}
                {data.earlyVoteSites?.map((loc, i) => (
                  <LocationCard key={i} loc={loc} type="Early Voting" />
                ))}
                {!data.pollingLocations && !data.earlyVoteSites && (
                  <div className="col-span-full p-12 text-center glass-card border-dashed border-slate-800">
                    <p className="text-slate-500">No specific locations found. Contact your local board of elections.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Officials & Contests */}
          <div className="space-y-8">
            <section className="glass-card p-6 border-white/5 bg-blue-500/[0.02]">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <User className="text-blue-500" /> Your Election Officials
              </h3>
              <div className="space-y-6">
                {data.state?.[0]?.electionAdministrationBody && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-300">State Administration</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {data.state[0].electionAdministrationBody.name}
                    </p>
                    <div className="flex gap-2">
                      {data.state[0].electionAdministrationBody.electionInfoUrl && (
                        <a href={data.state[0].electionAdministrationBody.electionInfoUrl} target="_blank" className="text-[10px] text-blue-400 hover:underline">Website</a>
                      )}
                    </div>
                  </div>
                )}
                
                {data.representatives?.slice(0, 3).map((rep, i) => (
                  <div key={i} className="flex gap-4 items-center p-3 rounded-lg hover:bg-white/5 transition-colors">
                    {rep.photoUrl ? (
                      <img src={rep.photoUrl} alt={rep.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                        <User size={20} />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold">{rep.name}</h4>
                      <p className="text-[10px] text-slate-500">{rep.party}</p>
                      <div className="flex gap-2 mt-1">
                        {rep.phones?.[0] && <a href={`tel:${rep.phones[0]}`}><Phone size={12} className="text-slate-400 hover:text-blue-400" /></a>}
                        {rep.emails?.[0] && <a href={`mailto:${rep.emails[0]}`}><Mail size={12} className="text-slate-400 hover:text-blue-400" /></a>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-card p-6 border-white/5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Info className="text-red-500" /> Ballots & Contests
              </h3>
              <div className="space-y-4">
                {data.contests?.slice(0, 5).map((contest, i) => (
                  <div key={i} className="p-3 border-l-2 border-slate-800 hover:border-blue-500 transition-colors bg-white/[0.01] rounded-r-lg">
                    <span className="text-[9px] font-bold uppercase text-slate-500">{contest.type}</span>
                    <h4 className="text-xs font-bold">{contest.office}</h4>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollingFinder;
