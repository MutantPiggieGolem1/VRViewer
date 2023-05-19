const canvas = document.getElementById("renderCanvas");

function startRenderLoop(engine) {
    engine.runRenderLoop(() => {
        if (sceneToRender?.activeCamera) 
            sceneToRender.render();
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
async function createScene() {
    const scene = new BABYLON.Scene(engine);
    const camera = /iPhone|Android/i.test(navigator.userAgent) ?
        new BABYLON.VRDeviceOrientationFreeCamera("Camera", BABYLON.Vector3.Zero(), scene) :
        new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const videoDome = new BABYLON.VideoDome("videoDome", ["http://135.180.76.185:20000/elytra.webm"], {
        resolution: 128,
        clickToPlay: true,
        autoPlay: false
    }, scene);

    // if (await navigator.xr?.isSessionSupported("immersive-ar")) {
    //     await scene.createDefaultXRExperienceAsync({
    //         uiOptions: {
    //             sessionMode: "immersive-ar",
    //         },
    //     });
    // }

    return scene;
}

window.initFunction = async function() {
    window.engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
    if (!engine) throw 'NullPointerError: @NonNull engine';
    startRenderLoop(engine);
    window.scene = await createScene();
}
initFunction().then(() => {
    sceneToRender = scene
})

// Resize
window.addEventListener("resize", () => engine.resize());