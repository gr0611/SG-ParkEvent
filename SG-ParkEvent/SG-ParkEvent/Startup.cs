using BO;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Owin;
using SG_ParkEvent.Models;

[assembly: OwinStartupAttribute(typeof(SG_ParkEvent.Startup))]
namespace SG_ParkEvent
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            using (var context = new ApplicationDbContext())
            {
                using (var transaction = context.Database.BeginTransaction())
                {
                    var roleManager = new RoleManager<IdentityRole>
                    (new RoleStore<IdentityRole>(context));

                    var userManager = new UserManager<ApplicationUser>
                        (new UserStore<ApplicationUser>(context));

                    if (!roleManager.RoleExists(Roles.Administrateur))
                    {
                        roleManager.Create(new IdentityRole(Roles.Administrateur));
                        var admin = new ApplicationUser
                        {
                            UserName = "Admin@gmail.com",
                            Email = "Admin@gmail.com"
                        };

                        var result = userManager.Create(admin, "Pa$$w0rd");
                        if (result.Succeeded)
                        {
                            userManager.AddToRole(admin.Id, Roles.Administrateur);

                           transaction.Commit();
                        }
                    }
                }
            }
        }
    }
}
