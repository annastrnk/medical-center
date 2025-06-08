export default function ConfirmModal({ show, onClose, onConfirm, message }) {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: "400px",
          width: "90%",
          margin: "1.75rem auto",
        }}
      >
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold text-dark">
              Підтвердження видалення
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Закрити"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body text-center">
            <p className="fs-5 text-muted mb-3">{message}</p>
            <i className="bi bi-exclamation-triangle-fill text-warning fs-1"></i>
          </div>

          <div className="modal-footer border-0 d-flex flex-column flex-sm-row justify-content-between gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2 rounded-pill flex-fill"
              onClick={onClose}
            >
              Скасувати
            </button>
            <button
              type="button"
              className="btn btn-danger px-4 py-2 rounded-pill flex-fill"
              onClick={onConfirm}
            >
              Видалити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
