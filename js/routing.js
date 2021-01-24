// INITIATE ROUTING CONTROL


// CREATE BUTTON

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

function routing() {
    // CREATE BUTTON

    function createButton(label, container) {
        var btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        return btn;
    };


        var control;

        
        if ($("#checkbox_find_route").is(":checked")) {

            control = L.Routing.control({
            waypoints: [(51.7, -3.1), (51.8, -3.11)],
            routeWhileDragging: true
            }).addTo(map);

            map.on('click', function(e) {
                var container = L.DomUtil.create('div'),
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
            console.log("success")
            map.removeLayer(control)
        };
    };

// EVENT HANDLER

$("#checkbox_find_route").change(function() {
    routing()
});


