import React from "react";
import Header from "../../components/parts/Header";
import RegisterForm from "../../components/forms/RegisterForm";

export default function Register() {

    return (
        <Header>
            <div className={"page-section"}>
                <div className={"card"}>
                    <div className={"-content"}>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </Header>
    )
}