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
    loader.loadHutaoModel();

    renderer.init(container);

    const ambientlight = new THREE.AmbientLight(0xffffff);
    scene.getScene().add(ambientlight);

    const controls = new OrbitControls(
      camera.getCamera(),
      renderer.getRenderer().domElement
    );
    this.controls = controls;
  }

  render() {
    this.launch();
  }

  launch() {
    this.frameId = requestAnimationFrame(() => {
      this.controls.update();
      renderer.getRenderer().render(scene.getScene(), camera.getCamera());
      this.launch();
    });
  }
}
