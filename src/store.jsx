import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, priceFor } from "./data";

const StoreContext = createContext(null);
const STORAGE_KEY = "teka-somba-store";

const defaultUser = {
  firstName: "Claire",
  lastName: "Martin",
  email: "claire.martin@email.com",
  phone: "06 12 34 55 78",
  line: "24 rue du Chemin Vert",
  extra: "",
  zip: "75011",
  city: "Paris",
};

const defaultOrders = [
  {
    id: "TS-1042",
    createdAt: "2026-10-12",
    window: "22 – 24 octobre",
    status: "Confirmée",
    total: 599,
    items: [
      {
        productId: "nuage",
        size: "160x200",
        firmness: "equilibre",
        qty: 1,
        price: 599,
      },
    ],
  },
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function StoreProvider({ children }) {
  const saved = loadState();
  const [user, setUser] = useState(saved?.user ?? defaultUser);
  const [cart, setCart] = useState(
    saved?.cart ?? [{ productId: "nuage", size: "160x200", firmness: "equilibre", qty: 1 }]
  );
  const [favorites, setFavorites] = useState(saved?.favorites ?? ["nuage"]);
  const [orders, setOrders] = useState(saved?.orders ?? defaultOrders);
  const [lastOrderId, setLastOrderId] = useState(saved?.lastOrderId ?? null);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user, cart, favorites, orders, lastOrderId })
    );
  }, [user, cart, favorites, orders, lastOrderId]);

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const detailedCart = cart
    .map((item) => {
      const product = getProduct(item.productId);
      if (!product) return null;
      const price = priceFor(product, item.size);
      return { ...item, product, price, line: price * item.qty };
    })
    .filter(Boolean);

  const total = detailedCart.reduce((sum, item) => sum + item.line, 0);

  const api = useMemo(
    () => ({
      user,
      setUser,
      login(next) {
        setUser({ ...defaultUser, ...next });
      },
      logout() {
        setUser(null);
      },
      cart: detailedCart,
      count,
      total,
      favorites,
      orders,
      lastOrderId,
      toggleFavorite(id) {
        setFavorites((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
      },
      addToCart(productId, size, firmness) {
        setCart((current) => {
          const index = current.findIndex(
            (item) => item.productId === productId && item.size === size && item.firmness === firmness
          );
          if (index === -1) return [...current, { productId, size, firmness, qty: 1 }];
          return current.map((item, i) => (i === index ? { ...item, qty: item.qty + 1 } : item));
        });
      },
      updateQty(index, qty) {
        setCart((current) =>
          qty <= 0 ? current.filter((_, i) => i !== index) : current.map((item, i) => (i === index ? { ...item, qty } : item))
        );
      },
      removeFromCart(index) {
        setCart((current) => current.filter((_, i) => i !== index));
      },
      placeOrder() {
        const id = `TS-${Math.floor(1000 + Math.random() * 9000)}`;
        const start = new Date();
        start.setDate(start.getDate() + 5);
        const end = new Date();
        end.setDate(end.getDate() + 7);
        const format = (date) =>
          date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
        const order = {
          id,
          createdAt: new Date().toISOString().slice(0, 10),
          window: `${format(start)} – ${format(end)}`,
          status: "Confirmée",
          total,
          items: detailedCart.map((item) => ({
            productId: item.productId,
            size: item.size,
            firmness: item.firmness,
            qty: item.qty,
            price: item.price,
          })),
        };
        setOrders((current) => [order, ...current]);
        setCart([]);
        setLastOrderId(id);
        return order;
      },
    }),
    [user, detailedCart, count, total, favorites, orders, lastOrderId]
  );

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore doit être utilisé dans StoreProvider");
  return value;
}
