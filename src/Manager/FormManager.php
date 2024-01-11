<?php

namespace App\Manager;

class FormManager {

    /**
     * Check if a sended value is empty
     * 
     * @param mixed value
     * @return bool Return true if the value isn't empty else false
     */
    public function isEmpty($value): bool
    {
        $isValid = true;

        if(empty($value)) {
            $isValid = false;
        }

        return $isValid;
    }

    /**
     * Check if the sended value is an email
     * 
     * @param string value
     * @param bool Return true if is an valid else false if not
     */
    public function isEmail(string $value)
    {
        $isValid = true;

        if(!preg_match("/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/", $value)) {
            $isValid = false;
        }

        return $isValid;
    }

    /**
     * 
     * @param mixed value
     * @return bool
     */
    public function isBool($value) {
        $isValid = true;

        if(!is_bool($value)) {
            $isValid = false;
        }

        return $isValid;
    }

    /**
     * Check if the sended value is numeric
     * 
     * @param mixed value
     * @return bool
     */
    public function isNumber($value): bool
    {
        $isValid = true;

        if(!preg_match('/[0-9]/i', $value)) {
            $isValid = false;
        }

        return $isValid;
    }

    /**
     * 
     * @param mixed value
     * @return bool
     */
    public function isInteger($value) {
        $isValid = true;

        if(!is_int($value)) {
            $isValid = false;
        }

        return $isValid;
    }

    /**
     * Check if the sended value is a date
     * 
     * @param string value
     * @param ?string supposed format of the date to check
     * @return bool
     */
    public function isDate(string $value, string $format = "Y-m-d"): bool {
        $isValid = true;

        $date = \DateTime::createFromFormat($format, $value);
        if(!$date) {
            $isValid = false;
        }

        return $isValid;
    }

    /**
     * Check if the password is secure (have all recommanded caracters)
     * 
     * @param string value
     * @return bool
     */
    public function isSecurePassword(string $value)
    {
        $isValid = true;

        if(!preg_match("/[\'\/~`\!@#\$%\^&\*\(\)_\-\+=\{\}\[\]\|;:\"\<\>,\.\?\\\]/", $value)) {
            $isValid = false;
        }

        return $isValid;
    }

    /**
     * Check the max caracters length of a string
     * 
     * @param string value
     * @param int caracters max length
     * @return bool
     */
    public function checkMaxLength(string $value, int $maxLength = 255): bool
    {
        $isValid = true;

        if(strlen($value) > 255) {
            $isValid = false;
        }

        return $isValid;
    }

    /**
     * Check the min caracters length of a string
     * 
     * @param string value
     * @param int caracters min length
     * @return bool
     */
    public function checkMinLength(string $value, int $minLength = 1): bool
    {
        $isValid = true;

        if(strlen($value) < $minLength) {
            $isValid = false;
        }

        return $isValid;
    }

    /**
     * Check the string length limitation
     * 
     * @param string value
     * @param int caracters min length
     * @param int caracters max length
     * @return bool
     */
    public function checkLimitLength(string $value, int $minLength, int $maxLength): bool
    {
        $isValid = true;

        if(!$this->checkMinLength($value, $minLength) || !$this->checkMaxLength($value, $maxLength)) {
            $isValid = false;
        }

        return $isValid;
    }
}