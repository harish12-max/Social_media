import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/Home"
import Landing from "./pages/landing";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Landing />} />  
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;