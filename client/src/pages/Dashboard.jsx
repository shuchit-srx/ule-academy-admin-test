import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../lib/api';
import socket from '../lib/socket';

import Card from '../components/Card';
import Table from '../components/Table';
import FilterBar from '../components/FilterBar';
import CompatibilityTag from '../components/CompatibilityTag';
import ErrorCard from '../components/ErrorCard';

export default function Dashboard() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // filters / sorting
    const [entry, setEntry] = useState('');
    const [sort, setSort] = useState('date');

    // data fetching
    const {
        data = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['assessments', entry, sort],
        queryFn: async () => {
            const res = await api.get('/assessments', {
                params: {
                    entry: entry || undefined,
                    sort
                }
            });
            return res.data;
        }
    });

    // ✅ REALTIME (CORRECT WAY)
    useEffect(() => {
        const handler = () => {
            console.log('ADMIN REALTIME EVENT RECEIVED');
            queryClient.invalidateQueries({
                queryKey: ['assessments']
            });
        };

        socket.on('new-assessment', handler);

        return () => {
            socket.off('new-assessment', handler);
        };
    }, [queryClient]);

    // loading state
    if (isLoading) {
        return (
            <div className="text-sm text-gray-500">
                Loading assessments…
            </div>
        );
    }

    // error state
    if (isError) {
        return (
            <ErrorCard
                title="Failed to load assessments"
                message={error.message}
            />
        );
    }

    return (
        <Card>
            {/* Filters */}
            <FilterBar
                entry={entry}
                setEntry={setEntry}
                sort={sort}
                setSort={setSort}
            />

            {/* Data table */}
            <Table head={['Name', 'Entry', 'Attempt', 'Compatibility', '']}>
                {data.length === 0 && (
                    <tr>
                        <td
                            colSpan={5}
                            className="p-4 text-sm text-gray-400 text-center"
                        >
                            No assessments found.
                        </td>
                    </tr>
                )}

                {data.map(a => (
                    <tr
                        key={a._id}
                        className="border-t hover:bg-gray-50"
                    >
                        <td className="p-3 font-medium">
                            {a.candidate.name}
                        </td>

                        <td className="p-3">
                            {a.candidate.entry}
                        </td>

                        <td className="p-3 text-center">
                            {a.candidate.attempt}
                        </td>

                        <td className="p-3">
                            <div className="flex flex-row gap-5">
                                <span className="font-semibold">
                                    {a.scores.compatibility.toFixed(1)}
                                </span>
                                <CompatibilityTag value={a.scores.compatibility} />
                            </div>
                        </td>

                        <td className="p-3 text-right">
                            <button
                                onClick={() => navigate(`/report/${a._id}`)}
                                className="text-[#1f4b99] text-sm hover:underline"
                            >
                                View
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>
        </Card>
    );
}
