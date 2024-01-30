import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { findParent } from "../../components/utils/DomControl";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import Notification from "../../components/parts/Notification";
import PrivateRessource from "../../components/utils/PrivateRessource";

export default function Users() {

    const [maxOffset, setMaxOffset] = useState(1)
    const [offset, setOffset] = useState(1)
    const { loading, items: users, load, error } = PrivateRessource(`${window.location.origin}/api/users?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handlePagination = (e) => {
        let newOffset = parseInt(e.target.innerHTML)
        if(newOffset > 0) {
            setOffset(parseInt(e.target.innerHTML))
        }
    }

    const handleRemove = (e) => {
        let rowItem = findParent(e.currentTarget, "-row-item")
        if(!rowItem) {
            alert("The parent couldn't be found")
            return
        }

        let userID = e.currentTarget.getAttribute("data-userid")
        if(isNaN(userID)) {
            alert("An error has been found with the user identification")
            return
        }

        axios
            .delete(`${window.location.origin}/api/user/${userID}/remove`)
            .then((response) => {
                if(response.status == 202) {
                    rowItem.remove()
                }
            })
            .catch((error) => {
                let errorMessage = "The user couldn't be removed. Please, retry later"
                if(error.response.detail) {
                    errorMessage = error.response.detail
                }
                
                alert(errorMessage)
            })
        ;
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/user/new"}>Add a account</Link>

            {!loading ? (
                <>
                    <div className={"mt-25"}>
                        <table className={"table -palette-one"}>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(users.results ?? []).length > 0 ? (
                                    Object.values(users.results).map((user, index) => (
                                        <tr className={"-row-item"} key={index}>
                                            <td className={"-username"}>{user.email}</td>
                                            <td className={"-role"}>{user.roles[0]}</td>
                                            <td className={"-actions"}>
                                                <Link 
                                                    className={"btn btn-orange -inline-flex"} 
                                                    to={"/admin/user/" + user.id}
                                                >
                                                    <img src={`${window.location.origin}/content/svg/pencil-white.svg`} alt={""} />
                                                </Link>
                                                
                                                <button 
                                                    className={"btn btn-red -inline-flex"} 
                                                    data-userid={user.id}
                                                    onClick={(e) => handleRemove(e)}
                                                >
                                                    <img src={`${window.location.origin}/content/svg/trash-white.svg`} alt={""} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className={"-message"} colSpan={3}>No users registered</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {offset > 0 && offset <= users.maxOffset && users.maxOffset > 1 && (
                        <div className={"pagination"}>
                            {offset - 1 > 0 && (
                                <button className={"item"} onClick={(e) => handlePagination(e)}>{offset - 1}</button>
                            )}
                            
                            <button className={"item current-page"}>{offset}</button>
                            
                            {offset + 1 <= maxOffset && (
                                <button className={"item"} onClick={(e) => handlePagination(e)}>{offset + 1}</button>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <Notification classname={"information"} message={"Loading ..."} />
            )}
        </HeaderAdmin>
    )
}