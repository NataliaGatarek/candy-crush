import { useEffect, useState } from "react"
import Black from "./img/black.PNG"
import BrownW from "./img/brown-white.PNG"
import Brown from "./img/brown.PNG"
import WhiteB from "./img/white-black.PNG"
import White from "./img/white.PNG"
import WhiteBe from "./img/white1.PNG"
import Blank from "./img/blank.PNG"

const width = 8
const candyColors = [
  Black,
  BrownW,
  Brown,
  WhiteB,
  White,
  WhiteBe
]

const App = () => {

  const [currentColorArr, setCurrentColorArr] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArr[i]

      if (columnOfFour.every(square => currentColorArr[square] === decidedColor)) {
        columnOfFour.forEach(square => currentColorArr[square] = Blank)
        return true
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArr[i]

      if (columnOfThree.every(square => currentColorArr[square] === decidedColor)) {
        columnOfThree.forEach(square => currentColorArr[square] = Blank)
        return true
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArr[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      
      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArr[square] === decidedColor)) {
        rowOfThree.forEach(square => currentColorArr[square] = Blank)
        return true
      }
    }
  }
  
  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArr[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64,]
      
      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArr[square] === decidedColor)) {
        rowOfFour.forEach(square => currentColorArr[square] = Blank)
        return true
      }
    }
  }
  
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)
      if (isFirstRow && currentColorArr[1] === '') {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArr[i] = candyColors[randomNumber]
      }
      if ((currentColorArr[i + width]) === '') {
        currentColorArr[i + width] = currentColorArr[i]
        currentColorArr[i] = ''
      }
    }
  }

  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = (e) => {
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))

    currentColorArr[squareBeingReplacedId] = squareBeingDragged.getAttribute("src")
    currentColorArr[squareBeingDraggedId] = squareBeingReplaced.getAttribute("src")

    const validMoves = [
      squareBeingDragged - 1,
      squareBeingDraggedId - width,
      squareBeingDragged + 2,
      squareBeingDraggedId +width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

  const isColumnOfFour =   checkForColumnOfFour()
    const isColumnOfThree =  checkForColumnOfThree()
    const isRowOfFour=   checkForRowOfFour()
    const isRowOfThree = checkForRowOfThree()
    
    if (squareBeingReplacedId && validMove && 
      (isRowOfThree || isRowOfFour || isColumnOfFour || isColumnOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentColorArr[squareBeingReplacedId] = squareBeingReplaced.getAttribute("src")
      currentColorArr[squareBeingDraggedId] = squareBeingDragged.getAttribute("src")
      setCurrentColorArr([...currentColorArr])
    }
  }

  const createBoard = () => {
    const randomColorArr = []
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArr.push(randomColor)
    }
    setCurrentColorArr(randomColorArr)
  }

  useEffect(() => {
      createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArr([...currentColorArr])
    }, 100)
    return()=>clearInterval(timer)
  },[checkForRowOfFour, checkForColumnOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArr])

console.log(currentColorArr)

  return (
    <>
      <div className="app">
        <div className="game">
          {currentColorArr.map((candyColors, index) => (
          <img
            key={index}
              src={candyColors}
              alt={candyColors}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
          />
          ))
          }
        </div>
      </div>
    </>
  );
}

export default App;
