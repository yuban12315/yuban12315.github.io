import scene from "./scene";
import * as THREE from "three";
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader.js";
import { MMDAnimationHelper } from "three/examples/jsm/animation/MMDAnimationHelper.js";
import camera from "./camera";

export const helper = new MMDAnimationHelper();

export class Loader {
  loadingCount: number;
  constructor() {
    this.loadingCount = 0;
  }

  startLoading() {
    this.loadingCount++;
  }

  finishLoading() {
    setTimeout(() => this.loadingCount--, 1000);
  }

  loaded() {
    return this.loadingCount === 0;
  }

  loadModels() {
    const mmdLoader = new MMDLoader();

    // 加载场景
    this.startLoading();
    mmdLoader.load("/public/梨园华灯/梨园.pmx", (mesh) => {
      this.finishLoading();
      scene.getScene().add(mesh);
    });

    // 加载人物模型
    this.startLoading();
    mmdLoader.loadWithAnimation(
      "/public/hutao/胡桃.pmx",
      "/public/move/ayaka-dance.vmd",
      (mmd) => {
        this.finishLoading();

        helper.add(mmd.mesh, {
          animation: mmd.animation,
        });

        scene.getScene().add(mmd.mesh);
      }
    );

    // 加载相机动画
    this.startLoading();
    mmdLoader.loadAnimation(
      "./public/move/ayaka-camera.vmd",
      camera.getCamera(),
      (cameraAnimation) => {
        this.finishLoading();

        helper.add(camera.getCamera(), {
          animation: cameraAnimation as THREE.AnimationClip,
        });
      }
    );
  }
}

export default new Loader();
