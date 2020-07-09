// TODO: Separate the configrations by enviroments(test, dev, production)
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
