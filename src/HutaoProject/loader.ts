import scene from "./scene";
import * as THREE from "three";
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader.js";

export class Loader {
  loadHutaoModel() {
    MMDLoader;
    const loader = new MMDLoader();
    loader.load(
      "/public/hutao/胡桃.pmx", // called when the resource is loaded
      function (mesh) {
        scene.getScene().add(mesh);
      },
      // called when loading is in progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened");
      }
    );
  }
}

export default new Loader();
