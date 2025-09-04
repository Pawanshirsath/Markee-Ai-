import { GoogleGenAI, Type } from "@google/genai";
import type { CompanyProfile, MarketingPlan } from "../types";

const marketingPlanSchema = {
  type: Type.OBJECT,
  properties: {
    overallStrategy: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "A catchy title for the overall marketing strategy."
        },
        summary: {
          type: Type.STRING,
          description: "A concise summary of the core marketing strategy, explicitly mentioning how it addresses the company's challenges if provided."
        },
        keyPillars: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of 3-5 key strategic pillars (e.g., Content Leadership, Community Engagement) designed to overcome the stated challenges."
        },
      },
      required: ["title", "summary", "keyPillars"],
    },
    targetAudience: {
      type: Type.OBJECT,
      properties: {
        personas: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "A name for the customer persona (e.g., 'Tech-Savvy Tina')." },
              description: { type: Type.STRING, description: "A detailed description of this persona's demographics, goals, and pain points." },
            },
            required: ["name", "description"],
          },
          description: "Detailed customer personas."
        },
        channels: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of the most effective channels to reach these personas (e.g., LinkedIn, Instagram, Tech Blogs)."
        },
      },
      required: ["personas", "channels"],
    },
    contentPlan: {
      type: Type.OBJECT,
      properties: {
        themes: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of overarching content themes that position the company as a solution to its challenges."
        },
        ideas: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              format: { type: Type.STRING, description: "The content format (e.g., 'Blog Post', 'Video Tutorial', 'Instagram Reel')." },
              title: { type: Type.STRING, description: "A compelling title for the piece of content." },
              description: { type: Type.STRING, description: "A brief description of what the content will cover and which challenge it helps address." },
            },
            required: ["format", "title", "description"],
          },
          description: "Specific content ideas with titles and descriptions."
        },
      },
      required: ["themes", "ideas"],
    },
    campaignIdeas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "A creative name for the marketing campaign." },
          description: { type: Type.STRING, description: "A detailed description of the campaign concept, explaining how it will tackle a specific company challenge." },
          objective: { type: Type.STRING, description: "The primary goal of the campaign (e.g., 'Lead Generation', 'Brand Awareness')." },
          kpis: {
            type: Type.ARRAY,
            items: {type: Type.STRING},
            description: "Key Performance Indicators to measure success (e.g., 'Conversion Rate', 'Click-Through Rate')."
          }
        },
        required: ["name", "description", "objective", "kpis"],
      },
      description: "Actionable marketing campaign ideas designed to solve the company's problems."
    },
  },
  required: ["overallStrategy", "targetAudience", "contentPlan", "campaignIdeas"],
};


export const generateMarketingPlan = async (profile: CompanyProfile): Promise<MarketingPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Based on the following company profile, create a comprehensive and actionable marketing plan.

    Company Profile:
    - Name: ${profile.name}
    - Description: ${profile.description}
    - Products/Services: ${profile.products}
    - Target Audience: ${profile.targetAudience}
    - Marketing Goals: ${profile.goals}
    ${profile.challenges ? `- Key Challenges to Solve: ${profile.challenges}` : ''}

    Generate a detailed plan covering overall strategy, target audience analysis, a content plan, and specific campaign ideas.
    Crucially, the entire marketing plan, from the overall strategy to the specific campaign ideas, must be specifically designed to provide strategic solutions for the company's "Key Challenges". Each part of the plan should clearly tie back to solving these problems.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: marketingPlanSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as MarketingPlan;
  } catch (error) {
    console.error("Error generating marketing plan:", error);
    throw new Error("Failed to generate marketing plan. Please check the console for more details.");
  }
};