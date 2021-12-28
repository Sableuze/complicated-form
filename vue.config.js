// const proxy = {
//   '/api.m3o.com/v1/user': {
//     target: 'http://localhost:8080',
//     secure: false,
//     changeOrigin: true,
//     sameSite: 'None',
//   },
// };

module.exports = {
  // devServer: {
  //   proxy,
  //   https: false,
  // },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/_variables.scss";',
      },
    },
  },
  transpileDependencies: ['quasar'],
};
