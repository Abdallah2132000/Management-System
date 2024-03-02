let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let count = document.querySelector("#count");
let total = document.querySelector("#total");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");

let searchTitle = document.querySelector("#searchTitle");
let searchCategory = document.querySelector("#searchCategory"); 
let mood = "create";
let tmp;





// get totle
function getTotle(){
    if( price.value != "" ){

        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;

        total.innerHTML = result ;
        total.style.background = "#040"
    }else{
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

// create data 

let dataPro = [];
if(localStorage.prodact){  //  <-----localstorage.prodact != null

    dataPro = JSON.parse(localStorage.prodact)
}else{

    let dataPro = [];
}



submit.onclick = function() {
    
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),   
    }
    if(title.value !=""&&price.value!=""&& count.value < 100){

        if(mood === "create"){
            if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++ ){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
        }else{
            dataPro[tmp] = newPro;
            mood = "create";
            submit.innerHTML = "create"
            count.style.display = "block"
    
        }
        clear()
    }
    
    
    
    

    // save localstorage

    localStorage.setItem("prodact" , JSON.stringify(dataPro));
    
    showData()

}

  //// clear inputs

  function clear(){

    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    total.innerHTML = "";
    category.value = ""


}


/// read


function showData(){

getTotle();

let tabal ="";
    for(let i = 0 ; i < dataPro.length ; ++i ){

        tabal += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].totle}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick ="updataDate(${i})"  id="update" >update</button></td>
            <td><button onclick="deleteData(${i})"  id="delete" >delete</button></td>
         </tr>
        `
    
    }
    document.querySelector("#tbody").innerHTML = tabal ;

    let btnDelete = document.querySelector("#deleteALL");

    if(dataPro.length){
        btnDelete.innerHTML = `<button onclick ="deleteALL()" >deleteALL(${dataPro.length})</button>`
    }else{
        btnDelete.innerHTML = ""
    }

}
showData()

// delete 

function deleteData(i){

    dataPro.splice(i,1);
    localStorage.prodact =JSON.stringify(dataPro)
    

    showData()

}

//  deletAll


function deleteALL(){
    localStorage.clear()
    dataPro.splice(0)
    showData()

   
}


// count



// update

function updataDate(i){
     title.value = dataPro[i].title
     price.value = dataPro[i].price
     taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
     discount.value = dataPro[i].discount
     count.style.display ="none"
     getTotle()
     category.value = dataPro[i].category
     submit.innerHTML ="Updata"
     mood = "Updata"
     tmp = i;
     scroll({
        top :0,
        behavior:"smooth",

     })


}
// search 

let searchMood = "title";
let search = document.querySelector("#search");
function getSearchMood(id){


    if(id == "searchTitle"){

        searchMood ="title";
        search.placeholder = "Search By Title";
        
    }else{

        searchMood ="category";
        search.placeholder = "Search By category";
        
    }
    search.focus();
    search.value = "";
    showData();
}

function searchData(value){
    let tabal ="" ;
    if(searchMood =="title"){

        for(let i = 0; i < dataPro.length; ++i ){

            if(dataPro[i].title.includes(value.toLowerCase())){
                tabal += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].totle}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick ="updataDate(${i})"  id="update" >update</button></td>
                    <td><button onclick="deleteData(${i})"  id="delete" >delete</button></td>
                 </tr>
                `

            }

        }

    }else{
        for(let i = 0; i < dataPro.length; ++i ){

            if(dataPro[i].category.includes(value.toLowerCase())){
                tabal += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].totle}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick ="updataDate(${i})"  id="update" >update</button></td>
                    <td><button onclick="deleteData(${i})"  id="delete" >delete</button></td>
                 </tr>
                `

            }

        }

    }

    document.querySelector("#tbody").innerHTML = tabal ;

}

// clean data






