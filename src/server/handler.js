const crypto = require('crypto');

const predictClassification = require('../services/inferenceService');
const { storeData, getData } = require('../services/data');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { result, suggestion } = await predictClassification(model, image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    result,
    createdAt,
    suggestion,
    id,
  };

  storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data,
  });

  response.code(201);
  return response;
}

async function getPredictHandler(request, h) {
  const data = await getData();

  const response = h.response({
    status: 'success',
    data,
  });

  response.code(200);
  return response;
}

module.exports = { postPredictHandler, getPredictHandler };
