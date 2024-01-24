<?php

namespace App\Enum;

abstract class ContactEnum {

    public const CONTACT_FIRSTNAME = "firstname";
    public const CONTACT_LASTNAME = "lastname";
    public const CONTACT_EMAIL = "email";
    public const CONTACT_SUBJECT = "subject";
    public const CONTACT_MESSAGE = "message";

    public static array $typeName = [
        self::CONTACT_FIRSTNAME => "Firstname",
        self::CONTACT_LASTNAME => "Lastname",
        self::CONTACT_EMAIL => "Email",
        self::CONTACT_SUBJECT => "Subject",
        self::CONTACT_MESSAGE => "Message",
    ];

    public static function getAvailableChoices() {
        return [
            self::CONTACT_FIRSTNAME,
            self::CONTACT_LASTNAME,
            self::CONTACT_EMAIL,
            self::CONTACT_SUBJECT,
            self::CONTACT_MESSAGE,
        ];
    }

    public static function getChoices() {
        $choices = [];

        foreach(self::getAvailableChoices() as $choice) {
            $choices[self::$typeName[$choice]] = $choice;
        }

        return $choices;
    }
}