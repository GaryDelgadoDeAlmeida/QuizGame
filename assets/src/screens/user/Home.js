import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Badge from "../../components/parts/Badge";
import HeaderUser from "../../components/parts/HeaderUser";
import WidgetCard from "../../components/parts/WidgetCard";
import Notification from "../../components/parts/Notification";
import PrivateRessource from "../../components/utils/PrivateRessource";
import { formatDate } from "../../components/utils/DomControl";

export default function Home() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/general/user`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderUser>
            <div className={"page-section"}>
                {!loading && Object.keys(items.results ?? []).length > 0 ? (
                    <>
                        <div className={"d-grid -col-4 -t-col-2 -col-1"}>
                            <WidgetCard number={items.results.nbrGames} category={"Games"} />
                            <WidgetCard number={items.results.bestScore} category={"Best score"} />
                            <WidgetCard number={items.results.nbrCategories} category={"Category"} />
                            <WidgetCard number={items.results.nbrAnsweredQuestions} category={"Answered questions"} />
                        </div>

                        <div className={"mt-25"}>
                            <table className={"table -palette-one"}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Best score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(items.results ? items.results.latestGames : []).length > 0 ? (
                                        Object.values(items.results.latestGames).map((game, index) => (
                                            <tr key={index}>
                                                <td className={"-date"}>{formatDate(game.createdAt, "fr")}</td>
                                                <td className={"-category"}>{game.category ? game.category.label : "N/A"}</td>
                                                <td className={"-status"}>
                                                    <Badge text={game.status.toUpperCase()} />
                                                </td>
                                                <td className={"-score"}>{game.score}/{game.gameDetails.length}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className={"-message"} colSpan={4}>There is no game registered</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className={"mt-15 txt-right"}>
                                <Link className={"btn btn-radient-four btn-rounded btn-space -inline-flex"} to={"/user/best-score"}>
                                    <span>Voir plus</span>
                                    <img src={`${window.location.origin}/content/svg/arrow-right-white.svg`} alt={""} />
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <Notification classname={"information"} message={"Loading ..."} />
                )}
            </div>
        </HeaderUser>
    )
}