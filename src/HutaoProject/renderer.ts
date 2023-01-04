import * as THREE from "three";

export class Renderer {
  private _renderer: THREE.WebGLRenderer;

  init(container: HTMLElement) {
    const { clientHeight, clientWidth } = container;

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // 设置显示区域大小
    renderer.setSize(clientWidth, clientHeight);
    // 设置背景色
    // renderer.setClearColor(new THREE.Color(0xeafdfc));
    renderer.setClearColor(new THREE.Color(0xeb455f));

    container.appendChild(renderer.domElement);
    this._renderer = renderer;
  }

  getRenderer() {
    return this._renderer;
  }
}

export default new Renderer();
