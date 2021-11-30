import { useEffect, useState } from "react"
import images from './data';

function GameBoard(){

    const BLANK_CARD = "https://media.istockphoto.com/photos/close-up-of-a-black-slate-texture-background-stone-grunge-texture-picture-id1268759368?b=1&k=20&m=1268759368&s=170667a&w=0&h=DIY4qKF5cJYL4uO8C2OoxUMWaw34_j_TPhT7tZXKw5U="
    const [imagesArray, setImagesArray] = useState([])    
    const [cardsChosen, setCardsChosen] = useState([])    
    const [cardsChosenIds, setCardsChosenIds] = useState([])    
    const [points, setPoints] = useState(0)
    const [openCards, setOpenCards] = useState([])

const createGameBoard = () => {
    console.log("images", images[0])
    const imagesPopulated = images.concat(...images)
    const shuffledArray = shuffleArray(imagesPopulated)
    setImagesArray(shuffledArray)
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {            
        const j = Math.floor(Math.random() * (i + 1));            
        [array[i], array[j]] = [array[j], array[i]];        
    }        
    console.log(array)        
    return array 
}

const flipImage = (image, idx) => {
    console.log("clicking in flipImages", image, cardsChosenIds.length)
if(cardsChosenIds.length === 1 && cardsChosenIds[0] === idx){
    return
}
if(cardsChosen.length < 2) {
    setCardsChosen(cardsChosen => cardsChosen.concat(image))
    setCardsChosenIds(cardsChosenIds => cardsChosenIds.concat(idx))

    if(cardsChosen.length === 1){
        if(cardsChosen[0] === image){
            setPoints(points => points + 1)
            setOpenCards(openCards => openCards.concat([cardsChosen[0], image]))
        }
        setTimeout(() => {
            setCardsChosenIds([])
            setCardsChosen([])
        }, 1100)
        }
}
}

const isCardChosen = (image, idx) => {
return cardsChosenIds.includes(idx) || openCards.includes(image)
}


const startOver = () =>  { 
    console.log("clicking startover")       
    setCardsChosenIds([])        
    setCardsChosen([])        
    setPoints(0)        
    setOpenCards([])    
}

useEffect(() => {
    createGameBoard()
}, [])

return (
    <div className="board">
        <h2>Memory Game</h2>
        <h3>Points: {points}</h3>

        <button onClick={startOver}>Start Game</button>
        <div className="game-board"> 
            {imagesArray.map((image, idx) => {
                return (
                    <div className="col-4 col-lg-2" key={idx} onClick={() => flipImage(image, idx)}> 
                    <img src={isCardChosen(image, idx) ? image : BLANK_CARD} alt="" className={`img-fluid img-fixed`} />
                    </div>
                )
            })}
        </div>
    </div>
)
}

export default GameBoard