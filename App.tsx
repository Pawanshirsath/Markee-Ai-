import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import LoadingSpinner from './components/LoadingSpinner';
import MarketingPlanDisplay from './components/MarketingPlan';
import ChatInterface from './components/ChatInterface';
import { generateMarketingPlan } from './services/geminiService';
import type { CompanyProfile, MarketingPlan, ChatMessage } from './types';
import { GoogleGenAI, Chat } from "@google/genai";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [marketingPlan, setMarketingPlan] = useState<MarketingPlan | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);

  // Chat state
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const handleFormSubmit = useCallback(async (profile: CompanyProfile) => {
    setIsLoading(true);
    setError(null);
    setMarketingPlan(null);
    setCompanyProfile(profile);
    setIsChatOpen(false);
    setChatMessages([]);

    try {
      const plan = await generateMarketingPlan(profile);
      setMarketingPlan(plan);

      // Initialize chat session after plan is generated
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const initialBotMessage = "Great! I've reviewed your marketing plan. How can I help you refine it? Feel free to ask for different campaign ideas, content formats, or audience targeting strategies.";
      
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: `You are an expert marketing assistant named Markee. A marketing plan has been generated for a user. Your role is to help the user refine this plan conversationally. The user will provide feedback and ask for changes, and you should provide updated suggestions. Be concise and helpful.`
        },
        history: [
          {
            role: 'user',
            parts: [{ text: `Here is the initial marketing plan I generated for my company, "${profile.name}". Please help me refine it. \n\n${JSON.stringify(plan, null, 2)}` }]
          },
          {
            role: 'model',
            parts: [{ text: initialBotMessage }]
          }
        ]
      });
      setChatSession(chat);
      setChatMessages([{ role: 'model', text: initialBotMessage }]);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSendMessage = async (message: string) => {
    if (!chatSession) return;
    
    setChatMessages(prev => [...prev, { role: 'user', text: message }]);
    setIsChatLoading(true);

    try {
      const response = await chatSession.sendMessage({ message });
      setChatMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (err) {
       setChatMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
       console.error("Chat error:", err);
    } finally {
      setIsChatLoading(false);
    }
  };
  
  const resetApp = () => {
    setMarketingPlan(null);
    setError(null);
    setIsLoading(false);
    setIsChatOpen(false);
    setChatMessages([]);
    setChatSession(null);
    setCompanyProfile(null);
  }

  const handleExportPlan = () => {
    if (!marketingPlan || !companyProfile) return;

    const formatPlanForExport = (plan: MarketingPlan, profile: CompanyProfile): string => {
      let content = `Marketing Plan for: ${profile.name}\n`;
      content += `========================================\n\n`;

      // Overall Strategy
      content += `## Overall Strategy: ${plan.overallStrategy.title} ##\n`;
      content += `${plan.overallStrategy.summary}\n\n`;
      content += `Key Pillars:\n`;
      plan.overallStrategy.keyPillars.forEach(pillar => {
        content += `- ${pillar}\n`;
      });
      content += `\n`;

      // Target Audience
      content += `## Target Audience ##\n`;
      content += `Primary Channels: ${plan.targetAudience.channels.join(', ')}\n\n`;
      content += `Personas:\n`;
      plan.targetAudience.personas.forEach(persona => {
        content += `- ${persona.name}: ${persona.description}\n`;
      });
      content += `\n`;

      // Content Plan
      content += `## Content Plan ##\n`;
      content += `Core Themes: ${plan.contentPlan.themes.join(', ')}\n\n`;
      content += `Specific Ideas:\n`;
      plan.contentPlan.ideas.forEach(idea => {
        content += `- [${idea.format}] ${idea.title}: ${idea.description}\n`;
      });
      content += `\n`;

      // Campaign Ideas
      content += `## Campaign Ideas ##\n`;
      plan.campaignIdeas.forEach(campaign => {
        content += `Campaign: ${campaign.name}\n`;
        content += `Objective: ${campaign.objective}\n`;
        content += `Description: ${campaign.description}\n`;
        content += `KPIs: ${campaign.kpis.join(', ')}\n\n`;
      });

      return content;
    };

    const formattedPlan = formatPlanForExport(marketingPlan, companyProfile);
    const blob = new Blob([formattedPlan], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = `Markee_Plan_for_${companyProfile.name.replace(/\s+/g, '_')}.txt`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {!marketingPlan && (
          <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        )}
        
        {isLoading && <LoadingSpinner />}
        
        {error && (
            <div className="text-center my-10 bg-red-900/30 border border-red-500 text-red-300 p-6 rounded-lg max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-2">Oops! Something went wrong.</h3>
                <p>{error}</p>
                <button 
                  onClick={resetApp}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Try Again
                </button>
            </div>
        )}

        {marketingPlan && !isLoading && (
            <div className="animate-fade-in">
                <MarketingPlanDisplay plan={marketingPlan} />
                <div className="text-center mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button 
                    onClick={resetApp}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-6 rounded-lg transition-colors order-3 sm:order-1"
                  >
                    Create Another Plan
                  </button>
                  <button
                    onClick={handleExportPlan}
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-6 rounded-lg transition-colors order-2 sm:order-2 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Export Plan
                  </button>
                   <button 
                    onClick={() => setIsChatOpen(true)}
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 hover:from-blue-600 hover:via-purple-600 hover:to-teal-600 text-white font-bold py-2 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg order-1 sm:order-3 flex items-center gap-2"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3.5a1.5 1.5 0 011.378 2.259l-3.336 6.672a1.5 1.5 0 01-2.756 0L2.122 5.759A1.5 1.5 0 013.5 3.5h6.5zm3.755 7.835l2.036-4.073a1.5 1.5 0 00-2.756-1.378l-2.036 4.073a1.5 1.5 0 002.756 1.378z" />
                        <path d="M13.5 10a.5.5 0 01.5.5v3.5a.5.5 0 01-1 0V10.5a.5.5 0 01.5-.5z" />
                     </svg>
                    Refine with AI Chat
                  </button>
                </div>
            </div>
        )}
      </main>
      
      {isChatOpen && (
        <ChatInterface 
          messages={chatMessages}
          isLoading={isChatLoading}
          onSendMessage={handleSendMessage}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      <footer className="text-center py-6 text-sm text-slate-500">
        <p>Powered by Google Gemini ✨ For informational purposes only.</p>
      </footer>
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default App;