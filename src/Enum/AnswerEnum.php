<?php

namespace App\Enum;

abstract class AnswerEnum {

    public const ANSWER_QUESTION = "question";
    public const ANSWER_LABEL = "answer";
    public const ANSWER_IS_ANSWER = "isAnswer";

    public static array $typeName = [
        self::ANSWER_QUESTION => "Question",
        self::ANSWER_LABEL => "Answer",
        self::ANSWER_IS_ANSWER => "Is answer",
    ];

    public static function getAvailableChoices() : array {
        return [
            self::ANSWER_QUESTION,
            self::ANSWER_LABEL,
            self::ANSWER_IS_ANSWER,
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}