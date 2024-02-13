function computerPLay() {
  let cloneO = o.cloneNode(true)
  counter = 0
  filled = 0

  for(let i = 0; i < boxes.length; i++) {

    let randomNumber = Math.floor(Math.random() * 5)

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