import React from "react";
import { Link } from "react-router-dom";
import UserForm from "../../components/forms/UserForm";
import HeaderAdmin from "../../components/parts/HeaderAdmin";

export default function UserNew() {

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/user"}>Return</Link>

            <div className={"mt-25"}>
                <div className={"card"}>
                    <div className={"-header"}>
                        <label>New account</label>
                    </div>
                    <div className={"-content"}>
                        <UserForm />
                    </div>
                </div>
            </div>
        </HeaderAdmin>
    )
}