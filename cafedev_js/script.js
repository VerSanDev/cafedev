// Définition de la classe Produit
class Produit {
  constructor(nom, quantite, prixAchatHT, prixVenteHT, type, degreAlcool) {
    this.nom = nom;
    this.quantite = quantite;
    this.prixAchatHT = prixAchatHT;
    this.prixVenteHT = prixVenteHT;
    this.type = type;
    this.degreAlcool = degreAlcool;
    this.calculerMargeHT();
    this.calculerMargeTTC();
    this.calculerPrixVenteTTC();
  }
  calculerMargeHT() {
    this.margeHT = this.prixVenteHT - this.prixAchatHT;
  }

  calculerMargeTTC() {
    const tauxTVA = 0.1; // Taux de TVA de 10%
    if (this.type === "Boisson non alcoolisée") {
      // Si c'est une boisson non alcoolisée
      this.margeTTC = (this.margeHT * (1 + tauxTVA * 0.55)).toFixed(2); // 5,5% de TVA
    } else if (this.type === "Boisson alcoolisée") {
      // Si c'est une boisson alcoolisée
      this.margeTTC = (this.margeHT * (1 + tauxTVA * 2)).toFixed(2); // 20% de TVA
    } else {
      // Pour les autres types de produits
      this.margeTTC = (this.margeHT * (1 + tauxTVA)).toFixed(2);
    }
  }
  calculerPrixVenteTTC() {
    const tauxTVA = 0.1; // Taux de TVA de 10%

    if (this.type === "Boisson non alcoolisée") {
      // Si c'est une boisson non alcoolisée
      this.prixVenteTTC = (this.prixVenteHT * (1 + tauxTVA * 0.55)).toFixed(2); // 5,5% de TVA
    } else if (this.type === "Boisson alcoolisée") {
      // Si c'est une boisson alcoolisée
      this.prixVenteTTC = (this.prixVenteHT * (1 + tauxTVA * 2)).toFixed(2); // 20% de TVA
    } else {
      // Pour les autres types de produits
      this.prixVenteTTC = (this.prixVenteHT * (1 + tauxTVA)).toFixed(2);
    }
  }
}

// Fonction pour ajouter un produit au stock
function ajouterProduit() {
  // Récupérer les données du formulaire
  const nom = document.getElementById("nom").value;
  const quantite = parseInt(document.getElementById("quantite").value);
  const prixAchatHT = parseFloat(document.getElementById("prixAchatHt").value);
  const prixVenteHT = parseFloat(document.getElementById("prixVenteHt").value);
  const type = document.getElementById("type").value;
  let degreAlcool;

  if (type === "Boisson alcoolisée") {
    degreAlcool = parseFloat(document.getElementById("degreAlcool").value);
  } else {
    degreAlcool = null;
  }
  // Créer une instance de Produit
  const nouveauProduit = new Produit(
    nom,
    quantite,
    prixAchatHT,
    prixVenteHT,
    type,
    degreAlcool
  );
  // Ajouter le produit au stock (localStorage)
  let produits = JSON.parse(localStorage.getItem("produits")) || [];
  produits.push(nouveauProduit);
  localStorage.setItem("produits", JSON.stringify(produits));

  // Réinitialiser le formulaire
  document.getElementById("addProductForm").reset();

  // Rafraîchir la liste des produits
  afficherListeProduits();
}

