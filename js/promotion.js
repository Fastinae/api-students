var divPromo = document.querySelector("#promo");
var divStudent = document.querySelector("#student");
var divUpdate = document.querySelector("#update");

var btnPromoCreate = document.querySelector("#create_promo");

var btnPromoUpdate = document.querySelector("#update_promo");
var btnPromoSee = document.querySelector("#see_promo");


var inputPromoName = document.querySelector("#promo_name");
var inputPromoDateStart = document.querySelector("#promo_datestart");
var inputPromoDateEnd = document.querySelector("#promo_dateend");

var promotions = [];
var students = [];



btnPromoCreate.addEventListener('click',function(e){                                           
    createPromotion();                                            
})



// On loading page

fetchPromotion();

//var btnPromoDelete = document.querySelector("#delete_promo");


/* fetch and print promotions */
function fetchPromotion(){
fetch("http://api-students.popschool-lens.fr/api/promotions")
        .then(response => response.json())
        .then(promotionData => {
            //console.log(promotionData);
            promotions = promotionData["hydra:member"];
            //console.log(promotions);
        }
        )
        .then(promotions => printPromotion())
        .catch(error => console.log(error))
}


/* Create list of promotions */
function printPromotion() {
    divPromo.innerHTML = "";
    for(i=0; i < promotions.length; i++){
        // Print Card
        var cardDiv = document.createElement("div");
        cardDiv.className = "card text-white bg-dark mb-3";
        cardDiv.style = "width: 18rem";
        divPromo.appendChild(cardDiv);
        var cardHead = document.createElement("div");
        cardHead.className = "card-header";
        cardHead.innerHTML = `Promotion ${promotions[i].id}`;
        cardDiv.appendChild(cardHead);
        var cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardDiv.appendChild(cardBody);
        var cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerHTML = `Nom : ${promotions[i].name}`;
        cardBody.appendChild(cardTitle);
        var cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerHTML = `Nombre d'étudiants: ${promotions[i].students.length} <br>`;
        cardBody.appendChild(cardText);

        // Print display button 
        var btnSee = document.createElement("button");
        btnSee.id = "see_promo";
        btnSee.type= "submit";
        btnSee.value= `${promotions[i].id}`;
        btnSee.className = `btn btn-info`;
        btnSee.innerHTML = "Voir les étudiants";
        cardText.appendChild(btnSee);
        btnSee.addEventListener('click',function(e){                                          
            getStudent(e.target.value);                                           
        })

        // Print update button
        var btnMod = document.createElement("button");
        btnMod.id = "update_promo";
        btnMod.type= "submit";
        btnMod.value= `${promotions[i].id}`;
        btnMod.className = `btn btn-warning`;
        btnMod.innerHTML = "Modifier";
        cardText.appendChild(btnMod);
        btnMod.addEventListener('click',function(e){                                          
            updatePrintPromotion(e.target.value);                                           
        })
        

        // Print delete button
        var btnSup = document.createElement("button");
        btnSup.id = "delete_promo";
        btnSup.className = `btn btn-danger`;
        btnSup.type= "submit";
        btnSup.value= `${promotions[i].id}`;
        btnSup.innerHTML = "Supprimer";
        cardText.appendChild(btnSup);
        btnSup.addEventListener('click',function(e){                                          
            deletePromotion(e.target.value);                                           
        })
    }
}  


