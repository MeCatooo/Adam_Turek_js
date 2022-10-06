var submitButton = document.querySelector('#inputs')
submitButton.addEventListener("change", () => {
    var data = document.querySelectorAll("input");
    var castedData = []
    data.forEach(x => castedData.push(+x.value ?? 0))
    var sum = castedData.reduce((a, b) => a + b, 0)


    document.querySelector("#sum").textContent = sum
    document.querySelector("#avg").textContent = sum/castedData.length
    document.querySelector("#min").textContent = Math.min.apply(Math, castedData)
    document.querySelector("#max").textContent = Math.max.apply(Math, castedData)
})

var addButton = document.querySelector('#add')
addButton.addEventListener("click", () => {
    var buttonToCopy = document.querySelector(".dataInput")
    var clone = buttonToCopy.cloneNode(true);

    document.getElementById("inputs").appendChild(clone);
})

var deleteButton = document.querySelector('#delete')
deleteButton.addEventListener("click", () => {
    var data = document.querySelectorAll("input");

    data.forEach(x =>{ 
        if(data.length == 1) return;
        if(x.value.length === 0)  
        x.remove(); 
    })

})

