import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import Card from '../components/Card';

export default function Report() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['report', id],
    queryFn: async () => (await api.get(`/assessments/${id}`)).data
  });

  if (isLoading) return <div>Loading…</div>;

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-bold text-[#1f4b99]">
          {data.candidate.name}
        </h2>
        <p className="text-sm text-gray-500">
          {data.candidate.entry} · Attempt {data.candidate.attempt}
        </p>
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

      <Card>
        <h3 className="font-semibold mb-2">OLQ Self Rating</h3>
        <table className="w-full text-sm">
          <tbody>
            {data.olq.map(o => (
              <tr key={o.qId} className="border-t">
                <td className="p-2">{o.name}</td>
                <td className="p-2 text-center">{o.factor}</td>
                <td className="p-2 text-center">{o.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <button
        onClick={() => window.print()}
        className="text-sm border px-3 py-1 rounded"
      >
        Print Report
      </button>
    </div>
  );
}
