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
const label_date = "Date: __/10/2024";
const label_time = "Time: __:__";
const label_analyst = "Analyst: ";
const label_grades = "FM Grade: ☐N/A ☐1 ☐2 ☐3 ☐4<br>SP Grade: ☐A ☐B ☐C ☐D"

//alert("Bazinga!");
const params = new URLSearchParams(location.search);

const starting_id = parseInt(params.get("startingID"));
const no_samples = parseInt(params.get("noSamples"));

console.log(no_samples+" samples starting with ID: "+starting_id);

// Calculate how many full pages + how many extra labels are needed
let pages = Math.floor(no_samples/18);
let labels_left = no_samples%18;
console.log(pages+" full page(s) with "+labels_left+" label(s) left on one last page.");

// Vars to keep track of current sifter number and sample ID
let sifterNo = 1;
let sampleID = starting_id;

// Make the full pages of labels
for (let j=0; j<pages; j++) {
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