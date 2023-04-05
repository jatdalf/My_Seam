const { Router } = require("express");
const { getQuestionsHandler, postQuestionsHandler, setAnswerHandler, deleteHandler } = require("../handlers/questionsHandlers.js");
const questServRouter = Router();

const prod_path = '/service'
questServRouter.get(prod_path, getQuestionsHandler );
questServRouter.post(`${prod_path}/:offerId`, postQuestionsHandler );
questServRouter.put(`${prod_path}/:questId`, setAnswerHandler );
questServRouter.delete(prod_path, deleteHandler );

module.exports = questServRouter;