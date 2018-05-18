namespace SG_ParkEvent.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class coordonneesevent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Evenements", "Latitude", c => c.Single(nullable: false));
            AddColumn("dbo.Evenements", "Longitude", c => c.Single(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Evenements", "Longitude");
            DropColumn("dbo.Evenements", "Latitude");
        }
    }
}
