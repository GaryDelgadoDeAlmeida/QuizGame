<?php

namespace App\Enum;

abstract class DifficultyEnum {
    public const DIFFICULTY_EASY = "easy";
    public const DIFFICULTY_MEDIUM = "medium";
    public const DIFFICULTY_HARD = "hard";

    public array $typeName = [
        self::DIFFICULTY_EASY => "Easy",
        self::DIFFICULTY_MEDIUM => "Medium",
        self::DIFFICULTY_HARD => "Hard"
    ];

    public static function getAvailableChoices() : array {
        return [
            self::DIFFICULTY_EASY,
            self::DIFFICULTY_MEDIUM,
            self::DIFFICULTY_HARD
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