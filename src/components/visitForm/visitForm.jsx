import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVisit,
  updateVisit,
  setCurrentVisit,
} from "../../redux/slices/visitSlice";

export default function VisitForm({ isVisible, onClose }) {
  const dispatch = useDispatch();

  const { visitToEdit, editMode } = useSelector((state) => state.visits);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Звичайна",
    firstname: "",
    doctor: "Виберіть лікаря",
  });

  useEffect(() => {
    if (editMode && visitToEdit) {
      setFormData(visitToEdit);
    }
  }, [editMode, visitToEdit]);

  useEffect(() => {
    if (!editMode) {
      setFormData({
        title: "",
        description: "",
        priority: "Звичайна",
        firstname: "",
        doctor: "Виберіть лікаря",
      });
    }
  }, [editMode]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode && visitToEdit?.id) {
      dispatch(updateVisit({ id: visitToEdit.id, updatedData: formData }));
    } else {
      dispatch(createVisit(formData));
    }

    dispatch(setCurrentVisit(null));
    onClose();
  };
  if (!isVisible) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div
        className="modal-content p-4"
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#fff",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          border: "none",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-dark m-0">
            {editMode ? "Редагування візиту" : "Новий візит"}
          </h4>
          <button
            type="button"
            className="btn-close"
            aria-label="Закрити"
            onClick={() => {
              dispatch(setCurrentVisit(null));
              onClose();
            }}
          ></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Мета візиту"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              name="description"
              placeholder="Короткий опис"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Терміновість</label>
            <select
              name="priority"
              className="form-select"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Звичайна">Звичайна</option>
              <option value="Пріоритетна">Пріоритетна</option>
              <option value="Невідкладна">Невідкладна</option>
            </select>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="firstname"
              placeholder="ПІБ"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <select
              name="doctor"
              className="form-select"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="Виберіть лікаря">Виберіть лікаря</option>
              <option value="Кардіолог">Кардіолог</option>
              <option value="Стоматолог">Стоматолог</option>
              <option value="Терапевт">Терапевт</option>
            </select>
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-secondary me-2 px-4 py-2 rounded-pill"
              onClick={() => {
                dispatch(setCurrentVisit(null));
                onClose();
              }}
            >
              Закрити
            </button>
            <button
              type="submit"
              className="btn btn-primary px-4 py-2 rounded-pill"
            >
              {editMode ? "Зберегти" : "Створити"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
