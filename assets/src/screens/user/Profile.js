import React, { useReducer, useRef, useState } from "react";
import UserForm from "../../components/forms/UserForm";
import HeaderUser from "../../components/parts/HeaderUser";
import PastGame from "../../components/parts/PastGame";
import PastGameCategory from "../../components/parts/PastGameCategory";
import PastScore from "../../components/parts/PastScore";
import PastCompetition from "../../components/parts/PastCompetition";
import PrivateRessource from "../../components/utils/PrivateRessource"

export default function Profile() {

    const { load, items, loading, error } = PrivateRessource(`${window.location.origin}/api/user/me`)
    const [credentials, setCredentials] = useState({
        active: "history",
        links: [
            {
                value: "history",
                title: "Game history"
            },
            {
                value: "category",
                title: "Category"
            },
            {
                value: "scores",
                title: "Scores"
            },
            {
                value: "competition",
                title: "Competition"
            }
        ]
    })

    const handleTab = (e, tab) => {
        setCredentials({
            ...credentials,
            active: tab
        })
    }

    return (
        <HeaderUser>
            <div className={"page-section"}>
                <div className={"profile"}>
                    <div className={"-profile-infos"}>
                        <UserForm />
                    </div>

                    <div className={"-profile-tabs"}>
                        <div className={"-tab-link"}>
                            {Object.values(credentials.links ?? []).map((item, index) => (
                                <li key={index} className={`-item ${item.value == credentials.active ? "-active" : ""}`} onClick={(e) => handleTab(e, item.value)}>{item.title}</li>
                            ))}
                        </div>
                        <div className={"-tab-content"}>
                            {credentials.active == "history" && (
                                <PastGame />
                            )}

                            {credentials.active == "category" && (
                                <PastGameCategory />
                            )}
                            
                            {credentials.active == "scores" && (
                                <PastScore />
                            )}
                            
                            {credentials.active == "competition" && (
                                <PastCompetition />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </HeaderUser>
    )
}