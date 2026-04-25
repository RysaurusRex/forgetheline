import { ToolPage } from "@/components/tool-page"

const RESUME_ANALYZER_PROMPT = `You are a law enforcement hiring expert. Analyze the resume and provide:
1. Overall fit for law enforcement positions (1-10 score)
2. Key strengths relevant to law enforcement
3. Areas to improve or remove
4. Specific rewrite suggestions
5. Keywords to add for law enforcement applications`

const RESUME_ANALYZER_STEPS = [
  "Copy the prompt above",
  "Paste your resume in the chat",
  "Ask ChatGPT/Claude to analyze using the prompt",
  "Copy the analysis to 'Your Output' below",
  "Save for your records",
]

const EXAMPLE_RESUME_OUTPUT = `Score: 7/10
Strengths: Leadership experience, security clearance background
Areas to Remove: Unrelated retail experience
Keywords to Add:counterintelligence, surveillance, threat assessment`

export default function ResumeAnalyzerPage() {
  return (
    <ToolPage
      tool="RESUME_ANALYZER"
      title="Resume Analyzer"
      description="Analyze your resume for law enforcement positions"
      steps={RESUME_ANALYZER_STEPS}
      prompt={RESUME_ANALYZER_PROMPT}
      exampleOutput={EXAMPLE_RESUME_OUTPUT}
    />
  )
}