export const handleMoneyChange = (e: React.FormEvent<HTMLInputElement>) => {
  let value = e.currentTarget.value;

  // Mantém somente números
  value = value.replace(/\D/g, "");

  // Evita string vazia
  if (!value) {
    e.currentTarget.value = "";
    return;
  }

  // Converte para número com 2 casas
  const cents = (Number(value) / 100).toFixed(2);

  // Mostra com vírgula no input
  e.currentTarget.value = cents.replace(".", ",");
};
