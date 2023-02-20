using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Contexts
{
    public class OrdersContext : DbContext
    {
        public DbSet<Order> Orders { get; set; }
        public OrdersContext(DbContextOptions<OrdersContext> options) 
            : base(options) 
        {
            Database.EnsureCreated();
        }
    }
}
