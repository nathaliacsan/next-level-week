
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) 
    .then( states => {
        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}


populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) // função anônima com 1 valor
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

            citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Items de coleta
// pegar todos os li
const ItemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of ItemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = [];
function handleSelectedItem(event) /* recebe um evento*/ {
    const itemLi = event.target
        
    // add ou remover uma classe com javascript
    // add remove ou toggle que é add ou remove
    itemLi.classList.toggle("selected") 

    const itemId = itemLi.dataset.id /* quando seleciona o item, guarda aqui*/
    // console.log('ITEM ID: ', itemId)

    // verificar se existem itens selecionados, se sim
    // pegar itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

       selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    //console.log('selectedItems: ', selectedItems)

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}
   










// ________________________________________________________________________

// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
// .then(function (res) {
// return res.json()
// }).then(function (data) {
// console.log(data)
// })


// Eu prometo que vou lá e vou voltar
// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

// ENTÃO quando vc voltar, executa essa função 
// .then(function (res) {

// Tranforma em JSON e devolve para o then
// return res.json()

// o Then virou uma promessa igual Fetch e json e vai trabalhar esse dado 
// }).then(function (data) {
// console.log(data)
// })