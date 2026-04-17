"use client";

import { ProductItem } from "@/data/catalog";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const STORAGE_KEY = "moldes-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as CartItem[]) : [];
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToCart(product: ProductItem) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  const next = existing
    ? cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    : [...cart, { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, quantity: 1 }];

  saveCart(next);
  return next;
}
