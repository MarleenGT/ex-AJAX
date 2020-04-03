let posTitre = document.getElementById("titre")
let posDesc = document.getElementById("textDesc")
let posTab = document.getElementById("tabCarac")
let buttonInfos = document.getElementById("infos")
let buttonAPropos = document.getElementById("apropos")
let liste = document.getElementById("listeVet")

let content = {"Jupes" : 1, "Chemises" : 2, "Pulls" : 3, "Chapeaux" : 4, "Vestes" : 5}

function XHR(url, func){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let array = dechiffrage(this.responseText, '|')
            func(array);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}


function dechiffrage(str, symb){
    return str.split(symb)
}
function createTag(str, tag){
    return `<${tag}>${str}</${tag}>`
}
function createTab(label, info){
    let tab = "";
    let row = "";
    let head = createTag((createTag("Label", "th") + createTag("Infos", "th")), "tr");
    for(let i = 0; i < label.length; i++){
        row += createTag((createTag(label[i], "td") + createTag(info[i], "td")), "tr");
    }
    tab = createTag((head + row), "table");
    return tab
}

function funcAProp(arr){
    let titre1 = arr[0];
    let desc = createTag(arr[1], "h2")
    for(let i = 1; i < arr.length/2; i++){
        desc += createTag(arr[2*i], "h3")
        desc += createTag(arr[2*i+1], "p")
    }
    posTitre.innerHTML = createTag(titre1, "h1")
    posDesc.innerHTML = desc;
    posTab.innerHTML = ""
}

function funcInfos(arr){
    let recup = [];
    let desc = "";
    posTitre.innerHTML = createTag("Description et état du stock", "h1")
    for (let i = 0; i < arr.length; i++){
        let subArr = dechiffrage(arr[i], ":= ")
        subArr[0] = subArr[0].replace(/(?:\r\n)/g, "")
        recup[recup.length] = [subArr[0],subArr[1]];
    }
    desc = createTag(recup[0][1], "h2")
    desc += createTag(recup[2][1], "h3")
    desc += createTag(recup[1][1], "p")
    posDesc.innerHTML = desc
    posTab.innerHTML = createTab(["Quantité", "Prix"],[recup[3][1], recup[4][1]])
}

buttonInfos.addEventListener("click", function(){
    let val = liste.value;
    XHR(`fdb/fdb${content[val]}.html`, funcInfos)
})
buttonAPropos.addEventListener("click", function(){
    XHR(`apropos.html`, funcAProp)
})