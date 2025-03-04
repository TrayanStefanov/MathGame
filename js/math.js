function insertAnswer(id, ans) {

}
var rightAnswer = "0";
var wincounter = 0;
var operators = ["+", "-", "*", "/"];


function getSelectedCheckboxes(name) {
  var list = document.getElementsByName(name);
  var selected = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].checked) {
      selected.push(list[i].value);
    }
  }
  return selected;
}

function wrongAnswer(rAnswer, pos, oprtrs, digits, oprnds) {
  var wrongAnswer;
  for (let i = 0; i < 4 && wrongAnswer != rAnswer; i++) {
    if (i == pos) { i++; }
    do {
      let operands = [];
      generateOperands(digits, oprnds, operands);
      let equation = generateEquationAnswers(oprtrs, operators, operands);
      wrongAnswer = eval(equation);
    }
    while (wrongAnswer == rAnswer)
    document.getElementById(i.toString()).innerHTML = wrongAnswer;
  }
}

function selectNumberofOperands(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectNumberofDigits(min, max) {
  return Math.floor(Math.random() * max + min);
}

function selectRandomOperator(min, max) {
  return Math.floor(Math.random() * max + min);
}

function generateOperands(numberOfDigits, numberOfOperands, operands) {
  if (numberOfOperands.length == 1) {
    if (numberOfDigits.length == 1) {
      for (let i = 0; i < numberOfOperands[0]; i++) {
        operands.push(Math.floor((Math.random() * (Math.pow(10, numberOfDigits[0]) + 1))));
      }
    } else {
      let minD = Math.min(...numberOfDigits);
      let maxD = Math.max(...numberOfDigits);
      for (let i = 0; i < numberOfOperands[0]; i++) {
        operands.push(Math.floor((Math.random() * (Math.pow(10, selectNumberofDigits(minD, maxD)) + 1))));
      }
    }
  } else {
    let minO = Math.min(...numberOfOperands);
    let maxO = Math.max(...numberOfOperands);
    let curNumverOfOperands = selectNumberofOperands(minO, maxO);
    if (numberOfDigits.length == 1) {
      for (let i = 0; i < curNumverOfOperands; i++) {
        operands.push(Math.floor((Math.random() * (Math.pow(10, numberOfDigits[0]) + 1))));
      }
    } else {
      let minD = Math.min(...numberOfDigits);
      let maxD = Math.max(...numberOfDigits);
      for (let i = 0; i < curNumverOfOperands; i++) {
        operands.push(Math.floor((Math.random() * (Math.pow(10, selectNumberofDigits(minD, maxD)) + 1))));
      }
    }
  }
  return operands;
}

function generateEquationAnswers(selectedOperators, operators, operandsArray) {
  do{
    var equation = "";
    for (let i = 0; i < operandsArray.length; i++) {
      equation += operandsArray[i];
      var operatorId = selectedOperators[selectRandomOperator(1, selectedOperators.length) - 1];
      if (i < operandsArray.length - 1) {
        equation += ' ' + operators[operatorId - 1] + ' ';
      }
    }
  } while (eval(equation)%1 != 0 && eval(equation) != -0);
  return equation;
}
function generateEquation() {
  var selectedOperators = getSelectedCheckboxes("operator");
  var numberOfOperands = getSelectedCheckboxes("operands");
  var numberOfDigits = getSelectedCheckboxes("digits");
  var operands = [];
  var problem = "";
  let operandsArray = generateOperands(numberOfDigits, numberOfOperands, operands);
  problem = generateEquationAnswers(selectedOperators, operators, operandsArray);
  rightAnswer = eval(problem);
  problem += ' = ';
  document.getElementById('problem').innerHTML = problem;
  var rightAnswerPosition = Math.floor(Math.random() * Math.floor(4));
  document.getElementById(rightAnswerPosition.toString()).innerHTML = rightAnswer;
  wrongAnswer(rightAnswer, rightAnswerPosition, selectedOperators, numberOfDigits, numberOfOperands);
}


function checkAnswer(id) {
  var content;
  content = document.getElementById(id).innerHTML;
  if (content == rightAnswer) {
    wincounter = wincounter + 1;
    document.getElementById('correctCounter').innerHTML = wincounter;
    generateEquation();
  }
  else {
    wincounter = 0;
    alert("Грешка");
    document.getElementById("0").innerHTML = "";
    document.getElementById("1").innerHTML = "";
    document.getElementById("2").innerHTML = "";
    document.getElementById("3").innerHTML = "";
    document.getElementById('correctCounter').innerHTML = wincounter;
    generateEquation();
  }

}
