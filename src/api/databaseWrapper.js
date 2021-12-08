import { database } from '@/api/http';
import { errorTypesDB } from '@/helpers/errorTypes';

export default class Db {
  static async create({ record, table }, showResult = true) {
    return database.post('/Create', {
      record,
      table,
    }, showResult ? { onSuccess: 'Успех', onError: errorTypesDB.create } : '');
  }

  static async update({ id, record, table }) {
    return database.post('/Update', { id, record, table }, {
      onSuccess: 'Успех',
      onError: errorTypesDB.update,
    });
  }

  static async delete({ id, table }) {
    return database.post('/Delete', { id, table }, { onError: errorTypesDB.delete });
  }

  static async read(args) {
    const { ok, data } = await database.post('/Read', {
      ...args,
    }, { onError: errorTypesDB.read });
    return ok ? { records: data.records } : false;
  }

  static async list() {
    const response = await database.post('/ListTables');
    console.log(response);
  }
}
