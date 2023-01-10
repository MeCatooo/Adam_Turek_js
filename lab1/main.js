let submitButton = document.querySelector('#inputs')
submitButton.addEventListener("change", () => {
    let data = document.querySelectorAll("input");
    let castedData = []
    data.forEach(x => castedData.push(+x.value ?? 0))
    let sum = castedData.reduce((a, b) => a + b, 0)


    document.querySelector("#sum").textContent = sum
    document.querySelector("#avg").textContent = sum/castedData.length
    document.querySelector("#min").textContent = Math.min.apply(Math, castedData)
    document.querySelector("#max").textContent = Math.max.apply(Math, castedData)
})

let addButton = document.querySelector('#add')
addButton.addEventListener("click", () => {
    let buttonToCopy = document.querySelector(".dataInput")
    let clone = buttonToCopy.cloneNode(true);

    document.getElementById("inputs").appendChild(clone);
})

let deleteButton = document.querySelector('#delete')
deleteButton.addEventListener("click", () => {
    let data = document.querySelectorAll("input");

    data.forEach(x =>{ 
        if(data.length == 1) return;
        if(x.value.length === 0)  
        x.remove(); 
    })

})

