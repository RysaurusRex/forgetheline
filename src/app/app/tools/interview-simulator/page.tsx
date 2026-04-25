import { ToolPage } from "@/components/tool-page"

const INTERVIEW_PROMPT = `You are conducting a law enforcement interview. 
Provide 5-7 tough interview questions with scoring criteria:
1. Behavioral questions (STAR format)
2. Situational judgment questions
3. Ethical scenarios
4. Motivation questions
5. Background probing questions
Include model answers for each.`

const INTERVIEW_STEPS = [
  "Copy the prompt above",
  "Enter the role you're targeting",
  "Ask the AI to generate questions",
  "Practice answering out loud",
  "Save your prepared answers below",
]

export default function InterviewSimulatorPage() {
  return (
    <ToolPage
      tool="INTERVIEW_SIMULATOR"
      title="Interview Simulator"
      description="Practice for law enforcement hiring interviews"
      steps={INTERVIEW_STEPS}
      prompt={INTERVIEW_PROMPT}
    />
  )
}