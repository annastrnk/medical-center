import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import springLogo from "../../../assets/icons8-spring-boot-48.svg";

export default function Header({ onCreateVisitClick, onLoginClick }) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3 container shadow-sm"
      style={{
        backgroundColor: "#0d6efd36",
        borderRadius: "1rem",
      }}
    >
      <div className="logo d-flex align-items-center mb-3 mb-md-0">
        <img src={springLogo} alt="logo"
          style={{
            width: "40px",
            marginRight: "15px",
            transition: "transform 0.3s ease",
          }}
          className="logo-img"
        />
        <h1 className="m-0 text-primary fw-bold" style={{ fontSize: "1.5rem" }}>
          Medical Center
        </h1>
      </div>

      <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
        {!isAuthenticated ? (
          <button
            className="btn btn-primary rounded-pill px-4 py-2 shadow"
            onClick={onLoginClick}
            style={{ fontWeight: "500", minWidth: "120px" }}
          >
            Вхід
          </button>
        ) : (
          <>
            <button
              className="btn btn-success rounded-pill px-4 py-2 shadow"
              onClick={onCreateVisitClick}
              style={{ fontWeight: "500", minWidth: "120px" }}
            >
              Створити візит
            </button>
            <button
              className="btn btn-danger rounded-pill px-4 py-2 shadow"
              onClick={handleLogout}
              style={{ fontWeight: "500", minWidth: "120px" }}
            >
              Вихід
            </button>
          </>
        )}
      </div>
    </header>
  );
}
