import http2 from "node:http2";
import fs from "node:fs";
import path from "path";
import os from "os";
import mime from "mime-types";

const PORT = 8090;

const {
  HTTP2_HEADER_PATH,
  HTTP2_HEADER_METHOD,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = http2.constants;

const getPaths = () => {
  let certDir = "";
  if (os.platform() === "win32") {
    console.log("process.env.USERPROFILE", process.env.USERPROFILE);
    certDir = path.resolve(process.env.USERPROFILE, "./cert");
  } else {
    certDir = path.resolve(process.env.HOME);
  }

  return {
    keyPath: path.resolve(certDir, "./localhost-key.pem"),
    certPath: path.resolve(certDir, "./localhost.pem"),
    serverRootPath: "./docs",
  };
};

const paths = getPaths();

console.log(paths);

const server = http2.createSecureServer({
  key: fs.readFileSync(paths.keyPath),
  cert: fs.readFileSync(paths.certPath),
});
function respondToStreamError(err, stream) {
  console.log(err);
  if (err.code === "ENOENT") {
    stream.respond({ ":status": HTTP_STATUS_NOT_FOUND });
  } else {
    stream.respond({ ":status": HTTP_STATUS_INTERNAL_SERVER_ERROR });
  }
  stream.end();
}

server.on("stream", (stream, headers) => {
  const reqPath = headers[HTTP2_HEADER_PATH];
  const reqMethod = headers[HTTP2_HEADER_METHOD];

  const fullPath = decodeURI(path.join(paths.serverRootPath, reqPath));
  const responseMimeType = mime.lookup(fullPath);

  console.log("fullPath", fullPath);

  stream.respondWithFile(
    fullPath,
    {
      "content-type": responseMimeType,
    },
    {
      onError: (err) => respondToStreamError(err, stream),
    }
  );
});

server.listen(PORT);
