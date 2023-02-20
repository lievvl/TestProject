using backend.Contexts;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly OrdersContext _context;

        public OrdersController(OrdersContext context)
        {
            _context = context;
        }

        public ActionResult GetAll()
        {
            return new JsonResult(_context.Orders.ToList());
        }

        [HttpPost]
        public ActionResult Post(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
            return Ok();
        }
    }
}
