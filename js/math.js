function insertAnswer(id,ans){

}
var answerblock=0;
wincounter=0;

function getDropDownListValue(name) {
  var list = document.getElementById(name);
  return list.options[list.selectedIndex].value;
}

function wrongAnswer(rAnswer,pos,flag,op1,op2){
  var wrongAnsw = 0;
    for (let i = 0; i <= 4 && wrongAnsw != answerblock; i++) {
      if(i == pos){i++;}
      do{
        switch (flag){
          case 1:
            wrongAnsw=Math.floor(Math.random()*Math.floor(op1 + 10) + Math.random()*Math.floor(op2 + 10));
            break;
          case 2:
            wrongAnsw=Math.floor(Math.random()*Math.floor(op1 + 10) - Math.random()*Math.floor(op2 + 10));
            break;
          case 3:
            wrongAnsw=Math.floor(Math.random()*Math.floor(op1 + 3) * Math.random()*Math.floor(op2 + 3));
            break;
          case 4:
            wrongAnsw=Math.floor(Math.random()*Math.floor(op1 + 3) / Math.random()*Math.floor(op2 + 3));
            break;
        }
      }while(wrongAnsw==rAnswer)
      try{
        document.getElementById(i.toString()).innerHTML = wrongAnsw;
      }
      catch (e){
        console.log(e.message);
      }
    }
}

function generateEquations(){
    var typeOfEquations = getDropDownListValue("typeOfEquations");
    var numberOfDigits = getDropDownListValue("numberOfDigits");
    var operandFlag;
    let operands=['+','-','x','/'];
    var operand1, operand2, operator, equation;
    switch(typeOfEquations) {
      case '1':
          operator=['+'];
          document.getElementById('title').innerHTML='Събиране';
          operandFlag = 1;
          break;
      case '2':
          operator=['-'];
          document.getElementById('title').innerHTML='Изваждане';
          operandFlag = 2;
          break;
      case '3':
          document.getElementById('title').innerHTML='Умножение';
          operator=['x'];
          operandFlag = 3;
          break;
      case '4':
          document.getElementById('title').innerHTML='Деление';
          operator=['/'];
          operandFlag = 4;
          break;
      case '5':
          document.getElementById('title').innerHTML='Всичко';
          operandFlag = Math.floor(Math.random()*4 + 1);
          switch(operandFlag){
            case 1:
              operator=['+'];
              break;
            case 2:
              operator=['-'];
              break;
            case 3:
              operator=['x'];
              break;
            case 4:
              operator=['/'];
              break;
          }
          break;
   }
    operand1 = Math.floor((Math.random() * (Math.pow(10,numberOfDigits)+1)));
    operand2 = Math.floor((Math.random() * (Math.pow(10,numberOfDigits)+1)));

    equation = String(operand1) + ' ' + operator + ' ' + String(operand2) + ' =';

    document.getElementById('problem').innerHTML = equation;
    var rightAnswer = Math.floor(Math.random()*Math.floor(4));

    switch(operandFlag){
      case 1:
        answerblock=operand1 + operand2;
        document.getElementById(rightAnswer.toString()).innerHTML = answerblock;
        wrongAnswer(answerblock,rightAnswer,operandFlag,operand1,operand2);
        break;
      case 2:
        answerblock=operand1 - operand2;
        document.getElementById(rightAnswer.toString()).innerHTML = answerblock;
        wrongAnswer(answerblock,rightAnswer,operandFlag,operand1,operand2);
        break;
      case 3:
        answerblock=operand1 * operand2;
        document.getElementById(rightAnswer.toString()).innerHTML = answerblock;
        wrongAnswer(answerblock,rightAnswer,operandFlag,operand1,operand2);
        break;
      case 4:
        answerblock=operand1 / operand2;
        document.getElementById(rightAnswer.toString()).innerHTML = answerblock;
        wrongAnswer(answerblock,rightAnswer,operandFlag,operand1,operand2);
        break;
      case 5:
        var randFlag = Math.floor((Math.random() * (Math.pow(4,numberOfDigits)+1)));
        switch(randFlag){
          case 1:
            answerblock=operand1 + operand2;
            document.getElementById(rightAnswer.toString()).innerHTML = answerblock;
            wrongAnswer(answerblock,rightAnswer,randFlag,operand1,operand2);
            break;
          case 2:
            answerblock=operand1 - operand2;
            document.getElementById(rightAnswer.toString()).innerHTML = answerblock;
            wrongAnswer(answerblock,rightAnswer,randFlag,operand1,operand2);
            break;
          case 3:
            answerblock=operand1 * operand2;
            document.getElementById(rightAnswer.toString()).innerHTML = answerblock;
            wrongAnswer(answerblock,rightAnswer,randFlag,operand1,operand2);
            break;
          case 4:
            answerblock=operand1 / operand2;
            document.getElementById(rightAnswer.toString()).innerHTML = answerblock;
            wrongAnswer(answerblock,rightAnswer,randFlag,operand1,operand2);
            break;
    }
  }
}

function checkAnswer(id)
  {
    var content;
    content = document.getElementById(id).innerHTML;
    if(content==answerblock){
      wincounter=wincounter+1;
      document.getElementById('correctCounter').innerHTML=wincounter;
      generateEquations();
    }
    else {
      wincounter=0;
      alert("Грешка");
      document.getElementById("0").innerHTML = "";
      document.getElementById("1").innerHTML = "";
      document.getElementById("2").innerHTML = "";
      document.getElementById("3").innerHTML = "";
      document.getElementById('correctCounter').innerHTML=wincounter;
      generateEquations();
    }

  }