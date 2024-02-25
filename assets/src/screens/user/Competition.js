import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderUser from "../../components/parts/HeaderUser";
import Notification from "../../components/parts/Notification";
import PrivateRessources from "../../components/utils/PrivateRessource";

export default function Competition() {

    const navigation = useNavigate()
    const { loading, items, load, error } = PrivateRessources(`${window.location.origin}/api/user`)

    const handleStart = () => {
        navigation("/user/game/start", {
            state: {
                mode: "challenge",
                // category: "science",
                // nbr_questions: 10
            }
        })
        return
    }

    return (
        <HeaderUser>
            <div className={"page-section"}>
                <Notification classname={"information"} message={"Page under construction"} />

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
                            <tr>
                                <td className={"-date"}>12/02/2024</td>
                                <td className={"-nbr-questions"}>10</td>
                                <td className={"-score"}>100</td>
                                <td className={"-actions"}>
                                    <Link className={"btn btn-palette-four -inline-flex"} to={"/user/game/1"}>
                                        <span>See more</span>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </HeaderUser>
    )
}