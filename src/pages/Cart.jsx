import { Link } from "react-router-dom";
import { BedArt } from "../components/BedArt";
import { euro, firmnessLabel, sizeLabel } from "../data";
import { useStore } from "../store";

export function CartPage() {
  const { cart, total, updateQty, removeFromCart } = useStore();
  return (
    <div className="page">
      <p className="crumbs">
        <Link to="/">Accueil</Link> / Mon panier
      </p>
      <h1>Un peu plus près du rêve.</h1>
      <p className="lede">
        {cart.length === 0
          ? "Votre panier est encore vide."
          : `${cart.reduce((sum, item) => sum + item.qty, 0)} article${cart.reduce((sum, item) => sum + item.qty, 0) > 1 ? "s" : ""} dans votre panier`}
      </p>

      {cart.length === 0 ? (
        <Link to="/matelas" className="btn">
          Voir les matelas
        </Link>
      ) : (
        <div className="split">
          <div className="stack">
            {cart.map((item, index) => (
              <article key={`${item.productId}-${item.size}-${index}`} className="line-item">
                <div className="line-item__art">
                  <BedArt variant={item.productId} />
                </div>
                <div>
                  <h2>{item.product.name}</h2>
                  <p className="muted">
                    {firmnessLabel(item.firmness)} · {sizeLabel(item.size)}
                    <br />
                    {item.product.composition}
                  </p>
                  <div className="qty">
                    <button type="button" onClick={() => updateQty(index, item.qty - 1)} aria-label="Diminuer">
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQty(index, item.qty + 1)} aria-label="Augmenter">
                      +
                    </button>
                    <button type="button" className="text-btn" onClick={() => removeFromCart(index)}>
                      Retirer
                    </button>
                  </div>
                </div>
                <strong>{euro(item.line)}</strong>
              </article>
            ))}
            <p className="shipping-note">
              <strong>Votre matelas arrive sans frais.</strong>
              <span>Livraison estimée sous 5 à 7 jours ouvrés.</span>
            </p>
          </div>
          <aside className="summary">
            <h2>Votre commande</h2>
            <p>
              <span>Sous-total</span>
              <span>{euro(total)}</span>
            </p>
            <p>
              <span>Livraison</span>
              <span>Offerte</span>
            </p>
            <p className="summary__total">
              <span>Total</span>
              <span>{euro(total)}</span>
            </p>
            <Link to="/commande" className="btn btn--block">
              Passer commande
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
