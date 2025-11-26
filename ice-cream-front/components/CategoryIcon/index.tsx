import { JSX } from "react";
import {
  PiPopsicle,
  PiJarLabel,
  PiIceCream,
  PiPintGlass,
  PiShoppingBag,
  PiCylinder
} from "react-icons/pi";

const categoryIcons: Record<string, JSX.Element> = {
  Picolé: <PiPopsicle />,
  Copo: <PiPintGlass />,
  Pote: <PiJarLabel />,
  Geladinho: <PiCylinder />,
  Casquinha: <PiIceCream />,
  Cremosinho: <PiShoppingBag />
};

export function CategoryIcon({ category }: { category: string }) {
  const key = Object.keys(categoryIcons).find(k =>
    category.includes(k)
  );

  return key ? categoryIcons[key] : null;
}
