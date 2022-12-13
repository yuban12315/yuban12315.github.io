import scene from "./scene";
import * as THREE from "three";
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader.js";
import { MMDAnimationHelper } from "three/examples/jsm/animation/MMDAnimationHelper.js";
import camera from "./camera";

export const helper = new MMDAnimationHelper();

export class Loader {
  loadModels() {
    const mmdLoader = new MMDLoader();

    // 加载场景
    mmdLoader.load("/public/梨园华灯/梨园.pmx", function onLoad(mesh) {
      console.log("mmd", mesh);

      scene.getScene().add(mesh);
    });

    // 加载人物模型
    mmdLoader.loadWithAnimation(
      "/public/hutao/胡桃.pmx",
      "/public/move/ayaka-dance.vmd",
      function onLoad(mmd) {
        // called when the resource is loaded
        const { mesh } = mmd;
        helper.add(mmd.mesh, {
          animation: mmd.animation,
        });

        scene.getScene().add(mmd.mesh);
      }
    );

    // 加载相机动画
    mmdLoader.loadAnimation(
      "./public/move/ayaka-camera.vmd",
      camera.getCamera(),
      function (cameraAnimation) {
        helper.add(camera.getCamera(), {
          animation: cameraAnimation as THREE.AnimationClip,
        });
      }
    );
  }
}

export default new Loader();
