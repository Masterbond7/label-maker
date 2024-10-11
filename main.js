function submit_form(event) {
    // Stop page from refreshing
    event.preventDefault();

    // Get form data
    let starting_id = document.getElementById("startingID").value;
    let num_samples = document.getElementById("noSamples").value;

    let used_labels = 0;
    if (document.getElementById("partialSheet").checked) {
        used_labels = document.getElementById("usedLabels").value;
    }

    // Open printing window
    window.open("printing.html?startingID="+starting_id+"&noSamples="+num_samples+"&usedLabels="+used_labels);
}

// Function that is called when partialSheet checkbox is toggled
function partial_sheet_checkbox() {
    var effected_elements = document.getElementsByClassName("partialSheetData");
    console.log(effected_elements);

    // Partial sheet being used
    if (document.getElementById('partialSheet').checked) {
        document.getElementById('usedLabels').disabled=false;
        
        for (let i=0; i<effected_elements.length; i++) {
            effected_elements[i].style.visibility="visible";
            console.log(effected_elements[i].style.visibility);
        }
    } 

    // Full sheet being used
    else {
        document.getElementById('usedLabels').disabled=true;
        
        for (let i=0; i<effected_elements.length; i++) {
            effected_elements[i].style.visibility="hidden";
            console.log(effected_elements[i].style.visibility);
        }
    }
}

// Run init
partial_sheet_checkbox();