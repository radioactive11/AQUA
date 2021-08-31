import React from "react";
import 'react-calendar/dist/Calendar.css';
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import UserProvider from "./contexts/User/UserProvider";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
    return (
        <Router>
            <UserProvider>
                <Switch>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <PrivateRoute
                        component={StudentDashboard}
                        path="/student"
                    />
                    <PrivateRoute
                        component={TeacherDashboard}
                        path="/teacher"
                    />
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                </Switch>
            </UserProvider>
        </Router>
    );
};

export default App;
