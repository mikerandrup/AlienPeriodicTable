using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace SearchTiles.Models.AlienPeriodicTable
{
    public class AlienElement : IElementModel
    {
        private const int HASHER = 13;

        public const int MAX_HUE = 360;
        private const int HUE_SPACING = 31;

        public AlienElement (int deterministicSeed)
        {
            Identity = deterministicSeed;

            Hue = (deterministicSeed * HUE_SPACING) % 360;

            int position = deterministicSeed % HASHER;
            string prefix = WordParts.GetPrefixAtKey(position++);
            string infix1 = WordParts.GetInfixAtKey(position++);
            string infix2 = WordParts.GetInfixAtKey(position++);
            string suffix = WordParts.GetSuffixAtKey(position++);

            TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;

            Name = textInfo.ToTitleCase(
                String.Format(
                    "{0}{1}{2}{3}",
                    prefix,
                    infix1,
                    infix2,
                    suffix
                )
            );

            Abbreviation = textInfo.ToTitleCase(
                String.Format(
                    "{0}{1}",
                    prefix[0],
                    infix1[0]
                )
            );
        }

        public int Identity { get; }
        public string Name { get; }
        public string Abbreviation { get; }
        public int Hue { get; }
    }
}