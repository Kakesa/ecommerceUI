import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BedArt } from "../components/BedArt";
import { FIRMNESS, SIZES, euro, firmnessLabel, getProduct, priceFor, techLabel } from "../data";
import { useStore } from "../store";
import { IconHeart } from "../components/Icons";

export function ProductPage() {
  const { id } = useParams();
  const product = getProduct(id);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart, favorites, toggleFavorite } = useStore();
  const [size, setSize] = useState(params.get("taille") || "160x200");
  const [firmness, setFirmness] = useState(product?.firmness || "equilibre");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="page">
        <h1>Matelas introuvable</h1>
        <Link to="/matelas">Retour au catalogue</Link>
      </div>
    );
  }

  const price = priceFor(product, size);
  const loved = favorites.includes(product.id);

  return (
    <div className="page">
      <p className="crumbs">
        <Link to="/">Accueil</Link> / <Link to="/matelas">Nos matelas</Link> / {product.name}
      </p>
      <div className="pdp">
        <div className="pdp__gallery">
          <div className="pdp__hero">
            <span className="pill">{product.badge}</span>
            <BedArt variant={product.id} />
          </div>
          <div className="thumbs">
            <BedArt variant={product.id} />
            <BedArt variant="cocon" />
            <BedArt variant="horizon" />
          </div>
        </div>
        <div className="pdp__info">
          <div className="pdp__title">
            <div>
              <p className="eyebrow">{techLabel(product.tech)}</p>
              <h1>{product.name}</h1>
            </div>
            <button
              type="button"
              className={`heart ${loved ? "is-on" : ""}`}
              aria-label="Favori"
              onClick={() => toggleFavorite(product.id)}
            >
              <IconHeart filled={loved} />
            </button>
          </div>
          <p>{product.story}</p>
          <p className="pdp__price">{euro(price)}</p>
          <p className="muted">Prix TTC · Livraison offerte en France métropolitaine</p>

          <fieldset>
            <legend>Dimensions</legend>
            <div className="choice-grid">
              {SIZES.map((item) => (
                <button key={item.id} type="button" className={size === item.id ? "is-on" : ""} onClick={() => setSize(item.id)}>
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Fermeté · conseillée : {firmnessLabel(product.firmness)}</legend>
            <div className="choice-grid">
              {FIRMNESS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={firmness === item.id ? "is-on" : ""}
                  onClick={() => setFirmness(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            className="btn btn--block pdp__buy"
            onClick={() => {
              addToCart(product.id, size, firmness);
              setAdded(true);
            }}
          >
            Ajouter au panier · {euro(price)}
          </button>
          {added && (
            <p className="added">
              Ajouté au panier. <button type="button" className="text-btn" onClick={() => navigate("/panier")}>Voir le panier</button>
            </p>
          )}
          <ul className="trust">
            <li>Livraison offerte</li>
            <li>100 nuits d'essai</li>
            <li>Garantie 10 ans</li>
          </ul>
        </div>
      </div>

      <section className="section">
        <div className="section__head">
          <p className="eyebrow">Pensé pour votre confort</p>
          <h2>Le confort, couche par couche.</h2>
        </div>
        <div className="feature-grid">
          {product.features.map((feature) => (
            <article key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
