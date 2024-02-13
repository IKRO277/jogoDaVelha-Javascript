let check = false
let checkRepeat = 0
let x = document.querySelector(".x")
let o = document.querySelector(".o")
let boxes = document.querySelectorAll(".box")
let buttons = document.querySelectorAll("#buttons")

let iaArray

let messageContainer = document.querySelector("#message")
let messageText = document.querySelector("#message p")

let placar1 = document.querySelector("#scoreboard-1")
let placar2 = document.querySelector("#scoreboard-2")

let secondPlayer

let player1 = 0
let player2 = 0

let twoPlay = document.querySelector("#two-players")
let iaPlay = document.querySelector("#ia-player")

twoPlay.addEventListener("click", clickButton)
twoPlay.addEventListener("click", gameReset)
//iaPlay.addEventListener("click", iaInit)
//iaPlay.addEventListener("click", gameReset)


/*function iaInit() {
  let elements = document.querySelectorAll(".return")
  elements[0].style.display = "flex"
  elements[1].style.display = "block"

  for(let i = 0; i < boxes.length; i++) {
    box = boxes[i]
    box.addEventListener("click", playGame)
  }
 secondPlayer = iaPlay.getAttribute("id");
}*/
    


function clickButton() {
  let elements = document.querySelectorAll(".return")
  elements[0].style.display = "flex"
  elements[1].style.display = "block"

  for(let i = 0; i < boxes.length; i++) {
    box = boxes[i]
    box.addEventListener("click", playGame)
  }
  ia = false
}

function gameReset() {
  messageText.style.display = "none"
  for(let i = 0;i < boxes.length; i++) {
    let boxChild
    if(boxes[i].firstChild){
        boxChild = boxes[i].firstChild
        boxes[i].removeChild(boxChild)
    }
  }
  score1 = 0
  score2 = 0
  player1 = 0
  player2 = 0
  placar1.textContent = score1
  placar2.textContent = score2

  if(this.getAttribute("id") == "two-players" ){
    secondPlayer = twoPlay.getAttribute("id");
  }
  iaArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]
}

function gameResetWin() {
  messageText.style.display = "none"
  for(let i = 0;i < boxes.length; i++) {
    let boxChild
    if(boxes[i].firstChild){
        boxChild = boxes[i].firstChild
        boxes[i].removeChild(boxChild)
    }
  }
  for(let i = 0; i < boxes.length; i++) {
    box = boxes[i]
    box.addEventListener("click", playGame)
  }
}


//Code two Players


function playGame() {
  let check
  let box = this
  let el
  let xo
  if (box.childNodes.length == 0) {
    el = checkEl()
      let elClone = el.cloneNode(true)
      box.appendChild(elClone)
      elClone.style.display = "inline-block"
      xo = verifyXo(box)
      checaVitoria(xo)
      check = checaVitoria(xo)
    if (check) {
      for (let j = 0; j < boxes.length; j++) {
        boxes[j].removeEventListener("click", playGame);
      }
    }
  }
}


let checkEl = () => {
  if (player1 == player2) {
    player1++
    el = x

    /*if(secondPlayer == "ia-player") {
      player2++
      computerPLay()
    }*/

  } else {
    player2++
      el = o
  }
  return el
}

let checaVitoria = (xo) => {
  let counter = 0
  for (let i = 0; i < 4; i++) {
    let n = i
    if (n == 2) {
      n = 1
    }
    if (boxes[0 + 3 * i].querySelector(`${xo}`) && boxes[1 + 3 * i].querySelector(`${xo}`) && boxes[2 + 3 * i].querySelector(`${xo}`) ||
      boxes[0 + 1 * i].querySelector(`${xo}`) && boxes[3 + 1 * i].querySelector(`${xo}`) && boxes[6 + 1 * i].querySelector(`${xo}`) ||
      boxes[0 + 2 * n].querySelector(`${xo}`) && boxes[4].querySelector(`${xo}`) && boxes[8 - 2 * n].querySelector(`${xo}`)) {
      check = true
      if (check) {
        checkRepeat++
        checkVitory(check, xo, checkRepeat)
        return true
      }
    } else {
      for (let j = 0; j < boxes.length; j++) {
        if (boxes[j].childNodes[0]) {
          counter++
          if ((counter - 16) == 9) {
            messageText.textContent = "Velha"
            messageText.style.display = "block"
            setTimeout(() => {
              gameResetWin()
            }, 1000)
            return true
          }
        }
      }
    }
  }
}

let verifyXo = (value) => {
  if (value.querySelector(".o")) {
    xoResult = ".o"
  } else {
    xoResult = ".x"
  }
  return xoResult
}

let checkVitory = (checkvitory, xo, checkRepeat) => {
  if (checkvitory == true) {
    if (xo == ".x") {
        messageText.textContent = "jogador 1 ganhou"
        messageText.style.display = "block"
        if(checkRepeat % 2 != 0){
          placar1.textContent = parseInt(placar1.textContent) + 1
        }
        setTimeout(() => {
          gameResetWin()
        }, 1000)
    } else {
        messageText.textContent = "jogador 2 ganhou"
        messageText.style.display = "block"
        if(checkRepeat % 2 != 0){
          placar2.textContent = parseInt(placar2.textContent) + 1
        }
      setTimeout(() => {
        gameResetWin()
      }, 1000)
      
    }
  }
}

function computerPLay() {
  let cloneO = o.cloneNode(true)
  counter = 0
  filled = 0

  for(let i = 0; i < boxes.length; i++) {

    let randomNumber = Math.floor(Math.random() * 9)

    if(boxes[i].childNodes[0] == undefined) {
      if(randomNumber <= 1) {
        boxes[i].appendChild(cloneO)
        counter++
        break
      }else {
        filled++
      }

    }

  }

  if(counter == 0 && filled < 9){
    computerPLay()
  }

}