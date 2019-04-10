/**
 * 解析url的参数
 * @param paras 参数名称
 * @returns {*}
 */
function request(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }

    if(paraObj[paras] == null){
        return ""
    }else {
        return decodeURIComponent(paraObj[paras]);
    }
}

function cacl(_sha256) {
    return (_sha256.charCodeAt(0)
        + _sha256.charCodeAt(9)
        + _sha256.charCodeAt(19)
        + _sha256.charCodeAt(29)
        + _sha256.charCodeAt(39)
        + _sha256.charCodeAt(49)
        + _sha256.charCodeAt(59))%6+1
}


function verify(hash, seed, bos_seed){
    //这一步是校验seed的sha256是否与hash一致，表名游戏过程中没有篡改
    var r1 = 0;
    var r2 = 0;
    var r3 = 0;
    if(hash == sha256(seed)){
        r1 = cacl(sha256(seed.substr(0, 10) + bos_seed));
        r2 = cacl(sha256(seed.substr(10, 10) + bos_seed));
        r3 = cacl(sha256(seed.substr(20, 12) + bos_seed));
    }

    return [r1,r2,r3]
};

$(document).ready(function()
{
    var param = request("data");
    var parsedJson = null;
    var hash = "";
    var seed = "";
    var bos_seed = "";
    if(param != ""){
        parsedJson = jQuery.parseJSON(param);
        if(parsedJson != null){
            hash = parsedJson.hash;
            seed = parsedJson.seed;
            bos_seed = parsedJson.bos_seed;

            $("#hash").val(hash);
            $("#seed").val(seed);
            $("#bos_seed").val(bos_seed);
        }
    }

    $('#verify').click(function(){
        if(hash =="" || seed == "" || bos_seed ==""){
            alert("parameter not enough!")
        }else {
            var dice = verify(hash,seed,bos_seed);
            var ht = "<div data-v-feeb1c96=\"\" class=\"line\"><label data-v-feeb1c96=\"\">开宝结果:</label>";
            ht += "<div data-v-feeb1c96=\"\" class=\"flex conbox\">";
            $.each(dice, function (n,v) {
                var trs = "<div data-v-feeb1c96=\"\" class=\"cardtype\"><img data-v-feeb1c96=\"\" src=\"img/game_bz_img_0"+v+".png";
                trs += "\">"+v+"</div>";
                ht += trs;
                });
            ht += "</div></div>";

            $("#res").html(ht);
        }


    });

});



