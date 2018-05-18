using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using BO;
using SG_ParkEvent.Models;

namespace SG_ParkEvent.Controllers
{ [Authorize]
    public class EvenementsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        [AllowAnonymous]
        // GET: Evenements
        public ActionResult Index()
        {
            return View(db.Evenement.ToList());
        }
        [AllowAnonymous]
        // GET: Evenements/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Evenement evenement = db.Evenement.Find(id);
            if (evenement == null)
            {
                return HttpNotFound();
            }
            return View(evenement);
        }
     
        // GET: Evenements/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Evenements/Create
        // Afin de déjouer les attaques par sur-validation, activez les propriétés spécifiques que vous voulez lier. Pour 
        // plus de détails, voir  http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Nom,Lieu,DateHeure,Duree,Theme,Descriptif,Longitude,Latitude")] Evenement evenement)
        {
            if (ModelState.IsValid)
            {
                db.Evenement.Add(evenement);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(evenement);
        }

        // GET: Evenements/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Evenement evenement = db.Evenement.Find(id);
            if (evenement == null)
            {
                return HttpNotFound();
            }
            return View(evenement);
        }

        // POST: Evenements/Edit/5
        // Afin de déjouer les attaques par sur-validation, activez les propriétés spécifiques que vous voulez lier. Pour 
        // plus de détails, voir  http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Nom,Lieu,DateHeure,Duree,Theme,Descriptif,Longitude,Latitude")] Evenement evenement)
        {
            if (ModelState.IsValid)
            {
                db.Entry(evenement).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(evenement);
        }

        // GET: Evenements/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Evenement evenement = db.Evenement.Find(id);
            if (evenement == null)
            {
                return HttpNotFound();
            }
            return View(evenement);
        }

        // POST: Evenements/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Evenement evenement = db.Evenement.Find(id);
            db.Evenement.Remove(evenement);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
