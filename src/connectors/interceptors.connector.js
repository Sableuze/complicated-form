export default (api, store, router, Notify, errorTypesDefault) => {
  api.interceptors.request.use((fn) => {
    store.commit('incrementLoading');
    return fn;
  });
  api.interceptors.response.use(
    (success) => {
      store.commit('decrementLoading');
      const { config } = success;
      if ('onSuccess' in config && config.showResult) {
        Notify.create({
          message: config.onSuccess,
          type: 'positive',
          position: 'top-right',
        });
      }

      return { ok: true, data: success.data };
    },

    (error) => {
      store.commit('decrementLoading');
      const { config } = error;
      if (error.response.status === 500 && config.retry && config.retry >= 0) {
        // eslint-disable-next-line no-plusplus
        const newRequest = { ...config, retry: config.retry -= 1 };
        // return { ok: false, newRequest };
        return api(newRequest);
      }

      if (config.showResult) {
        if ('onError' in config) {
          Notify.create({
            message: config.onError,
            type: 'negative',
            position: 'top-right',
          });
          return { ok: false };
        }

        Notify.create({
          message: errorTypesDefault.serverBroken,
          type: 'positive',
          position: 'top-right',
        });
      }

      return Promise.reject(error);
    },
  );
};
