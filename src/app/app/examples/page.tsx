"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, ChevronRight } from "lucide-react"
import Link from "next/link"

const RESUME_EXAMPLES = [
  {
    title: "Former Military - Police Officer",
    role: "City Police Department",
    content: `MICHAEL R. TORRES
(555) 847-2931 | mtorres@email.com |将军.gov
Los Angeles, CA 90014 | linkedin.com/in/michaeltorres

OBJECTIVE
Dedicated law enforcement professional with 8 years of military leadership experience seeking to leverage proven commitment to public safety and community service as a Patrol Officer with LAPD.

CORE QUALIFICATIONS
• Top Secret/SCI Clearance | Security+ Certified
• POST Basic Academy Certified (Module II Complete)
• Certified Fitness Instructor | Defensive Tactics Trainer
• Crisis Intervention | Mental Health First Aid
• Bilingual: English/Spanish (Conversational)

PROFESSIONAL EXPERIENCE

Patrol Sergeant | California Army National Guard | 2019 – Present
• Lead 12-person platoon in emergency response operations during natural disasters
• Conducted tactical training exercises for 150+ soldiers monthly
• Awarded Commendation Medal for excellence in personnel management

Platoon Sergeant | U.S. Army Reserve | 2015 – 2019
• Managed equipment accountability totaling $2.5M in military assets
• Led convoy security operations totaling 50+ missions
• Mentored junior soldiers on career development and advancement

Team Leader | U.S. Army | 2012 – 2015
• Supervised 8 soldiers in combat operations
• Maintained 98% mission readiness rating
• Coordinated logistics for deployed unit of 45 personnel

EDUCATION

Associate of Arts, Criminal Justice | Rio Hondo College | 2018
Certificate, Leadership & Management | Army Leadership Academy | 2017

TRAINING
• Basic Law Enforcement Training Academy (Module II) – In Progress
• Defensive Tactics Certified – 2023
• Firearms Qualification – Expert Rating
• CPR/ALS Certified – American Red Cross

REFERENCES AVAILABLE UPON REQUEST`,
  },
  {
    title: "College Graduate - Federal Entry",
    role: "FBI / DEA / ATF",
    content: `SARAH K. CHEN
(312) 555-8294 | schen@email.com | linkedin.com/in/sarahchen
Chicago, IL 60601 | U.S. Citizen

CLEARANCE
Top Secret/SCI (Active) | Full Scope Polygraph Passed

OBJECTIVE
To serve as a Special Agent with the FBI, leveraging investigative expertise and analytical skills in a career dedicated to protecting the American public.

EDUCATION

Bachelor of Arts, Criminal Justice | University of Illinois at Chicago | 2022
• GPA: 3.7/4.0 • Dean’s List: All Semesters
• President, Criminal Justice Student Association

Bachelor of Science, Psychology | University of Illinois at Chicago | 2022
• Minor: Chemistry

PROFESSIONAL EXPERIENCE

Contract Background Investigator | Lexington Services | 2022 – Present
• Conduct 15+ pre-employment background investigations monthly for federal contractors
• Verify employment history, educational credentials, and character references
• Maintain 100% accuracy rate on SF-86 packet submissions

Intern, Counterintelligence | FBI Chicago Field Office | Summer 2021
• Assisted agents with surveillance documentation and evidence collection
• Analyzed financial records for fraud detection
• Participated in 10+ federal search warrant executions

Security Officer | Northwestern Memorial Hospital | 2020 – 2022
• Managed access control for Level I Trauma Center
• Responded to 200+ security incidents with zero escalations
• De-escalated combative patients using Crisis Intervention Training

CERTIFICATIONS & TRAINING
• Security+ (CompTIA) – 2023
• CPR/AED – American Heart Association
• 40-Hour CIT Training – NAMI
• MS-Office Certified | Adobe Creative Suite

SELECTED ACCOMPLISHMENTS
• Chancellor’s Award for Academic Excellence (2022)
• Published Research: "Cybercrime Trends in Healthcare" – UIC Journal of Criminal Justice
•Volunteer, Crisis Text Line – 500+ hours`,
  },
  {
    title: "Current Law Enforcement - Promotion",
    role: "Detective / Sergeant",
    content: `JAMES M. CARROLL
Sergeant | Riverside County Sheriff's Department
(951) 555-3728 | carroll.j@riversideso.gov
Riverside, CA 92501 | 12 Years Experience

OBJECTIVE
To advance my law enforcement career into a Detective assignment, bringing proven investigative skills and leadership to the Special Investigations Division.

PROFESSIONAL SUMMARY
• 12 years of progressive law enforcement experience
• 6 years as Patrol Sergeant with oversight of 8 deputies per shift
• Advanced accident investigation certification
• Co-chairs department's Use of Force Review Board

PROFESSIONAL EXPERIENCE

Patrol Sergeant | Riverside County Sheriff's Dept. | 2019 – Present
• Supervise 8-person patrol team across 3 shifts
• Conduct performance evaluations and mentoring
• Respond to critical incidents as Watch Commander
• Maintained 99% resolution rate on assigned calls

Senior Deputy | Riverside County Sheriff's Dept. | 2015 – 2019
• Field Training Officer for 4 new deputies
• Traffic Collision Investigator (80+ accidents)
• School Resource Officer – Riverside High School
• Bike Patrol Unit Member

Deputy Sheriff | Riverside County Sheriff's Dept. | 2012 – 2015
• Patrol Operations – District 3
• Custody Division – Main Jail
• Court Services

EDUCATION & TRAINING

Basic Law Enforcement Academy | Riverside STC | 2012
• Honors Graduate – Valedictorian

AA, Administration of Justice | Mt. San Jacinto College | 2014
BS, Criminal Justice | Cal State Fullerton – In Progress

Advanced Officer Training
• POST Supervisor Certificate | 2020
• Collision Investigation | 2018
• Child Abuse Investigation | 2017
• Gangs | 2016

AWARDS & RECOGNITION
• Meritorious Service Medal (2)
• Lifesaving Award – 2021
• Deputy of the Quarter – Q3 2020
• Multiple Commendations for Professional Conduct

REFERENCES
• Captain Michael Reyes, Riverside SO – (951) 555-2100
• Sergeant Maria Gonzalez, Riverside SO`,
  },
  {
    title: "Recent College Graduate - Fresh Start",
    role: "Entry-Level Police Officer",
    content: `DAVID T. NGUYEN
(714) 555-9382 | dtnguyen@email.com | linkedin.com/in/davidtnguyen
Fullerton, CA 92831

OBJECTIVE
Motivated criminal justice graduate seeking to begin my law enforcement career as a Police Officer with a commitment to community service and public safety.

EDUCATION

Bachelor of Arts, Criminal Justice | California State University, Fullerton | 2024
• GPA: 3.5/4.0
• Dean’s List: Fall 2022, Spring 2023, Fall 2023
• Tutor, Intro to Criminal Justice (101)

Associate of Arts, Liberal Arts | Fullerton College | 2022
• Honors: Dean’s List All Semesters

PROFESSIONAL EXPERIENCE

Security Officer | Allied Universal | 2023 – Present
• Patrolled commercial properties in Orange County
• Monitored surveillance systems and access points
• Responded to alarms and security breaches

Intern | Orange County District Attorney’s Office | Summer 2023
• Assisted prosecutors with case file preparation
• Observed 50+ courtroom proceedings
• Researched case law for trial preparation

RELEVANT EXPERIENCE

Volunteer, Habitat for Humanity | 2022 – Present
• Construction: 200+ volunteer hours
• Team Lead for youth building projects

Volunteer, Fullerton PD Explorer Post | 2020 – 2022
• Learned department operations and procedures

CERTIFICATIONS
• CPR/AED – American Red Cross
• Stop the Bleed Certified
• MS-Office Proficient

INTERESTS
• Fitness (Competitive Runner)
• Chess Team Captain
• Local Youth Mentor

REFERENCES
• Professor Sarah Martinez, CSU Fullerton – (657) 555-2100
• Lt. Robert Kim, Fullerton PD`,
  },
]

