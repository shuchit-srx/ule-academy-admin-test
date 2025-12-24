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

      {/* Candidate Summary */}
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

      {/* Aptitude Review */}
      <Card>
        <h3 className="font-semibold mb-3">Aptitude Review</h3>

        {data.aptitude.map(q => (
          <div
            key={q.qId}
            className="mb-4 p-3 border rounded"
          >
            <p className="font-medium mb-2">
              Q{q.qId}. {q.text}
            </p>

            <ul className="space-y-1 text-sm">
              {q.options.map(opt => {
                const isChosen = opt.value === q.chosen
                const isCorrect = opt.value === q.correct

                let className = 'px-3 py-1 rounded border'

                if (isCorrect) {
                  className += ' bg-green-50 border-green-300'
                } else if (isChosen && !q.isCorrect) {
                  className += ' bg-red-50 border-red-300'
                }

                return (
                  <li
                    key={opt.value}
                    className={className}
                  >
                    <span className="font-medium">
                      {opt.label}
                    </span>{' '}
                  </li>
                )
              })}
            </ul>

            <p className="mt-2 text-sm">
              Your Answer: {q.chosen || 'NA'} {" | "}
              Result:{' '}
              <span
                className={
                  q.chosen == null
                    ? 'text-gray-700 font-semibold'
                    : q.isCorrect
                    ? 'text-green-700 font-semibold'
                    : 'text-red-700 font-semibold'
                }
              >
                {q.chosen == null ? 'NA' : (q.isCorrect ? 'Correct' : 'Incorrect')}
              </span>
            </p>
          </div>
        ))}
      </Card>

      {/* Coach Panel */}
      <Card className="no-print">
        <strong>Coach Panel (ULe Academy use only)</strong>
        <p className="text-xs text-gray-500 mt-1">
          OLQ & Factor-wise breakdown
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
