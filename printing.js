//alert("Bazinga!");
let params = new URLSearchParams(location.search);

let starting_id = parseInt(params.get("startingID"));
let no_samples = parseInt(params.get("noSamples"));

console.log(no_samples+" samples starting with ID: "+starting_id);

// Calculate how many full pages + how many extra labels are needed
let pages = Math.floor(no_samples/18);
let labels_left = no_samples%18;
console.log(pages+" full page(s) with "+labels_left+" label(s) left on one last page.");

// Vars to keep track of current sifter number and sample ID
let sifterNo = 1;
let sampleID = starting_id;

// Constant text for labels
let label_date = "Date: __/10/2024";
let label_time = "Time: __:__";
let label_analyst = "Analyst: ";
let label_grades = "FM Grade: ☐N/A ☐1 ☐2 ☐3 ☐4\nSP Grade: ☐A ☐B ☐C ☐D"

// Make the full pages of labels
for (let j=0; j<pages; j++) {
    let page_contents = '<section class="labels">';
    for (let i=0; i<18; i++) {
        let label_sifterNo = "Sifter #"+sifterNo.toString();//.padStart(2,'0');
        let label_sampleID = "Sample ID: "+sampleID;
        
        page_contents += ('<div>\
            <h3 class="label-text">'+label_sifterNo+'</h3>\
            <h3 class="label-text">'+label_sampleID+'</h3>\
            <h3 class="label-text">'+label_date+'</h3>\
            <h3 class="label-text">'+label_time+'</h3>\
            <h3 class="label-text">'+label_analyst+'</h3>\
            <h3 class="label-text">'+label_grades+'</h3></div>');

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
        let label_sifterNo = "Sifter #"+sifterNo.toString();//.padStart(2,'0');
        let label_sampleID = "Sample ID: "+sampleID;
        
        page_contents += ('<div>\
            <h3 class="label-text">'+label_sifterNo+'</h3>\
            <h3 class="label-text">'+label_sampleID+'</h3>\
            <h3 class="label-text">'+label_date+'</h3>\
            <h3 class="label-text">'+label_time+'</h3>\
            <h3 class="label-text">'+label_analyst+'</h3>\
            <h3 class="label-text">'+label_grades+'</h3></div>');

        sifterNo+=1;
        sampleID+=1;
    }

    // Make the rest of the labels blank
    for (let i=0; i<18-labels_left; i++){
        page_contents+='<div></div>';
    }

    page_contents += '</section>';
    document.getElementById('labels-here').innerHTML += page_contents;
}