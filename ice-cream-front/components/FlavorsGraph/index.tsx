/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export function FlavorsGraphs() {
  const flavors = ["Morango", "Chocolate", "Uva", "Coco"];
  const values = [19, 47, 53, 13];

  const options: any = {
    chart: {
      stacked: false,
      toolbar: { show: false },
    },

    colors: ["oklch(79.2% 0.209 151.711)", "#f59e0b"],

    stroke: {
      width: [0, 3],
      curve: "smooth",
    },

    xaxis: {
      categories: flavors,
    },

    tooltip: {
      shared: true,
      intersect: false,
    },

    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 4,
    },

    dataLabels: { enabled: false },

    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  const series = [
    {
      name: "Vendas",
      type: "bar",
      data: values,
    }
  ];

  return (
    <div className="w-full h-72 mt-4">
      <ApexCharts options={options} series={series} type="line" height="100%" />
    </div>
  );
}
