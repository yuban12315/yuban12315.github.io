import scene from "./scene";
import * as THREE from "three";
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader.js";
import { MMDAnimationHelper } from "three/examples/jsm/animation/MMDAnimationHelper.js";
import camera from "./camera";

export const helper = new MMDAnimationHelper();

export class Loader {
  loadingCount: number;
  mmdLoader: MMDLoader;

  constructor() {
    this.loadingCount = 0;
    this.mmdLoader = new MMDLoader();
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

  loadHutao() {
    // 加载人物模型
    this.startLoading();
    this.mmdLoader.loadWithAnimation(
      "/public/hutao/hutao.pmx",
      "/public/move/ayaka-dance.vmd",
      (mmd) => {
        this.finishLoading();

        helper.add(mmd.mesh, {
          animation: mmd.animation,
        });

        scene.getScene().add(mmd.mesh);
      }
    );
  }

  loadScene() {
    // 加载场景
    this.startLoading();
    this.mmdLoader.load("/public/梨园华灯/梨园.pmx", (mesh) => {
      this.finishLoading();
      scene.getScene().add(mesh);
    });
  }

  loadCamera() {
    // 加载相机动画
    this.startLoading();
    this.mmdLoader.loadAnimation(
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

  loadModels() {
    this.loadHutao();
    this.loadCamera();
    this.loadScene();
  }
}

export default new Loader();
