
import React, { useState } from 'react';
import { User } from '../types';

const CompanySettings: React.FC<{ user: User }> = ({ user }) => {
  const [ssoProvider, setSsoProvider] = useState('okta');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Company Setup</h1>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-1">Enterprise Configuration & Infrastructure</p>
      </header>

      {saveSuccess && (
        <div className="bg-emerald-50 text-emerald-700 px-6 py-4 rounded-2xl border border-emerald-100 font-bold text-sm animate-in slide-in-from-top-4">
          ✓ Configuration successfully synchronized with global servers.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Registration Details */}
        <section className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-xl shadow-blue-500/5">
          <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
            <span>🏢</span> Company Profile
          </h3>
          <div className="space-y-6">
            <InputField label="Entity Identity" defaultValue="IBM India Pvt Ltd" />
            <InputField label="Global HQ" defaultValue="Bangalore, Karnataka" />
            <div className="grid grid-cols-2 gap-6">
              <InputField label="Employee Count" defaultValue="2,000" />
              <InputField label="Contract Status" defaultValue="Active (Tier 1)" />
            </div>
          </div>
        </section>

        {/* Privacy & Compliance */}
        <section className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
          <h3 className="text-2xl font-black mb-8 tracking-tight flex items-center gap-3">
            <span>🛡️</span> Security & Privacy
          </h3>
          <div className="space-y-6 relative z-10">
            <Toggle label="Manager Anonymity Shield" checked={true} description="Restrict manager access to aggregate trends only." />
            <Toggle label="k-Anonymity (k=5)" checked={true} description="Hide data if group size is below 5 employees." />
            <Toggle label="DPDPA 2023 Compliance" checked={true} description="Automatic data processing audits enabled." />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] -mr-32 -mt-32"></div>
        </section>

        {/* SSO Integration - The "Build SSO" requirement */}
        <section className="lg:col-span-2 bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-xl shadow-blue-500/5">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span>🔐</span> SSO Integration (SAML 2.0 / OAuth)
            </h3>
            <div className="flex gap-2">
              <ProviderBtn active={ssoProvider === 'okta'} onClick={() => setSsoProvider('okta')} label="Okta" />
              <ProviderBtn active={ssoProvider === 'azure'} onClick={() => setSsoProvider('azure')} label="Azure AD" />
              <ProviderBtn active={ssoProvider === 'google'} onClick={() => setSsoProvider('google')} label="Workspace" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField label="Identity Provider (IdP) URL" placeholder="https://sso.yourcompany.com" />
            <InputField label="App Federation Metadata" placeholder="Upload XML or paste URL" />
            <InputField label="SSO Target URL" defaultValue="https://mans360.in/api/v1/corporate/sso/acs" readOnly />
            <InputField label="Service Provider Entity ID" defaultValue="https://mans360.in" readOnly />
          </div>

          <div className="mt-10 p-6 bg-blue-50 rounded-3xl border border-blue-100">
            <p className="text-[10px] font-black text-[#1d7dfa] uppercase tracking-widest mb-2">Attribute Mapping Configuration</p>
            <div className="grid grid-cols-3 gap-4 text-xs font-bold text-slate-600">
              <div className="flex flex-col gap-1"><span>First Name</span><span className="text-[#1d7dfa]">firstName</span></div>
              <div className="flex flex-col gap-1"><span>Last Name</span><span className="text-[#1d7dfa]">lastName</span></div>
              <div className="flex flex-col gap-1"><span>Department</span><span className="text-[#1d7dfa]">dept</span></div>
            </div>
          </div>

          <div className="mt-10 flex justify-end gap-4">
            <button className="px-10 py-5 bg-slate-100 text-slate-400 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Test Connection</button>
            <button onClick={handleSave} className="px-12 py-5 bg-[#1d7dfa] text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-600 transition-all active:scale-95">Save Infrastructure</button>
          </div>
        </section>
      </div>
    </div>
  );
};

const InputField: React.FC<{ label: string; placeholder?: string; defaultValue?: string; readOnly?: boolean }> = ({ label, placeholder, defaultValue, readOnly }) => (
  <div>
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder} 
      defaultValue={defaultValue} 
      readOnly={readOnly}
      className={`w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-100 transition-all ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}`} 
    />
  </div>
);

const ProviderBtn: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-[#1d7dfa] text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
  >
    {label}
  </button>
);

const Toggle: React.FC<{ label: string; description: string; checked: boolean }> = ({ label, description, checked }) => (
  <div className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
    <div className="max-w-[80%]">
      <p className="font-black text-sm tracking-tight">{label}</p>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{description}</p>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-colors ${checked ? 'bg-[#1d7dfa]' : 'bg-slate-700'}`}>
       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${checked ? 'left-7' : 'left-1'}`}></div>
    </div>
  </div>
);

export default CompanySettings;