// Fonction pour afficher la liste des produits
function afficherListeProduits() {
  // Récupérer les produits depuis le local storage
  const produits = JSON.parse(localStorage.getItem("produits")) || [];

  // Effacer la liste des produits actuelle
  const productContainer = document.getElementById("productList");
  productContainer.innerHTML = "";
  // Parcourir chaque produit et les afficher dans l'interface utilisateur
  produits.forEach(function (produit, index) {
    const produitDiv = document.createElement("div");
    produitDiv.classList.add("product");
    produitDiv.innerHTML = `
          <h2>${produit.nom}</h2>

          <div>
            <p>Quantité : <span>   ${produit.quantite} </span></p>
            <p>Prix d'Achat HT :   <span> ${produit.prixAchatHT} € </span> </p>
            <p>Prix de Vente HT :   <span> ${produit.prixVenteHT} € </span> </p>
            <p>Marge HT :   <span> ${produit.margeHT} € </span> </p>
            <p>Marge TTC :  <span> ${produit.margeTTC} € </span> </p>
            <p>Prix de Vente TTC :   <span> ${produit.prixVenteTTC} € </span> </p>
            <p>Type : <span> ${produit.type} </span> </p>
            ${
              produit.degreAlcool
                ? `<p>Degré d'Alcool: ${produit.degreAlcool} %</p>`
                : ""
            }
          
          </div>

          <div >
            <div>
            <span> 
              <button onclick="decrementStock(${index})">Décrémenter</button>
              <button onclick="incrementStock(${index})">Incrémenter</button>
            </span>

            <span>
              <button onclick="afficherFormulaireModification(${index})">Modifier</button>
              <button onclick="supprimerProduit(${index})">Supprimer</button>
            </span>

            </div>
          </div>

        `;
    productContainer.appendChild(produitDiv);
  });
  //FONCTION FILTRE NON FONCTIONNEL EN ATTENDANT L'INPUT FILTRE TYPE
  // function filtrerProduits() {
  //   const selectedType = document.getElementById("filtreType").value;
  //   const produits = JSON.parse(localStorage.getItem("produits")) || [];

  //   // Filtrer les produits en fonction du type sélectionné
  //   function filtrerProduits(selectedType) {
  //     let produitsFiltres = [];

  //     if (selectedType === "Tous") {
  //       produitsFiltres = produits;
  //     } else {
  //       for (let i = 0; i < produits.length; i++) {
  //         if (produits[i].type === selectedType) {
  //           produitsFiltres.push(produits[i]);
  //         }
  //       }
  //     }

  //     return produitsFiltres;
  //   }

  //   // Afficher Liste des produits filtrés
  //   afficherListeProduits(produitsFiltres);
  // }
}

// Fonction pour décrémenter le stock
function decrementStock(index) {
  const produits = JSON.parse(localStorage.getItem("produits")) || [];
  if (produits[index].quantite > 0) {
    produits[index].quantite--;
    localStorage.setItem("produits", JSON.stringify(produits));
    afficherListeProduits();
  }
}

// Fonction pour incrémenter le stock
function incrementStock(index) {
  const produits = JSON.parse(localStorage.getItem("produits")) || [];
  produits[index].quantite++;
  localStorage.setItem("produits", JSON.stringify(produits));
  afficherListeProduits();
}

// Fonction pour afficher le formulaire de modification avec les données du produit sélectionné
function afficherFormulaireModification(index) {
  const produits = JSON.parse(localStorage.getItem("produits")) || [];

  // Pré-remplir le formulaire de modification avec les données du produit sélectionné
  document.getElementById("nomModif").value = produits[index].nom;
  document.getElementById("quantiteModif").value = produits[index].quantite;
  document.getElementById("prixAchatHtModif").value =
    produits[index].prixAchatHT;
  document.getElementById("prixVenteHtModif").value =
    produits[index].prixVenteHT;
  document.getElementById("typemodif").value = produits[index].type;
  document.getElementById("degreAlcoolModif").value =
    produits[index].degreAlcool || "";

  // Afficher le formulaire de modification
  document.getElementById("modifyForm").style.display = "flex";

  // Mettre à jour l'index du produit en cours de modification
  document.getElementById("modifyForm").dataset.index = index;
}

function modifierProduit() {
  const index = parseInt(document.getElementById("modifyForm").dataset.index);
  const produits = JSON.parse(localStorage.getItem("produits")) || [];

  // Récupérer les données du formulaire de modification
  const nom = document.getElementById("nomModif").value;
  const quantite = parseInt(document.getElementById("quantiteModif").value);
  const prixAchatHT = parseFloat(
    document.getElementById("prixAchatHtModif").value
  );
  const prixVenteHT = parseFloat(
    document.getElementById("prixVenteHtModif").value
  );
  const type = document.getElementById("typemodif").value;
  let degreAlcool;

  if (type === "Boisson alcoolisée") {
    degreAlcool = parseFloat(document.getElementById("degreAlcoolModif").value);
  } else {
    degreAlcool = null;
  }

  // Créer une instance de Produit
  const produitModifie = new Produit(
    nom,
    quantite,
    prixAchatHT,
    prixVenteHT,
    type,
    degreAlcool
  );
  // Recalculer les marges et le prix de vente TTC pour le produit modifié
  //produits[index].calculerMargeHT();
  //produits[index].calculerMargeTTC();
  //produits[index].calculerPrixVenteTTC();

  // Mettre à jour le produit sélectionné avec le produit modifié
  produits[index] = produitModifie;

  // Mettre à jour le localStorage avec les produits mis à jour
  localStorage.setItem("produits", JSON.stringify(produits));

  // Cacher le formulaire de modification
  document.getElementById("modifyForm").style.display = "none";

  // Mettre à jour le localStorage avec les produits mis à jour
  localStorage.setItem("produits", JSON.stringify(produits));

  // Cacher le formulaire de modification
  document.getElementById("modifyForm").style.display = "none";
  // Rafraîchir la liste des produits
  afficherListeProduits();
}

// Rafraîchir la liste des produits
afficherListeProduits();

// Événement de soumission du formulaire de modification
document.getElementById("modifyForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche la page de se recharger
  modifierProduit(); // Appelle la fonction de modification
});

// Fonction pour supprimer un produit
function supprimerProduit(index) {
  const produits = JSON.parse(localStorage.getItem("produits")) || [];
  produits.splice(index, 1);
  localStorage.setItem("produits", JSON.stringify(produits));
  afficherListeProduits();
}

document
  .getElementById("addProductForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    ajouterProduit();
  });

// Appel initial pour afficher la liste des produits
afficherListeProduits();
