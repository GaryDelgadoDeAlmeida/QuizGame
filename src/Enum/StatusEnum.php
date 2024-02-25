<?php

namespace App\Enum;

abstract class StatusEnum {

    public const STATUS_WAIT = "wait";
    public const STATUS_ONGOING = "ongoing";
    public const STATUS_TERMINATED = "terminated";
    public const STATUS_CANCELLED = "cancelled";
}