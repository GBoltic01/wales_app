// LOAD TRAFFIC COUNT
var trafficCountLayer;
function loadTrafficCount() {
    $.ajax({
        url: "php/load_traffic_count.php",
        type: "POST",
        data: {filter: $('#filter1').val()},
        success: function(response) {
            if ($("#checkbox_traffic_count").is(":checked")) {
                trafficCountLayer = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        return {
                            color: "red",
                            opacity: 0.4,
                            weight: styleTrafficCount(feature.properties.fdall_mv)
                        };
                    },
                    onEachFeature: 
                        function onEachFeature(feature, layer) {
                        layer.bindPopup('<b>' + "Start point: " + '</b>' + feature.properties.a_junction + '<hr class=divider />' +
                                        '<b>' + "End point: " + '</b>' + feature.properties.b_junction + '<hr class=divider />' + 
                                        '<b>' + "Road: " + '</b>' + feature.properties.road + '<hr class=divider />' + 
                                        '<b>' + "Count (all motor vehicles): " + '</b>' + feature.properties.fdall_mv)
            }
                });
                trafficCountLayer.addTo(map);
            } else {
                map.removeLayer(trafficCountLayer);
            };
        }
    });
};

// ACCIDENTS DATA 

function accidentSeverity(a) {
    if (a == 1) {
        return "Fatal injury";
    } else if (a == 2) {
        return "Serious injury";
    } else {
        return "Slight injury";
    };
};


var accidentsLayer;
var legendAccidents; 

function refereshAccidents() {
    $.ajax({
        url: "php/load_accidents.php",
        type: "POST",
        data: {filter: $("#filter1").val()},
        success: function(response) {
            if ($("#filter").is(":checked")) {
                accidentsLayer = L.geoJSON(JSON.parse(response), {
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 2.5,
                            fillColor: accidentsColour(feature.properties.accident_s),
                            color: accidentsColour(feature.properties.accident_s),
                            opacity: 1,
                            fillOpacity: 1
                        }).bindPopup('<b>' + "Accident severity: " + '</b>' + accidentSeverity(feature.properties.accident_s) + '<hr class=divider />' +
                                    '<b>' + "Road speed limit: " + '</b>' + feature.properties.speed_limi + " mph" + '<hr class=divider />' )
                    }
                });
                var div;

                legendAccidents = L.control({ position: "bottomleft" });
                legendAccidents.onAdd = function(map) {
                    div = L.DomUtil.create("div", "legend");
                    div.innerHTML += "<h5><b>Road accidents</b></h5>";
                    div.innerHTML += '<i style="background: black"></i><span>Fatal</span><br>';
                    div.innerHTML += '<i style="background: red"></i><span>Serious</span><br>';
                    div.innerHTML += '<i style="background: #ffd738"></i><span>Slight</span><br>';               
                    return div;
                    };

                legendAccidents.addTo(map);
                accidentsLayer.addTo(map);
                $("#legend_scrollable").append(div);
            } else {
                map.removeLayer(accidentsLayer);
                map.removeControl(legendAccidents);
            };
        }
    });
};
// ERM ROUTES
var ermLayer;
var legendErm;

