import { memo, useMemo } from 'react'
import { generatePerformanceData } from '@/constants/mockData';
import { Line } from 'react-chartjs-2';





function LineChart(params) {
    const { performance, lineData, lineOptions } = useMemo(() => {
        const performance = generatePerformanceData(50, Math.random() * (1 - 0.001) + 0.001);
        const isPositive = performance[0].value <= performance[performance.length - 1].value;

        const lineData = {
            labels: performance.map(p => p.date),
            datasets: [{
                label: 'Performance',
                data: performance.map(p => p.value),
                fill: false,
                borderColor: isPositive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
                tension: 0.4,
                pointRadius: 0,
            }]
        };

        const lineOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0
                }
            }
        };

        return { performance, lineData, lineOptions };
    }, [params]);
    return (
        <div {...params}>
            <Line data={lineData} options={lineOptions} />
        </div>
    )
}

export default memo(LineChart)