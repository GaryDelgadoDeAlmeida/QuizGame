import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import PrivateRessource from "../../components/utils/PrivateRessource";
import axios from "axios";
import { findParent } from "../../components/utils/DomControl";

export default function Users() {

    const [maxOffset, setMaxOffset] = useState(1)
    const [offset, setOffset] = useState(1)
    const { loading, items: users, load, error } = PrivateRessource(`${window.location.origin}/api/users?offset=${offset}`)

    useEffect(() => {
        load()
    }, [])

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
                rowItem.remove()
            })
            .catch((error) => {
                alert("The user couldn't be removed. Please, retry later")
            })
        ;
    }

    return (
        <HeaderAdmin>
            <Link className={"btn btn-blue"} to={"/admin/user/new"}>Add a account</Link>

            <div className={"mt-25"}>
                <table className={"table"}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? (
                            Object.keys(users).length > 0 ? (
                                Object.values(users.data).map((user, index) => (
                                    <tr className={"-row-item"} key={index}>
                                        <td className={"-username"}>{user.email}</td>
                                        <td className={"-role"}>{user.roles[0]}</td>
                                        <td className={"-actions"}>
                                            <Link 
                                                className={"btn btn-orange -inline-flex"} 
                                                to={"/admin/user/" + user.id}
                                            >
                                                <img src={`${window.location.origin}/content/svg/pencil.svg`} alt={""} />
                                            </Link>
                                            
                                            <button 
                                                className={"btn btn-red -inline-flex"} 
                                                data-userid={user.id}
                                                onClick={(e) => handleRemove(e)}
                                            >
                                                <img src={`${window.location.origin}/content/svg/trash.svg`} alt={""} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className={"-message"} colSpan={3}>No users registered</td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td className={"-message"} colSpan={3}>Loading ...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className={"pagination"}>
                {offset - 1 > 0 && (
                    <div className={"item"}>
                        <button onClick={(e) => handlePagination(e)}>{offset - 1}</button>
                    </div>
                )}
                
                <div className={"item current-page"}>
                    <span>{offset}</span>
                </div>
                
                {offset + 1 <= maxOffset && (
                    <div className={"item"}>
                        <button onClick={(e) => handlePagination(e)}>{offset + 1}</button>
                    </div>
                )}
            </div>
        </HeaderAdmin>
    )
}