import { Link } from "react-router-dom";
import { euro, firmnessLabel } from "../data";
import { useStore } from "../store";
import { BedArt } from "./BedArt";
import { IconArrow, IconHeart } from "./Icons";

export function ProductCard({ product, sizeId = "90x190" }) {
  const { favorites, toggleFavorite } = useStore();
  const loved = favorites.includes(product.id);
  return (
    <article className="product-card">
      <Link to={`/matelas/${product.id}`} className="product-card__media">
        <BedArt variant={product.id} />
        <button
          type="button"
          className={`heart ${loved ? "is-on" : ""}`}
          aria-label={loved ? "Retirer des favoris" : "Ajouter aux favoris"}
          onClick={(event) => {
            event.preventDefault();
            toggleFavorite(product.id);
          }}
        >
          <IconHeart filled={loved} />
        </button>
      </Link>
      <div className="product-card__body">
        <p className="eyebrow">{product.tag}</p>
        <h3>
          <Link to={`/matelas/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="muted">
          {firmnessLabel(product.firmness)} · {product.height}
          <br />
          {product.composition}
        </p>
        <div className="product-card__row">
          <strong>Dès {euro(product.basePrice)}</strong>
          <Link to={`/matelas/${product.id}?taille=${sizeId}`} className="circle-btn" aria-label={`Voir ${product.name}`}>
            <IconArrow />
          </Link>
        </div>
      </div>
    </article>
  );
}
