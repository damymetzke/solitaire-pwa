#include "MoveNumberParser.h"

#include <string>
#include <exception>

Parser* MoveNumberParser::ParseCharacter(char character)
{
    if(m_bufferPosition > 1)
    {
        // todo: handle error: too many characters in integer, only 2 allowed
        return this;
    }

    // todo: limit allowed character depending on output type
    if(character == ',' || character == ':' || character == '/' || character == ';')
    {
        if(m_outputType == OutputType::SOURCE_CARD && character != ':')
        {
            return SwapParser(m_altNextParser);
        }
        return SwapParser();
    }

    if(!(character >= '0' && character <= '9'))
    {
        // todo: handle error: invalid character
        ++m_bufferPosition;
        return this; 
    }

    m_buffer[m_bufferPosition++] = character;
    return this;
}

void MoveNumberParser::OnEnter()
{
    m_buffer = {' ', 0, 0};
    m_bufferPosition = 0;
}

void MoveNumberParser::OnExit()
{
    uint8_t parsed;

    if(m_buffer[0] == ' ' && (m_buffer[1] == ' ' || m_buffer[1] == 0))
    {
        parsed = 0;
    }
    else 
    {
        try
        {
            parsed = std::stoi(m_buffer.data()); 
        }
        catch(std::invalid_argument error)
        {
            throw std::invalid_argument("string '" + std::string(m_buffer.data()) + "' could not be parsed as int.");
        }
    }

    Move& currentMove = m_outputTarget.back();
    switch(m_outputType)
    {
    case OutputType::SOURCE_STACK:
        currentMove.sourceStack = parsed;
        break;

    case OutputType::SOURCE_CARD:
        currentMove.sourceCard = parsed;
        break;

    case OutputType::TARGET:
        currentMove.target = parsed;
        break;

    // default:
        // todo: throw error: invalid output type
    }
}

MoveNumberParser::MoveNumberParser(Parser* nextParser, Parser* altNextParser, OutputType outputType, std::vector<Move>& outputTarget) :
    Parser(nextParser),
    m_altNextParser(altNextParser),
    m_outputType(outputType),
    m_outputTarget(outputTarget)
{}