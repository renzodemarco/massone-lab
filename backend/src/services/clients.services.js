import ClientModel from '../models/clients.model.js';
import CustomError from '../utils/CustomError.js';
import dictionary from '../utils/dictionary.js';

export async function createClient(data) {
  const existingClient = await ClientModel.findOne({
    $or: [{ name: data.name }, { email: data.email }]
  });
  if (existingClient) {
    if (existingClient.name === data.name) CustomError.new(dictionary.clientExists);
    if (existingClient.email === data.email) CustomError.new(dictionary.emailExists);
  };
  return await ClientModel.create(data);
}

export async function getAllClients() {
  return await ClientModel.find();
}