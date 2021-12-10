import { database } from '@/api/http';
import { errorTypesDB } from '@/helpers/errorTypes';
import { successTypesDBRegular } from '@/helpers/successTypes';

export default class Db {
  static async create({ record, table }, { showResult = true,
    onSuccess = successTypesDBRegular.create,
    onError = errorTypesDB.create }) {
    return database.post('/Create', {
      record,
      table,
    }, { showResult, onSuccess, onError });
  }

  static async update({ id, record, table }, { showResult = true,
    onSuccess = successTypesDBRegular.update,
    onError = errorTypesDB.update }) {
    return database.post('/Update', { id, record, table }, { showResult,
      onSuccess,
      onError,
    });
  }

  static async delete({ id, table }, { showResult = true,
    onSuccess = successTypesDBRegular.deleteEvent,
    onError = errorTypesDB.delete }) {
    return database.post('/Delete', { id, table }, { showResult, onSuccess, onError });
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
