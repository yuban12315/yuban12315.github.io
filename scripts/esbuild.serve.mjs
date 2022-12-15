import esbuild from "esbuild";

esbuild
  .serve(
    {
      servedir: "docs",
      port: 8090,
    },
    {
      entryPoints: ["src/index.tsx"],
      outfile: "docs/bundle.js",
      external: ["/public/*"],

      bundle: true,
    }
  )
  .then((server) => {
    // Call "stop" on the web server to stop serving
    // server.stop();
    console.log("dev server running at http://localhost:8090");
  });
