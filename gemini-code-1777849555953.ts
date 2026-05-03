// frontend/app/audit/page.tsx
'use client'
import { useState } from 'react'
import { Card, Content, Title, Text, ProgressBar, Button } from '@tremor/react'

export default function AuditDashboard() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  const runAudit = async () => {
    setLoading(true)
    // Replace with your Fly.io backend URL
    const res = await fetch('https://api.aerosight.ge/run-audit', { method: 'POST' })
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <Title className="text-3xl font-bold">AeroSight AI Audit</Title>
      <Text>Measure your brand's invisibility in the AI Age.</Text>

      <Card className="mt-6 max-w-md">
        <Button size="xl" onClick={runAudit} loading={loading}>
          {loading ? "AI Agents Probing..." : "Start Global AI Audit"}
        </Button>
      </Card>

      {data && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card decoration="top" decorationColor="indigo">
            <Text>AI Visibility Score</Text>
            <Title className="text-5xl">{data.visibility_score}%</Title>
            <ProgressBar value={data.visibility_score} color="indigo" className="mt-3" />
            <Text className="mt-4 text-red-500 font-semibold">Critical: Your brand is invisible to GPT-5.</Text>
          </Card>

          <Card>
            <Title>Actionable Roadmap</Title>
            <ul className="mt-4 list-disc pl-5 space-y-2">
              {data.recommendations.map((rec: string, i: number) => (
                <li key={i} className="text-slate-700">{rec}</li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  )
}