let path = require('path')

export default {
  extraBabelPlugins: [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
  ],
  "theme":"./src/theme/theme.js",
  "proxy": {
    "/api": {
      "target": "http://169.254.71.249:7001",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
}
