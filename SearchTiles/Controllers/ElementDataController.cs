using SearchTiles.Models.AlienPeriodicTable;
using System.Collections.Generic;
using System.Web.Http;

namespace SearchTiles.Controllers
{
    public class ElementDataController : ApiController
    {
        private const int NUMBER_OF_RESULTS = 100;

        // GET: /api/elementdata
        public IEnumerable<IElementModel> Get()
        {
            var modelCollection = new List<AlienElement>();
            for (int modelSeed = 0; modelSeed < NUMBER_OF_RESULTS; modelSeed++)
            {
                modelCollection.Add(
                    new AlienElement(modelSeed)
                );
            }
            return modelCollection;
        }
    }
}
