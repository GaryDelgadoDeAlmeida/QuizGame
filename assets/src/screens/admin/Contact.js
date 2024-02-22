import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import Notification from "../../components/parts/Notification";
import PrivateRessource from "../../components/utils/PrivateRessource";
import { findParent } from "../../components/utils/DomControl"
import axios from "axios";
import Pagination from "../../components/parts/Pagination";

export default function Contact() {

    const [offset, setOffset] = useState(1)
    const {loading, items: contacts, load, error} = PrivateRessource(`${window.location.origin}/api/contacts?offset=${offset}`)

    useEffect(() => {
        load()
    }, [offset])

    const handlePagination = (e, newOffset) => {
        setOffset(newOffset)
    }

    const handleRemove = (e, contactID) => {
        e.preventDefault()
        const currentTarget = e.currentTarget
        const parent = findParent(currentTarget, "-item")

        axios
            .delete(`${window.location.origin}/api/contact/${contactID}`, {
                headers: {
                    "Content-Length": "application/json",
                    "Accept": "application/json+ld"
                }
            })
            .then((response) => {
                parent.remove()

                let $tableContent = document.getElementById("contact-table-body")
                if($tableContent.children.length == 0) {
                    $tableContent.innerHTML = `
                        <tr>
                            <td colspan="4">There is no contact</td>
                        </tr>
                    `
                }
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please, retry later."
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                }

                alert(errorMessage)
            })
        ;
    }

    const handleRemoveAll = (e) => {
        e.preventDefault()

        axios
            .delete(`${window.location.origin}/api/contacts/remove`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json+ld"
                }
            })
            .then((response) => {
                document.getElementById("contact-table-body").innerHTML = `
                    <tr>
                        <td colspan="4">There is no contact</td>
                    </tr>
                `
            })
            .catch((error) => {
                let errorMessage = "An error has been encountered. Please, retry later."
                if(error.response.data.message) {
                    errorMessage = error.response.data.message
                }

                alert(errorMessage)
            })
        ;
    }

    return (
        <HeaderAdmin>
            {!loading ? (
                <>
                    {Object.keys(contacts.results ?? []).length > 0 && (
                        <button className={"btn btn-red"} onClick={(e) => handleRemoveAll(e)}>Remove all</button>
                    )}
                    
                    <div className={"mt-25"}>
                        <table className={"table"}>
                            <thead>
                                <tr>
                                    <th>Subject</th>
                                    <th>Fullname</th>
                                    <th>Message</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id={"contact-table-body"}>
                                {Object.keys(contacts.results ?? []).length > 0 ? (
                                    Object.values(contacts.results).map((item, index) => (
                                        <tr className={"-item"} key={index}>
                                            <td>{item.subject}</td>
                                            <td>{item.firstname} {item.lastname}</td>
                                            <td>{item.message}</td>
                                            <td>
                                                <Link className={"btn -inline-flex"} to={`/admin/contact/${item.id}`}>
                                                    <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                                                </Link>
                                                
                                                <button className={"btn btn-red -inline-flex"} onClick={(e) => handleRemove(e, item.id)}>
                                                    <img src={`${window.location.origin}/content/svg/trash.svg`} alt={""} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className={"-message"} colSpan={4}>There is no contact</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <Pagination 
                            offset={offset}
                            maxOffset={contacts.maxOffset}
                            setOffset={setOffset}
                        />
                    </div>
                </>
            ) : (
                <Notification classname={"information"} message={"Loading ..."} />
            )}
        </HeaderAdmin>
    )
}