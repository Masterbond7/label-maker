// Define function to generate empty label
function gen_reagent_label(pictogram, comm_name, full_name, reagent_id_text, time_text, date_text, creator_text, expiry_text) {
    let label_contents = "";
    if (pictogram != "N/A") { // Pictogram
        label_contents = '<div class="label"><section style="width:80%;"><div class="reagent-label-content">\
        <h2 class="label-text">'+comm_name+'</h2>\
        <h5 class="label-text">'+full_name+'</h5>\
        <h4 class="label-text">'+reagent_id_text+'</h4>\
        <h4 class="label-text">'+time_text+'</h4>\
        <h4 class="label-text">'+date_text+'</h4>\
        <h4 class="label-text">'+creator_text+'</h4>\
        <h4 class="label-text">'+expiry_text+'</h4></div></section>\
        <section style="width:20%;height:90%;display:flex;justify-content:center;align-items:center;"><img src="../Images/Hazards/'+pictogram+'" style="max-width:100%; max-height:100%;"></section></div>';
    } else { // No pictogram
        label_contents = '<div class="label"><section style="width:100%;"><div class="reagent-label-content">\
        <h2 class="label-text">'+comm_name+'</h2>\
        <h5 class="label-text">'+full_name+'</h5>\
        <h4 class="label-text">'+reagent_id_text+'</h4>\
        <h4 class="label-text">'+time_text+'</h4>\
        <h4 class="label-text">'+date_text+'</h4>\
        <h4 class="label-text">'+creator_text+'</h4>\
        <h4 class="label-text">'+expiry_text+'</h4></div></section></div>';
    }
    return label_contents;
}

// Get params from URL
const params = new URLSearchParams(location.search);
const reagent = params.get("reagent");

// Text for labels
const label_reagent_id = "Reagent ID: R___________";
const label_time = "Time made: ____________";
const label_date = "Date made: ____________";
const label_creator = "Made by: ______________";
const label_expiry = "Expires: _______________";

// Reagent dictionary
const pictogram_dict = {
    "ascorbic_solution": "ascorbic_solution.png",
    "dpip_dye": "N/A",
    "chelating_solution": "chelating_solution.png",
    "precipitation_solution": "precipitation_solution.png"
}
const comm_name = {
    "ascorbic_solution": "Ascorbic Acid",
    "dpip_dye": "DPIP dye (for Vit. C)",
    "chelating_solution": "Chelating Solution",
    "precipitation_solution": "Precipitation Sol."
};
const full_name = {
    "ascorbic_solution": "L-Ascorbic Acid + Metaphosphoric Acid + Acetic acid + EDTA",
    "dpip_dye": "2,6-dichlorophenolindophenol sodium salt",
    "chelating_solution": "Ethylenediaminetetraacetic acid (di-sodium salt dihydrate)",
    "precipitation_solution": "Metaphosphoric acid + Acetic acid (glacial)"
};

// Start a new page
let page_contents = '<section class="labels">';

// Make 18 labels
for (let label_no=0; label_no<18; label_no++) {
    page_contents += gen_reagent_label(pictogram_dict[reagent], comm_name[reagent], full_name[reagent], label_reagent_id, label_time, label_date, label_creator, label_expiry);
}

// End page and add append to site
page_contents += '</section>';
document.getElementById('labels-here').innerHTML += page_contents;