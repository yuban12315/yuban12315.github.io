import * as THREE from "three";
import camera from "./camera";
import loader, { mmdHelper } from "./loader";
import renderer from "./renderer";
import scene from "./scene";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "dat.gui";
import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js";

export default class ThreeProject {
  private frameId: number;
  private controls: OrbitControls;
  private clock: THREE.Clock;
  private effect: OutlineEffect;

  constructor() {
    const container = document.getElementById("three");
    if (!container) {
      return;
    }
    this.clock = new THREE.Clock();

    scene.init(container);
    camera.init(container);
    renderer.init(container);
  }

  render() {
    // 加载模型
    loader.loadModels();

    // 加载轨道球控制器
    this.initControls();

    // 初始化灯光
    this.initLight();

    // 加载面板
    this.addGUIPanel();

    this.initEffect();

    // 开始渲染
    this.animate();
  }

  initEffect() {
    this.effect = new OutlineEffect(renderer.getRenderer());
  }

  addGUIPanel() {
    const api = {
      animation: true,
      ik: true,
      outline: true,
      physics: true,
      "show IK bones": false,
      "show rigid bodies": false,
    };

    const gui = new GUI();
    const mmdFolder = gui.addFolder("MMD");

    // 暂停动画
    mmdFolder.add(api, "animation").onChange(() => {
      !api.animation ? this.clock.stop() : this.clock.start();
    });

    // 显示物理效果
    mmdFolder.add(api, "physics").onChange(() => {
      mmdHelper.enable("physics", api["physics"]);
    });

    mmdFolder.add(api, "outline").onChange(() => {
      this.effect.enabled = api["outline"];
    });

    mmdFolder.add(api, "show IK bones").onChange(() => {
      loader.getIKHelper().visible = api["show IK bones"];
    });
  }

  initLight() {
    // 添加环境光
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

  animate() {
    this.frameId = requestAnimationFrame(() => {
      this.controls.update();
      // 等所有模型加载完成之后再开始动画
      if (loader.loaded()) {
        const time = this.clock.getDelta();
        mmdHelper.update(time);
      }

      renderer.getRenderer().render(scene.getScene(), camera.getCamera());
      this.effect?.render(scene.getScene(), camera.getCamera());

      this.animate();
    });
  }
}
