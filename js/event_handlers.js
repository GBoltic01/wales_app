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
        // FIND ROUTE
        $("#checkbox_find_route").change(function(){
            routing();
        });
        // PCT
        $("#pct").change(function(){
            loadPct();
        });