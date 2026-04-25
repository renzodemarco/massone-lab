import ClientsModel from '../models/clients.model.js';
import ReportsModel from '../models/reports.model.js';
import CustomError from '../utils/custom.error.js';
import dictionary from '../utils/error.dictionary.js';

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function createClient(data) {
  const existing = await ClientsModel.findOne({
    $or: [
      { name: { $regex: `^${data.name}$`, $options: 'i' } },
      { email: data.email }
    ]
  }).lean();
  if (existing) CustomError.new(dictionary.clientAlreadyExists);
  return await ClientsModel.create(data);
}

export async function getAllClients() {
  return await ClientsModel.paginate(
    {},
    {
      page: 1,
      limit: 4,
      sort: { createdAt: -1 },
      lean: true
    }
  );
}

export async function getClientById(id) {
  const client = await ClientsModel.findById(id);
  if (!client) CustomError.new(dictionary.clientNotFound);
  return client;
}

export async function getClientsByName(name) {
  const escapedName = escapeRegex(name);
  return await ClientsModel.paginate(
    {
      name: { $regex: escapedName, $options: 'i' }
    },
    {
      page: 1,
      limit: 4,
      sort: { createdAt: -1 },
      lean: true
    }
  );
}

export async function getClients({ q, page = 1, limit = 4 }) {
  const query = {};

  if (q) {
    query.name = { $regex: escapeRegex(q), $options: 'i' };
  }

  return await ClientsModel.paginate(query, {
    page,
    limit,
    sort: { createdAt: -1 },
    lean: true
  });
}

export async function updateClient(id, data) {
  if (data.name || data.email) {
    const existing = await ClientsModel.findOne({
      _id: { $ne: id },
      $or: [
        data.name ? { name: { $regex: `^${data.name}$`, $options: 'i' } } : null,
        data.email ? { email: data.email } : null
      ].filter(Boolean)
    }).lean();
    if (existing) CustomError.new(dictionary.clientAlreadyExists);
  }
  const client = await ClientsModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!client) CustomError.new(dictionary.clientNotFound);
  return client;
}

export async function deleteClient(id) {
  const linkedReport = await ReportsModel.exists({ client: id });
  if (linkedReport) CustomError.new(dictionary.clientHasReports);
  const client = await ClientsModel.findByIdAndDelete(id);
  if (!client) CustomError.new(dictionary.clientNotFound);
  return client;
}
