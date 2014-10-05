
require.config({
    baseUrl: "js",
    paths: {
        "d3": "d3",
        "jquery": "jquery-2.1.1"
    },
    shim: {
        jquery: {
            exports: ["jquery"]
        }
    }
});

require(["d3","jquery"],
function(d3, $) {

    "use strict";

    var CANVAS_WIDTH = 500;
    var CANVAS_HEIGHT = 300;

    var BORDER_WIDTH = 10;
    var CIRCLE_RADIUS = 10;

    var TAIL_COUNT = 30;
    var POINTER_TAIL_COUNT = 5;

    var model;
    var canvas;
    var context;

    var colorMap;
    var colorMap2;

    $(document).ready(function() {
        model = {
            tails: [],
            centerX: 10,
            centerY: 10,
            dirX: 5,
            dirY: 5,
            clientX: -1,
            clientY: -1,
            mouseTails: []
        };

        canvas = createCanvas();
        context = canvas.getContext('2d');

        colorMap = d3.interpolateRgb("yellow", "red");

        canvas.addEventListener("mousemove", mouseMove, false)

        $(canvas).css("cursor", "none");

        window.setInterval(function() {
            update();
            draw();
        }, (1000/60));
    });

    function mouseMove(event) {
        model.clientX = event.clientX;
        model.clientY = event.clientY;
    }

    function update() {
        model.tails.push({
            centerX: model.centerX,
            centerY: model.centerY
        });
        if (model.tails.length>TAIL_COUNT) { model.tails.shift(); }
        model.mouseTails.push({
            clientX: model.clientX,
            clientY: model.clientY
        });
        if (model.mouseTails.length>POINTER_TAIL_COUNT) { model.mouseTails.shift(); }
        if (model.centerX <= (BORDER_WIDTH+CIRCLE_RADIUS)) model.dirX = 5;
        if (model.centerX >= (CANVAS_WIDTH - (BORDER_WIDTH+CIRCLE_RADIUS))) model.dirX = -5;
        if (model.centerY <= (BORDER_WIDTH+CIRCLE_RADIUS)) model.dirY = 5;
        if (model.centerY >= (CANVAS_HEIGHT - (BORDER_WIDTH+CIRCLE_RADIUS))) model.dirY = -5;
        model.centerX += model.dirX;
        model.centerY += model.dirY;
    }

    function draw() {

        canvas.width = canvas.width;
        drawBorder();
        model.tails.forEach(function(item, index) {
            var color = colorMap(index/TAIL_COUNT);
            drawCircle(item.centerX, item.centerY, CIRCLE_RADIUS, color);
        });

//        model.mouseTails.forEach(function(item, index) {
//            drawPointer(item.clientX, item.clientY, true);
//        });

        drawCircle(model.centerX, model.centerY, CIRCLE_RADIUS, "red");
        drawPointer(model.clientX, model.clientY, false);
    }

    function createCanvas() {
        var canvas = document.createElement("canvas");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        var body = document.body;
        body.appendChild(canvas);

        return canvas;
    }

    function drawBorder() {
        context.beginPath();
        context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.fillStyle = 'yellow';
        context.fill();
        context.lineWidth = BORDER_WIDTH;
        context.strokeStyle = "black";
        context.stroke();
    }

    function drawPointer(centerX, centerY, tail) {
        var radius = 30;
        var color = tail ? "rgba(0,0,0,.05)" : "black";
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.lineWidth = 1;
        context.strokeStyle = color;
        context.stroke();
        context.beginPath();

        if (!tail) {
            drawLine(centerX - radius, centerY, centerX + radius, centerY)
            drawLine(centerX, centerY - radius, centerX, centerY + radius)
        }
    }

    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
        context.stroke();
    }

    function drawCircle(centerX, centerY, radius, color) {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = color;
        context.stroke();
    }

});
