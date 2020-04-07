module.exports = {
  chainWebpack: config => {
    config.module.rules.delete("eslint");
    config.module
      .rule("ts")
      .test(/\.ts$/)
      .use("ts-loader")
      .loader("ts-loader")
      .options({
        appendTsSuffixTo: [/\.vue$/]
      });
  }
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "@/styles/_variables.scss";`,
  //       prependData: `@import "@/styles/_common.scss";`,
  //       prependData: `@import "@/styles/_survey.scss";`,
  //       prependData: `@import "@/styles/styles.scss";`
  //     }
  //   }
  // }
};
