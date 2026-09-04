import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppState } from '../../context/AppStateContext';
import { warehouseHubs } from '../../data/warehouseHubs';
import { MonetaryDonation, InKindDonationManifest, PropertyType } from '../../types';
import {
  DollarSign, Package, BarChart3,
  CheckCircle2, QrCode, Printer,
  Truck, Leaf, Pill, Building2, Droplets, ArrowRight,
  ChevronRight, Info, Award
} from 'lucide-react';
import DonationCertificateModal from './DonationCertificateModal';

const PAYMENT_GATEWAYS = [
  { id: 'telebirr', label: 'Telebirr', logo: '📱', color: 'bg-orange-500', desc: 'Ethio Telecom M-Wallet', domestic: true },
  { id: 'cbe_birr', label: 'CBE Birr', logo: '🏦', color: 'bg-blue-700', desc: 'Commercial Bank of Ethiopia', domestic: true },
  { id: 'cooppay', label: 'CoopPay', logo: '💚', color: 'bg-emerald-600', desc: 'Cooperative Bank', domestic: true },
  { id: 'awash_birr', label: 'Awash Birr', logo: '🏧', color: 'bg-teal-600', desc: 'Awash Bank', domestic: true },
  { id: 'chapa', label: 'Chapa', logo: '⚡', color: 'bg-violet-600', desc: 'Ethiopia Payment Gateway', domestic: true },
  { id: 'card_visa', label: 'Visa Card', logo: '💳', color: 'bg-blue-600', desc: 'Diaspora / International', domestic: false },
  { id: 'card_mastercard', label: 'Mastercard', logo: '🌐', color: 'bg-red-600', desc: 'Diaspora / International', domestic: false },
];

const DONATION_AMOUNTS = [500, 1000, 2500, 5000, 10000, 25000];

const PROPERTY_TYPES: { id: PropertyType; label: string; icon: React.ElementType; unit: string }[] = [
  { id: 'livestock', label: 'Livestock (Cattle / Goats / Camels)', icon: Leaf, unit: 'Head Count' },
  { id: 'grain', label: 'Grain (Teff, Wheat, Maize, Sorghum)', icon: Truck, unit: 'Quintals (Kuntaala)' },
  { id: 'building_equipment', label: 'Building Materials / Equipment', icon: Building2, unit: 'Kg / Units' },
  { id: 'medical_nutrition', label: 'Medical & Nutrition Supplies', icon: Pill, unit: 'Units / Boxes' },
  { id: 'water_storage', label: 'Water Storage / Containers', icon: Droplets, unit: 'Liters / Pieces' },
];

const CAMPAIGNS = [
  { id: 'camp-borena-drought', title: 'Borena Drought Emergency', titleOm: 'Balaa Hongee Booranaa', target: 18000000, raised: 12400000, donors: 2847, urgent: true },
  { id: 'camp-flood-awash', title: 'Awash Flood Response', titleOm: 'Deebii Lolaa Awaash', target: 12000000, raised: 6800000, donors: 1524, urgent: true },
  { id: 'camp-east-bale', title: 'East Bale Pastoralists', titleOm: 'Horsiise Bultaa Baha Baalee', target: 9500000, raised: 4200000, donors: 892, urgent: false },
  { id: 'camp-wollega-idp', title: 'Wollega IDP Resettlement', titleOm: 'Deebisanii Dhaabuu Buqqaatota', target: 22000000, raised: 15100000, donors: 3105, urgent: false },
];

const generateId = () => Math.random().toString(36).slice(2, 11).toUpperCase();
const generateHash = () => `0x${Math.random().toString(16).slice(2, 18).toUpperCase()}`;

