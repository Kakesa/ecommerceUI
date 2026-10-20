import { Link } from "react-router-dom";
import { BedArt } from "../components/BedArt";
import { ProductCard } from "../components/ProductCard";
import { euro, products } from "../data";
import { IconArrow } from "../components/Icons";

const criteria = [
  {
    title: "La bonne dimension",
    text: "140 × 190, 160 × 200 ou 180 × 200 cm : l'espace de votre espace et de vos habitudes.",
  },
  {
    title: "Votre niveau de fermeté",
    text: "Moelleux, équilibré ou ferme : choisissez l'accueil dans lequel vous sentez bon.",
  },
  {
    title: "La technologie qui vous va",
    text: "Hybride, mousse, latex ou ressorts. Comparez les compositions en un regard.",
  },
];

const faqs = [
  {
    q: "Où livrez-vous ?",
    a: "La livraison est offerte partout en France métropolitaine. Le matelas arrive roulé, prêt à s'ouvrir.",
  },
  {
    q: "Comment choisir les dimensions ?",
    a: "Ajoutez 15 à 20 cm de chaque côté du sommier. Un 160 × 200 convient à la plupart des couples.",
  },
  {
    q: "Où retrouver ma commande ?",
    a: "Depuis votre compte, suivez chaque étape dans « Mes commandes ».",
  },
];

export function HomePage() {
  const featured = products[0];
  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Teka Somba</p>
          <h1>De beaux jours commencent la nuit.</h1>
          <p className="lede">
            Quatre matelas, une belle nuit à la clé. Choisissez l'accueil, le soutien et la matière qui vous ressemblent.
          </p>
          <div className="hero__actions">
            <Link to="/matelas" className="btn">
              Découvrir nos matelas <IconArrow />
            </Link>
            <Link to="/matelas?fermete=equilibre" className="btn btn--ghost">
              Trouver mon équilibre
            </Link>
          </div>
        </div>
        <div className="hero__art">
          <BedArt variant="nuage" />
          <div className="hero__note">
            <strong>Votre cocon, simplement.</strong>
            <span>Livraison offerte · 100 nuits d'essai</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <p className="eyebrow">La collection</p>
          <h2>Quatre matelas, une belle nuit à la clé.</h2>
        </div>
        <div className="card-row">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="feature">
        <div className="feature__art">
          <BedArt variant="nuage" />
        </div>
        <div>
          <p className="eyebrow">Notre coup de cœur</p>
          <h2>L'accueil d'un nuage. Le soutien qu'il vous faut.</h2>
          <p>
            Nuage Hybride réunit ressorts ensachés et mémoire de forme : un accueil enveloppant, un soutien précis.
          </p>
          <ul className="stat-row">
            <li>
              <strong>{featured.support}</strong>
              <span>Soutien</span>
            </li>
            <li>
              <strong>{featured.height}</strong>
              <span>Épaisseur</span>
            </li>
            <li>
              <strong>4 cm</strong>
              <span>Mémoire</span>
            </li>
          </ul>
          <div className="hero__actions">
            <Link to="/matelas/nuage" className="btn">
              Découvrir Nuage Hybride <IconArrow />
            </Link>
            <span className="price-pill">Dès {euro(featured.basePrice)}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <p className="eyebrow">Votre confort, vos critères</p>
          <h2>Le bon matelas commence par vous.</h2>
        </div>
        <div className="criteria">
          {criteria.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="advice">
          <article className="advice__pink">
            <p className="eyebrow">Un conseil</p>
            <h3>Besoin d'un conseil pour mieux dormir ?</h3>
            <p>Notre équipe vous aide à choisir le bon accueil.</p>
            <Link to="/compte" className="btn btn--light">
              Nous contacter
            </Link>
          </article>
          <article>
            <h3>Tout simplement, avant de rêver.</h3>
            <dl>
              {faqs.map((item) => (
                <div key={item.q}>
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </section>
    </>
  );
}
