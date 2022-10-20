L.controlCredits = function (t) {
    return new L.CreditsControl(t)
}, L.CreditsControl = L.Control.extend({
    initialize: function (t) {
        L.setOptions(this, t)
    },
    onAdd: function (t) {
        this._map = t;
        var i = L.DomUtil.create("div", "leaflet-credits-control", i);
        var o = L.DomUtil.create("img", "", i);
        o.src = this.options.image
        return this._container = i
    },
});