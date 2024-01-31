<?php 

namespace App\Enum;

abstract class QuestionEnum {
    public const QUESTION_CATEGORY = "category";
    public const QUESTION_LABEL = "question";
    public const QUESTION_DIFFICULTY = "difficulty";
    public const QUESTION_MULTIPLE_ANSWERS = "multiple_answers";
    public const QUESTION_ANSWERS = "answers";

    public static array $typeName = [
        self::QUESTION_CATEGORY => "Category",
        self::QUESTION_LABEL => "Question",
        self::QUESTION_DIFFICULTY => "Difficulty",
        self::QUESTION_MULTIPLE_ANSWERS => "Multiple answers",
        self::QUESTION_ANSWERS => "Answers"
    ];

    public static function getAvailableChoice() : array {
        return [
            self::QUESTION_CATEGORY,
            self::QUESTION_LABEL,
            self::QUESTION_DIFFICULTY,
            self::QUESTION_MULTIPLE_ANSWERS,
            self::QUESTION_ANSWERS
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach (self::getAvailableChoice() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}