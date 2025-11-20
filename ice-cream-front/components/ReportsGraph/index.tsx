'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export function ReportsGraph() {

    const chartOptions:any = {
    chart: {
      id: "profit-chart",
      type: 'line',
      toolbar: { show: false },
      animations: { easing: "easeinout", speed: 400 },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#4ADE80"],
    xaxis: {
      categories: ["Seg", "Ter", "Qua"],
      axisBorder:{
            color:'#9ca3af'
    },
        axisTicks: {
            color:'#9ca3af'
    }
    },
    yaxis: {
      labels: { formatter: (value:any) => `R$ ${value}` },
    },
    grid: {
      show: true,
      borderColor: "#DDD",
      strokeDashArray: 4,
    },
  };

  const chartSeries = [
    {
      name: "Lucro",
      data: [120, 90, 16]
    },
  ];

    return (
        <>
            <div className="w-full">
                <ApexCharts
                    options={chartOptions}
                    series={chartSeries}
                    height={260}
                />
            </div>
        </>
    )
}