import React from "react";
import Header from "../../components/parts/Header";
import { Link } from "react-router-dom";
import ContactForm from "../../components/forms/ContactForm";
import NewsletterForm from "../../components/forms/NewsletterForm";

export default function Home() {

    return (
        <Header>
            <div className={"page-hero"}>
                <div className={"hero-wrapper"}>
                    <h1 className={"hero-title"}>QUIZ Game</h1>
                    <span className={"hero-subtitle"}>La plateforme qui teste vos connaissances.<br/>Pensez-vous relever le défi ?</span>
                </div>
            </div>

            <div className={"page-section -with-color-1"}>
                <div className={"page-wrapper"}>
                    <div className={"page-section-content-grid"}>
                        <div className={"-content"}>
                            <span className={"-section-suptitle"}>Quiz</span>
                            <h2 className={"-section-title"}>Améliorer vos résultats grâce à cette plateforme</h2>
                            <p className={"-section-desc"}>Tester vos connaissances et hissez-vous en haut du podium.</p>

                            <div className={"-desc-list"}>
                                <li className={"-desc-item"}>
                                    <img src={`${window.location.origin}/content/svg/<dont_know_filename>.svg`} alt={""} />
                                    <p>Tester une catégorie spécifique de vos connaissances </p>
                                </li>
                                <li className={"-desc-item"}>
                                    <img src={`${window.location.origin}/content/svg/<dont_know_filename>.svg`} alt={""} />
                                    <p>Tester une catégorie spécifique de vos connaissances </p>
                                </li>
                                <li className={"-desc-item"}>
                                    <img src={`${window.location.origin}/content/svg/<dont_know_filename>.svg`} alt={""} />
                                    <p>Tester une catégorie spécifique de vos connaissances </p>
                                </li>
                            </div>
                        </div>
                        <div className={"-image"}>
                            <img src={`${window.location.origin}/content/img/quiz.gif`} alt={""} />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={"page-section"}>
                <div className={"page-wrapper"}>
                    <div className={"page-section-content-grid"}>
                        <div className={"-image"}>
                            <img src={`${window.location.origin}/content/img/create-quiz.png`} alt={""} />
                        </div>
                        <div className={"-content"}>
                            <span className={"-section-suptitle"}>Quiz</span>
                            <h2 className={"-section-title"}>Améliorer vos résultats grâce à cette plateforme</h2>
                            <p className={"-section-desc"}>Tester vos connaissances et hissez-vous en haut du podium.</p>

                            <div className={"-desc-list"}>
                                <li className={"-desc-item"}>
                                    <img src={`${window.location.origin}/content/svg/<dont_know_filename>.svg`} alt={""} />
                                    <p>Tester une catégorie spécifique de vos connaissances </p>
                                </li>
                                <li className={"-desc-item"}>
                                    <img src={`${window.location.origin}/content/svg/<dont_know_filename>.svg`} alt={""} />
                                    <p>Tester une catégorie spécifique de vos connaissances </p>
                                </li>
                                <li className={"-desc-item"}>
                                    <img src={`${window.location.origin}/content/svg/<dont_know_filename>.svg`} alt={""} />
                                    <p>Tester une catégorie spécifique de vos connaissances </p>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"page-section -with-color-1"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Défiez le monde et obtenez le podium</h2>

                    <div className={"page-section-content"}>
                        <table className={"best-score"}>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src={`${window.location.origin}/content/svg/medal-gold-winner.svg`} alt={""} />
                                    </td>
                                    <td>[ ]</td>
                                    <td>100 points</td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src={`${window.location.origin}/content/svg/medal-silver-badge.svg`} alt={""} />
                                    </td>
                                    <td>Galaxy-Eyes</td>
                                    <td>100 points</td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src={`${window.location.origin}/content/svg/medal-bronze-price.svg`} alt={""} />
                                    </td>
                                    <td>Username</td>
                                    <td>100 points</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className={"-classment"}>4</span>
                                    </td>
                                    <td>Username</td>
                                    <td>100 points</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className={"-classment"}>5</span>
                                    </td>
                                    <td>Username</td>
                                    <td>100 points</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div className={"page-section -with-color-3"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Inscrivez-vous à la newsletter</h2>

                    <div className={"page-section-content"}>
                        <NewsletterForm />
                    </div>
                </div>
            </div>
            
            <div className={"page-section"} id={"contact"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Vous avez une question ? Contacter-nous</h2>

                    <div className={"page-section-content"}>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </Header>
    )
}