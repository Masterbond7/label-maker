// Define function to generate empty label
function gen_reagent_label(reagent) {
    let label_contents = '<div class="label"><div class="label-content">'+reagent+'</div></div>';
    return label_contents;
}

// Get params from URL
const params = new URLSearchParams(location.search);
const reagent = parseInt(params.get("reagent"));

// Text for labels
const label_reagent_id = "Reagent ID: R____";

// Start a new page
let page_contents = '<section class="labels">';

// Make 18 labels
for (let label_no=0; label_no<18; label_no++) {
    page_contents += gen_reagent_label(reagent);
}

// End page and add append to site
page_contents += '</section>';
document.getElementById('labels-here').innerHTML += page_contents;