import * as THREE from "three";
import camera from "./camera";
import renderer from "./renderer";
import scene from "./scene";

export default class ThreeProject {
  private frameId: number;

  constructor() {
    const container = document.getElementById("three");
    if (!container) {
      return;
    }
    scene.init(container);
    renderer.init(container);
    camera.init(container);
  }

  launch() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(() => {
        renderer.getRenderer().render(scene.getScene(), camera.getCamera());
      });
    }
  }
}
