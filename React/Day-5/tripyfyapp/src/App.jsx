import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./assets/components/Navbar.jsx";
import Footer from "./assets/components/Footer.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Help from "./pages/Help.jsx";
import Book from "./pages/Book.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/book" element={<Book />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;