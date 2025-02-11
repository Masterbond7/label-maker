// Define function to generate empty label
function gen_empty_label() {
    let label_contents = '<div class="label"><div class="label-content"></div></div>';
    return label_contents;
}

// Define function to generate empty label
function gen_reagent_label(pictogram, comm_name, full_name, reagent_id_text, time_text, date_text, creator_text, expiry_text, mg_used_text, reagent) {
    
    
    let label_contents = "";
    if (pictogram != "N/A") { // Pictogram
        label_contents = '<div class="label"><section style="width:80%;"><div class="reagent-label-content">\
        <h2 class="label-text">'+comm_name+'</h2>';
        if (full_name!="N/A") {label_contents+='<h5 class="label-text">'+full_name+'</h5>';}
        label_contents+='<h4 class="label-text">'+reagent_id_text+'</h4>\
        <h4 class="label-text">'+time_text+'</h4>\
        <h4 class="label-text">'+date_text+'</h4>\
        <h4 class="label-text">'+creator_text+'</h4>\
        <h4 class="label-text">'+expiry_text+'</h4>';
        if (reagent=="ascorbic_solution") {label_contents+='<h4 class="label-text">'+mg_used_text+'</h4>'}
        label_contents+='</div></section><section style="width:20%;height:90%;display:flex;justify-content:center;align-items:center;"><img src="../Images/Hazards/'+pictogram+'" style="max-width:100%; max-height:100%;"></section></div>';
    } else { // No pictogram
        label_contents = '<div class="label"><section style="width:100%;"><div class="reagent-label-content">\
        <h2 class="label-text">'+comm_name+'</h2>';
        if (full_name!="N/A") {label_contents+='<h5 class="label-text">'+full_name+'</h5>';}
        label_contents+='<h4 class="label-text">'+reagent_id_text+'</h4>\
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
const label_type = params.get("label_type");
const num_labels = parseInt(params.get("num_labels"));
const used_labels = parseInt(params.get("used_labels"));

// Text for labels
let label_reagent_id = "";
if (label_type=="chemical") {label_reagent_id = "Chemical ID: A__________";}
else {label_reagent_id = "Reagent ID: R___________";}

let label_time = "";
if (label_type=="chemical") {label_time="Date received: __________";}
else {label_time="Time made: ____________";}

let label_date = "";
if (label_type=="chemical") {label_date="Date opened: ___________";}
else {label_date = "Date made: ____________";}

let label_creator = "";
if (label_type=="chemical") {label_creator="Opened by: ____________";}
else {label_creator = "Made by: ______________";}
const label_expiry     = "Expires: _______________";
const label_mg_used    = "mg used: ______________";

// Reagent dictionary
const pictogram_dict = {
    "ascorbic_solution": "ascorbic_solution.png",
    "dpip_dye": "N/A",
    "chelating_solution": "chelating_solution.png",
    "precipitation_solution": "precipitation_solution.png",
    "extraction_solution": "extraction_solution.png",
    "glycerine_40": "N/A",
    "n_solvent": "n_solvent.png",
    "naoh_0-02m": "naoh_solution.png",
    "ammonia_5m": "ammonia_5m.png",

    "nahco3":"N/A",
    "metaphosphoric_acid":"metaphosphoric_acid.png",
    "glacial_acetic_acid":"glacial_acetic_acid.png",
    "edta":"edta.png",
    "ascorbic_acid":"N/A",
    "2_6_dcpip":"N/A",
    "diethyl_ether":"diethyl_ether.png",
    "ethanol":"ethanol.png",
    "phenolpthalein":"phenolpthalein.png",
    "naoh_0-1m":"naoh_0-1m.png",
    "ammonia_25":"ammonia_25.png",
    "glycerine_100":"N/A"
}
const comm_name = {
    "ascorbic_solution": "Ascorbic Acid",
    "dpip_dye": "DPIP dye (for Vit. C)",
    "chelating_solution": "Chelating Solution",
    "precipitation_solution": "Precipitation Sol.",
    "extraction_solution": "Extraction Solution",
    "glycerine_40": "40% Glycerine Solution",
    "n_solvent": "Neutralized Solvent",
    "naoh_0-02m": "0.02M NaOH Solution",
    "ammonia_5m": "5M Ammonia Solution",

    "nahco3":"Sodium Hydrogen Carbonate",
    "metaphosphoric_acid":"Metaphosphoric Acid",
    "glacial_acetic_acid":"Glacial Acetic Acid",
    "edta":"EDTA",
    "ascorbic_acid":"Ascorbic Acid",
    "2_6_dcpip":"DCPIP dye (powder)",
    "diethyl_ether":"Diethyl Ether",
    "ethanol":"Ethanol",
    "phenolpthalein":"Phenolpthalein",
    "naoh_0-1m":"0.1M NaOH",
    "ammonia_25":"Ammonia",
    "glycerine_100":"Glycerine"
};
const full_name = {
    "ascorbic_solution": "L-Ascorbic Acid + Metaphosphoric Acid + Acetic acid + EDTA",
    "dpip_dye": "2,6-dichlorophenolindophenol sodium salt",
    "chelating_solution": "Ethylenediaminetetraacetic acid (di-sodium salt dihydrate)",
    "precipitation_solution": "Metaphosphoric acid + Acetic acid (glacial)",
    "extraction_solution": "Metaphosphoric Acid + Acetic acid + EDTA",
    "glycerine_40": "Glycerine",
    "n_solvent": "Diethyl ether + Ethanol + Phenolphthalein + NaOH",
    "naoh_0-02m": "NaOH",
    "ammonia_5m": "N/A",

    "nahco3":"N/A",
    "metaphosphoric_acid":"N/A",
    "glacial_acetic_acid":"N/A",
    "edta":"Ethylenediaminetetraacetic acid (di-sodium salt dihydrate)",
    "ascorbic_acid":"N/A",
    "2_6_dcpip":"2,6-dichlorophenolindophenol sodium salt",
    "diethyl_ether":"N/A",
    "ethanol":"Analytical grade",
    "phenolpthalein":"Indicator for FFA testing",
    "naoh_0-1m":"N/A",
    "ammonia_25":"25% ammonia",
    "glycerine_100":"100% glycerine"
};

// Variables to keep track of labels made
let made_pages = 0;
let made_used_labels = 0;
let made_labels = 0;

// Calculate number of needed pages
let total_labels = used_labels + num_labels;
let pages_needed = Math.ceil(total_labels/18);

// Make number of needed pages
while (made_pages < pages_needed) {
    // Start a new page
    let page_contents = '<section class="labels">';

    // Make 18 labels
    for (let label_no=0; label_no<18; label_no++) {
        // If more used labels are needed
        if (made_used_labels < used_labels) {
            page_contents += gen_empty_label();
            made_used_labels++;
            continue; // Jump back to top of loop
        }

        // If more reagent/chemical labels are needed
        if (made_labels < num_labels) {
            // Otherwise, generate label as normal
            page_contents += gen_reagent_label(pictogram_dict[reagent], comm_name[reagent], full_name[reagent], label_reagent_id, label_time, label_date, label_creator, label_expiry, label_mg_used, reagent);
            made_labels++;
            continue; // Jump back to top of loop
        }

        // If this code has been reached no other labels are needed
        // so generate empty labels.
        page_contents += gen_empty_label();
    }

    // End page and add append to site
    page_contents += '</section>';
    document.getElementById('labels-here').innerHTML += page_contents;
    made_pages++;
}

/*
// Start a new page
let page_contents = '<section class="labels">';

// Make x labels
for (let label_no=0; label_no<num_labels; label_no++) {
    page_contents += gen_reagent_label(pictogram_dict[reagent], comm_name[reagent], full_name[reagent], label_reagent_id, label_time, label_date, label_creator, label_expiry, label_mg_used, reagent);
}

// End page and add append to site
page_contents += '</section>';
document.getElementById('labels-here').innerHTML += page_contents;*/