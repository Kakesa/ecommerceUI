import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { euro } from "../data";
import { useStore } from "../store";
import { OrderSummaryNote, Steps } from "./Steps";

export function PaymentPage() {
  const { cart, total, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [card, setCard] = useState({ name: user ? `${user.firstName} ${user.lastName}` : "", number: "", exp: "", cvc: "" });
  const [error, setError] = useState("");

  if (cart.length === 0) {
    return (
      <div className="page">
        <h1>Rien à payer pour le moment.</h1>
        <Link to="/matelas">Voir les matelas</Link>
      </div>
    );
  }

  function change(event) {
    setCard((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    const digits = card.number.replace(/\s/g, "");
    if (digits.length < 12 || card.exp.length < 4 || card.cvc.length < 3 || !card.name) {
      setError("Complétez le nom, le numéro, la date et le cryptogramme.");
      return;
    }
    placeOrder();
    navigate("/confirmation");
  }

  return (
    <div className="page">
      <Steps current={1} />
      <div className="split">
        <form className="stack form" onSubmit={submit}>
          <div>
            <p className="eyebrow">Paiement</p>
            <h1>Paiement et récapitulatif.</h1>
            <p className="lede">Un dernier geste, puis on prépare votre cocon.</p>
          </div>
          <label>
            Nom sur la carte
            <input name="name" value={card.name} onChange={change} autoComplete="cc-name" />
          </label>
          <label>
            Numéro de carte
            <input name="number" inputMode="numeric" placeholder="ACCT-000015" value={card.number} onChange={change} autoComplete="cc-number" />
          </label>
          <div className="form-grid">
            <label>
              Expiration
              <input name="exp" placeholder="MM/AA" value={card.exp} onChange={change} autoComplete="cc-exp" />
            </label>
            <label>
              Cryptogramme
              <input name="cvc" placeholder="123" value={card.cvc} onChange={change} autoComplete="cc-csc" />
            </label>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="btn" type="submit">
            Payer {euro(total)}
          </button>
          <OrderSummaryNote />
        </form>
        <aside className="summary">
          <h2>Votre commande</h2>
          {user && (
            <p className="muted">
              {user.firstName} {user.lastName}
              <br />
              {user.line}
              <br />
              {user.zip} {user.city}
            </p>
          )}
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
