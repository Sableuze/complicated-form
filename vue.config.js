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
        additionalData: '@import "@/assets/_variables.scss";',
      },
    },
  },
  transpileDependencies: [
    'quasar',
  ],
};
