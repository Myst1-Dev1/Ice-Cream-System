/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SalesType } from '@/@types/SalesType';
import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface FlavorsGraphsProps {
  data: SalesType[];
  dark: boolean;
}

export function FlavorsGraphs({ data, dark }: FlavorsGraphsProps) {

  const axisTextColor = dark ? '#ffffff' : '#4b5563';

  const salesByHour: Record<string, number> = {};

  const today = new Date().toDateString();

  data.forEach((sale) => {
    if (sale.type !== "venda" || !sale.createdAt) return;

    const saleDate = new Date(sale.createdAt);

    if (saleDate.toDateString() !== today) return;

    const hour = saleDate.getHours();
    const label = `${hour.toString().padStart(2, "0")}:00`;

    const value = Number(sale.price) || 0;

    salesByHour[label] = (salesByHour[label] || 0) + value;
  });

  const hours = Object.keys(salesByHour).sort();
  const values = hours.map((h) => salesByHour[h]);

  const options: any = {
    chart: {
      toolbar: { show: false },
    },

    colors: ["oklch(79.2% 0.209 151.711)"],

    xaxis: {
      categories: hours,
      // title: {
      //   text: "Horário",
      //   style: { color: axisTextColor }
      // },
      labels: {
        style: {
          colors: axisTextColor,
          fontSize: "10px"
        }
      }
    },

    yaxis: {
      title: {
        text: "Lucro (R$)",
        style: { color: axisTextColor, fontSize: "14px", fontWeight: "semibold" }
      },
      labels: {
        style: {
          colors: axisTextColor
        },
        formatter: (value: number) => `R$ ${value.toFixed(2)}`
      }
    },

    grid: {
      borderColor: dark ? "#374151" : "#e5e7eb",
      strokeDashArray: 4,
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
      }
    },

    dataLabels: { enabled: false },

    tooltip: {
      theme: dark ? "dark" : "light",
      y: {
        formatter: (value: number) => `R$ ${value.toFixed(2)}`
      }
    },
  };

  const series = [
    {
      name: "Lucro por horário",
      data: values,
    }
  ];

  return (
    <div className="w-full h-72 mt-4">
      <ApexCharts
        options={options}
        series={series}
        type="bar"
        height="100%"
      />
    </div>
  );
}