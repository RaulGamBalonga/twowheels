

module.exports = app => {

  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);

  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/auth", authRoutes);

 // Itineraries Routes
 app.use("/itinerarios", require("./itineraries.routes"));

// Motorbikes Routes
  app.use("/motorbikes", require("./motorbikes.routes")); 

  // Admin Routes
  app.use("/admin", require("./admin.routes"));

  // Profile Routes
  app.use("/profile", require("./user.routes"));
  
  app.use("/api", require("./api.routes"));


}

/*  app.use("/usuarios", require("./user.routes"));   */

 

  

 /*  */


