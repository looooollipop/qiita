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
    camera.lookAt(new THREE.Vector3(0,0,0)); //原点方向を向く

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

    //毎フレーム実行
    //requestAnimationFrameでやる場合
    tick();
    function tick(){
        var rotX=0.01;
        var rotY=0.01;
        mesh.rotation.x+=rotX; //メッシュをx方向に回転
        mesh.rotation.y+=rotY; //メッシュをy方向に回転

        //レンダリング
        renderer.render(scene,camera);

        //毎フレーム自分自身を呼び出し
        requestAnimationFrame(tick);
    }

    /*//setIntarvalでやる場合
    tick();
    setInterval(tick,10); //(呼び出す関数,呼び出し間隔)
    function tick(){
        var rotX=0.01;
        var rotY=0.01;
        mesh.rotation.x+=rotX; //メッシュをx方向に回転
        mesh.rotation.y+=rotY; //メッシュをy方向に回転

        //レンダリング
        renderer.render(scene,camera);
    }*/

    /*//setTimeoutでやる場合
    tick();
    function tick(){
        var rotX=0.01;
        var rotY=0.01;
        mesh.rotation.x+=rotX; //メッシュをx方向に回転
        mesh.rotation.y+=rotY; //メッシュをy方向に回転

        //レンダリング
        renderer.render(scene,camera);

        //指定した間隔で自分自身を呼び出し
        setTimeout(tick,10); //(呼び出す関数,呼び出し間隔)
    }*/
}