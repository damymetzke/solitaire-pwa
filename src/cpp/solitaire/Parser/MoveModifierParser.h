#pragma once

#include <vector>

#include "Parser.h"
#include "../Move.h"

class MoveModifierParser : public Parser
{
    // super: Parser
public:
    Parser* ParseCharacter(char character) override;

private:
    void OnEnter() override;

    // self
public:
    explicit MoveModifierParser(Parser* nextParser, std::vector<Move>& outputTarget);

private:
    std::vector<Move>& m_outputTarget;
};