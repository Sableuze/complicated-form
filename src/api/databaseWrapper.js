import { database } from '@/api/http';

export default class Db {
  static async create(record, table) {
    try {
      await database.post('/Create', {
        record,
        table,
      });
    } catch (err) {
      return err.response;
    }
  }

  static async update(record, table) {
    try {
      await database.post('Update', {
        record,
        table,
      });
    } catch (err) {
      return err.response;
    }
  }

  static async read(args) {
    try {
      debugger;
      const response = await database.post('/Read', {
        ...args,
      });
      console.log(response);
    } catch (err) {
      return err.response;
    }
  }

  static async list() {
    const response = await database.post('/ListTables');
    console.log(response);
  }
}
