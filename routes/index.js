

module.exports = app => {

  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);

  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes);

 // Itineraries Routes
 app.use("/itinerarios", require("./itineraries.routes"));

// Motorbikes Routes
  app.use("/motorbikes", require("./motorbikes.routes")); 


}

/*  app.use("/usuarios", require("./user.routes"));   */

 

  

 /*  */


