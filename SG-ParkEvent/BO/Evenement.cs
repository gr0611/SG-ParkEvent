using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BO
{
    public class Evenement
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Lieu { get; set; }
        [DisplayName("Date et heure de l'évènement")]
        public DateTime DateHeure { get; set; }
        public TimeSpan Duree { get; set;  }
        public string Theme { get; set; }
        public string Descriptif { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public virtual List<Image> Image { get; set; }
        public virtual List<Client> Client { get; set; }
        //public virtual List<Parking> Parkings { get; set; }

    }
}
