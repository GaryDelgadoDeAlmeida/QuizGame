<?php

namespace App\Enum;

abstract class UserEnum {

    public const USER_FIRSTNAME = "firstname";
    public const USER_LASTNAME = "lastname";
    public const USER_BIRTH_DATE = "birth_date";
    public const USER_EMAIL = "email";
    public const USER_PASSWORD = "password";
    public const USER_ROLES = "roles";

    public static array $typeName = [
        self::USER_FIRSTNAME => "Firstname",
        self::USER_LASTNAME => "Lastname",
        self::USER_BIRTH_DATE => "Birth date",
        self::USER_EMAIL => "Email",
        self::USER_PASSWORD => "Password",
        self::USER_ROLES => "Roles"
    ];

    public static function getAvailableChoices() {
        return [
            self::USER_FIRSTNAME,
            self::USER_LASTNAME,
            self::USER_BIRTH_DATE,
            self::USER_EMAIL,
            self::USER_PASSWORD
        ];
    }

    public static function getChoices() 
    {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[static::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}