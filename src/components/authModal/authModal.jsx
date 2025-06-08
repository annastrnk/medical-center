import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../redux/slices/authSlice";

export default function AuthModal({ isVisible, onClose, onLoginSuccess }) {
  const dispatch = useDispatch();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");

    const url = isLoginMode
      ? "https://ajax.test-danit.com/api/v2/cards/login"
      : "https://ajax.test-danit.com/api/v2/cards/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      if (isLoginMode) {
        const token = await response.text();
        dispatch(loginAction(token));
        localStorage.setItem("authorized", "true");
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setMessage("Акаунт створено! Тепер увійдіть.");
        setIsLoginMode(true);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <form onSubmit={handleSubmit} className="modal-content p-4">
          <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
            <button
              type="button"
              className={`btn ${
                isLoginMode ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setIsLoginMode(true)}
              style={{ flex: "1 1 45%" }}
            >
              Увійти
            </button>
            <button
              type="button"
              className={`btn ${
                !isLoginMode ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setIsLoginMode(false)}
              style={{ flex: "1 1 45%" }}
            >
              Зареєструватися
            </button>
          </div>

          <h5 className="modal-title mb-3 text-center">
            {isLoginMode ? "Вхід" : "Реєстрація"}
          </h5>

          {message && <div className="alert alert-success">{message}</div>}
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
            >
              Закрити
            </button>
            <button type="submit" className="btn btn-primary">
              {isLoginMode ? "Увійти" : "Зареєструватися"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
