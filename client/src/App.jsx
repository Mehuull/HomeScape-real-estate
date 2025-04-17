import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Properties from "./components/Properties/Properties";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";
import CreateListing from "./components/CreateListing/CreateListing.jsx";
import ListingDetails from "./components/ListingDetails/ListingDetails.jsx";
import Profile from "./components/Profile/Profile.jsx";
import MyListing from "./components/MyListing/mylisting.jsx";
import Footer from "./components/footer/footer.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/createListing" element={<CreateListing />} />
            <Route path="/listing/:_id" element={<ListingDetails />} />
            <Route path="/:_id/profile" element={<Profile />} />
            <Route path="/:_id/mylisting" element={<MyListing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
