import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Signup from "./screens/Auth/Signup";
import Login from "./screens/Auth/Login";
import Logout from "./components/Logout";
import Dashboard from "./screens/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import GeneralContext from "./context/GeneralContext";
import DefaultLayout from "./defaultLayout/DefaultLayout";
import UpdateProfile from "./screens/Auth/UpdateProfile";
import ParentBookingScreen from "./screens/ParentSection/ParentBookingScreen";
import BabySitterDetailScreen from "./screens/BabySitterSection/BabySitterDetailScreen";
import ParentNewProfileScreen from "./screens/ParentSection/ParentNewProfileScreen";
import BabySitterNewProfileScreen from "./screens/BabySitterSection/BabySitterNewProfileScreen";
import AdminScreen from "./screens/Admin/AdminScreen";
import { useNavigate } from "react-router-dom";
import DatePicker from "./components/DatePicker";
import ForgotPassword from "./screens/Auth/ForgotPassword";
import EditParentScreen from "./screens/Admin/EditParentScreen";
import EditBabySitterScreen from "./screens/Admin/EditBabySitterScreen";
import ParentEditBioScreen from "./screens/ParentSection/ParentEditBioScreen";
import BabySitterEditBioScreen from "./screens/BabySitterSection/BabySitterEditBioScreen";
import EditBioScreen from "./screens/EditBioScreen";
// import Socket from "./components/Socket"; // for testing only

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  // useEffect to route back to dashboard when browser back button or url is changed to login page
  // useEffect(() => {
  //   //if user is not admin, will route back to dashboard
  //   const user = JSON.parse(localStorage.getItem("currentUser"));
  //   if (user) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  return (
    <div className="App">
      <GeneralContext.Provider
        value={{
          userContext: [
            name,
            setName,
            email,
            setEmail,
            password,
            setPassword,
            passwordConfirm,
            setPasswordConfirm,
            role,
            setRole,
          ],
        }}
      >
        <DefaultLayout>
          <Container
            // className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh", marginTop: "70px" }}
          >
            <div
            // className="w-100"
            // style={{ maxWidth: "600px" }}
            >
              <Routes>
                <Route path="/signup" element={<Signup />} />

                <Route path="/" element={<Login />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route
                  path="/parent/new-profile"
                  element={
                    <PrivateRoute>
                      <ParentNewProfileScreen />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/babysitter/new-profile"
                  element={
                    <PrivateRoute>
                      <BabySitterNewProfileScreen />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/update-profile"
                  element={
                    <PrivateRoute>
                      <UpdateProfile />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/book/:babysittername/:babysitterid/:fromdate/:todate"
                  element={
                    <PrivateRoute>
                      <ParentBookingScreen />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/detail/:parentname/:parentid"
                  element={
                    <PrivateRoute>
                      <BabySitterDetailScreen />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AdminScreen />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/edit/parent/:parentid"
                  element={
                    <PrivateRoute>
                      <EditParentScreen />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit/babysitter/:babysitterid"
                  element={
                    <PrivateRoute>
                      <EditBabySitterScreen />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/editbioscreen"
                  element={
                    <PrivateRoute>
                      <EditBioScreen />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/datepicker"
                  element={
                    <PrivateRoute>
                      <DatePicker />
                    </PrivateRoute>
                  }
                />
                {/* <Route
                  path="/socket"
                  element={
                    <PrivateRoute>
                      <Socket />
                    </PrivateRoute>
                  }
                /> */}
              </Routes>
            </div>
          </Container>
        </DefaultLayout>
      </GeneralContext.Provider>
    </div>
  );
}

export default App;
