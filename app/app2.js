
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

        var WIDTH = 1000;
        var HEIGHT = 800;

        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99, true);

        // create a renderer instance.
        var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);

        // add the renderer view element to the DOM
        var gameDiv = $("#gameDiv");
        gameDiv.css("cursor", "none");
        gameDiv.append(renderer.view);

        var ball;

        var aimSprite;
        var tankSprite;

        var frameSpeed = 10;
        var counter = 0;
        var frame = 0;

        createBackground();
        createBall();
        createTank();
        createAim();

        requestAnimFrame( animate );

        stage.interactive = true;
        stage.mousemove = function(event) {
            aimSprite.position.x = event.global.x;
            aimSprite.position.y = event.global.y;
        }

        function createTank() {
            var texture = PIXI.Texture.fromImage("img/tankStrip.png");
            // create a new Sprite using the texture
            tankSprite = new PIXI.TilingSprite(texture,200,100);

            tankSprite.position.x = -200;
            tankSprite.position.y = 300;
            tankSprite.tilePosition.x = 0;
            tankSprite.tilePosition.y = -50;

            stage.addChild(tankSprite);
        }

        function animate() {

            requestAnimFrame( animate );

            // just for fun, lets rotate mr rabbit a little
            ball.rotation += 0.1;

            counter = (counter + 1) % frameSpeed;
            if (counter==0) {
                frame = frame + 1;
                if (frame==3) {
                    frame = 0;
                }
                tankSprite.tilePosition.x = frame * 200;
            }

            tankSprite.position.x += 1;

            // render the stage
            renderer.render(stage);
        }

        function createAim() {
            // create a texture from an image path
            var texture = PIXI.Texture.fromImage("img/aimSquare.png");
            // create a new Sprite using the texture
            aimSprite = new PIXI.Sprite(texture);

            // center the sprites anchor point
            aimSprite.anchor.x = 0.5;
            aimSprite.anchor.y = 0.5;
            aimSprite.height = 50;
            aimSprite.width = 50;

            stage.addChild(aimSprite);
        }

        function createBackground() {
            // create a texture from an image path
            var texture = PIXI.Texture.fromImage("img/background.jpg");
            // create a new Sprite using the texture
            var background = new PIXI.Sprite(texture);

            // center the sprites anchor point
            background.anchor.x = 0;
            background.anchor.y = 0;
            background.height = HEIGHT;
            background.width = WIDTH;
            background.position.x = 0;
            background.position.y = 0;

            stage.addChild(background);
        }

        function createBall() {
            // create a texture from an image path
            var texture = PIXI.Texture.fromImage("img/ball.png");
            // create a new Sprite using the texture
            ball = new PIXI.Sprite(texture);

            // center the sprites anchor point
            ball.anchor.x = 0.5;
            ball.anchor.y = 0.5;
            ball.height = 50;
            ball.width = 50;
            ball.position.x = 25;
            ball.position.y = 25;


            stage.addChild(ball);
        }

    }
);
