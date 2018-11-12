//variable
var form = document.getElementById("form");
var table = document.getElementById("table");
var tbody = document.getElementById("tbody");
var dataArray = [];
var dataValidation = -1;
//eventListner
eventListener();

function eventListener(){
    form.addEventListener("submit", valueFetch);
}
//function

function resetform(){
    dataValidation = -1
    form.reset();
    document.getElementById("submit").innerHTML = "Submit"
}

function init(){
    document.getElementById('tbody').innerHTML = '';
    if(localStorage.dataRecord){
        dataArray = JSON.parse(localStorage.dataRecord);
        for(var i = 0; i< dataArray.length; i++){
            insertIntable(i,dataArray[i].name,dataArray[i].age)
        }
    }
}

function valueFetch(e){
    e.preventDefault();
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;

    var dataObj = {name:name,age:age}

    if(dataValidation === -1){
        dataArray.push(dataObj);
    }else{
        dataArray.splice(dataValidation,1,dataObj);
    }
    
    localStorage.dataRecord = JSON.stringify(dataArray);

    

    init();
    resetform();
}

function insertIntable(index,name,age){
    var rowInsert = tbody.insertRow(0);
    var cell1 = rowInsert.insertCell(0);
    var cell2 = rowInsert.insertCell(1);
    var cell3 = rowInsert.insertCell(2);

    cell1.innerHTML = name; 
    cell2.innerHTML = age; 
    cell3.innerHTML = `<button class="btn btn-danger btn-sm float-right" onclick="deleteData(`+index+`)"  style="margin-right:16px;">Delete</button>
    <button class="btn btn-warning btn-sm float-right" onclick="editData(`+index+`)"  style="margin-right:16px;">Edit</button>`;
}

function deleteData(index){
    table.deleteRow(index+1);
    dataArray.splice(index,1)
    localStorage.dataRecord = JSON.stringify(dataArray)
    init();
    console.log(index);
}

function editData(index){
    dataValidation = index;
    var dataObj = dataArray[index];
    document.getElementById('name').value = dataObj.name
    document.getElementById('age').value = dataObj.age;
    document.getElementById("submit").innerHTML = "update"
}