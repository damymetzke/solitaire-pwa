#pragma once

#include "MoveFlag.h"

struct Move
{
    uint8_t sourceStack = 0;
    uint8_t sourceCard = 0;
    uint8_t target = 0;
    MoveFlag flags = MoveFlag::NONE;
};

inline constexpr bool operator==(const Move& a, const Move& b)
{
    return a.sourceStack == b.sourceStack
        && a.sourceCard == b.sourceCard
        && a.target == b.target
        && a.flags == b.flags;
}