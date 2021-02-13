var map = L.map('mapdiv');
map.setView([52.4051, -4.1601], 8);

var baseMap = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
map.addLayer(baseMap);

// LOAD LOCAL AUTHORITIES DATA 
var localAuthorityLayer;
refreshLocalAuthorities();

function refreshLocalAuthorities() {
$.ajax({
    url: "php/load_local_authorities.php",
    type: "POST",
    data: {filter: $("#filter1").val()},
    success: function(response) {
        if (localAuthorityLayer) {
            map.removeLayer(localAuthorityLayer);
        };
        localAuthorityLayer = L.geoJSON(JSON.parse(response), {
            style: 
            function(feature) {
                return {
                    color: "black",
                    fillOpacity: 0,
                    weight: 2.5
                };
            }
        });
        var localAuthorities = $.parseJSON(response);
        $.each(localAuthorities.features, function(key, value) {
            $('#filter1').append('<option value="' + value.properties.name + '">' + value.properties.name + '</option>');   
            var map = {};
            $('#filter1.form-control option').each(function () {
                if (map[this.value]) {
                    $(this).remove()
                }
                map[this.value] = true;
            });    
        });
        localAuthorityLayer.addTo(map);
        var test11 = localAuthorityLayer.getBounds()
        console.log(test11)
        map.fitBounds(localAuthorityLayer.getBounds());
    }});       
};