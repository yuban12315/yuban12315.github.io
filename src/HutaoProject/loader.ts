import scene from "./scene";
import * as THREE from "three";
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader.js";
import { MMDAnimationHelper } from "three/examples/jsm/animation/MMDAnimationHelper.js";

let helper = new MMDAnimationHelper();

export class Loader {
  loadHutaoModel() {
    const loader = new MMDLoader();

    loader.loadWithAnimation(
      "/public/hutao/胡桃.pmx", // called when the resource is loaded
      "/public/move/荧-嚣张.vmd",
      function onLoad(mmd) {
        helper.add(mmd.mesh, {
          animation: mmd.animation,
          physics: true,
        });

        scene.getScene().add(mmd.mesh);
      },
      // called when loading is in progresses
      function onProgress(xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function onError(error) {
        console.log("An error happened");
      }
    );
  }
}

export default new Loader();
