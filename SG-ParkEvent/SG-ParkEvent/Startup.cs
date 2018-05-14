using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SG_ParkEvent.Startup))]
namespace SG_ParkEvent
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
