#include <gtest/gtest.h>

#include <solitaire/MoveParser.h>

TEST(MoveParser, MoveParser_can_handle_sources_targets_and_modifiers)
{
    MoveParser parser;
    parser.Parse("0,1:2/*0,0;?3,4:5");
    const std::vector<Move>& result = parser.GetOutput();

    EXPECT_EQ(result[0], Move({
        0,
        1,
        2,
        MoveFlag::NONE
    }));
}