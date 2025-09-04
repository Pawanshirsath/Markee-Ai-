export interface CompanyProfile {
  name: string;
  description: string;
  targetAudience: string;
  products: string;
  goals: string;
  challenges?: string;
}

export interface MarketingPlan {
  overallStrategy: {
    title: string;
    summary: string;
    keyPillars: string[];
  };
  targetAudience: {
    personas: {
      name: string;
      description: string;
    }[];
    channels: string[];
  };
  contentPlan: {
    themes: string[];
    ideas: {
      format: string;
      title: string;
      description: string;
    }[];
  };
  campaignIdeas: {
    name: string;
    description: string;
    objective: string;
    kpis: string[];
  }[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}