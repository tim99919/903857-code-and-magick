'use strict';

var WIZARD_FIRSTNAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_LASTNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var WIZARD_COATCOLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYECOLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var showUserDialog = function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
};

var getRandInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandElement = function (arr) {
  return arr[getRandInt(0, arr.length - 1)];
};

var getWizardsName = function (arr1, arr2) {
  if (getRandInt(0, 1) === 1) {
    return getRandElement(arr1) + ' ' + getRandElement(arr2);
  }
  return getRandElement(arr2) + ' ' + getRandElement(arr1);
};

var getSimilarWizards = function () {
  var similarWizards = [];
  for (var i = 0; i < 4; i++) {
    similarWizards.push(
        {
          name: getWizardsName(WIZARD_FIRSTNAMES, WIZARD_LASTNAMES),
          coatColor: getRandElement(WIZARD_COATCOLORS),
          eyesColor: getRandElement(WIZARD_EYECOLORS)
        }
    );
  }

  return similarWizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var showSimilarWizards = function () {
  var similarWizards = getSimilarWizards();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < similarWizards.length; i++) {
    fragment.appendChild(renderWizard(similarWizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var showSetupDialog = function () {
  var setupDialog = document.querySelector('.setup-similar');
  setupDialog.classList.remove('hidden');
};

showUserDialog();
showSimilarWizards();
showSetupDialog();
