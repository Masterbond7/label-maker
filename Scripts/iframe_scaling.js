// Function to convert to mm
function xToPx(x) {
    var div = document.createElement('div');
    div.style.position = "absolute";
    div.style.display = 'block';
    div.style.height = x;
    document.body.appendChild(div);
    var px = parseFloat(window.getComputedStyle(div, null).height);
    div.parentNode.removeChild(div);
    return px;
}

function set_iframe_scale() {
    const iframe = document.getElementById('preview_iframe');

    const iframe_width = iframe.parentElement.clientWidth;
    const content_width = xToPx("210mm");

    const scaleFactor = iframe_width / content_width;

    //const iframe_content = iframe.contentWindow.document;
    iframe.style.transform = "scale("+scaleFactor+")";
    iframe.style.transformOrigin = "top left";
    iframe.style.width=(100/scaleFactor)+"%";
    iframe.style.height=(100/scaleFactor)+"%";
    //console.log(iframe_content.body.style.transform);
    //alert('a');
}