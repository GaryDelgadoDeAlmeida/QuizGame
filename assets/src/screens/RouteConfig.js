import React from "react";
import { Route, Routes } from "react-router-dom";

// Anonymous
import Home from "./anonymous/Home";
import Login from "./anonymous/Login";
import Register from "./anonymous/Register";
import NotFound from "./anonymous/NotFound";

// User
import UserHome from "./user/Home";
import UserProfile from "./user/Profile";
import UserBestScore from "./user/BestScore";
import UserGame from "./user/Game";
import UserCompetition from "./user/Competition";

// User
import AdminHome from "./admin/Home";
import AdminProfile from "./admin/Profile";
import AdminUsers from "./admin/Users";
import AdminUserNew from "./admin/UserNew";
import AdminUserEdit from "./admin/UserEdit";
import AdminCategory from "./admin/Category";
import AdminCategoryDetail from "./admin/CategoryDetail";
import AdminQuiz from "./admin/Quiz";
import AdminQuizCreate from "./admin/QuizCreate";
import AdminQuizForm from "./admin/QuizForm";
import AdminHistoryGame from "./admin/HistoryGame";
import AdminContact from "./admin/Contact";
import AdminContactDetail from "./admin/ContactDetail";

export default function RouteConfig() {

    return (
        <>
            <Routes>
                {/* Anonymous */}
                <Route path={"/"} element={<Home />} />
                <Route path={"/policy"} element={"Page under construction"} />
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/admin-login"} element={<Login admin={true} />} />

                {/* User */}
                <Route path={"/user"} element={<UserHome />} />
                <Route path={"/user/profile"} element={<UserProfile />} />
                <Route path={"/user/best-score"} element={<UserBestScore />} />
                <Route path={"/user/game"} element={<UserGame />} />
                <Route path={"/user/competition"} element={<UserCompetition />} />
                
                {/* Admin */}
                <Route path={"/admin"} element={<AdminHome />} />
                <Route path={"/admin/profile"} element={<AdminProfile />} />
                <Route path={"/admin/user"} element={<AdminUsers />} />
                <Route path={"/admin/user/new"} element={<AdminUserNew />} />
                <Route path={"/admin/user/:userID"} element={<AdminUserEdit />} />
                <Route path={"/admin/history-games"} element={<AdminHistoryGame />} />
                <Route path={"/admin/category"} element={<AdminCategory />} />
                <Route path={"/admin/category/:categoryID"} element={<AdminCategoryDetail />} />
                <Route path={"/admin/quiz"} element={<AdminQuiz />} />
                <Route path={"/admin/quiz/create"} element={<AdminQuizCreate />} />
                <Route path={"/admin/quiz/:quizID"} element={<AdminQuizForm />} />
                <Route path={"/admin/contact"} element={<AdminContact />} />
                <Route path={"/admin/contact/:contactID"} element={<AdminContactDetail />} />

                {/* Common */}
                <Route path={"*"} element={<NotFound />} />
            </Routes>
        </>
    )
}