function loadErmRoutes() {
    $.ajax({
        url: "php/load_erm_route.php",
        type: "POST",
        data: {filter: $('#filter1').val()},
        success: function(response) {
            if ($("#checkbox").is(":checked")) {
                ermLayer = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        return {
                            color: styleErm(feature.properties.pathdesign)
                        };
                    },
                    onEachFeature: 
                        function onEachFeature(feature, layer) {
                        layer.bindPopup('<b>' + "Route ID: " + '</b>' + feature.properties.routeid + '<hr class=divider />' +
                                        '<b>' + "Path description: " + '</b>' + feature.properties.pathdescri + '<hr class=divider />' + 
                                        '<b>' + "Route description: " + '</b>' + feature.properties.routedescr + '<hr class=divider />' + 
                                        '<b>' + "Statement: " + '</b>' + feature.properties.statement)
                    },
                });
                var div;

                legendErm = L.control({ position: "bottomleft" });
                legendErm.onAdd = function(map) {
                    div = L.DomUtil.create("div", "legend");
                    div.innerHTML += "<h5><b>ERM Routes</b></h5>";
                    div.innerHTML += '<i style="background: #2b83ba""></i><span>Shared Use</span><br>';
                    div.innerHTML += '<i style="background: #1a9641"></i><span>Walking</span><br>';
                    div.innerHTML += '<i style="background: #d7191c"></i><span>Cycling</span><br>';               
                    return div;
                    };
                legendErm.addTo(map);
                ermLayer.addTo(map);
                $("#legend_scrollable").append(div);
            } else {
                map.removeLayer(ermLayer);
                map.removeControl(legendErm);
            };
        }
    });
};
// INM ROUTES
function routeUse(a) {
    if (a === "Shared_Use") {
        return "Shared Use"
    };
};
var inmLayer;
var legendInm;

function loadInmRoutes() {
    $.ajax({
        url: "php/load_inm_routes.php",
        type: "POST",
        data: {filter: $('#filter1').val()},
        success: function(response) {
            if ($("#checkbox_inm_routes").is(":checked")) {
                inmLayer = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        return {
                            color: styleInm(feature.properties.routeuse)
                        };
                    },
                    onEachFeature: function onEachFeature(feature, layer) {
                        layer.bindPopup('<b>' + "Reference number: " + '</b>' + feature.properties.ref + '<hr class=divider />' +
                                        '<b>' + "Description: " + '</b>' + feature.properties.descriptio + '<hr class=divider />' + 
                                        '<b>' + "Type: " + '</b>' + feature.properties.typedescr + '<hr class=divider />' + 
                                        '<b>' + "Priority: " + '</b>' + feature.properties.priorityde + '<hr class=divider />' + 
                                        '<b>' + "Route use: " + '</b>' + routeUse(feature.properties.routeuse))
                    },
                });
                var div; 

                legendInm = L.control({ position: "bottomleft" });
                legendInm.onAdd = function(map) {
                    div = L.DomUtil.create("div", "legend");
                    div.innerHTML += "<h5><b>INM Routes</b></h5>";
                    div.innerHTML += '<i style="background: #2b83ba""></i><span>Shared Use</span><br>';
                    div.innerHTML += '<i style="background: #1a9641"></i><span>Walking</span><br>';
                    div.innerHTML += '<i style="background: #d7191c"></i><span>Cycling</span><br>';               
                    return div;
                    };
                legendInm.addTo(map);
                inmLayer.addTo(map);
                $("#legend_scrollable").append(div);
            } else {
                map.removeLayer(inmLayer);
                map.removeControl(legendInm)
            };
        }
    });
};

// ACTIVE TRAVEL DESIGNATED LOCALITIES
var designatedLocalitiesLayer;
function loadDesignatedLocalities() {
    $.ajax({
        url: "php/load_designated_localities.php",
        type: "POST",
        data: {filter: $('#filter1').val()},
        success: function(response) {
            if ($("#checkbox_designated_localities").is(":checked")) {
                designatedLocalitiesLayer = L.geoJSON(JSON.parse(response), {
                    onEachFeature: function onEachFeature(feature, layer) {
                        layer.bindPopup('<b>' + "Built up area: " + '</b>' + feature.properties.name)
                    }
                });
                designatedLocalitiesLayer.addTo(map);
            } else {
                map.removeLayer(designatedLocalitiesLayer);
            };
        }
    });
};

// WIMD 

var wimdLayer;
var legendWimd;

