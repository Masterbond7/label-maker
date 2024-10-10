function get_form(event) {
    // Stop page from refreshing
    event.preventDefault();

    // Get form data
    let starting_id = document.getElementById("startingID").value;
    let num_samples = document.getElementById("noSamples").value;
    //alert("Button Pressed! There are "+num_samples+" samples starting with ID: "+starting_id);

    // Open printing window
    window.open("printing.html?startingID="+starting_id+"&noSamples="+num_samples);
}