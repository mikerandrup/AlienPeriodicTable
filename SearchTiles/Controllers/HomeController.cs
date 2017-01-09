using System.Web.Mvc;

namespace SearchTiles.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View("~/Views/ReactApplication.cshtml");
        }
    }
}