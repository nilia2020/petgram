// Usamos path para referirnos a la carpeta donde estemos
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  //El resolve permite manejar las extensiones con las que trabajaremos
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      //Js and JSX loader
      {
        //Esta configuracion des test cargara el loader con cualquier extension
        test: /\.(js|jsx)$/,
        //Es importante ignorar la carpeta node_modules
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
  //Mi configuracion del servidor
  devServer: {
    static: {
      directory: path.join(__dirname, "dist/"),
    },
    compress: true,
    port: 3000,
    open: true,
  },
};
