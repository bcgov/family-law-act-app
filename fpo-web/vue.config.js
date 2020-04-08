module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
    config.module
      .rule("ts")
      .test(/\.ts$/)
      .use("ts-loader")
      .loader("ts-loader")
      .options({
        appendTsSuffixTo: [/\.vue$/],
      });
  },
};
