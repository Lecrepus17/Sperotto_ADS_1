const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger");

const eventRoutes = require("./routes/event.routes");
const authRoutes = require("./routes/auth.routes");
const volunteersRoutes = require("./routes/volunteers.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/volunteers", volunteersRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
