var fs = require('fs')
var axios = require('axios')
var readline = require('readline-sync')
var concQuestion = ""
var concReponse = ""
var count = 0
var i = 1
var concTabQuestion = {}
var concTabReponse = {}
var Promise = require('es6-promise').Promise;

async function quizz(str)
{
  return new Promise(function(resolve, reject)
  {
    count = 0
    var parsing = axios.get('https://opentdb.com/api.php?amount=10')
    .then(function(response){
      try {
        for(item of response.data.results) {
          concQuestion = concQuestion + "//" + item.question
          concReponse = concReponse + "//" + item.correct_answer
          concTabQuestion = concQuestion.split("//")
          concTabReponse = concReponse.split("//")
        }
        if (str != null)
          console.log(str)
          while (i < concTabQuestion.length)
          {
            console.log(concTabQuestion[i])
            console.log(concTabReponse[i])
            const answer = readline.question("What is the answer ?\n")
          if (answer == concTabReponse[i])
          {
            console.log("Find ! Next !\n")
            count = count + 1
          }
          else
          {
            console.log('Fail ! Next !\n')
          }
          i++
        }
        console.log('You have ' + count + ' points\n')
        resolve(count)
      }
      catch(error){
        console.error(error)
      }
      });
  })
}

function scores(score1, score2)
{
  if (score1 > score2)
    console.log("Player 1 win with " + score1 + " points\n")
  else
    {
      console.log("Player 2 win with " + score2 + " points\n")
    }
}

function manuel()
{
  console.log('If you want to play solo, just use \"-solo\"')
  console.log('If you want to play with a friend, just use \"-versus\"')
}

async function choix()
{
  if (process.argv[2] == "-solo")
  {
    quizz()
  }
  else if (process.argv[2] == "-versus")
  {
    var score1 = await quizz("Player 1 begin !\n")
    var score2 = await quizz("Player 2 begin !\n")
    scores(score1, score2)
  }
  else if (process.argv[2] == "-h")
  {
    manuel()
  }
}

choix()
