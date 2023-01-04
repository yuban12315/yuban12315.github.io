import scene from "./scene";
import * as THREE from "three";
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader.js";
import { MMDAnimationHelper } from "three/examples/jsm/animation/MMDAnimationHelper.js";
import camera from "./camera";
import { CCDIKHelper } from "three/examples/jsm/animation/CCDIKSolver.js";

export const mmdHelper = new MMDAnimationHelper();

export class Loader {
  private loadingCount: number;
  private mmdLoader: MMDLoader;
  ikHelper: CCDIKHelper;

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
      "/public/hutao/胡桃.pmx",
      "/public/move/荧-嚣张.vmd",
      (mmd) => {
        this.finishLoading();

        mmdHelper.add(mmd.mesh, {
          animation: mmd.animation,
        });

        scene.getScene().add(mmd.mesh);

        // 加载骨骼
        this.ikHelper = mmdHelper.objects
          .get(mmd.mesh)!
          .ikSolver.createHelper();
        this.ikHelper.visible = false;

        scene.getScene().add(this.ikHelper);
      }
    );
  }

  loadHutaoWithDance() {
    // 加载人物模型
    this.startLoading();
    this.mmdLoader.loadWithAnimation(
      "/public/hutao/胡桃.pmx",
      "/public/move/ayaka-dance.vmd",
      (mmd) => {
        this.finishLoading();

        mmdHelper.add(mmd.mesh, {
          animation: mmd.animation,
        });

        scene.getScene().add(mmd.mesh);
      }
    );
  }

  loadScene() {
    this.startLoading();
    this.mmdLoader.load("/public/梨园华灯/梨园.pmx", (mesh) => {
      this.finishLoading();
      scene.getScene().add(mesh);
    });
  }

  loadCamera() {
    this.startLoading();
    this.mmdLoader.loadAnimation(
      "./public/move/ayaka-camera.vmd",
      camera.getCamera(),
      (cameraAnimation) => {
        this.finishLoading();

        mmdHelper.add(camera.getCamera(), {
          animation: cameraAnimation as THREE.AnimationClip,
        });
      }
    );
  }

  loadModels() {
    // 加载人物模型
    this.loadHutao();

    // 加载场景
    // this.loadScene();

    // 加载相机动画
    // this.loadCamera();
  }

  getIKHelper() {
    return this.ikHelper;
  }
}

export default new Loader();
