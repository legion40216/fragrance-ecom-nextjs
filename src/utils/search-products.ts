import { categories } from "@/data/categories";
import type { ProductType } from "@/types/types";

const categoryNames = Object.fromEntries(
  categories.map((category) => [category.slug, category.name]),
);

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "");
}

function toWords(text: string): string[] {
  return normalize(text)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function matchesField(words: string[], token: string): boolean {
  return words.some((word) => word.startsWith(token));
}

export function tokenizeQuery(query: string): string[] {
  return toWords(query);
}

export function scoreProduct(product: ProductType, tokens: string[]): number {
  if (tokens.length === 0) return 0;

  const nameWords = toWords(product.name);
  const brandWords = toWords(product.brand);
  const categoryWords = toWords(categoryNames[product.category] ?? "");
  const descriptionWords = toWords(product.description);

  let score = 0;

  for (const token of tokens) {
    if (matchesField(nameWords, token)) score += 10;
    else if (matchesField(brandWords, token)) score += 6;
    else if (matchesField(categoryWords, token)) score += 4;
    else if (matchesField(descriptionWords, token)) score += 1;
    else return 0;
  }

  if (normalize(product.name).startsWith(normalize(tokens.join(" ")))) {
    score += 5;
  }

  return score;
}

export function searchProducts(
  products: ProductType[],
  query: string,
): ProductType[] {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return [];

  return products
    .map((product) => ({ product, score: scoreProduct(product, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);
}

export function matchesQuery(product: ProductType, query: string): boolean {
  return scoreProduct(product, tokenizeQuery(query)) > 0;
}
