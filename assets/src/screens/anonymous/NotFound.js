import React from "react";
import Header from "../../components/parts/Header";
import { Link } from "react-router-dom";

export default function NotFound() {

    return (
        <Header>
            <div className={"page-wrapper"}>
                <div className={"page-section"}>
                    <h1 className={"page-title txt-left"}>Not Found</h1>
                    <p>La page que vous recherchez n'existe pas</p>
                    <Link className={"btn btn-blue"} to={"/"}>Home</Link>
                </div>
            </div>
        </Header>
    )
}