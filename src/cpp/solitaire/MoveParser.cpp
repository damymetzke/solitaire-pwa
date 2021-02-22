#include "MoveParser.h"

MoveParser::MoveParser() :
    m_output(),
    m_modifierParser(&m_sourceStackParser, m_output),
    m_sourceStackParser(&m_sourceCardParser, nullptr, OutputType::SOURCE_STACK, m_output),
    m_sourceCardParser(&m_targetParser, &m_modifierParser, OutputType::SOURCE_STACK, m_output),
    m_targetParser(&m_modifierParser, nullptr, OutputType::TARGET, m_output)
{}

void MoveParser::Parse(std::string raw)
{
    Parser* currentParser = &m_modifierParser;

    for(auto& it : raw)
    {
        currentParser = currentParser->ParseCharacter(it);
    }
}

const std::vector<Move>& MoveParser::GetOutput() const
{
    return m_output;
}