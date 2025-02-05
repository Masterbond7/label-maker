function label_time(type, reagent) { // :D
    let num_labels = parseInt(document.getElementById("noLabels").value);
    let used_labels = parseInt(document.getElementById("usedLabels").value);

    alert(type+" ("+reagent+")\n"+String(num_labels)+" "+String(used_labels));
}