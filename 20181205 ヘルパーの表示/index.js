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
    camera.position.set(0,0,1000);

    //カメラコントローラを作成
    var controls=new THREE.OrbitControls(camera);
    controls.enableDamping=true; //滑らかにコントローラを制御する
    controls.dampingFactor=0.2; //滑らかにコントローラを制御する

    //メッシュを作成
    var geometry=new THREE.BoxGeometry(400, 400, 400);
    var material=new THREE.MeshStandardMaterial({color:"#00ffff"}); //※StandardMaterialの使用時はライトを準備
    var mesh=new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //ライトを作成
    var light=new THREE.DirectionalLight("#ffffff");
    light.intensity=2;
    light.position.set(1,1,1);
    scene.add(light);

    //gridHelperの作成 
    gridHelper=new THREE.GridHelper(500,5);  //(サイズ,グリッドの分割数)
    scene.add(gridHelper);

    //axisHelperの作成
    axisHelper=new THREE.AxisHelper(1000);  //(軸のサイズ)
    scene.add(axisHelper);

    //毎フレーム実行
    tick();
    function tick(){
        //カメラコントローラを更新
        controls.update();

        //レンダリング
        renderer.render(scene,camera);

        //毎フレーム自分自身を呼び出し
        requestAnimationFrame(tick);
    }
}