
  let map;
  
  var drawnItems;
        var styleEditor;
        var drawControl;
        var layerControl; // Declare layerControl in the global scope
   var loadedLayers = {};
   var newLayers = [];
    let offsetX, offsetY;

  map = L.map('map').setView([20, -40], 3);
  L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

 
// Basemap Layers
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    const osmStreetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const esriStreetLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // Add Basemap Layers to Map
    const baseMaps = {
      "OSM": osmLayer,
      "ESRI Imagery": esriLayer,
      "OSM Street": osmStreetLayer,
      "ESRI Street": esriStreetLayer
    };

    layerControl = L.control.layers(baseMaps).addTo(map);

    // Default Basemap Layer
    osmLayer.addTo(map);
  


    function addToLayerControl(layer) {
      
      layerControl.addOverlay(layer, 'Drawn Layer');
    }

    function setupDrawControl() {
      drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      styleEditor = L.control.styleEditor({
        position: "topleft",
        markerType: L.StyleEditor.marker.AktionskartenMarker,
        useGrouping: false
      });
      map.addControl(styleEditor);

      drawControl = new L.Control.Draw({
        draw: {
          position: 'topleft',
          polygon: {
            title: 'Draw a sexy polygon!',
            allowIntersection: false,
            drawError: {
              color: '#b00b00',
              timeout: 1000
            },
            shapeOptions: {
              color: '#bada55'
            },
            showArea: true
          },
          polyline: {
            metric: false
          },
          circle: {
            shapeOptions: {
              color: '#662d91'
            }
          }
        },
        edit: {
          featureGroup: drawnItems
        }
      });

      map.addControl(drawControl);

      map.on('draw:created', function (e) {
        var type = e.layerType,
          layer = e.layer;

        if (type === 'marker') {
          layer.bindPopup('A popup!');
        }

        drawnItems.addLayer(layer);
        newLayers.push(layer);  // Add the layer to the newLayers array
      });
    }

  


   

    function endEditing() {
      // Disable draw control
      map.removeControl(drawControl);
      map.removeControl(styleEditor);

      // Remove drawn items from the layer control
   //   if (layerControl) {
    //    drawnItems.eachLayer(function (layer) {
    //    layerControl.removeLayer(layer);
    //    });
    //    layerControl = null;
    //  }
    }








