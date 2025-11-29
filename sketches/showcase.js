const BASE_WIDTH = 800;
const BASE_HEIGHT = 600;
let slideId = 0;
let maxSlideId = 15;
let middleX, middleY;
let thirdX, twoThirdsX;
let thirdY, twoThirdsY;
let quarterY, threeQuartersY;
let quarterX, threeQuartersX;
let t;
let startSlide = true;
let bg = 10;
let tweenInstance;
let gValue = 0;
let h = 0;
let x = 0;
let y = 0;
let r = 0;
let counter = 0;
let balls = [];
let canvas;

function output(...args) {
    console.log(...args);
}

function setup() {
    canvas = createCanvas(BASE_WIDTH, BASE_HEIGHT);
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        canvas.parent(mainContainer);
    }
    textAlign(CENTER, CENTER);
    textSize(24);
    resizeSketch();
    noFill();
    colorMode(HSB);
    background(bg);

}

function resizeSketch() {
    const header = document.querySelector('header');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const availableWidth = Math.max(windowWidth - 32, 320);
    const availableHeight = Math.max(windowHeight - headerHeight - 32, 200);
    const widthScale = availableWidth / BASE_WIDTH;
    const heightScale = availableHeight / BASE_HEIGHT;
    const scale = Math.min(widthScale, heightScale, 1);
    const targetWidth = Math.round(BASE_WIDTH * scale);
    const targetHeight = Math.round(BASE_HEIGHT * scale);
    resizeCanvas(targetWidth, targetHeight);
    setPositions();
    background(bg);
}

function setPositions() {
    middleX = width / 2;
    middleY = height / 2;
    thirdX = width / 3;
    thirdY = height / 3;
    twoThirdsX = width / 3 * 2;
    twoThirdsY = height / 3 * 2;
    quarterY = height / 4;
    threeQuartersY = height / 4 * 3;
    quarterX = width / 4;
    threeQuartersX = width / 4 * 3;
}

function draw() {

    slideSelector(slideId);

}

function windowResized() {
    resizeSketch();
}

function initSlide() {
    startSlide = false;
}
function mousePressed() {
    if (mouseButton === LEFT) {
        if (slideId < maxSlideId) {
            slideId++;
            startSlide = true;
        }
    }
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        if (slideId < maxSlideId) {
            slideId++;
            startSlide = true;
        }
    } else if (keyCode == LEFT_ARROW) {
        if (slideId > 0) {
            slideId--;
            startSlide = true;
        }
    }

}

function slideSelector(id) {
    window["slide" + id]();

}

function slide0() {
    background(bg);
    strokeWeight(5);
    stroke("red");
    point(middleX, middleY);
}

function slide1() {
    background(bg);
    if (startSlide) {
        startSlide = false;
        t = { x1: middleX, x2: middleX };
        p5.tween.manager.addTween(t, 'tween1')
            .addMotions([
                { key: 'x1', target: quarterX },
                { key: 'x2', target: threeQuartersX }
            ], 100, 'easeInOutCubic').startTween();;
    }
    point(t.x1, middleY);
    point(t.x2, middleY);
}

function slide2() {
    if (startSlide) {
        background(10);
        startSlide = false;
        t = { x1: quarterX };
        p5.tween.manager.addTween(t, 'tween1')
            .addMotions([
                { key: 'x1', target: threeQuartersX },
            ], 600, 'easeInOutCubic').startTween();;
    }
    point(threeQuartersX, middleY);
    line(quarterX, middleY, t.x1, middleY);
}

function slide3() {
    background(bg);
    if (startSlide) {
        initSlide();
        t = { y1: middleY, y2: middleY };
        p5.tween.manager.addTween(t, 'tween1')
            .addMotions([
                { key: 'y1', target: quarterY },
                { key: 'y2', target: threeQuartersY },
            ], 600, 'easeInOutCubic').startTween();;
    }
    line(quarterX, t.y2, threeQuartersX, t.y2);
    line(quarterX, t.y2, middleX, t.y1);
    line(threeQuartersX, t.y2, middleX, t.y1);
}

