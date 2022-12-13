import esbuild from "esbuild";

esbuild
  .serve(
    {
      servedir: "output",
      port: 8090,
    },
    {
      entryPoints: ["src/index.tsx"],
      outfile: "output/bundle.js",
      external: ["/public/*"],

      bundle: true,
    }
  )
  .then((server) => {
    // Call "stop" on the web server to stop serving
    // server.stop();
    console.log("dev server running at http://localhost:8090");
  });
