'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGTH = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var LEFT_GAP = 30;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150;
var BAR_WIGHT = 40;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.bezierCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH + CLOUD_WIDTH * 0.2, y + CLOUD_HEIGTH / 2, x + CLOUD_WIDTH, y + CLOUD_HEIGTH);
  ctx.lineTo(x, y + CLOUD_HEIGTH);
  ctx.bezierCurveTo(x, y + CLOUD_HEIGTH, x - CLOUD_WIDTH * 0.2, y + CLOUD_HEIGTH / 2, x, y);
  ctx.closePath();
  ctx.fill();
};

window.renderStatistics = function (ctx, names, times) {
  var names = ['qwer', 'Вы', 'cvb', 'dfg'];
  var times = [];


  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура, вы победили!', CLOUD_X + LEFT_GAP, CLOUD_Y + GAP + FONT_GAP * 1);
  ctx.fillText('Список результатов:', CLOUD_X + LEFT_GAP, CLOUD_Y + GAP + FONT_GAP * 2);

  var getMaxTime = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = times[i];
      }
    }

    return maxElement;
  };

  // Проверка на соответствие длин масивов для имен игроков и результата игры
  var checkArrays = function (arr1, arr2) {
    var lengthDifference = arr1.length - arr2.length;
    if (lengthDifference > 0) {
      for (var i = 0; i < lengthDifference; i++) {
        arr2.push(0);
      }
    }
  };

  checkArrays(names, times);

  for (var i = 0; i < names.length; i++) {
    console.log(times[i]);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + LEFT_GAP + (BAR_WIGHT + BAR_GAP) * i, CLOUD_Y + GAP + FONT_GAP * 3.5 + (BAR_HEIGHT - BAR_HEIGHT * times[i] / getMaxTime(times)), TEXT_WIDTH);
    ctx.fillText(names[i], CLOUD_X + LEFT_GAP + (BAR_WIGHT + BAR_GAP) * i, CLOUD_Y + GAP + BAR_HEIGHT + FONT_GAP * 5, TEXT_WIDTH);
    ctx.fillStyle = 'rgba(0, 0, ' + (Math.floor(Math.random() * (255 - 55 + 1)) + 55) + ', ' + (Math.random() * (1 - 0.5) + 0.5) + ')';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + LEFT_GAP + (BAR_WIGHT + BAR_GAP) * i, CLOUD_Y + GAP + FONT_GAP * 4 + (BAR_HEIGHT - BAR_HEIGHT * times[i] / getMaxTime(times)), BAR_WIGHT, BAR_HEIGHT * times[i] / getMaxTime(times));
  }
};
