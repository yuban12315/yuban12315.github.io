import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/index.jsx"],
    bundle: true,
    outfile: "docs/bundle.js",
    external: ["/public/*"],
    watch: true,
  })
  .catch(() => process.exit(1));
