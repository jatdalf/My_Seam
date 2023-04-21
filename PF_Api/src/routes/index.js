const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const serviceRouter = require("./serviceRouter");
const cartRouter = require("./cartRouter");
const questServRouter = require("./questServRouter");
const questProdRouter = require("./questProdRouter");
const paymentRouter = require("./paymentRouter");
const reviewRouter = require("./reviewRouter");

// Configurar los routers
router.use("/product", productRouter);
router.use("/users", userRouter);
router.use("/service", serviceRouter);
router.use("/cart", cartRouter);
router.use("/questserv", questServRouter);
router.use("/questprod", questProdRouter);
router.use("/payment", paymentRouter);
router.use("/review", reviewRouter);

module.exports = router;
