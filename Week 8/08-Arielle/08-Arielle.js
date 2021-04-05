// Author: Arielle Mueller
// Filename: 08-Arielle.js
// Date: March 18, 2021

let scene, camera, renderer;
let plane, orbitControl, controls;

function init(){
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor( 0xe4cb98 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );
}

function createCameraAndLights(){

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0,5,100);
    camera.lookAt(scene.position);
    scene.add(camera);

    orbitControl = new THREE.OrbitControls(camera, renderer.domElement);

    //Directional Light
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0,65,35);
    directionalLight.castShadow = true; 
    directionalLight.shadow.camera.left = 150;
    directionalLight.shadow.camera.right = -150;
    directionalLight.shadow.camera.top = 150;
    directionalLight.shadow.camera.bottom = -150;

    directionalLight.shadow.camera.near = 2;
    directionalLight.shadow.camera.far = 500;

    directionalLight.shadow.mapSize.x = 2048;
    directionalLight.shadow.mapSize.y = 2048;
    scene.add(directionalLight);

    const helper = new THREE.DirectionalLightHelper( directionalLight, 5);
    scene.add( helper );

    hemiLight = new THREE.HemisphereLight(0xffffff, 1);
    hemiLight.position.set(0,0,20);
    hemiLight.castShadow = true;

    scene.add(hemiLight);

    const hemihelper = new THREE.HemisphereLightHelper(hemiLight, 5);
    scene.add(hemihelper);

    
}

function createGeometry(){

    let axes = new THREE.AxesHelper(20);
    scene.add(axes);

    let geometry = new THREE.PlaneBufferGeometry(70, 70);
    let planeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x599b60});
    plane = new THREE.Mesh(geometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);

    //let cubeTexture = createCubeTexture();
    //cubeTexture.mapping = THREE.CubeRefractionMapping;
    scene.background = createCubeTexture();

    let alpha = new THREE.TextureLoader().load('textures/assets/partial-transparency.png');

    let cubeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        envMap: cubeTexture,
        metalness: 1,
        roughness: 0
    });

    cube = new THREE.Mesh(
        new THREE.BoxGeometry(10,10,10),
        cubeMaterial
    );
    cube.position.set(0,15,0);
    cube.rotation.set(Math.PI * 0.6, 0, Math.PI * 0.3);
    cube.castShadow = true;
    scene.add(cube);

    let mat = cubeMaterial.clone();
    let textureLoader = new THREE.TextureLoader();
    mat.normalMap = textureLoader.load('textures/assets/Engraved_Metal_003_NORM.jpg');
    mat.aoMap = textureLoader.load('textures/assets/Engraved_Metal_003_OCC.jpg');
    mat.shininessMap = textureLoader.load('textures/assets/Engraved_Metal_003_ROUGH.jpg');

    mesh = new THREE.Mesh(
        new THREE.SphereGeometry(10,50,50),
        mat
    );
    mesh.position.set(-15, 15, -15);
    mesh.castShadow = true; 
    scene.add(mesh);

    let sphereMaterial = new THREE.MeshStandardMaterial({
        alphaMap: alpha, 
        metalness: 0.02,
        roughness: 0.07, 
        alphaTest: 0.5
    });
    sphereMaterial.alphaMap.wrapS = THREE.RepeatWrapping;
    sphereMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
    sphereMaterial.alphaMap.repeat.set(5,5);

    mesh = new THREE.Mesh(
        new THREE.SphereGeometry(10,100,100),
        new THREE.MeshStandardMaterial({
            alphaMap: alpha, 
            metalness: 0.02, 
            roughness: 0.07, 
            alphaTest: 0.5
        })
    );

    mesh.position.set(15,15,15);
    mesh.castShadow = true; 
    scene.add(mesh);

}

function createCubeTexture(){
    let cubeLoader = new THREE.CubeTextureLoader().setPath('textures/assets/')
    let urls = [
        'clouds1_west.bmp', //left
        'clouds1_east.bmp', //right
        'clouds1_up.bmp', //up
        'clouds1_down.bmp', //down
        'clouds1_south.bmp', //back
        'clouds1_north.bmp' //front
    ];

    return cubeTexture = cubeLoader.load(urls);
}



function render(){

    requestAnimationFrame(render);
    orbitControl.update();
    renderer.render(scene, camera);
}

window.onload = () => {
    init();
    createCameraAndLights();
    createGeometry();
    render();
}