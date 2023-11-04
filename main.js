var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([20.405970, 44.841260]),
      zoom: 16
    })
});

var layer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([20.405970, 44.841260]))
            })
        ]
    })
});

map.addLayer(layer);

var overlay = new ol.Overlay({
    element: container,
    // autoPan: true,
    // autoPanAnimation: {
    //     duration: 250
    // }
});

map.addOverlay(overlay);

//ZA IE ILI DA IDE ADDEVENTLISTENER ILI DA SE STAVI closer.on('click', function() {})
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

map.on('singleclick', function(event) {
    if(map.hasFeatureAtPixel(event.pixel) === true) {
        var coordinate = event.coordinate;
        content.innerHTML = '<b>HELLO!!!</b>';
        overlay.setPosition(coordinate);
    } else {
        overlay.setPosition(undefined);
        closer.blur();
    }
});

overlay.setPosition(ol.proj.fromLonLat([20.405970, 44.841260]));
content.innerHTML = "<b>Postetite nas ovde!</b>";