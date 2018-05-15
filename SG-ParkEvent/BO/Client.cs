﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public class Client
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public DateTime DateDeNaissance { get; set; }
        //J'ajoute 'virtual' si je fais appel à un objet externe
         public virtual Evenement Evenements { get; set; }
         public virtual Parking Parkings { get; set; }
    }
}
