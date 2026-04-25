// Use manual prompts - AI quotas exhausted

export async function generateAIResponse(systemPrompt: string, userContent: string): Promise<string> {
  return "AI quota exhausted. Copy the prompt from the tool page to use with ChatGPT/Claude manually."
}

export const prompts = {
  RESUME_ANALYZER: `You are a law enforcement hiring expert. Analyze the resume and provide:
1. Overall fit for law enforcement positions (1-10 score)
2. Key strengths relevant to law enforcement
3. Areas to improve or remove
4. Specific rewrite suggestions
5. Keywords to add for law enforcement applications`,

  INTERVIEW_SIMULATOR: `You are conducting a law enforcement interview. 
Provide 5-7 tough interview questions with scoring criteria:
1. Behavioral questions (STAR format)
2. Situational judgment questions
3. Ethical scenarios
4. Motivation questions
5. Background probing questions
Include model answers for each.`,

  DISQUALIFIER_SCANNER: `You are a law enforcement hiring risk assessment expert.
Analyze the background provided and identify:
1. Potential disqualifiers (top 5)
2. Severity rating (Low/Medium/High)
3. Mitigation strategies for each
4. Recommended disclosures
5. Red flags for specific agencies`,

  STRATEGY_ENGINE: `You are a strategic advisor for law enforcement candidates.
Create a 90-day strategy plan including:
1. Timeline with milestones
2. Priority actions by week
3. Agency-specific strategies
4. Backup plans if primary path fails
5. Resources needed`,
}