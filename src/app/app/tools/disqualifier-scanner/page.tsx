import { ToolPage } from "@/components/tool-page"

const DISQUALIFIER_PROMPT = `You are a law enforcement hiring risk assessment expert.
Analyze the background provided and identify:
1. Potential disqualifiers (top 5)
2. Severity rating (Low/Medium/High)
3. Mitigation strategies for each
4. Recommended disclosures
5. Red flags for specific agencies`

const DISQUALIFIER_STEPS = [
  "Copy the prompt above",
  "Enter your full background (employment, legal, financial)",
  "Ask the AI to scan for disqualifiers",
  "Review mitigation strategies",
  "Save your analysis",
]

export default function DisqualifierScannerPage() {
  return (
    <ToolPage
      tool="DISQUALIFIER_SCANNER"
      title="Disqualifier Scanner"
      description="Identify potential red flags before the background investigation"
      steps={DISQUALIFIER_STEPS}
      prompt={DISQUALIFIER_PROMPT}
    />
  )
}