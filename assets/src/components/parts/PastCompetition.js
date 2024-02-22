import React from "react";

export default function PastCompetition({pastCompetition = []}) {

    return (
        <table className={"table -palette-one"}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Score</th>
                    <th>Answered Questions</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {pastCompetition.length > 0 ? (
                    pastCompetition.map((item, index) => (
                        <tr key={index}>
                            <td className={"-date"}>{formatDate(item.date)}</td>
                            <td className={"-category"}>{item.category}</td>
                            <td className={"-score"}>{item.score}</td>
                            <td className={"-nbr-questions"}>{item.gameDetails.length}</td>
                            <td className={"-actions"}>
                                <Link to={`/user/game-history/${item.id}`}>See Details</Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className={"-message"} colSpan={5}>You have played no competition for now</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}