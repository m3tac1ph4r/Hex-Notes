showNotes();


// If you user adds a note add it to the local storage
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    if (addTxt.textLength == 0)
        alert("Please Write Something in text box first !")
    else {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
    }
    showNotes();
})

// function to Show Notes from local Storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null)
        notesObj = [];
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                    <div class="note-card my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index+1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElem = document.getElementById("notes");

    if (notesObj.length != 0)
        notesElem.innerHTML = html;
    else {
        notesElem.innerHTML = `Nothing to show! Use "Add Note" section to add notes.`;

    }
}

// Function to delete Note from local Storage

function deleteNote(id) {
    let notes = localStorage.getItem("notes");
    if (notes == null)
        notesObj = [];
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Searching Text seach Box

let search = document.getElementById('searchEle');

search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let notecards = document.getElementsByClassName('note-card');
    Array.from(notecards).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardtxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
});