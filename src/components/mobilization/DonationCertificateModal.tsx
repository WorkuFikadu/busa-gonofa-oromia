import React from 'react';
import { MonetaryDonation } from '../../types';
import { Shield, Printer, X, Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CertificateProps {
  donation: MonetaryDonation;
  onClose: () => void;
}

const DonationCertificateModal: React.FC<CertificateProps> = ({ donation, onClose }) => {
  const { language } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl border-4 border-gadaa-gold max-w-2xl w-full p-8 relative print:border-none print:shadow-none print:max-w-none print:w-full">
        {/* Close button (hidden during print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 print:hidden transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Container with Gadaa border */}
        <div className="border-4 border-dashed border-gadaa-green/40 p-6 rounded-2xl relative bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/30">
          {/* Top Gadaa Tricolor Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-black via-red-600 to-white rounded-full mb-6" />

          {/* Header */}
          <div className="text-center space-y-1 mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-white border-2 border-gadaa-gold p-1 shadow-md mb-2">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Mootummaa Naannoo Oromiyaatti Komishinii Hoggansa Sodaa Balaa
            </h4>
            <h5 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              Oromia Disaster Risk Management & Social Security Commission
            </h5>
            <div className="inline-flex items-center gap-1 bg-gadaa-gold/20 text-gadaa-goldDark border border-gadaa-gold/40 px-3 py-0.5 rounded-full text-xs font-black mt-2">
              <Award className="w-3.5 h-3.5" />
              {language === 'om' ? 'WARAQAA RAGAA GUMAACHA BUUSAA GONOFAA' : 'OFFICIAL SOLIDARITY CONTRIBUTION CERTIFICATE'}
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center space-y-4 my-8">
            <p className="text-xs text-slate-500 uppercase tracking-widest">This honors and certifies that</p>
            <h2 className="text-2xl sm:text-3xl font-black text-gadaa-green tracking-tight font-serif border-b-2 border-gadaa-gold/40 pb-2 inline-block px-8">
              {donation.isAnonymous ? 'Generous Anonymous Donor' : donation.donorName}
            </h2>
            <p className="text-sm text-slate-700 max-w-lg mx-auto leading-relaxed pt-2">
              has generously contributed <strong className="text-gadaa-green text-base">ETB {donation.amountETB.toLocaleString()}</strong> via <strong className="capitalize">{donation.paymentGateway.replace('_', ' ')}</strong> in support of the humanitarian mission:
            </p>
            <div className="bg-gadaa-gold/10 border border-gadaa-gold/30 rounded-xl py-2 px-4 max-w-md mx-auto">
              <span className="font-black text-slate-900 text-sm">{donation.campaignTitle}</span>
            </div>
            <p className="text-xs text-slate-500 italic max-w-md mx-auto">
              "Duudhaa fi Aadaa Oromoo Ganamaa Buusaa Gonofaan Lammii Keenya Balaa Uumamaarraa Baraaruuf."
            </p>
          </div>

          {/* Metadata & Seals Grid */}
          <div className="grid grid-cols-3 gap-4 items-end border-t border-slate-200 pt-6 mt-6">
            {/* Hash & QR */}
            <div className="text-left space-y-1">
              <div className="text-[10px] text-slate-400 font-mono">CERTIFICATE ID:</div>
              <div className="font-mono text-xs font-bold text-slate-800">{donation.transactionHash.slice(0, 14)}...</div>
              <div className="text-[10px] text-slate-400">ISSUED: {new Date(donation.timestamp).toLocaleDateString()}</div>
              <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                <CheckCircle2 className="w-3 h-3" /> Commission Verified
              </div>
            </div>

            {/* Official Commission Stamp */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full border-4 border-gadaa-red/60 flex flex-col items-center justify-center text-gadaa-red p-1 rotate-[-6deg]">
                <Shield className="w-5 h-5 mb-0.5" />
                <span className="text-[7px] font-black uppercase leading-tight">BUUSAA GONOFAA</span>
                <span className="text-[6px] uppercase font-bold text-slate-600">OROMIA COMMISSION</span>
                <span className="text-[6px] font-mono font-bold text-gadaa-gold">★ VERIFIED ★</span>
              </div>
            </div>

            {/* Signature */}
            <div className="text-right space-y-1">
              <div className="font-serif italic text-lg text-slate-800 border-b border-slate-300 pb-0.5 inline-block">
                Worku Fikadu
              </div>
              <div className="text-[10px] font-bold text-slate-600 uppercase">Commissioner / Registrar</div>
              <div className="text-[9px] text-slate-400">Labsii Lakk. 244/2014</div>
            </div>
          </div>
        </div>

        {/* Action Buttons (hidden in print) */}
        <div className="flex items-center justify-end gap-3 mt-6 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gadaa-green hover:bg-gadaa-greenDark text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            {language === 'om' ? 'Waraqaa Ragaa Maxxansi (Print / PDF)' : 'Print / Save as PDF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationCertificateModal;
