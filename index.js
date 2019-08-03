let inputSize = "";
let Players = [];

function submitSize() {
    inputSize = parseInt(document.getElementById("input-size").value);

    console.log(inputSize); //to confirm it has been added to the array
}



function submitNames() {
    let playerName = document.getElementById("input-players").value;
    let playerImage = "i am image";
    Players.push({
        name: playerName,
        image: playerImage
    })


    console.log("Players", Players)
    // document.getElementById("input-players").value = ""
    let allSelectedNames = [...document.querySelectorAll('span.selected')].map((el) => {
        return el.getAttribute('data-name')
    })

    alert(allSelectedNames)
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