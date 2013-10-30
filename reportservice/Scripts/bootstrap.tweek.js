function toggle() {
    var e = document.getElementById('togglediv');

    if (e.className == 'navbar-collapse collapse') {
        //navbar-collapse in
        e.setAttribute("class", "navbar-collapse in");
    }
    else if (e.className == 'navbar-collapse in') {
        //navbar-collapse collapse
        e.setAttribute("class", "navbar-collapse collapse");
    }
}




