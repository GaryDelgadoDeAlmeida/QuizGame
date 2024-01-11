import React from "react";
import HeaderAdmin from "../../components/parts/HeaderAdmin";

export default function Home() {

    return (
        <HeaderAdmin>
            <div className={"d-grid -col-4 -t-col-2 -m-col-1"}>
                <div className={"card"}>
                    <div className={"-content"}>
                        <span>50</span>
                        <span>Users</span>
                    </div>
                </div>
                
                <div className={"card"}>
                    <div className={"-content"}>
                        <span>30</span>
                        <span>Partis</span>
                    </div>
                </div>
                
                <div className={"card"}>
                    <div className={"-content"}>
                        <span>400</span>
                        <span>Question</span>
                    </div>
                </div>
            </div>

            <div className={"page-section"}>
                <table className={"table"}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Username</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>[]</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Galaxy-Eyes</td>
                            <td>99</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </HeaderAdmin>
    )
}