import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import useUserRoutes from "./components/routes/adminRoutes";
import useAdminRoutes from "./components/routes/userRoutes";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./components/user/Home";

function App() {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();
  return (
    <Router>
      <div>
        <Toaster />
        <Header />
        <div className="max-w-[900px] mx-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {userRoutes}
            {adminRoutes}
            <Route path="*" element={<>page not found</>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
