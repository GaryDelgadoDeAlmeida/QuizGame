import React from "react";
import UserForm from "../../components/forms/UserForm";
import HeaderUser from "../../components/parts/HeaderUser";

export default function Profile() {

    // const { load, items: user, loading, error } = PrivateRessource(`${window.location.origin}/api/admin/profile`)

    return (
        <HeaderUser>
            <div className={"page-section"}>
                <div className={"card"}>
                    <div className={"-header txt-left"}>
                        <label>Profile</label>
                    </div>
                    <div className={"-content"}>
                        <UserForm />
                    </div>
                </div>
            </div>
        </HeaderUser>
    )
}