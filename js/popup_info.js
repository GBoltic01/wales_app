$("#data-tooltip").click(function(e) {
  e.stopPropagation();
  new jBox('Tooltip', {
    width: 400,
    height: 60,
    attach: '#data-tooltip',
    trigger: 'click',
    closeOnClick: true,
    title: 'What are the data sources?',
    content: '<i>Contains public sector information licensed under the <a href="http://nationalarchives.gov.uk/doc/open-government-licence/version/2/" target="_blank">Open Government Licence v2.0.</a> and <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap data.</a></i>'
  });
});

$("#pct-tooltip").click(function(e) {
  e.stopPropagation();
  new jBox('Tooltip', {
    width: 400,
    height: 100,
    attach: '#pct-tooltip',
    trigger: 'click',
    closeOnClick: true,
    title: 'What is Propensity to Cycle Tool (PCT)?',
    content: '<i>PCT provides several scenarios of active travel commute flows, and shows the routes with high cycling potential. The data is sourced from the official <a href="https://www.pct.bike/" target="_blank">PCT website</a>, where more information about the tool can be accessed.</i>'
  });
});

$("#routing-tooltip").click(function(e) {
  e.stopPropagation();
  new jBox('Tooltip', {
    width: 400,
    height: 75,
    attach: '#routing-tooltip',
    trigger: 'click',
    closeOnClick: true,
    title: 'How to generate a route?',
    content: '<i>Toggle the switch on and click on a map to specify origin and destination points. Toggle the switch off to reset the ruting machine.</i>'
  });
});

$("#get-in-touch").hover(function() {
  new jBox('Tooltip', {
    width: 400,
    height: 100,
    attach: '#get-in-touch',
    closeOnMouseleave: true,
    content: '<i>I would encourage you to get in touch if you have any questions, suggestions or comments. You can contact me via email: <b>gregor.boltic@gmail.com</b> or send me a message on <a href="https://www.linkedin.com/in/gregor-bolti%C4%8D-9ab9b8157/" target="_blank">LinkedIn</a></i>'
  });
});