function submit_form(event) {
    // Stop page from refreshing
    event.preventDefault();

    // Get form data
    let starting_id = parseInt(document.getElementById("startingID").value);
    let num_samples = parseInt(document.getElementById("noSamples").value);

    let used_labels = 0;
    if (document.getElementById("partialSheet").checked) {
        used_labels = parseInt(document.getElementById("usedLabels").value);
    }

    let empty_labels = 0;
    if (document.getElementById("emptyLabels").checked) {
        empty_labels = 1;
    }

    // Calculate number of leftover labels
    let num_leftover = 0;
    num_leftover = 18-((used_labels + num_samples) % 18);
    if (num_leftover == 18) {
        num_leftover = 0;
    }
    
    let print = true;
    if (num_leftover > 0 && empty_labels == 1) { // Leftover labels being turned into "spare" labels
        print = confirm("If you continue, "+num_leftover+" \"spare\" label(s) will be generated, are you sure?");
    }

    let month = document.getElementById("labelMonth").value;
    if (month=="") {month = "NA";}
    let year = document.getElementById("labelYear").value;
    if (year=="") {year = "NA";}

    // Open printing window
    if (print) {
        window.open("printing.html?startingID="+starting_id+"&noSamples="+num_samples+"&usedLabels="+used_labels+"&month="+month+"&year="+year+"&emptyLabels="+empty_labels);
    }
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
