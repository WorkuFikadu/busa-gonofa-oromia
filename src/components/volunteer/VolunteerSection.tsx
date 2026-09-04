import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppState } from '../../context/AppStateContext';
import { zonesData } from '../../data/zonesData';
import { Volunteer } from '../../types';
import {
  Users, Heart, Briefcase, MapPin, CheckCircle2, ChevronRight, Shield, Stethoscope, Truck, HandHeart
} from 'lucide-react';

const SKILL_OPTIONS = [
  { id: 'medical', label: 'Medical / First Aid', icon: Stethoscope },
  { id: 'logistics', label: 'Logistics / Transport', icon: Truck },
  { id: 'social_work', label: 'Social Work / Counseling', icon: Heart },
  { id: 'security', label: 'Security / Crowd Control', icon: Shield },
  { id: 'distribution', label: 'Aid Distribution', icon: HandHeart },
  { id: 'admin', label: 'Admin / Data Entry', icon: Briefcase },
];

const generateId = () => Math.random().toString(36).slice(2, 11).toUpperCase();

const VolunteerSection: React.FC = () => {
  const { language } = useLanguage();
  const { addVolunteer } = useAppState();
  const [submitted, setSubmitted] = useState<Volunteer | null>(null);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    zoneId: 'borena',
    skills: [] as string[],
    availability: 'emergency_only' as Volunteer['availability']
  });

  const toggleSkill = (skillId: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId) 
        ? prev.skills.filter(s => s !== skillId)
        : [...prev.skills, skillId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || form.skills.length === 0) return;
    
    const volunteer: Volunteer = {
      id: `vol-${generateId()}`,
      ...form,
      status: 'pending',
      registrationDate: new Date().toISOString()
    };
    
    addVolunteer(volunteer);
    setSubmitted(volunteer);
  };

  return (
    <section className="py-16 px-6 max-w-screen-xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gadaa-green/10 rounded-full mb-4">
          <Users className="w-8 h-8 text-gadaa-green" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
          {language === 'om' ? 'Garee Tola Ooltotaa' : language === 'am' ? 'የበጎ ፍቃደኞች ምዝገባ' : 'Volunteer Response Corps'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {language === 'om' ? 'Yeroo rakkoo lammii keessaniif birmachuuf galmaa\'aa. Waliin taanee uummata keenya haa baraarru.' : 'Join the official regional registry for emergency responders, community mobilizers, and aid distributors.'}
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Full Name *</label>
              <input required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Phone Number *</label>
              <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Primary Zone <MapPin className="w-3.5 h-3.5 inline text-gadaa-gold" /></label>
              <select value={form.zoneId} onChange={e => setForm({...form, zoneId: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50">
                {zonesData.map(z => (
                  <option key={z.id} value={z.id}>{language === 'om' ? z.name.om : z.name.en}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Skills & Expertise * (Select all that apply)</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SKILL_OPTIONS.map(skill => {
                const Icon = skill.icon;
                const active = form.skills.includes(skill.id);
                return (
                  <button
                    type="button"
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all ${
                      active ? 'border-gadaa-green bg-gadaa-green/10 text-gadaa-green' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-gadaa-green/40'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-gadaa-green' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold leading-tight">{skill.label}</span>
                  </button>
                );
              })}
            </div>
            {form.skills.length === 0 && <p className="text-red-500 text-xs mt-2">Please select at least one skill area.</p>}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Availability</label>
            <div className="flex gap-4 flex-wrap">
              {[
                { id: 'emergency_only', label: 'Emergency Response Only' },
                { id: 'part_time', label: 'Part-Time / Weekends' },
                { id: 'full_time', label: 'Full-Time Deployment' },
              ].map(opt => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
                  <input 
                    type="radio" 
                    name="availability" 
                    checked={form.availability === opt.id}
                    onChange={() => setForm({...form, availability: opt.id as Volunteer['availability']})}
                    className="w-4 h-4 text-gadaa-green focus:ring-gadaa-green"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={!form.fullName || !form.phone || form.skills.length === 0}
            className="w-full bg-gadaa-green hover:bg-gadaa-greenDark disabled:opacity-50 text-white py-4 rounded-xl font-black text-lg transition-all shadow-lg flex justify-center items-center gap-2"
          >
            Register to Volunteer <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-gadaa-green p-8 max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-gadaa-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-gadaa-green" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Registration Received!</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Thank you, <span className="font-bold text-slate-900 dark:text-white">{submitted.fullName}</span>. Your application to join the Buusaa Gonofaa Volunteer Response Corps has been recorded.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 text-left space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
              <span>Volunteer ID:</span>
              <span className="font-mono font-bold text-gadaa-green">{submitted.id}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 py-2">
              <span>Primary Zone:</span>
              <span className="font-bold">{zonesData.find(z => z.id === submitted.zoneId)?.name.en}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span>Status:</span>
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold text-xs uppercase">Pending Review</span>
            </div>
          </div>
          <button onClick={() => setSubmitted(null)} className="mt-8 text-gadaa-green font-bold text-sm hover:underline">
            Register Another Volunteer
          </button>
        </div>
      )}
    </section>
  );
};

export default VolunteerSection;
