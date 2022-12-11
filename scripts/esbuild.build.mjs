import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/index.jsx"],
    bundle: true,
    outfile: "output/bundle.js",
    external: ["/public/*"],
  })
  .catch(() => process.exit(1));
