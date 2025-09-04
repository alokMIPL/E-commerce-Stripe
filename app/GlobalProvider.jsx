"use client";
import AuthProvider from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { ProductProvider } from "@/context/ProductContext";

export function GlobalProvider({ children }) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <AuthProvider>
        <CartProvider>
        <ProductProvider>
          <SessionProvider>{children}</SessionProvider>
        </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
