'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGTH = 270;

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
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  ctx.fillText('Ура, вы победили!', 110, 20);

  // for (var i = 0; i < names.length; i++) {
  //   ctx.fillText(names[i], );
  // }
};
