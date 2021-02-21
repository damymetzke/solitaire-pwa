#include "Parser.h"

Parser::Parser() : m_nextParser(nullptr)
{}

Parser::Parser(Parser* nextParser) : m_nextParser(nextParser)
{}

Parser* Parser::SwapParser()
{
    OnExit();
    m_nextParser->OnEnter();
    return m_nextParser;
}

Parser* Parser::SwapParser(Parser* nextParser)
{
    OnExit();
    m_nextParser->OnEnter();
    return nextParser;
}

Parser* Parser::SwapParserAndParse(char character)
{
    OnExit();
    m_nextParser->OnEnter();
    return m_nextParser->ParseCharacter(character);
}

Parser* Parser::SwapParserAndParse(Parser* nextParser, char character)
{
    OnExit();
    m_nextParser->OnEnter();
    return m_nextParser->ParseCharacter(character);
}
