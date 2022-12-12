import * as THREE from "three";
import camera from "./camera";
import loader from "./loader";
import renderer from "./renderer";
import scene from "./scene";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class ThreeProject {
  private frameId: number;
  controls: OrbitControls;

  constructor() {
    const container = document.getElementById("three");
    if (!container) {
      return;
    }
    scene.init(container);
    camera.init(container);
    renderer.init(container);
  }

  render() {
    loader.loadHutaoModel();
    this.initControls();
    this.initLight();

    this.callRenderer();
  }

  initLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.getScene().add(ambientLight);
  }

  initControls() {
    const controls = new OrbitControls(
      camera.getCamera(),
      renderer.getRenderer().domElement
    );

    // 使用了 OrbitControls，camera 对象的 lookAt 方法失效
    // 这里通过调整  controls.target 控制初始摄像机的位置
    controls.target = new THREE.Vector3(1.6, 14, -4);
    this.controls = controls;
  }

  callRenderer() {
    this.frameId = requestAnimationFrame(() => {
      this.controls.update();
      renderer.getRenderer().render(scene.getScene(), camera.getCamera());
      this.callRenderer();
    });
  }
}
