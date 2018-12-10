//マクロ定義
const RELATIVE=0;
const ABSOLUTE=1;

//ファイルの読み込みを待つ
window.addEventListener("DOMContentLoaded",init);

function init(){
    //RGB値(0.0～1.0)
    var rgb_rel={
        r:0.987654321,
        g:0.0,
        b:0.0,
    };

    //RGB値(0～255)
    var rgb_abs={
        r:0,
        g:0,
        b:254.123456789,
    };

    var hex_rel=rgb2hex(rgb_rel,RELATIVE); //RGB値(0.0～1.0)をカラーコードに変換
    var hex_abs=rgb2hex(rgb_abs,ABSOLUTE); //RGB値(0～255)をカラーコードに変換

    document.getElementById("output_rel").innerHTML='<font color="' + hex_rel + '">relative val: ' + hex_rel + '</font>';
    document.getElementById("output_abs").innerHTML='<font color="' + hex_abs + '">absolute val: ' + hex_abs + '</font>';
}

function rgb2hex(rgb,ptn){
    if(ptn==RELATIVE){ //値の範囲が0.0～1.0の場合
        var r=Math.round(rgb.r*255).toString(16);
        var g=Math.round(rgb.g*255).toString(16);
        var b=Math.round(rgb.b*255).toString(16);
    }
    else if(ptn==ABSOLUTE){ //値の範囲が0～255の場合
        var r=Math.round(rgb.r).toString(16);
        var g=Math.round(rgb.g).toString(16);
        var b=Math.round(rgb.b).toString(16);
    }
    else{}

    if(r.length==1) r="0"+r;
    if(g.length==1) g="0"+g;
    if(b.length==1) b="0"+b;

    var hex="#"+r+g+b;

    return hex;
}
