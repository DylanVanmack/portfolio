"use strict"
// ===============Hamburger===================
let content = document.querySelector("#hamburger-content"),
sideBarBody = document.querySelector("#hamburger-sidebar-body"),
btn = document.querySelector("#hamburger-button"),
overlay = document.querySelector("#hamburger-overlay"),
activatedClass = 'hamburger-activated'


sideBarBody.innerHTML = content.innerHTML

btn.addEventListener("click", function () {
    this.parentNode.classList.add(activatedClass)
})

overlay.addEventListener('click', function(){
    this.parentNode.classList.remove(activatedClass)
})


// =========FORMULAIRE==============

const nom = document.getElementsByClassName("conteneurNom"),
	prenom = document.getElementsByClassName("conteneurPrenom"),
	email = document.getElementsByClassName("conteneurEmail"),
	message = document.getElementsByClassName("conteneurMessage"),
	submit = document.getElementsByClassName("conteneurValidation"),
	form = document.querySelector("form")

submit.addEventListener("click", checkForm)

function checkForm(evt) {
	evt.preventDefault()

	//je supprime toutes les informations du localStorage :
	localStorage.clear()

	checkRegex(nom, "nconteneurNom", 3, 20)
	checkRegex(prenom, "conteneurPrenom", 2, 35)
	checkRegex(email, "conteneurEmail", 10, 255)
	checkRegex(message, "conteneurMessage", 50, 500)

	//on vérifie le contenu du localStorage :
	if (
		(localStorage.getItem("conteneurNom") &&
			localStorage.getItem("conteneurPrenom") &&
			localStorage.getItem("conteneurEmail") &&
			localStorage.getItem("message")) != "false"
	) {
		let newDiv = document.createElement("div")
		newDiv.className = "alert alert-success"
		newDiv.innerText = "Vos données ont bien été envoyées"

		let newUl = document.createElement("ul")

		for (let i = 1; i <= localStorage.length; i++) {
			let newLi = document.createElement("li")
			newLi.innerText =
				Object.keys(localStorage)[
					i - 1
				] +
				" : " +
				Object.values(localStorage)[
					i - 1
				]
			newUl.appendChild(newLi)
		}

		form.parentElement.insertBefore(newDiv, form)
		form.parentElement.insertBefore(newUl, form)
		//disparation du formulaire :
		form.style.display = "none"
		//on vide le localStorage :
		localStorage.clear()
	}
}

console.dir(Object.values(localStorage))
function checkRegex(field, text, min, max) {
	//on rajoute la class d-none à la div qui contient le message d'erreur :

	field.nextElementSibling.classList.add("d-none")

	//on supprime les espaces et on vérifie la longueur des champs :
	if (
		field.value.trim().length >= min &&
		field.value.trim().length <= max
	) {
		//vérification des caractères spéciaux :
		//on exclut le champ email et le champ message :

		//1- vérification format de l'email :
		if (field.type === "email") {
			if (
				!/^\w+([\._-]?\w+)*@\w+([\._-]?\w+)*(\.\w{2,4})+$/.test(
					field.value
				)
			) {
				field.nextElementSibling.classList.remove(
					"d-none"
				)
				field.nextElementSibling.innerText = `Format de l'email incorrect : ${field.value};`
				//on indique une erreur dans le localStorage :
				localStorage.setItem(
					text,
					false
				)
			} else {
				//si aucune erreur dans l'email, on rajoute l'info dans le localStorage
				localStorage.setItem(
					text,
					field.value
				)
			}
		} else if (field.type === "textarea") {
			//on remplace les <> pour des entités html : cf. XSS
			field.value = field.value
				.replace(/\</g, "&lt;")
				.replace(/\>/g, "&gt;")
			localStorage.setItem(text, field.value)
		} else {
			//si le type n'est ni email, ni textarea :
			if (!/^([A-zÀ-ú])*$/.test(field.value)) {
				field.nextElementSibling.classList.remove(
					"d-none"
				)
				field.nextElementSibling.innerText = `Attention ! présence de caractères interdits sur le champ ${text}`
				//on indique une erreur dans le localStorage :
				localStorage.setItem(
					text,
					false
				)
			} else {
				//si aucune erreur, on rajoute l'info dans le localStorage
				localStorage.setItem(
					text,
					field.value
				)
			}
		}
		//si les champs sont vides
	} else {
		field.nextElementSibling.classList.remove("d-none")
		field.nextElementSibling.innerText = `Le champ ${text} doit être compris entre ${min} et ${max} caractères`
		//on indique une erreur dans le localStorage :
		localStorage.setItem(text, false)
	}
}






