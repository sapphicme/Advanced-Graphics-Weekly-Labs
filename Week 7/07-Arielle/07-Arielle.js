// author: Arielle Mueller
//filename: 07-Arielle.js
//date: March 2, 2021


let renderer, scene, camera, orbitControl;
let controls, gui, levels;
let size = 100, number = 10;
const cell = size / number;
const half_cell = cell * 0.5;
const tex = new THREE.TextureLoader().load('assets/texture/maroon-square.png');
const raycaster = new THREE.Raycaster();
let tops = [];

function init(){

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x0);
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(-75, 45, 45);
    camera.lookAt(scene.position);

    scene.add(new THREE.AmbientLight(0x222222, 1));

    let pointLight = new THREE.PointLight(0x77ffff, 2, 50);
    pointLight.position.set(-5,5,-5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    let spotLight = new THREE.SpotLight(0xffaaff, 1);
    spotLight.position.set(80,20,-5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    let directionalLight = new THREE.DirectionalLight(0xffaa77, 0.75);
    directionalLight.position.set(10,10,3);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    //let hemisphereLight = new THREE.HemisphereLight(0x7799ff, 0x99ff77, 0.75);
    //scene.add(hemisphereLight);

    scene.position.y = -20;
    //orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
}

function createGeometry(){
    //scene.add(new THREE.GridHelper(200, 25));

    scene.add(new THREE.AxesHelper(20));

    let geo = new THREE.PlaneBufferGeometry(25,25);
    let mat = new THREE.MeshLambertMaterial({color: 0xffffff});
    let plane = new THREE.Mesh(geo, mat);

    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true; 
    plane.position.y = -0.05;
    scene.add(plane);

    addGrid();
}

function addGrid(){
    let gor = new THREE.PlaneBufferGeometry(cell, cell);
    let mat = new THREE.MeshLambertMaterial({color: 0xffffff, map: tex});
    let mesh = new THREE.Mesh(gor, mat);
    mesh.rotation.x = Math.PI * -0.5;
    for(let z = -number/2; z < number/2; z++){
        for(let x = -number/2; x < number/2; x++){
        let clone = mesh.clone();
        clone.position.set(x * cell, 0.3, z * cell);
        tops.push(clone);
        scene.add(clone);
        }
    }
}

function OnMouseDown(event){
    let mousePos = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mousePos, camera);
    let intersects = raycaster.intersectObjects(tops);
    if(intersects.length > 0){
        let obj = intersects[0].object;
        const intersect = intersects[0];
        let x = obj.position.x;
        let z = obj.position.z;
        let y = half_cell;
        let mesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry(cell, cell, cell), 
            new THREE.MeshBasicMaterial({color: 0xffaa77, map: tex})
        );
        mesh.position.set(x, y, z);
        mesh.position.copy(intersect.point).add(intersect.face.normal);
        mesh.position.divideScalar(-10).floor().multiplyScalar(10).addScalar(5);

        scene.add(mesh);
        tops.push(mesh);
    }

}

//function createDatGui(){
//
//    controls = new function(){
//        this.url = 'localhost';
//        this.port = '5500';
//        this.filename = '07-Arielle.json';
//        this.loadLevels = function(){
//            loadLevels(this.filename);
//        };
//        this.levels = [];
//    };
//    gui = new dat.GUI();
//    gui.add(controls, 'url');
//    gui.add(controls, 'port');
//    gui.add(controls, 'filename');
//    gui.add(controls, 'loadLevels');

//}

//function loadLevels(url){
//    let req = new XMLHttpRequest();
//    req.open('GET', url);
//    req.responseType = 'json';
//    req.send();
//    req.onload = function(){
//        levels = req.response;
//    };
//}

//function parseJson(obj){

//    function parseGeo(){
//        switch(obj.geo){
//            case 'Box':
//                return new THREE.BoxBufferGeometry(10,10,10);
//            case 'Cylinder':
//                return new THREE.CylinderBufferGeometry(5,5,10);
//            default:
//                return new THREE.SphereBufferGeometry(10,24,24);
//        }
//    }
//    let mesh = new THREE.Mesh(parseGeo(), new THREE.MeshLambertMaterial({color: obj.colr}));
//    mesh.position.set(obj.posX, obj.posY, obj.posZ);
//    return mesh;
//}

function render(){
    requestAnimationFrame(render);
    //orbitControl.update();
    renderer.render(scene, camera);
}

window.onload = () =>{
    init();
    setupCameraAndLight();
    createGeometry();
    window.addEventListener('mousedown', OnMouseDown, false);
    render();
    
}