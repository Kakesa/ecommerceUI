import { Link } from "react-router-dom";

const steps = ["Livraison", "Paiement", "Confirmation"];

export function Steps({ current }) {
  return (
    <ol className="steps">
      {steps.map((label, index) => (
        <li key={label} className={index === current ? "is-current" : index < current ? "is-done" : ""}>
          <span>{index + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  );
}

export function OrderSummaryNote() {
  return (
    <p className="tiny muted">
      Démonstration d'interface : aucun paiement n'est envoyé à une banque.
    </p>
  );
}

export function BackHome() {
  return (
    <Link to="/" className="text-btn">
      Retour à l'accueil
    </Link>
  );
}
