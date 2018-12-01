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
var WIZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userWizardCoat = userDialog.querySelector('.setup-wizard').querySelector('.wizard-coat');
var userWizardEyes = userDialog.querySelector('.setup-wizard').querySelector('.wizard-eyes');
var userFireball = userDialog.querySelector('.setup-fireball-wrap');
var userInputs = userDialog.querySelectorAll('input');
var inputCoatColor = userInputs[2];
var inputEyesColor = userInputs[3];
var inputFireballColor = userInputs[4];

var onUserDialogEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideUserDialog();
  }
};

var showUserDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onUserDialogEscPress);
  userWizardCoat.addEventListener('click', changeWizardCoatColor);
  userWizardEyes.addEventListener('click', changeWizardEyesColor);
  userFireball.addEventListener('click', changeFireballColor);
};

var hideUserDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onUserDialogEscPress);
  userWizardCoat.removeEventListener('click', changeWizardCoatColor);
  userWizardEyes.removeEventListener('click', changeWizardEyesColor);
  userFireball.removeEventListener('click', changeFireballColor);
};

var getRandInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandElement = function (arr) {
  return arr[getRandInt(0, arr.length - 1)];
};

var getWizardsName = function (firstname, lastname) {
  if (getRandInt(0, 1) === 1) {
    return getRandElement(firstname) + ' ' + getRandElement(lastname);
  }
  return getRandElement(lastname) + ' ' + getRandElement(firstname);
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
  var setupDialog = userDialog.querySelector('.setup-similar');
  setupDialog.classList.remove('hidden');
};

var changeWizardCoatColor = function () {
  var newColor = getRandElement(WIZARD_COATCOLORS);
  userWizardCoat.style.fill = newColor;
  inputCoatColor.value = newColor;
};

var changeWizardEyesColor = function () {
  var newColor = getRandElement(WIZARD_EYECOLORS);
  userWizardEyes.style.fill = newColor;
  inputEyesColor.value = newColor;
};

var changeFireballColor = function () {
  var newColor = getRandElement(WIZARD_FIREBALL_COLORS);
  userFireball.style.background = newColor;
  inputFireballColor.value = newColor;
};

showSimilarWizards();
showSetupDialog();

userDialogOpen.addEventListener('click', showUserDialog);
userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showUserDialog();
  }
});

userDialogClose.addEventListener('click', hideUserDialog);
userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideUserDialog();
  }
});
