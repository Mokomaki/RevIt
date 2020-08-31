using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ASP_Server.Models
{
    public class TestModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }

    public class TestContext : DbContext
    {
        public TestContext(DbContextOptions<TestContext> options)
            : base(options)
        {

        }

        public DbSet<TestModel> TestModels { get; set; }
    }
}
