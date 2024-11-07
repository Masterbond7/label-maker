// Define function to generate empty label
function gen_reagent_label(pictogram, comm_name, full_name, reagent_id_text, time_text, date_text, creator_text, expiry_text) {
    let label_contents = '<div class="label"><section><div class="reagent-label-content">\
    <h2 class="label-text">'+comm_name+'</h2>\
    <h5 class="label-text">'+full_name+'</h5>\
    <h4 class="label-text">'+reagent_id_text+'</h4>\
    <h4 class="label-text">'+time_text+'</h4>\
    <h4 class="label-text">'+date_text+'</h4>\
    <h4 class="label-text">'+creator_text+'</h4>\
    <h4 class="label-text">'+expiry_text+'</h4></div></section>\
    <section><img src="../Images/Hazards/ascorbic_acid_solution.png"  width="20%"></section></div>';
    return label_contents;
}

// Get params from URL
const params = new URLSearchParams(location.search);
const reagent = params.get("reagent");

// Text for labels
const label_reagent_id = "Reagent ID: R_____";
const label_time = "Time made: _______";
const label_date = "Date made: _______";
const label_creator = "Made by: _________";
const label_expiry = "Expires: _________";

// Start a new page
let page_contents = '<section class="labels">';

// Make 18 labels
for (let label_no=0; label_no<18; label_no++) {
    page_contents += gen_reagent_label("", "Ascorbic Acid", "L-Ascorbic Acid + Metaphosphoric Acid + Acetic acid + EDTA", label_reagent_id, label_time, label_date, label_creator, label_expiry);
}

// End page and add append to site
page_contents += '</section>';
document.getElementById('labels-here').innerHTML += page_contents;