const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
  try {
    return tf.loadGraphModel(process.env.MODEL_URL);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = loadModel;
