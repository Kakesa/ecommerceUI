import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { FIRMNESS, SIZES, TECHNOLOGIES, euro, priceFor, products } from "../data";

export function CatalogPage() {
  const [params, setParams] = useSearchParams();
  const tech = params.get("tech") || "";
  const firmness = params.get("fermete") || "";
  const size = params.get("taille") || "160x200";
  const budget = Number(params.get("budget") || 1500);
  const query = params.get("q") || "";
  const sort = params.get("tri") || "reco";

  function update(next) {
    const draft = new URLSearchParams(params);
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "1500") draft.delete(key);
      else draft.set(key, value);
    });
    if (next.taille === "160x200") draft.delete("taille");
    setParams(draft);
  }

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      if (tech && product.tech !== tech) return false;
      if (firmness && product.firmness !== firmness) return false;
      if (query && !`${product.name} ${product.composition}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (priceFor(product, size) > budget) return false;
      return true;
    });
    if (sort === "prix-asc") list = [...list].sort((a, b) => priceFor(a, size) - priceFor(b, size));
    if (sort === "prix-desc") list = [...list].sort((a, b) => priceFor(b, size) - priceFor(a, size));
    return list;
  }, [tech, firmness, query, budget, size, sort]);

  const active = [
    size !== "160x200" ? { key: "taille", label: SIZES.find((item) => item.id === size)?.label } : null,
    firmness ? { key: "fermete", label: FIRMNESS.find((item) => item.id === firmness)?.label } : null,
    tech ? { key: "tech", label: TECHNOLOGIES.find((item) => item.id === tech)?.label } : null,
    budget < 1500 ? { key: "budget", label: `Jusqu'à ${euro(budget)}` } : null,
    query ? { key: "q", label: query } : null,
  ].filter(Boolean);

  const focused = active.length > 0;
  const match = filtered.length === 1 ? filtered[0] : null;

  return (
    <div className="page">
      <div className={`catalog-hero ${focused ? "is-focused" : ""}`}>
        <p className="crumbs">
          <Link to="/">Accueil</Link> / Nos matelas {focused && "/ Votre sélection"}
        </p>
        <p className="eyebrow">Le confort à votre mesure</p>
        <h1>{focused ? "Votre confort, vos critères." : "Trouvez votre équilibre."}</h1>
        <p className="lede">
          {focused
            ? "Sélectionnez ce qui compte pour vos nuits."
            : "Quatre matelas, une belle nuit à la clé."}
        </p>
      </div>

      <div className="catalog">
        <aside className="filters">
          <div className="filters__top">
            <h2>Filtres</h2>
            {active.length > 0 && (
              <button type="button" className="text-btn" onClick={() => setParams(new URLSearchParams())}>
                Réinitialiser
              </button>
            )}
          </div>
          <label className="search">
            <span className="sr">Rechercher un matelas</span>
            <input
              value={query}
              placeholder="Rechercher un matelas"
              onChange={(event) => update({ q: event.target.value })}
            />
          </label>

          <fieldset>
            <legend>Dimensions</legend>
            <div className="choice-grid">
              {SIZES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={size === item.id ? "is-on" : ""}
                  onClick={() => update({ taille: item.id })}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Fermeté</legend>
            <div className="choice-grid">
              {FIRMNESS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={firmness === item.id ? "is-on" : ""}
                  onClick={() => update({ fermete: firmness === item.id ? "" : item.id })}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Technologie</legend>
            <div className="choice-grid">
              {TECHNOLOGIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={tech === item.id ? "is-on" : ""}
                  onClick={() => update({ tech: tech === item.id ? "" : item.id })}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Budget · jusqu'à {euro(budget)}</legend>
            <input
              type="range"
              min="300"
              max="1500"
              step="50"
              value={budget}
              onChange={(event) => update({ budget: event.target.value })}
            />
            <div className="range-labels">
              <span>300 €</span>
              <span>1 500 €</span>
            </div>
          </fieldset>
        </aside>

        <div className="catalog__main">
          <div className="catalog__tools">
            <div className="chips">
              <button type="button" className={!tech ? "is-on" : ""} onClick={() => update({ tech: "" })}>
                Tous les matelas
              </button>
              {TECHNOLOGIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={tech === item.id ? "is-on" : ""}
                  onClick={() => update({ tech: tech === item.id ? "" : item.id })}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="sort">
              Trier par
              <select value={sort} onChange={(event) => update({ tri: event.target.value === "reco" ? "" : event.target.value })}>
                <option value="reco">Recommandés</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
              </select>
            </label>
          </div>

          {active.length > 0 && (
            <div className="active-filters">
              <span>
                {filtered.length} matelas correspond{filtered.length > 1 ? "ent" : ""} à vos critères
              </span>
              {active.map((item) => (
                <button key={item.key} type="button" onClick={() => update({ [item.key]: "" })}>
                  {item.label} ×
                </button>
              ))}
            </div>
          )}

          {match && (
            <article className="match">
              <p className="eyebrow">Votre match · {match.name}</p>
              <p>Le juste équilibre entre accueil doux et soutien.</p>
            </article>
          )}

          {filtered.length === 0 ? (
            <p className="empty">Aucun matelas ne correspond. Élargissez un critère.</p>
          ) : focused && match ? (
            <article className="spotlight">
              <ProductCard product={match} sizeId={size} />
              <div>
                <p className="eyebrow">Coup de cœur</p>
                <h2>{match.name}</h2>
                <p>{match.blurb}</p>
                <p className="muted">
                  {match.height} · Épaisseur adaptée au {SIZES.find((item) => item.id === size)?.label}
                </p>
                <p className="spotlight__price">Dès {euro(priceFor(match, size))}</p>
                <Link to={`/matelas/${match.id}?taille=${size}`} className="btn">
                  Découvrir ce matelas
                </Link>
              </div>
            </article>
          ) : (
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} sizeId={size} />
              ))}
            </div>
          )}

          <article className="shipping-note">
            <strong>Livraison offerte, nuits sereines.</strong>
            <span>Partout en France métropolitaine.</span>
          </article>

          {focused && (
            <p className="compare-line">
              Envie de comparer les autres conforts ?{" "}
              <button type="button" className="text-btn" onClick={() => setParams(new URLSearchParams())}>
                Réinitialiser les filtres
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
