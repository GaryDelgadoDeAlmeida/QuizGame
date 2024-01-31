import React, { useEffect } from "react";
import HeaderUser from "../../components/parts/HeaderUser";
import Notification from "../../components/parts/Notification";
import PrivateRessource from "../../components/utils/PrivateRessource";
import { Link } from "react-router-dom";
import WidgetCard from "../../components/parts/WidgetCard";
import Badge from "../../components/parts/Badge";

export default function Home() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/general/user`)
    useEffect(() => {
        load()
    }, [])

    function tbody() {
        const content = []
        for(let $i = 0; $i < 7; $i++) {
            content.push((
                <tr key={$i}>
                    <td>17/01/2024</td>
                    <td>Education</td>
                    <td>
                        <Badge text={"TERMINATED"} />
                    </td>
                    <td>70 / 100</td>
                </tr>
            ))
        }
        
        return content
    }

    return (
        <HeaderUser>
            <div className={"page-section"}>
                {!loading && Object.keys(items.data ?? []).length > 0 ? (
                    <>
                        <div className={"d-grid -col-4 -t-col-2 -col-1"}>
                            <WidgetCard number={items.data.nbrGames} category={"Games"} />
                            <WidgetCard number={items.data.bestScore} category={"Best score"} />
                            <WidgetCard number={items.data.nbrCategories} category={"Category"} />
                            <WidgetCard number={items.data.nbrAnsweredQuestions} category={"Answered questions"} />
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
                                    {tbody()}
                                    
                                    {/* {Object.keys(items.latestGames ?? []).length > 0 ? (
                                        Object.values(items.latestGames).map((game, index) => (
                                            <tr key={index}>
                                                <td className={"-date"}>{game.created_at}</td>
                                                <td className={"-category"}>
                                                    <Badge text={game.category.label} />
                                                </td>
                                                <td className={"-status"}>{game.category.status}</td>
                                                <td className={"-score"}>{game.score}/{item.gameDetails.length}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className={"-message"} colSpan={4}>There is no game registered</td>
                                        </tr>
                                    )} */}
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