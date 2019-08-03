let inputSize = "";
let Players = [];
let images = [
    "images/anna.png",
    "images/nikolina.png",
    "images/sebastian.png",
    "images/marvin.png",
    "images/stefanie.png",
    "images/paulin.png",
    "images/hermine.png",
    "images/nina.png",
    "images/carolin.png",
    "images/antonia.png",
    "images/julia.png",
    "images/franziska.png",
    "images/esra.png",
    "images/evelyn.png",
    "images/niklas.png",
    "images/mir.png",
]
let playersImage

// a function to dynamically import images from a folder
// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => {
//         images[item.replace('./', '')] = r(item);
//     });
//     return images;
// }
// const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));


function submitSize() {
    inputSize = parseInt(document.getElementById("input-size").value);

    console.log(inputSize); //to confirm it has been added to the array
}

// function submitNames() {
//     let playerName = document.getElementById("input-players").value;
//     let playerImage = playerNameFromSrc;
//     Players.push({
//         name: playerName,
//         image: playerImage
//     })

console.log("Players", Players)
// document.getElementById("input-players").value = ""
let allSelectedNames = [...document.querySelectorAll('span.selected')].map((el) => {
    return el.getAttribute('data-name')
})

alert(allSelectedNames)


for (let i = 0; i < images.length; i++) {
    let playerNameFromSrc = ""
    playersImage = document.createElement('img');
    playersImage.src = images[i]
    playersImage.className = "player-image"
    playersImage.onclick = function (e) {
        playerNameFromSrc = e.target.src.split('/').pop().split('.').slice(0, -1).join('.');
        console.log("playerNameFromSrc", playerNameFromSrc)
    };
    document.getElementById("images-wrapper").append(playersImage);
}









// Get the input field
let input = document.getElementById("input-size");

// Execute a function when the user releases a key on the keyboard
// input.addEventListener("keydown", function (addTo) {
//     // Number 13 is the "Enter" key on the keyboard
//     if (event.keyCode === 13) {
//         // Cancel the default action, if needed

//         input.push(document.getElementById("input").value);

//         document.getElementById("userinput").value = ""

//     }
// });


document.getElementById('team-settings').addEventListener('submit', function (e) {
    e.preventDefault();

    var inputValue = document.getElementsByTagName('input')[0].value;
    var textAreaValue = document.getElementsByTagName('textarea')[0].value;

    var peopleArray = formatTextareaValue(textAreaValue);

    var isValidInputValue = validateUserInput(inputValue);
    var isValidTextarea = validateUserInput(peopleArray.length);

    generateErrors(isValidInputValue, isValidTextarea);

    if (isValidInputValue && isValidTextarea) {
        document.getElementById('team-container').innerHTML = '';
        generateAllTeams(peopleArray, inputValue);
    }
});