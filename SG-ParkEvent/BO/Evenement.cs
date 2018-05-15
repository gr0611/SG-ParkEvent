using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public class Evenement
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Lieu { get; set; }
        public DateTime DateHeure { get; set; }
        public DateTime Duree { get; set;  }
        public string Theme { get; set; }
        public string Descriptif { get; set; }
        public virtual Image Image { get; set; }
        public virtual Client Client { get; set; }
        public virtual Parking Parkings { get; set; }

    }
}
