import { Navigate, Route, Routes } from "react-router-dom";
import { Shell } from "./components/Shell";
import { AccountPage } from "./pages/Account";
import { LoginPage, WelcomePage } from "./pages/Auth";
import { CartPage } from "./pages/Cart";
import { CatalogPage } from "./pages/Catalog";
import { CheckoutPage } from "./pages/Checkout";
import { ConfirmationPage } from "./pages/Confirmation";
import { HomePage } from "./pages/Home";
import { OrdersPage } from "./pages/Orders";
import { PaymentPage } from "./pages/Payment";
import { ProductPage } from "./pages/Product";

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/matelas" element={<CatalogPage />} />
        <Route path="/matelas/:id" element={<ProductPage />} />
        <Route path="/panier" element={<CartPage />} />
        <Route path="/commande" element={<CheckoutPage />} />
        <Route path="/paiement" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/commandes" element={<OrdersPage />} />
        <Route path="/compte" element={<AccountPage />} />
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/bienvenue" element={<WelcomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  );
}
