<?php

namespace App\Enum;

abstract class GameEnum {
    
    public const GAME_USER = "user";
    public const GAME_CATEGORY = "category";
    public const GAME_MODE = "mode";
    public const GAME_SCORE = "score";
    public const GAME_STATUS = "status";
    public const GAME_DETAILS = "details";
    
    public const GAME_GIVEN_ANSWER = "given_answer";
    public const GAME_GIVEN_QUESTION = "given_question";

    protected static array $typeName = [
        self::GAME_USER => "user",
        self::GAME_CATEGORY => "category",
        self::GAME_MODE => "mode",
        self::GAME_SCORE => "score",
        self::GAME_STATUS => "status",
        self::GAME_DETAILS => "details",
    ];

    public static function getAvailableChoice() : array {
        return [
            self::GAME_USER,
            self::GAME_CATEGORY,
            self::GAME_MODE,
            self::GAME_SCORE,
            self::GAME_STATUS,
            self::GAME_DETAILS,
        ];
    }

    public static function getChoices() : array {
        $choices = [];

        foreach(self::getAvailableChoice() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}