function slide4() {
    background(bg);
    if (startSlide) {
        initSlide();
        t = { x1: middleX, x2: middleX, y: threeQuartersY, x3: quarterX, x4: threeQuartersX };
        p5.tween.manager.addTween(t, 'tween1')
            .addMotions([
                { key: 'x1', target: middleX - quarterY },
                { key: 'x2', target: middleX + quarterY },
                { key: 'y', target: threeQuartersY },
                { key: 'x3', target: middleX - quarterY },
                { key: 'x4', target: middleX + quarterY },
            ], 600, 'easeInOutCubic').startTween();;
    }
    line(t.x3, t.y, t.x4, t.y);
    line(t.x3, t.y, t.x1, quarterY);
    line(t.x4, t.y, t.x2, quarterY);
    line(middleX, quarterY, t.x1, quarterY);
    line(middleX, quarterY, t.x2, quarterY);
}
function slide5() {
    background(bg);
    if (startSlide) {
        initSlide();
        rectMode(CORNERS);
        t = { x1: middleX - quarterY };
        p5.tween.manager.addTween(t, 'tween1')
            .addMotions([
                { key: 'x1', target: middleX + quarterY },
            ], 600, 'easeInOutCubic').startTween();;
    }
    stroke("red");
    noFill();
    rect(middleX - quarterY, quarterY, middleX + quarterY, threeQuartersY);
    fill("red");
    rect(middleX - quarterY, quarterY, t.x1, threeQuartersY);
}

function slide6() {
    background(bg);
    if (startSlide) {
        rectMode(CENTER);
        noStroke();
        initSlide();
        t = { r: quarterY, s: quarterY * 2, h: 0 };
        p5.tween.manager.addTween(t, 'tween1')
            .addMotions([
                { key: 'r', target: twoThirdsY },
                { key: 's', target: 0 },
                { key: 'h', target: 180 }
            ], 600, 'easeInOutCubic').startTween();;
    }
    fill(t.h, 100, 100);
    rect(middleX, middleY, t.s);
    circle(middleX, middleY, t.r);
}

function slide7() {
    background(bg);
    if (startSlide) {
        noStroke();
        initSlide();
        t = { r: twoThirdsY, x1: middleX, y1: middleY, h: 180 };
        p5.tween.manager.addTween(t, 'tween1')
            .addMotions([
                { key: 'r', target: width / 20 },
                { key: 'x1', target: width / 20 },
                { key: 'y1', target: middleY },
                { key: 'h', target: 360 }
            ], 600, 'easeInOutCubic').startTween();;
    }
    fill(t.h, 100, 100);
    circle(t.x1, t.y1, t.r);
}

function slide8() {

    if (startSlide) {
        gValue = width / 20;
        background(bg);
        noStroke();
        initSlide();
        t = { x1: width / 20 * 2, h: 0 };
        tweenInstance = p5.tween.manager.addTween(t, 'tween1')
            .addMotions([
                { key: 'x1', target: width - width / 20 + 1 },
                { key: 'h', target: 360 }
            ], 600, 'easeOutCubic').startTween();
    }
    if (tweenInstance.active) {
        if (t.x1 > gValue) {
            fill(t.h, 100, 100);
            circle(gValue, middleY, width / 20);
            gValue += width / 20;
        }
    }

}


function slide9() {
    if (startSlide) {
        gValue = width / 20;
        background(bg);
        noStroke();
        initSlide();
        t = { y1: 0 };
        tweenInstance = p5.tween.manager.addTween(t, 'tween1')
            .addMotions([
                { key: 'y1', target: middleY - width / 20 },
            ], 600, 'easeOutSin').startTween();
    }
    for (let i = 0; i < 19; i++) {
        fill(i * 20, 100, 100);
        circle(width / 20 + i * (width / 20), middleY, width / 20);
        if (tweenInstance.active) {
            circle(width / 20 + i * (width / 20), middleY - gValue, width / 20);
            circle(width / 20 + i * (width / 20), middleY + gValue, width / 20);

        }
    }
    if (tweenInstance.active) {
        if (t.y1 > gValue) {
            output(t.y1 + " > " + gValue);
            gValue += width / 20;
        }
    }

}

function slide10() {
    background(bg);
    if (startSlide) {
        noStroke();
        initSlide();
        t = { x1: width / 20, x2: width / 20 };
        tweenInstance = p5.tween.manager.addTween(t, 'tween1')
            .addMotions([
                { key: 'x1', target: width / 20 - width / 80 },
                { key: 'x2', target: width / 20 + width / 80 },
            ], 600, 'easeOutSin').startTween();
    }
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 15; j++) {
            fill(i * 20, 100, 100);
            if (j % 2 == 0) {
                circle(t.x1 + i * (width / 20), width / 40 + j * width / 20, width / 20);
            }
            else {
                circle(t.x2 + i * (width / 20), width / 40 + j * width / 20, width / 20);
            }
        }
    }
}


