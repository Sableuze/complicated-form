module.exports = {
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
  transpileDependencies: [
    'quasar',
  ],
};
