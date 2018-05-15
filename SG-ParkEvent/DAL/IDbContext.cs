using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BO;
using System.Data.Entity;


namespace DAL
{
    public interface IDbContext
        {
            DbSet<Client> Clients { get; set; }
            DbSet<Evenement> Evenements { get; set; }
            DbSet<Image> Images { get; set; }
    }     
}
