import { Link, useNavigate } from "react-router-dom";
import { products } from "../data";
import { useStore } from "../store";
import { BedArt } from "../components/BedArt";

const menu = [
  { to: "/commandes", title: "Mes commandes", text: "Suivre une livraison en cours." },
  { to: "/compte", title: "Mes adresses", text: "L'adresse utilisée pour vos matelas." },
  { to: "/compte#favoris", title: "Mes favoris", text: "Les matelas que vous gardez en tête." },
  { to: "/matelas", title: "Aide et contact", text: "Une question ? Nous vous aidons à choisir." },
];

export function AccountPage() {
  const { user, logout, favorites } = useStore();
  const navigate = useNavigate();
  const loved = products.filter((product) => favorites.includes(product.id));

  if (!user) {
    return (
      <div className="page">
        <h1>Mon compte</h1>
        <p className="lede">Connectez-vous pour retrouver votre espace.</p>
        <Link to="/connexion" className="btn">
          Connexion
        </Link>
      </div>
    );
  }

  return (
    <div className="page account">
      <article className="profile">
        <div className="avatar" aria-hidden="true">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <p>{user.email}</p>
        <p className="muted">
          {user.line}
          {user.extra ? `, ${user.extra}` : ""}
          <br />
          {user.zip} {user.city}
        </p>
      </article>

      <section>
        <h2>Votre espace</h2>
        <div className="account-menu">
          <Link to="/connexion">
            <strong>Connexion</strong>
            <span>Ouvrir la page e-mail et mot de passe.</span>
          </Link>
          {menu.map((item) => (
            <Link key={item.title} to={item.to}>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/connexion");
            }}
          >
            <strong>Déconnexion</strong>
            <span>Revenir plus tard, le cocon reste là.</span>
          </button>
        </div>
      </section>

      <section id="favoris">
        <h2>Mes favoris</h2>
        {loved.length === 0 ? (
          <p className="muted">Aucun favori pour le moment.</p>
        ) : (
          <div className="fav-row">
            {loved.map((product) => (
              <Link key={product.id} to={`/matelas/${product.id}`} className="fav">
                <BedArt variant={product.id} />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <article className="advice__pink advice__pink--inline">
        <h2>Besoin d'un conseil pour mieux dormir ?</h2>
        <p>Écrivez-nous à bonjour@tekasomba.fr — nous répondons dans la journée.</p>
      </article>
    </div>
  );
}
