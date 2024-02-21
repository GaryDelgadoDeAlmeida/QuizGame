<?php

namespace App\Enum;

abstract class GameModeEnum {

    public const MODE_STANDARD = "standard";
    public const MODE_CHALLENGE = "challenge";

    protected static array $typeName = [
        self::MODE_STANDARD => "Standard",
        self::MODE_CHALLENGE => "Challenge"
    ];

    private static function getAvailableChoice() : array {
        return [
            self::MODE_STANDARD,
            self::MODE_CHALLENGE
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