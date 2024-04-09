document.getElementById("profileForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var firstName = document.getElementById("firstName").value;
    var surname = document.getElementById("firstName").value;
    var profilePic = document.getElementById("profilPic").value;
    var password = document.getElementById("password").value;
    var id = 0;

    let user = {
        "id" : id,
        "firstName" : firstName,
        "surname" : surname,
        "profilePic" : profilePic,
        "password" : password,
        "groups" : []
    };

    

})