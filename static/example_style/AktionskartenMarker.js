/* global L */
/**
 * Example class showing how to implement new MarkerClasses
 * uses the glyphicons given by bootstrap
 */
L.StyleEditor.marker.AktionskartenMarker = L.StyleEditor.marker.Marker.extend({

  /* eslint-disable new-cap */
  createMarkerIcon(iconOptions) {
    const size = iconOptions.iconSize;
    const { icon } = iconOptions;
    const color = iconOptions.iconColor;

    return new L.divIcon({
      className: `leaflet-styleeditor-aktionsmarker-marker-${this.sizeToName(size)}`,
      icon,
      bgPos: this.backgroundPosition(color, icon, size),
      iconColor: color,
      iconSize: size,
      iconAnchor: [size[0] / 2, size[1] / 2],
      popupAnchor: [0, 0],
    });
  },

  /* eslint-disable no-param-reassign */
  createSelectHTML(parentUiElement, iconOptions, icon) {
    const tmpOptions = {};
    tmpOptions.iconSize = this.options.size.medium;
    tmpOptions.icon = icon;
    tmpOptions.iconColor = iconOptions.iconColor;

    parentUiElement.innerHTML = this.createMarkerIcon(tmpOptions).createIcon().outerHTML;
  },

  backgroundPosition(color, icon, size) {
    const hexColor = this.options.styleEditorOptions.util.rgbToHex(color);
    const pixelSize = this.sizeToPixel(size);

    const row = this.options.colorRamp.indexOf(hexColor);
    let colorIcons = this.options.markers[hexColor];
    if (typeof colorIcons === 'undefined') {
      colorIcons = this.options.markers.default;
    }
    const col = colorIcons.indexOf(icon);
    return L.point(col * pixelSize[0], row * pixelSize[1]);
  },

  options: {
    size: {
      small: [20, 20],
      medium: [30, 30],
      large: [40, 40],
    },

    colorRamp: [
      '#e04f9e', '#fe0000', '#ee9c00', '#ffff00', '#00e13c', '#00a54c', '#00adf0', '#7e55fc', '#1f4199', '#7d3411',
    ],

    markers: {
      default: ['train', 'megaphone', 'tent', 'speaker', '?', 'cooking-pot', 'police', 'nuclear', 'empty',
        'point', 'information', 'exclamation-mark', 'star', 'star-megaphone', 'arrow', 'bang'],
      '#7d3411': ['flag', 'megaphone', 'empty', 'point', 'exclamation-mark', 'thor-steinar', 'arrow'],
    },
  },

});
