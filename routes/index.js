

module.exports = app => {

  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);

  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes);

}

 /* app.use("/usuarios", require("./user.routes"));  */

  // Itineraries Routes
/*  app.use("/Itinerarios", require("./itineraries.routes")); 

  // Motorbikes Routes
  app.use("/Motocicletas", require("./motorbikes.routes")); 

} /*  */


