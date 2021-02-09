# Card Textures

Multiple card sets are supported in the project.
These cards follow a few rules.
All card sets are build as follows:

- Each set contains four suits: clubs, diamonds, hearts, spades.
  Even if other symbols are used, these names are still used internally.
- Each suit contains 13 cards: ace, 2-10, jack, queen, king.
  Non-number cards are given their relative number.
  So ace=1, jack=11, queen=12, king=13.
  Again even if different characters are used the internal naming does not change.
- Each set contains a back side of the cards.

## Specifications

- Cards are stored as a png.
- The ratio width to height is 9:14.
- The edges may be transparent,
  but transperency is forbidden withing the card itself.
- Card sets designed for larger displays should be clearly visible at 2cm.
- Card sets designed for smaller displays should be clearly visible at 1/2cm.
- The suits _may_ deviate from the standard clubs, diamonds, hearts, spades.
- Each suit must be displayed with the same form and color on each card it applies to.
- The position _may_ differ, but it is adviced to not do this for cards other than ace, jack, queen and king.
- Different suits must be clearly distinguishable.
- Both suits and numbers should be clearly displayed,
  such that it can be understood at the glance of an eye.
- There must be a clear color scheme.
- Clubs and spades one color, diamonds and hearts another color, is a valid color scheme.
- The color scheme above, but with the colors slightly different, is a valid color scheme.
  For example: clubs=dark-blue, spades=black, diamonds=orange, hearts=red.
- All 4 suits a different color is a valid color scheme.
- Clubs and spades must never be red, or a similar color.
- Diamonds and spades must never be black, or a similar color.
- Number cards (2-10) must never have a complex design.
- Other cards (ace, jack, queen, king) _may_ have a complex design.
- All cards must follow the smae theme.
  What constitutes as a theme is highly subjective.
- Nudity, severe violence or other adult content is strictly forbidden.
- Mild forms of the above (sexuality, guns, etc.) is allowed, but should be used in moderation.
- Cards must not contain any text, except for the number.
- Ace, jack, queen and king should always be displayed as A, J, Q, K.

## Naming

All sets are stored inside `src/img/cards`.
Each set is contained within its own folder.
The first file will be `/back.png`.
This is the card back.
All other cards follow the convention `/{suit}{number}.png`.
The suit will be a single letter: c, d, h, s.
These are for clubs, diamonds, hearts and spades respectively.
The number will be its actual number, or their relative number.
Numbers are always 2 digits, so `2` should be written as `02`.
Some examples:

```
5-of-hearts:       /h05.png
queen-of-diamonds: /d12.png
ace-of-spades:     /s01.png
```
