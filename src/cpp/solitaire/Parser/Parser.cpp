#include "Parser.h"

#include <stdexcept>

Parser::Parser() : m_nextParser(nullptr)
{}

Parser::Parser(Parser* nextParser) : m_nextParser(nextParser)
{}

Parser* Parser::SwapParser()
{
    if(m_nextParser == nullptr)
    {
        throw std::runtime_error("m_nextParser is nullptr");
    }
    OnExit();
    m_nextParser->OnEnter();
    return m_nextParser;
}

Parser* Parser::SwapParser(Parser* nextParser)
{
    if(nextParser == nullptr)
    {
        throw std::runtime_error("nextParser is nullptr");
    }
    OnExit();
    m_nextParser->OnEnter();
    return nextParser;
}

Parser* Parser::SwapParserAndParse(char character)
{
    if(m_nextParser == nullptr)
    {
        throw std::runtime_error("m_nextParser is nullptr");
    }
    OnExit();
    m_nextParser->OnEnter();
    return m_nextParser->ParseCharacter(character);
}

Parser* Parser::SwapParserAndParse(Parser* nextParser, char character)
{
    if(nextParser == nullptr)
    {
        throw std::runtime_error("nextParser is nullptr");
    }
    OnExit();
    m_nextParser->OnEnter();
    return m_nextParser->ParseCharacter(character);
}
