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

  const flavorCounts: Record<string, number> = {};

  data.forEach((sale) => {
    if (sale.type === "venda" && sale.flavor) {

      const flavors = sale.flavor
        .split(" e ")
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const quantity = sale.amount && sale.amount > 0 ? sale.amount : 1;

      flavors.forEach((f) => {
        flavorCounts[f] = (flavorCounts[f] || 0) + quantity;
      });
    }
  });

  const topFlavors = Object.entries(flavorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const flavors = topFlavors.map(([name]) => name);
  const values = topFlavors.map(([_, count]) => count);

  const options: any = {
    chart: {
      stacked: false,
      toolbar: { show: false },
    },

    colors: ["oklch(79.2% 0.209 151.711)"],

    xaxis: {
      categories: flavors,
      labels: {
        style: {
          colors: axisTextColor,
          fontSize: "14px"
        }
      }
    },

    yaxis: {
      labels: {
        style: {
          colors: axisTextColor
        }
      }
    },

    grid: {
      borderColor: dark ? "#374151" : "#e5e7eb",
      strokeDashArray: 4,
    },

    dataLabels: { enabled: false },

    tooltip: {
      theme: dark ? "dark" : "light",
      style: {
        fontSize: "14px",
        fontFamily: "inherit",
      }
    },
  };

  const series = [
    {
      name: "Vendas por sabor",
      type: "bar",
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