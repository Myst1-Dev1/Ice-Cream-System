/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { SalesType } from '@/@types/SalesType';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ReportsGraphProps {
  data: SalesType[];
  dark: boolean;
}

export function ReportsGraph({ data, dark }: ReportsGraphProps) {
  const axisTextColor = dark ? '#ffffff' : '#4b5563';

  const graphData = useMemo(() => {
    const totalsByDay: Record<number, number> = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };

    data.forEach((sale) => {
      const created = new Date(sale.createdAt);
      const day = created.getDay();
      const totalValue = sale.price * (sale.amount ?? 1);
      totalsByDay[day] += totalValue;
    });

    return totalsByDay;
  }, [data]);

  const dayLabels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const chartValues = Object.values(graphData);

  const chartOptions: any = {
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
      categories: dayLabels,
      labels: {
        style: {
          colors: axisTextColor,
          fontSize: "14px",
        }
      },
      axisBorder: { color: axisTextColor },
      axisTicks: { color: axisTextColor },
    },
    yaxis: {
      labels: {
        formatter: (value: any) =>
          value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        style: {
          colors: axisTextColor,
          fontSize: "14px",
        }
      },
    },
    grid: {
      show: true,
      borderColor: dark ? "#444" : "#DDD",
      strokeDashArray: 4,
    },
    
    tooltip: {
      theme: dark ? "dark" : "light",
      style: {
        fontSize: "14px",
        fontFamily: "inherit",
      }
    },
  };

  const chartSeries = [
    {
      name: "Lucro",
      data: chartValues,
    },
  ];

  return (
    <div className="w-full">
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        height={260}
      />
    </div>
  );
}
