"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, Clock, CheckCircle, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"
import Link from "next/link"

// Agency-specific questions based on insider research
const AGENCY_QUESTIONS: Record<string, Array<{ question: string; type: string; tip: string; star?: boolean }>> = {
  fbi: [
    {
      question: "Why do you want to be an FBI Special Agent specifically, and what have you done to prepare?",
      type: "Motivation",
      tip: "Insider: 'Know the FBI mission word-for-word: Protect the American people and uphold the Constitution. Mention it in your answer.'",
      star: false,
    },
    {
      question: "Tell us about a time you faced an ethical dilemma. What did you do and what was the outcome?",
      type: "Behavioral",
      tip: "Insider: 'Use STAR method. FBI loves this question. They want to see integrity over convenience.'",
      star: true,
    },
    {
      question: "You witness another agent planting evidence. What do you do?",
      type: "Situational",
      tip: "Insider: 'Answer must show you'll report, even if it's uncomfortable. FBI prioritizes integrity above all.'",
      star: false,
    },
    {
      question: "Describe a time when you handled extreme pressure. How did you maintain composure?",
      type: "Behavioral",
      tip: "Insider: 'FBI work is high-stress. Show you don't crack under pressure. Breathe, count to 3, respond calmly.'",
      star: true,
    },
    {
      question: "What is your biggest weakness and how are you working to improve it?",
      type: "Behavioral",
      tip: "Insider: 'Don't say 'I work too hard.' Give a real weakness but show you're actively improving it.'",
      star: true,
    },
    {
      question: "You're asked to investigate a close friend. How do you handle the conflict of interest?",
      type: "Situational",
      tip: "Insider: 'FBI: 'We need to know you'll do the job regardless of personal relationships. Answer: 'I'd recuse myself AND report the conflict.''",
      star: false,
    },
  ],
  dea: [
    {
      question: "Why DEA? What draws you to drug enforcement specifically?",
      type: "Motivation",
      tip: "Insider: 'DEA is niche. Show you understand the mission: 'Reduce supply of illicit drugs in America.' Mention opioid crisis.'",
      star: false,
    },
    {
      question: "Tell us about a time you dealt with a difficult person. How did you handle it?",
      type: "Behavioral",
      tip: "Insider: 'DEA deals with addicts, dealers, violent criminals. Show patience, de-escalation, professionalism.'",
      star: true,
    },
    {
      question: "You stop someone with drugs in the car. They offer you money to let them go. What do you do?",
      type: "Situational",
      tip: "Insider: 'DEA: 'This is bribery. Answer: 'Arrest them, document everything, report the offer immediately.' No hesitation.'",
      star: false,
    },
    {
      question: "Describe your experience with undercover operations or high-risk situations.",
      type: "Background",
      tip: "Insider: 'DEA does more undercover than any other agency. If you lack experience, show you understand the mental toll it takes.'",
      star: false,
    },
    {
      question: "What would you do if your supervisor ordered you to do something you believed was unethical?",
      type: "Situational",
      tip: "Insider: 'DEA values chain of command BUT integrity. Answer: 'I'd respectfully question it, document concerns, and consult ethics hotline if needed.'",
      star: false,
    },
    {
      question: "How do you handle the stress of seeing the worst of society daily?",
      type: "Behavioral",
      tip: "Insider: 'DEA: 'We need to know you won't burn out in 2 years. Show healthy coping mechanisms: exercise, therapy, hobbies.'",
      star: true,
    },
  ],
  local: [
    {
      question: "Why do you want to be a police officer in THIS specific department?",
      type: "Motivation",
      tip: "Insider: 'Research the chief's name, mission statement, recent community initiatives. Generic answers get you eliminated in round 1.'",
      star: false,
    },
    {
      question: "Tell us about yourself. Give us a 90-second summary.",
      type: "Background",
      tip: "Insider: 'Focus on education, work history, qualities that relate to police work. NOT your favorite sports teams or food.'",
      star: false,
    },
    {
      question: "You pull over a car and find a small amount of marijuana. The driver is polite and cooperative. What do you do?",
      type: "Situational",
      tip: "Insider: 'Local PD: 'We want discretion. Answer: It depends on jurisdiction, amount, suspect attitude. Show you can think, not just follow script.'",
      star: false,
    },
    {
      question: "Describe a time you showed leadership or teamwork in a difficult situation.",
      type: "Behavioral",
      tip: "Insider: 'Use STAR method. Local PD loves teamwork. Show you're not a lone wolf - they need officers who work well with partners.'",
      star: true,
    },
    {
      question: "What would you do if you witnessed another officer using excessive force?",
      type: "Situational",
      tip: "Insider: 'This is a test. Answer: 'Intervene to stop it, report it immediately, document everything. Local PD has zero tolerance for brutality.'",
      star: false,
    },
    {
      question: "How do you plan to maintain work-life balance in a job known for burnout?",
      type: "Behavioral",
      tip: "Insider: 'Gen Z: 77% prioritize work-life balance. Show you have hobbies, support system, and boundaries. But also show commitment.'",
      star: true,
    },
  ],
}

