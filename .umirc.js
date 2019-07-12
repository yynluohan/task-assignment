
export default {
  history: 'hash',
  treeShaking: true,
  disableCSSModules: false,
  publicPath: "./",
  outputPath: "./dist",
  autoprefixer: null,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'CR-management',
      dll: false,
    }]
  ]
}
