import Popup from "../Main/components/Popup/Popup";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    isOpen && (
      <Popup onClose={onClose}>
        <div className="infotooltip">
          <div
            className={`infotooltip__logo ${
              isSuccess ? "infotooltip__logo_success" : "infotooltip__logo_fail"
            }`}
          />

          <p className="infotooltip__message">
            {isSuccess
              ? "¡Correcto! Ya estás registrado."
              : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
          </p>
        </div>
      </Popup>
    )
  );
}
