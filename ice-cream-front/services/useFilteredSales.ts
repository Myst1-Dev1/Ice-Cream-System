import { SalesType } from "@/@types/SalesType";

export function filterSales(
  data: SalesType[],
  period: "day" | "month" | "year",
  selectedDay?: Date,
  selectedType: "venda" | "entrada" = "venda"
) {
  const base = selectedDay ? new Date(selectedDay) : new Date();

  return data.filter((sale) => {

    if (sale.type !== selectedType) return false;

    const created = new Date(sale.createdAt);

    if (period === "day") {
      return (
        created.getDate() === base.getDate() &&
        created.getMonth() === base.getMonth() &&
        created.getFullYear() === base.getFullYear()
      );
    }

    if (period === "month") {
      return (
        created.getMonth() === base.getMonth() &&
        created.getFullYear() === base.getFullYear()
      );
    }

    if (period === "year") {
      return created.getFullYear() === base.getFullYear();
    }

    return false;
  });
}
