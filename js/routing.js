var control  

function routing() {
    var btn 
    var container
  
    if ($('#checkbox_find_route').is(":checked")) {

        // CREATE BUTTON

        function createButton(label, container) {
            btn = L.DomUtil.create('button', '', container);
            btn.setAttribute('type', 'button');
            btn.innerHTML = label;
            return btn;
        };

        // INITIATE ROUTING CONTROL

        control = L.Routing.control({
            waypoints: [(51.7, -3.1), (51.8, -3.11)],
            routeWhileDragging: true
        }).addTo(map);

        // CREATE POPUP AND GET WAYPOINTS ON BUTTON CLICK

        map.on('click', function(e) {
                container = L.DomUtil.create('div'),
                startBtn = createButton('Set origin', container),
                destBtn = createButton('Set destination', container);
        
            L.popup()
                .setContent(container)
                .setLatLng(e.latlng)
                .openOn(map);
        
            L.DomEvent.on(startBtn, 'click', function() {
                control.spliceWaypoints(0, 1, e.latlng);
                map.closePopup();
            });
        
            L.DomEvent.on(destBtn, 'click', function() {
                control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
                map.closePopup();
            });
        });

    } else {
        map.removeControl(control);

        map.on("click", function() {
            map.closePopup();
        });
    };
};

// EVENT HANDLER

$("#checkbox_find_route").change(function() {
    routing()
});


