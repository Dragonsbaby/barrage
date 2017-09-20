/**
 * Created by DragonBaby on 2017/9/19.
 */


(function(win){

    var _class_ = 'barrage-content';
    var _maxWidth_ = document.body.clientWidth;


    var BA = function () {
        this.elem = null;
        this.text = '';
        this.right = 0;
        this.top = 0;
        this.color = '';
        this.translateZ = 0;
        this.speed = 1;
    };

    BA.prototype = {
        createNew : function (text,speed) {
            this.elem = P.CreateElem();
            this.text = text;
            this.top = P.random.top();
            this.color = P.random.color();
            this.speed = speed;
            this.translateZ = P.random.translateZ();
            this.setElem();
            this.stay_move();
            P.insert(this.elem);
        },
        randomNew : function () {
            this.elem = P.CreateElem();
            this.text =(new ChinsesCart()).init();
            this.top = P.random.top();
            this.color = P.random.color();
            this.speed = P.random.speed();
            this.translateZ = P.random.translateZ();
            this.setElem();
            this.stay_move();
            P.insert(this.elem);
        },
        setElem : function () {
            this.elem.innerHTML = this.text;
            this.elem.className = _class_;
            this.elem.style.top = this.top + 'px';
            this.elem.style.right = this.right + 'px';
            this.elem.style.color = this.color;
            this.elem.style.webkitTransform = 'translateZ('+this.translateZ+'px)';

        },
        stay_move : function () {
            var _this = this;
            flashMap(60,function (timer) {
                if(typeof(_this) == 'undefined'||_this == null || _this == '') {return;}
                var speed = (_this.speed / 60).toFixed(2);
                var right = (_this.elem.style.right).replace("px","");
                if(right >= _maxWidth_){
                    _this.elem.parentNode.removeChild(_this.elem);
                    _this = null;
                    clearInterval(timer);
                    return ;
                }
                var add = parseFloat(right) + parseFloat(speed);
                _this.elem.style.right = add + 'px';
            })
        }
    };

    BA.setWindowWidth = function(width){
        _maxWidth_ = width;
    };

    var P = {};
    P.random = {
        top : function () {
            return Math.floor(Math.random()*355)+5;
        },
        speed : function () {
            return Math.floor(Math.random()*120)+120;
        },
        translateZ : function () {
            return Math.floor(Math.random()*100);
        },color : function () {
            return '#' + (function (color) {
                    return new Array(7 - color.length).join('0')+color;
                })((Math.random()*0x1000000 << 0).toString(16));
        }
    };
    P.CreateElem = function () {
        return document.createElement('div');
    };

    P.insert = function (elem) {
        var wrap = document.getElementById('BA-wrap');
        wrap.appendChild(elem);
    };

    /**
     * 能够修复因js定时器带来的延时差
     * @param fps  每秒多少帧  推荐60
     * @param callback  每次刷新执行的函数
     */
    var flashMap = function (fps,callback) {
        var prev = new Date();
        var acc = 0;
        var dt = 1000/fps;

        var loop = function () {
            var current = new Date();
            var passed = current - prev;
            prev = current;
            acc += passed;
            while(acc >= dt){
                if(typeof callback == 'function'){
                    callback(timer);
                }
                acc -= dt;
            }
        };
        var timer = setInterval(loop,1000/fps);
    };


    win.barrage = BA;
})(window);

(function(wind){



    var CC = function(){
    };


    CC.prototype = {
        init : function () {
            var num = this.randomNum();
            var cc = this.randomCC(num);
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



    window.ChinsesCart = CC;
})(window);



$(function () {
    delayCreateBarrage(1.5,function () {
        new barrage().randomNew();
    });

    $(".emit-btn").on("click",function(){
        var input =  $(this).parent().find(".emit-input");
        var checkedId = $(this).parent().find(".emit-radio:checked").attr("id");
        emitBarrage(input, checkedId);
    });
    $(".emit-input").on("keydown",function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key == 13) {
            var input = $(this).parent().find(".emit-input");
            var checkedId = $(this).parent().find(".emit-radio:checked").attr("id");
            emitBarrage(input, checkedId)
        }
    });

    $(window).resize(function () {
        barrage.setWindowWidth(document.body.clientWidth)
    });
});

var emitBarrage = function (input,checkedId) {
    var speed = 0;
    switch(checkedId){
        case "emit-slow":
            speed = 0+120;
            break;
        case "emit-normal":
            speed = 60+120;
            break;
        case "emit-fast":
            speed = 120+120;
            break;
    }
    if(input.val() == '') {return false;}
    new barrage().createNew(input.val(),speed);
    input.val('');
};


var delayCreateBarrage = function (s,callback) {
    var timer = setTimeout(function () {
        if(typeof callback == 'function'){
            callback();
            clearTimeout(timer);
        }
        delayCreateBarrage(s,callback);
    },s*1000);

};

