import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { euro } from "../data";
import { useStore } from "../store";
import { Steps } from "./Steps";

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  line: "",
  extra: "",
  zip: "",
  city: "",
};

export function CheckoutPage() {
  const { user, setUser, cart, total } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState(user ? { ...empty, ...user } : empty);
  const [delivery, setDelivery] = useState("domicile");
  const [error, setError] = useState("");

  if (cart.length === 0) {
    return (
      <div className="page">
        <h1>Votre panier est vide.</h1>
        <Link to="/matelas">Choisir un matelas</Link>
      </div>
    );
  }

  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.line || !form.zip || !form.city) {
      setError("Renseignez vos coordonnées et l'adresse de livraison.");
      return;
    }
    setUser(form);
    navigate("/paiement");
  }

  return (
    <div className="page">
      <Steps current={0} />
      <div className="split">
        <form className="stack form" onSubmit={submit}>
          <div>
            <p className="eyebrow">Livraison</p>
            <h1>Où livrer vos belles nuits ?</h1>
            <p className="lede">Vos coordonnées et votre adresse de livraison.</p>
          </div>
          <div className="form-grid">
            <label>
              Prénom
              <input name="firstName" value={form.firstName} onChange={change} autoComplete="given-name" />
            </label>
            <label>
              Nom
              <input name="lastName" value={form.lastName} onChange={change} autoComplete="family-name" />
            </label>
            <label className="span-2">
              Adresse e-mail
              <input name="email" type="email" value={form.email} onChange={change} autoComplete="email" />
            </label>
            <label className="span-2">
              Téléphone
              <input name="phone" value={form.phone} onChange={change} autoComplete="tel" />
            </label>
          </div>
          <h2>Adresse de livraison</h2>
          <div className="form-grid">
            <label className="span-2">
              Rue et numéro
              <input name="line" value={form.line} onChange={change} autoComplete="address-line1" />
            </label>
            <label className="span-2">
              Complément d'adresse (facultatif)
              <input name="extra" value={form.extra} onChange={change} autoComplete="address-line2" />
            </label>
            <label>
              Code postal
              <input name="zip" value={form.zip} onChange={change} autoComplete="postal-code" />
            </label>
            <label>
              Ville
              <input name="city" value={form.city} onChange={change} autoComplete="address-level2" />
            </label>
          </div>
          <div className="delivery-choices">
            <button type="button" className={delivery === "domicile" ? "is-on" : ""} onClick={() => setDelivery("domicile")}>
              <strong>À domicile</strong>
              <span>Offerte · 5 à 7 jours ouvrés</span>
            </button>
            <button type="button" className={delivery === "etage" ? "is-on" : ""} onClick={() => setDelivery("etage")}>
              <strong>Dans la pièce de votre choix</strong>
              <span>Offerte · sur rendez-vous</span>
            </button>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="btn" type="submit">
            Continuer vers le paiement
          </button>
        </form>
        <aside className="summary">
          <h2>Votre commande</h2>
          {cart.map((item) => (
            <p key={`${item.productId}-${item.size}`}>
              <span>
                {item.product.name} × {item.qty}
              </span>
              <span>{euro(item.line)}</span>
            </p>
          ))}
          <p>
            <span>Livraison</span>
            <span>Offerte</span>
          </p>
          <p className="summary__total">
            <span>Total</span>
            <span>{euro(total)}</span>
          </p>
        </aside>
      </div>
    </div>
  );
}