function slide11() {
    background(bg);
    if (startSlide) {
        noStroke();
        initSlide();
        balls = [];
        for (let i = 0; i < 19; i++) {
            for (let j = 0; j < 15; j++) {
                let ball = {
                    x: (j % 2 == 0) ? width / 20 - width / 80 + i * (width / 20) : width / 20 + width / 80 + i * (width / 20),
                    y: width / 40 + j * width / 20,
                    h: i * 20,
                    size: width / 20,
                    xSpeed: random(-4, 4),
                    ySpeed: random(-4, 4)
                };
                balls.push(ball);
            }
        }
    }
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 15; j++) {
            let d = dist(balls[i * 15 + j].x, balls[i * 15 + j].y, mouseX, mouseY);
            balls[i * 15 + j].size = map(d, 0, width / 2, 2, width / 30);
            fill(balls[i * 15 + j].h, 100, 100);
            circle(balls[i * 15 + j].x, balls[i * 15 + j].y, balls[i * 15 + j].size);
        }
    }
    fill(0, 0, 100);
    text("Move the mouse around!", width / 2, height - 40);
}

function slide12() {
    background(bg);
    if (startSlide) {
        noStroke();
        initSlide();
    }
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 15; j++) {
            fill(balls[i * 15 + j].h, 100, 100);
            circle(balls[i * 15 + j].x, balls[i * 15 + j].y, balls[i * 15 + j].size);
            balls[i * 15 + j].x += balls[i * 15 + j].xSpeed;
            balls[i * 15 + j].y += balls[i * 15 + j].ySpeed;
            if (balls[i * 15 + j].x < balls[i * 15 + j].size / 2 || balls[i * 15 + j].x > width - balls[i * 15 + j].size / 2) {
                balls[i * 15 + j].xSpeed *= -1;
            }
            if (balls[i * 15 + j].y < balls[i * 15 + j].size / 2 || balls[i * 15 + j].y > height - balls[i * 15 + j].size / 2) {
                balls[i * 15 + j].ySpeed *= -1;
            }
        }
    }

}
function slide13() {
    background(bg);
    if (startSlide) {
        noStroke();
        initSlide();
        if (balls.length == 0) {
            balls = [];
            for (let i = 0; i < 19; i++) {
                for (let j = 0; j < 15; j++) {
                    let ball = {
                        x: (j % 2 == 0) ? width / 20 - width / 80 + i * (width / 20) : width / 20 + width / 80 + i * (width / 20),
                        y: width / 40 + j * width / 20,
                        h: i * 20,
                        size: width / 20,
                        xSpeed: random(-4, 4),
                        ySpeed: random(-4, 4)
                    };
                    balls.push(ball);
                }
            }
        } else {
            for (let i = 0; i < 19; i++) {
                for (let j = 0; j < 15; j++) {
                    circle(balls[i * 15 + j].x, balls[i * 15 + j].y, balls[i * 15 + j].size);
                    balls[i * 15 + j].ySpeed = random(15, 20);
                }
            }
        }
    }
    fill(0, 100, 100);
    circle(middleX, middleY, 50);
    for (let i = 0; i < 19; i++) {
        for (let j = 0; j < 15; j++) {
            fill(balls[i * 15 + j].h, 100, 100);
            circle(balls[i * 15 + j].x, balls[i * 15 + j].y, balls[i * 15 + j].size);
            if (balls[i * 15 + j].y < height + balls[i * 15 + j].size / 2) {
                balls[i * 15 + j].y += balls[i * 15 + j].ySpeed;
                balls[i * 15 + j].x += balls[i * 15 + j].xSpeed;
            }
        }

    }
}

function slide14() {

    if (startSlide) {
        background(bg);
        noStroke();
        initSlide();
        r = 0;
        h = 0;
        h = 0;
    }
    fill(h % 360, 100, 100);
    h += 0.9;
    r += 2;
    x = middleX + cos(radians(h * 3) * 5) * (r % (width / 5 * 3));
    y = middleY + sin(radians(h * 3) * 5) * (r % (width / 5 * 3));
    circle(x, y, 50);
    output(r);

}
function slide15() {

    if (startSlide) {

        noStroke();
        initSlide();
        x = -width / 20;
        counter = 0;
    }
    if (counter < 40) {
        background(bg, 0.05);
        counter++;
    } else if (counter == 40) {
        background(bg);
        counter++;
    } else {

        fill(h % 360, 100, 100);
        circle(x % width, noise(frameCount / 100) * height, 50);
        x += 10;
        h++;
    }
}