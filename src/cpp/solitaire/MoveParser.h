#pragma once

#include <vector>

#include "Move.h"

#include "Parser/MoveModifierParser.h"
#include "Parser/MoveNumberParser.h"

class MoveParser final
{
public:
    MoveParser();

    void Parse(std::string raw);
    const std::vector<Move>& GetOutput() const;

private:
    std::vector<Move> m_output;

    MoveModifierParser m_modifierParser;
    MoveNumberParser m_sourceStackParser;
    MoveNumberParser m_sourceCardParser;
    MoveNumberParser m_targetParser;
}