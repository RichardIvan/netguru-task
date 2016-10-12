/* @flow */
'use strict'

import {
  fillButton
} from '../game'

export function fillButtons (wordArr, visibleWordsIndexes) {
  let buttonData
  const maxIndex = 11
  const numberOfEmptyButtons = maxIndex - wordArr.length
  const activeButtonData = []
  const lettersToGuess = {}

  const nonWordCharacter = /\W/

  for (var i = 0; i < wordArr.length; i++) {
    let elClass
    let letter
    let letterToGuess

    const currentLetter = wordArr[i]
    const letterShouldBeVisible = visibleWordsIndexes.indexOf(i) !== -1
    const isNotWordCharacter = nonWordCharacter.test(currentLetter)
    if (letterShouldBeVisible || isNotWordCharacter) {
      elClass = 'active'
      letter = currentLetter
    } else {
      elClass = 'active'
      letter = ''
      letterToGuess = currentLetter
    }

    activeButtonData.push({
      class: elClass,
      letter
    })

    if (letterToGuess) {
      const currentLetterInHash = lettersToGuess[letterToGuess]
      const currentIndex = i + numberOfEmptyButtons
      if (currentLetterInHash) {
        currentLetterInHash.push(currentIndex)
      } else {
        lettersToGuess[letterToGuess] = [currentIndex]
      }
    }
  }

  if (numberOfEmptyButtons > 0) {
    buttonData = new Array(numberOfEmptyButtons).fill('')
                                                .map(fillButton)
                                                .concat(activeButtonData)
  } else {
    buttonData = activeButtonData
  }

  return {
    buttonData,
    lettersToGuess
  }
}
