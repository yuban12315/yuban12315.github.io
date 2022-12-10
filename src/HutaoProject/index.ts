import * as THREE from "three";

export default class ThreeProject {
  private frameId;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private renderer: THREE.Renderer;

  constructor() {
    const container = document.getElementById("three");
    if (!container) {
      return;
    }

    this.scene = new THREE.Scene();
    console.log(this.scene);
    this.initCamera();
    this.initRenderer();
  }

  initCamera() {
    const container = document.getElementById("three")!;

    const { clientHeight, clientWidth } = container;
    this.camera = new THREE.PerspectiveCamera(
      90,
      clientWidth / clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(30, 5, 70);

    // console.log("scene.getScene().position", scene.getScene().position);
    this.camera.lookAt(this.scene.position);
  }

  initRenderer() {
    const container = document.getElementById("three")!;

    const { clientHeight, clientWidth } = container;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    console.log("clientWidth", clientWidth);
    renderer.setSize(clientWidth, clientHeight);
    renderer.setClearColor(new THREE.Color("red"));
    container.appendChild(renderer.domElement);

    this.renderer = renderer;
  }

  launch() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(() => {
        console.log("frameId", this.frameId);

        this.renderer.render(this.scene, this.camera);
      });
    }
  }
}
