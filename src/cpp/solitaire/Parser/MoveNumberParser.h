#pragma once

#include <vector>
#include <array>

#include "Parser.h"
#include "../Move.h"

enum class OutputType: uint8_t
{
    NONE = 0,
    SOURCE_STACK = 1,
    SOURCE_CARD = 2,
    TARGET = 3
};

class MoveNumberParser : public Parser
{
    // super: Parser
public:
    Parser* ParseCharacter(char character) override;

private:
    void OnEnter() override;
    void OnExit() override;

    // self
public:
    MoveNumberParser(Parser* nextParser, Parser* altNextParser, OutputType outputType, std::vector<Move>& outputTarget);

private:
    Parser* m_altNextParser;

    OutputType m_outputType;
    std::vector<Move>& m_outputTarget;

    std::array<char, 3> m_buffer = {' ', 0, 0} ;
    uint8_t m_bufferPosition = 0;
};