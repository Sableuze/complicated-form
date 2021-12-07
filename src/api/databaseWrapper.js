import { database } from '@/api/http';
import { errorTypesAuthApi, errorTypesDB } from '@/helpers/errorTypes';

export default class Db {
  static async create({ record, table }) {
    return database.post('/Create', {
      record,
      table,
    }, { vueAlert: errorTypesDB.create });
  }

  static async update({ id, record, table }) {
    return database.post('Update11', {
      id,
      record,
      table,
    }, { vueAlert: errorTypesAuthApi.updateUserInfo });
  }

  static async delete({ id, table }) {
    return database.post('/Delete', { id, table }, { vueAlert: errorTypesDB.delete });
  }

  static async read(args) {
    const { data } = await database.post('/Read', {
      ...args,
    }, { vueAlert: errorTypesDB.read });
    return data ? data.records : false;
  }

  static async list() {
    const response = await database.post('/ListTables');
    console.log(response);
  }
}
