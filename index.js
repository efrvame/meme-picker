
import { catsData } from "./data.js"

const emotionRadiosEl = document.getElementById("emotion-radios")
const gisfOnlyOption = document.getElementById("gifs-only-option")
const getImgBtn = document.getElementById("get-image-btn")
const memeModal = document.getElementById("meme-modal")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn")

emotionRadiosEl.addEventListener("change", highlightCheckedOption)
memeModalCloseBtn.addEventListener("click", closeModal)
getImgBtn.addEventListener("click", renderCat)

function highlightCheckedOption(e){

    const radiosArray = document.getElementsByClassName('radio')

    for(let radio of radiosArray){
        radio.classList.remove('highlight')
    }

    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat (){

    const catObject = getSingleCatObject()
    
    memeModalInner.innerHTML = `
        <img
            class="cat-img"
            src="./images/${catObject.image}"
            alt="${catObject.alt}"
        >
    `

    memeModal.style.display = "flex"

}

function getSingleCatObject (){

    const catsArray = getMatchingCatsArray()

    if (catsArray.legth === 1){
        return catsArray[0]
    }
    else {
        let randomIndex = Math.floor( Math.random() * catsArray.length )
        return catsArray[randomIndex]
    }

}

function getMatchingCatsArray(){

    if(document.querySelector("input[type='radio']:checked")){
        const selectedEmotion = document.querySelector("input[type='radio']:checked").value
        const isGif = gisfOnlyOption.checked
    
        const matchingCatsArray = catsData.filter(function(cat){

            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }

            return cat.emotionTags.includes(selectedEmotion)
        })

        return matchingCatsArray
    }
}

function getEmotionsArray(cats){

    const emotionsArray = []
    
    for (let cat of cats){
        for(let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }

    return emotionsArray

}

function renderEmotionsRadios(cats){
    
    const emotions = getEmotionsArray(cats)
    let radioItems = ``

    for(let emotion of emotions) {
        radioItems += `
            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input
                    type="radio"
                    id="${emotion}"
                    value="${emotion}"
                    name="emotions"
                    >
            </div>
        `
    }

    emotionRadiosEl.innerHTML = radioItems
}

renderEmotionsRadios(catsData)