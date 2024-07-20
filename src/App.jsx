import "./App.css";

//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Header from "./components/Header";
import Form from "./components/Form";
import ListResumes from "./components/ListResumes";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={5000} />
        <Header />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/resumes" element={<ListResumes />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
