import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import path from "path";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

const resolve = (dir) => path.resolve(__dirname, dir);

export default defineConfig((config) => {
  const env = loadEnv({
    mode: config.env === "development" ? "dev" : "prod",
    cwd: process.cwd() + "/env",
    prefixes: [""],
  });
  const _env = {
    ...env.publicVars,
    ...env.parsed,
    ...env.rawPublicVars,
  };

  const isProd = process.env.NODE_ENV === "production";

  return {
    dev: {
      hmr: isProd ? false : true,
    },
    html: {
      template: "./index.html",
    },
    tools: {
      rspack: {
        plugins: [
          _env.RSDOCTOR &&
            new RsdoctorRspackPlugin({
              supports: {
                parseBundle: true,
                generateTileGraph: true,
              },
            }),
        ],
        module: {
          rules: [
            {
              resourceQuery: /raw/, // 只有在使用 `?raw` 查询时，才会应用这个规则
              test: /\.(glsl|svg)$/i,
              type: "asset/source",
            },
          ],
        },
      },
    },
    plugins: [
      pluginReact(),
      // pluginBabel({
      //   babelLoaderOptions: {
      //     presets: ["@babel/preset-typescript"],
      //     plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
      //   },
      // }),
    ],
    module: {
      parser: {
        'css/auto': {
          namedExports: false,
        },
      },
    },
    source: {
      define: {
        global: "window",
      },
      entry: {
        index: "./src/main.tsx",
      },
      resolve: {
        alias: {
          "/^~/": "",
          lodash: "lodash-es",
          "@": resolve("src"),
          "@utils": resolve("src/utils"),
        },
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
      },
    },
    output: {
      assetPrefix: "/",
      distPath: {
        root: "build",
      },
      minify: {
        jsOptions: {
          minimizerOptions: {
            compress: {
              drop_console: config.env !== "development",
              drop_debugger: true,
            },
          },
        },
      },
      dataUriLimit: 100,
      sourceMap: true,
      cssModules: {
        localIdentName: "[local]-[hash:base64:4]",
        auto: true,
        mode: "local",
        exportLocalsConvention: "camelCase",
        exportGlobals: true,
      },
    },
    server: {
      host: "0.0.0.0",
      port: 2333,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