// ======== MONETARY PIPELINE ========
const MonetaryPipeline: React.FC = () => {
  const { language } = useLanguage();
  const { addMonetaryDonation, monetaryDonations } = useAppState();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCampaign, setSelectedCampaign] = useState(CAMPAIGNS[0].id);
  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState('');
  const [gateway, setGateway] = useState('telebirr');
  const [donorName, setDonorName] = useState('');
  const [donorContact, setDonorContact] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [receipt, setReceipt] = useState<MonetaryDonation | null>(null);
  const [selectedCert, setSelectedCert] = useState<MonetaryDonation | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const finalAmount = amount || Number(customAmount);

  const handleConfirm = () => {
    if (!finalAmount || finalAmount < 10) return;
    setIsProcessing(true);

    // Simulate API integration with local/international gateways (e.g., Chapa, Telebirr, Stripe)
    setTimeout(() => {
      const campaign = CAMPAIGNS.find(c => c.id === selectedCampaign)!;
      const donation: MonetaryDonation = {
        id: `md-${generateId()}`,
        transactionHash: generateHash(),
        donorName: isAnonymous ? 'Anonymous' : donorName || 'Anonymous',
        donorContact: donorContact,
        amountETB: finalAmount,
        paymentGateway: gateway as MonetaryDonation['paymentGateway'],
        campaignId: selectedCampaign,
        campaignTitle: campaign.title,
        isAnonymous,
        status: 'settled',
        timestamp: new Date().toISOString(),
        cryptographicQRHash: generateHash(),
      };
      addMonetaryDonation(donation);
      setReceipt(donation);
      setStep(3);
      setIsProcessing(false);
    }, 2500); // 2.5 second simulated delay for banking API
  };

  if (isProcessing) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-slate-200 dark:border-slate-700 shadow-xl text-center max-w-md mx-auto">
        <div className="animate-spin w-12 h-12 border-4 border-gadaa-green border-t-transparent rounded-full mx-auto mb-6"></div>
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2">Connecting to Gateway...</h3>
        <p className="text-slate-500 text-sm">
          {gateway === 'telebirr' ? 'Initiating Telebirr Push Notification...' :
           gateway === 'card_visa' || gateway === 'card_mastercard' ? 'Connecting to International Payment Gateway (Stripe)...' :
           gateway === 'chapa' ? 'Redirecting to Chapa Payment Page...' :
           `Contacting ${PAYMENT_GATEWAYS.find(g => g.id === gateway)?.label} systems...`}
        </p>
      </div>
    );
  }

  if (step === 3 && receipt) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-emerald-400 shadow-xl text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-1">Galatoomaa! / Thank You!</h3>
        <p className="text-slate-500 text-sm mb-4">Your solidarity contribution has been received and recorded.</p>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-4 text-left space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Amount</span><span className="font-bold text-slate-800 dark:text-white">ETB {receipt.amountETB.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Campaign</span><span className="font-bold text-slate-800 dark:text-white">{receipt.campaignTitle}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Gateway</span><span className="font-bold text-slate-800 dark:text-white capitalize">{receipt.paymentGateway.replace('_', ' ')}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Timestamp</span><span className="font-mono text-xs text-slate-800 dark:text-white">{new Date(receipt.timestamp).toLocaleString()}</span></div>
        </div>

        {/* Cryptographic QR Sim */}
        <div className="border-2 border-dashed border-gadaa-green/30 rounded-xl p-4 mb-4">
          <QrCode className="w-14 h-14 mx-auto text-gadaa-green mb-2" />
          <p className="text-xs text-slate-500 font-mono break-all">{receipt.cryptographicQRHash}</p>
          <p className="text-xs text-slate-400 mt-1">Cryptographic Verification QR</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setSelectedCert(receipt)}
            className="flex-1 flex items-center justify-center gap-2 bg-gadaa-gold hover:bg-gadaa-goldDark text-gadaa-black py-2.5 rounded-xl font-bold text-sm shadow transition-colors"
          >
            <Award className="w-4 h-4" /> View Official Certificate (PDF)
          </button>
          <button
            onClick={() => { setStep(1); setReceipt(null); setAmount(0); setCustomAmount(''); }}
            className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            New Contribution
          </button>
        </div>

        {selectedCert && (
          <DonationCertificateModal donation={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Campaign Selection */}
      <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Select Humanitarian Campaign</label>
        <div className="grid sm:grid-cols-2 gap-3">
          {CAMPAIGNS.map(camp => {
            const pct = Math.min(100, Math.round((camp.raised / camp.target) * 100));
            return (
              <button
                key={camp.id}
                onClick={() => setSelectedCampaign(camp.id)}
                className={`text-left rounded-xl border-2 p-3 transition-all ${
                  selectedCampaign === camp.id
                    ? 'border-gadaa-green bg-gadaa-green/5 dark:bg-gadaa-green/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-gadaa-green/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-bold text-sm text-slate-800 dark:text-white leading-tight">
                    {language === 'om' ? camp.titleOm : camp.title}
                  </span>
                  {camp.urgent && <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold ml-1 flex-shrink-0">URGENT</span>}
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-gadaa-green rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="text-xs text-slate-500">ETB {(camp.raised / 1000000).toFixed(1)}M of {(camp.target / 1000000).toFixed(1)}M · {camp.donors.toLocaleString()} donors</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Amount */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Contribution Amount (ETB)</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
          {DONATION_AMOUNTS.map(a => (
            <button
              key={a}
              onClick={() => { setAmount(a); setCustomAmount(''); }}
              className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                amount === a ? 'border-gadaa-green bg-gadaa-green/5 text-gadaa-green ring-1 ring-gadaa-green' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {a.toLocaleString()}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder="Or enter custom amount..."
            value={customAmount}
            onChange={e => { setCustomAmount(e.target.value); setAmount(0); }}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50"
          />
        </div>
      </div>

      {/* Donor Info */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Full Name / Organization"
          value={donorName}
          onChange={e => setDonorName(e.target.value)}
          disabled={isAnonymous}
          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 disabled:bg-slate-50 disabled:opacity-50"
        />
        <input
          type="text"
          placeholder="Phone / Email"
          value={donorContact}
          onChange={e => setDonorContact(e.target.value)}
          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50"
        />
      </div>
      <label className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer select-none mb-8">
        <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-slate-500 focus:ring-slate-500" />
        Keep contribution anonymous
      </label>

      {/* Gateway Selection */}
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Select Payment Gateway</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PAYMENT_GATEWAYS.map(gw => (
            <button
              key={gw.id}
              onClick={() => setGateway(gw.id)}
              className={`p-4 rounded-2xl border text-center transition-all bg-white dark:bg-slate-800 ${
                gateway === gw.id ? 'border-gadaa-green ring-1 ring-gadaa-green bg-gadaa-green/5' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="text-2xl mb-2">{gw.logo}</div>
              <div className="font-bold text-sm text-slate-800 dark:text-white mb-0.5">{gw.label}</div>
              <div className="text-xs text-slate-500 leading-tight">{gw.desc}</div>
              {!gw.domestic && <div className="text-xs text-blue-500 mt-1">Diaspora</div>}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleConfirm}
        disabled={!finalAmount || finalAmount < 10}
        className="w-full bg-[#95BFA8] hover:bg-gadaa-green disabled:opacity-80 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <DollarSign className="w-5 h-5" />
        {finalAmount > 0 ? `Complete Contribution — ETB ${finalAmount.toLocaleString()}` : 'Select Amount to Continue'}
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Recent donations */}
      {monetaryDonations.length > 0 && (
        <div className="mt-4">
          <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-2">Recent Contributions (Live Ledger)</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {monetaryDonations.slice(0, 5).map(d => (
              <div key={d.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 rounded-xl px-4 py-2.5 text-sm">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-white">{d.isAnonymous ? '🔒 Anonymous' : d.donorName}</span>
                  <span className="text-slate-500 text-xs ml-2">{d.campaignTitle}</span>
                </div>
                <span className="font-black text-gadaa-green">ETB {d.amountETB.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ======== IN-KIND PIPELINE ========
const InKindPipeline: React.FC = () => {
  const { addInKindManifest } = useAppState();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [propertyType, setPropertyType] = useState<PropertyType>('grain');
  const [itemDescription, setItemDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [originZone, setOriginZone] = useState('borena');
  const [originWoreda, setOriginWoreda] = useState('');
  const [cargoToken, setCargoToken] = useState<InKindDonationManifest | null>(null);

  const selectedPropType = PROPERTY_TYPES.find(p => p.id === propertyType)!;

  const handleGenerate = () => {
    // Auto-allocate to nearest hub
    const hub = warehouseHubs.find(h => h.zoneId === originZone) || warehouseHubs[0];
    const manifest: InKindDonationManifest = {
      id: `ik-${generateId()}`,
      trackingCode: `BG-IK-${generateId()}`,
      donorName,
      donorPhone,
      originZone,
      originWoreda,
      propertyType,
      itemDescription,
      quantityUnits: `${quantity} ${selectedPropType.unit}`,
      estimatedWeightKg: Number(weightKg),
      allocatedWarehouseId: hub.id,
      allocatedWarehouseName: hub.name.en,
      status: 'pledged',
      pledgeDate: new Date().toISOString(),
      qrPayload: `BG-IK::${generateHash()}::${hub.id}`,
    };
    addInKindManifest(manifest);
    setCargoToken(manifest);
    setStep(3);
  };

  if (step === 3 && cargoToken) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 border-gadaa-green shadow-xl max-w-lg mx-auto">
        <div className="text-center mb-4">
          <div className="w-14 h-14 bg-gadaa-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Printer className="w-7 h-7 text-gadaa-green" />
          </div>
          <h3 className="font-black text-lg text-slate-900 dark:text-white">Official Cargo Token Generated</h3>
          <p className="text-sm text-slate-500">Present this token at the warehouse drop-off</p>
        </div>

        <div className="border-2 border-dashed border-gadaa-green/40 rounded-xl p-5 space-y-3 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gadaa-gold/50 bg-white flex-shrink-0">
              <img src="/Images/logo of busa gonofa.jpg" alt="BG" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-black text-gadaa-green text-sm">BUUSAA GONOFAA OROMIYAA</div>
              <div className="text-xs text-slate-500">Official In-Kind Cargo Token</div>
            </div>
          </div>
          {[
            { label: 'Tracking Code', value: cargoToken.trackingCode },
            { label: 'Property Type', value: cargoToken.propertyType.replace('_', ' ') },
            { label: 'Quantity', value: cargoToken.quantityUnits },
            { label: 'Donor', value: cargoToken.donorName },
            { label: 'Origin', value: `${cargoToken.originWoreda}, ${cargoToken.originZone}` },
            { label: 'Destination Hub', value: cargoToken.allocatedWarehouseName },
            { label: 'Status', value: '🟡 PLEDGED — Awaiting Physical Delivery' },
          ].map((row, i) => (
            <div key={i} className="flex justify-between text-sm border-b border-slate-100 dark:border-slate-700 pb-2 last:border-0">
              <span className="text-slate-500">{row.label}</span>
              <span className="font-bold text-slate-800 dark:text-white text-right ml-4">{row.value}</span>
            </div>
          ))}
          <div className="text-center pt-2">
            <QrCode className="w-14 h-14 mx-auto text-gadaa-green mb-1" />
            <p className="text-xs text-slate-400 font-mono">{cargoToken.qrPayload}</p>
          </div>
        </div>

        <button
          onClick={() => { setStep(1); setCargoToken(null); setDonorName(''); setQuantity(''); }}
          className="w-full bg-gadaa-green text-white py-3 rounded-xl font-bold text-sm hover:bg-gadaa-greenDark transition-colors"
        >
          Register Another Donation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${s <= step ? 'text-gadaa-green' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                s < step ? 'bg-gadaa-green border-gadaa-green text-white' :
                s === step ? 'border-gadaa-green text-gadaa-green' :
                'border-slate-300 dark:border-slate-600 text-slate-400'
              }`}>{s < step ? '✓' : s}</div>
              <span className="text-xs font-semibold hidden sm:block">
                {s === 1 ? 'Manifest' : s === 2 ? 'Hub Allocation' : 'Token'}
              </span>
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 ${s < step ? 'bg-gadaa-green' : 'bg-slate-200 dark:bg-slate-700'}`} />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Property / Goods Type</label>
            <div className="grid gap-2">
              {PROPERTY_TYPES.map(pt => {
                const Icon = pt.icon;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setPropertyType(pt.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      propertyType === pt.id ? 'border-gadaa-green bg-gadaa-green/5 dark:bg-gadaa-green/10' : 'border-slate-200 dark:border-slate-700 hover:border-gadaa-green/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${propertyType === pt.id ? 'text-gadaa-green' : 'text-slate-500'}`} />
                    <div>
                      <div className="font-semibold text-sm text-slate-800 dark:text-white">{pt.label}</div>
                      <div className="text-xs text-slate-500">Unit: {pt.unit}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Item Description</label>
              <input value={itemDescription} onChange={e => setItemDescription(e.target.value)} placeholder="e.g., Red Teff, 3-year-old cattle..." className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Quantity ({selectedPropType.unit})</label>
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Enter quantity..." className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Estimated Weight (Kg)</label>
              <input type="number" value={weightKg} onChange={e => setWeightKg(e.target.value)} placeholder="Total weight in kg..." className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 text-sm" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <input value={donorName} onChange={e => setDonorName(e.target.value)} placeholder="Donor Full Name" className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 text-sm" />
            <input value={donorPhone} onChange={e => setDonorPhone(e.target.value)} placeholder="Donor Phone" className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 text-sm" />
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Origin Zone</label>
              <select value={originZone} onChange={e => setOriginZone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 text-sm">
                {warehouseHubs.map(h => <option key={h.zoneId} value={h.zoneId}>{h.name.en}</option>)}
              </select>
            </div>
            <input value={originWoreda} onChange={e => setOriginWoreda(e.target.value)} placeholder="Origin Woreda" className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 text-sm" />
          </div>

          <button onClick={() => setStep(2)} disabled={!quantity || !donorName} className="w-full bg-gadaa-green hover:bg-gadaa-greenDark disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
            Next: Check Hub Allocation <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {step === 2 && (
        <>
          {/* Hub auto-allocation display */}
          <div className="bg-gadaa-green/5 dark:bg-gadaa-green/10 border-2 border-gadaa-green/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3 text-gadaa-green font-bold">
              <Truck className="w-5 h-5" />
              Auto-Allocated Warehouse Hub
            </div>
            {(() => {
              const hub = warehouseHubs.find(h => h.zoneId === originZone) || warehouseHubs[0];
              const capPct = Math.round((hub.currentStockTons / hub.capacityTons) * 100);
              return (
                <div className="space-y-3">
                  <div className="font-black text-lg text-slate-900 dark:text-white">{hub.name.en}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{hub.location}</div>
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="bg-white dark:bg-slate-700 rounded-xl p-2">
                      <div className="font-bold text-slate-800 dark:text-white">{hub.capacityTons.toLocaleString()}T</div>
                      <div className="text-xs text-slate-500">Capacity</div>
                    </div>
                    <div className="bg-white dark:bg-slate-700 rounded-xl p-2">
                      <div className={`font-bold ${capPct > 80 ? 'text-amber-600' : 'text-gadaa-green'}`}>{capPct}%</div>
                      <div className="text-xs text-slate-500">Occupancy</div>
                    </div>
                    <div className="bg-white dark:bg-slate-700 rounded-xl p-2">
                      <div className="font-bold text-slate-800 dark:text-white">{hub.grainStockQtl.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Grain Qtl</div>
                    </div>
                  </div>
                  <div className="text-sm"><span className="text-slate-500">Hub Coordinator:</span> <span className="font-semibold text-slate-800 dark:text-white">{hub.chiefCoordinator}</span></div>
                  <div className="text-sm"><span className="text-slate-500">Contact:</span> <span className="font-semibold text-slate-800 dark:text-white">{hub.contactPhone}</span></div>
                </div>
              );
            })()}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-3 flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Physically transport the goods to the hub above. Present the cargo token to the on-site coordinator for verification and ingestion.</span>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">← Back</button>
            <button onClick={handleGenerate} className="flex-1 bg-gadaa-green text-white py-3 rounded-xl font-bold text-sm hover:bg-gadaa-greenDark transition-all flex items-center justify-center gap-2">
              <Printer className="w-4 h-4" /> Generate Cargo Token
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ======== LEDGER VIEW ========
const LedgerView: React.FC = () => {
  const { monetaryDonations, inKindManifests, updateManifestStatus } = useAppState();
  const totalETB = monetaryDonations.reduce((s, d) => s + d.amountETB, 0);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Funds Received', value: `ETB ${totalETB.toLocaleString()}`, icon: DollarSign, color: 'text-gadaa-green' },
          { label: 'Donor Transactions', value: monetaryDonations.length.toString(), icon: BarChart3, color: 'text-blue-600' },
          { label: 'In-Kind Manifests', value: inKindManifests.length.toString(), icon: Package, color: 'text-amber-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <s.icon className={`w-6 h-6 mb-2 ${s.color}`} />
            <div className="font-black text-xl text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-3">Monetary Transaction Ledger</h4>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs text-slate-600 dark:text-slate-400 uppercase">
              <tr>
                {['Donor', 'Campaign', 'Amount (ETB)', 'Gateway', 'Status', 'Timestamp'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {monetaryDonations.map(d => (
                <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">{d.isAnonymous ? '🔒 Anonymous' : d.donorName}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{d.campaignTitle}</td>
                  <td className="px-4 py-3 font-bold text-gadaa-green">{d.amountETB.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 capitalize">{d.paymentGateway.replace('_', ' ')}</td>
                  <td className="px-4 py-3"><span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs px-2 py-0.5 rounded-full font-bold">{d.status}</span></td>
                  <td className="px-4 py-3 text-xs text-slate-500 font-mono">{new Date(d.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
              {monetaryDonations.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No transactions recorded yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {inKindManifests.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-3">In-Kind Cargo Manifest Ledger</h4>
          <div className="space-y-3">
            {inKindManifests.map(m => (
              <div key={m.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm text-slate-800 dark:text-white">{m.trackingCode}</div>
                    <div className="text-xs text-slate-500">{m.donorName} · {m.quantityUnits} · {m.propertyType}</div>
                    <div className="text-xs text-slate-500">→ {m.allocatedWarehouseName}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      m.status === 'verified_ingested' ? 'bg-emerald-100 text-emerald-700' :
                      m.status === 'pledged' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>{m.status.replace('_', ' ')}</span>
                    {m.status === 'pledged' && (
                      <button
                        onClick={() => updateManifestStatus(m.id, 'verified_ingested', 'Admin Officer')}
                        className="text-xs bg-gadaa-green text-white px-2.5 py-1 rounded-lg hover:bg-gadaa-greenDark transition-colors"
                      >
                        ✓ Mark Ingested
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ======== MAIN COMPONENT ========
const MobilizationSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'monetary' | 'inkind' | 'ledger'>('monetary');

  const tabs = [
    { id: 'monetary' as const, label: t.mobilization?.tabMonetary, icon: DollarSign },
    { id: 'inkind' as const, label: t.mobilization?.tabInKind, icon: Package },
    { id: 'ledger' as const, label: t.mobilization?.tabLedger, icon: BarChart3 },
  ];

  return (
    <section className="py-16 px-6 max-w-screen-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">{t.mobilization?.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.mobilization?.subtitle}</p>
      </div>

      {/* Tab switcher */}
      <div className="flex flex-col sm:flex-row bg-slate-100 dark:bg-slate-800 rounded-2xl p-1.5 gap-1.5 mb-8 max-w-3xl mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-gadaa-green shadow-md'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.id === 'monetary' ? 'Funds' : tab.id === 'inkind' ? 'Goods' : 'Ledger'}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'monetary' && <MonetaryPipeline />}
      {activeTab === 'inkind' && <InKindPipeline />}
      {activeTab === 'ledger' && <LedgerView />}
    </section>
  );
};

export default MobilizationSection;
