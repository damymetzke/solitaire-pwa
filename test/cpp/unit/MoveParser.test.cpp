#include <gtest/gtest.h>

#include <solitaire/MoveParser.h>

TEST(MoveParser, MoveParser_can_handle_sources_targets_and_modifiers)
{
    MoveParser parser;
    parser.Parse("0,1:2/*0,0;?3,4:5;");
    const std::vector<Move>& result = parser.GetOutput();

    EXPECT_EQ(result[0], Move({
        0,
        1,
        2,
        MoveFlag::NONE
    }));

    EXPECT_EQ(result[1], Move({
        0,
        0,
        0,
        MoveFlag::TURN_TO_FRONT | MoveFlag::FINAL_SUB_MOVE
    }));

    EXPECT_EQ(result[2], Move({
        3,
        4,
        5,
        MoveFlag::DO_NOT_ALLOW_MOVE | MoveFlag::FINAL_SUB_MOVE
    }));

}