// Update promotion
function updatePrintPromotion(id){
    var cardDiv = document.createElement("div");
        cardDiv.className = "card text-white bg-dark mb-3";
        cardDiv.style = "width: 18rem";
        divPromo.appendChild(cardDiv);
        var cardHead = document.createElement("div");
        cardHead.className = "card-header";
        cardHead.innerHTML = `Modification promotion ${id}`;
        cardDiv.appendChild(cardHead);
        var cardBody = document.createElement("div");
        cardBody.className = "card-body";
        cardDiv.appendChild(cardBody);
        var cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerHTML = `Nom: <br>`;
        cardBody.appendChild(cardText);
        var inputNom = document.createElement("input");
        inputNom.className = "card-text";
        inputNom.id = "update_promo_name";
        inputNom.type = "text";
        cardBody.appendChild(inputNom);
        var btnVal = document.createElement("button");
        btnVal.type= "submit";
        btnVal.value= `${id}`;
        btnVal.className = `btn btn-warning`;
        btnVal.innerHTML = "Valider modification";
        cardBody.appendChild(btnVal);
        var inputUpdatePromoName = document.querySelector("#update_promo_name");
        btnVal.addEventListener('click',function(e){ 
            console.log(e.target.value);                                         
            fetch("http://api-students.popschool-lens.fr/api/promotions/" + e.target.value,{                                                             
                method: 'PUT',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({
                    name: inputUpdatePromoName.value,
                })
            })
            .then(function(response){        
                fetchPromotion();
                divUpdate.innerHTML = "";   

            })
            .catch(function(error){             
                console.log(error);
            })                                          
        })
}

function updatePromotion(id){

}

// Delete Promotion
function deletePromotion(id) {                  
    fetch("http://api-students.popschool-lens.fr/api/promotions/" + id,{
        method: 'DELETE'
    })
    .then(function(response){
        fetchPromotion();
    })
    .catch(function(error) {
        console.log(error);
    });
}

// Create new promotion
function createPromotion(){
    fetch("http://api-students.popschool-lens.fr/api/promotions", {                                                
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            name: inputPromoName.value,
            startDate: "2019-01-21T11:09:41.067Z",
            endDate: "2019-01-21T11:09:41.067Z",
            students: []
        })
    })
    .then(function(response){        
        fetchPromotion();
    })
    .catch(function(error){             
        console.log(error);
    })
}

// Fetch students
function getStudent(id){
    fetch("http://api-students.popschool-lens.fr/api/students")
        .then(response => response.json())
        .then(studentData => {
            console.log(studentData);
            students = studentData["hydra:member"];
            console.log(students);
        }
        )
        .then(students => printStudent(id))
        .catch(error => console.log(error))
}

// Print students
function printStudent(id){
    var promo = "/api/promotions/" + id;
    divStudent.innerHTML = "";
    students.forEach(function(student){
        if(promo == student.promotion){       
            console.log(student.id);
            var cardDiv = document.createElement("div");
            cardDiv.className = "card text-white bg-dark mb-3";
            cardDiv.style = "width: 18rem";
            divStudent.appendChild(cardDiv);
            var cardHead = document.createElement("div");
            cardHead.className = "card-header";
            cardHead.innerHTML = `Etudiant ${student.id}`;
            cardDiv.appendChild(cardHead);
            var cardBody = document.createElement("div");
            cardBody.className = "card-body";
            cardDiv.appendChild(cardBody);
            var cardTitle = document.createElement("h5");
            cardTitle.className = "card-text";
            cardTitle.innerHTML = `${student.firstname} ${student.lastname}`;
            cardBody.appendChild(cardTitle);
            var cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.innerHTML = `Sexe: ${student.sex} <br>`;
            cardBody.appendChild(cardText);

            // Print update button
            var btnMod = document.createElement("button");
            btnMod.id = "update_promo";
            btnMod.type= "submit";
            btnMod.value= `${student.id}`;
            btnMod.className = `btn btn-warning`;
            btnMod.innerHTML = "Modifier";
            cardText.appendChild(btnMod);
            btnMod.addEventListener('click',function(e){                                          
                UpdateStudent(e.target.value);                                           
            })
            

            // Print delete button
            var btnSup = document.createElement("button");
            btnSup.id = "delete_promo";
            btnSup.className = `btn btn-danger`;
            btnSup.type= "submit";
            btnSup.value= `${student.id}`;
            btnSup.innerHTML = "Supprimer";
            cardText.appendChild(btnSup);
            btnSup.addEventListener('click',function(e){                                          
                deleteStudent(e.target.value);                                           
            })
            }
    })
}