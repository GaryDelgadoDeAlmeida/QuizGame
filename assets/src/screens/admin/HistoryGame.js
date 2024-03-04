import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "../../components/parts/Badge";
import Pagination from "../../components/parts/Pagination";
import HeaderAdmin from "../../components/parts/HeaderAdmin";
import PrivateRessource from "../../components/utils/PrivateRessource";

export default function HistoryGame() {

    const [offset, setOffset] = useState(1)
    const { loading, items: games, load, error } = PrivateRessource(`${window.location.origin}/api/games?offset=${offset}`)
    useEffect(() => {
        load()
    }, [offset])

    const handlePagination = (e) => {
        console.log("Hi handlePagination")
    }

    const handleRemove = (e) => {
        console.log("HI handleRemove")
    }

    return (
        <HeaderAdmin>
            <table className={"table -palette-one"}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {!loading ? (
                        Object.keys(games.data ?? []).length > 0 ? (
                            Object.values(games.data).map((game, index) => (
                                <tr key={index}>
                                    <td>{game.created_at}</td>
                                    <td>{game.user.email}</td>
                                    <td>{game.score}</td>
                                    <td>
                                        <Badge text={game.status} />
                                    </td>
                                    <td className={"-actions"}>
                                        <Link className={"btn btn-blue -inline-flex"} to={"/admin/game/1"}>
                                            <img src={`${window.location.origin}/content/svg/eye.svg`} alt={""} />
                                        </Link>
                                        <button 
                                            type={"button"}
                                            className={"btn btn-red -inline-flex"}
                                            data-gameid={1}
                                            onClick={(e) => handleRemove(e)}
                                        >
                                            <img src={`${window.location.origin}/content/svg/trash.svg`} alt={""} />
                                        </button>
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
                maxOffset={games.maxOffset}
            />
        </HeaderAdmin>
    )
}