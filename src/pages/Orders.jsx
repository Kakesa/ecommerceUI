import { Link } from "react-router-dom";
import { BedArt } from "../components/BedArt";
import { euro, getProduct, sizeLabel } from "../data";
import { useStore } from "../store";

export function OrdersPage() {
  const { orders, user } = useStore();
  return (
    <div className="page">
      <p className="crumbs">
        <Link to="/">Accueil</Link> / Commandes
      </p>
      <h1>Mes commandes</h1>
      <p className="lede">
        {user ? `${user.firstName}, retrouvez ici ce qui arrive dans votre cocon.` : "Connectez-vous pour retrouver vos commandes."}
      </p>
      {!user && (
        <Link to="/connexion" className="btn">
          Connexion
        </Link>
      )}
      <div className="stack">
        {orders.length === 0 && <p className="empty">Pas encore de commande.</p>}
        {orders.map((order) => (
          <article key={order.id} className="order-card">
            <div className="order-card__top">
              <div>
                <p className="eyebrow">{order.id}</p>
                <h2>Livraison {order.window}</h2>
              </div>
              <span className="status">{order.status}</span>
            </div>
            {order.items.map((item) => {
              const product = getProduct(item.productId);
              return (
                <div key={`${order.id}-${item.productId}`} className="line-item line-item--compact">
                  <div className="line-item__art">
                    <BedArt variant={item.productId} />
                  </div>
                  <div>
                    <strong>{product?.name}</strong>
                    <p className="muted">
                      {sizeLabel(item.size)} · Qté {item.qty}
                    </p>
                  </div>
                  <span>{euro(item.price * item.qty)}</span>
                </div>
              );
            })}
          </article>
        ))}
      </div>
    </div>
  );
}
