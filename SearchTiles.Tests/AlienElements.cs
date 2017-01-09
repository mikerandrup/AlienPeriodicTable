using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SearchTiles.Models.AlienPeriodicTable;

namespace SearchTiles.Tests
{
    [TestClass]
    public class AlienElements
    {
        private const int UNIQUE_KEY_ONE = 55;
        private const int UNIQUE_KEY_TWO = 5017;
        private const int UNIQUE_KEY_THREE = 0;

        [TestMethod]
        public void AlienElementIsConstructed()
        {
            var element = new AlienElement(UNIQUE_KEY_ONE);
            Assert.IsFalse(String.IsNullOrWhiteSpace(element.Name));
            Assert.IsFalse(String.IsNullOrWhiteSpace(element.Abbreviation));
            Assert.AreEqual(UNIQUE_KEY_ONE, element.Identity);
            Assert.IsTrue(element.Hue > -1 && element.Hue < 256);
        }

        [TestMethod]
        public void AlienElementIsDeterministic()
        {
            var element1 = new AlienElement(UNIQUE_KEY_ONE);
            var element2 = new AlienElement(UNIQUE_KEY_ONE);

            Assert.IsTrue(
                ElementsAreDeepEqual(
                    element1,
                    element2
                )
            );
        }

        [TestMethod]
        public void AlienElementsDiffer()
        {
            var element1 = new AlienElement(UNIQUE_KEY_ONE);
            var element2 = new AlienElement(UNIQUE_KEY_TWO);
            var element3 = new AlienElement(UNIQUE_KEY_THREE);

            Assert.IsFalse(ElementsAreDeepEqual(element1, element2));
            Assert.IsFalse(ElementsAreDeepEqual(element2, element3));
            Assert.IsFalse(ElementsAreDeepEqual(element3, element1));
        }

        private bool ElementsAreDeepEqual(AlienElement one, AlienElement two)
        {
            return one.Name == two.Name &&
                one.Abbreviation == two.Abbreviation &&
                one.Hue == two.Hue &&
                one.Identity == two.Identity;
        }
    }
}