const STAR_HELPER = {
  title: "STAR Method",
  steps: [
    { letter: "S", label: "Situation", desc: "1-2 sentences: Set the scene (1-2 sentences)" },
    { letter: "T", label: "Task", desc: "What needed to be done?" },
    { letter: "A", label: "Action", desc: "What YOU specifically did (not 'we')" },
    { letter: "R", label: "Result", desc: "Outcome + what you learned" },
  ],
}

export default function InterviewSimulatorPage() {
  const [agency, setAgency] = useState<keyof typeof AGENCY_QUESTIONS>("fbi")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(2700) // 45 minutes
  const [isRunning, setIsRunning] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const questions = AGENCY_QUESTIONS[agency]
  const currentQ = questions[currentQuestion]

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: value }))
  }

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const resetAll = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setTimeLeft(2700)
    setIsRunning(false)
    setShowSummary(false)
  }

  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / questions.length) * 100

  if (showSummary) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Your Interview Prep Summary</h1>
        
        <div className="space-y-6">
          {questions.map((q, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant={q.type === "Situational" ? "destructive" : q.type === "Motivation" ? "default" : "secondary"}>
                    {q.type}
                  </Badge>
                  {answers[i] ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>
                <CardTitle className="text-lg">Question {i + 1}</CardTitle>
                <CardDescription>{q.question}</CardDescription>
              </CardHeader>
              <CardContent>
                {answers[i] ? (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{answers[i]}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No answer saved</p>
                )}
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <Lightbulb className="h-4 w-4 inline mr-1" />
                    <strong>Insider Tip:</strong> {q.tip}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <Button onClick={() => setShowSummary(false)} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Practice
          </Button>
          <Button onClick={resetAll} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/app/tools" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Tools
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Oral Board Simulator</h1>
        <div className="flex items-center gap-2">
          <select
            value={agency}
            onChange={(e) => {
              setAgency(e.target.value as keyof typeof AGENCY_QUESTIONS)
              resetAll()
            }}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="fbi">FBI</option>
            <option value="dea">DEA</option>
            <option value="local">Local PD</option>
          </select>
        </div>
      </div>

        <p className="text-muted-foreground mb-8">

      {/* Timer & Progress */}
      <div className="flex items-center justify-between mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${timeLeft < 300 ? "text-red-500" : ""}`}>
            <Clock className="h-5 w-5" />
            <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Pause" : "Start"} Timer
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length} | {answeredCount} answered
        </div>
      </div>

      <Progress value={progress} className="mb-8" />

      {/* Question Navigation Dots */}
      <div className="flex gap-2 mb-8 justify-center">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => goToQuestion(i)}
            className={`h-3 w-3 rounded-full transition-colors ${
              i === currentQuestion
                ? "bg-primary"
                : answers[i]
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
            title={`Question ${i + 1}`}
          />
        ))}
      </div>

      {/* Current Question */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge variant={currentQ.type === "Situational" ? "destructive" : currentQ.type === "Motivation" ? "default" : "secondary"}>
              {currentQ.type}
            </Badge>
            {currentQ.star && (
              <Badge variant="outline">STAR Method</Badge>
            )}
          </div>
          <CardTitle className="text-xl mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {currentQ.question}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentQ.star && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                {STAR_HELPER.title}
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {STAR_HELPER.steps.map((step) => (
                  <div key={step.letter} className="text-center p-2 bg-white rounded border">
                    <div className="font-bold text-lg text-blue-600">{step.letter}</div>
                    <div className="font-medium text-xs">{step.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Textarea
            placeholder="Type your answer here... (minimum 150 words for behavioral questions)"
            value={answers[currentQuestion] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="min-h-[200px]"
          />
          
          <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <Lightbulb className="h-4 w-4 inline mr-1" />
              <strong>Insider Tip:</strong> {currentQ.tip}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mb-8">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        {currentQuestion < questions.length - 1 ? (
          <Button onClick={nextQuestion}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={() => setShowSummary(true)}>
            View Summary
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Reality Check */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-sm text-red-700">
              <strong>Reality Check from Insiders:</strong> "Oral boards test one thing: Would these officers trust you with a gun, a badge, and their life? Every answer should show integrity, teamwork, and good judgment. They're not looking for perfection—they're looking for someone they'd want to ride with."
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
