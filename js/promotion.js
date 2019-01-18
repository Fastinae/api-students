var divPromo = document.querySelector("#promo");

var promotions = [];

// On loading page

fetchPromotion();



/* fetch promotions */
function fetchPromotion(){
fetch("http://api-students.popschool-lens.fr/api/promotions")
        .then(response => response.json())
        .then(promotionData => {
            console.log(promotionData);
            promotions = promotionData["hydra:member"];
            console.log(promotions);
        }
        )
        .then(promotions => printPromotion())
        .catch(error => console.log(error))
}


/* Create list of promotions */
function printPromotion() {
    divPromo.innerHTML = "";
    for(i=0; i < promotions.length; i++){
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
        var cardButton = document.createElement("button");
        cardButton.className = `see${promotions[i].id} btn btn-success`;
        cardButton.innerHTML = "Voir les étudiants";
        cardBody.appendChild(cardButton);
    }
}  


// Create new promotions
function createPromotion(){

}