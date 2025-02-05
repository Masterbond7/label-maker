function label_time(type, reagent) { // :D
    let num_labels = "0";
    if (document.getElementById("noLabels").value != '') { num_labels = document.getElementById("noLabels").value; }

    let used_labels = "0";
    if (document.getElementById("usedLabels").value != '') { used_labels = document.getElementById("usedLabels").value; }

    window.open("./reagent-printing.html?reagent="+reagent+"&label_type="+type+"&num_labels="+num_labels+"&used_labels="+used_labels);
}