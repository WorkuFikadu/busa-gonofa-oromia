import React, { useState } from 'react';
import { X, Phone, PhoneOff, ArrowLeft, MessageSquare, Radio, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface USSDProps {
  onClose: () => void;
}

type USSDScreen = 'dialer' | 'menu' | 'report_cat' | 'report_woreda' | 'report_done' | 'zones' | 'hubs' | 'sms_inbox';

const USSDSimulatorModal: React.FC<USSDProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const [dialInput, setDialInput] = useState('*8181#');
  const [currentScreen, setCurrentScreen] = useState<USSDScreen>('dialer');
  const [selectedCat, setSelectedCat] = useState('');
  const [woredaInput, setWoredaInput] = useState('');
  const [ticketNum, setTicketNum] = useState('');
  const [smsMessages, setSmsMessages] = useState<string[]>([
    '8181 Alert: Awash River flash flood advisory in effect for Bora & East Shewa. Move to higher grounds if directed by local kebele leaders.',
    'Busa Gonofa: Strategic grain distribution active in Borena Dillo & Moyale. Toll-free 8181 available 24/7.'
  ]);

  const handleDial = () => {
    if (dialInput.trim() === '*8181#' || dialInput.trim() === '8181') {
      setCurrentScreen('menu');
    } else {
      alert('Dial *8181# to connect to the Buusaa Gonofaa emergency USSD portal.');
    }
  };

  const handleKeyPress = (num: string) => {
    if (currentScreen === 'dialer') {
      setDialInput(prev => prev + num);
    } else if (currentScreen === 'menu') {
      if (num === '1') setCurrentScreen('report_cat');
      if (num === '2') setCurrentScreen('zones');
      if (num === '3') setCurrentScreen('hubs');
      if (num === '4') {
        setSmsMessages(prev => [
          '8181 Info: Galatoomaa! Tola-ooltummaa Buusaa Gonofaatiif galmooftaniittu. Giddugala dhiyoo keessanirraa bilbilli isiniif godhama.',
          ...prev
        ]);
        alert("SMS Sent: Volunteer intake confirmation sent to your feature phone!");
      }
    } else if (currentScreen === 'report_cat') {
      if (num === '1') setSelectedCat('Hongee (Drought)');
      if (num === '2') setSelectedCat('Lolaa (Flood)');
      if (num === '3') setSelectedCat('Ibidda (Fire)');
      setCurrentScreen('report_woreda');
    }
  };

  const submitWoreda = () => {
    const tkt = `BG-USSD-${Math.floor(1000 + Math.random() * 8999)}`;
    setTicketNum(tkt);
    setSmsMessages(prev => [
      `8181 Dispatch: Gabaasni keessan lakk. ${tkt} galmaa'eera. Waajjirri Godinaa birmannaa eegaleera.`,
      ...prev
    ]);
    setCurrentScreen('report_done');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border-4 border-slate-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Feature Phone Casing */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1 bg-gadaa-green/20 text-gadaa-greenLight border border-gadaa-green/40 px-3 py-1 rounded-full text-xs font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>USSD & SMS Toll-Free 8181 Simulator</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Simulates feature phone emergency access without internet</p>
        </div>

        {/* LCD Screen Container */}
        <div className="bg-[#9ea784] border-4 border-slate-800 rounded-2xl p-4 text-slate-950 font-mono shadow-inner min-h-[220px] flex flex-col justify-between select-none">
          {/* Top Status Line */}
          <div className="flex justify-between items-center text-[10px] font-bold border-b border-slate-800/30 pb-1 mb-2">
            <span>ETH-TELECOM 2G</span>
            <span>📶 [8181]</span>
          </div>

          {/* Screen Content */}
          <div className="flex-1 text-xs leading-relaxed">
            {currentScreen === 'dialer' && (
              <div className="space-y-4 pt-4 text-center">
                <div className="text-[11px] font-bold">DIAL EMERGENCY USSD</div>
                <input
                  type="text"
                  value={dialInput}
                  onChange={e => setDialInput(e.target.value)}
                  className="bg-transparent text-center font-mono font-black text-2xl tracking-widest w-full outline-none"
                />
                <div className="text-[10px] opacity-75">Press CALL or Send to initiate session</div>
              </div>
            )}

            {currentScreen === 'menu' && (
              <div className="space-y-1">
                <div className="font-bold border-b border-slate-900/20 pb-0.5 mb-1">
                  -- Buusaa Gonofaa 8181 --
                </div>
                <div>1. Gabaasa Balaa (Report Hazard)</div>
                <div>2. Haala Balaa Godinaa (Zonal Risk)</div>
                <div>3. Kuusaa Midhaanii (Grain Hubs)</div>
                <div>4. Tola-Ooltummaa (Volunteer)</div>
                <div className="pt-1 text-[10px] opacity-75">Reply with option (1-4):</div>
              </div>
            )}

            {currentScreen === 'report_cat' && (
              <div className="space-y-1">
                <div className="font-bold border-b border-slate-900/20 pb-0.5 mb-1">Gosa Balaa Filadhaa:</div>
                <div>1. Hongee / Bishaan Dhabuu</div>
                <div>2. Lolaa / Rooba Cimaa</div>
                <div>3. Ibidda / Balaa Uumamaa</div>
                <div className="pt-2 text-[10px] opacity-75">Press 1, 2, or 3</div>
              </div>
            )}

            {currentScreen === 'report_woreda' && (
              <div className="space-y-2">
                <div className="font-bold text-[11px]">Balaa: {selectedCat}</div>
                <div>Maqaa Aanaa fi Gandaa barreessaa:</div>
                <input
                  type="text"
                  placeholder="fkn. Dillo, Toma"
                  value={woredaInput}
                  onChange={e => setWoredaInput(e.target.value)}
                  className="w-full bg-white/40 border border-slate-900/40 px-2 py-1 text-xs font-mono font-bold rounded"
                />
                <button
                  onClick={submitWoreda}
                  className="w-full bg-slate-900 text-white font-bold text-[11px] py-1 rounded"
                >
                  Ergi (Send Report)
                </button>
              </div>
            )}

            {currentScreen === 'report_done' && (
              <div className="space-y-2 text-center pt-2">
                <div className="font-bold text-sm">GALATOOMAA!</div>
                <div className="text-[11px]">Gabaasni keessan galmaa'eera. Lakk. Kaardii keessan:</div>
                <div className="bg-slate-900 text-[#9ea784] font-bold p-1 rounded font-mono text-sm tracking-wider">
                  {ticketNum}
                </div>
                <div className="text-[10px] opacity-80">Ergaan SMS bilbila keessan irratti ergameera.</div>
              </div>
            )}

            {currentScreen === 'zones' && (
              <div className="space-y-1 text-[11px]">
                <div className="font-bold border-b border-slate-900/20 pb-0.5 mb-1">Haala Sodaa Balaa:</div>
                <div>• Boorana: Cimaa (Hongee)</div>
                <div>• Shawaa Bahaa: Cimaa (Lolaa)</div>
                <div>• Wallagga: Giddu-galeessa</div>
                <div>• Harargee: Eeggannoo</div>
                <div className="text-[9px] pt-1 opacity-75">Press End to return</div>
              </div>
            )}

            {currentScreen === 'hubs' && (
              <div className="space-y-1 text-[11px]">
                <div className="font-bold border-b border-slate-900/20 pb-0.5 mb-1">Kuusaa Midhaanii Dhiyoo:</div>
                <div>• Adaamaa Hub: 42,000 Qtl</div>
                <div>• Shaashamannee: 28,500 Qtl</div>
                <div>• Jimmaa Hub: 19,000 Qtl</div>
                <div>• Yaa'abal'oo Hub: 15,400 Qtl</div>
              </div>
            )}

            {currentScreen === 'sms_inbox' && (
              <div className="space-y-1.5 text-[10px] max-h-[160px] overflow-y-auto">
                <div className="font-bold border-b border-slate-900/20 pb-0.5">📨 SMS Inbox (8181):</div>
                {smsMessages.map((msg, i) => (
                  <div key={i} className="bg-white/30 p-1.5 rounded border border-slate-900/20">
                    {msg}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom LCD Controls */}
          <div className="flex justify-between items-center text-[10px] border-t border-slate-800/30 pt-1 mt-1 font-bold">
            <button onClick={() => setCurrentScreen(currentScreen === 'dialer' ? 'sms_inbox' : 'dialer')}>
              {currentScreen === 'sms_inbox' ? 'Back' : 'SMS Inbox'}
            </button>
            <button onClick={() => setCurrentScreen('dialer')}>Exit</button>
          </div>
        </div>

        {/* Physical Keypad */}
        <div className="mt-5 space-y-2">
          {/* Action Row */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            <button
              onClick={handleDial}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-1 text-xs shadow-md transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" /> Call / Send
            </button>
            <button
              onClick={() => { setCurrentScreen('dialer'); setDialInput('*8181#'); }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl flex items-center justify-center gap-1 text-xs shadow-md transition-all active:scale-95"
            >
              <PhoneOff className="w-3.5 h-3.5" /> End / Clear
            </button>
          </div>

          {/* 3x4 Number Grid */}
          <div className="grid grid-cols-3 gap-2 text-white">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(key => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 font-black text-sm py-2.5 rounded-xl border border-slate-700 shadow transition-all active:scale-95"
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default USSDSimulatorModal;
