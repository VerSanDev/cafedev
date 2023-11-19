Atelier 19 => Mini-projet: Le café de la place
-------------------------------------------------------------------------------
Objectifs:

    Maniupler le DOM
    Gérer les évènements
    Utiliser la POO
    Utiliser le LocalStorage

-------------------------------------------------------------------------------
Sujet: 

Le Café Place souhaite pouvoir gérer son stock depuis une application web sur l'ordinateur du comptoir. L'application doit proposer les fonctionnalité suivantes:

1. L'utilisateur doit pourvoir ajouter un nouveau produit dans le stock. Chaque produit doit comporter les caractéristiques suivantes, qui seront saisies ou calculées automatiquement:
- Nom
- Quantité de produits
- Prix d'achat HT
- Prix de vente HT
- Marge HT (calculée automatiquement)
- Prix de vente TTC (calculé automatiquement)
- Type ("Boisson alcoolisée", "Boisson non alcoolisée", "Autre")
- Degré d'alcool (uniquement pour les alcools)

Vous devrez utiliser des classes ou des prototypes pour la création des produits.

2. L'utilisateur doit pouvoir consulter la liste des produits avec toutes leurs informations. Il doit également pouvoir décrémenter ou incrémenter le niveau de stock de chaque produit. Un stock ne peut être négatif.

3. L'utilisateur doit pouvoir modifier les caractéristiques d'un produit ou le supprimer du stock.

4. Le stock doit être sauvegardé en localstorage et récupéré lors du chargement de la page pour conserver les informations.

5. L'interface doit être claire, simple d'utilisation et doit inclure idéalement un code couleur pour alerter du niveau de stock.

BONUS: Générer un QRCode pour chaque produit contenant sa référence.

 
Liens utiles:

    https://davidshimjs.github.io/qrcodejs/

________________________________________________________________________________

Nom : cafedev

thème de couleur : #0A0F27 | #001952 | "#0594D0 | #04BBFF | #FCF6F3  (src img = colorimetrie) 

Aslinn crée le projet sur le github (main) + branche (dev)

utisation calmCase 

js = id
css = class

no Bootstrap

navbar sur coté gauche ()
____________________________________________________________________________________________________________
GESTION GITHUB

Information : 

- creer une branche via le main 
- s'assurer d'avoir toujours le nom de sa branche en bas à gauche de son écran visual code
- toujours pull avant et prévenir si vous faites un push
- vous devez marge une branche avec le main, prévenir pour que l'on check les infos entre le avant/après 
-------------------------------------------------
rappel commande : 

- git push (pour envoyer via ) 
- git branch -d +nomBranche (suppression des branches en local)
Deleted branch navbar2 (was ff5def7).

- PS C:\Users\DNSak\Documents\dev_web\cafedev> git fetch -p   (cela élague les branches sur le dépot(origine)) 
From https://github.com/vsantidev/cafedev
 - [deleted]         (none)     -> origin/css-nav
 - [deleted]         (none)     -> origin/cssnew
 - [deleted]         (none)     -> origin/navbar-css
 - [deleted]         (none)     -> origin/navbar2
