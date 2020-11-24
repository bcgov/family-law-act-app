module.exports = {
  publicPath: "/family-law-act/",
  devServer: {
    proxy: {  
      "/api": {
        target: "http://localhost:8081",  
        pathRewrite: { '^/family-law-act': '' },
        secure: false,
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive'
        },
      }
    }
  },
  // crossorigin: "anonymous",
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
  },
  parallel: false // https://stackoverflow.com/questions/59951379/vue-cli-upgrade-from-v3-to-v4-breaks-build-process-with-thread-loader-error-can 
};
