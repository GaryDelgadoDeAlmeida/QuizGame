import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../../components/parts/Badge";
import Pagination from "../../components/parts/Pagination";
import HeaderUser from "../../components/parts/HeaderUser";
import PrivateRessource from "../../components/utils/PrivateRessource";
import { formatDate } from "../../components/utils/DomControl";

export default function History() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/games?offset=${offset}`)
    useEffect(() => {
        load()
    }, [offset])

    return (
        <HeaderUser>
            <div className={"page-section"}>
                <table className={"table -palette-one"}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Best score</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ? (
                            Object.keys(items.results ?? []).length > 0 ? (
                                Object.values(items.results).map((game, index) => (
                                    <tr key={index}>
                                        <td className={"-date"}>{formatDate(game.createdAt, "fr")}</td>
                                        <td className={"-category"}>{game.category ? game.category.label : "N/A"}</td>
                                        <td className={"-status"}>
                                            <Badge text={game.status.toUpperCase()} />
                                        </td>
                                        <td className={"-score"}>{game.score}/{game.gameDetails.length}</td>
                                        <td className={"-actions"}>
                                            <Link 
                                                className={"btn btn-blue -inline-flex"} 
                                                to={`/user/game-history/${game.id}`}
                                            >
                                                <img src={`${window.location.origin}/content/svg/eye-white.svg`} alt={""} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className={"-message"} colSpan={5}>There is no game registered</td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td className={"-message"} colSpan={5}>Loading ...</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <Pagination 
                    offset={offset}
                    setOffset={setOffset}
                    maxOffset={items.maxOffset}
                />
            </div>
        </HeaderUser>
    )
}