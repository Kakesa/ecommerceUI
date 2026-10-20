import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useStore } from "../store";
import { IconBag, IconBed, IconClose, IconHome, IconMenu, IconOrders, IconUser, MoonMark } from "./Icons";

const links = [
  { to: "/", label: "Accueil", end: true },
  { to: "/matelas", label: "Nos matelas" },
  { to: "/commandes", label: "Commandes" },
];

export function Shell({ children }) {
  const { count, user } = useStore();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const bare = location.pathname === "/bienvenue" || location.pathname === "/connexion";

  if (bare) return <main className="bare">{children}</main>;

  return (
    <>
      <header className="site-header">
        <div className="promo">
          Livraison offerte en France métropolitaine · De beaux jours commencent la nuit.
        </div>
        <div className="nav-bar">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <MoonMark />
            <span>Teka Somba</span>
          </Link>
          <nav className="desktop-nav" aria-label="Principal">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <Link to={user ? "/compte" : "/connexion"} className="nav-link">
              <IconUser />
              <span>{user ? user.firstName : "Connexion"}</span>
            </Link>
            <Link to="/panier" className="nav-link">
              <IconBag />
              <span>Panier ({count})</span>
            </Link>
            <button type="button" className="icon-btn menu-btn" aria-label="Ouvrir le menu" onClick={() => setOpen(true)}>
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="icon-btn sheet__close" aria-label="Fermer" onClick={() => setOpen(false)}>
            <IconClose />
          </button>
          <nav>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to={user ? "/compte" : "/connexion"} onClick={() => setOpen(false)}>
              {user ? "Mon compte" : "Connexion"}
            </NavLink>
            <NavLink to="/panier" onClick={() => setOpen(false)}>
              Panier ({count})
            </NavLink>
          </nav>
        </div>
      )}

      <main>{children}</main>
      <Footer />
      <nav className="tabbar" aria-label="Navigation mobile">
        <NavLink to="/" end aria-label="Accueil">
          <IconHome />
        </NavLink>
        <NavLink to="/matelas" aria-label="Nos matelas">
          <IconBed />
        </NavLink>
        <NavLink to="/commandes" aria-label="Commandes">
          <IconOrders />
        </NavLink>
        <NavLink to={user ? "/compte" : "/connexion"} aria-label={user ? "Compte" : "Connexion"}>
          <IconUser />
        </NavLink>
      </nav>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="brand brand--light">
            <MoonMark size={26} />
            <span>Teka Somba</span>
          </p>
          <p>De beaux jours commencent la nuit. Votre cocon, simplement.</p>
        </div>
        <div>
          <h2>Nos matelas</h2>
          <Link to="/matelas/nuage">Nuage Hybride</Link>
          <Link to="/matelas/cocon">Cocon Mousse</Link>
          <Link to="/matelas/source">Source Latex</Link>
          <Link to="/matelas/horizon">Horizon Ressorts</Link>
        </div>
        <div>
          <h2>À vos côtés</h2>
          <Link to="/matelas">Livraison offerte</Link>
          <Link to="/matelas">Guide des tailles</Link>
          <Link to="/compte">Aide et contact</Link>
          <Link to="/commandes">Suivre une commande</Link>
        </div>
        <div>
          <h2>En toute confiance</h2>
          <p>Paiement sécurisé</p>
          <p>100 nuits d'essai</p>
          <p>Garantie 10 ans</p>
          <p>Fabriqué pour durer</p>
        </div>
      </div>
      <div className="footer-base">
        <span>© 2026 Teka Somba · Jours & nuits douces</span>
        <span>Prix · Livraison · CGV · Mentions</span>
      </div>
    </footer>
  );
}
