document.getElementById("groupParameters").addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var list = document.getElementById("list").value;
    var vote = document.getElementById("vote").value;

    if (name=="")// || list=="" || vote=="")
        this.reset();
    else
            window.location.href = "main.html?sucess=1&name="+name;
    //create new group
});
