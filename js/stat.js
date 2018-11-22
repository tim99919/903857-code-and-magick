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

var leftCloudField = CLOUD_X + LEFT_GAP;
var upCloudField = CLOUD_Y + GAP;

var renderCloud = function (ctx, x, y, color) {
  var bezierCurvature = CLOUD_WIDTH * 0.2;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + CLOUD_WIDTH, y);
  ctx.bezierCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH + bezierCurvature, y + CLOUD_HEIGTH / 2, x + CLOUD_WIDTH, y + CLOUD_HEIGTH);
  ctx.lineTo(x, y + CLOUD_HEIGTH);
  ctx.bezierCurveTo(x, y + CLOUD_HEIGTH, x - bezierCurvature, y + CLOUD_HEIGTH / 2, x, y);
  ctx.closePath();
  ctx.fill();
};

var checkArrays = function (arr1, arr2) {
  var lengthDifference = arr1.length - arr2.length;
  if (lengthDifference > 0) {
    for (var i = 0; i < lengthDifference; i++) {
      arr2.push(0);
    }
  }
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  var getFillStyle = function (str) {
    if (str === 'Вы') {
      return 'rgba(255, 0, 0, 1)';
    }

    return 'rgba(0, 0, ' + (Math.floor(Math.random() * (255 - 55 + 1)) + 55) + ', ' + (Math.random() * (1 - 0.5) + 0.5) + ')';
  };

  var getBarRelativeHeight = function (value, maxValue) {
    if (maxValue === 0) {
      return 0;
    }
    return BAR_HEIGHT * value / maxValue;
  };

  checkArrays(names, times);
  renderCloud(ctx, CLOUD_X + GAP, upCloudField, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура, вы победили!', leftCloudField, upCloudField + FONT_GAP * 1);
  ctx.fillText('Список результатов:', leftCloudField, upCloudField + FONT_GAP * 2);

  for (var i = 0; i < names.length; i++) {
    var gapBetweenBars = (BAR_WIGHT + BAR_GAP) * i;
    var barXStartPosition = leftCloudField + gapBetweenBars;
    var barHeightRelative = getBarRelativeHeight(times[i], maxTime);
    var barYStartPosition = BAR_HEIGHT - barHeightRelative;

    // Отрисовка текста
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), barXStartPosition, upCloudField + FONT_GAP * 3.5 + barYStartPosition, TEXT_WIDTH);
    ctx.fillText(names[i], barXStartPosition, upCloudField + BAR_HEIGHT + FONT_GAP * 5, TEXT_WIDTH);

    // Отрисовка баров
    ctx.fillStyle = getFillStyle(names[i]);
    ctx.fillRect(barXStartPosition, upCloudField + FONT_GAP * 4 + barYStartPosition, BAR_WIGHT, barHeightRelative);
  }
};
