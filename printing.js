function add_label(page_contents, date, time, analyst, grades, sifter, sample) {
    let label_sifterNo = "Sifter #"+sifter.toString();//.padStart(2,'0');
    let label_sampleID = "Sample ID: "+sample;
    
    page_contents += ('<div class="label"><div class="label-content">\
        <h3 class="label-text">'+label_sifterNo+'</h3>\
        <h3 class="label-text">'+label_sampleID+'</h3>\
        <h3 class="label-text">'+date+'</h3>\
        <h3 class="label-text">'+time+'</h3>\
        <h3 class="label-text">'+analyst+'</h3>\
        <h3 class="label-text">'+grades+'</h3></div></div>');
    
    return page_contents;
}

// Constant text for labels
const label_time = "Time: __:__";
const label_analyst = "Analyst: ";
const label_grades = "FM Grade: ☐NA ☐1 ☐2 ☐3 ☐4<br>SP Grade: ☐A ☐B ☐C ☐D"

//alert("Bazinga!");
const params = new URLSearchParams(location.search);

// Get params from URL
const starting_id = parseInt(params.get("startingID"));
const no_samples = parseInt(params.get("noSamples"));
const used_labels = parseInt(params.get("usedLabels"));
let month = params.get("month");
let year = params.get("year");

// Set date for label
if (month=="NA") {month="__";}
if (year=="NA") {year="____";}
const label_date = "Date: __/"+month+"/"+year;

console.log(no_samples+" samples starting with ID: "+starting_id);

let total_labels = no_samples+used_labels;

// Vars to keep track of current sifter number and sample ID
let sifterNo = 1;
let sampleID = starting_id;

// If first sheet is partially used generate the labels for it
let sampleLabelsPrinted = 0;
if (used_labels > 0) {
    console.log("Partial Start");
    let page_contents = '<section class="labels">';

    // Make the blank labels
    for (let i=0; i<used_labels; i++) {
        page_contents+='<div class="label"><div class="label-content"></div></div>';
        sampleLabelsPrinted+=1;
    }

    // if more spare labels than samples
    if (18-used_labels > no_samples) {
        for (let i=0; i<no_samples; i++) {
            page_contents = add_label(page_contents, label_date, label_time, label_analyst, label_grades, sifterNo, sampleID);
            sifterNo+=1;
            sampleID+=1;
            sampleLabelsPrinted+=1;
        }
        // Make the rest of the labels blank
        for (let i=0; i<(18-used_labels)-no_samples; i++){
            page_contents+='<div class="label"><div class="label-content"></div></div>';
            sampleLabelsPrinted+=1;
        }
    }
    else { // otherwise less spare labels than samples left
        // Make the rest of the labels
        for (let i=0; i<18-used_labels; i++) {
            page_contents = add_label(page_contents, label_date, label_time, label_analyst, label_grades, sifterNo, sampleID);
            sifterNo+=1;
            sampleID+=1;
            sampleLabelsPrinted+=1;
        }
    }

    // Add labels to page contents
    page_contents += '</section>';
    document.getElementById('labels-here').innerHTML += page_contents;
}

// Calculate how many full pages + how many extra labels are needed
let pages = Math.floor((no_samples+used_labels-sampleLabelsPrinted)/18);
let labels_left = (no_samples+used_labels-sampleLabelsPrinted)%18;
console.log(pages+" full page(s) with "+labels_left+" label(s) left on one last page.");

// Make the full pages of labels
for (let j=0; j<pages; j++) {
    console.log("Full Start");
    let page_contents = '<section class="labels">';
    for (let i=0; i<18; i++) {
        page_contents = add_label(page_contents, label_date, label_time, label_analyst, label_grades, sifterNo, sampleID);

        sifterNo+=1;
        sampleID+=1;
    }
    page_contents += '</section>';
    document.getElementById('labels-here').innerHTML += page_contents;
}

// Make the partial page of labels
if (labels_left > 0) {
    console.log("Partial End");
    let page_contents = '<section class="labels">';

    // Generate labels with text
    for (let i=0; i<labels_left; i++) {
        page_contents = add_label(page_contents, label_date, label_time, label_analyst, label_grades, sifterNo, sampleID);

        sifterNo+=1;
        sampleID+=1;
    }

    // Make the rest of the labels blank
    for (let i=0; i<18-labels_left; i++){
        page_contents+='<div class="label"><div class="label-content"></div></div>';
    }

    page_contents += '</section>';
    document.getElementById('labels-here').innerHTML += page_contents;
}