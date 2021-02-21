#pragma once

/**
 * @todo: throw an exception if m_nextParser is nullptr during swap
 */
class Parser
{
public:
    Parser();
    explicit Parser(Parser* nextParser);

    virtual Parser* ParseCharacter(char character) = 0;

protected:
    Parser* SwapParser();
    Parser* SwapParser(Parser* nextParser);
    Parser* SwapParserAndParse(char character);
    Parser* SwapParserAndParse(Parser* nextParser, char character);

private:
    Parser* m_nextParser;

    virtual void OnEnter() {};
    virtual void OnExit() {};
};
