import { useEffect, useState } from "react"

const width = 8
const candyColors = [
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "red"
]

const App = () => {

  const [currentColorArr, setCurrentColorArr] = useState([])

   const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i+width*3]
      const decidedColor = currentColorArr[i]

      if (columnOfFour.every(square => currentColorArr[square] === decidedColor)) {
        columnOfFour.forEach(square=>currentColorArr[square]='')
      }
    }
  }

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArr[i]

      if (columnOfThree.every(square => currentColorArr[square] === decidedColor)) {
        columnOfThree.forEach(square=>currentColorArr[square]='')
      }
    }
  }

    const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArr[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      
      if(notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArr[square] === decidedColor)) {
        rowOfThree.forEach(square=>currentColorArr[square]='')
      }
    }
    }
  
    const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i+3]
      const decidedColor = currentColorArr[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47,53,54, 55,62, 63, 64, ]
      
      if(notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArr[square] === decidedColor)) {
        rowOfFour.forEach(square=>currentColorArr[square]='')
      }
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
      setCurrentColorArr([...currentColorArr])
    }, 100)
    return()=>clearInterval(timer)
  },[checkForRowOfFour, checkForColumnOfFour, checkForColumnOfThree, checkForRowOfThree, currentColorArr])

  console.log(currentColorArr)

  return (
    <>
      <div className="app">
        <div className="game">
          {currentColorArr.map((candyColors, index) => (
          <img
            key={index}
              style={{ backgroundColor: candyColors }}
              alt = {candyColors}
          />
          ))
          }
        </div>
      </div>
    </>
  );
}

export default App;
