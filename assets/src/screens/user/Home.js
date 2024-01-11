import React, { useEffect } from "react";
import HeaderUser from "../../components/parts/HeaderUser";
import Notification from "../../components/parts/Notification";
import PrivateRessource from "../../components/utils/PrivateRessource";
import { Link } from "react-router-dom";

export default function Home() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/general/user`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderUser>
            <div className={"page-section"}>
                {!loading ? (
                    <>
                        <div className={"d-grid -col-4 -t-col-2 -col-1"}>
                            <div className={"card"}>
                                <div className={"-content"}>
                                    <div className={""}>
                                        <span>{items.nbrGames}</span>
                                        <span>Parties</span>
                                    </div>
                                </div>
                            </div>
                            <div className={"card"}>
                                <div className={"-content"}>
                                    <div className={""}>
                                        <span>{items.bestScore}</span>
                                        <span>Best score</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"mt-25"}>
                            <table className={"table"}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Category</th>
                                        <th>Best score</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(items.latestGames ?? []).length > 0 ? (
                                        Object.values(items.latestGames).map((game, index) => (
                                            <tr key={index}>
                                                <td className={"-date"}>{game.created_at}</td>
                                                <td className={"-category"}>{game.category.label}</td>
                                                <td className={"-score"}>{game.score}/{item.gameDetails.length}</td>
                                                <td className={"-actions"}>
                                                    <Link 
                                                        className={"btn btn-blue -inline-flex"} 
                                                        to={"/user/game/" + game.id}
                                                    >
                                                        <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className={"-message"} colSpan={3}>There is no game registered</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}
            </div>
        </HeaderUser>
    )
}