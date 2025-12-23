import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'
import Card from '../components/Card'
import PrintButton from '../components/PrintButton'

export default function Report() {
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['report', id],
    queryFn: async () => (await api.get(`/assessments/${id}`)).data
  })

  if (isLoading) return <div>Loading…</div>
  if (isError) return <div>Failed to load report</div>

  return (
    <div className="space-y-4">

      <Card>
        <h2 className="font-bold text-[#1f4b99]">
          {data.candidate.name}
        </h2>
        <p className="text-sm text-gray-500">
          {data.candidate.entry} · Attempt {data.candidate.attempt}
        </p>

        <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
          <div>
            <strong>Aptitude</strong>
            <div>{data.scores.aptitudePercentage.toFixed(2)}%</div>
          </div>
          <div>
            <strong>OLQ</strong>
            <div>{data.scores.olqPercentage.toFixed(2)}%</div>
          </div>
          <div>
            <strong>Compatibility</strong>
            <div>{data.scores.compatibility.toFixed(2)}</div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-2">Aptitude Review</h3>
        {data.aptitude.map(q => (
          <div
            key={q.qId}
            className={`p-3 mb-2 rounded border ${q.isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
          >
            <p className="font-medium">{q.text}</p>
            <p className="text-sm">
              Your: {q.chosen || '—'} | Correct: {q.correct}
            </p>
          </div>
        ))}
      </Card>

      <Card className="no-print">
        <strong>Coach Panel (ULe Academy use only)</strong>
        <p className="text-xs text-gray-500 mt-1">
          Detailed OLQ & Factor breakdown
        </p>

        {Object.entries(data.factorScores).map(([factor, items]) => (
          <div key={factor} className="mt-4">
            <h4 className="font-semibold text-sm">
              Factor {factor}
            </h4>

            <table className="w-full text-sm mt-2">
              <tbody>
                {items.map(o => (
                  <tr key={o.qId} className="border-t">
                    <td className="p-2">{o.name}</td>
                    <td className="p-2 text-center">{o.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </Card>

      <PrintButton />
    </div>
  )
}
