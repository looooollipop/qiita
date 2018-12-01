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
    camera.lookAt(new THREE.Vector3(0,0,0)); //原点方向を向く ※OrbitControl.jsを使用しているときは無効

    //メッシュを作成
    var geometry=new THREE.BoxGeometry(400, 400, 400); //直方体
    //var geometry=new THREE.SphereGeometry(200,32,32); //球体(半径,経度分割線,緯度分割線)
    //var geometry=new THREE.CylinderGeometry(200,200,200,32); //円柱(上面の半径,底面の半径,高さ,円周の分割数)
    //var geometry=new THREE.PlaneGeometry(400,400,32); //平面(幅,高さ,分割数)
    var material=new THREE.MeshStandardMaterial({color:"#00ffff"});
    var material=new THREE.MeshStandardMaterial({color:"#00ffff"}); //※StandardMaterialの使用時はライトを準備
    var mesh=new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //ライトを作成
    var light=new THREE.DirectionalLight("#ffffff");
    light.intensity=2;
    light.position.set(1,1,1);
    scene.add(light);

    //毎フレーム実行
    tick();
    function tick(){
        //レンダリング
        renderer.render(scene,camera);

        //毎フレーム自分自身を呼び出し
        requestAnimationFrame(tick);
    }
}