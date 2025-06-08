import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteVisit, setCurrentVisit } from "../../redux/slices/visitSlice";
import ConfirmModal from "../confirmModal/confirmModal";

export default function VisitCard({ visit, onShowForm }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteVisit(visit.id));
    setShowModal(false);
  };

  const handleEdit = () => {
    dispatch(setCurrentVisit(visit));
    onShowForm();
  };

  return (
    <div className="col mb-4">
      <div
        className="card shadow-lg h-100 d-flex flex-column"
        style={{
          borderRadius: "12px",
          backgroundColor: "#f8f9fa",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          minHeight: "320px",
        }}
      >
        <div className="card-body flex-grow-1 d-flex flex-column">
          <h5
            className="card-title"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {visit.title}
          </h5>
          <p className="card-text" style={{ fontSize: "0.9rem" }}>
            <strong>Пацієнт:</strong> {visit.firstname}
          </p>
          <p className="card-text" style={{ fontSize: "0.9rem" }}>
            <strong>Лікар:</strong> {visit.doctor}
          </p>
          <p className="card-text" style={{ fontSize: "0.9rem" }}>
            <strong>Терміновість:</strong> {visit.priority}
          </p>
          <p className="card-text" style={{ fontSize: "0.9rem", flexGrow: 1 }}>
            <strong>Опис:</strong> {visit.description}
          </p>

          <div
            className="d-flex justify-content-between mt-3"
            style={{ gap: "0.5rem", flexWrap: "wrap" }}
          >
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              style={{
                borderRadius: "5px",
                backgroundColor: "#ff5c5c",
                border: "none",
                transition: "background-color 0.3s",
                flex: "1 1 45%",
                minWidth: "120px",
                maxWidth: "100%",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e84f4f")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff5c5c")}
            >
              Видалити
            </button>

            <button
              className="btn btn-warning"
              onClick={handleEdit}
              style={{
                borderRadius: "5px",
                backgroundColor: "#ffc107",
                border: "none",
                transition: "background-color 0.3s",
                flex: "1 1 45%",
                minWidth: "120px",
                maxWidth: "100%",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ffb200")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ffc107")}
            >
              Редагувати
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteConfirm}
        message="Ти впевнений, що хочеш видалити цей візит?"
      />
    </div>
  );
}
