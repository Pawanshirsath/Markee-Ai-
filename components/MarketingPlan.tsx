import React from 'react';
import type { MarketingPlan } from '../types';
import DonutChart from './DonutChart';

interface MarketingPlanProps {
  plan: MarketingPlan;
}

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-700 p-2 rounded-full">{icon}</div>
            <h3 className="text-xl font-bold text-purple-400">{title}</h3>
        </div>
        <div className="text-slate-300 space-y-4">{children}</div>
    </div>
);

const StrategyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const AudienceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ContentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CampaignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.584M9 18L5 18M5 18l4-4" /></svg>;
const SocialShareIcon = ({ platform }: { platform: 'twitter' | 'linkedin' | 'facebook' }) => {
    const icons = {
        twitter: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>,
        linkedin: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>,
        facebook: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0 0 3.603 0 8.049c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H11.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>,
    };
    return icons[platform];
};

const MarketingPlanDisplay: React.FC<MarketingPlanProps> = ({ plan }) => {
  const contentFormatData = React.useMemo(() => {
    if (!plan.contentPlan?.ideas?.length) return [];

    const formatCounts = plan.contentPlan.ideas.reduce((acc, idea) => {
      const format = idea.format || 'Uncategorized';
      acc[format] = (acc[format] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalIdeas = plan.contentPlan.ideas.length;
    const colors = ['#a78bfa', '#4ade80', '#fbbf24', '#60a5fa', '#f472b6'];
    let colorIndex = 0;

    return Object.entries(formatCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => {
        const percentage = (count / totalIdeas) * 100;
        const color = colors[colorIndex % colors.length];
        colorIndex++;
        return {
          name,
          value: percentage,
          color,
        };
    });
  }, [plan.contentPlan]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
        <SectionCard title={plan.overallStrategy.title} icon={<StrategyIcon />}>
            <p>{plan.overallStrategy.summary}</p>
            <h4 className="font-semibold text-slate-100 mt-4">Key Pillars:</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
                {plan.overallStrategy.keyPillars.map((pillar, i) => <li key={i}>{pillar}</li>)}
            </ul>
        </SectionCard>

        <SectionCard title="Target Audience" icon={<AudienceIcon />}>
            <div>
                <h4 className="font-semibold text-slate-100 mb-2">Primary Channels:</h4>
                <div className="flex flex-wrap gap-2">
                    {plan.targetAudience.channels.map((channel, i) => (
                        <span key={i} className="bg-purple-900/50 text-purple-300 text-sm font-medium px-3 py-1 rounded-full">{channel}</span>
                    ))}
                </div>
            </div>
            {plan.targetAudience.personas.map((persona, i) => (
                 <div key={i} className="bg-slate-900/50 p-4 rounded-lg">
                    <h5 className="font-bold text-slate-100">{persona.name}</h5>
                    <p className="text-sm">{persona.description}</p>
                </div>
            ))}
        </SectionCard>

        <SectionCard title="Content Plan" icon={<ContentIcon />}>
             <div>
                <h4 className="font-semibold text-slate-100 mb-2">Core Themes:</h4>
                <div className="flex flex-wrap gap-2">
                    {plan.contentPlan.themes.map((theme, i) => (
                        <span key={i} className="bg-slate-700 text-slate-300 text-sm font-medium px-3 py-1 rounded-full">{theme}</span>
                    ))}
                </div>
            </div>
             {contentFormatData.length > 1 && (
                <div className="bg-slate-900/50 p-6 rounded-lg my-6">
                    <h4 className="font-bold text-slate-100 mb-4 text-center">Content Format Mix</h4>
                    <DonutChart data={contentFormatData} />
                </div>
            )}
            <div className="space-y-4">
                <h4 className="font-semibold text-slate-100 mb-2">Specific Ideas:</h4>
                {plan.contentPlan.ideas.map((idea, i) => {
                  const shareText = `Check out this content idea: "${idea.title}" - ${idea.description}`;
                  const encodedText = encodeURIComponent(shareText);
                  const encodedTitle = encodeURIComponent(idea.title);
                  const encodedDescription = encodeURIComponent(idea.description);
                  // A placeholder URL is needed for some platforms like Facebook
                  const placeholderUrl = encodeURIComponent("https://example.com");

                  return (
                    <div key={i} className="bg-slate-900/50 p-4 rounded-lg">
                        <p className="font-semibold text-slate-100"><span className="font-bold text-teal-400 mr-2">{idea.format}:</span>{idea.title}</p>
                        <p className="text-sm mt-1">{idea.description}</p>
                        <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center gap-4">
                           <h5 className="text-xs font-semibold text-slate-400">Quick Actions:</h5>
                           <div className="flex items-center gap-2">
                               <a href={`https://twitter.com/intent/tweet?text=${encodedText}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded-md text-xs transition-colors" title="Share on X">
                                   <SocialShareIcon platform="twitter" /> X
                               </a>
                               <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${placeholderUrl}&title=${encodedTitle}&summary=${encodedDescription}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded-md text-xs transition-colors" title="Share on LinkedIn">
                                   <SocialShareIcon platform="linkedin" /> LinkedIn
                               </a>
                               <a href={`https://www.facebook.com/sharer/sharer.php?u=${placeholderUrl}&quote=${encodedText}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded-md text-xs transition-colors" title="Share on Facebook">
                                   <SocialShareIcon platform="facebook" /> Facebook
                               </a>
                               <button onClick={() => alert('Connect your social media scheduler (e.g., Buffer, Hootsuite) to enable this feature.')} className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded-md text-xs transition-colors" title="Schedule this post">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" /></svg>
                                   Schedule
                               </button>
                           </div>
                        </div>
                    </div>
                  );
                })}
            </div>
        </SectionCard>

        <SectionCard title="Campaign Ideas" icon={<CampaignIcon />}>
            {plan.campaignIdeas.map((campaign, i) => (
                <div key={i} className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="font-bold text-slate-100">{campaign.name}</h4>
                    <span className="text-xs bg-teal-900/50 text-teal-300 font-medium px-2 py-0.5 rounded-full">{campaign.objective}</span>
                    <p className="text-sm mt-2">{campaign.description}</p>
                    <div className="mt-3">
                      <h5 className="text-xs font-semibold text-slate-400 mb-1">KPIs to Track:</h5>
                      <div className="flex flex-wrap gap-2">
                        {campaign.kpis.map((kpi, k) => (
                          <span key={k} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-md">{kpi}</span>
                        ))}
                      </div>
                    </div>
                </div>
            ))}
        </SectionCard>
    </div>
  );
};

export default MarketingPlanDisplay;