const INTERVIEW_QUESTIONS = [
  {
    category: "Background",
    questions: [
      "Why do you want to be a police officer?",
      "Tell me about a time you handled stress under pressure.",
      "What is your biggest strength and weakness?",
      "Describe a time you made a difficult decision.",
    ],
  },
  {
    category: "Scenario-Based",
    questions: [
      "How would you handle a hostile crowd?",
      "What would you do if you witnessed police misconduct?",
      "Describe your approach to de-escalation.",
      "How would you prioritize multiple emergency calls?",
    ],
  },
  {
    category: "Ethics & Integrity",
    questions: [
      "Tell me about a time you had to report something inappropriate.",
      "How do you handle situations where the rules conflict with getting results?",
      "What would you do if ordered to do something you believed was wrong?",
      "Describe your views on uses of force.",
    ],
  },
  {
    category: "Behavioral",
    questions: [
      "Tell me about a time you failed and what you learned.",
      "Describe a time you worked with a difficult person.",
      "How do you maintain work-life balance in a demanding job?",
      "Give an example of leadership from your experience.",
    ],
  },
]

export default function ExamplesPage() {
  const [tab, setTab] = useState<"resumes" | "interview">("resumes")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Examples & Tips</h1>
      <p className="mb-8 text-muted-foreground">
        Sample resumes and interview questions
      </p>

      <div className="flex gap-2 mb-8">
        <Button
          variant={tab === "resumes" ? "default" : "outline"}
          onClick={() => setTab("resumes")}
        >
          Resume Examples
        </Button>
        <Button
          variant={tab === "interview" ? "default" : "outline"}
          onClick={() => setTab("interview")}
        >
          Interview Questions
        </Button>
      </div>

      {tab === "resumes" && (
        <div className="grid gap-4 md:grid-cols-2">
          {RESUME_EXAMPLES.map((resume) => (
            <Card key={resume.title}>
              <CardHeader>
                <CardTitle className="text-lg">{resume.title}</CardTitle>
                <CardDescription>{resume.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-xs font-mono bg-muted p-4 rounded-lg overflow-x-auto">
                  {resume.content}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "interview" && (
        <div className="space-y-4">
          {INTERVIEW_QUESTIONS.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.questions.map((q) => (
                    <li key={q} className="flex items-start gap-2">
                      <MessageSquare className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link href="/app/tools/resume-analyzer">
          <Button>
            Analyze Your Resume <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}