function loadWimd() {
    $.ajax({
        url: "php/load_wimd.php",
        type: "POST",
        data: {filter: $("#filter1").val()},
        success: function(response) {
            if ($("#checkbox_wimd").is(":checked")) {
                wimdLayer = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        return {
                            color: "black",
                            fillColor: styleWimd(feature.properties.wimd_2014),
                            fillOpacity: 0.4,
                            weight: 1,
                            opacity: 0.5
                        };
                    },
                    onEachFeature: function onEachFeature(feature, layer) {
                        layer.bindPopup('<b>' + "Local Authority: " + '</b>' + feature.properties.lsoa11nm + '<hr class=divider />' +
                                        '<b>' + "WIMD rank: " + '</b>' + feature.properties.wimd_2014 + '<hr class=divider />' + 
                                        '<b>' + "Group: " + '</b>' + feature.properties.map_group)
                    }
                });
                var div; 

                legendWimd = L.control({ position: "bottomleft" });
                legendWimd.onAdd = function(map) {
                    div = L.DomUtil.create("div", "legend");
                    div.innerHTML += "<h5><b>WIMD rank</b></h5>";
                    div.innerHTML += '<i style="background: #d7191c"></i><span>0-383</span><br>';  
                    div.innerHTML += '<i style="background: #fdae61"></i><span>384-764</span><br>';
                    div.innerHTML += '<i style="background: #ffff6e"></i><span>765-1146</span><br>';
                    div.innerHTML += '<i style="background: #a6d96a"></i><span>1147-1527</span><br>';   
                    div.innerHTML += '<i style="background: #1a9641"></i><span>1528-1909</span><br>';              
                    return div;
                    };
                legendWimd.addTo(map);
                wimdLayer.addTo(map);
                $("#legend_scrollable").append(div);
            } else {
                map.removeLayer(wimdLayer);
                map.removeControl(legendWimd);
            };
        }
    });
};

// LOAD TRAVEL TO WORK MODE

var travelToWork;
var legendTravelToWork;

function loadtravelToWork() {
    $.ajax({
        url: "php/load_travel_to_work.php",
        type: "POST",
        data: {filter: $("#filter1").val()},
        success: function(response) {
            if ($("#checkbox_travel_to_work").is(":checked")) {
                travelToWork = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        return {
                            color: "black",
                            fillColor: styleTravelToWork(feature.properties.walkbikepc),
                            fillOpacity: 0.4,
                            weight: 1,
                            opacity: 0.5
                        };
                    },
                    onEachFeature: function onEachFeature(feature, layer) {
                        var walkbike = parseFloat(feature.properties.walkbikepc)
                        var publicTransport = parseFloat(feature.properties.publictr_1)
                        var privateVehicle = parseFloat(feature.properties.privatev_1)
                        layer.bindPopup('<b>' + "Walking or cycling: " + '</b>' + walkbike.toFixed(2) + " %" + '<hr class=divider />' +
                                        '<h5><b>' + "Other modes " + '</b></h5>' + 
                                        '<b>' + "Public transport: " + '</b>' + publicTransport.toFixed(2) + " %" + '<hr class=divider />' + 
                                        '<b>' + "Private vehicle: " + '</b>' + privateVehicle.toFixed(2) + "%")
                    }
                });
                var div;

                legendTravelToWork = L.control({ position: "bottomleft" });
                legendTravelToWork.onAdd = function(map) {
                    div = L.DomUtil.create("div", "legend");
                    div.innerHTML += "<h5><b>Active travel trips [%]</b></h5>";
                    div.innerHTML += '<i style="background: #d7191c"></i><span>0-7.1</span><br>';  
                    div.innerHTML += '<i style="background: #f17c4a"></i><span>7.2-11</span><br>';
                    div.innerHTML += '<i style="background: #fec981"></i><span>11.1-15.8</span><br>';
                    div.innerHTML += '<i style="background: #ffffc0"></i><span>15.9-22.6</span><br>';   
                    div.innerHTML += '<i style="background: #c4e687"></i><span>22.7-31.9</span><br>';    
                    div.innerHTML += '<i style="background: #77c35c"></i><span>32-44</span><br>';   
                    div.innerHTML += '<i style="background: #1a9641"></i><span>44.1+</span><br>';            
                    return div;
                    };

                legendTravelToWork.addTo(map);
                travelToWork.addTo(map);
                $("#legend_scrollable").append(div);
            } else {
                map.removeLayer(travelToWork);
                map.removeControl(legendTravelToWork);
            };
        }
    });
};

