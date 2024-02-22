import React, { useEffect, useReducer, useRef, useState } from "react";
import UserForm from "../../components/forms/UserForm";
import HeaderUser from "../../components/parts/HeaderUser";
import PastGame from "../../components/parts/PastGame";
import PastGameCategory from "../../components/parts/PastGameCategory";
import PastCompetition from "../../components/parts/PastCompetition";
import PrivateRessource from "../../components/utils/PrivateRessource"
import Notification from "../../components/parts/Notification";

export default function Profile() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/user/me`)
    const [credentials, setCredentials] = useState({
        active: "history",
        links: [
            {
                value: "history",
                title: "Game history"
            },
            {
                value: "competition",
                title: "Competition"
            },
            {
                value: "category",
                title: "Category"
            }
        ]
    })

    useEffect(() => {
        load()
    }, [])

    const handleTab = (e, tab) => {
        setCredentials({
            ...credentials,
            active: tab
        })
    }

    return (
        <HeaderUser>
            <div className={"page-section"}>
                {!loading ? (
                    Object.keys(items.results ?? []).length > 0 && (
                        <div className={"profile"}>
                            <div className={"-profile-infos"}>
                                <UserForm />
                            </div>

                            {console.log(items)}

                            <div className={"-profile-tabs"}>
                                <div className={"-tab-link"}>
                                    {Object.values(credentials.links ?? []).map((item, index) => (
                                        <li key={index} className={`-item ${item.value == credentials.active ? "-active" : ""}`} onClick={(e) => handleTab(e, item.value)}>{item.title}</li>
                                    ))}
                                </div>
                                <div className={"-tab-content"}>
                                    {credentials.active == "history" && (
                                        <PastGame games={Object.values(items.results.pastGames)} />
                                    )}

                                    {credentials.active == "category" && (
                                        <PastGameCategory categories={Object.values(items.results.pastPlayedCategories)} />
                                    )}
                                    
                                    {credentials.active == "competition" && (
                                        <PastCompetition competitions={Object.values(items.results.pastCompetitions)} />
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}
            </div>
        </HeaderUser>
    )
}