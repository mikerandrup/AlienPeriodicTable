using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SearchTiles.Models.AlienPeriodicTable
{
    public static class WordParts
    {
        public static string GetPrefixAtKey(int positionKey)
        {
            int size = Prefixes.Length;
            return Prefixes[positionKey % size];
        }

        public static string GetInfixAtKey(int positionKey)
        {
            int size = Infixes.Length;
            return Infixes[positionKey % size];
        }

        public static string GetSuffixAtKey(int positionKey)
        {
            int size = Suffixes.Length;
            return Suffixes[positionKey % size];
        }

        public static string[] Prefixes =
        {
            "lith",
            "thor",
            "chrom",
            "vana",
            "sod",
            "hyd",
            "beryl",
            "rubi",
            "mag",
            "zirc",
            "nic",
            "cop",
            "alum",
            "silic",
            "sel",
            "astat",
            "bohr",
            "pallad"
        };

        public static string[] Infixes =
        {
            "il",
            "it",
            "ir",
            "el",
            "et",
            "er",
            "al",
            "at",
            "ar",
            "ul",
            "ut",
            "ur"
        };

        public static string[] Suffixes =
        {
            "ium",
            "ine",
            "on",
            "sten",
            "ic"
        };
    }
}