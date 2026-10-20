import { Link } from "react-router-dom";
import { euro, firmnessLabel, getProduct, sizeLabel } from "../data";
import { useStore } from "../store";
import { IconCheck } from "../components/Icons";
import { Steps } from "./Steps";

export function ConfirmationPage() {
  const { orders, lastOrderId } = useStore();
  const order = orders.find((item) => item.id === lastOrderId) || orders[0];

  if (!order) {
    return (
      <div className="page">
        <h1>Aucune commande récente.</h1>
        <Link to="/matelas">Découvrir les matelas</Link>
      </div>
    );
  }

  return (
    <div className="page confirm">
      <Steps current={2} />
      <div className="confirm__mark">
        <IconCheck />
      </div>
      <p className="eyebrow">Commande {order.id}</p>
      <h1>Vos nuits sont en chemin.</h1>
      <p className="lede">
        Merci. Livraison estimée du {order.window}. Vous recevrez chaque étape par e-mail.
      </p>
      <ul className="confirm__list">
        {order.items.map((item) => {
          const product = getProduct(item.productId);
          return (
            <li key={`${item.productId}-${item.size}`}>
              <span>
                {product?.name} · {sizeLabel(item.size)} · {firmnessLabel(item.firmness)} × {item.qty}
              </span>
              <strong>{euro(item.price * item.qty)}</strong>
            </li>
          );
        })}
      </ul>
      <p className="summary__total">
        <span>Total réglé</span>
        <span>{euro(order.total)}</span>
      </p>
      <div className="hero__actions">
        <Link to="/commandes" className="btn">
          Suivre ma commande
        </Link>
        <Link to="/matelas" className="btn btn--ghost">
          Continuer à rêver
        </Link>
      </div>
    </div>
  );
}