function saveData() {
  if (newLayers.length === 0) {
    alert('No new vectors to save.');
    return;
  }

  var featureCollection = {
    type: 'FeatureCollection',
    features: []
  };

  newLayers.forEach(function (layer) {
    // Convert each new layer to GeoJSON feature and add to the collection
    var feature = layer.toGeoJSON();
    featureCollection.features.push(feature);
  });

  // Convert the collection to GeoJSON
  var geojson = JSON.stringify(featureCollection);

  // Create a Blob containing the GeoJSON data
  var blob = new Blob([geojson], { type: 'application/json' });

  // Create a download link
  var link = document.createElement('a');
  link.href = URL.createObjectURL(blob);

  // Specify the file name
  link.download = 'new_vectors.geojson';

  // Append the link to the document and trigger a click to start the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
newLayers();
}

  
      function loadShapefile() {
      document.getElementById("shapefile-file").click();
    }

    document.getElementById("shapefile-file").addEventListener("change", function (event) {
      handleShapefile(event.target.files[0]);
    });

    function handleShapefile(file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        var arrayBuffer = reader.result;

        if (file.name.endsWith('.zip')) {
          shp(arrayBuffer).then(function (geojson) {
            var geojsonLayer = L.geoJSON(geojson).addTo(map);
            map.fitBounds(geojsonLayer.getBounds());
            updateLayerControl(geojsonLayer, file.name);
          }).catch(function (err) {
            alert('Error parsing shapefile: ' + err.message);
          });
        } else {
          alert('Unsupported file format. Please select a zipped Shapefile.');
        }
      };

      if (file) {
        reader.readAsArrayBuffer(file);
      }
    }

    function loadGeoTIFF() {
      handleFile(document.getElementById("geotiff-file").files[0]);
    }

    function handleFile(file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        var arrayBuffer = reader.result;

        if (file.name.endsWith('.tif') || file.name.endsWith('.tiff')) {
          parseGeoraster(arrayBuffer).then(georaster => {
            var layer = new GeoRasterLayer({
              georaster,
              opacity: 0.7,
              resolution: 256
            });
            layer.addTo(map);
            map.fitBounds(layer.getBounds());
            updateLayerControl(layer, file.name);
          });
        } else {
          alert('Unsupported file format. Please select a TIFF file.');
        }
      };

      if (file) {
        reader.readAsArrayBuffer(file);
      }
    }

    function loadGeoJSON() {
      document.getElementById("geojson-file").click();
    }

    document.getElementById("geojson-file").addEventListener("change", function (event) {
      handleGeoJSONFile(event.target.files[0]);
    });

    function handleGeoJSONFile(file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        var arrayBuffer = reader.result;

        if (file.name.endsWith('.geojson')) {
          var geojsonLayer = L.geoJSON(JSON.parse(arrayBuffer)).addTo(map);
          map.fitBounds(geojsonLayer.getBounds());
          updateLayerControl(geojsonLayer, file.name);
        } else {
          alert('Unsupported file format. Please select a GeoJSON file.');
        }
      };

      if (file) {
        reader.readAsText(file);
      }
    }

    function addLayerToControl(layer, name) {
      layerControl.addOverlay(layer, name);

     
    }

    function updateLayerControl(layer, name) {
      const layerName = name || getLayerName(layer);

      if (!loadedLayers[layerName]) {
        loadedLayers[layerName] = layer;
        addLayerToControl(layer, layerName);
      }
    }

    function getLayerName(layer) {
      return `${layer.type}_${new Date().getTime()}`;
    };
   













    function loadcsv() {
      var fileInput = document.getElementById("csv-file");
      var file = fileInput.files[0];

      if (file) {
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: function (result) {
            createCsvTable(result.data);

            result.data.forEach(function (row) {
              var marker = L.marker([row.Latitude, row.Longitude], {
                opacity: 1
              }).bindPopup(row.Title);

              marker.addTo(map);
            });

            // Show the sidebar after loading the CSV
            document.getElementById('sidebar').style.display = 'block';
          },
          error: function (error) {
            console.error('Error parsing CSV file:', error.message);
          }
        });
      }
    }

    function createCsvTable(data) {
      var tableHtml = '<table border="1"><tr>';
      var headers = Object.keys(data[0]);

      headers.forEach(function (header) {
        tableHtml += '<th>' + header + '</th>';
      });

      tableHtml += '</tr>';

      data.forEach(function (row) {
        tableHtml += '<tr>';
        headers.forEach(function (header) {
          tableHtml += '<td>' + row[header] + '</td>';
        });
        tableHtml += '</tr>';
      });

      tableHtml += '</table>';

      document.getElementById('csv-table').innerHTML = tableHtml;
    }

    function toggleDropdown(id) {
      var dropdown = document.getElementById(id).getElementsByClassName("dropdown")[0];
      dropdown.classList.toggle("show");
    }

    document.addEventListener("click", function (event) {
      if (!event.target.matches('.navbar-dropdown a')) {
        var dropdowns = document.getElementsByClassName("dropdown");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    });

    function dragStart(e) {
      offsetX = e.clientX - parseInt(window.getComputedStyle(e.target).left);
      offsetY = e.clientY - parseInt(window.getComputedStyle(e.target).top);
    }

    function allowDrop(e) {
      e.preventDefault();
    }

    function dragging(e) {
      e.preventDefault();
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      document.getElementById('sidebar').style.left = x + 'px';
      document.getElementById('sidebar').style.top = y + 'px';
    }

    function closeSidebar() {
      document.getElementById('sidebar').style.display = 'none';
    }
 
 

  

