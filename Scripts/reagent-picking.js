function label_time(type, reagent) { // :D
    if (document.getElementById("noLabels").value == '') { let num_labels = "1"; }
    else { let num_labels = document.getElementById("noLabels").value; }

    if (document.getElementById("usedLabels").value == '') { let used_labels = "0"; }
    else { let used_labels = document.getElementById("usedLabels").value; }

    window.open("./reagent-printing.html?reagent="+reagent+"&label_type="+type+"&num_labels="+num_labels+"&used_labels="+used_labels);
}