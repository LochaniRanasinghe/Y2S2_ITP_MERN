const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  // useCreateIndex: true,
  // useNewUrlParser: true,
  // useUnifiedTopologyL: true,
  // useFindAndModify: false
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connected ...");
});

//routes-----------------------------------------------------------------

const OtherIncomeFinRouter = require("./routes/OtherIncomeFins.js");
app.use("/otherIncomeFin", OtherIncomeFinRouter);

// customer management  routes
const CustomerRouter = require("./routes/Customers.js");
app.use("/Customer", CustomerRouter);

const CusBillsRouter = require("./routes/CusBills.js");
app.use("/CusBill", CusBillsRouter);

//import routes...get access to the routes.InvProduct
const InvProductRoutes = require("./routes/InvProducts.js");
//use routes.InvProduct
app.use("/InvProduct", InvProductRoutes);

const branchRouter = require("./routes/BrnBranch");
app.use("/branchRoutes", branchRouter);

//offerInfo routes(Lochi)-------------------------------------------------------

const OfferInfoRouter = require("./routes/ProOfferInfoR.js");
app.use("/OfferInfo", OfferInfoRouter);

//promotionReport routes(Lochi)-------------------------------------------------------

const ReportRouter = require("./routes/PromotionReportR.js");
app.use("/ProReport", ReportRouter);

//-----------------------------------------------------------

//import routes...get access to the routes.InvProduct
//import routes...get access to the routes.InvItem
const InvItemRoutes = require("./routes/InvItems.js");
//use routes.InvItem
app.use("/InvItem", InvItemRoutes);

const profitRouter = require("./routes/BrnProfits");
app.use("/profitRoutes", profitRouter);

const adminRouter = require("./routes/BrnAdmins");
app.use("/adminRoutes", adminRouter);

//  ---Employee management routes---
const empEmployeeRouter = require("./routes/empEmployees.js");
app.use("/empEmployee", empEmployeeRouter);

const OtherExpenFinRouter = require("./routes/OtherExpenFins");
app.use("/OtherExpenFin", OtherExpenFinRouter);

const salaryRouter = require("./routes/empSalaries.js");
app.use("/empSalary", salaryRouter);

const SerClaimRouter = require("./routes/SerClaims");
app.use("/SerClaim", SerClaimRouter);

const leaveRouter = require("./routes/empLeaves.js");
app.use("/empLeave", leaveRouter);

//comment

// comment

const supplierRouter = require("./routes/SupSuppliers.js");
app.use("/SupSupplier", supplierRouter);

const invoiceRouter = require("./routes/SupInvoices.js");
app.use("/SupInvoice", invoiceRouter);

app.listen(PORT, () => {
  console.log(`server is up and running on ${PORT}`);
});
