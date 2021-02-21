#include "MoveModifierParser.h"

MoveModifierParser::MoveModifierParser(Parser* nextParser, std::vector<Move>& outputTarget) :
    Parser(nextParser),
    m_outputTarget(outputTarget)
{}

Parser* MoveModifierParser::ParseCharacter(char character)
{
    Move& currentMove = m_outputTarget.back();
    switch(character)
    {
    case '*':
        currentMove.flags |= MoveFlag::TURN_TO_FRONT;
        break;

    case '!':
        currentMove.flags |= MoveFlag::ALLOW_MOVE;
        break;

    case '?':
        currentMove.flags |= MoveFlag::DO_NOT_ALLOW_MOVE;
        break;

    default:
        return SwapParserAndParse(character);
    }

    return this;
}

void MoveModifierParser::OnEnter()
{
    m_outputTarget.emplace_back();
}
