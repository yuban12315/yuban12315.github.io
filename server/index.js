import http2 from "node:http2";
import fs from "node:fs";
import path from "path";

console.log("path", path.resolve(process.env.HOME, "./localhost-key.pem"));

const server = http2.createSecureServer({
  key: fs.readFileSync(path.resolve(process.env.HOME, "./localhost-key.pem")),
  cert: fs.readFileSync(path.resolve(process.env.HOME, "./localhost.pem")),
});
server.on("error", (err) => console.error(err));

server.on("stream", (stream, headers) => {
  // stream is a Duplex
  stream.respond({
    "content-type": "text/html; charset=utf-8",
    ":status": 200,
  });
  stream.end("<h1>Hello World</h1>");
});

server.listen(8443);
