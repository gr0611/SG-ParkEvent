using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    class Client
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public DateTime DateDeNaissance { get; set; }
        //J'ajoute 'virtual' si je fais appel à un objet externe
       // public virtual Event Event { get; set; }
        //public virtual Parking Parking { get; set; }
    }
}