// POPULATION DENSITY

var populationDensityLayer;
var legendPopulationDensity;

function loadpopulationDensity() {
    $.ajax({
        url: "php/load_population_density.php",
        type: "POST",
        data: {filter: $("#filter1").val()},
        success: function(response) {
            if ($("#checkbox_population_density").is(":checked")) {
                populationDensityLayer = L.geoJSON(JSON.parse(response), {
                    style: function(feature) {
                        return {
                            color: "black",
                            fillColor: stylePopulationDensity(feature.properties.allusualre),
                            fillOpacity: 0.75,
                            weight: 0.3,
                            opacity: 1
                        };
                    },
                    onEachFeature: function onEachFeature(feature, layer) {
                    layer.bindPopup('<b>' + "All residents: " + '</b>' + feature.properties.allusualre + '<hr class=divider />' +
                                        '<b>' + "Female: " + '</b>' + feature.properties.femalespct + " %" + '<hr class=divider />' + 
                                        '<b>' + "Male: " + '</b>' + feature.properties.malespct + "%")
                    }
                });
                var div;

                legendPopulationDensity = L.control({ position: "bottomleft" });
                legendPopulationDensity.onAdd = function(map) {
                    div = L.DomUtil.create("div", "legend");
                    div.innerHTML += "<h5><b>Number of residents</b></h5>";
                    div.innerHTML += '<i style="background: #f7fbff"></i><span>0-255</span><br>';  
                    div.innerHTML += '<i style="background: #c8ddf0"></i><span>256-321</span><br>';
                    div.innerHTML += '<i style="background: #73b3d8"></i><span>322-410</span><br>';
                    div.innerHTML += '<i style="background: #2879b9"></i><span>411-854</span><br>';   
                    div.innerHTML += '<i style="background: #08306b"></i><span>855-2152</span><br>';              
                    return div;
                    };

                legendPopulationDensity.addTo(map);
                populationDensityLayer.addTo(map);
                $("#legend_scrollable").append(div);
            } else {
                map.removeLayer(populationDensityLayer);
                map.removeControl(legendPopulationDensity);
            };
        }
    });
};

// EMPLOYMENT CENTRES
var employmentCentresLayer
function loadEmploymentCentres() {
    $.ajax({
        url: "php/load_employment_centres.php",
        type: "POST",
        data: {filter: $("#filter1").val()},
        success: function(response) {
            if ($("#checkbox_employment_centres").is(":checked")) {
                employmentCentresLayer = L.geoJSON(JSON.parse(response), {

                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: styleEmploymentCentres(feature.properties.allindustr),
                            fillColor: "#ff01a6",
                            color: "#ff01a6",
                            opacity: 0,
                            fillOpacity: 0.7
                        });
                    },
                    onEachFeature: function onEachFeature(feature, layer) {
                        layer.bindPopup('<b>' + "Total number of jobs: " + '</b>' + feature.properties.allindustr)
                    }
                });
                employmentCentresLayer.addTo(map);
            } else {
                map.removeLayer(employmentCentresLayer);
            };
        }
    });
};

