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
    var geometry=new THREE.BoxGeometry(400,400,400);
    var material=new THREE.MeshStandardMaterial({color:"#00ffff"}); //※StandardMaterialの使用時はライトを準備
    var mesh=new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //メッシュをクリック判定用のターゲットリストに追加
    var targetList=[];
    targetList.push(mesh);

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


    //meshクリックでのイベント
    var mouse={x:0,y:0};
    var count=0; //クリック回数
    document.getElementById("myCanvas").addEventListener("click",function(event){
        if(event.target==renderer.domElement){
            //マウス座標の2D変換
            var rect=event.target.getBoundingClientRect(); //getBoundingClientRect():絶対座標の取得
            mouse.x=event.clientX-rect.left; //event.client:ブラウザのviewportにおける座標(スクロールしても不変)
            mouse.y=event.clientY-rect.top;

            //マウス座標の3D変換
            mouse.x=(mouse.x/window.innerWidth)*2-1;
            mouse.y=-(mouse.y/window.innerHeight)*2+1;

            //マウスベクトルを、スクリーン座標系→オブジェクト座標系に変換
            var vector=new THREE.Vector3(mouse.x,mouse.y,1); //-1～1に正規化
            vector.unproject(camera);

            //レイを作成
            var ray=new THREE.Raycaster(camera.position,vector.sub(camera.position).normalize());

            //クリック判定
            var obj=ray.intersectObjects(targetList); //intersectObjects: 交差判定メソッド(返り値:交差していたリスト内のメッシュ

            //meshがクリックされたときのイベント
            if(0<obj.length){
                count++;

                if(count%3==0){
                    mesh.material.color.set("#00ffff");
                    console.log("click: " + count);
                }
                else if(count%3==1){
                    mesh.material.color.set("#ff00ff");
                    console.log("click: " + count);
                }
                else if(count%3==2){
                    mesh.material.color.set("#ffff00");
                    console.log("click: " + count);
                }
                else{}
            }
            //mesh以外のところがクリックされたときのイベント
            else{}
        }
        else{}
    });
}