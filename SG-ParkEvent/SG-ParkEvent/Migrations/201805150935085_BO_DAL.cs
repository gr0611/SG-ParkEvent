namespace SG_ParkEvent.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class BO_DAL : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Clients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nom = c.String(),
                        Prenom = c.String(),
                        Email = c.String(),
                        DateDeNaissance = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Evenements",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nom = c.String(),
                        Lieu = c.String(),
                        DateHeure = c.DateTime(nullable: false),
                        Duree = c.DateTime(nullable: false),
                        Theme = c.String(),
                        Descriptif = c.String(),
                        Client_Id = c.Int(),
                        Image_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Clients", t => t.Client_Id)
                .ForeignKey("dbo.Images", t => t.Image_Id)
                .Index(t => t.Client_Id)
                .Index(t => t.Image_Id);
            
            CreateTable(
                "dbo.Images",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        NomImage = c.String(),
                        PathImage = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Evenements", "Image_Id", "dbo.Images");
            DropForeignKey("dbo.Evenements", "Client_Id", "dbo.Clients");
            DropIndex("dbo.Evenements", new[] { "Image_Id" });
            DropIndex("dbo.Evenements", new[] { "Client_Id" });
            DropTable("dbo.Images");
            DropTable("dbo.Evenements");
            DropTable("dbo.Clients");
        }
    }
}
