const reports = require("../controllers/report.controller.js")


module.exports = app => {
    const report = require("../controllers/report.controller.js");
  
    var router = require("express").Router();

    router.get("/sales/branch/timerange/:startDate/:endDate", reports.salesByBranch)

    router.get("/revenue/branch/timerange/:startDate/:endDate", reports.revenueByBranch)

    router.get("/profit/timerange/:startDate/:endDate", reports.profitByBranch)
    
    // router.get("/sales/brand/timerange/:startDate/:endDate", reports.salesByBrand)
    // // router.get("/sales/branch/timerange", reports.findByDateRange);		

    //  router.get("/sales", report.findByBranchCode);

    app.use('/api/report', router);
};