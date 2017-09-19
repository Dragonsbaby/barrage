/**
 * Created by DragonBaby on 2017/9/19.
 */


(function(win){
    var BA = function () {
        this.elem = null;
        this.right = 0;
        this.top = 0;
        this.speed = 1;
    };

    BA.prototype = {
        creatNew : function (text) {

        },
        randomNew : function () {
            this.elem =
        }
    };

    var P = {};
    P.random = {
        top : function () {

        },
        speed : function () {
            return Math.floor(Math.random()*20)+10;
        }
    };
    P.insert = function () {
        var elem = document.createElement()
    };


    win.barrage = BA;
})(window)

(function(wind){



    var BA = function(){

    };


    BA.prototype = {
        init : function () {

        }
    };

    var CC = function(){
    };


    CC.prototype = {
        init : function () {
            var num = this.randomNum();
            var cc = this.randomCC(num);
            console.log(getRandomColor());
            console.info("num", num);
            return  cc;
        },
        randomNum : function () {
            return Math.floor(Math.random()*6);
        },
        randomCC : function (num) {
            var cc = '';
            for(var i  = 0;i < num+1;i++){
                eval( "var word=" +  '"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16)+'"');
                cc += word;
            }
            return cc;
        }
    };

    var getRandomColor = function () {
        return '#'+(function (color) {
                return new Array(7-color.length).join("0")+color;
            })((Math.random()*0x1000000 << 0).toString(16));
    };


    window.ChinsesCart = CC;
})(window);







