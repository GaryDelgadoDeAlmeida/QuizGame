import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

// Anonymous
import Home from "./anonymous/Home";
import Login from "./anonymous/Login";
import Register from "./anonymous/Register";
import NotFound from "./anonymous/NotFound";

// User
import UserHome from "./user/Home";
import UserProfile from "./user/Profile";
import UserGame from "./user/Game";
import UserBestScore from "./user/BestScore";

// User
import AdminHome from "./admin/Home";
import AdminProfile from "./admin/Profile";
import AdminUsers from "./admin/Users";
import AdminUserNew from "./admin/UserNew";
import AdminUserEdit from "./admin/UserEdit";
import AdminQuiz from "./admin/Quiz";
import AdminQuizForm from "./admin/QuizForm";
import AdminHistoryGame from "./admin/HistoryGame";

export default function RouteConfig() {

    const [token, setToken] = useState(localStorage.getItem("token"))

    return (
        <>
            <Routes>
                {/* Anonymous */}
                <Route path={"/"} element={<Home />} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/login-admin"} element={<Login admin={true} />} />

                {/* User */}
                <Route path={"/user"} element={<UserHome />} />
                <Route path={"/user/profile"} element={<UserProfile />} />
                <Route path={"/user/game"} element={<UserGame />} />
                <Route path={"/user/best-score"} element={<UserBestScore />} />
                
                {/* Admin */}
                <Route path={"/admin"} element={<AdminHome />} />
                <Route path={"/admin/profile"} element={<AdminProfile />} />
                <Route path={"/admin/user"} element={<AdminUsers />} />
                <Route path={"/admin/user/new"} element={<AdminUserNew />} />
                <Route path={"/admin/user/:userID"} element={<AdminUserEdit />} />
                <Route path={"/admin/history-games"} element={<AdminHistoryGame />} />
                <Route path={"/admin/quiz"} element={<AdminQuiz />} />
                <Route path={"/admin/quiz/:quizID"} element={<AdminQuizForm />} />

                {/* Common */}
                <Route path={"*"} element={<NotFound />} />
            </Routes>
        </>
    )
}