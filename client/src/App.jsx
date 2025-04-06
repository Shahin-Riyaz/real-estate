import { BrowserRouter, Routes, Route } from "react-router-dom";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import ChatBot from "./components/ChatBot";
import Project from "./pages/Project";
import Footer from "./components/Footer";
import Property from "./pages/Property";
import Listing from "./pages/Listing";
import AppointmentForm from "./components/AppointmentForm";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/property" element={<Property />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
      <ChatBot />

      <Footer />
    </BrowserRouter>
  );
}
