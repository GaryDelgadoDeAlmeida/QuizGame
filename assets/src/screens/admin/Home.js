import React, { useEffect } from "react";
import WidgetCard from "../../components/parts/WidgetCard";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import Notification from "../../components/parts/Notification";
import { formatDate } from "../../components/utils/DomControl";
import PrivateResources from "../../components/utils/PrivateRessource";

export default function Home() {

    const {loading, items, load, error} = PrivateResources(`${window.location.origin}/api/general/admin`)

    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderAdmin>
            {!loading ? (
                Object.keys(items.results ?? []).length > 0 ? (
                    <>
                        <div className={"d-grid -col-4 -t-col-2 -m-col-1"}>
                            <WidgetCard number={items.results.nbrUsers ?? 0} category={"Users"} />
                            <WidgetCard number={items.results.nbrParties ?? 0} category={"Parties"} />
                            <WidgetCard number={items.results.nbrQuestions ?? 0} category={"Question"} />
                        </div>

                        <div className={"page-section"}>
                            <table className={"table -palette-one"}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th className={"txt-left"}>Username</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.values(items.results.bestScores).length > 0 ? (
                                        Object.values(items.results.bestScores).map((item, index) => (
                                            <tr key={index}>
                                                <td className={"-date"}>{formatDate(item.createdAt)}</td>
                                                <td className={"-username txt-left"}>{item.user.email}</td>
                                                <td className={"-score"}>{item.score}</td>
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
                    <Notification classname={"danger"} message={"An error has been encountered"} />
                )
            ) : (
                <Notification classname={"information"} message={"Loading ..."} />
            )}
        </HeaderAdmin>
    )
}