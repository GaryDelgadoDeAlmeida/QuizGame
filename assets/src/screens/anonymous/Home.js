import React, { useEffect } from "react";
import Header from "../../components/parts/Header";
import Notification from "../../components/parts/Notification";
import BestScoreCard from "../../components/parts/BestScoreCard";
import ContactForm from "../../components/forms/ContactForm";
import NewsletterForm from "../../components/forms/NewsletterForm";
import ProtectedRessource from "../../components/utils/ProtectedRessource";

export default function Home() {

    const { loading, items, load, error } = ProtectedRessource(`${window.location.origin}/api/general`)
    useEffect(() => {
        load()
    }, [])

    return (
        <Header>
            {/* Hero section */}
            <div className={"page-hero"}>
                <div className={"hero-wrapper"}>
                    <h1 className={"hero-title"}>QUIZ Game</h1>
                    <span className={"hero-subtitle"}>La plateforme qui teste vos connaissances.<br/>Pensez-vous relever le défi ?</span>
                </div>
            </div>

            {/* Service section */}
            <div className={"page-section -with-color-1"} id={"service"}>
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
            
            {/* Service section 2 */}
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

            {/* Best score section */}
            <div className={"page-section -with-color-1"} id={"best-scores"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Défiez le monde et obtenez le podium</h2>

                    <div className={"page-section-content mw-800px m-auto"}>

                        {!loading && (
                            Object.keys(items.results ? items.results.bestScore : []).length > 0 ? (
                                Object.values(items.results.bestScore).map((item, index) => (
                                    <BestScoreCard 
                                        key={index} 
                                        position={index + 1} 
                                        username={item.user.username}
                                        score={item.score}
                                    />
                                ))
                            ) : (
                                <Notification 
                                    classname={"information"} 
                                    message={"Il n'y a aucune partie enregistrée à afficher"} 
                                />
                            )
                        )}
                        
                        {/* <div className={"best-score-card -first"}>
                            <div className={"m-tb-auto"}>
                                <img src={`${window.location.origin}/content/svg/medal-gold-winner.svg`} alt={""} />
                            </div>
                            <div className={"m-tb-auto"}>
                                <span>[ ]</span>
                            </div>
                            <div className={"m-tb-auto"}>
                                <span>100 points</span>
                            </div>
                        </div>
                        <div className={"best-score-card -second"}>
                            <div className={"m-tb-auto"}>
                            <img src={`${window.location.origin}/content/svg/medal-silver-badge.svg`} alt={""} />
                            </div>
                            <div className={"m-tb-auto"}>
                                <span>Galaxy-Eyes</span>
                            </div>
                            <div className={"m-tb-auto"}>
                                <span>100 points</span>
                            </div>
                        </div>
                        <div className={"best-score-card -third"}>
                            <div className={"m-tb-auto"}>
                                <img src={`${window.location.origin}/content/svg/medal-bronze-prize.svg`} alt={""} />
                            </div>
                            <div className={"m-tb-auto"}>
                                <span>Username</span>
                            </div>
                            <div className={"m-tb-auto"}>
                                <span>100 points</span>
                            </div>
                        </div>
                        <div className={"best-score-card -others"}>
                            <div className={"m-tb-auto"}>
                                <span className={"-classment"}>4</span>
                            </div>
                            <div className={"m-tb-auto"}>
                                <span>Username</span>
                            </div>
                            <div className={"m-tb-auto"}>
                                <span>100 points</span>
                            </div>
                        </div>
                        <div className={"best-score-card -others"}>
                            <div className={"m-tb-auto"}>
                                <span className={"-classment"}>5</span>
                            </div>
                            <div className={"m-tb-auto"}>
                                <span>Username</span>
                            </div>
                            <div className={"m-tb-auto"}>
                                <span>100 points</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            
            {/* Newsletter section */}
            <div className={"page-section -with-color-3"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Inscrivez-vous à la newsletter</h2>

                    <div className={"page-section-content mw-800px m-auto"}>
                        <NewsletterForm />
                    </div>
                </div>
            </div>
            
            {/* Contact section */}
            <div className={"page-section"} id={"contact"}>
                <div className={"page-wrapper"}>
                    <h2 className={"page-title"}>Vous avez une question ? Contacter-nous</h2>

                    <div className={"page-section-content mw-800px m-auto"}>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </Header>
    )
}