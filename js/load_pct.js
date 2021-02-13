// PCT FLOWS
// NEED TO PROPERLY RECONFIGURE THIS 

var pctLayer
var pctStyled
var pctGovStyled
var pctGenderStyled
var pctDutchStyled
var pctEbikeStyled
var array = []

function loadPct() {
    if (pctStyled) {
        pctStyled.remove()
    } if (pctDutchStyled) {
        pctDutchStyled.remove()
    } if (pctGovStyled) {
        pctGovStyled.remove()
    } if (pctGenderStyled) {
        pctGenderStyled.remove()
    } if (pctEbikeStyled) {
        pctEbikeStyled.remove()
    };
   
    $.ajax({
        url: "php/load_pct.php",
        type: "POST",
        async: true,
        data: {filter: $("#filter1").val(),
               filter2: $("#pct_filter").val()
            },
        success: function(response) {

            L.geoJSON(JSON.parse(response), {
                function(feature) {
                    var parsed 
                    parsed = parseInt(feature.properties.bicycle, 10);
                    array.push(parsed)
                }
            })
            
            if ($("#pct_filter").val() == 'Baseline cycle data') {
                

                L.geoJSON(JSON.parse(response), {
                    style: function(feature) {

                        var parsed 
                        parsed = parseInt(feature.properties.bicycle, 10);
                        array.push(parsed)

                        return {weight: 0}
                    }
                });

                pctStyled = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        
                        return {color: "#961894", weight: stylePct(feature.properties.bicycle, array)}
                    },
                    onEachFeature: 
                    function onEachFeature(feature, layer) {
                    layer.bindPopup('<b>' + "Current predicted flows: " + '</b>' + feature.properties.bicycle + '<hr class=divider />' +
                                    '<b>' + "Government target: " + '</b>' + feature.properties.govtarget_ + '<hr class=divider />' +
                                    '<b>' + "Gender equality: " + '</b>' + feature.properties.gendereq_s + '<hr class=divider />' +
                                    '<b>' + "GoDutch scenario: " + '</b>' + feature.properties.dutch_slc + '<hr class=divider />' + 
                                    '<b>' + "Ebike scenario: " + '</b>' + feature.properties.ebike_slc + '<hr class=divider />' 
                    )}
                }).addTo(map)
                

            } else if ($("#pct_filter").val() == 'GoDutch') {
                

                L.geoJSON(JSON.parse(response), {
                    style: function(feature) {

                        var parsed 
                        parsed = parseInt(feature.properties.dutch_slc, 10);
                        array.push(parsed)

                        return {weight: 0}
                    }
                });

                pctDutchStyled = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        
                        return {color: "#961894", weight: stylePct(feature.properties.dutch_slc, array)}
                    },
                    onEachFeature: 
                    function onEachFeature(feature, layer) {
                    layer.bindPopup('<b>' + "Current predicted flows: " + '</b>' + feature.properties.bicycle + '<hr class=divider />' +
                                    '<b>' + "Government target: " + '</b>' + feature.properties.govtarget_ + '<hr class=divider />' +
                                    '<b>' + "Gender equality: " + '</b>' + feature.properties.gendereq_s + '<hr class=divider />' +
                                    '<b>' + "GoDutch scenario: " + '</b>' + feature.properties.dutch_slc + '<hr class=divider />' + 
                                    '<b>' + "Ebike scenario: " + '</b>' + feature.properties.ebike_slc + '<hr class=divider />' 
                    )}
                }).addTo(map)
                
            } else if ($("#pct_filter").val() == 'Government target') {
                

                L.geoJSON(JSON.parse(response), {
                    style: function(feature) {

                        var parsed 
                        parsed = parseInt(feature.properties.govtarget_, 10);
                        array.push(parsed)

                        return {weight: 0}
                    }
                });

                pctGovStyled = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        
                        return {color: "#961894", weight: stylePct(feature.properties.govtarget_, array)}
                    },
                    onEachFeature: 
                    function onEachFeature(feature, layer) {
                    layer.bindPopup('<b>' + "Current predicted flows: " + '</b>' + feature.properties.bicycle + '<hr class=divider />' +
                                    '<b>' + "Government target: " + '</b>' + feature.properties.govtarget_ + '<hr class=divider />' +
                                    '<b>' + "Gender equality: " + '</b>' + feature.properties.gendereq_s + '<hr class=divider />' +
                                    '<b>' + "GoDutch scenario: " + '</b>' + feature.properties.dutch_slc + '<hr class=divider />' + 
                                    '<b>' + "Ebike scenario: " + '</b>' + feature.properties.ebike_slc + '<hr class=divider />'  
                    )}
                }).addTo(map)
                
            } else if ($("#pct_filter").val() == 'Gender equality') {
                

                L.geoJSON(JSON.parse(response), {
                    style: function(feature) {

                        var parsed 
                        parsed = parseInt(feature.properties.gendereq_s, 10);
                        array.push(parsed)

                        return {weight: 0}
                    }
                });

                pctGenderStyled = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        
                        return {color: "#961894", weight: stylePct(feature.properties.gendereq_s, array)}
                    },
                    onEachFeature: 
                    function onEachFeature(feature, layer) {
                    layer.bindPopup('<b>' + "Current predicted flows: " + '</b>' + feature.properties.bicycle + '<hr class=divider />' +
                                    '<b>' + "Government target: " + '</b>' + feature.properties.govtarget_ + '<hr class=divider />' +
                                    '<b>' + "Gender equality: " + '</b>' + feature.properties.gendereq_s + '<hr class=divider />' +
                                    '<b>' + "GoDutch scenario: " + '</b>' + feature.properties.dutch_slc + '<hr class=divider />' + 
                                    '<b>' + "Ebike scenario: " + '</b>' + feature.properties.ebike_slc + '<hr class=divider />'  
                    )}
                }).addTo(map)
                
            } else if ($("#pct_filter").val() == 'Ebike') {
               

                L.geoJSON(JSON.parse(response), {
                    style: function(feature) {

                        var parsed 
                        parsed = parseInt(feature.properties.ebike_slc, 10);
                        array.push(parsed)

                        return {weight: 0}
                    }
                });

                pctEbikeStyled = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        
                        return {color: "#961894", weight: stylePct(feature.properties.ebike_slc, array)}
                    },
                    onEachFeature: 
                    function onEachFeature(feature, layer) {
                    layer.bindPopup('<b>' + "Current predicted flows: " + '</b>' + feature.properties.bicycle + '<hr class=divider />' +
                                    '<b>' + "Government target: " + '</b>' + feature.properties.govtarget_ + '<hr class=divider />' +
                                    '<b>' + "Gender equality: " + '</b>' + feature.properties.gendereq_s + '<hr class=divider />' +
                                    '<b>' + "GoDutch scenario: " + '</b>' + feature.properties.dutch_slc + '<hr class=divider />' + 
                                    '<b>' + "Ebike scenario: " + '</b>' + feature.properties.ebike_slc + '<hr class=divider />'  
                    )}
                }).addTo(map)
                
            };
        }
    });
};

// EVENT HANDLER 

$("#pct_filter").change(function(){
    loadPct();
});