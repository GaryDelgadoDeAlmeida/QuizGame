import React, { useEffect, useState } from "react";
import Badge from "../../components/parts/Badge";
import HeaderUser from "../../components/parts/HeaderUser";
import PrivateRessource from "../../components/utils/PrivateRessource";

export default function BestScore() {

    const [offset, setOffset] = useState(1)
    const { loading, items, load, error } = PrivateRessource(`${window.location.origin}/api/games?offset=${offset}`)
    useEffect(() => {
        load()
    }, [offset])

    const handlePagination = (e, newOffset) => {
        setOffset(newOffset)
    }

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
                            Object.keys(items.data ?? []).length > 0 ? (
                                Object.values(items.data).map((game, index) => (
                                    <tr key={index}>
                                        <td className={"-date"}>{game.created_at}</td>
                                        <td className={"-category"}>{game.category.label}</td>
                                        <td className={"-category"}>
                                            <Badge text={game.category.label} />
                                        </td>
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

                <div className={"pagination"}>
                    {offset - 1 > 0 && (
                        <>
                            <button className={"item"} onClick={(e) => handlePagination(e, 1)}>&laquo;</button>
                            <button className={"item"} onClick={(e) => handlePagination(e, offset - 1)}>1</button>
                        </>
                    )}

                    <button className={"item current-page"}>{offset}</button>
                    
                    {offset + 1 <= items.maxOffset && (
                        <>
                            <button className={"item"} onClick={(e) => handlePagination(e, offset + 1)}>3</button>
                            <button className={"item"} onClick={(e) => handlePagination(e, categories.maxOffset)}>&raquo;</button>
                        </>
                    )}
                </div>
            </div>
        </HeaderUser>
    )
}