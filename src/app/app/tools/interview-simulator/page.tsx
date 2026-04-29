"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, Clock, CheckCircle, ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"
import Link from "next/link"

// Agency-specific questions based on insider research and real interviews
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
      tip: "Insider: 'FBI: 'We need to know you'll do the job regardless of personal relationships. Answer: 'I'd recuse myself AND report the conflict.''",
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
      tip: "Insider: 'FBI: 'This is a test. Answer: 'I'd recuse myself AND report the conflict.''",
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
      question: "Why should we hire you over other candidates?",
      type: "Motivation",
      tip: "Insider: 'DEA wants agents who understand the mission. Mention: 'I'm disciplined, I understand the drug crisis, I'm ready for undercover work.'",
      star: false,
    },
  ],
  hsi: [
    {
      question: "Why do you want to join HSI as a Special Agent?",
      type: "Motivation",
      tip: "Insider: 'HSI is growing fast. Mention: 'I want to fight transnational crime, human trafficking, cyber crime.' Show you understand their unique mission.'",
      star: false,
    },
    {
      question: "Describe a time you had to investigate a complex case with limited resources. What was your approach?",
      type: "Behavioral",
      tip: "Insider: 'HSI values resourcefulness. Show you can work independently, think creatively, build cases methodically.'",
      star: true,
    },
    {
      question: "You discover a shipment containing counterfeit goods worth $2M. What steps do you take?",
      type: "Situational",
      tip: "Insider: 'HSI: 'Secure the scene, document everything, coordinate with CBP/ customs, follow chain of custody protocols.'",
      star: false,
    },
    {
      question: "HSI has language requirements. What languages do you speak and how would you use them in investigations?",
      type: "Background",
      tip: "Insider: 'HSI loves language skills (Spanish, Chinese, Arabic). If you have them, highlight them. If not, show willingness to learn.'",
      star: false,
    },
    {
      question: "What would you do if you suspected a cargo container had illicit goods but had no warrant?",
      type: "Situational",
      tip: "Insider: 'HSI: 'Know the laws. Answer: 'I'd consult with legal, get proper authorization, ensure Fourth Amendment compliance.'",
      star: false,
    },
    {
      question: "Tell us about a time you had to work with a difficult federal partner agency. How did you handle it?",
      type: "Behavioral",
      tip: "Insider: 'HSI partners with FBI, DEA, CBP daily. Show you can collaborate across agencies professionally.'",
      star: true,
    },
  ],
  uspis: [
    {
      question: "Why do you want to become a Postal Inspector?",
      type: "Motivation",
      tip: "Insider: 'USPIS investigates mail crimes, fraud, narcotics via mail. Mention: 'I want to protect the integrity of the U.S. Mail system.'",
      star: false,
    },
    {
      question: "Describe a time you had to investigate a suspicious package. What steps did you take?",
      type: "Situational",
      tip: "Insider: 'USPIS: 'Protocol matters. Secure package, document chain of custody, coordinate with postal workers, follow legal procedures.'",
      star: false,
    },
    {
      question: "You suspect someone is using the mail to commit identity theft. How do you build your case?",
      type: "Behavioral",
      tip: "Insider: 'USPIS loves methodical investigations. Show you document everything, follow paper trail, build evidence systematically.'",
      star: true,
    },
    {
      question: "What strategies would you use to investigate mail tampering at a large postal facility?",
      type: "Situational",
      tip: "Insider: 'USPIS: 'Surveillance, employee interviews, tracking systems, coordination with facility management.' Show investigative thinking.'",
      star: false,
    },
    {
      question: "Can you discuss your experience with digital forensics and how it applies to mail crime?",
      type: "Background",
      tip: "Insider: 'USPIS investigates cyber crimes via mail (fraud, phishing). If you have digital skills, highlight them. If not, show willingness to learn.'",
      star: false,
    },
    {
      question: "What would you do if you caught a coworker stealing mail? How do you handle the situation?",
      type: "Situational",
      tip: "Insider: 'USPIS: 'This is a test of integrity. Answer: 'Report immediately, document everything, follow internal affairs protocols.'",
      star: false,
    },
  ],
  atf: [
    {
      question: "Why do you want to be an ATF Special Agent specifically?",
      type: "Motivation",
      tip: "Insider: 'ATF focuses on firearms, explosives, arson. Mention: 'I want to reduce violent crime through tactical expertise and investigative work.'",
      star: false,
    },
    {
      question: "Describe a time you handled explosives or firearms in a high-pressure situation. What did you do?",
      type: "Behavioral",
      tip: "Insider: 'ATF loves military vets with EOD, firearms experience. If you have it, highlight it. If not, show you understand the risks.'",
      star: true,
    },
    {
      question: "You're investigating a gun trafficking ring. The trail leads to a corrupt local official. What do you do?",
      type: "Situational",
      tip: "Insider: 'ATF: 'Chain of command matters. Document everything, consult supervisors, follow legal protocols for public corruption cases.'",
      star: false,
    },
    {
      question: "What experience do you have with tactical operations or high-risk warrants?",
      type: "Background",
      tip: "Insider: 'ATF does lots of tactical work. If you're former military (especially SOF), highlight it. ATF values discipline and tactical competence.'",
      star: false,
    },
    {
      question: "How would you handle a situation where you had to secure a crime scene with explosives?",
      type: "Situational",
      tip: "Insider: 'ATF: 'Safety first. Evacuate area, call bomb squad, preserve evidence, coordinate with local fire/EMS. Show you think tactically.'",
      star: false,
    },
    {
      question: "Tell us about a time you had to make a split-second decision in a dangerous situation. What happened?",
      type: "Behavioral",
      tip: "Insider: 'ATF work is dangerous. Show you can think fast, prioritize safety, make sound decisions under pressure.'",
      star: true,
    },
  ],
  cbp: [
    {
      question: "Why do you want to be a CBP Officer / Border Patrol Agent?",
      type: "Motivation",
      tip: "Insider: 'CBP: 'I want to protect America's borders and prevent terrorism.' Mention: 'I understand the mission includes customs, immigration, and agriculture protection.'",
      star: false,
    },
    {
      question: "Describe a time you had to make a split-second decision at a border crossing. What did you do?",
      type: "Behavioral",
      tip: "Insider: 'CBP values quick thinking. Show you can assess threats fast, communicate clearly, follow protocols under pressure.'",
      star: true,
    },
    {
      question: "You encounter someone at the border who doesn't speak English. How do you handle the situation?",
      type: "Situational",
      tip: "Insider: 'CBP: 'Language barriers are common. Answer: 'Use translator app, call for backup with language skills, remain calm and professional.'",
      star: false,
    },
    {
      question: "What would you do if you found a vehicle with concealed compartments at a checkpoint?",
      type: "Situational",
      tip: "Insider: 'CBP: 'Secure the vehicle, call K-9 unit, document everything, follow search protocols. Show attention to detail.'",
      star: false,
    },
    {
      question: "How do you handle the stress of working 24/7 shifts, night shifts, and being away from family?",
      type: "Behavioral",
      tip: "Insider: 'CBP is 24/7/365. Show you understand the lifestyle, have a support system, can handle irregular schedules.'",
      star: true,
    },
    {
      question: "You witness a coworker using excessive force during a border apprehension. What do you do?",
      type: "Situational",
      tip: "Insider: 'CBP: 'Integrity test. Answer: 'Intervene safely, report immediately, document everything. CBP has zero tolerance for excessive force.'",
      star: false,
    },
  ],
  local: [
    {
      question: "Why do you want to be a police officer in our specific department?",
      type: "Motivation",
      tip: "Insider: 'Research YOUR department. Mention community policing, specific programs they run, local crime issues.'",
      star: false,
    },
    {
      question: "Tell us about a time you had to de-escalate a tense situation. What did you do?",
      type: "Behavioral",
      tip: "Local PD: 'De-escalation is KEY. Show you can talk people down without using force.'",
      star: true,
    },
    {
      question: "You witness another officer using excessive force. What do you do?",
      type: "Situational",
      tip: "Insider: 'This is a test of integrity. Answer: 'Intervene to stop it, report it through proper channels, document everything.'",
      star: false,
    },
    {
      question: "Describe your experience working with diverse communities.",
      type: "Background",
      tip: "Insider: 'Local PD values community relations. Show you understand cultural sensitivity, bias awareness.'",
      star: false,
    },
    {
      question: "What would you do if you pulled over a close friend for DUI?",
      type: "Situational",
      tip: "Insider: 'Answer: 'I'd treat them like any other citizen. Integrity over friendship. I'd arrest if warranted.'",
      star: false,
    },
    {
      question: "Why are you the best candidate for our department?",
      type: "Motivation",
      tip: "Insider: 'Mention your stability, community ties, understanding of local issues. Local PD wants someone who'll stay 20+ years.'",
      star: false,
    },
  ],
}

const STAR_HELPER = {
  title: "STAR Method",
  steps: [
    { letter: "S", label: "Situation", desc: "1-2 sentences: Set the scene" },
    { letter: "T", label: "Task", desc: "What needed to be done?" },
    { letter: "A", label: "Action", desc: "What YOU specifically did" },
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
        Practice with real questions from {agency.toUpperCase()} oral boards. Based on insider research.
      </p>

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
