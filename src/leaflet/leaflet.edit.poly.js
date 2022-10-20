L.Edit.PolyVerticesEdit = L.Handler.extend({
  options: {
    icon: new L.DivIcon({
      iconSize: new L.Point(8, 8),
      className: 'leaflet-div-icon leaflet-editing-icon',
    }),
    touchIcon: new L.DivIcon({
      iconSize: new L.Point(20, 20),
      className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon',
    }),
    drawError: {
      color: '#b00b00',
      timeout: 1000,
    },
  },

  // @method intialize(): void
  initialize: function(poly, latlngs, options) {
    // if touch, switch to touch icon
    // if (L.Browser.touch) {
    // this.options.icon = this.options.touchIcon;
    // }
    this._poly = poly;

    if (options && options.drawError) {
      options.drawError = L.Util.extend({}, this.options.drawError, options.drawError);
    }

    this._latlngs = latlngs;

    L.setOptions(this, options);
  },

  // Compatibility method to normalize Poly* objects
  // between 0.7.x and 1.0+
  _defaultShape: function() {
    return L.LineUtil.isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
  },

  // @method addHooks(): void
  // Add listener hooks to this handler.
  addHooks: function() {
    var poly = this._poly;
    var path = poly._path;

    if (!(poly instanceof L.Polygon)) {
      poly.options.fill = false;
      if (poly.options.editing) {
        poly.options.editing.fill = false;
      }
    }

    if (path) {
      if (poly.options.editing.className) {
        if (poly.options.original.className) {
          poly.options.original.className.split(' ').forEach(function(className) {
            L.DomUtil.removeClass(path, className);
          });
        }
        poly.options.editing.className.split(' ').forEach(function(className) {
          L.DomUtil.addClass(path, className);
        });
      }
    }

    poly.setStyle(poly.options.editing);

    if (this._poly._map) {
      this._map = this._poly._map; // Set map

      if (!this._markerGroup) {
        this._initMarkers();
      }
      this._poly._map.addLayer(this._markerGroup);
    }
  },

  // @method removeHooks(): void
  // Remove listener hooks from this handler.
  removeHooks: function() {
    var poly = this._poly;
    var path = poly._path;

    if (path) {
      if (poly.options.editing.className) {
        poly.options.editing.className.split(' ').forEach(function(className) {
          L.DomUtil.removeClass(path, className);
        });
        if (poly.options.original.className) {
          poly.options.original.className.split(' ').forEach(function(className) {
            L.DomUtil.addClass(path, className);
          });
        }
      }
    }

    poly.setStyle(poly.options.original);

    if (poly._map) {
      poly._map.removeLayer(this._markerGroup);
      delete this._markerGroup;
      delete this._markers;
    }
  },

  // @method updateMarkers(): void
  // Clear markers and update their location
  updateMarkers: function() {
    this._markerGroup.clearLayers();
    this._initMarkers();
  },

  _initMarkers: function() {
    if (!this._markerGroup) {
      this._markerGroup = new L.LayerGroup();
    }
    this._markers = [];

    var latlngs = this._latlngs,
      i,
      j,
      marker;

    var markerLeft, markerRight;

    if (Array.isArray(latlngs[0])) {
      // POLY
      latlngs.forEach((latlng, ring) => {
        var len = latlng.length;
        this._markers.push([]);
        for (i = 0, len; i < len; i++) {
          marker = this._createMarkerRing(latlng[i], ring, i);
          marker.on('click', this._onMarkerClick, this);
          marker.on('contextmenu', this._onContextMenu, this);
          this._markers[ring].push(marker);
        }
      });

      latlngs.forEach((latlng, ring) => {
        var len = latlng.length;
        for (i = 0, j = len - 1; i < len; j = i++) {
          if (i === 0 && !(L.Polygon && this._poly instanceof L.Polygon)) {
            continue;
          }
          markerLeft = this._markers[ring][j];
          markerRight = this._markers[ring][i];
          this._createMiddleMarker(markerLeft, markerRight);
          this._updatePrevNext(markerLeft, markerRight);
        }
      });
    } else {
      // LINE
      latlngs.forEach((latlng, index) => {
        marker = this._createMarker(latlng, index);
        marker.on('click', this._onMarkerClick, this);
        marker.on('contextmenu', this._onContextMenu, this);
        this._markers.push(marker);
      });
      var len = latlngs.length;
      for (i = 0, j = len - 1; i < len; j = i++) {
        if (i === 0 && !(L.Polygon && this._poly instanceof L.Polygon)) {
          continue;
        }
        markerLeft = this._markers[j];
        markerRight = this._markers[i];
        this._createMiddleMarker(markerLeft, markerRight);
        this._updatePrevNext(markerLeft, markerRight);
      }
    }
  },

  _createMarkerRing: function(latlng, ring, index) {
    // Extending L.Marker in TouchEvents.js to include touch.
    var marker = new L.Marker.Touch(latlng, {
      draggable: true,
      icon: this.options.icon,
    });
    marker._origLatLng = latlng;
    marker._index = index;
    marker._ring = ring;

    marker
      .on('dragstart', this._onMarkerDragStart, this)
      .on('drag', this._onMarkerDrag, this)
      .on('dragend', this._fireEdit, this)
      .on('touchmove', this._onTouchMove, this)
      .on('touchend', this._fireEdit, this)
      .on('MSPointerMove', this._onTouchMove, this)
      .on('MSPointerUp', this._fireEdit, this);

    this._markerGroup.addLayer(marker);
    return marker;
  },

  _createMarker: function(latlng, index) {
    // Extending L.Marker in TouchEvents.js to include touch.
    var marker = new L.Marker.Touch(latlng, {
      draggable: true,
      icon: this.options.icon,
    });

    marker._origLatLng = latlng;
    marker._index = index;

    marker
      .on('dragstart', this._onMarkerDragStart, this)
      .on('drag', this._onMarkerDrag, this)
      .on('dragend', this._fireEdit, this)
      .on('touchmove', this._onTouchMove, this)
      .on('touchend', this._fireEdit, this)
      .on('MSPointerMove', this._onTouchMove, this)
      .on('MSPointerUp', this._fireEdit, this);

    this._markerGroup.addLayer(marker);

    return marker;
  },

  _onMarkerDragStart: function() {
    this._poly.fire('editstart');
  },

  _spliceLatLngs: function() {
    var latlngs = this._latlngs;
    var removed = [].splice.apply(latlngs, arguments);
    this._poly._convertLatLngs(latlngs, true);
    this._poly.redraw();
    return removed;
  },

  // this._spliceLatLngs(i, 0, latlng);
  // this._spliceLatLngsInsert(ring, ind, latlng);

  _spliceLatLngsInsert: function(ring, ind, latlng) {
    var latlngs = this._latlngs[ring];
    latlngs.splice(ind, 0, latlng);
    this._poly._convertLatLngs(latlngs, true);
    this._poly.redraw();
  },

  _spliceLatLngsRemove: function(ring, ind) {
    var latlngs = this._latlngs[ring];
    latlngs.splice(ind, 1);
    this._poly._convertLatLngs(latlngs, true);
    this._poly.redraw();
  },

  _removeMarker: function(marker) {
    var i = marker._index;
    var ring = marker._ring;

    this._markerGroup.removeLayer(marker);

    if (Array.isArray(this._markers[ring])) {
      this._markers[ring].splice(i, 1);
      this._spliceLatLngsRemove(ring, i);
      this._updateIndexesRings(ring, i, -1);
    } else {
      this._markers.splice(i, 1);
      this._spliceLatLngs(i, 1);
      this._updateIndexes(i, -1);
    }

    marker
      .off('dragstart', this._onMarkerDragStart, this)
      .off('drag', this._onMarkerDrag, this)
      .off('dragend', this._fireEdit, this)
      .off('touchmove', this._onMarkerDrag, this)
      .off('touchend', this._fireEdit, this)
      .off('click', this._onMarkerClick, this)
      .off('MSPointerMove', this._onTouchMove, this)
      .off('MSPointerUp', this._fireEdit, this);
  },

  _fireEdit: function() {
    this._poly.edited = true;
    this._poly.fire('edit');
    this._poly._map.fire(L.Draw.Event.EDITVERTEX, {
      layers: this._markerGroup,
      poly: this._poly,
    });
  },

  _onMarkerDrag: function(e) {
    var marker = e.target;
    var poly = this._poly;

    L.extend(marker._origLatLng, marker._latlng);

    if (marker._middleLeft) {
      marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
    }
    if (marker._middleRight) {
      marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
    }

    if (poly.options.poly) {
      var tooltip = poly._map._editTooltip; // Access the tooltip

      // If we don't allow intersections and the polygon intersects
      if (!poly.options.poly.allowIntersection && poly.intersects()) {
        var originalColor = poly.options.color;
        poly.setStyle({
          color: this.options.drawError.color,
        });

        // Manually trigger 'dragend' behavior on marker we are about to remove
        // WORKAROUND: introduced in 1.0.0-rc2, may be related to #4484
        if (L.version.indexOf('0.7') !== 0) {
          marker.dragging._draggable._onUp(e);
        }
        this._onMarkerClick(e); // Remove violating marker
        // FIXME: Reset the marker to it's original position (instead of remove)

        if (tooltip) {
          tooltip.updateContent({
            text: L.drawLocal.draw.handlers.polyline.error,
          });
        }

        // Reset everything back to normal after a second
        setTimeout(function() {
          poly.setStyle({
            color: originalColor,
          });
          if (tooltip) {
            tooltip.updateContent({
              text: L.drawLocal.edit.handlers.edit.tooltip.text,
              subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext,
            });
          }
        }, 1000);
      }
    }
    //refresh the bounds when draging
    this._poly._bounds._southWest = L.latLng(Infinity, Infinity);
    this._poly._bounds._northEast = L.latLng(-Infinity, -Infinity);
    var latlngs = this._poly.getLatLngs();
    this._poly._convertLatLngs(latlngs, true);
    this._poly.redraw();
    this._poly.fire('editdrag');
  },

  _checkMinPoints(marker) {
    var minPoints = L.Polygon && this._poly instanceof L.Polygon ? 4 : 3;

    // Per Polyline non ho ring controllo this._defaultShape().length
    if (marker._ring === undefined) {
      if (this._defaultShape().length < minPoints) {
        return false;
      }
    } else {
      if (this._poly._rings[marker._ring].length < minPoints) {
        return false;
      }
    }

    return true;
  },

  _onMarkerClick: function(e) {
    var marker = e.target;
    // If removing this point would create an invalid polyline/polygon don't remove
    if (!this._checkMinPoints(marker)) {
      return;
    }

    // remove the marker
    this._removeMarker(marker);

    // update prev/next links of adjacent markers
    this._updatePrevNext(marker._prev, marker._next);

    // remove ghost markers near the removed marker
    if (marker._middleLeft) {
      this._markerGroup.removeLayer(marker._middleLeft);
    }
    if (marker._middleRight) {
      this._markerGroup.removeLayer(marker._middleRight);
    }

    // create a ghost marker in place of the removed one
    if (marker._prev && marker._next) {
      this._createMiddleMarker(marker._prev, marker._next);
    } else if (!marker._prev) {
      marker._next._middleLeft = null;
    } else if (!marker._next) {
      marker._prev._middleRight = null;
    }

    this._fireEdit();
  },

  _onContextMenu: function(e) {
    var marker = e.target;
    var poly = this._poly;
    this._poly._map.fire(L.Draw.Event.MARKERCONTEXT, {
      marker: marker,
      layers: this._markerGroup,
      poly: this._poly,
    });
    L.DomEvent.stopPropagation;
  },

  _onTouchMove: function(e) {
    var layerPoint = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]),
      latlng = this._map.layerPointToLatLng(layerPoint),
      marker = e.target;

    L.extend(marker._origLatLng, latlng);

    if (marker._middleLeft) {
      marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
    }
    if (marker._middleRight) {
      marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
    }

    this._poly.redraw();
    this.updateMarkers();
  },

  _updateIndexesRings: function(ring, index, delta) {
    this._markerGroup.eachLayer(function(marker) {
      if (marker._ring == ring && marker._index > index) {
        marker._index += delta;
      }
    });
  },

  _updateIndexes: function(index, delta) {
    this._markerGroup.eachLayer(function(marker) {
      if (marker._index > index) {
        marker._index += delta;
      }
    });
  },

  _createMiddleMarker: function(marker1, marker2) {
    if (marker1._ring !== undefined) marker2._ring = marker1._ring;
    if (marker2._ring !== undefined) marker1._ring = marker2._ring;
    var latlng = this._getMiddleLatLng(marker1, marker2),
      marker = this._createMarker(latlng, marker1._ring),
      onClick,
      onDragStart,
      onDragEnd;

    marker._ring = marker1._ring;
    marker.setOpacity(0.6);

    marker1._middleRight = marker2._middleLeft = marker;

    onDragStart = function() {
      marker.off('touchmove', onDragStart, this);
      var i = marker2._index;
      var ring = marker2._ring;

      marker._index = i;

      marker.off('click', onClick, this).on('click', this._onMarkerClick, this);

      latlng.lat = marker.getLatLng().lat;
      latlng.lng = marker.getLatLng().lng;

      if (ring === undefined) {
        this._spliceLatLngs(i, 0, latlng);
        this._markers.splice(i, 0, marker);
        this._updateIndexes(i, 1);
      } else {
        this._spliceLatLngsInsert(ring, i, latlng);
        this._markers[ring].splice(i, 0, marker);
        this._updateIndexesRings(ring, i, 1);
      }

      marker2._index++;
      this._updatePrevNext(marker1, marker);
      this._updatePrevNext(marker, marker2);

      marker.setOpacity(1);
      this._poly.fire('editstart');
    };

    onDragEnd = function() {
      marker.off('dragstart', onDragStart, this);
      marker.off('dragend', onDragEnd, this);
      marker.off('touchmove', onDragStart, this);

      this._createMiddleMarker(marker1, marker);
      this._createMiddleMarker(marker, marker2);
    };

    onClick = function() {
      onDragStart.call(this);
      onDragEnd.call(this);
      this._fireEdit();
    };

    marker
      .on('click', onClick, this)
      .on('dragstart', onDragStart, this)
      .on('dragend', onDragEnd, this)
      .on('touchmove', onDragStart, this);

    this._markerGroup.addLayer(marker);
  },

  _updatePrevNext: function(marker1, marker2) {
    if (marker1) {
      marker1._next = marker2;
    }
    if (marker2) {
      marker2._prev = marker1;
    }
  },

  _getMiddleLatLng: function(marker1, marker2) {
    var map = this._poly._map,
      p1 = map.project(marker1.getLatLng()),
      p2 = map.project(marker2.getLatLng());

    return map.unproject(p1._add(p2)._divideBy(2));
  },
});
