import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderUser from "../../components/parts/HeaderUser";
import { formatDate } from "../../components/utils/DomControl";
import PrivateRessources from "../../components/utils/PrivateRessource";

export default function Competition() {

    const navigation = useNavigate()
    const { loading, items, load, error } = PrivateRessources(`${window.location.origin}/api/user/me/games?mode=challenge`)

    useEffect(() => {
        load()
    }, [])

    const handleStart = () => {
        navigation("/user/game/start", {
            state: {
                mode: "challenge",
            }
        })
        return
    }

    return (
        <HeaderUser>
            <div className={"page-section"}>
                <div className={"txt-center"}>
                    <button 
                        type={"button"} 
                        className={"btn btn-start btn-radient-four h-40px"} 
                        onClick={handleStart}
                    >Start the challenge</button>
                </div>

                <div className={"mt-25"}>
                    <table className={"table -palette-one"}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Nbr questions</th>
                                <th>Score</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && Object.keys(items.results ?? []).length > 0 ? (
                                Object.values(items.values).map((item, index) => (
                                    <tr key={index}>
                                        <td className={"-date"}>{formatDate(item.createdAt)}</td>
                                        <td className={"-nbr-questions"}>{item.gameDetails.length}</td>
                                        <td className={"-score"}>{item.score}</td>
                                        <td className={"-actions"}>
                                            <Link className={"btn btn-palette-four -inline-flex"} to={`/user/game-history/${item.id}`}>
                                                <img src={`${window.location.origin}/content/svg/eye-white.svg`} alt={""} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>You still didn't started a challenge. Why don't start one now ?</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </HeaderUser>
    )
}