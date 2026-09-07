import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/Home"
import Landing from "./pages/landing";
import PublicRoute from "./components/publicRoute";
import ProtectedRoute from "./components/protectedRoute";
// import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";


function App() {
    return (
       <AuthProvider>
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<PublicRoute><Landing/></PublicRoute>} />  
                <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
                <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
                {/* <Route path="/profile/username" element={<ProtectedRoute><Profile/></ProtectedRoute>} /> */}
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}

export default App;