const reports = require("../controllers/report.controller.js")

module.exports = app => {
    const report = require("../controllers/report.controller.js")

    var router = require("express").Router()

    router.get("/sales/branch/timerange/:startDate/:endDate", reports.salesByBranch)

    router.get("/revenue/branch/timerange/:startDate/:endDate", reports.revenueByBranch)

    router.get("/profit/timerange/:startDate/:endDate", reports.profitByBranch)

    router.get("/sales/brand/timerange/:startDate/:endDate", report.salesByBrands)

    router.get("/revenue/brand/timerange/:startDate/:endDate", reports.revenueByBrand)

    router.get("/details/timerange/:startDate/:endDate", report.getDetailsOfPurchases)

    router.get("/details/brand/timerange/:brandName/:startDate/:endDate", report.getDetailsOfPurchasesByBrand)

    router.get("/details/branch/timerange/:branchCode/:startDate/:endDate", report.getDetailsOfPurchasesByBranch)

    router.get("/details/branch/brand/timerange/:branchCode/:brandName/:startDate/:endDate", report.getDetailsOfPurchasesByBrandInBranch)

    router.get("/sales/item/", report.salesByItems)

    router.get("/stock/branch/:branchCode/", report.brandByBranch)

    // // router.get("/sales/branch/timerange", reports.findByDateRange)		

    //  router.get("/sales", report.findByBranchCode)
    // router.get("/sales/brand/timerange/:startDate/:endDate", report.salesByBrand)

    app.use('/api/report', router)
}