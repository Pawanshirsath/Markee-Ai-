import React, { useState } from 'react';
import type { CompanyProfile } from '../types';

interface InputFormProps {
  onSubmit: (profile: CompanyProfile) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [profile, setProfile] = useState<CompanyProfile>({
    name: '',
    description: '',
    targetAudience: '',
    products: '',
    goals: '',
    challenges: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const isFormValid = Object.entries(profile)
    .filter(([key]) => key !== 'challenges') // challenges field is optional
    .every(([, value]) => (value as string).trim() !== '');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
        onSubmit(profile);
    }
  };
  
  const fillWithSampleData = () => {
    setProfile({
      name: "Stellar Coffee Co.",
      description: "A specialty coffee roaster and cafe chain focused on ethically sourced, single-origin beans. We provide a premium coffee experience for connoisseurs and casual drinkers alike in a modern, welcoming atmosphere.",
      targetAudience: "Urban professionals, students, and remote workers aged 22-45 who appreciate high-quality coffee, sustainable practices, and a 'third place' to work or socialize.",
      products: "Roasted coffee beans (whole or ground), brewed coffee, espresso drinks, specialty teas, artisanal pastries, and coffee-making equipment.",
      goals: "Increase online sales of coffee beans by 30% in the next quarter, grow local foot traffic by 15%, and establish our brand as a thought leader in the specialty coffee industry.",
      challenges: "Low brand awareness outside of our immediate local area. Difficulty converting our social media followers into paying customers for our online bean subscriptions."
    });
  };

  return (
    <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-3xl mx-auto border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Company Profile</h2>
        <button
          onClick={fillWithSampleData}
          className="text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 py-1 px-3 rounded-md transition-colors"
        >
          Use Sample Data
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Company Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            placeholder="e.g., Stellar Coffee Co."
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Company Description</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={profile.description}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            placeholder="What does your company do?"
          />
        </div>
        <div>
          <label htmlFor="products" className="block text-sm font-medium text-slate-300 mb-2">Products/Services</label>
          <textarea
            name="products"
            id="products"
            rows={3}
            value={profile.products}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            placeholder="List your key offerings."
          />
        </div>
        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-slate-300 mb-2">Target Audience</label>
          <input
            type="text"
            name="targetAudience"
            id="targetAudience"
            value={profile.targetAudience}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            placeholder="Who are your customers?"
          />
        </div>
        <div>
          <label htmlFor="goals" className="block text-sm font-medium text-slate-300 mb-2">Marketing Goals</label>
          <input
            type="text"
            name="goals"
            id="goals"
            value={profile.goals}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            placeholder="e.g., Increase brand awareness, generate leads"
          />
        </div>
        <div>
          <label htmlFor="challenges" className="block text-sm font-medium text-slate-300 mb-2">
            Key Challenges / Weaknesses <span className="text-slate-400 text-xs">(Optional)</span>
          </label>
          <textarea
            name="challenges"
            id="challenges"
            rows={3}
            value={profile.challenges}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            placeholder="e.g., Low brand awareness, poor social media engagement"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !isFormValid}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 hover:from-blue-600 hover:via-purple-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;