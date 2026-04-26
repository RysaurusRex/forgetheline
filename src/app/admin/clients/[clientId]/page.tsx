"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { getClientById } from "./actions"

interface ClientData {
  id: string
  email: string
  name: string | null
  createdAt: string
  clientProfile: any
  dashboard: any
  resultsLog: any[]
}

export default function ClientViewPage() {
  const params = useParams()
  const [client, setClient] = useState<ClientData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getClientById(params.clientId as string).then((data) => {
      setClient(data as unknown as ClientData)
      setLoading(false)
    })
  }, [params.clientId])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!client) {
    return <div className="container mx-auto px-4 py-8">Client not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Client: {client.name || client.email}</h1>
      <p className="mb-8 text-muted-foreground">
        Member since: {new Date(client.createdAt).toLocaleDateString()}
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Profile</h2>
          {client.clientProfile ? (
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Target Roles</dt>
                <dd className="font-medium">{client.clientProfile.targetRoles || "-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Agencies</dt>
                <dd className="font-medium">{client.clientProfile.agencies || "-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Hiring Stage</dt>
                <dd className="font-medium">{client.clientProfile.hiringStage || "-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Timeline</dt>
                <dd className="font-medium">{client.clientProfile.timelineTargetDate || "-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Interview Date</dt>
                <dd className="font-medium">
                  {client.clientProfile.interviewDate
                    ? new Date(client.clientProfile.interviewDate).toLocaleDateString()
                    : "-"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Strengths</dt>
                <dd className="font-medium text-right max-w-[50%]">
                  {client.clientProfile.strengths || "-"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Weak Points</dt>
                <dd className="font-medium text-right max-w-[50%]">
                  {client.clientProfile.weakPoints || "-"}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-muted-foreground">No profile data</p>
          )}
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">Dashboard</h2>
          {client.dashboard ? (
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground mb-1">Current Status</dt>
                <dd className="rounded-md bg-muted p-2 whitespace-pre-wrap">
                  {client.dashboard.currentStatus || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground mb-1">Target Info</dt>
                <dd className="rounded-md bg-muted p-2 whitespace-pre-wrap">
                  {client.dashboard.targetInfo || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground mb-1">Progress</dt>
                <dd className="rounded-md bg-muted p-2 whitespace-pre-wrap">
                  {client.dashboard.progressChecks || "-"}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-muted-foreground">No dashboard data</p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">Results Log</h2>
        {client.resultsLog && client.resultsLog.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium">Date</th>
                  <th className="pb-2 text-left font-medium">Tool</th>
                  <th className="pb-2 text-left font-medium">Score</th>
                  <th className="pb-2 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {client.resultsLog.map((entry: any) => (
                  <tr key={entry.id} className="border-b">
                    <td className="py-2">{new Date(entry.date).toLocaleDateString()}</td>
                    <td className="py-2">{entry.tool}</td>
                    <td className="py-2">{entry.score ?? "-"}</td>
                    <td className="py-2 max-w-xs truncate">{entry.notes || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No results logged</p>
        )}
      </div>
    </div>
  )
}