import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useStore } from "../store";
import { IconBack, IconBag, IconBed, IconClose, IconHome, IconMenu, IconOrders, IconUser, MoonMark } from "./Icons";

const links = [
  { to: "/", label: "Accueil", end: true },
  { to: "/matelas", label: "Nos matelas" },
  { to: "/commandes", label: "Commandes" },
];

const tabItems = [
  { to: "/", label: "Accueil", end: true, icon: <IconHome /> },
  { to: "/matelas", label: "Matelas", icon: <IconBed /> },
  { to: "/commandes", label: "Commandes", icon: <IconOrders /> },
];

function screenTitle(pathname) {
  if (pathname.startsWith("/matelas/")) return "Matelas";
  const titles = {
    "/matelas": "Nos matelas",
    "/panier": "Panier",
    "/commande": "Coordonnées",
    "/paiement": "Paiement",
    "/confirmation": "Confirmation",
    "/commandes": "Commandes",
    "/compte": "Compte",
  };
  return titles[pathname] || "Teka Somba";
}

function parentPath(pathname) {
  if (pathname.startsWith("/matelas/")) return "/matelas";
  if (pathname === "/commande") return "/panier";
  if (pathname === "/paiement") return "/commande";
  if (pathname === "/confirmation") return "/commandes";
  if (pathname === "/panier") return "/matelas";
  return "/";
}

export function Shell({ children }) {
  const { count, user } = useStore();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const bare = location.pathname === "/bienvenue" || location.pathname === "/connexion";

  if (bare) return <main className="bare">{children}</main>;

  const title = screenTitle(location.pathname);
  const place = user ? `${user.city}, ${user.zip}` : "Paris, 75011";

  return (
    <>
      <header className="m-bar">
        {location.pathname === "/" ? (
          <>
            <p className="m-loc">Livraison à {place}</p>
            <div className="m-bar__row">
              <Link to="/connexion" className="icon-btn" aria-label="Connexion">
                <IconUser />
              </Link>
              <Link to="/" className="brand">
                <MoonMark size={22} />
                <span>Teka Somba</span>
              </Link>
              <Link to="/panier" className="icon-btn m-bag" aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}>
                <IconBag />
                {count > 0 && <em>{count}</em>}
              </Link>
            </div>
          </>
        ) : (
          <div className="m-bar__row">
            <Link to={parentPath(location.pathname)} className="icon-btn" aria-label="Retour">
              <IconBack />
            </Link>
            <strong className="m-title">{title}</strong>
            <Link to="/panier" className="icon-btn m-bag" aria-label={`Panier, ${count} article${count > 1 ? "s" : ""}`}>
              <IconBag />
              {count > 0 && <em>{count}</em>}
            </Link>
          </div>
        )}
      </header>
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
            <Link to="/connexion" className="nav-link">
              <span>Connexion</span>
            </Link>
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
        {tabItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
        <NavLink to={user ? "/compte" : "/connexion"}>
          <IconUser />
          <span>{user ? "Compte" : "Connexion"}</span>
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
