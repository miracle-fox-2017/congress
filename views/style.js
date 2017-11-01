
function searchingChoice(menu) {
    if (menu.value == 'name') {
        document.getElementById('searchByName').style.display = "block"
        document.getElementById('searchByGender').style.display = "none"
        document.getElementById('searchByAge').style.display = "none"
    } else if (menu.value == 'gender') {
        document.getElementById('searchByName').style.display = "none"
        document.getElementById('searchByGender').style.display = "block"
        document.getElementById('searchByAge').style.display = "none"
    } else if (menu.value == 'age') {
        document.getElementById('searchByName').style.display = "none"
        document.getElementById('searchByGender').style.display = "none"
        document.getElementById('searchByAge').style.display = "block"
    }
}