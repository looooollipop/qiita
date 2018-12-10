//ファイルの読み込みを待つ
window.addEventListener("DOMContentLoaded",init);

function init(){
    //サイズを指定
    var width=540;
    var height=540;

    //レンダラを作成
    var renderer=new THREE.WebGLRenderer(
        {canvas:document.querySelector("#myCanvas")},
        {alpha:true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("#ffffff"); //背景色を指定
    renderer.setSize(width,height);

    //シーンを作成
    var scene=new THREE.Scene();

    //カメラを作成
    var camera=new THREE.PerspectiveCamera(45,width/height);
    camera.position.set(420,620,740);
    camera.lookAt(new THREE.Vector3(0,0,0)); //原点方向を向く ※OrbitControl.jsを使用しているときは無効

    //メッシュを作成
    var geometry=new THREE.BoxGeometry(100,100,100);
    var material=new THREE.MeshStandardMaterial({color:"#00ffff"}); //※StandardMaterialの使用時はライトを準備
    var mesh1=new THREE.Mesh(geometry, material);
    mesh1.position.set(0,50,0);
    scene.add(mesh1);

    var geometry=new THREE.BoxGeometry(100,100,100);
    var material=new THREE.MeshStandardMaterial({color:"#ff00ff"}); //※StandardMaterialの使用時はライトを準備
    var mesh2=new THREE.Mesh(geometry, material);
    mesh2.position.set(0,150,0);
    scene.add(mesh2);

    var geometry=new THREE.BoxGeometry(100,100,100);
    var material=new THREE.MeshStandardMaterial({color:"#ffff00"}); //※StandardMaterialの使用時はライトを準備
    var mesh3=new THREE.Mesh(geometry, material);
    mesh3.position.set(0,250,0);
    scene.add(mesh3);

    //クリッピング平面を作成
    var plane=new THREE.Plane(new THREE.Vector3(0,-1,0),200);
    renderer.clippingPlanes.push(plane);    

    //ライトを作成
    var light=new THREE.DirectionalLight("#ffffff");
    light.intensity=2;
    light.position.set(1,1,1);
    scene.add(light);

    //gridHelperの作成 
    gridHelper=new THREE.GridHelper(500,10);  //(サイズ,グリッドの分割数)
    scene.add(gridHelper);

    //axisHelperの作成
    axisHelper=new THREE.AxisHelper(700);  //(軸のサイズ)
    scene.add(axisHelper);

    //毎フレーム実行
    tick();
    function tick(){
        //レンダリング
        renderer.render(scene,camera);

        //毎フレーム自分自身を呼び出し
        requestAnimationFrame(tick);
    }
}