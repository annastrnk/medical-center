import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

export default function LoginModal({ isVisible, onClose }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch(
        "https://ajax.test-danit.com/api/v2/cards/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Невірні дані. Спробуйте ще раз.");
      }

      const token = await response.text();
      dispatch(login(token));
      onClose();
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg(error.message);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <form
          onSubmit={handleLogin}
          className="modal-content p-4"
          style={{ maxWidth: "400px", margin: "auto", borderRadius: "1rem" }}
        >
          <h5 className="modal-title mb-3 text-center fw-bold">
            Вхід до системи
          </h5>

          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-end flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ minWidth: "100px" }}
            >
              Закрити
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ minWidth: "100px" }}
            >
              Увійти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
