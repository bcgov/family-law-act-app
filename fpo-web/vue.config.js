const webBaseHref = process.env.WEB_BASE_HREF || '/';
module.exports = {
  publicPath: webBaseHref,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        pathRewrite: { '^/apply-for-family-order': '' },
        secure: false,
        changeOrigin: true,
        headers: {
		      "X-Forwarded-Host": "localhost:8080",
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
