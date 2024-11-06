// Define function to generate empty label
function gen_empty_label() {
    let label_contents = '<div class="label"><div class="label-content"></div></div>'
    return label_contents;
}

// Define function to generate sample blank label
function gen_sample_blank(date_text, time_text, analyst_text, grades_text) {
    let label_contents = '<div class="label"><div class="label-content">\
    <h3 class="label-text">Sample: Blank</h3>\
    <h3 class="label-text">'+date_text+'</h3>\
    <h3 class="label-text">'+time_text+'</h3>\
    <h3 class="label-text">'+analyst_text+'</h3>\
    <h3 class="label-text">'+grades_text+'</h3></div></div>';
    return label_contents;
}

// Define function to generate sample label




// Get params from URL
const params = new URLSearchParams(location.search);
const no_used_labels = parseInt(params.get("usedLabels"));
const no_sample_blanks = parseInt(params.get("sampleBlanks"));
const no_samples = parseInt(params.get("noSamples"));
const starting_id = parseInt(params.get("startingID"));
const has_template_labels = Boolean(parseInt(params.get("emptyLabels")));
let month = params.get("month");
let year = params.get("year");

// Handle NA month/year for label
if (month=="NA") {month="__";}
if (year=="NA") {year="____";}

// Text for labels
const label_time = "Time: __:__";
const label_analyst = "Analyst: ";
const label_grades = "FM Grade: ☐1 ☐2 ☐3 ☐4<br>SP Grade: ☐A ☐B ☐C ☐D"
const label_date = "Date: __/"+month+"/"+year;

// Variables to keep track of labels made
let made_pages = 0;
let made_used_labels = 0;
let made_sample_blanks = 0;
let made_samples = 0;

// Calculate number of needed pages
let total_labels = no_used_labels + no_sample_blanks + no_samples;
let pages_needed = Math.ceil(total_labels/18);

// Make number of needed pages
while (made_pages < pages_needed) {
    // Start a new page
    let page_contents = '<section class="labels">';

    // Make 18 labels
    for (let label_no=0; label_no<18; label_no++) {
        // If more used labels are needed
        if (made_used_labels < no_used_labels) {
            page_contents += gen_empty_label();
            made_used_labels++;
            continue; // Jump back to top of loop
        }

        // If more sample blank labels are needed
        if (made_sample_blanks < no_sample_blanks) {
            page_contents += gen_sample_blank(label_date, label_time, label_analyst, label_grades);
            made_sample_blanks++;
            continue; // Jump back to top of loop
        }

        // If more sample labels are needed
        if (made_samples < no_samples) {
            //TODO: make sample label
            page_contents += gen_sample_blank("sample", "sample", "sample", "sample");
            made_samples++;
            continue; // Jump back to top of loop
        }

        // If this code has been reached no other labels are needed
        // so generate empty/template labels depending on request
        if (has_template_labels) {
            //TODO: make template label
            page_contents += gen_sample_blank("template", "template", "template", "template");
        } else {
            page_contents += gen_empty_label();
        }
    }

    // End page and add append to site
    page_contents += '</section>';
    document.getElementById('labels-here').innerHTML += page_contents;
    made_pages++;
}