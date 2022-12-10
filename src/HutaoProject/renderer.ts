import * as THREE from "three";

export class Renderer {
  private _renderer: THREE.Renderer;

  constructor() {
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
  }

  init(container: HTMLElement) {
    const { clientHeight, clientWidth } = container;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    console.log("clientWidth", clientWidth);
    renderer.setSize(clientWidth, clientHeight);
    renderer.setClearColor(new THREE.Color("red"));
    container.appendChild(renderer.domElement);
  }

  getRenderer() {
    return this._renderer;
  }
}

export default new Renderer();
