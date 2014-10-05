
require.config({
    baseUrl: "js",
    paths: {
        "d3": "d3",
        "pixi": "pixi.dev",
        "jquery": "jquery-2.1.1"
    },
    shim: {
        jquery: {
            exports: ["jquery"]
        }
    }
});

require(["d3","jquery","pixi"],
    function(d3, $, PIXI) {
        "use strict";

//        var canvas = document.createElement("canvas");
//        canvas.width = 512;
//        canvas.height = 384;

        $(document).ready(init);

        var stage;
        var renderer;
        var far;
        var mid;

        function init() {

            stage = new PIXI.Stage(0x66FF99);
            renderer = PIXI.autoDetectRenderer(512,384);
            $("#gameDiv").append(renderer.view);

            var farTexture = PIXI.Texture.fromImage("img/scroller/bg-far.png");
            far = new PIXI.TilingSprite(farTexture, 512, 256);
            far.position.x = 0;
            far.position.y = 0;
            far.tilePosition.x = 0;
            far.tilePosition.y = 0;
            stage.addChild(far);

            var midTexture = PIXI.Texture.fromImage("img/scroller/bg-mid.png");
            mid = new PIXI.TilingSprite(midTexture, 512, 256);
            mid.position.x = 0;
            mid.position.y = 128;
            stage.addChild(mid);

            requestAnimFrame(update);
//            renderer.render(stage);
        }

        function update() {

            far.tilePosition.x -= 0.128;
            mid.tilePosition.x -= 0.64;

            renderer.render(stage);
            requestAnimFrame(update);
        }
    }
);
