/* @flow */
'use strict'

import { newWordResponse } from '../../actions/game'

export function newGame(dispatch) {
  new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
      // document.getElementById("demo").innerHTML = this.responseText;
        resolve(JSON.parse(this.response))
      }
    }
    xhttp.onerror = () => reject('I\'m very sad now')
    xhttp.open('GET', 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=11&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5', true)
    xhttp.send()
  })
  .then(response => {
    dispatch(newWordResponse(response.word))
  })
}
