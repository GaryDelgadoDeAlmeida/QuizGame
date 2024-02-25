import React from "react";

export default function FinalScore({credentials}) {

    return (
        <div className={"score-card"}>
            <div className={"card-widget"}>
                <p>La partie est terminée.</p>
                <p className={"score"}>{credentials.score} / {Object.keys(credentials.details ?? []).length}</p>
                <div className={"score-details"}>
                    <span>Vous avez faits :</span>
                    <div className={"d-flex"}>
                        <div className={"item-row"}>
                            <p className={"d-column"}>
                                <span className={"bad-answers"}>{credentials.bad_answers}</span>
                                <span>mauvaise(s) réponse(s)</span>
                            </p>
                        </div>
                        <div className={"item-row"}>
                            <p className={"d-column"}>
                                <span className={"good-answers"}>{credentials.good_answers}</span>
                                <span>bonne(s) réponse(s)</span>
                            </p>
                        </div>
                        <div className={"item-row"}>
                            <p className={"d-column"}>
                                <span className={"answered-questions"}>{Object.keys(credentials.details).length}</span>
                                <span>question(s) répondue(s)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}