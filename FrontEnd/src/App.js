import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./AppPath.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DocumentRouter from "./pages/Document/DocumentRouter";
import TQF2 from "./pages/Document/TQF2/TQF2";
import shortTQF2 from "./pages/Document/TQF2/ShortTQF2";
import PersonnelRouter from "./pages/Personnel/PersonnelRouter";
import Home from "./pages/Home/Home";
import Curriculum from "./pages/Curriculum/Curriculum";
import CourseRouter from "./pages/Course/CourseRouter";
import Student from "./pages/Student/Student";
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import ProfessorRouter from "./pages/Professor/ProfessorRouter";
import Create from "./pages/CreateAndUploadDoc/Create";
import Upload from "./pages/CreateAndUploadDoc/Upload";
import WeekSNote from "./pages/WeekSNote/WeekSNote";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin/index";
import ReactAdmin from "./pages/Admin/ReactAdmin";

import Modal from "react-modal";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AuthContextProvider,
  SelectContextProvider,
  ProfileContextProvider,
} from "./context/index";

Modal.setAppElement("#root");
function MyApp() {
  const currentRoute = window.location.pathname
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        transition={Slide}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        {currentRoute !== '/reactadmin' &&  <Navbar />}

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/document" component={DocumentRouter} />
          <Route path="/personnel" component={PersonnelRouter} />
          <Route path="/curriculum" component={Curriculum} />
          <Route path="/course" component={CourseRouter} />
          {/* <Route path='/student' component={Student} /> */}
          {/* <Route path='/contact' component={Contact} /> */}
          <Route path="/professor" component={ProfessorRouter} />
          {/* <Route path='/weeksnote' component={WeekSNote} /> */}
          <Route path="/profile" component={Profile} />
          <Route path="/admin" component={Admin} />
          <Route path="/tqf2" component={TQF2} />
          <Route path="/shortTQF2" component={shortTQF2} />
          {/* <Route path='/professor-createdoc' component={Create} />
            <Route path='/professor-uploaddoc' component={Upload} /> */}
          <Route path="/reactadmin" component={ReactAdmin} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

const App = () => (
  <AuthContextProvider>
    <SelectContextProvider>
      <ProfileContextProvider>
        <MyApp />
      </ProfileContextProvider>
    </SelectContextProvider>
  </AuthContextProvider>
);

export default App;
