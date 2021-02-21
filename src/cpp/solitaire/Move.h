#pragma once

#include "MoveFlag.h"

struct Move
{
    uint8_t sourceStack = 0;
    uint8_t sourceCard = 0;
    uint8_t target = 0;
    MoveFlag flags = MoveFlag::NONE;
};