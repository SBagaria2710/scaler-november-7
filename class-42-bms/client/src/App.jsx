import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import './App.css'
import "antd/dist/reset.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/admin";
import PNF from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import TheatreShows from "./pages/partner/TheatreShows";
import BookShow from "./pages/BookShow";
import ForgetPasswordPage from "./pages/ForgetPass";

import ProtectedRoute from "./components/ProtectedRoute";
import Partner from "./pages/partner";
import MovieDetails from "./pages/MovieDetails";
import Reset from "./pages/ResetPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<ForgetPasswordPage />} />
        <Route path="/forget" element={<Reset />} />
        {/* User will see */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/movie/:movieId" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
        <Route path="/book-show/:showId" element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
        {/* Admin will see */}
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        {/* Partner will see */}
        <Route path="/partner" element={<ProtectedRoute><Partner /></ProtectedRoute>} />
        <Route path="/partner/theatres/:theatreId/shows" element={<ProtectedRoute><TheatreShows /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<PNF />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
