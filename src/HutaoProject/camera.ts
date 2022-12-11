import * as THREE from "three";
import scene from "./scene";

export class Camera {
  private _camera: THREE.PerspectiveCamera;

  constructor() {}

  getCamera() {
    return this._camera;
  }

  init(container: HTMLElement) {
    const { clientHeight, clientWidth } = container;
    this._camera = new THREE.PerspectiveCamera(
      90,
      clientWidth / clientHeight,
      0.1,
      1000
    );
    this._camera.position.set(1, 11, 10);

    this._camera.lookAt(scene.getScene().position);
  }
}

export default new Camera();
