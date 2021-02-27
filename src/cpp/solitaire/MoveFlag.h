#pragma once

#include <cstdint>

enum class MoveFlag : uint8_t
{
    NONE              = 0,
    FINAL_SUB_MOVE    = 1 << 0,
    TURN_TO_FRONT     = 1 << 1,
    TURN_TO_BACK      = 1 << 2,
    ALLOW_MOVE        = 1 << 3,
    DO_NOT_ALLOW_MOVE = 1 << 4,
};

inline constexpr MoveFlag operator|(MoveFlag a, MoveFlag b)
{
    return static_cast<MoveFlag>(
        static_cast<uint8_t>(a)
        | static_cast<uint8_t>(b)
    );
}

inline constexpr MoveFlag operator&(MoveFlag a, MoveFlag b)
{
    return static_cast<MoveFlag>(
        static_cast<uint8_t>(a)
        & static_cast<uint8_t>(b)
    );
}

inline constexpr MoveFlag operator^(MoveFlag a, MoveFlag b)
{
    return static_cast<MoveFlag>(
        static_cast<uint8_t>(a)
        ^ static_cast<uint8_t>(b)
    );
}

inline constexpr MoveFlag operator~(MoveFlag a)
{
    return static_cast<MoveFlag>(
        ~static_cast<uint8_t>(a)
    );
}

inline constexpr MoveFlag operator|=(MoveFlag& a, MoveFlag b)
{
    a = a | b;
    return a;
}

inline constexpr MoveFlag operator&=(MoveFlag& a, MoveFlag b)
{
    a = a & b;
    return a;
}