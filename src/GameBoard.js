import { useEffect, useState } from "react"
import images from './data';
import Modal from './Modal'


function GameBoard(){
    const BLANK_CARD = "https://media.istockphoto.com/photos/close-up-of-a-black-slate-texture-background-stone-grunge-texture-picture-id1268759368?b=1&k=20&m=1268759368&s=170667a&w=0&h=DIY4qKF5cJYL4uO8C2OoxUMWaw34_j_TPhT7tZXKw5U="
    const [imagesArray, setImagesArray] = useState([])    
    const [cardsChosen, setCardsChosen] = useState([])    
    const [cardsChosenIds, setCardsChosenIds] = useState([])    
    const [points, setPoints] = useState(1)
    const [openCards, setOpenCards] = useState([])
    const [moves, setMoves] = useState(0)
    const [show, setShow] = useState(false)
    const [score, setScore] = useState(0)

const createGameBoard = () => {
    setMoves(0)
    // setPoints(1)
    const imagesPopulated = images.concat(...images)
    const shuffledArray = shuffleArray(imagesPopulated)
    setImagesArray(shuffledArray)
}

const moveCounter = () => {
    // moves = moves + 1
    setMoves(moves + 1)
    console.log("moves", moves)
    }
    

const calculateScore = () => {   
    console.log("why is score nto working", moves, points)
    let calc = 0
    let final = moves / 2
    if (final < 12) {
        calc = final * 5
        console.log("calc", calc)
        setScore(calc)
        console.log("your score is: ", score)
      } else if (final > 12 && final <= 24) {
        calc = final * 2
        console.log("Calc", calc)
        setScore(calc)
        console.log("your score is: ", score)
      } else if (final > 24) {
        calc = final * 1
        console.log("calc", calc)
        setScore(calc)
        console.log("your score is: ", score)
      }

}


const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {            
        const j = Math.floor(Math.random() * (i + 1));            
        [array[i], array[j]] = [array[j], array[i]];        
    }                
    return array 
}

const showModal = () => {
    setShow(true)
}

const hideModal = () => {
    setShow(false)
}

const flipImage = (image, idx) => {
    moveCounter()
if(cardsChosenIds.length === 1 && cardsChosenIds[0] === idx){
    return
}
if(cardsChosen.length < 2) {
    setCardsChosen(cardsChosen => cardsChosen.concat(image))
    setCardsChosenIds(cardsChosenIds => cardsChosenIds.concat(idx))

    if(cardsChosen.length === 1){
        if(cardsChosen[0] === image){
            setPoints(points => points + 1)
            console.log(points)
            setOpenCards(openCards => openCards.concat([cardsChosen[0], image]))
            console.log("opened cards", openCards.length)
        }
        setTimeout(() => {
            setCardsChosenIds([])
            setCardsChosen([])
        }, 1100)
        }
}
}

const gameEnd = () => {
    if(points === 8) {
        calculateScore()
        let finalMoves = Math.round(moves / 2)
        setMoves(finalMoves)
        showModal()
    }
}

const isCardChosen = (image, idx) => {
return cardsChosenIds.includes(idx) || openCards.includes(image)
}


const startOver = () =>  {
    setMoves(0) 
    const imagesPopulated = images.concat(...images)
    const shuffledArray = shuffleArray(imagesPopulated)     
    setImagesArray(shuffledArray)
    setCardsChosenIds([])        
    setCardsChosen([])        
    setPoints(0)        
    setOpenCards([])    
    setScore(0)
    setMoves(0)
}


useEffect(() => {
    createGameBoard()
}, [])

return (
    <div>
        <h2>Joy's Cute Cat Memory Game</h2>
        {/* <h3>Points: {points}</h3> */}
        <button className="button" onClick={startOver}>Start Over</button>
        <div className="board">
        <div className="game-board"> 
            {imagesArray.map((image, idx) => {
                return (
                    <div className="col-4 col-lg-2" key={idx} onClick={() => {flipImage(image, idx); gameEnd()}}> 
                    <img src={isCardChosen(image, idx) ? image : BLANK_CARD} alt="" className={`img-fluid img-fixed`} />
                    </div>
                )
            })}
        </div>
        <Modal show={show} close={hideModal} moves={moves} score={score}/>
        </div>
    </div>
)
}

export default GameBoard