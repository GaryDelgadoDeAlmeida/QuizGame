import React from "react";
import Header from "../../components/parts/Header";
import LoginForm from "../../components/forms/LoginForm";

export default function Login({admin = false}) {

    return (
        <Header>
            <div className={"page-wrapper"}>
                <div className={"page-section"}>
                    <div className={"card bg-transparent"}>
                        <div className={"-content"}>
                            <LoginForm adminConnect={admin}/>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}