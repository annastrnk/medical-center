import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchVisits } from "./redux/slices/visitSlice";
import Header from "./components/header/header";
import AuthModal from "./components/authModal/authModal";
import VisitForm from "./components/visitForm/visitForm";
import VisitList from "./components/visitList/visitList";
import FilterBar from "./components/filterBar/filterBar";


import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const dispatch = useDispatch();
  const [isFormVisible, setFormVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(
    localStorage.getItem("authorized") === "true"
  );

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchVisits());
    }
  }, [dispatch, isAuthorized]);

  const handleLoginSuccess = () => {
    localStorage.setItem("authorized", "true");
    setIsAuthorized(true);
    setModalVisible(false);
  };

  return (
    <div className="container">
      <Header
        onCreateVisitClick={() => setFormVisible(true)}
        onLoginClick={() => setModalVisible(true)}
      />

      <AuthModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onLoginSuccess={handleLoginSuccess} // 💥 додаємо цей проп
      />

      {isAuthorized && (
        <>
          <FilterBar />
          <VisitForm
            isVisible={isFormVisible}
            onClose={() => setFormVisible(false)}
          />
          <VisitList />
        </>
      )}
    </div>
  );
}

export default App;

