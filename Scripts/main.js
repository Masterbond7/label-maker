// On form submission open new page
function submit_form(event) {
    // Stop page from refreshing
    event.preventDefault();

    let result = get_form_data(event);

    if (result!="N/A") {window.open(result);}
}

// On form update, update preview
function update_preview(event) {
    // Stop page from refreshing
    event.preventDefault();

    let result = get_form_data(event);
    if (result!="N/A") {document.getElementById("preview_iframe").setAttribute('src', result)}
}

// Function gets and returns form data
function get_form_data(event) {
    // Stop page from refreshing
    event.preventDefault();

    // Get form data
    let starting_id = parseInt(document.getElementById("startingID").value);
    let ending_id = parseInt(document.getElementById("endingID").value);
    let num_samples = parseInt(document.getElementById("noSamples").value);
    let sample_blanks = parseInt(document.getElementById("sampleBlanks").value);

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
    num_leftover = 18-((used_labels + num_samples + sample_blanks) % 18);
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

    // Check if any IDs are in Missing IDs box
    let missingIds = document.getElementById("missingIds").value;
    let intarr_missingIds = [];
    if (/[0-9]/.test(missingIds)) { // If so, split and store in intarr
        let strarr_missingIds = missingIds.split(/\r?\n|\r|\n/g);
        for (let i=0; i<strarr_missingIds.length; i++) {
            // If split string contains a number (just double checking), convert to int and add to intarr
            if (/[0-9]/.test(strarr_missingIds[i])) {
                intarr_missingIds.push(parseInt(strarr_missingIds[i].match(/[0-9]/g).join("")));
            }
        }
    }
    // save intarr of missingIds to localstorage
    localStorage.setItem("missing_ids", intarr_missingIds);

    // If Ending ID given, check that ID range has the same number of IDs as samples
    // if discrepency, check if missing_ids solves this issue
    if ((ending_id - starting_id)-intarr_missingIds.length+1 > num_samples) {
        print = false;
        alert("Provided Sample ID range ("+starting_id+"-"+ending_id+") contains more IDs("+((ending_id - starting_id)-intarr_missingIds.length+1)+") than the number of samples to be generated ("+num_samples+"), even after accounting for the "+intarr_missingIds.length+" skipped sample(s).\n\nMaybe try checking if LIMS skipped any more IDs while generating the project?");
    } else if ((ending_id - starting_id)-intarr_missingIds.length+1 < num_samples) {
        print = false;
        alert("Provided Sample ID range ("+starting_id+"-"+ending_id+") contains less IDs("+((ending_id - starting_id)-intarr_missingIds.length+1)+") than the number of samples to be generated ("+num_samples+"), this took into account the "+intarr_missingIds.length+" skipped sample(s).\n\nTry double checking the number of samples you want to generate, then the ID range for the samples, making sure no IDs were accidentally added to the 'skipped' samples box.");
    }

    // Open printing window
    if (print) {
        return ("./Pages/printing.html?startingID="+starting_id+"&noSamples="+num_samples+"&usedLabels="+used_labels+"&month="+month+"&year="+year+"&emptyLabels="+empty_labels+"&sampleBlanks="+sample_blanks);
    } else { // Cleanup anyway if not printing
        localStorage.removeItem("missing_ids");
    }

    // If here something has gone wrong, return N/A
    return "N/A"
}

// Run init
partial_sheet_checkbox();