// SCHOOLS
function bikeIt(a) {
    if (a == null) {
        return "No";
    } else {
        return a;
    };
};
var schoolsLayer
function loadSchools() {
    $.ajax({
        url: "php/load_schools.php",
        type: "POST",
        data: {filter: $("#filter1").val()},
        success: function(response) {
            if ($("#checkbox_schools").is(":checked")) {
                schoolsLayer = L.geoJSON(JSON.parse(response), {

                    pointToLayer: function(feature, latlng) {
                        return L.marker(latlng, {
                            icon: L.AwesomeMarkers.icon({
                                icon: 'graduation-cap',
                                prefix: 'fa', 
                                markerColor: 'blue'
                            })
                        });
                    },
                    onEachFeature: function onEachFeature(feature, layer) {  
                        layer.bindPopup('<b>' + "School: " + '</b>' + feature.properties.school_nam + '<hr class=divider />' +
                                        '<b>' + "Address: " + '</b>' + feature.properties.address1 + ", " + feature.properties.address2 + '<hr class=divider />' + 
                                        '<b>' + "Postcode: " + '</b>' + feature.properties.postcode + '<hr class=divider />' +
                                        '<b>' + "Bike It: " + '</b>' + bikeIt(feature.properties.bikeit));
                    }
                })
                schoolsLayer.addTo(map);

            } else {
                map.removeLayer(schoolsLayer);
            };
        }
    });
};
// HEALTHCARE
function loadHealthcare() {
    $.ajax({
        url: "php/load_healthcare.php",
        type: "POST",
        data: {filter: $("#filter1").val()},
        success: function(response) {
            if ($("#checkbox_healthcare").is(":checked")) {
                healthcareLayer = L.geoJSON(JSON.parse(response), {

                    pointToLayer: function(feature, latlng) {
                        return L.marker(latlng, {
                            icon: L.AwesomeMarkers.icon({
                                icon: 'clinic-medical',
                                prefix: 'fa', 
                                markerColor: 'red'
                            })
                        });
                    },
                    onEachFeature: function onEachFeature(feature, layer) {  
                        layer.bindPopup('<b>' + "Type of establishment: " + '</b>' + feature.properties.type + '<hr class=divider />' +
                                        '<b>' + "Name of establishment: " + '</b>' + feature.properties.name + '<hr class=divider />' + 
                                        '<b>' + "Postcode: " + '</b>' + feature.properties.postcode); 
                    }
                });
                healthcareLayer.addTo(map);
            } else {
                map.removeLayer(healthcareLayer);
            };
        }
    });
};



// EVENT HANDLERS 

// SHOW COORDINATES on mouse move
map.on('mousemove', function(e) {
    var str = "<b>Lattitude: </b>" + e.latlng.lat.toFixed(5) + "<b> Longitude: </b>" + e.latlng.lng.toFixed(5) + "<b> Zoom level: </b>" + map.getZoom();
    $("#map_coords").html(str);
});
// TRAFFIC COUNT
$("#checkbox_traffic_count").change(function(){
    loadTrafficCount();
});
// ACCIDENTS 
$("#filter").change(function(){
    refereshAccidents();
});
// LOCAL AUTHORITIES
$("#filter1").change(function(){
    refreshLocalAuthorities();
});
// ERM ROUTES
$("#checkbox").change(function(){
    loadErmRoutes();
});
// INM ROUTES
$("#checkbox_inm_routes").change(function(){
    loadInmRoutes();
});
// AT DESIGNATED LOCALITIES
$("#checkbox_designated_localities").change(function(){
    loadDesignatedLocalities();
});
// WIMD
$("#checkbox_wimd").change(function(){
    loadWimd();
});
// CAR OWNERSHIP
$("#checkbox_car_ownership").change(function(){
    loadCarOwnership();
});
// TRAVEL TO WORK MODE
$("#checkbox_travel_to_work").change(function(){
    loadtravelToWork();
});
// POPULATION DENSITY
$("#checkbox_population_density").change(function(){
    loadpopulationDensity();
});
// EMPLOYMENT CENTRES
$("#checkbox_employment_centres").change(function(){
    loadEmploymentCentres();
});
// SCHOOLS
$("#checkbox_schools").change(function(){
    loadSchools();
});
// HEALTHCARE
$("#checkbox_healthcare").change(function(){
    loadHealthcare();
});
// COMMONPLACE
$("#commonplace_filter").change(function(){
    loadCommonplace();
});