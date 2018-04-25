var fs = require('fs')
var axios = require('axios')
var readline = require('readline-sync')
var concQuestion = ""
var concReponse = ""
var count = 0
var i = 1
var concTabQuestion = {}
var concTabReponse = {}

var parsing = axios.get('https://opentdb.com/api.php?amount=10')
.then(function(response){
  for(item of response.data.results) {
    concQuestion = concQuestion + "//" + item.question
    concReponse = concReponse + "//" + item.correct_answer
    concTabQuestion = concQuestion.split("//")
    concTabReponse = concReponse.split("//")
    }
    while (i < concTabQuestion.length)
    {
      console.log(concTabQuestion[i])
      const answer = readline.question("What is the answer ?\n")
      if (answer == concTabReponse[i])
      {
        console.log("Find ! Next !")
        count = count + 1;
      }
      else
      {
        console.log('Fail ! Next !')
      }
      i++
    }
    console.log('You have ' + count + ' points')
  });
