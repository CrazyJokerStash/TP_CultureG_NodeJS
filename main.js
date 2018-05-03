#!/usr/bin/env node
let fs = require('fs')
let axios = require('axios')
let readline = require('readline-sync')
let program = require('commander')
let concQuestion = ""
let concReponse = ""
let count = 0
let concTabQuestion = {}
let concTabReponse = {}
let Promise = require('es6-promise').Promise;

program
  .version('0.1.0')
  .option('-s, --solo', 'Player alone')
  .option('-v, --versus', '1vs1')
  .option('-h, --help', 'Show the manual')
  .parse(process.argv);

async function quizz(str)
{
  return new Promise(function(resolve, reject)
  {
    count = 0
    let parsing = axios.get('https://opentdb.com/api.php?amount=10')
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
          for (let i = 1; i < concTabQuestion.length; i++)
          {
            console.log(concTabQuestion[i])
            const answer = readline.question("What is the answer ?\n")
          if (answer == concTabReponse[i])
          {
            console.log("Find ! Next !\n")
            count = count + 1
          }
          else
          {
            console.log('Fail ! it was ' + concTabReponse[i] + '\n')
          }
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
  {
    console.log("Player 1 win with " + score1 + " points\n")
    fs.writeFileSync("Resultat Quizz", "Player 1 win with " + score1 + " points", "UTF-8")
  }
  else if (score1 < score2)
  {
    console.log("Player 2 win with " + score2 + " points\n")
    fs.writeFileSync("Resultat Quizz", "Player 2 win with " + score2 + " points", "UTF-8")
  }
  else
  {
    console.log("Player 1 and 2 have same points\n")
    fs.writeFileSync("Resultat Quizz", "Player 1 and 2 have same points", "UTF-8")
  }
}

function manuel()
{
  console.log('If you want to play solo, just use \"-s\"')
  console.log('If you want to play with a friend, just use \"-v\"')
}

async function choix()
{
  if (program.solo)
  {
    quizz()
  }
  else if (program.versus)
  {
    let score1 = await quizz("Player 1 begin !\n")
    let score2 = await quizz("Player 2 begin !\n")
    scores(score1, score2)
  }
  else
  {
    manuel()
  }
}

choix()
