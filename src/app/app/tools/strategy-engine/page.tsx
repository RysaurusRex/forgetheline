import { ToolPage } from "@/components/tool-page"

const STRATEGY_PROMPT = `You are a strategic advisor for law enforcement candidates.
Create a 90-day strategy plan including:
1. Timeline with milestones
2. Priority actions by week
3. Agency-specific strategies
4. Backup plans if primary path fails
5. Resources needed`

const STRATEGY_STEPS = [
  "Copy the prompt above",
  "Enter your current stage and target roles",
  "Ask the AI for a strategic plan",
  "Customize the timeline to your needs",
  "Save your strategy",
]

export default function StrategyEnginePage() {
  return (
    <ToolPage
      tool="STRATEGY_ENGINE"
      title="Strategy Engine"
      description="Build your personalized 90-day hiring strategy"
      steps={STRATEGY_STEPS}
      prompt={STRATEGY_PROMPT}
    />
  )
}