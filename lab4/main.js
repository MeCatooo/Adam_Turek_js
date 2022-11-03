document.querySelector("#add").addEventListener("click", function() {
    const newNote = document.createElement("div");
    newNote.classList.add("Note");
    document.querySelector("#Notes").appendChild(newNote);
});

document.querySelector("#notifications").addEventListener("click", function(event) {
    const content = document.querySelector(".content")
    if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = "20vw";
      }
});