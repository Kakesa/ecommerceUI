import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BedArt } from "../components/BedArt";
import { MoonMark } from "../components/Icons";
import { useStore } from "../store";

export function WelcomePage() {
  return (
    <section className="gate">
      <div className="gate__art">
        <BedArt variant="nuage" />
      </div>
      <div className="gate__panel">
        <Link to="/" className="brand">
          <MoonMark />
          <span>Teka Somba</span>
        </Link>
        <p className="eyebrow">Bienvenue</p>
        <h1>De beaux jours commencent la nuit.</h1>
        <p className="lede">Votre cocon, simplement. Quatre matelas, choisis pour la douceur et le maintien.</p>
        <div className="stack">
          <Link to="/matelas" className="btn">
            Entrer dans la boutique
          </Link>
          <Link to="/connexion" className="btn btn--ghost">
            J'ai déjà un compte
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("claire.martin@email.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Indiquez un e-mail valide et un mot de passe d'au moins 4 caractères.");
      return;
    }
    const known = email.toLowerCase() === "claire.martin@email.com";
    login(
      known
        ? { email }
        : {
            email,
            firstName: "Invité",
            lastName: "Teka",
            phone: "",
            line: "",
            zip: "",
            city: "",
          }
    );
    navigate("/compte");
  }

  return (
    <section className="gate">
      <div className="gate__art">
        <BedArt variant="source" />
      </div>
      <form className="gate__panel form" onSubmit={submit}>
        <Link to="/" className="brand">
          <MoonMark />
          <span>Teka Somba</span>
        </Link>
        <p className="eyebrow">Connexion</p>
        <h1>Retrouvez votre cocon.</h1>
        <label>
          Adresse e-mail
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
        </label>
        <label>
          Mot de passe
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="btn" type="submit">
          Se connecter
        </button>
        <Link to="/bienvenue" className="text-btn">
          Découvrir Teka Somba
        </Link>
      </form>
    </section>
  );
}
