export default (database, errorTypesDB, successTypesDBRegular) => ({
  async create({ record, table }, { showResult = true,
    onSuccess = successTypesDBRegular.create,
    onError = errorTypesDB.create }) {
    return database.post('/Create', {
      record,
      table,
    }, { showResult, onSuccess, onError });
  },

  async update({ id, record, table }, { showResult = true,
    onSuccess = successTypesDBRegular.update,
    onError = errorTypesDB.update }) {
    return database.post('/Update', { id, record, table }, { showResult,
      onSuccess,
      onError,
    });
  },

  async delete({ id, table }, { showResult = true,
    onSuccess = successTypesDBRegular.deleteEvent,
    onError = errorTypesDB.delete }) {
    return database.post('/Delete', { id, table }, { showResult, onSuccess, onError, retry: 3 });
  },

  async read({ query, table }, { onError = errorTypesDB.read, retry = 0 }) {
    const { ok, data } = await database.post('/Read', { query, table }, { onError, retry });
    return ok ? { ok, records: data.records } : ok;
  },

  async list() {
    const response = await database.post('/ListTables');
    console.log(response);
  },
});
