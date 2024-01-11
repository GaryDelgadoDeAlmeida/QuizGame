import React from "react";
import Header from "../../components/parts/Header";
import { Link } from "react-router-dom";
import ContactForm from "../../components/forms/ContactForm";

export default function Home() {

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"hero-wrapper"}>
                    <h1 className={"hero-title"}>Quiz</h1>
                    
                    <Link to={"/login"} className={"btn btn-radient-blue -inline-flex btn-rounded"}>
                        <span>Start</span>
                        <img src={`${window.location.origin}/content/svg/arrow-white.svg`} alt={""} />
                    </Link>
                </div>
                <div className={"hero-bottom"}></div>
            </div>
            
            <div id={"about"} className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>About</h2>

                    <div className={"section-content txt-center"}>
                        <p>Lorem Ipsum est un texte d'espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.</p>
                    </div>
                </div>
            </div>
            
            <div id={"best-scores"} className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Top Player</h2>

                    <div className={"section-content"}>
                        <table className={"table w-500px"}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>[ ]</td>
                                    <td>100</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Galaxy-Eyes</td>
                                    <td>99</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Username</td>
                                    <td>99</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Developer</td>
                                    <td>98</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Player920</td>
                                    <td>97</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Jack</td>
                                    <td>96</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>Jack</td>
                                    <td>96</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Jack</td>
                                    <td>96</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>Jack</td>
                                    <td>96</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>Jack</td>
                                    <td>96</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div id={"contact"} className={"page-section"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Contact</h2>

                    <div className={"section-content"}>
                        <div className={"card bg-transparent"}>
                            <div className={"-content"}>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    )
}