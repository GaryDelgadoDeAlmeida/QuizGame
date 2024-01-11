import React, { useEffect } from "react";
import HeaderUser from "../../components/parts/HeaderUser";
import PrivateRessource from "../../components/utils/PrivateRessource"

export default function BestScore() {

    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/games`)
    useEffect(() => {
        load()
    }, [])

    return (
        <HeaderUser>
            <div className={"page-section"}>
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
                        {!loading ? (
                            Object.keys(items.data ?? []).length > 0 ? (
                                Object.values(items.data).map((game, index) => (
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
                                    <td className={"-message"} colSpan={4}>There is no game registered</td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td className={"-message"} colSpan={4}>Loading ...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </HeaderUser>
    )
}