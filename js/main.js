var $checkboxButtons = document.querySelectorAll('.checkbox');
function handleCheckedBox(event) {
  for (let index = 0; index < $checkboxButtons.length; index++) {
    $checkboxButtons[index].classList.remove('checked-box');
  }
  var $checkboxTarget = event.target.parentNode.parentNode.getAttribute('id');
  $checkboxTarget = '.checkbox-' + $checkboxTarget;
  $checkboxTarget = document.querySelector($checkboxTarget);
  $checkboxTarget.classList.add('checked-box');
}

var $noFilter = document.querySelector('#no-filter');
var $controllers = document.querySelector('#controllers');
var $duelists = document.querySelector('#duelists');
var $initiators = document.querySelector('#initiators');
var $sentinels = document.querySelector('#sentinels');

$noFilter.addEventListener('click', handleCheckedBox);
$controllers.addEventListener('click', handleCheckedBox);
$duelists.addEventListener('click', handleCheckedBox);
$initiators.addEventListener('click', handleCheckedBox);
$sentinels.addEventListener('click', handleCheckedBox);
