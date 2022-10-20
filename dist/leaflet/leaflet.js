/* @preserve
 * Leaflet 1.7.1, a JS library for interactive maps. http://leafletjs.com
 * (c) 2010-2019 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
!(function (t, i) {
  'object' == typeof exports && 'undefined' != typeof module
    ? i(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], i)
    : i((t.L = {}))
})(this, function (t) {
  'use strict'
  function h(t) {
    for (var i, e, n = 1, o = arguments.length; n < o; n++) for (i in (e = arguments[n])) t[i] = e[i]
    return t
  }
  var s =
    Object.create ||
    function (t) {
      return (i.prototype = t), new i()
    }
  function i() {}
  function p(t, i) {
    var e = Array.prototype.slice
    if (t.bind) return t.bind.apply(t, e.call(arguments, 1))
    var n = e.call(arguments, 2)
    return function () {
      return t.apply(i, n.length ? n.concat(e.call(arguments)) : arguments)
    }
  }
  var e = 0
  function m(t) {
    return (t._leaflet_id = t._leaflet_id || ++e), t._leaflet_id
  }
  function n(t, i, e) {
    var n,
      o,
      s = function () {
        ;(n = !1), o && (r.apply(e, o), (o = !1))
      },
      r = function () {
        n ? (o = arguments) : (t.apply(e, arguments), setTimeout(s, i), (n = !0))
      }
    return r
  }
  function o(t, i, e) {
    var n = i[1],
      o = i[0],
      s = n - o
    return t === n && e ? t : ((((t - o) % s) + s) % s) + o
  }
  function a() {
    return !1
  }
  function r(t, i) {
    var e = Math.pow(10, void 0 === i ? 6 : i)
    return Math.round(t * e) / e
  }
  function u(t) {
    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '')
  }
  function l(t) {
    return u(t).split(/\s+/)
  }
  function c(t, i) {
    for (var e in (Object.prototype.hasOwnProperty.call(t, 'options') || (t.options = t.options ? s(t.options) : {}), i)) t.options[e] = i[e]
    return t.options
  }
  function _(t, i, e) {
    var n = []
    for (var o in t) n.push(encodeURIComponent(e ? o.toUpperCase() : o) + '=' + encodeURIComponent(t[o]))
    return (i && -1 !== i.indexOf('?') ? '&' : '?') + n.join('&')
  }
  var d = /\{ *([\w_-]+) *\}/g
  function f(t, n) {
    return t.replace(d, function (t, i) {
      var e = n[i]
      if (void 0 === e) throw new Error('No value provided for variable ' + t)
      return 'function' == typeof e && (e = e(n)), e
    })
  }
  var g =
    Array.isArray ||
    function (t) {
      return '[object Array]' === Object.prototype.toString.call(t)
    }
  function v(t, i) {
    for (var e = 0; e < t.length; e++) if (t[e] === i) return e
    return -1
  }
  var y = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
  function x(t) {
    return window['webkit' + t] || window['moz' + t] || window['ms' + t]
  }
  var w = 0
  function P(t) {
    var i = +new Date(),
      e = Math.max(0, 16 - (i - w))
    return (w = i + e), window.setTimeout(t, e)
  }
  var b = window.requestAnimationFrame || x('RequestAnimationFrame') || P,
    T =
      window.cancelAnimationFrame ||
      x('CancelAnimationFrame') ||
      x('CancelRequestAnimationFrame') ||
      function (t) {
        window.clearTimeout(t)
      }
  function M(t, i, e) {
    if (!e || b !== P) return b.call(window, p(t, i))
    t.call(i)
  }
  function z(t) {
    t && T.call(window, t)
  }
  var C = {
    extend: h,
    create: s,
    bind: p,
    lastId: e,
    stamp: m,
    throttle: n,
    wrapNum: o,
    falseFn: a,
    formatNum: r,
    trim: u,
    splitWords: l,
    setOptions: c,
    getParamString: _,
    template: f,
    isArray: g,
    indexOf: v,
    emptyImageUrl: y,
    requestFn: b,
    cancelFn: T,
    requestAnimFrame: M,
    cancelAnimFrame: z,
  }
  function S() {}
  ;(S.extend = function (t) {
    function i() {
      this.initialize && this.initialize.apply(this, arguments), this.callInitHooks()
    }
    var e = (i.__super__ = this.prototype),
      n = s(e)
    for (var o in (((n.constructor = i).prototype = n), this))
      Object.prototype.hasOwnProperty.call(this, o) && 'prototype' !== o && '__super__' !== o && (i[o] = this[o])
    return (
      t.statics && (h(i, t.statics), delete t.statics),
      t.includes &&
        ((function (t) {
          if ('undefined' == typeof L || !L || !L.Mixin) return
          t = g(t) ? t : [t]
          for (var i = 0; i < t.length; i++)
            t[i] === L.Mixin.Events &&
              console.warn(
                'Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.',
                new Error().stack
              )
        })(t.includes),
        h.apply(null, [n].concat(t.includes)),
        delete t.includes),
      n.options && (t.options = h(s(n.options), t.options)),
      h(n, t),
      (n._initHooks = []),
      (n.callInitHooks = function () {
        if (!this._initHooksCalled) {
          e.callInitHooks && e.callInitHooks.call(this), (this._initHooksCalled = !0)
          for (var t = 0, i = n._initHooks.length; t < i; t++) n._initHooks[t].call(this)
        }
      }),
      i
    )
  }),
    (S.include = function (t) {
      return h(this.prototype, t), this
    }),
    (S.mergeOptions = function (t) {
      return h(this.prototype.options, t), this
    }),
    (S.addInitHook = function (t) {
      var i = Array.prototype.slice.call(arguments, 1),
        e =
          'function' == typeof t
            ? t
            : function () {
                this[t].apply(this, i)
              }
      return (this.prototype._initHooks = this.prototype._initHooks || []), this.prototype._initHooks.push(e), this
    })
  var Z = {
    on: function (t, i, e) {
      if ('object' == typeof t) for (var n in t) this._on(n, t[n], i)
      else for (var o = 0, s = (t = l(t)).length; o < s; o++) this._on(t[o], i, e)
      return this
    },
    off: function (t, i, e) {
      if (t)
        if ('object' == typeof t) for (var n in t) this._off(n, t[n], i)
        else for (var o = 0, s = (t = l(t)).length; o < s; o++) this._off(t[o], i, e)
      else delete this._events
      return this
    },
    _on: function (t, i, e) {
      this._events = this._events || {}
      var n = this._events[t]
      n || ((n = []), (this._events[t] = n)), e === this && (e = void 0)
      for (var o = { fn: i, ctx: e }, s = n, r = 0, a = s.length; r < a; r++) if (s[r].fn === i && s[r].ctx === e) return
      s.push(o)
    },
    _off: function (t, i, e) {
      var n, o, s
      if (this._events && (n = this._events[t]))
        if (i) {
          if ((e === this && (e = void 0), n))
            for (o = 0, s = n.length; o < s; o++) {
              var r = n[o]
              if (r.ctx === e && r.fn === i) return (r.fn = a), this._firingCount && (this._events[t] = n = n.slice()), void n.splice(o, 1)
            }
        } else {
          for (o = 0, s = n.length; o < s; o++) n[o].fn = a
          delete this._events[t]
        }
    },
    fire: function (t, i, e) {
      if (!this.listens(t, e)) return this
      var n = h({}, i, { type: t, target: this, sourceTarget: (i && i.sourceTarget) || this })
      if (this._events) {
        var o = this._events[t]
        if (o) {
          this._firingCount = this._firingCount + 1 || 1
          for (var s = 0, r = o.length; s < r; s++) {
            var a = o[s]
            a.fn.call(a.ctx || this, n)
          }
          this._firingCount--
        }
      }
      return e && this._propagateEvent(n), this
    },
    listens: function (t, i) {
      var e = this._events && this._events[t]
      if (e && e.length) return !0
      if (i) for (var n in this._eventParents) if (this._eventParents[n].listens(t, i)) return !0
      return !1
    },
    once: function (t, i, e) {
      if ('object' == typeof t) {
        for (var n in t) this.once(n, t[n], i)
        return this
      }
      var o = p(function () {
        this.off(t, i, e).off(t, o, e)
      }, this)
      return this.on(t, i, e).on(t, o, e)
    },
    addEventParent: function (t) {
      return (this._eventParents = this._eventParents || {}), (this._eventParents[m(t)] = t), this
    },
    removeEventParent: function (t) {
      return this._eventParents && delete this._eventParents[m(t)], this
    },
    _propagateEvent: function (t) {
      for (var i in this._eventParents) this._eventParents[i].fire(t.type, h({ layer: t.target, propagatedFrom: t.target }, t), !0)
    },
  }
  ;(Z.addEventListener = Z.on),
    (Z.removeEventListener = Z.clearAllEventListeners = Z.off),
    (Z.addOneTimeEventListener = Z.once),
    (Z.fireEvent = Z.fire),
    (Z.hasEventListeners = Z.listens)
  var E = S.extend(Z)
  function k(t, i, e) {
    ;(this.x = e ? Math.round(t) : t), (this.y = e ? Math.round(i) : i)
  }
  var B =
    Math.trunc ||
    function (t) {
      return 0 < t ? Math.floor(t) : Math.ceil(t)
    }
  function A(t, i, e) {
    return t instanceof k
      ? t
      : g(t)
      ? new k(t[0], t[1])
      : null == t
      ? t
      : 'object' == typeof t && 'x' in t && 'y' in t
      ? new k(t.x, t.y)
      : new k(t, i, e)
  }
  function I(t, i) {
    if (t) for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++) this.extend(e[n])
  }
  function O(t, i) {
    return !t || t instanceof I ? t : new I(t, i)
  }
  function R(t, i) {
    if (t) for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++) this.extend(e[n])
  }
  function N(t, i) {
    return t instanceof R ? t : new R(t, i)
  }
  function D(t, i, e) {
    if (isNaN(t) || isNaN(i)) throw new Error('Invalid LatLng object: (' + t + ', ' + i + ')')
    ;(this.lat = +t), (this.lng = +i), void 0 !== e && (this.alt = +e)
  }
  function j(t, i, e) {
    return t instanceof D
      ? t
      : g(t) && 'object' != typeof t[0]
      ? 3 === t.length
        ? new D(t[0], t[1], t[2])
        : 2 === t.length
        ? new D(t[0], t[1])
        : null
      : null == t
      ? t
      : 'object' == typeof t && 'lat' in t
      ? new D(t.lat, 'lng' in t ? t.lng : t.lon, t.alt)
      : void 0 === i
      ? null
      : new D(t, i, e)
  }
  ;(k.prototype = {
    clone: function () {
      return new k(this.x, this.y)
    },
    add: function (t) {
      return this.clone()._add(A(t))
    },
    _add: function (t) {
      return (this.x += t.x), (this.y += t.y), this
    },
    subtract: function (t) {
      return this.clone()._subtract(A(t))
    },
    _subtract: function (t) {
      return (this.x -= t.x), (this.y -= t.y), this
    },
    divideBy: function (t) {
      return this.clone()._divideBy(t)
    },
    _divideBy: function (t) {
      return (this.x /= t), (this.y /= t), this
    },
    multiplyBy: function (t) {
      return this.clone()._multiplyBy(t)
    },
    _multiplyBy: function (t) {
      return (this.x *= t), (this.y *= t), this
    },
    scaleBy: function (t) {
      return new k(this.x * t.x, this.y * t.y)
    },
    unscaleBy: function (t) {
      return new k(this.x / t.x, this.y / t.y)
    },
    round: function () {
      return this.clone()._round()
    },
    _round: function () {
      return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this
    },
    floor: function () {
      return this.clone()._floor()
    },
    _floor: function () {
      return (this.x = Math.floor(this.x)), (this.y = Math.floor(this.y)), this
    },
    ceil: function () {
      return this.clone()._ceil()
    },
    _ceil: function () {
      return (this.x = Math.ceil(this.x)), (this.y = Math.ceil(this.y)), this
    },
    trunc: function () {
      return this.clone()._trunc()
    },
    _trunc: function () {
      return (this.x = B(this.x)), (this.y = B(this.y)), this
    },
    distanceTo: function (t) {
      var i = (t = A(t)).x - this.x,
        e = t.y - this.y
      return Math.sqrt(i * i + e * e)
    },
    equals: function (t) {
      return (t = A(t)).x === this.x && t.y === this.y
    },
    contains: function (t) {
      return (t = A(t)), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
    },
    toString: function () {
      return 'Point(' + r(this.x) + ', ' + r(this.y) + ')'
    },
  }),
    (I.prototype = {
      extend: function (t) {
        return (
          (t = A(t)),
          this.min || this.max
            ? ((this.min.x = Math.min(t.x, this.min.x)),
              (this.max.x = Math.max(t.x, this.max.x)),
              (this.min.y = Math.min(t.y, this.min.y)),
              (this.max.y = Math.max(t.y, this.max.y)))
            : ((this.min = t.clone()), (this.max = t.clone())),
          this
        )
      },
      getCenter: function (t) {
        return new k((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
      },
      getBottomLeft: function () {
        return new k(this.min.x, this.max.y)
      },
      getTopRight: function () {
        return new k(this.max.x, this.min.y)
      },
      getTopLeft: function () {
        return this.min
      },
      getBottomRight: function () {
        return this.max
      },
      getSize: function () {
        return this.max.subtract(this.min)
      },
      contains: function (t) {
        var i, e
        return (
          (t = ('number' == typeof t[0] || t instanceof k ? A : O)(t)) instanceof I ? ((i = t.min), (e = t.max)) : (i = e = t),
          i.x >= this.min.x && e.x <= this.max.x && i.y >= this.min.y && e.y <= this.max.y
        )
      },
      intersects: function (t) {
        t = O(t)
        var i = this.min,
          e = this.max,
          n = t.min,
          o = t.max,
          s = o.x >= i.x && n.x <= e.x,
          r = o.y >= i.y && n.y <= e.y
        return s && r
      },
      overlaps: function (t) {
        t = O(t)
        var i = this.min,
          e = this.max,
          n = t.min,
          o = t.max,
          s = o.x > i.x && n.x < e.x,
          r = o.y > i.y && n.y < e.y
        return s && r
      },
      isValid: function () {
        return !(!this.min || !this.max)
      },
    }),
    (R.prototype = {
      extend: function (t) {
        var i,
          e,
          n = this._southWest,
          o = this._northEast
        if (t instanceof D) e = i = t
        else {
          if (!(t instanceof R)) return t ? this.extend(j(t) || N(t)) : this
          if (((i = t._southWest), (e = t._northEast), !i || !e)) return this
        }
        return (
          n || o
            ? ((n.lat = Math.min(i.lat, n.lat)), (n.lng = Math.min(i.lng, n.lng)), (o.lat = Math.max(e.lat, o.lat)), (o.lng = Math.max(e.lng, o.lng)))
            : ((this._southWest = new D(i.lat, i.lng)), (this._northEast = new D(e.lat, e.lng))),
          this
        )
      },
      pad: function (t) {
        var i = this._southWest,
          e = this._northEast,
          n = Math.abs(i.lat - e.lat) * t,
          o = Math.abs(i.lng - e.lng) * t
        return new R(new D(i.lat - n, i.lng - o), new D(e.lat + n, e.lng + o))
      },
      getCenter: function () {
        return new D((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
      },
      getSouthWest: function () {
        return this._southWest
      },
      getNorthEast: function () {
        return this._northEast
      },
      getNorthWest: function () {
        return new D(this.getNorth(), this.getWest())
      },
      getSouthEast: function () {
        return new D(this.getSouth(), this.getEast())
      },
      getWest: function () {
        return this._southWest.lng
      },
      getSouth: function () {
        return this._southWest.lat
      },
      getEast: function () {
        return this._northEast.lng
      },
      getNorth: function () {
        return this._northEast.lat
      },
      contains: function (t) {
        t = ('number' == typeof t[0] || t instanceof D || 'lat' in t ? j : N)(t)
        var i,
          e,
          n = this._southWest,
          o = this._northEast
        return (
          t instanceof R ? ((i = t.getSouthWest()), (e = t.getNorthEast())) : (i = e = t),
          i.lat >= n.lat && e.lat <= o.lat && i.lng >= n.lng && e.lng <= o.lng
        )
      },
      intersects: function (t) {
        t = N(t)
        var i = this._southWest,
          e = this._northEast,
          n = t.getSouthWest(),
          o = t.getNorthEast(),
          s = o.lat >= i.lat && n.lat <= e.lat,
          r = o.lng >= i.lng && n.lng <= e.lng
        return s && r
      },
      overlaps: function (t) {
        t = N(t)
        var i = this._southWest,
          e = this._northEast,
          n = t.getSouthWest(),
          o = t.getNorthEast(),
          s = o.lat > i.lat && n.lat < e.lat,
          r = o.lng > i.lng && n.lng < e.lng
        return s && r
      },
      toBBoxString: function () {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',')
      },
      equals: function (t, i) {
        return !!t && ((t = N(t)), this._southWest.equals(t.getSouthWest(), i) && this._northEast.equals(t.getNorthEast(), i))
      },
      isValid: function () {
        return !(!this._southWest || !this._northEast)
      },
    })
  var W,
    H = {
      latLngToPoint: function (t, i) {
        var e = this.projection.project(t),
          n = this.scale(i)
        return this.transformation._transform(e, n)
      },
      pointToLatLng: function (t, i) {
        var e = this.scale(i),
          n = this.transformation.untransform(t, e)
        return this.projection.unproject(n)
      },
      project: function (t) {
        return this.projection.project(t)
      },
      unproject: function (t) {
        return this.projection.unproject(t)
      },
      scale: function (t) {
        return 256 * Math.pow(2, t)
      },
      zoom: function (t) {
        return Math.log(t / 256) / Math.LN2
      },
      getProjectedBounds: function (t) {
        if (this.infinite) return null
        var i = this.projection.bounds,
          e = this.scale(t)
        return new I(this.transformation.transform(i.min, e), this.transformation.transform(i.max, e))
      },
      infinite: !(D.prototype = {
        equals: function (t, i) {
          return !!t && ((t = j(t)), Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <= (void 0 === i ? 1e-9 : i))
        },
        toString: function (t) {
          return 'LatLng(' + r(this.lat, t) + ', ' + r(this.lng, t) + ')'
        },
        distanceTo: function (t) {
          return F.distance(this, j(t))
        },
        wrap: function () {
          return F.wrapLatLng(this)
        },
        toBounds: function (t) {
          var i = (180 * t) / 40075017,
            e = i / Math.cos((Math.PI / 180) * this.lat)
          return N([this.lat - i, this.lng - e], [this.lat + i, this.lng + e])
        },
        clone: function () {
          return new D(this.lat, this.lng, this.alt)
        },
      }),
      wrapLatLng: function (t) {
        var i = this.wrapLng ? o(t.lng, this.wrapLng, !0) : t.lng
        return new D(this.wrapLat ? o(t.lat, this.wrapLat, !0) : t.lat, i, t.alt)
      },
      wrapLatLngBounds: function (t) {
        var i = t.getCenter(),
          e = this.wrapLatLng(i),
          n = i.lat - e.lat,
          o = i.lng - e.lng
        if (0 == n && 0 == o) return t
        var s = t.getSouthWest(),
          r = t.getNorthEast()
        return new R(new D(s.lat - n, s.lng - o), new D(r.lat - n, r.lng - o))
      },
    },
    F = h({}, H, {
      wrapLng: [-180, 180],
      R: 6371e3,
      distance: function (t, i) {
        var e = Math.PI / 180,
          n = t.lat * e,
          o = i.lat * e,
          s = Math.sin(((i.lat - t.lat) * e) / 2),
          r = Math.sin(((i.lng - t.lng) * e) / 2),
          a = s * s + Math.cos(n) * Math.cos(o) * r * r,
          h = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return this.R * h
      },
    }),
    U = 6378137,
    V = {
      R: U,
      MAX_LATITUDE: 85.0511287798,
      project: function (t) {
        var i = Math.PI / 180,
          e = this.MAX_LATITUDE,
          n = Math.max(Math.min(e, t.lat), -e),
          o = Math.sin(n * i)
        return new k(this.R * t.lng * i, (this.R * Math.log((1 + o) / (1 - o))) / 2)
      },
      unproject: function (t) {
        var i = 180 / Math.PI
        return new D((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * i, (t.x * i) / this.R)
      },
      bounds: new I([-(W = U * Math.PI), -W], [W, W]),
    }
  function q(t, i, e, n) {
    if (g(t)) return (this._a = t[0]), (this._b = t[1]), (this._c = t[2]), void (this._d = t[3])
    ;(this._a = t), (this._b = i), (this._c = e), (this._d = n)
  }
  function G(t, i, e, n) {
    return new q(t, i, e, n)
  }
  q.prototype = {
    transform: function (t, i) {
      return this._transform(t.clone(), i)
    },
    _transform: function (t, i) {
      return (i = i || 1), (t.x = i * (this._a * t.x + this._b)), (t.y = i * (this._c * t.y + this._d)), t
    },
    untransform: function (t, i) {
      return (i = i || 1), new k((t.x / i - this._b) / this._a, (t.y / i - this._d) / this._c)
    },
  }
  var K,
    Y = h({}, F, { code: 'EPSG:3857', projection: V, transformation: G((K = 0.5 / (Math.PI * V.R)), 0.5, -K, 0.5) }),
    X = h({}, Y, { code: 'EPSG:900913' })
  function J(t) {
    return document.createElementNS('http://www.w3.org/2000/svg', t)
  }
  function $(t, i) {
    for (var e, n, o, s, r = '', a = 0, h = t.length; a < h; a++) {
      for (e = 0, n = (o = t[a]).length; e < n; e++) r += (e ? 'L' : 'M') + (s = o[e]).x + ' ' + s.y
      r += i ? (Zt ? 'z' : 'x') : ''
    }
    return r || 'M0 0'
  }
  var Q = document.documentElement.style,
    tt = 'ActiveXObject' in window,
    it = tt && !document.addEventListener,
    et = 'msLaunchUri' in navigator && !('documentMode' in document),
    nt = kt('webkit'),
    ot = kt('android'),
    st = kt('android 2') || kt('android 3'),
    rt = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
    at = ot && kt('Google') && rt < 537 && !('AudioNode' in window),
    ht = !!window.opera,
    ut = !et && kt('chrome'),
    lt = kt('gecko') && !nt && !ht && !tt,
    ct = !ut && kt('safari'),
    _t = kt('phantom'),
    dt = 'OTransition' in Q,
    pt = 0 === navigator.platform.indexOf('Win'),
    mt = tt && 'transition' in Q,
    ft = 'WebKitCSSMatrix' in window && 'm11' in new window.WebKitCSSMatrix() && !st,
    gt = 'MozPerspective' in Q,
    vt = !window.L_DISABLE_3D && (mt || ft || gt) && !dt && !_t,
    yt = 'undefined' != typeof orientation || kt('mobile'),
    xt = yt && nt,
    wt = yt && ft,
    Pt = !window.PointerEvent && window.MSPointerEvent,
    Lt = !(!window.PointerEvent && !Pt),
    bt = !window.L_NO_TOUCH && (Lt || 'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch)),
    Tt = yt && ht,
    Mt = yt && lt,
    zt = 1 < (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI),
    Ct = (function () {
      var t = !1
      try {
        var i = Object.defineProperty({}, 'passive', {
          get: function () {
            t = !0
          },
        })
        window.addEventListener('testPassiveEventSupport', a, i), window.removeEventListener('testPassiveEventSupport', a, i)
      } catch (t) {}
      return t
    })(),
    St = !!document.createElement('canvas').getContext,
    Zt = !(!document.createElementNS || !J('svg').createSVGRect),
    Et =
      !Zt &&
      (function () {
        try {
          var t = document.createElement('div')
          t.innerHTML = '<v:shape adj="1"/>'
          var i = t.firstChild
          return (i.style.behavior = 'url(#default#VML)'), i && 'object' == typeof i.adj
        } catch (t) {
          return !1
        }
      })()
  function kt(t) {
    return 0 <= navigator.userAgent.toLowerCase().indexOf(t)
  }
  var Bt = {
      ie: tt,
      ielt9: it,
      edge: et,
      webkit: nt,
      android: ot,
      android23: st,
      androidStock: at,
      opera: ht,
      chrome: ut,
      gecko: lt,
      safari: ct,
      phantom: _t,
      opera12: dt,
      win: pt,
      ie3d: mt,
      webkit3d: ft,
      gecko3d: gt,
      any3d: vt,
      mobile: yt,
      mobileWebkit: xt,
      mobileWebkit3d: wt,
      msPointer: Pt,
      pointer: Lt,
      touch: bt,
      mobileOpera: Tt,
      mobileGecko: Mt,
      retina: zt,
      passiveEvents: Ct,
      canvas: St,
      svg: Zt,
      vml: Et,
    },
    At = Pt ? 'MSPointerDown' : 'pointerdown',
    It = Pt ? 'MSPointerMove' : 'pointermove',
    Ot = Pt ? 'MSPointerUp' : 'pointerup',
    Rt = Pt ? 'MSPointerCancel' : 'pointercancel',
    Nt = {},
    Dt = !1
  function jt(t, i, e, n) {
    function o(t) {
      Ut(t, r)
    }
    var s, r, a, h, u, l, c, _
    function d(t) {
      ;(t.pointerType === (t.MSPOINTER_TYPE_MOUSE || 'mouse') && 0 === t.buttons) || Ut(t, h)
    }
    return (
      'touchstart' === i
        ? ((u = t),
          (l = e),
          (c = n),
          (_ = p(function (t) {
            t.MSPOINTER_TYPE_TOUCH && t.pointerType === t.MSPOINTER_TYPE_TOUCH && Ri(t), Ut(t, l)
          })),
          (u['_leaflet_touchstart' + c] = _),
          u.addEventListener(At, _, !1),
          Dt ||
            (document.addEventListener(At, Wt, !0),
            document.addEventListener(It, Ht, !0),
            document.addEventListener(Ot, Ft, !0),
            document.addEventListener(Rt, Ft, !0),
            (Dt = !0)))
        : 'touchmove' === i
        ? ((h = e), ((a = t)['_leaflet_touchmove' + n] = d), a.addEventListener(It, d, !1))
        : 'touchend' === i && ((r = e), ((s = t)['_leaflet_touchend' + n] = o), s.addEventListener(Ot, o, !1), s.addEventListener(Rt, o, !1)),
      this
    )
  }
  function Wt(t) {
    Nt[t.pointerId] = t
  }
  function Ht(t) {
    Nt[t.pointerId] && (Nt[t.pointerId] = t)
  }
  function Ft(t) {
    delete Nt[t.pointerId]
  }
  function Ut(t, i) {
    for (var e in ((t.touches = []), Nt)) t.touches.push(Nt[e])
    ;(t.changedTouches = [t]), i(t)
  }
  var Vt = Pt ? 'MSPointerDown' : Lt ? 'pointerdown' : 'touchstart',
    qt = Pt ? 'MSPointerUp' : Lt ? 'pointerup' : 'touchend',
    Gt = '_leaflet_'
  var Kt,
    Yt,
    Xt,
    Jt,
    $t,
    Qt,
    ti = fi(['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']),
    ii = fi(['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']),
    ei = 'webkitTransition' === ii || 'OTransition' === ii ? ii + 'End' : 'transitionend'
  function ni(t) {
    return 'string' == typeof t ? document.getElementById(t) : t
  }
  function oi(t, i) {
    var e,
      n = t.style[i] || (t.currentStyle && t.currentStyle[i])
    return (
      (n && 'auto' !== n) || !document.defaultView || (n = (e = document.defaultView.getComputedStyle(t, null)) ? e[i] : null),
      'auto' === n ? null : n
    )
  }
  function si(t, i, e) {
    var n = document.createElement(t)
    return (n.className = i || ''), e && e.appendChild(n), n
  }
  function ri(t) {
    var i = t.parentNode
    i && i.removeChild(t)
  }
  function ai(t) {
    for (; t.firstChild; ) t.removeChild(t.firstChild)
  }
  function hi(t) {
    var i = t.parentNode
    i && i.lastChild !== t && i.appendChild(t)
  }
  function ui(t) {
    var i = t.parentNode
    i && i.firstChild !== t && i.insertBefore(t, i.firstChild)
  }
  function li(t, i) {
    if (void 0 !== t.classList) return t.classList.contains(i)
    var e = pi(t)
    return 0 < e.length && new RegExp('(^|\\s)' + i + '(\\s|$)').test(e)
  }
  function ci(t, i) {
    var e
    if (void 0 !== t.classList) for (var n = l(i), o = 0, s = n.length; o < s; o++) t.classList.add(n[o])
    else li(t, i) || di(t, ((e = pi(t)) ? e + ' ' : '') + i)
  }
  function _i(t, i) {
    void 0 !== t.classList ? t.classList.remove(i) : di(t, u((' ' + pi(t) + ' ').replace(' ' + i + ' ', ' ')))
  }
  function di(t, i) {
    void 0 === t.className.baseVal ? (t.className = i) : (t.className.baseVal = i)
  }
  function pi(t) {
    return t.correspondingElement && (t = t.correspondingElement), void 0 === t.className.baseVal ? t.className : t.className.baseVal
  }
  function mi(t, i) {
    'opacity' in t.style
      ? (t.style.opacity = i)
      : 'filter' in t.style &&
        (function (t, i) {
          var e = !1,
            n = 'DXImageTransform.Microsoft.Alpha'
          try {
            e = t.filters.item(n)
          } catch (t) {
            if (1 === i) return
          }
          ;(i = Math.round(100 * i)), e ? ((e.Enabled = 100 !== i), (e.Opacity = i)) : (t.style.filter += ' progid:' + n + '(opacity=' + i + ')')
        })(t, i)
  }
  function fi(t) {
    for (var i = document.documentElement.style, e = 0; e < t.length; e++) if (t[e] in i) return t[e]
    return !1
  }
  function gi(t, i, e) {
    var n = i || new k(0, 0)
    t.style[ti] = (mt ? 'translate(' + n.x + 'px,' + n.y + 'px)' : 'translate3d(' + n.x + 'px,' + n.y + 'px,0)') + (e ? ' scale(' + e + ')' : '')
  }
  function vi(t, i) {
    ;(t._leaflet_pos = i), vt ? gi(t, i) : ((t.style.left = i.x + 'px'), (t.style.top = i.y + 'px'))
  }
  function yi(t) {
    return t._leaflet_pos || new k(0, 0)
  }
  function xi() {
    zi(window, 'dragstart', Ri)
  }
  function wi() {
    Si(window, 'dragstart', Ri)
  }
  function Pi(t) {
    for (; -1 === t.tabIndex; ) t = t.parentNode
    t.style && (Li(), (Qt = ($t = t).style.outline), (t.style.outline = 'none'), zi(window, 'keydown', Li))
  }
  function Li() {
    $t && (($t.style.outline = Qt), (Qt = $t = void 0), Si(window, 'keydown', Li))
  }
  function bi(t) {
    for (; !(((t = t.parentNode).offsetWidth && t.offsetHeight) || t === document.body); );
    return t
  }
  function Ti(t) {
    var i = t.getBoundingClientRect()
    return { x: i.width / t.offsetWidth || 1, y: i.height / t.offsetHeight || 1, boundingClientRect: i }
  }
  Jt =
    'onselectstart' in document
      ? ((Xt = function () {
          zi(window, 'selectstart', Ri)
        }),
        function () {
          Si(window, 'selectstart', Ri)
        })
      : ((Yt = fi(['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect'])),
        (Xt = function () {
          var t
          Yt && ((t = document.documentElement.style), (Kt = t[Yt]), (t[Yt] = 'none'))
        }),
        function () {
          Yt && ((document.documentElement.style[Yt] = Kt), (Kt = void 0))
        })
  var Mi = {
    TRANSFORM: ti,
    TRANSITION: ii,
    TRANSITION_END: ei,
    get: ni,
    getStyle: oi,
    create: si,
    remove: ri,
    empty: ai,
    toFront: hi,
    toBack: ui,
    hasClass: li,
    addClass: ci,
    removeClass: _i,
    setClass: di,
    getClass: pi,
    setOpacity: mi,
    testProp: fi,
    setTransform: gi,
    setPosition: vi,
    getPosition: yi,
    disableTextSelection: Xt,
    enableTextSelection: Jt,
    disableImageDrag: xi,
    enableImageDrag: wi,
    preventOutline: Pi,
    restoreOutline: Li,
    getSizedParentNode: bi,
    getScale: Ti,
  }
  function zi(t, i, e, n) {
    if ('object' == typeof i) for (var o in i) ki(t, o, i[o], e)
    else for (var s = 0, r = (i = l(i)).length; s < r; s++) ki(t, i[s], e, n)
    return this
  }
  var Ci = '_leaflet_events'
  function Si(t, i, e, n) {
    if ('object' == typeof i) for (var o in i) Bi(t, o, i[o], e)
    else if (i) for (var s = 0, r = (i = l(i)).length; s < r; s++) Bi(t, i[s], e, n)
    else {
      for (var a in t[Ci]) Bi(t, a, t[Ci][a])
      delete t[Ci]
    }
    return this
  }
  function Zi() {
    return Lt && !et && !ct
  }
  var Ei = { mouseenter: 'mouseover', mouseleave: 'mouseout', wheel: !('onwheel' in window) && 'mousewheel' }
  function ki(i, t, e, n) {
    var o = t + m(e) + (n ? '_' + m(n) : '')
    if (i[Ci] && i[Ci][o]) return this
    var s,
      r,
      a,
      h,
      u,
      l,
      c = function (t) {
        return e.call(n || i, t || window.event)
      },
      _ = c
    function d(t) {
      if (Lt) {
        if (!t.isPrimary) return
        if ('mouse' === t.pointerType) return
      } else if (1 < t.touches.length) return
      var i = Date.now(),
        e = i - (h || i)
      ;(u = t.touches ? t.touches[0] : t), (l = 0 < e && e <= 250), (h = i)
    }
    function p(t) {
      if (l && !u.cancelBubble) {
        if (Lt) {
          if ('mouse' === t.pointerType) return
          var i,
            e,
            n = {}
          for (e in u) (i = u[e]), (n[e] = i && i.bind ? i.bind(u) : i)
          u = n
        }
        ;(u.type = 'dblclick'), (u.button = 0), r(u), (h = null)
      }
    }
    Lt && 0 === t.indexOf('touch')
      ? jt(i, t, c, o)
      : bt && 'dblclick' === t && !Zi()
      ? ((r = c),
        (l = !1),
        ((s = i)[Gt + Vt + (a = o)] = d),
        (s[Gt + qt + a] = p),
        (s[Gt + 'dblclick' + a] = r),
        s.addEventListener(Vt, d, !!Ct && { passive: !1 }),
        s.addEventListener(qt, p, !!Ct && { passive: !1 }),
        s.addEventListener('dblclick', r, !1))
      : 'addEventListener' in i
      ? 'touchstart' === t || 'touchmove' === t || 'wheel' === t || 'mousewheel' === t
        ? i.addEventListener(Ei[t] || t, c, !!Ct && { passive: !1 })
        : 'mouseenter' === t || 'mouseleave' === t
        ? ((c = function (t) {
            ;(t = t || window.event), Vi(i, t) && _(t)
          }),
          i.addEventListener(Ei[t], c, !1))
        : i.addEventListener(t, _, !1)
      : 'attachEvent' in i && i.attachEvent('on' + t, c),
      (i[Ci] = i[Ci] || {}),
      (i[Ci][o] = c)
  }
  function Bi(t, i, e, n) {
    var o,
      s,
      r,
      a,
      h,
      u,
      l,
      c,
      _ = i + m(e) + (n ? '_' + m(n) : ''),
      d = t[Ci] && t[Ci][_]
    if (!d) return this
    Lt && 0 === i.indexOf('touch')
      ? ((c = (u = t)['_leaflet_' + (l = i) + _]),
        'touchstart' === l
          ? u.removeEventListener(At, c, !1)
          : 'touchmove' === l
          ? u.removeEventListener(It, c, !1)
          : 'touchend' === l && (u.removeEventListener(Ot, c, !1), u.removeEventListener(Rt, c, !1)))
      : bt && 'dblclick' === i && !Zi()
      ? ((r = (o = t)[Gt + Vt + (s = _)]),
        (a = o[Gt + qt + s]),
        (h = o[Gt + 'dblclick' + s]),
        o.removeEventListener(Vt, r, !!Ct && { passive: !1 }),
        o.removeEventListener(qt, a, !!Ct && { passive: !1 }),
        o.removeEventListener('dblclick', h, !1))
      : 'removeEventListener' in t
      ? t.removeEventListener(Ei[i] || i, d, !1)
      : 'detachEvent' in t && t.detachEvent('on' + i, d),
      (t[Ci][_] = null)
  }
  function Ai(t) {
    return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? (t.originalEvent._stopped = !0) : (t.cancelBubble = !0), Ui(t), this
  }
  function Ii(t) {
    return ki(t, 'wheel', Ai), this
  }
  function Oi(t) {
    return zi(t, 'mousedown touchstart dblclick', Ai), ki(t, 'click', Fi), this
  }
  function Ri(t) {
    return t.preventDefault ? t.preventDefault() : (t.returnValue = !1), this
  }
  function Ni(t) {
    return Ri(t), Ai(t), this
  }
  function Di(t, i) {
    if (!i) return new k(t.clientX, t.clientY)
    var e = Ti(i),
      n = e.boundingClientRect
    return new k((t.clientX - n.left) / e.x - i.clientLeft, (t.clientY - n.top) / e.y - i.clientTop)
  }
  var ji = pt && ut ? 2 * window.devicePixelRatio : lt ? window.devicePixelRatio : 1
  function Wi(t) {
    return et
      ? t.wheelDeltaY / 2
      : t.deltaY && 0 === t.deltaMode
      ? -t.deltaY / ji
      : t.deltaY && 1 === t.deltaMode
      ? 20 * -t.deltaY
      : t.deltaY && 2 === t.deltaMode
      ? 60 * -t.deltaY
      : t.deltaX || t.deltaZ
      ? 0
      : t.wheelDelta
      ? (t.wheelDeltaY || t.wheelDelta) / 2
      : t.detail && Math.abs(t.detail) < 32765
      ? 20 * -t.detail
      : t.detail
      ? (t.detail / -32765) * 60
      : 0
  }
  var Hi = {}
  function Fi(t) {
    Hi[t.type] = !0
  }
  function Ui(t) {
    var i = Hi[t.type]
    return (Hi[t.type] = !1), i
  }
  function Vi(t, i) {
    var e = i.relatedTarget
    if (!e) return !0
    try {
      for (; e && e !== t; ) e = e.parentNode
    } catch (t) {
      return !1
    }
    return e !== t
  }
  var qi = {
      on: zi,
      off: Si,
      stopPropagation: Ai,
      disableScrollPropagation: Ii,
      disableClickPropagation: Oi,
      preventDefault: Ri,
      stop: Ni,
      getMousePosition: Di,
      getWheelDelta: Wi,
      fakeStop: Fi,
      skipped: Ui,
      isExternalTarget: Vi,
      addListener: zi,
      removeListener: Si,
    },
    Gi = E.extend({
      run: function (t, i, e, n) {
        this.stop(),
          (this._el = t),
          (this._inProgress = !0),
          (this._duration = e || 0.25),
          (this._easeOutPower = 1 / Math.max(n || 0.5, 0.2)),
          (this._startPos = yi(t)),
          (this._offset = i.subtract(this._startPos)),
          (this._startTime = +new Date()),
          this.fire('start'),
          this._animate()
      },
      stop: function () {
        this._inProgress && (this._step(!0), this._complete())
      },
      _animate: function () {
        ;(this._animId = M(this._animate, this)), this._step()
      },
      _step: function (t) {
        var i = new Date() - this._startTime,
          e = 1e3 * this._duration
        i < e ? this._runFrame(this._easeOut(i / e), t) : (this._runFrame(1), this._complete())
      },
      _runFrame: function (t, i) {
        var e = this._startPos.add(this._offset.multiplyBy(t))
        i && e._round(), vi(this._el, e), this.fire('step')
      },
      _complete: function () {
        z(this._animId), (this._inProgress = !1), this.fire('end')
      },
      _easeOut: function (t) {
        return 1 - Math.pow(1 - t, this._easeOutPower)
      },
    }),
    Ki = E.extend({
      options: {
        crs: Y,
        center: void 0,
        zoom: void 0,
        minZoom: void 0,
        maxZoom: void 0,
        layers: [],
        maxBounds: void 0,
        renderer: void 0,
        zoomAnimation: !0,
        zoomAnimationThreshold: 4,
        fadeAnimation: !0,
        markerZoomAnimation: !0,
        transform3DLimit: 8388608,
        zoomSnap: 1,
        zoomDelta: 1,
        trackResize: !0,
      },
      initialize: function (t, i) {
        ;(i = c(this, i)),
          (this._handlers = []),
          (this._layers = {}),
          (this._zoomBoundLayers = {}),
          (this._sizeChanged = !0),
          this._initContainer(t),
          this._initLayout(),
          (this._onResize = p(this._onResize, this)),
          this._initEvents(),
          i.maxBounds && this.setMaxBounds(i.maxBounds),
          void 0 !== i.zoom && (this._zoom = this._limitZoom(i.zoom)),
          i.center && void 0 !== i.zoom && this.setView(j(i.center), i.zoom, { reset: !0 }),
          this.callInitHooks(),
          (this._zoomAnimated = ii && vt && !Tt && this.options.zoomAnimation),
          this._zoomAnimated && (this._createAnimProxy(), zi(this._proxy, ei, this._catchTransitionEnd, this)),
          this._addLayers(this.options.layers)
      },
      setView: function (t, i, e) {
        if (
          ((i = void 0 === i ? this._zoom : this._limitZoom(i)),
          (t = this._limitCenter(j(t), i, this.options.maxBounds)),
          (e = e || {}),
          this._stop(),
          this._loaded && !e.reset && !0 !== e) &&
          (void 0 !== e.animate && ((e.zoom = h({ animate: e.animate }, e.zoom)), (e.pan = h({ animate: e.animate, duration: e.duration }, e.pan))),
          this._zoom !== i ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, i, e.zoom) : this._tryAnimatedPan(t, e.pan))
        )
          return clearTimeout(this._sizeTimer), this
        return this._resetView(t, i), this
      },
      setZoom: function (t, i) {
        return this._loaded ? this.setView(this.getCenter(), t, { zoom: i }) : ((this._zoom = t), this)
      },
      zoomIn: function (t, i) {
        return (t = t || (vt ? this.options.zoomDelta : 1)), this.setZoom(this._zoom + t, i)
      },
      zoomOut: function (t, i) {
        return (t = t || (vt ? this.options.zoomDelta : 1)), this.setZoom(this._zoom - t, i)
      },
      setZoomAround: function (t, i, e) {
        var n = this.getZoomScale(i),
          o = this.getSize().divideBy(2),
          s = (t instanceof k ? t : this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1 - 1 / n),
          r = this.containerPointToLatLng(o.add(s))
        return this.setView(r, i, { zoom: e })
      },
      _getBoundsCenterZoom: function (t, i) {
        ;(i = i || {}), (t = t.getBounds ? t.getBounds() : N(t))
        var e = A(i.paddingTopLeft || i.padding || [0, 0]),
          n = A(i.paddingBottomRight || i.padding || [0, 0]),
          o = this.getBoundsZoom(t, !1, e.add(n))
        if ((o = 'number' == typeof i.maxZoom ? Math.min(i.maxZoom, o) : o) === 1 / 0) return { center: t.getCenter(), zoom: o }
        var s = n.subtract(e).divideBy(2),
          r = this.project(t.getSouthWest(), o),
          a = this.project(t.getNorthEast(), o)
        return { center: this.unproject(r.add(a).divideBy(2).add(s), o), zoom: o }
      },
      fitBounds: function (t, i) {
        if (!(t = N(t)).isValid()) throw new Error('Bounds are not valid.')
        var e = this._getBoundsCenterZoom(t, i)
        return this.setView(e.center, e.zoom, i)
      },
      fitWorld: function (t) {
        return this.fitBounds(
          [
            [-90, -180],
            [90, 180],
          ],
          t
        )
      },
      panTo: function (t, i) {
        return this.setView(t, this._zoom, { pan: i })
      },
      panBy: function (t, i) {
        return (
          (i = i || {}),
          (t = A(t).round()).x || t.y
            ? (!0 === i.animate || this.getSize().contains(t)
                ? (this._panAnim ||
                    ((this._panAnim = new Gi()), this._panAnim.on({ step: this._onPanTransitionStep, end: this._onPanTransitionEnd }, this)),
                  i.noMoveStart || this.fire('movestart'),
                  !1 !== i.animate
                    ? (ci(this._mapPane, 'leaflet-pan-anim'),
                      (e = this._getMapPanePos().subtract(t).round()),
                      this._panAnim.run(this._mapPane, e, i.duration || 0.25, i.easeLinearity))
                    : (this._rawPanBy(t), this.fire('move').fire('moveend')))
                : this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()),
              this)
            : this.fire('moveend')
        )
        var e
      },
      flyTo: function (s, r, t) {
        if (!1 === (t = t || {}).animate || !vt) return this.setView(s, r, t)
        this._stop()
        var a = this.project(this.getCenter()),
          h = this.project(s),
          i = this.getSize(),
          u = this._zoom
        ;(s = j(s)), (r = void 0 === r ? u : r)
        var l = Math.max(i.x, i.y),
          n = l * this.getZoomScale(u, r),
          c = h.distanceTo(a) || 1,
          _ = 1.42,
          o = _ * _
        function e(t) {
          var i = (n * n - l * l + (t ? -1 : 1) * o * o * c * c) / (2 * (t ? n : l) * o * c),
            e = Math.sqrt(i * i + 1) - i
          return e < 1e-9 ? -18 : Math.log(e)
        }
        function d(t) {
          return (Math.exp(t) - Math.exp(-t)) / 2
        }
        function p(t) {
          return (Math.exp(t) + Math.exp(-t)) / 2
        }
        var m = e(0)
        function f(t) {
          return (l * (p(m) * (d((i = m + _ * t)) / p(i)) - d(m))) / o
          var i
        }
        var g = Date.now(),
          v = (e(1) - m) / _,
          y = t.duration ? 1e3 * t.duration : 1e3 * v * 0.8
        return (
          this._moveStart(!0, t.noMoveStart),
          function t() {
            var i,
              e,
              n = (Date.now() - g) / y,
              o = ((i = n), (1 - Math.pow(1 - i, 1.5)) * v)
            n <= 1
              ? ((this._flyToFrame = M(t, this)),
                this._move(
                  this.unproject(a.add(h.subtract(a).multiplyBy(f(o) / c)), u),
                  this.getScaleZoom(l / ((e = o), l * (p(m) / p(m + _ * e))), u),
                  { flyTo: !0 }
                ))
              : this._move(s, r)._moveEnd(!0)
          }.call(this),
          this
        )
      },
      flyToBounds: function (t, i) {
        var e = this._getBoundsCenterZoom(t, i)
        return this.flyTo(e.center, e.zoom, i)
      },
      setMaxBounds: function (t) {
        return (t = N(t)).isValid()
          ? (this.options.maxBounds && this.off('moveend', this._panInsideMaxBounds),
            (this.options.maxBounds = t),
            this._loaded && this._panInsideMaxBounds(),
            this.on('moveend', this._panInsideMaxBounds))
          : ((this.options.maxBounds = null), this.off('moveend', this._panInsideMaxBounds))
      },
      setMinZoom: function (t) {
        var i = this.options.minZoom
        return (
          (this.options.minZoom = t),
          this._loaded && i !== t && (this.fire('zoomlevelschange'), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this
        )
      },
      setMaxZoom: function (t) {
        var i = this.options.maxZoom
        return (
          (this.options.maxZoom = t),
          this._loaded && i !== t && (this.fire('zoomlevelschange'), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this
        )
      },
      panInsideBounds: function (t, i) {
        this._enforcingBounds = !0
        var e = this.getCenter(),
          n = this._limitCenter(e, this._zoom, N(t))
        return e.equals(n) || this.panTo(n, i), (this._enforcingBounds = !1), this
      },
      panInside: function (t, i) {
        var e,
          n,
          o = A((i = i || {}).paddingTopLeft || i.padding || [0, 0]),
          s = A(i.paddingBottomRight || i.padding || [0, 0]),
          r = this.getCenter(),
          a = this.project(r),
          h = this.project(t),
          u = this.getPixelBounds(),
          l = u.getSize().divideBy(2),
          c = O([u.min.add(o), u.max.subtract(s)])
        return (
          c.contains(h) ||
            ((this._enforcingBounds = !0),
            (e = a.subtract(h)),
            (n = A(h.x + e.x, h.y + e.y)),
            (h.x < c.min.x || h.x > c.max.x) && ((n.x = a.x - e.x), 0 < e.x ? (n.x += l.x - o.x) : (n.x -= l.x - s.x)),
            (h.y < c.min.y || h.y > c.max.y) && ((n.y = a.y - e.y), 0 < e.y ? (n.y += l.y - o.y) : (n.y -= l.y - s.y)),
            this.panTo(this.unproject(n), i),
            (this._enforcingBounds = !1)),
          this
        )
      },
      invalidateSize: function (t) {
        if (!this._loaded) return this
        t = h({ animate: !1, pan: !0 }, !0 === t ? { animate: !0 } : t)
        var i = this.getSize()
        ;(this._sizeChanged = !0), (this._lastCenter = null)
        var e = this.getSize(),
          n = i.divideBy(2).round(),
          o = e.divideBy(2).round(),
          s = n.subtract(o)
        return s.x || s.y
          ? (t.animate && t.pan
              ? this.panBy(s)
              : (t.pan && this._rawPanBy(s),
                this.fire('move'),
                t.debounceMoveend
                  ? (clearTimeout(this._sizeTimer), (this._sizeTimer = setTimeout(p(this.fire, this, 'moveend'), 200)))
                  : this.fire('moveend')),
            this.fire('resize', { oldSize: i, newSize: e }))
          : this
      },
      stop: function () {
        return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire('viewreset'), this._stop()
      },
      locate: function (t) {
        if (((t = this._locateOptions = h({ timeout: 1e4, watch: !1 }, t)), !('geolocation' in navigator)))
          return this._handleGeolocationError({ code: 0, message: 'Geolocation not supported.' }), this
        var i = p(this._handleGeolocationResponse, this),
          e = p(this._handleGeolocationError, this)
        return (
          t.watch ? (this._locationWatchId = navigator.geolocation.watchPosition(i, e, t)) : navigator.geolocation.getCurrentPosition(i, e, t), this
        )
      },
      stopLocate: function () {
        return (
          navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId),
          this._locateOptions && (this._locateOptions.setView = !1),
          this
        )
      },
      _handleGeolocationError: function (t) {
        var i = t.code,
          e = t.message || (1 === i ? 'permission denied' : 2 === i ? 'position unavailable' : 'timeout')
        this._locateOptions.setView && !this._loaded && this.fitWorld(),
          this.fire('locationerror', { code: i, message: 'Geolocation error: ' + e + '.' })
      },
      _handleGeolocationResponse: function (t) {
        var i,
          e = new D(t.coords.latitude, t.coords.longitude),
          n = e.toBounds(2 * t.coords.accuracy),
          o = this._locateOptions
        o.setView && ((i = this.getBoundsZoom(n)), this.setView(e, o.maxZoom ? Math.min(i, o.maxZoom) : i))
        var s = { latlng: e, bounds: n, timestamp: t.timestamp }
        for (var r in t.coords) 'number' == typeof t.coords[r] && (s[r] = t.coords[r])
        this.fire('locationfound', s)
      },
      addHandler: function (t, i) {
        if (!i) return this
        var e = (this[t] = new i(this))
        return this._handlers.push(e), this.options[t] && e.enable(), this
      },
      remove: function () {
        if ((this._initEvents(!0), this.off('moveend', this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id))
          throw new Error('Map container is being reused by another instance')
        try {
          delete this._container._leaflet_id, delete this._containerId
        } catch (t) {
          ;(this._container._leaflet_id = void 0), (this._containerId = void 0)
        }
        var t
        for (t in (void 0 !== this._locationWatchId && this.stopLocate(),
        this._stop(),
        ri(this._mapPane),
        this._clearControlPos && this._clearControlPos(),
        this._resizeRequest && (z(this._resizeRequest), (this._resizeRequest = null)),
        this._clearHandlers(),
        this._loaded && this.fire('unload'),
        this._layers))
          this._layers[t].remove()
        for (t in this._panes) ri(this._panes[t])
        return (this._layers = []), (this._panes = []), delete this._mapPane, delete this._renderer, this
      },
      createPane: function (t, i) {
        var e = si('div', 'leaflet-pane' + (t ? ' leaflet-' + t.replace('Pane', '') + '-pane' : ''), i || this._mapPane)
        return t && (this._panes[t] = e), e
      },
      getCenter: function () {
        return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
      },
      getZoom: function () {
        return this._zoom
      },
      getBounds: function () {
        var t = this.getPixelBounds()
        return new R(this.unproject(t.getBottomLeft()), this.unproject(t.getTopRight()))
      },
      getMinZoom: function () {
        return void 0 === this.options.minZoom ? this._layersMinZoom || 0 : this.options.minZoom
      },
      getMaxZoom: function () {
        return void 0 === this.options.maxZoom ? (void 0 === this._layersMaxZoom ? 1 / 0 : this._layersMaxZoom) : this.options.maxZoom
      },
      getBoundsZoom: function (t, i, e) {
        ;(t = N(t)), (e = A(e || [0, 0]))
        var n = this.getZoom() || 0,
          o = this.getMinZoom(),
          s = this.getMaxZoom(),
          r = t.getNorthWest(),
          a = t.getSouthEast(),
          h = this.getSize().subtract(e),
          u = O(this.project(a, n), this.project(r, n)).getSize(),
          l = vt ? this.options.zoomSnap : 1,
          c = h.x / u.x,
          _ = h.y / u.y,
          d = i ? Math.max(c, _) : Math.min(c, _),
          n = this.getScaleZoom(d, n)
        return l && ((n = Math.round(n / (l / 100)) * (l / 100)), (n = i ? Math.ceil(n / l) * l : Math.floor(n / l) * l)), Math.max(o, Math.min(s, n))
      },
      getSize: function () {
        return (
          (this._size && !this._sizeChanged) ||
            ((this._size = new k(this._container.clientWidth || 0, this._container.clientHeight || 0)), (this._sizeChanged = !1)),
          this._size.clone()
        )
      },
      getPixelBounds: function (t, i) {
        var e = this._getTopLeftPoint(t, i)
        return new I(e, e.add(this.getSize()))
      },
      getPixelOrigin: function () {
        return this._checkIfLoaded(), this._pixelOrigin
      },
      getPixelWorldBounds: function (t) {
        return this.options.crs.getProjectedBounds(void 0 === t ? this.getZoom() : t)
      },
      getPane: function (t) {
        return 'string' == typeof t ? this._panes[t] : t
      },
      getPanes: function () {
        return this._panes
      },
      getContainer: function () {
        return this._container
      },
      getZoomScale: function (t, i) {
        var e = this.options.crs
        return (i = void 0 === i ? this._zoom : i), e.scale(t) / e.scale(i)
      },
      getScaleZoom: function (t, i) {
        var e = this.options.crs
        i = void 0 === i ? this._zoom : i
        var n = e.zoom(t * e.scale(i))
        return isNaN(n) ? 1 / 0 : n
      },
      project: function (t, i) {
        return (i = void 0 === i ? this._zoom : i), this.options.crs.latLngToPoint(j(t), i)
      },
      unproject: function (t, i) {
        return (i = void 0 === i ? this._zoom : i), this.options.crs.pointToLatLng(A(t), i)
      },
      layerPointToLatLng: function (t) {
        var i = A(t).add(this.getPixelOrigin())
        return this.unproject(i)
      },
      latLngToLayerPoint: function (t) {
        return this.project(j(t))._round()._subtract(this.getPixelOrigin())
      },
      wrapLatLng: function (t) {
        return this.options.crs.wrapLatLng(j(t))
      },
      wrapLatLngBounds: function (t) {
        return this.options.crs.wrapLatLngBounds(N(t))
      },
      distance: function (t, i) {
        return this.options.crs.distance(j(t), j(i))
      },
      containerPointToLayerPoint: function (t) {
        return A(t).subtract(this._getMapPanePos())
      },
      layerPointToContainerPoint: function (t) {
        return A(t).add(this._getMapPanePos())
      },
      containerPointToLatLng: function (t) {
        var i = this.containerPointToLayerPoint(A(t))
        return this.layerPointToLatLng(i)
      },
      latLngToContainerPoint: function (t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(j(t)))
      },
      mouseEventToContainerPoint: function (t) {
        return Di(t, this._container)
      },
      mouseEventToLayerPoint: function (t) {
        return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
      },
      mouseEventToLatLng: function (t) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
      },
      _initContainer: function (t) {
        var i = (this._container = ni(t))
        if (!i) throw new Error('Map container not found.')
        if (i._leaflet_id) throw new Error('Map container is already initialized.')
        zi(i, 'scroll', this._onScroll, this), (this._containerId = m(i))
      },
      _initLayout: function () {
        var t = this._container
        ;(this._fadeAnimated = this.options.fadeAnimation && vt),
          ci(
            t,
            'leaflet-container' +
              (bt ? ' leaflet-touch' : '') +
              (zt ? ' leaflet-retina' : '') +
              (it ? ' leaflet-oldie' : '') +
              (ct ? ' leaflet-safari' : '') +
              (this._fadeAnimated ? ' leaflet-fade-anim' : '')
          )
        var i = oi(t, 'position')
        'absolute' !== i && 'relative' !== i && 'fixed' !== i && (t.style.position = 'relative'),
          this._initPanes(),
          this._initControlPos && this._initControlPos()
      },
      _initPanes: function () {
        var t = (this._panes = {})
        ;(this._paneRenderers = {}),
          (this._mapPane = this.createPane('mapPane', this._container)),
          vi(this._mapPane, new k(0, 0)),
          this.createPane('tilePane'),
          this.createPane('shadowPane'),
          this.createPane('overlayPane'),
          this.createPane('markerPane'),
          this.createPane('tooltipPane'),
          this.createPane('popupPane'),
          this.options.markerZoomAnimation || (ci(t.markerPane, 'leaflet-zoom-hide'), ci(t.shadowPane, 'leaflet-zoom-hide'))
      },
      _resetView: function (t, i) {
        vi(this._mapPane, new k(0, 0))
        var e = !this._loaded
        ;(this._loaded = !0), (i = this._limitZoom(i)), this.fire('viewprereset')
        var n = this._zoom !== i
        this._moveStart(n, !1)._move(t, i)._moveEnd(n), this.fire('viewreset'), e && this.fire('load')
      },
      _moveStart: function (t, i) {
        return t && this.fire('zoomstart'), i || this.fire('movestart'), this
      },
      _move: function (t, i, e) {
        void 0 === i && (i = this._zoom)
        var n = this._zoom !== i
        return (
          (this._zoom = i),
          (this._lastCenter = t),
          (this._pixelOrigin = this._getNewPixelOrigin(t)),
          (n || (e && e.pinch)) && this.fire('zoom', e),
          this.fire('move', e)
        )
      },
      _moveEnd: function (t) {
        return t && this.fire('zoomend'), this.fire('moveend')
      },
      _stop: function () {
        return z(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
      },
      _rawPanBy: function (t) {
        vi(this._mapPane, this._getMapPanePos().subtract(t))
      },
      _getZoomSpan: function () {
        return this.getMaxZoom() - this.getMinZoom()
      },
      _panInsideMaxBounds: function () {
        this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
      },
      _checkIfLoaded: function () {
        if (!this._loaded) throw new Error('Set map center and zoom first.')
      },
      _initEvents: function (t) {
        this._targets = {}
        var i = t ? Si : zi
        i(
          (this._targets[m(this._container)] = this)._container,
          'click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup',
          this._handleDOMEvent,
          this
        ),
          this.options.trackResize && i(window, 'resize', this._onResize, this),
          vt && this.options.transform3DLimit && (t ? this.off : this.on).call(this, 'moveend', this._onMoveEnd)
      },
      _onResize: function () {
        z(this._resizeRequest),
          (this._resizeRequest = M(function () {
            this.invalidateSize({ debounceMoveend: !0 })
          }, this))
      },
      _onScroll: function () {
        ;(this._container.scrollTop = 0), (this._container.scrollLeft = 0)
      },
      _onMoveEnd: function () {
        var t = this._getMapPanePos()
        Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
      },
      _findEventTargets: function (t, i) {
        for (var e, n = [], o = 'mouseout' === i || 'mouseover' === i, s = t.target || t.srcElement, r = !1; s; ) {
          if ((e = this._targets[m(s)]) && ('click' === i || 'preclick' === i) && !t._simulated && this._draggableMoved(e)) {
            r = !0
            break
          }
          if (e && e.listens(i, !0)) {
            if (o && !Vi(s, t)) break
            if ((n.push(e), o)) break
          }
          if (s === this._container) break
          s = s.parentNode
        }
        return n.length || r || o || !Vi(s, t) || (n = [this]), n
      },
      _handleDOMEvent: function (t) {
        var i
        this._loaded &&
          !Ui(t) &&
          (('mousedown' !== (i = t.type) && 'keypress' !== i && 'keyup' !== i && 'keydown' !== i) || Pi(t.target || t.srcElement),
          this._fireDOMEvent(t, i))
      },
      _mouseEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'],
      _fireDOMEvent: function (t, i, e) {
        var n
        if (
          ('click' === t.type && (((n = h({}, t)).type = 'preclick'), this._fireDOMEvent(n, n.type, e)),
          !t._stopped && (e = (e || []).concat(this._findEventTargets(t, i))).length)
        ) {
          var o = e[0]
          'contextmenu' === i && o.listens(i, !0) && Ri(t)
          var s,
            r = { originalEvent: t }
          'keypress' !== t.type &&
            'keydown' !== t.type &&
            'keyup' !== t.type &&
            ((s = o.getLatLng && (!o._radius || o._radius <= 10)),
            (r.containerPoint = s ? this.latLngToContainerPoint(o.getLatLng()) : this.mouseEventToContainerPoint(t)),
            (r.layerPoint = this.containerPointToLayerPoint(r.containerPoint)),
            (r.latlng = s ? o.getLatLng() : this.layerPointToLatLng(r.layerPoint)))
          for (var a = 0; a < e.length; a++)
            if ((e[a].fire(i, r, !0), r.originalEvent._stopped || (!1 === e[a].options.bubblingMouseEvents && -1 !== v(this._mouseEvents, i)))) return
        }
      },
      _draggableMoved: function (t) {
        return ((t = t.dragging && t.dragging.enabled() ? t : this).dragging && t.dragging.moved()) || (this.boxZoom && this.boxZoom.moved())
      },
      _clearHandlers: function () {
        for (var t = 0, i = this._handlers.length; t < i; t++) this._handlers[t].disable()
      },
      whenReady: function (t, i) {
        return this._loaded ? t.call(i || this, { target: this }) : this.on('load', t, i), this
      },
      _getMapPanePos: function () {
        return yi(this._mapPane) || new k(0, 0)
      },
      _moved: function () {
        var t = this._getMapPanePos()
        return t && !t.equals([0, 0])
      },
      _getTopLeftPoint: function (t, i) {
        return (t && void 0 !== i ? this._getNewPixelOrigin(t, i) : this.getPixelOrigin()).subtract(this._getMapPanePos())
      },
      _getNewPixelOrigin: function (t, i) {
        var e = this.getSize()._divideBy(2)
        return this.project(t, i)._subtract(e)._add(this._getMapPanePos())._round()
      },
      _latLngToNewLayerPoint: function (t, i, e) {
        var n = this._getNewPixelOrigin(e, i)
        return this.project(t, i)._subtract(n)
      },
      _latLngBoundsToNewLayerBounds: function (t, i, e) {
        var n = this._getNewPixelOrigin(e, i)
        return O([
          this.project(t.getSouthWest(), i)._subtract(n),
          this.project(t.getNorthWest(), i)._subtract(n),
          this.project(t.getSouthEast(), i)._subtract(n),
          this.project(t.getNorthEast(), i)._subtract(n),
        ])
      },
      _getCenterLayerPoint: function () {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
      },
      _getCenterOffset: function (t) {
        return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
      },
      _limitCenter: function (t, i, e) {
        if (!e) return t
        var n = this.project(t, i),
          o = this.getSize().divideBy(2),
          s = new I(n.subtract(o), n.add(o)),
          r = this._getBoundsOffset(s, e, i)
        return r.round().equals([0, 0]) ? t : this.unproject(n.add(r), i)
      },
      _limitOffset: function (t, i) {
        if (!i) return t
        var e = this.getPixelBounds(),
          n = new I(e.min.add(t), e.max.add(t))
        return t.add(this._getBoundsOffset(n, i))
      },
      _getBoundsOffset: function (t, i, e) {
        var n = O(this.project(i.getNorthEast(), e), this.project(i.getSouthWest(), e)),
          o = n.min.subtract(t.min),
          s = n.max.subtract(t.max)
        return new k(this._rebound(o.x, -s.x), this._rebound(o.y, -s.y))
      },
      _rebound: function (t, i) {
        return 0 < t + i ? Math.round(t - i) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(i))
      },
      _limitZoom: function (t) {
        var i = this.getMinZoom(),
          e = this.getMaxZoom(),
          n = vt ? this.options.zoomSnap : 1
        return n && (t = Math.round(t / n) * n), Math.max(i, Math.min(e, t))
      },
      _onPanTransitionStep: function () {
        this.fire('move')
      },
      _onPanTransitionEnd: function () {
        _i(this._mapPane, 'leaflet-pan-anim'), this.fire('moveend')
      },
      _tryAnimatedPan: function (t, i) {
        var e = this._getCenterOffset(t)._trunc()
        return !(!0 !== (i && i.animate) && !this.getSize().contains(e)) && (this.panBy(e, i), !0)
      },
      _createAnimProxy: function () {
        var t = (this._proxy = si('div', 'leaflet-proxy leaflet-zoom-animated'))
        this._panes.mapPane.appendChild(t),
          this.on(
            'zoomanim',
            function (t) {
              var i = ti,
                e = this._proxy.style[i]
              gi(this._proxy, this.project(t.center, t.zoom), this.getZoomScale(t.zoom, 1)),
                e === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd()
            },
            this
          ),
          this.on('load moveend', this._animMoveEnd, this),
          this._on('unload', this._destroyAnimProxy, this)
      },
      _destroyAnimProxy: function () {
        ri(this._proxy), this.off('load moveend', this._animMoveEnd, this), delete this._proxy
      },
      _animMoveEnd: function () {
        var t = this.getCenter(),
          i = this.getZoom()
        gi(this._proxy, this.project(t, i), this.getZoomScale(i, 1))
      },
      _catchTransitionEnd: function (t) {
        this._animatingZoom && 0 <= t.propertyName.indexOf('transform') && this._onZoomTransitionEnd()
      },
      _nothingToAnimate: function () {
        return !this._container.getElementsByClassName('leaflet-zoom-animated').length
      },
      _tryAnimatedZoom: function (t, i, e) {
        if (this._animatingZoom) return !0
        if (
          ((e = e || {}),
          !this._zoomAnimated || !1 === e.animate || this._nothingToAnimate() || Math.abs(i - this._zoom) > this.options.zoomAnimationThreshold)
        )
          return !1
        var n = this.getZoomScale(i),
          o = this._getCenterOffset(t)._divideBy(1 - 1 / n)
        return (
          !(!0 !== e.animate && !this.getSize().contains(o)) &&
          (M(function () {
            this._moveStart(!0, !1)._animateZoom(t, i, !0)
          }, this),
          !0)
        )
      },
      _animateZoom: function (t, i, e, n) {
        this._mapPane &&
          (e && ((this._animatingZoom = !0), (this._animateToCenter = t), (this._animateToZoom = i), ci(this._mapPane, 'leaflet-zoom-anim')),
          this.fire('zoomanim', { center: t, zoom: i, noUpdate: n }),
          setTimeout(p(this._onZoomTransitionEnd, this), 250))
      },
      _onZoomTransitionEnd: function () {
        this._animatingZoom &&
          (this._mapPane && _i(this._mapPane, 'leaflet-zoom-anim'),
          (this._animatingZoom = !1),
          this._move(this._animateToCenter, this._animateToZoom),
          M(function () {
            this._moveEnd(!0)
          }, this))
      },
    })
  function Yi(t) {
    return new Xi(t)
  }
  var Xi = S.extend({
    options: { position: 'topright' },
    initialize: function (t) {
      c(this, t)
    },
    getPosition: function () {
      return this.options.position
    },
    setPosition: function (t) {
      var i = this._map
      return i && i.removeControl(this), (this.options.position = t), i && i.addControl(this), this
    },
    getContainer: function () {
      return this._container
    },
    addTo: function (t) {
      this.remove(), (this._map = t)
      var i = (this._container = this.onAdd(t)),
        e = this.getPosition(),
        n = t._controlCorners[e]
      return (
        ci(i, 'leaflet-control'),
        -1 !== e.indexOf('bottom') ? n.insertBefore(i, n.firstChild) : n.appendChild(i),
        this._map.on('unload', this.remove, this),
        this
      )
    },
    remove: function () {
      return (
        this._map && (ri(this._container), this.onRemove && this.onRemove(this._map), this._map.off('unload', this.remove, this), (this._map = null)),
        this
      )
    },
    _refocusOnMap: function (t) {
      this._map && t && 0 < t.screenX && 0 < t.screenY && this._map.getContainer().focus()
    },
  })
  Ki.include({
    addControl: function (t) {
      return t.addTo(this), this
    },
    removeControl: function (t) {
      return t.remove(), this
    },
    _initControlPos: function () {
      var n = (this._controlCorners = {}),
        o = 'leaflet-',
        s = (this._controlContainer = si('div', o + 'control-container', this._container))
      function t(t, i) {
        var e = o + t + ' ' + o + i
        n[t + i] = si('div', e, s)
      }
      t('top', 'left'), t('top', 'right'), t('bottom', 'left'), t('bottom', 'right')
    },
    _clearControlPos: function () {
      for (var t in this._controlCorners) ri(this._controlCorners[t])
      ri(this._controlContainer), delete this._controlCorners, delete this._controlContainer
    },
  })
  var Ji = Xi.extend({
      options: {
        collapsed: !0,
        position: 'topright',
        autoZIndex: !0,
        hideSingleBase: !1,
        sortLayers: !1,
        sortFunction: function (t, i, e, n) {
          return e < n ? -1 : n < e ? 1 : 0
        },
      },
      initialize: function (t, i, e) {
        for (var n in (c(this, e), (this._layerControlInputs = []), (this._layers = []), (this._lastZIndex = 0), (this._handlingClick = !1), t))
          this._addLayer(t[n], n)
        for (n in i) this._addLayer(i[n], n, !0)
      },
      onAdd: function (t) {
        this._initLayout(), this._update(), (this._map = t).on('zoomend', this._checkDisabledLayers, this)
        for (var i = 0; i < this._layers.length; i++) this._layers[i].layer.on('add remove', this._onLayerChange, this)
        return this._container
      },
      addTo: function (t) {
        return Xi.prototype.addTo.call(this, t), this._expandIfNotCollapsed()
      },
      onRemove: function () {
        this._map.off('zoomend', this._checkDisabledLayers, this)
        for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.off('add remove', this._onLayerChange, this)
      },
      addBaseLayer: function (t, i) {
        return this._addLayer(t, i), this._map ? this._update() : this
      },
      addOverlay: function (t, i) {
        return this._addLayer(t, i, !0), this._map ? this._update() : this
      },
      removeLayer: function (t) {
        t.off('add remove', this._onLayerChange, this)
        var i = this._getLayer(m(t))
        return i && this._layers.splice(this._layers.indexOf(i), 1), this._map ? this._update() : this
      },
      expand: function () {
        ci(this._container, 'leaflet-control-layers-expanded'), (this._section.style.height = null)
        var t = this._map.getSize().y - (this._container.offsetTop + 50)
        return (
          t < this._section.clientHeight
            ? (ci(this._section, 'leaflet-control-layers-scrollbar'), (this._section.style.height = t + 'px'))
            : _i(this._section, 'leaflet-control-layers-scrollbar'),
          this._checkDisabledLayers(),
          this
        )
      },
      collapse: function () {
        return _i(this._container, 'leaflet-control-layers-expanded'), this
      },
      _initLayout: function () {
        var t = 'leaflet-control-layers',
          i = (this._container = si('div', t)),
          e = this.options.collapsed
        i.setAttribute('aria-haspopup', !0), Oi(i), Ii(i)
        var n = (this._section = si('section', t + '-list'))
        e && (this._map.on('click', this.collapse, this), ot || zi(i, { mouseenter: this.expand, mouseleave: this.collapse }, this))
        var o = (this._layersLink = si('a', t + '-toggle', i))
        ;(o.href = '#'),
          (o.title = 'Layers'),
          bt ? (zi(o, 'click', Ni), zi(o, 'click', this.expand, this)) : zi(o, 'focus', this.expand, this),
          e || this.expand(),
          (this._baseLayersList = si('div', t + '-base', n)),
          (this._separator = si('div', t + '-separator', n)),
          (this._overlaysList = si('div', t + '-overlays', n)),
          i.appendChild(n)
      },
      _getLayer: function (t) {
        for (var i = 0; i < this._layers.length; i++) if (this._layers[i] && m(this._layers[i].layer) === t) return this._layers[i]
      },
      _addLayer: function (t, i, e) {
        this._map && t.on('add remove', this._onLayerChange, this),
          this._layers.push({ layer: t, name: i, overlay: e }),
          this.options.sortLayers &&
            this._layers.sort(
              p(function (t, i) {
                return this.options.sortFunction(t.layer, i.layer, t.name, i.name)
              }, this)
            ),
          this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)),
          this._expandIfNotCollapsed()
      },
      _update: function () {
        if (!this._container) return this
        ai(this._baseLayersList), ai(this._overlaysList), (this._layerControlInputs = [])
        for (var t, i, e, n = 0, o = 0; o < this._layers.length; o++)
          (e = this._layers[o]), this._addItem(e), (i = i || e.overlay), (t = t || !e.overlay), (n += e.overlay ? 0 : 1)
        return (
          this.options.hideSingleBase && ((t = t && 1 < n), (this._baseLayersList.style.display = t ? '' : 'none')),
          (this._separator.style.display = i && t ? '' : 'none'),
          this
        )
      },
      _onLayerChange: function (t) {
        this._handlingClick || this._update()
        var i = this._getLayer(m(t.target)),
          e = i.overlay ? ('add' === t.type ? 'overlayadd' : 'overlayremove') : 'add' === t.type ? 'baselayerchange' : null
        e && this._map.fire(e, i)
      },
      _createRadioElement: function (t, i) {
        var e = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (i ? ' checked="checked"' : '') + '/>',
          n = document.createElement('div')
        return (n.innerHTML = e), n.firstChild
      },
      _addItem: function (t) {
        var i,
          e = document.createElement('label'),
          n = this._map.hasLayer(t.layer)
        t.overlay
          ? (((i = document.createElement('input')).type = 'checkbox'), (i.className = 'leaflet-control-layers-selector'), (i.defaultChecked = n))
          : (i = this._createRadioElement('leaflet-base-layers_' + m(this), n)),
          this._layerControlInputs.push(i),
          (i.layerId = m(t.layer)),
          zi(i, 'click', this._onInputClick, this)
        var o = document.createElement('span')
        o.innerHTML = ' ' + t.name
        var s = document.createElement('div')
        return (
          e.appendChild(s),
          s.appendChild(i),
          s.appendChild(o),
          (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(e),
          this._checkDisabledLayers(),
          e
        )
      },
      _onInputClick: function () {
        var t,
          i,
          e = this._layerControlInputs,
          n = [],
          o = []
        this._handlingClick = !0
        for (var s = e.length - 1; 0 <= s; s--) (t = e[s]), (i = this._getLayer(t.layerId).layer), t.checked ? n.push(i) : t.checked || o.push(i)
        for (s = 0; s < o.length; s++) this._map.hasLayer(o[s]) && this._map.removeLayer(o[s])
        for (s = 0; s < n.length; s++) this._map.hasLayer(n[s]) || this._map.addLayer(n[s])
        ;(this._handlingClick = !1), this._refocusOnMap()
      },
      _checkDisabledLayers: function () {
        for (var t, i, e = this._layerControlInputs, n = this._map.getZoom(), o = e.length - 1; 0 <= o; o--)
          (t = e[o]),
            (i = this._getLayer(t.layerId).layer),
            (t.disabled = (void 0 !== i.options.minZoom && n < i.options.minZoom) || (void 0 !== i.options.maxZoom && n > i.options.maxZoom))
      },
      _expandIfNotCollapsed: function () {
        return this._map && !this.options.collapsed && this.expand(), this
      },
      _expand: function () {
        return this.expand()
      },
      _collapse: function () {
        return this.collapse()
      },
    }),
    $i = Xi.extend({
      options: { position: 'topleft', zoomInText: '+', zoomInTitle: 'Zoom in', zoomOutText: '&#x2212;', zoomOutTitle: 'Zoom out' },
      onAdd: function (t) {
        var i = 'leaflet-control-zoom',
          e = si('div', i + ' leaflet-bar'),
          n = this.options
        return (
          (this._zoomInButton = this._createButton(n.zoomInText, n.zoomInTitle, i + '-in', e, this._zoomIn)),
          (this._zoomOutButton = this._createButton(n.zoomOutText, n.zoomOutTitle, i + '-out', e, this._zoomOut)),
          this._updateDisabled(),
          t.on('zoomend zoomlevelschange', this._updateDisabled, this),
          e
        )
      },
      onRemove: function (t) {
        t.off('zoomend zoomlevelschange', this._updateDisabled, this)
      },
      disable: function () {
        return (this._disabled = !0), this._updateDisabled(), this
      },
      enable: function () {
        return (this._disabled = !1), this._updateDisabled(), this
      },
      _zoomIn: function (t) {
        !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
      },
      _zoomOut: function (t) {
        !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
      },
      _createButton: function (t, i, e, n, o) {
        var s = si('a', e, n)
        return (
          (s.innerHTML = t),
          (s.href = '#'),
          (s.title = i),
          s.setAttribute('role', 'button'),
          s.setAttribute('aria-label', i),
          Oi(s),
          zi(s, 'click', Ni),
          zi(s, 'click', o, this),
          zi(s, 'click', this._refocusOnMap, this),
          s
        )
      },
      _updateDisabled: function () {
        var t = this._map,
          i = 'leaflet-disabled'
        _i(this._zoomInButton, i),
          _i(this._zoomOutButton, i),
          (!this._disabled && t._zoom !== t.getMinZoom()) || ci(this._zoomOutButton, i),
          (!this._disabled && t._zoom !== t.getMaxZoom()) || ci(this._zoomInButton, i)
      },
    })
  Ki.mergeOptions({ zoomControl: !0 }),
    Ki.addInitHook(function () {
      this.options.zoomControl && ((this.zoomControl = new $i()), this.addControl(this.zoomControl))
    })
  var Qi = Xi.extend({
      options: { position: 'bottomleft', maxWidth: 100, metric: !0, imperial: !0 },
      onAdd: function (t) {
        var i = 'leaflet-control-scale',
          e = si('div', i),
          n = this.options
        return this._addScales(n, i + '-line', e), t.on(n.updateWhenIdle ? 'moveend' : 'move', this._update, this), t.whenReady(this._update, this), e
      },
      onRemove: function (t) {
        t.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this)
      },
      _addScales: function (t, i, e) {
        t.metric && (this._mScale = si('div', i, e)), t.imperial && (this._iScale = si('div', i, e))
      },
      _update: function () {
        var t = this._map,
          i = t.getSize().y / 2,
          e = t.distance(t.containerPointToLatLng([0, i]), t.containerPointToLatLng([this.options.maxWidth, i]))
        this._updateScales(e)
      },
      _updateScales: function (t) {
        this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t)
      },
      _updateMetric: function (t) {
        var i = this._getRoundNum(t),
          e = i < 1e3 ? i + ' m' : i / 1e3 + ' km'
        this._updateScale(this._mScale, e, i / t)
      },
      _updateImperial: function (t) {
        var i,
          e,
          n,
          o = 3.2808399 * t
        5280 < o
          ? ((i = o / 5280), (e = this._getRoundNum(i)), this._updateScale(this._iScale, e + ' mi', e / i))
          : ((n = this._getRoundNum(o)), this._updateScale(this._iScale, n + ' ft', n / o))
      },
      _updateScale: function (t, i, e) {
        ;(t.style.width = Math.round(this.options.maxWidth * e) + 'px'), (t.innerHTML = i)
      },
      _getRoundNum: function (t) {
        var i = Math.pow(10, (Math.floor(t) + '').length - 1),
          e = t / i
        return i * (e = 10 <= e ? 10 : 5 <= e ? 5 : 3 <= e ? 3 : 2 <= e ? 2 : 1)
      },
    }),
    te = Xi.extend({
      options: { position: 'bottomright', prefix: '<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>' },
      initialize: function (t) {
        c(this, t), (this._attributions = {})
      },
      onAdd: function (t) {
        for (var i in (((t.attributionControl = this)._container = si('div', 'leaflet-control-attribution')), Oi(this._container), t._layers))
          t._layers[i].getAttribution && this.addAttribution(t._layers[i].getAttribution())
        return this._update(), this._container
      },
      setPrefix: function (t) {
        return (this.options.prefix = t), this._update(), this
      },
      addAttribution: function (t) {
        return t && (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update()), this
      },
      removeAttribution: function (t) {
        return t && this._attributions[t] && (this._attributions[t]--, this._update()), this
      },
      _update: function () {
        if (this._map) {
          var t = []
          for (var i in this._attributions) this._attributions[i] && t.push(i)
          var e = []
          this.options.prefix && e.push(this.options.prefix), t.length && e.push(t.join(', ')), (this._container.innerHTML = e.join(' | '))
        }
      },
    })
  Ki.mergeOptions({ attributionControl: !0 }),
    Ki.addInitHook(function () {
      this.options.attributionControl && new te().addTo(this)
    })
  ;(Xi.Layers = Ji),
    (Xi.Zoom = $i),
    (Xi.Scale = Qi),
    (Xi.Attribution = te),
    (Yi.layers = function (t, i, e) {
      return new Ji(t, i, e)
    }),
    (Yi.zoom = function (t) {
      return new $i(t)
    }),
    (Yi.scale = function (t) {
      return new Qi(t)
    }),
    (Yi.attribution = function (t) {
      return new te(t)
    })
  var ie = S.extend({
    initialize: function (t) {
      this._map = t
    },
    enable: function () {
      return this._enabled || ((this._enabled = !0), this.addHooks()), this
    },
    disable: function () {
      return this._enabled && ((this._enabled = !1), this.removeHooks()), this
    },
    enabled: function () {
      return !!this._enabled
    },
  })
  ie.addTo = function (t, i) {
    return t.addHandler(i, this), this
  }
  var ee,
    ne = { Events: Z },
    oe = bt ? 'touchstart mousedown' : 'mousedown',
    se = { mousedown: 'mouseup', touchstart: 'touchend', pointerdown: 'touchend', MSPointerDown: 'touchend' },
    re = { mousedown: 'mousemove', touchstart: 'touchmove', pointerdown: 'touchmove', MSPointerDown: 'touchmove' },
    ae = E.extend({
      options: { clickTolerance: 3 },
      initialize: function (t, i, e, n) {
        c(this, n), (this._element = t), (this._dragStartTarget = i || t), (this._preventOutline = e)
      },
      enable: function () {
        this._enabled || (zi(this._dragStartTarget, oe, this._onDown, this), (this._enabled = !0))
      },
      disable: function () {
        this._enabled &&
          (ae._dragging === this && this.finishDrag(), Si(this._dragStartTarget, oe, this._onDown, this), (this._enabled = !1), (this._moved = !1))
      },
      _onDown: function (t) {
        var i, e
        !t._simulated &&
          this._enabled &&
          ((this._moved = !1),
          li(this._element, 'leaflet-zoom-anim') ||
            ae._dragging ||
            t.shiftKey ||
            (1 !== t.which && 1 !== t.button && !t.touches) ||
            ((ae._dragging = this)._preventOutline && Pi(this._element),
            xi(),
            Xt(),
            this._moving ||
              (this.fire('down'),
              (i = t.touches ? t.touches[0] : t),
              (e = bi(this._element)),
              (this._startPoint = new k(i.clientX, i.clientY)),
              (this._parentScale = Ti(e)),
              zi(document, re[t.type], this._onMove, this),
              zi(document, se[t.type], this._onUp, this))))
      },
      _onMove: function (t) {
        var i, e
        !t._simulated &&
          this._enabled &&
          (t.touches && 1 < t.touches.length
            ? (this._moved = !0)
            : ((e = new k((i = t.touches && 1 === t.touches.length ? t.touches[0] : t).clientX, i.clientY)._subtract(this._startPoint)).x || e.y) &&
              (Math.abs(e.x) + Math.abs(e.y) < this.options.clickTolerance ||
                ((e.x /= this._parentScale.x),
                (e.y /= this._parentScale.y),
                Ri(t),
                this._moved ||
                  (this.fire('dragstart'),
                  (this._moved = !0),
                  (this._startPos = yi(this._element).subtract(e)),
                  ci(document.body, 'leaflet-dragging'),
                  (this._lastTarget = t.target || t.srcElement),
                  window.SVGElementInstance &&
                    this._lastTarget instanceof window.SVGElementInstance &&
                    (this._lastTarget = this._lastTarget.correspondingUseElement),
                  ci(this._lastTarget, 'leaflet-drag-target')),
                (this._newPos = this._startPos.add(e)),
                (this._moving = !0),
                z(this._animRequest),
                (this._lastEvent = t),
                (this._animRequest = M(this._updatePosition, this, !0)))))
      },
      _updatePosition: function () {
        var t = { originalEvent: this._lastEvent }
        this.fire('predrag', t), vi(this._element, this._newPos), this.fire('drag', t)
      },
      _onUp: function (t) {
        !t._simulated && this._enabled && this.finishDrag()
      },
      finishDrag: function () {
        for (var t in (_i(document.body, 'leaflet-dragging'),
        this._lastTarget && (_i(this._lastTarget, 'leaflet-drag-target'), (this._lastTarget = null)),
        re))
          Si(document, re[t], this._onMove, this), Si(document, se[t], this._onUp, this)
        wi(),
          Jt(),
          this._moved && this._moving && (z(this._animRequest), this.fire('dragend', { distance: this._newPos.distanceTo(this._startPos) })),
          (this._moving = !1),
          (ae._dragging = !1)
      },
    })
  function he(t, i) {
    if (!i || !t.length) return t.slice()
    var e = i * i
    return (t = (function (t, i) {
      var e = t.length,
        n = new (typeof Uint8Array != void 0 + '' ? Uint8Array : Array)(e)
      ;(n[0] = n[e - 1] = 1),
        (function t(i, e, n, o, s) {
          var r,
            a,
            h,
            u = 0
          for (a = o + 1; a <= s - 1; a++) (h = de(i[a], i[o], i[s], !0)), u < h && ((r = a), (u = h))
          n < u && ((e[r] = 1), t(i, e, n, o, r), t(i, e, n, r, s))
        })(t, n, i, 0, e - 1)
      var o,
        s = []
      for (o = 0; o < e; o++) n[o] && s.push(t[o])
      return s
    })(
      (t = (function (t, i) {
        for (var e = [t[0]], n = 1, o = 0, s = t.length; n < s; n++)
          (function (t, i) {
            var e = i.x - t.x,
              n = i.y - t.y
            return e * e + n * n
          })(t[n], t[o]) > i && (e.push(t[n]), (o = n))
        o < s - 1 && e.push(t[s - 1])
        return e
      })(t, e)),
      e
    ))
  }
  function ue(t, i, e) {
    return Math.sqrt(de(t, i, e, !0))
  }
  function le(t, i, e, n, o) {
    var s,
      r,
      a,
      h = n ? ee : _e(t, e),
      u = _e(i, e)
    for (ee = u; ; ) {
      if (!(h | u)) return [t, i]
      if (h & u) return !1
      ;(a = _e((r = ce(t, i, (s = h || u), e, o)), e)), s === h ? ((t = r), (h = a)) : ((i = r), (u = a))
    }
  }
  function ce(t, i, e, n, o) {
    var s,
      r,
      a = i.x - t.x,
      h = i.y - t.y,
      u = n.min,
      l = n.max
    return (
      8 & e
        ? ((s = t.x + (a * (l.y - t.y)) / h), (r = l.y))
        : 4 & e
        ? ((s = t.x + (a * (u.y - t.y)) / h), (r = u.y))
        : 2 & e
        ? ((s = l.x), (r = t.y + (h * (l.x - t.x)) / a))
        : 1 & e && ((s = u.x), (r = t.y + (h * (u.x - t.x)) / a)),
      new k(s, r, o)
    )
  }
  function _e(t, i) {
    var e = 0
    return t.x < i.min.x ? (e |= 1) : t.x > i.max.x && (e |= 2), t.y < i.min.y ? (e |= 4) : t.y > i.max.y && (e |= 8), e
  }
  function de(t, i, e, n) {
    var o,
      s = i.x,
      r = i.y,
      a = e.x - s,
      h = e.y - r,
      u = a * a + h * h
    return (
      0 < u && (1 < (o = ((t.x - s) * a + (t.y - r) * h) / u) ? ((s = e.x), (r = e.y)) : 0 < o && ((s += a * o), (r += h * o))),
      (a = t.x - s),
      (h = t.y - r),
      n ? a * a + h * h : new k(s, r)
    )
  }
  function pe(t) {
    return !g(t[0]) || ('object' != typeof t[0][0] && void 0 !== t[0][0])
  }
  function me(t) {
    return console.warn('Deprecated use of _flat, please use L.LineUtil.isFlat instead.'), pe(t)
  }
  var fe = {
    simplify: he,
    pointToSegmentDistance: ue,
    closestPointOnSegment: function (t, i, e) {
      return de(t, i, e)
    },
    clipSegment: le,
    _getEdgeIntersection: ce,
    _getBitCode: _e,
    _sqClosestPointOnSegment: de,
    isFlat: pe,
    _flat: me,
  }
  function ge(t, i, e) {
    for (var n, o, s, r, a, h, u, l = [1, 4, 2, 8], c = 0, _ = t.length; c < _; c++) t[c]._code = _e(t[c], i)
    for (s = 0; s < 4; s++) {
      for (h = l[s], n = [], c = 0, o = (_ = t.length) - 1; c < _; o = c++)
        (r = t[c]),
          (a = t[o]),
          r._code & h
            ? a._code & h || (((u = ce(a, r, h, i, e))._code = _e(u, i)), n.push(u))
            : (a._code & h && (((u = ce(a, r, h, i, e))._code = _e(u, i)), n.push(u)), n.push(r))
      t = n
    }
    return t
  }
  var ve,
    ye = { clipPolygon: ge },
    xe = {
      project: function (t) {
        return new k(t.lng, t.lat)
      },
      unproject: function (t) {
        return new D(t.y, t.x)
      },
      bounds: new I([-180, -90], [180, 90]),
    },
    we = {
      R: 6378137,
      R_MINOR: 6356752.314245179,
      bounds: new I([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
      project: function (t) {
        var i = Math.PI / 180,
          e = this.R,
          n = t.lat * i,
          o = this.R_MINOR / e,
          s = Math.sqrt(1 - o * o),
          r = s * Math.sin(n),
          a = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - r) / (1 + r), s / 2),
          n = -e * Math.log(Math.max(a, 1e-10))
        return new k(t.lng * i * e, n)
      },
      unproject: function (t) {
        for (
          var i,
            e = 180 / Math.PI,
            n = this.R,
            o = this.R_MINOR / n,
            s = Math.sqrt(1 - o * o),
            r = Math.exp(-t.y / n),
            a = Math.PI / 2 - 2 * Math.atan(r),
            h = 0,
            u = 0.1;
          h < 15 && 1e-7 < Math.abs(u);
          h++
        )
          (i = s * Math.sin(a)), (i = Math.pow((1 - i) / (1 + i), s / 2)), (a += u = Math.PI / 2 - 2 * Math.atan(r * i) - a)
        return new D(a * e, (t.x * e) / n)
      },
    },
    Pe = { LonLat: xe, Mercator: we, SphericalMercator: V },
    Le = h({}, F, { code: 'EPSG:3395', projection: we, transformation: G((ve = 0.5 / (Math.PI * we.R)), 0.5, -ve, 0.5) }),
    be = h({}, F, { code: 'EPSG:4326', projection: xe, transformation: G(1 / 180, 1, -1 / 180, 0.5) }),
    Te = h({}, H, {
      projection: xe,
      transformation: G(1, 0, -1, 0),
      scale: function (t) {
        return Math.pow(2, t)
      },
      zoom: function (t) {
        return Math.log(t) / Math.LN2
      },
      distance: function (t, i) {
        var e = i.lng - t.lng,
          n = i.lat - t.lat
        return Math.sqrt(e * e + n * n)
      },
      infinite: !0,
    })
  ;(H.Earth = F), (H.EPSG3395 = Le), (H.EPSG3857 = Y), (H.EPSG900913 = X), (H.EPSG4326 = be), (H.Simple = Te)
  var Me = E.extend({
    options: { pane: 'overlayPane', attribution: null, bubblingMouseEvents: !0 },
    addTo: function (t) {
      return t.addLayer(this), this
    },
    remove: function () {
      return this.removeFrom(this._map || this._mapToAdd)
    },
    removeFrom: function (t) {
      return t && t.removeLayer(this), this
    },
    getPane: function (t) {
      return this._map.getPane(t ? this.options[t] || t : this.options.pane)
    },
    addInteractiveTarget: function (t) {
      return (this._map._targets[m(t)] = this)
    },
    removeInteractiveTarget: function (t) {
      return delete this._map._targets[m(t)], this
    },
    getAttribution: function () {
      return this.options.attribution
    },
    _layerAdd: function (t) {
      var i,
        e = t.target
      e.hasLayer(this) &&
        ((this._map = e),
        (this._zoomAnimated = e._zoomAnimated),
        this.getEvents &&
          ((i = this.getEvents()),
          e.on(i, this),
          this.once(
            'remove',
            function () {
              e.off(i, this)
            },
            this
          )),
        this.onAdd(e),
        this.getAttribution && e.attributionControl && e.attributionControl.addAttribution(this.getAttribution()),
        this.fire('add'),
        e.fire('layeradd', { layer: this }))
    },
  })
  Ki.include({
    addLayer: function (t) {
      if (!t._layerAdd) throw new Error('The provided object is not a Layer.')
      var i = m(t)
      return this._layers[i] || (((this._layers[i] = t)._mapToAdd = this), t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t)), this
    },
    removeLayer: function (t) {
      var i = m(t)
      return (
        this._layers[i] &&
          (this._loaded && t.onRemove(this),
          t.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(t.getAttribution()),
          delete this._layers[i],
          this._loaded && (this.fire('layerremove', { layer: t }), t.fire('remove')),
          (t._map = t._mapToAdd = null)),
        this
      )
    },
    hasLayer: function (t) {
      return !!t && m(t) in this._layers
    },
    eachLayer: function (t, i) {
      for (var e in this._layers) t.call(i, this._layers[e])
      return this
    },
    _addLayers: function (t) {
      for (var i = 0, e = (t = t ? (g(t) ? t : [t]) : []).length; i < e; i++) this.addLayer(t[i])
    },
    _addZoomLimit: function (t) {
      ;(!isNaN(t.options.maxZoom) && isNaN(t.options.minZoom)) || ((this._zoomBoundLayers[m(t)] = t), this._updateZoomLevels())
    },
    _removeZoomLimit: function (t) {
      var i = m(t)
      this._zoomBoundLayers[i] && (delete this._zoomBoundLayers[i], this._updateZoomLevels())
    },
    _updateZoomLevels: function () {
      var t = 1 / 0,
        i = -1 / 0,
        e = this._getZoomSpan()
      for (var n in this._zoomBoundLayers)
        var o = this._zoomBoundLayers[n].options,
          t = void 0 === o.minZoom ? t : Math.min(t, o.minZoom),
          i = void 0 === o.maxZoom ? i : Math.max(i, o.maxZoom)
      ;(this._layersMaxZoom = i === -1 / 0 ? void 0 : i),
        (this._layersMinZoom = t === 1 / 0 ? void 0 : t),
        e !== this._getZoomSpan() && this.fire('zoomlevelschange'),
        void 0 === this.options.maxZoom && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom),
        void 0 === this.options.minZoom && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
    },
  })
  var ze = Me.extend({
      initialize: function (t, i) {
        var e, n
        if ((c(this, i), (this._layers = {}), t)) for (e = 0, n = t.length; e < n; e++) this.addLayer(t[e])
      },
      addLayer: function (t) {
        var i = this.getLayerId(t)
        return (this._layers[i] = t), this._map && this._map.addLayer(t), this
      },
      removeLayer: function (t) {
        var i = t in this._layers ? t : this.getLayerId(t)
        return this._map && this._layers[i] && this._map.removeLayer(this._layers[i]), delete this._layers[i], this
      },
      hasLayer: function (t) {
        return !!t && ('number' == typeof t ? t : this.getLayerId(t)) in this._layers
      },
      clearLayers: function () {
        return this.eachLayer(this.removeLayer, this)
      },
      invoke: function (t) {
        var i,
          e,
          n = Array.prototype.slice.call(arguments, 1)
        for (i in this._layers) (e = this._layers[i])[t] && e[t].apply(e, n)
        return this
      },
      onAdd: function (t) {
        this.eachLayer(t.addLayer, t)
      },
      onRemove: function (t) {
        this.eachLayer(t.removeLayer, t)
      },
      eachLayer: function (t, i) {
        for (var e in this._layers) t.call(i, this._layers[e])
        return this
      },
      getLayer: function (t) {
        return this._layers[t]
      },
      getLayers: function () {
        var t = []
        return this.eachLayer(t.push, t), t
      },
      setZIndex: function (t) {
        return this.invoke('setZIndex', t)
      },
      getLayerId: m,
    }),
    Ce = ze.extend({
      addLayer: function (t) {
        return this.hasLayer(t) ? this : (t.addEventParent(this), ze.prototype.addLayer.call(this, t), this.fire('layeradd', { layer: t }))
      },
      removeLayer: function (t) {
        return this.hasLayer(t)
          ? (t in this._layers && (t = this._layers[t]),
            t.removeEventParent(this),
            ze.prototype.removeLayer.call(this, t),
            this.fire('layerremove', { layer: t }))
          : this
      },
      setStyle: function (t) {
        return this.invoke('setStyle', t)
      },
      bringToFront: function () {
        return this.invoke('bringToFront')
      },
      bringToBack: function () {
        return this.invoke('bringToBack')
      },
      getBounds: function () {
        var t = new R()
        for (var i in this._layers) {
          var e = this._layers[i]
          t.extend(e.getBounds ? e.getBounds() : e.getLatLng())
        }
        return t
      },
    }),
    Se = S.extend({
      options: { popupAnchor: [0, 0], tooltipAnchor: [0, 0] },
      initialize: function (t) {
        c(this, t)
      },
      createIcon: function (t) {
        return this._createIcon('icon', t)
      },
      createShadow: function (t) {
        return this._createIcon('shadow', t)
      },
      _createIcon: function (t, i) {
        var e = this._getIconUrl(t)
        if (!e) {
          if ('icon' === t) throw new Error('iconUrl not set in Icon options (see the docs).')
          return null
        }
        var n = this._createImg(e, i && 'IMG' === i.tagName ? i : null)
        return this._setIconStyles(n, t), n
      },
      _setIconStyles: function (t, i) {
        var e = this.options,
          n = e[i + 'Size']
        'number' == typeof n && (n = [n, n])
        var o = A(n),
          s = A(('shadow' === i && e.shadowAnchor) || e.iconAnchor || (o && o.divideBy(2, !0)))
        ;(t.className = 'leaflet-marker-' + i + ' ' + (e.className || '')),
          s && ((t.style.marginLeft = -s.x + 'px'), (t.style.marginTop = -s.y + 'px')),
          o && ((t.style.width = o.x + 'px'), (t.style.height = o.y + 'px'))
      },
      _createImg: function (t, i) {
        return ((i = i || document.createElement('img')).src = t), i
      },
      _getIconUrl: function (t) {
        return (zt && this.options[t + 'RetinaUrl']) || this.options[t + 'Url']
      },
    })
  var Ze = Se.extend({
      options: {
        iconUrl: 'marker-icon.png',
        iconRetinaUrl: 'marker-icon-2x.png',
        shadowUrl: 'marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      },
      _getIconUrl: function (t) {
        return (
          Ze.imagePath || (Ze.imagePath = this._detectIconPath()), (this.options.imagePath || Ze.imagePath) + Se.prototype._getIconUrl.call(this, t)
        )
      },
      _detectIconPath: function () {
        var t = si('div', 'leaflet-default-icon-path', document.body),
          i = oi(t, 'background-image') || oi(t, 'backgroundImage')
        return (
          document.body.removeChild(t),
          (i = null === i || 0 !== i.indexOf('url') ? '' : i.replace(/^url\(["']?/, '').replace(/marker-icon\.png["']?\)$/, ''))
        )
      },
    }),
    Ee = ie.extend({
      initialize: function (t) {
        this._marker = t
      },
      addHooks: function () {
        var t = this._marker._icon
        this._draggable || (this._draggable = new ae(t, t, !0)),
          this._draggable.on({ dragstart: this._onDragStart, predrag: this._onPreDrag, drag: this._onDrag, dragend: this._onDragEnd }, this).enable(),
          ci(t, 'leaflet-marker-draggable')
      },
      removeHooks: function () {
        this._draggable.off({ dragstart: this._onDragStart, predrag: this._onPreDrag, drag: this._onDrag, dragend: this._onDragEnd }, this).disable(),
          this._marker._icon && _i(this._marker._icon, 'leaflet-marker-draggable')
      },
      moved: function () {
        return this._draggable && this._draggable._moved
      },
      _adjustPan: function (t) {
        var i,
          e = this._marker,
          n = e._map,
          o = this._marker.options.autoPanSpeed,
          s = this._marker.options.autoPanPadding,
          r = yi(e._icon),
          a = n.getPixelBounds(),
          h = n.getPixelOrigin(),
          u = O(a.min._subtract(h).add(s), a.max._subtract(h).subtract(s))
        u.contains(r) ||
          ((i = A(
            (Math.max(u.max.x, r.x) - u.max.x) / (a.max.x - u.max.x) - (Math.min(u.min.x, r.x) - u.min.x) / (a.min.x - u.min.x),
            (Math.max(u.max.y, r.y) - u.max.y) / (a.max.y - u.max.y) - (Math.min(u.min.y, r.y) - u.min.y) / (a.min.y - u.min.y)
          ).multiplyBy(o)),
          n.panBy(i, { animate: !1 }),
          this._draggable._newPos._add(i),
          this._draggable._startPos._add(i),
          vi(e._icon, this._draggable._newPos),
          this._onDrag(t),
          (this._panRequest = M(this._adjustPan.bind(this, t))))
      },
      _onDragStart: function () {
        ;(this._oldLatLng = this._marker.getLatLng()),
          this._marker.closePopup && this._marker.closePopup(),
          this._marker.fire('movestart').fire('dragstart')
      },
      _onPreDrag: function (t) {
        this._marker.options.autoPan && (z(this._panRequest), (this._panRequest = M(this._adjustPan.bind(this, t))))
      },
      _onDrag: function (t) {
        var i = this._marker,
          e = i._shadow,
          n = yi(i._icon),
          o = i._map.layerPointToLatLng(n)
        e && vi(e, n), (i._latlng = o), (t.latlng = o), (t.oldLatLng = this._oldLatLng), i.fire('move', t).fire('drag', t)
      },
      _onDragEnd: function (t) {
        z(this._panRequest), delete this._oldLatLng, this._marker.fire('moveend').fire('dragend', t)
      },
    }),
    ke = Me.extend({
      options: {
        icon: new Ze(),
        interactive: !0,
        keyboard: !0,
        title: '',
        alt: '',
        zIndexOffset: 0,
        opacity: 1,
        riseOnHover: !1,
        riseOffset: 250,
        pane: 'markerPane',
        shadowPane: 'shadowPane',
        bubblingMouseEvents: !1,
        draggable: !1,
        autoPan: !1,
        autoPanPadding: [50, 50],
        autoPanSpeed: 10,
      },
      initialize: function (t, i) {
        c(this, i), (this._latlng = j(t))
      },
      onAdd: function (t) {
        ;(this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation),
          this._zoomAnimated && t.on('zoomanim', this._animateZoom, this),
          this._initIcon(),
          this.update()
      },
      onRemove: function (t) {
        this.dragging && this.dragging.enabled() && ((this.options.draggable = !0), this.dragging.removeHooks()),
          delete this.dragging,
          this._zoomAnimated && t.off('zoomanim', this._animateZoom, this),
          this._removeIcon(),
          this._removeShadow()
      },
      getEvents: function () {
        return { zoom: this.update, viewreset: this.update }
      },
      getLatLng: function () {
        return this._latlng
      },
      setLatLng: function (t) {
        var i = this._latlng
        return (this._latlng = j(t)), this.update(), this.fire('move', { oldLatLng: i, latlng: this._latlng })
      },
      setZIndexOffset: function (t) {
        return (this.options.zIndexOffset = t), this.update()
      },
      getIcon: function () {
        return this.options.icon
      },
      setIcon: function (t) {
        return (
          (this.options.icon = t),
          this._map && (this._initIcon(), this.update()),
          this._popup && this.bindPopup(this._popup, this._popup.options),
          this
        )
      },
      getElement: function () {
        return this._icon
      },
      update: function () {
        var t
        return this._icon && this._map && ((t = this._map.latLngToLayerPoint(this._latlng).round()), this._setPos(t)), this
      },
      _initIcon: function () {
        var t = this.options,
          i = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide'),
          e = t.icon.createIcon(this._icon),
          n = !1
        e !== this._icon &&
          (this._icon && this._removeIcon(), (n = !0), t.title && (e.title = t.title), 'IMG' === e.tagName && (e.alt = t.alt || '')),
          ci(e, i),
          t.keyboard && (e.tabIndex = '0'),
          (this._icon = e),
          t.riseOnHover && this.on({ mouseover: this._bringToFront, mouseout: this._resetZIndex })
        var o = t.icon.createShadow(this._shadow),
          s = !1
        o !== this._shadow && (this._removeShadow(), (s = !0)),
          o && (ci(o, i), (o.alt = '')),
          (this._shadow = o),
          t.opacity < 1 && this._updateOpacity(),
          n && this.getPane().appendChild(this._icon),
          this._initInteraction(),
          o && s && this.getPane(t.shadowPane).appendChild(this._shadow)
      },
      _removeIcon: function () {
        this.options.riseOnHover && this.off({ mouseover: this._bringToFront, mouseout: this._resetZIndex }),
          ri(this._icon),
          this.removeInteractiveTarget(this._icon),
          (this._icon = null)
      },
      _removeShadow: function () {
        this._shadow && ri(this._shadow), (this._shadow = null)
      },
      _setPos: function (t) {
        this._icon && vi(this._icon, t), this._shadow && vi(this._shadow, t), (this._zIndex = t.y + this.options.zIndexOffset), this._resetZIndex()
      },
      _updateZIndex: function (t) {
        this._icon && (this._icon.style.zIndex = this._zIndex + t)
      },
      _animateZoom: function (t) {
        var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round()
        this._setPos(i)
      },
      _initInteraction: function () {
        var t
        this.options.interactive &&
          (ci(this._icon, 'leaflet-interactive'),
          this.addInteractiveTarget(this._icon),
          Ee &&
            ((t = this.options.draggable),
            this.dragging && ((t = this.dragging.enabled()), this.dragging.disable()),
            (this.dragging = new Ee(this)),
            t && this.dragging.enable()))
      },
      setOpacity: function (t) {
        return (this.options.opacity = t), this._map && this._updateOpacity(), this
      },
      _updateOpacity: function () {
        var t = this.options.opacity
        this._icon && mi(this._icon, t), this._shadow && mi(this._shadow, t)
      },
      _bringToFront: function () {
        this._updateZIndex(this.options.riseOffset)
      },
      _resetZIndex: function () {
        this._updateZIndex(0)
      },
      _getPopupAnchor: function () {
        return this.options.icon.options.popupAnchor
      },
      _getTooltipAnchor: function () {
        return this.options.icon.options.tooltipAnchor
      },
    })
  var Be = Me.extend({
      options: {
        stroke: !0,
        color: '#3388ff',
        weight: 3,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: null,
        dashOffset: null,
        fill: !1,
        fillColor: null,
        fillOpacity: 0.2,
        fillRule: 'evenodd',
        interactive: !0,
        bubblingMouseEvents: !0,
      },
      beforeAdd: function (t) {
        this._renderer = t.getRenderer(this)
      },
      onAdd: function () {
        this._renderer._initPath(this), this._reset(), this._renderer._addPath(this)
      },
      onRemove: function () {
        this._renderer._removePath(this)
      },
      redraw: function () {
        return this._map && this._renderer._updatePath(this), this
      },
      setStyle: function (t) {
        return (
          c(this, t),
          this._renderer &&
            (this._renderer._updateStyle(this),
            this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, 'weight') && this._updateBounds()),
          this
        )
      },
      bringToFront: function () {
        return this._renderer && this._renderer._bringToFront(this), this
      },
      bringToBack: function () {
        return this._renderer && this._renderer._bringToBack(this), this
      },
      getElement: function () {
        return this._path
      },
      _reset: function () {
        this._project(), this._update()
      },
      _clickTolerance: function () {
        return (this.options.stroke ? this.options.weight / 2 : 0) + this._renderer.options.tolerance
      },
    }),
    Ae = Be.extend({
      options: { fill: !0, radius: 10 },
      initialize: function (t, i) {
        c(this, i), (this._latlng = j(t)), (this._radius = this.options.radius)
      },
      setLatLng: function (t) {
        var i = this._latlng
        return (this._latlng = j(t)), this.redraw(), this.fire('move', { oldLatLng: i, latlng: this._latlng })
      },
      getLatLng: function () {
        return this._latlng
      },
      setRadius: function (t) {
        return (this.options.radius = this._radius = t), this.redraw()
      },
      getRadius: function () {
        return this._radius
      },
      setStyle: function (t) {
        var i = (t && t.radius) || this._radius
        return Be.prototype.setStyle.call(this, t), this.setRadius(i), this
      },
      _project: function () {
        ;(this._point = this._map.latLngToLayerPoint(this._latlng)), this._updateBounds()
      },
      _updateBounds: function () {
        var t = this._radius,
          i = this._radiusY || t,
          e = this._clickTolerance(),
          n = [t + e, i + e]
        this._pxBounds = new I(this._point.subtract(n), this._point.add(n))
      },
      _update: function () {
        this._map && this._updatePath()
      },
      _updatePath: function () {
        this._renderer._updateCircle(this)
      },
      _empty: function () {
        return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
      },
      _containsPoint: function (t) {
        return t.distanceTo(this._point) <= this._radius + this._clickTolerance()
      },
    })
  var Ie = Ae.extend({
    initialize: function (t, i, e) {
      if (('number' == typeof i && (i = h({}, e, { radius: i })), c(this, i), (this._latlng = j(t)), isNaN(this.options.radius)))
        throw new Error('Circle radius cannot be NaN')
      this._mRadius = this.options.radius
    },
    setRadius: function (t) {
      return (this._mRadius = t), this.redraw()
    },
    getRadius: function () {
      return this._mRadius
    },
    getBounds: function () {
      var t = [this._radius, this._radiusY || this._radius]
      return new R(this._map.layerPointToLatLng(this._point.subtract(t)), this._map.layerPointToLatLng(this._point.add(t)))
    },
    setStyle: Be.prototype.setStyle,
    _project: function () {
      var t,
        i,
        e,
        n,
        o,
        s,
        r,
        a,
        h = this._latlng.lng,
        u = this._latlng.lat,
        l = this._map,
        c = l.options.crs
      c.distance === F.distance
        ? ((t = Math.PI / 180),
          (i = this._mRadius / F.R / t),
          (e = l.project([u + i, h])),
          (n = l.project([u - i, h])),
          (o = e.add(n).divideBy(2)),
          (s = l.unproject(o).lat),
          (r = Math.acos((Math.cos(i * t) - Math.sin(u * t) * Math.sin(s * t)) / (Math.cos(u * t) * Math.cos(s * t))) / t),
          (!isNaN(r) && 0 !== r) || (r = i / Math.cos((Math.PI / 180) * u)),
          (this._point = o.subtract(l.getPixelOrigin())),
          (this._radius = isNaN(r) ? 0 : o.x - l.project([s, h - r]).x),
          (this._radiusY = o.y - e.y))
        : ((a = c.unproject(c.project(this._latlng).subtract([this._mRadius, 0]))),
          (this._point = l.latLngToLayerPoint(this._latlng)),
          (this._radius = this._point.x - l.latLngToLayerPoint(a).x)),
        this._updateBounds()
    },
  })
  var Oe = Be.extend({
    options: { smoothFactor: 1, noClip: !1 },
    initialize: function (t, i) {
      c(this, i), this._setLatLngs(t)
    },
    getLatLngs: function () {
      return this._latlngs
    },
    setLatLngs: function (t) {
      return this._setLatLngs(t), this.redraw()
    },
    isEmpty: function () {
      return !this._latlngs.length
    },
    closestLayerPoint: function (t) {
      for (var i, e, n = 1 / 0, o = null, s = de, r = 0, a = this._parts.length; r < a; r++)
        for (var h = this._parts[r], u = 1, l = h.length; u < l; u++) {
          var c = s(t, (i = h[u - 1]), (e = h[u]), !0)
          c < n && ((n = c), (o = s(t, i, e)))
        }
      return o && (o.distance = Math.sqrt(n)), o
    },
    getCenter: function () {
      if (!this._map) throw new Error('Must add layer to map before using getCenter()')
      var t,
        i,
        e,
        n,
        o,
        s,
        r,
        a = this._rings[0],
        h = a.length
      if (!h) return null
      for (i = t = 0; t < h - 1; t++) i += a[t].distanceTo(a[t + 1]) / 2
      if (0 === i) return this._map.layerPointToLatLng(a[0])
      for (n = t = 0; t < h - 1; t++)
        if (((o = a[t]), (s = a[t + 1]), i < (n += e = o.distanceTo(s))))
          return (r = (n - i) / e), this._map.layerPointToLatLng([s.x - r * (s.x - o.x), s.y - r * (s.y - o.y)])
    },
    getBounds: function () {
      return this._bounds
    },
    addLatLng: function (t, i) {
      return (i = i || this._defaultShape()), (t = j(t)), i.push(t), this._bounds.extend(t), this.redraw()
    },
    _setLatLngs: function (t) {
      ;(this._bounds = new R()), (this._latlngs = this._convertLatLngs(t))
    },
    _defaultShape: function () {
      return pe(this._latlngs) ? this._latlngs : this._latlngs[0]
    },
    _convertLatLngs: function (t) {
      for (var i = [], e = pe(t), n = 0, o = t.length; n < o; n++)
        e ? ((i[n] = j(t[n])), this._bounds.extend(i[n])) : (i[n] = this._convertLatLngs(t[n]))
      return i
    },
    _project: function () {
      var t = new I()
      ;(this._rings = []),
        this._projectLatlngs(this._latlngs, this._rings, t),
        this._bounds.isValid() && t.isValid() && ((this._rawPxBounds = t), this._updateBounds())
    },
    _updateBounds: function () {
      var t = this._clickTolerance(),
        i = new k(t, t)
      this._pxBounds = new I([this._rawPxBounds.min.subtract(i), this._rawPxBounds.max.add(i)])
    },
    _projectLatlngs: function (t, i, e) {
      var n,
        o,
        s = t[0] instanceof D,
        r = t.length
      if (s) {
        for (o = [], n = 0; n < r; n++) (o[n] = this._map.latLngToLayerPoint(t[n])), e.extend(o[n])
        i.push(o)
      } else for (n = 0; n < r; n++) this._projectLatlngs(t[n], i, e)
    },
    _clipPoints: function () {
      var t = this._renderer._bounds
      if (((this._parts = []), this._pxBounds && this._pxBounds.intersects(t)))
        if (this.options.noClip) this._parts = this._rings
        else
          for (var i, e, n, o, s = this._parts, r = 0, a = 0, h = this._rings.length; r < h; r++)
            for (i = 0, e = (o = this._rings[r]).length; i < e - 1; i++)
              (n = le(o[i], o[i + 1], t, i, !0)) &&
                ((s[a] = s[a] || []), s[a].push(n[0]), (n[1] === o[i + 1] && i !== e - 2) || (s[a].push(n[1]), a++))
    },
    _simplifyPoints: function () {
      for (var t = this._parts, i = this.options.smoothFactor, e = 0, n = t.length; e < n; e++) t[e] = he(t[e], i)
    },
    _update: function () {
      this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath())
    },
    _updatePath: function () {
      this._renderer._updatePoly(this)
    },
    _containsPoint: function (t, i) {
      var e,
        n,
        o,
        s,
        r,
        a,
        h = this._clickTolerance()
      if (!this._pxBounds || !this._pxBounds.contains(t)) return !1
      for (e = 0, s = this._parts.length; e < s; e++)
        for (n = 0, o = (r = (a = this._parts[e]).length) - 1; n < r; o = n++) if ((i || 0 !== n) && ue(t, a[o], a[n]) <= h) return !0
      return !1
    },
  })
  Oe._flat = me
  var Re = Oe.extend({
    options: { fill: !0 },
    isEmpty: function () {
      return !this._latlngs.length || !this._latlngs[0].length
    },
    getCenter: function () {
      if (!this._map) throw new Error('Must add layer to map before using getCenter()')
      var t,
        i,
        e,
        n,
        o,
        s,
        r,
        a,
        h,
        u = this._rings[0],
        l = u.length
      if (!l) return null
      for (t = s = r = a = 0, i = l - 1; t < l; i = t++)
        (e = u[t]), (n = u[i]), (o = e.y * n.x - n.y * e.x), (r += (e.x + n.x) * o), (a += (e.y + n.y) * o), (s += 3 * o)
      return (h = 0 === s ? u[0] : [r / s, a / s]), this._map.layerPointToLatLng(h)
    },
    _convertLatLngs: function (t) {
      var i = Oe.prototype._convertLatLngs.call(this, t),
        e = i.length
      return 2 <= e && i[0] instanceof D && i[0].equals(i[e - 1]) && i.pop(), i
    },
    _setLatLngs: function (t) {
      Oe.prototype._setLatLngs.call(this, t), pe(this._latlngs) && (this._latlngs = [this._latlngs])
    },
    _defaultShape: function () {
      return pe(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
    },
    _clipPoints: function () {
      var t = this._renderer._bounds,
        i = this.options.weight,
        e = new k(i, i),
        t = new I(t.min.subtract(e), t.max.add(e))
      if (((this._parts = []), this._pxBounds && this._pxBounds.intersects(t)))
        if (this.options.noClip) this._parts = this._rings
        else for (var n, o = 0, s = this._rings.length; o < s; o++) (n = ge(this._rings[o], t, !0)).length && this._parts.push(n)
    },
    _updatePath: function () {
      this._renderer._updatePoly(this, !0)
    },
    _containsPoint: function (t) {
      var i,
        e,
        n,
        o,
        s,
        r,
        a,
        h,
        u = !1
      if (!this._pxBounds || !this._pxBounds.contains(t)) return !1
      for (o = 0, a = this._parts.length; o < a; o++)
        for (s = 0, r = (h = (i = this._parts[o]).length) - 1; s < h; r = s++)
          (e = i[s]), (n = i[r]), e.y > t.y != n.y > t.y && t.x < ((n.x - e.x) * (t.y - e.y)) / (n.y - e.y) + e.x && (u = !u)
      return u || Oe.prototype._containsPoint.call(this, t, !0)
    },
  })
  var Ne = Ce.extend({
    initialize: function (t, i) {
      c(this, i), (this._layers = {}), t && this.addData(t)
    },
    addData: function (t) {
      var i,
        e,
        n,
        o = g(t) ? t : t.features
      if (o) {
        for (i = 0, e = o.length; i < e; i++) ((n = o[i]).geometries || n.geometry || n.features || n.coordinates) && this.addData(n)
        return this
      }
      var s = this.options
      if (s.filter && !s.filter(t)) return this
      var r = De(t, s)
      return r
        ? ((r.feature = qe(t)), (r.defaultOptions = r.options), this.resetStyle(r), s.onEachFeature && s.onEachFeature(t, r), this.addLayer(r))
        : this
    },
    resetStyle: function (t) {
      return void 0 === t
        ? this.eachLayer(this.resetStyle, this)
        : ((t.options = h({}, t.defaultOptions)), this._setLayerStyle(t, this.options.style), this)
    },
    setStyle: function (i) {
      return this.eachLayer(function (t) {
        this._setLayerStyle(t, i)
      }, this)
    },
    _setLayerStyle: function (t, i) {
      t.setStyle && ('function' == typeof i && (i = i(t.feature)), t.setStyle(i))
    },
  })
  function De(t, i) {
    var e,
      n,
      o,
      s,
      r = 'Feature' === t.type ? t.geometry : t,
      a = r ? r.coordinates : null,
      h = [],
      u = i && i.pointToLayer,
      l = (i && i.coordsToLatLng) || We
    if (!a && !r) return null
    switch (r.type) {
      case 'Point':
        return je(u, t, (e = l(a)), i)
      case 'MultiPoint':
        for (o = 0, s = a.length; o < s; o++) (e = l(a[o])), h.push(je(u, t, e, i))
        return new Ce(h)
      case 'LineString':
      case 'MultiLineString':
        return (n = He(a, 'LineString' === r.type ? 0 : 1, l)), new Oe(n, i)
      case 'Polygon':
      case 'MultiPolygon':
        return (n = He(a, 'Polygon' === r.type ? 1 : 2, l)), new Re(n, i)
      case 'GeometryCollection':
        for (o = 0, s = r.geometries.length; o < s; o++) {
          var c = De({ geometry: r.geometries[o], type: 'Feature', properties: t.properties }, i)
          c && h.push(c)
        }
        return new Ce(h)
      default:
        throw new Error('Invalid GeoJSON object.')
    }
  }
  function je(t, i, e, n) {
    return t ? t(i, e) : new ke(e, n && n.markersInheritOptions && n)
  }
  function We(t) {
    return new D(t[1], t[0], t[2])
  }
  function He(t, i, e) {
    for (var n, o = [], s = 0, r = t.length; s < r; s++) (n = i ? He(t[s], i - 1, e) : (e || We)(t[s])), o.push(n)
    return o
  }
  function Fe(t, i) {
    return (i = 'number' == typeof i ? i : 6), void 0 !== t.alt ? [r(t.lng, i), r(t.lat, i), r(t.alt, i)] : [r(t.lng, i), r(t.lat, i)]
  }
  function Ue(t, i, e, n) {
    for (var o = [], s = 0, r = t.length; s < r; s++) o.push(i ? Ue(t[s], i - 1, e, n) : Fe(t[s], n))
    return !i && e && o.push(o[0]), o
  }
  function Ve(t, i) {
    return t.feature ? h({}, t.feature, { geometry: i }) : qe(i)
  }
  function qe(t) {
    return 'Feature' === t.type || 'FeatureCollection' === t.type ? t : { type: 'Feature', properties: {}, geometry: t }
  }
  var Ge = {
    toGeoJSON: function (t) {
      return Ve(this, { type: 'Point', coordinates: Fe(this.getLatLng(), t) })
    },
  }
  function Ke(t, i) {
    return new Ne(t, i)
  }
  ke.include(Ge),
    Ie.include(Ge),
    Ae.include(Ge),
    Oe.include({
      toGeoJSON: function (t) {
        var i = !pe(this._latlngs)
        return Ve(this, { type: (i ? 'Multi' : '') + 'LineString', coordinates: Ue(this._latlngs, i ? 1 : 0, !1, t) })
      },
    }),
    Re.include({
      toGeoJSON: function (t) {
        var i = !pe(this._latlngs),
          e = i && !pe(this._latlngs[0]),
          n = Ue(this._latlngs, e ? 2 : i ? 1 : 0, !0, t)
        return i || (n = [n]), Ve(this, { type: (e ? 'Multi' : '') + 'Polygon', coordinates: n })
      },
    }),
    ze.include({
      toMultiPoint: function (i) {
        var e = []
        return (
          this.eachLayer(function (t) {
            e.push(t.toGeoJSON(i).geometry.coordinates)
          }),
          Ve(this, { type: 'MultiPoint', coordinates: e })
        )
      },
      toGeoJSON: function (n) {
        var t = this.feature && this.feature.geometry && this.feature.geometry.type
        if ('MultiPoint' === t) return this.toMultiPoint(n)
        var o = 'GeometryCollection' === t,
          s = []
        return (
          this.eachLayer(function (t) {
            var i, e
            t.toGeoJSON &&
              ((i = t.toGeoJSON(n)), o ? s.push(i.geometry) : 'FeatureCollection' === (e = qe(i)).type ? s.push.apply(s, e.features) : s.push(e))
          }),
          o ? Ve(this, { geometries: s, type: 'GeometryCollection' }) : { type: 'FeatureCollection', features: s }
        )
      },
    })
  var Ye = Ke,
    Xe = Me.extend({
      options: { opacity: 1, alt: '', interactive: !1, crossOrigin: !1, errorOverlayUrl: '', zIndex: 1, className: '' },
      initialize: function (t, i, e) {
        ;(this._url = t), (this._bounds = N(i)), c(this, e)
      },
      onAdd: function () {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()),
          this.options.interactive && (ci(this._image, 'leaflet-interactive'), this.addInteractiveTarget(this._image)),
          this.getPane().appendChild(this._image),
          this._reset()
      },
      onRemove: function () {
        ri(this._image), this.options.interactive && this.removeInteractiveTarget(this._image)
      },
      setOpacity: function (t) {
        return (this.options.opacity = t), this._image && this._updateOpacity(), this
      },
      setStyle: function (t) {
        return t.opacity && this.setOpacity(t.opacity), this
      },
      bringToFront: function () {
        return this._map && hi(this._image), this
      },
      bringToBack: function () {
        return this._map && ui(this._image), this
      },
      setUrl: function (t) {
        return (this._url = t), this._image && (this._image.src = t), this
      },
      setBounds: function (t) {
        return (this._bounds = N(t)), this._map && this._reset(), this
      },
      getEvents: function () {
        var t = { zoom: this._reset, viewreset: this._reset }
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
      },
      setZIndex: function (t) {
        return (this.options.zIndex = t), this._updateZIndex(), this
      },
      getBounds: function () {
        return this._bounds
      },
      getElement: function () {
        return this._image
      },
      _initImage: function () {
        var t = 'IMG' === this._url.tagName,
          i = (this._image = t ? this._url : si('img'))
        ci(i, 'leaflet-image-layer'),
          this._zoomAnimated && ci(i, 'leaflet-zoom-animated'),
          this.options.className && ci(i, this.options.className),
          (i.onselectstart = a),
          (i.onmousemove = a),
          (i.onload = p(this.fire, this, 'load')),
          (i.onerror = p(this._overlayOnError, this, 'error')),
          (!this.options.crossOrigin && '' !== this.options.crossOrigin) ||
            (i.crossOrigin = !0 === this.options.crossOrigin ? '' : this.options.crossOrigin),
          this.options.zIndex && this._updateZIndex(),
          t ? (this._url = i.src) : ((i.src = this._url), (i.alt = this.options.alt))
      },
      _animateZoom: function (t) {
        var i = this._map.getZoomScale(t.zoom),
          e = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min
        gi(this._image, e, i)
      },
      _reset: function () {
        var t = this._image,
          i = new I(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
          e = i.getSize()
        vi(t, i.min), (t.style.width = e.x + 'px'), (t.style.height = e.y + 'px')
      },
      _updateOpacity: function () {
        mi(this._image, this.options.opacity)
      },
      _updateZIndex: function () {
        this._image && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._image.style.zIndex = this.options.zIndex)
      },
      _overlayOnError: function () {
        this.fire('error')
        var t = this.options.errorOverlayUrl
        t && this._url !== t && ((this._url = t), (this._image.src = t))
      },
    }),
    Je = Xe.extend({
      options: { autoplay: !0, loop: !0, keepAspectRatio: !0, muted: !1 },
      _initImage: function () {
        var t = 'VIDEO' === this._url.tagName,
          i = (this._image = t ? this._url : si('video'))
        if (
          (ci(i, 'leaflet-image-layer'),
          this._zoomAnimated && ci(i, 'leaflet-zoom-animated'),
          this.options.className && ci(i, this.options.className),
          (i.onselectstart = a),
          (i.onmousemove = a),
          (i.onloadeddata = p(this.fire, this, 'load')),
          t)
        ) {
          for (var e = i.getElementsByTagName('source'), n = [], o = 0; o < e.length; o++) n.push(e[o].src)
          this._url = 0 < e.length ? n : [i.src]
        } else {
          g(this._url) || (this._url = [this._url]),
            !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(i.style, 'objectFit') && (i.style.objectFit = 'fill'),
            (i.autoplay = !!this.options.autoplay),
            (i.loop = !!this.options.loop),
            (i.muted = !!this.options.muted)
          for (var s = 0; s < this._url.length; s++) {
            var r = si('source')
            ;(r.src = this._url[s]), i.appendChild(r)
          }
        }
      },
    })
  var $e = Xe.extend({
    _initImage: function () {
      var t = (this._image = this._url)
      ci(t, 'leaflet-image-layer'),
        this._zoomAnimated && ci(t, 'leaflet-zoom-animated'),
        this.options.className && ci(t, this.options.className),
        (t.onselectstart = a),
        (t.onmousemove = a)
    },
  })
  var Qe = Me.extend({
      options: { offset: [0, 7], className: '', pane: 'popupPane' },
      initialize: function (t, i) {
        c(this, t), (this._source = i)
      },
      onAdd: function (t) {
        ;(this._zoomAnimated = t._zoomAnimated),
          this._container || this._initLayout(),
          t._fadeAnimated && mi(this._container, 0),
          clearTimeout(this._removeTimeout),
          this.getPane().appendChild(this._container),
          this.update(),
          t._fadeAnimated && mi(this._container, 1),
          this.bringToFront()
      },
      onRemove: function (t) {
        t._fadeAnimated ? (mi(this._container, 0), (this._removeTimeout = setTimeout(p(ri, void 0, this._container), 200))) : ri(this._container)
      },
      getLatLng: function () {
        return this._latlng
      },
      setLatLng: function (t) {
        return (this._latlng = j(t)), this._map && (this._updatePosition(), this._adjustPan()), this
      },
      getContent: function () {
        return this._content
      },
      setContent: function (t) {
        return (this._content = t), this.update(), this
      },
      getElement: function () {
        return this._container
      },
      update: function () {
        this._map &&
          ((this._container.style.visibility = 'hidden'),
          this._updateContent(),
          this._updateLayout(),
          this._updatePosition(),
          (this._container.style.visibility = ''),
          this._adjustPan())
      },
      getEvents: function () {
        var t = { zoom: this._updatePosition, viewreset: this._updatePosition }
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
      },
      isOpen: function () {
        return !!this._map && this._map.hasLayer(this)
      },
      bringToFront: function () {
        return this._map && hi(this._container), this
      },
      bringToBack: function () {
        return this._map && ui(this._container), this
      },
      _prepareOpen: function (t, i, e) {
        if ((i instanceof Me || ((e = i), (i = t)), i instanceof Ce))
          for (var n in t._layers) {
            i = t._layers[n]
            break
          }
        if (!e)
          if (i.getCenter) e = i.getCenter()
          else {
            if (!i.getLatLng) throw new Error('Unable to get source layer LatLng.')
            e = i.getLatLng()
          }
        return (this._source = i), this.update(), e
      },
      _updateContent: function () {
        if (this._content) {
          var t = this._contentNode,
            i = 'function' == typeof this._content ? this._content(this._source || this) : this._content
          if ('string' == typeof i) t.innerHTML = i
          else {
            for (; t.hasChildNodes(); ) t.removeChild(t.firstChild)
            t.appendChild(i)
          }
          this.fire('contentupdate')
        }
      },
      _updatePosition: function () {
        var t, i, e, n, o
        this._map &&
          ((t = this._map.latLngToLayerPoint(this._latlng)),
          (i = A(this.options.offset)),
          (e = this._getAnchor()),
          this._zoomAnimated ? vi(this._container, t.add(e)) : (i = i.add(t).add(e)),
          (n = this._containerBottom = -i.y),
          (o = this._containerLeft = -Math.round(this._containerWidth / 2) + i.x),
          (this._container.style.bottom = n + 'px'),
          (this._container.style.left = o + 'px'))
      },
      _getAnchor: function () {
        return [0, 0]
      },
    }),
    tn = Qe.extend({
      options: {
        maxWidth: 300,
        minWidth: 50,
        maxHeight: null,
        autoPan: !0,
        autoPanPaddingTopLeft: null,
        autoPanPaddingBottomRight: null,
        autoPanPadding: [5, 5],
        keepInView: !1,
        closeButton: !0,
        autoClose: !0,
        closeOnEscapeKey: !0,
        className: '',
      },
      openOn: function (t) {
        return t.openPopup(this), this
      },
      onAdd: function (t) {
        Qe.prototype.onAdd.call(this, t),
          t.fire('popupopen', { popup: this }),
          this._source && (this._source.fire('popupopen', { popup: this }, !0), this._source instanceof Be || this._source.on('preclick', Ai))
      },
      onRemove: function (t) {
        Qe.prototype.onRemove.call(this, t),
          t.fire('popupclose', { popup: this }),
          this._source && (this._source.fire('popupclose', { popup: this }, !0), this._source instanceof Be || this._source.off('preclick', Ai))
      },
      getEvents: function () {
        var t = Qe.prototype.getEvents.call(this)
        return (
          (void 0 !== this.options.closeOnClick ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close),
          this.options.keepInView && (t.moveend = this._adjustPan),
          t
        )
      },
      _close: function () {
        this._map && this._map.closePopup(this)
      },
      _initLayout: function () {
        var t,
          i = 'leaflet-popup',
          e = (this._container = si('div', i + ' ' + (this.options.className || '') + ' leaflet-zoom-animated')),
          n = (this._wrapper = si('div', i + '-content-wrapper', e))
        ;(this._contentNode = si('div', i + '-content', n)),
          Oi(e),
          Ii(this._contentNode),
          zi(e, 'contextmenu', Ai),
          (this._tipContainer = si('div', i + '-tip-container', e)),
          (this._tip = si('div', i + '-tip', this._tipContainer)),
          this.options.closeButton &&
            (((t = this._closeButton = si('a', i + '-close-button', e)).href = '#close'),
            (t.innerHTML = '&#215;'),
            zi(t, 'click', this._onCloseButtonClick, this))
      },
      _updateLayout: function () {
        var t = this._contentNode,
          i = t.style
        ;(i.width = ''), (i.whiteSpace = 'nowrap')
        var e = t.offsetWidth,
          e = Math.min(e, this.options.maxWidth)
        ;(e = Math.max(e, this.options.minWidth)), (i.width = e + 1 + 'px'), (i.whiteSpace = ''), (i.height = '')
        var n = t.offsetHeight,
          o = this.options.maxHeight,
          s = 'leaflet-popup-scrolled'
        o && o < n ? ((i.height = o + 'px'), ci(t, s)) : _i(t, s), (this._containerWidth = this._container.offsetWidth)
      },
      _animateZoom: function (t) {
        var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center),
          e = this._getAnchor()
        vi(this._container, i.add(e))
      },
      _adjustPan: function () {
        var t, i, e, n, o, s, r, a, h, u, l, c
        this.options.autoPan &&
          (this._map._panAnim && this._map._panAnim.stop(),
          (t = this._map),
          (i = parseInt(oi(this._container, 'marginBottom'), 10) || 0),
          (e = this._container.offsetHeight + i),
          (n = this._containerWidth),
          (o = new k(this._containerLeft, -e - this._containerBottom))._add(yi(this._container)),
          (s = t.layerPointToContainerPoint(o)),
          (r = A(this.options.autoPanPadding)),
          (a = A(this.options.autoPanPaddingTopLeft || r)),
          (h = A(this.options.autoPanPaddingBottomRight || r)),
          (u = t.getSize()),
          (c = l = 0),
          s.x + n + h.x > u.x && (l = s.x + n - u.x + h.x),
          s.x - l - a.x < 0 && (l = s.x - a.x),
          s.y + e + h.y > u.y && (c = s.y + e - u.y + h.y),
          s.y - c - a.y < 0 && (c = s.y - a.y),
          (l || c) && t.fire('autopanstart').panBy([l, c]))
      },
      _onCloseButtonClick: function (t) {
        this._close(), Ni(t)
      },
      _getAnchor: function () {
        return A(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
      },
    })
  Ki.mergeOptions({ closePopupOnClick: !0 }),
    Ki.include({
      openPopup: function (t, i, e) {
        return (
          t instanceof tn || (t = new tn(e).setContent(t)),
          i && t.setLatLng(i),
          this.hasLayer(t) ? this : (this._popup && this._popup.options.autoClose && this.closePopup(), (this._popup = t), this.addLayer(t))
        )
      },
      closePopup: function (t) {
        return (t && t !== this._popup) || ((t = this._popup), (this._popup = null)), t && this.removeLayer(t), this
      },
    }),
    Me.include({
      bindPopup: function (t, i) {
        return (
          t instanceof tn
            ? (c(t, i), ((this._popup = t)._source = this))
            : ((this._popup && !i) || (this._popup = new tn(i, this)), this._popup.setContent(t)),
          this._popupHandlersAdded ||
            (this.on({ click: this._openPopup, keypress: this._onKeyPress, remove: this.closePopup, move: this._movePopup }),
            (this._popupHandlersAdded = !0)),
          this
        )
      },
      unbindPopup: function () {
        return (
          this._popup &&
            (this.off({ click: this._openPopup, keypress: this._onKeyPress, remove: this.closePopup, move: this._movePopup }),
            (this._popupHandlersAdded = !1),
            (this._popup = null)),
          this
        )
      },
      openPopup: function (t, i) {
        return this._popup && this._map && ((i = this._popup._prepareOpen(this, t, i)), this._map.openPopup(this._popup, i)), this
      },
      closePopup: function () {
        return this._popup && this._popup._close(), this
      },
      togglePopup: function (t) {
        return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(t)), this
      },
      isPopupOpen: function () {
        return !!this._popup && this._popup.isOpen()
      },
      setPopupContent: function (t) {
        return this._popup && this._popup.setContent(t), this
      },
      getPopup: function () {
        return this._popup
      },
      _openPopup: function (t) {
        var i = t.layer || t.target
        this._popup &&
          this._map &&
          (Ni(t),
          i instanceof Be
            ? this.openPopup(t.layer || t.target, t.latlng)
            : this._map.hasLayer(this._popup) && this._popup._source === i
            ? this.closePopup()
            : this.openPopup(i, t.latlng))
      },
      _movePopup: function (t) {
        this._popup.setLatLng(t.latlng)
      },
      _onKeyPress: function (t) {
        13 === t.originalEvent.keyCode && this._openPopup(t)
      },
    })
  var en = Qe.extend({
    options: { pane: 'tooltipPane', offset: [0, 0], direction: 'auto', permanent: !1, sticky: !1, interactive: !1, opacity: 0.9 },
    onAdd: function (t) {
      Qe.prototype.onAdd.call(this, t),
        this.setOpacity(this.options.opacity),
        t.fire('tooltipopen', { tooltip: this }),
        this._source && this._source.fire('tooltipopen', { tooltip: this }, !0)
    },
    onRemove: function (t) {
      Qe.prototype.onRemove.call(this, t),
        t.fire('tooltipclose', { tooltip: this }),
        this._source && this._source.fire('tooltipclose', { tooltip: this }, !0)
    },
    getEvents: function () {
      var t = Qe.prototype.getEvents.call(this)
      return bt && !this.options.permanent && (t.preclick = this._close), t
    },
    _close: function () {
      this._map && this._map.closeTooltip(this)
    },
    _initLayout: function () {
      var t = 'leaflet-tooltip ' + (this.options.className || '') + ' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide')
      this._contentNode = this._container = si('div', t)
    },
    _updateLayout: function () {},
    _adjustPan: function () {},
    _setPosition: function (t) {
      var i,
        e = this._map,
        n = this._container,
        o = e.latLngToContainerPoint(e.getCenter()),
        s = e.layerPointToContainerPoint(t),
        r = this.options.direction,
        a = n.offsetWidth,
        h = n.offsetHeight,
        u = A(this.options.offset),
        l = this._getAnchor(),
        c =
          'top' === r
            ? ((i = a / 2), h)
            : 'bottom' === r
            ? ((i = a / 2), 0)
            : ((i =
                'center' === r ? a / 2 : 'right' === r ? 0 : 'left' === r ? a : s.x < o.x ? ((r = 'right'), 0) : ((r = 'left'), a + 2 * (u.x + l.x))),
              h / 2)
      ;(t = t.subtract(A(i, c, !0)).add(u).add(l)),
        _i(n, 'leaflet-tooltip-right'),
        _i(n, 'leaflet-tooltip-left'),
        _i(n, 'leaflet-tooltip-top'),
        _i(n, 'leaflet-tooltip-bottom'),
        ci(n, 'leaflet-tooltip-' + r),
        vi(n, t)
    },
    _updatePosition: function () {
      var t = this._map.latLngToLayerPoint(this._latlng)
      this._setPosition(t)
    },
    setOpacity: function (t) {
      ;(this.options.opacity = t), this._container && mi(this._container, t)
    },
    _animateZoom: function (t) {
      var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center)
      this._setPosition(i)
    },
    _getAnchor: function () {
      return A(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
    },
  })
  Ki.include({
    openTooltip: function (t, i, e) {
      return t instanceof en || (t = new en(e).setContent(t)), i && t.setLatLng(i), this.hasLayer(t) ? this : this.addLayer(t)
    },
    closeTooltip: function (t) {
      return t && this.removeLayer(t), this
    },
  }),
    Me.include({
      bindTooltip: function (t, i) {
        return (
          t instanceof en
            ? (c(t, i), ((this._tooltip = t)._source = this))
            : ((this._tooltip && !i) || (this._tooltip = new en(i, this)), this._tooltip.setContent(t)),
          this._initTooltipInteractions(),
          this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(),
          this
        )
      },
      unbindTooltip: function () {
        return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), (this._tooltip = null)), this
      },
      _initTooltipInteractions: function (t) {
        var i, e
        ;(!t && this._tooltipHandlersAdded) ||
          ((i = t ? 'off' : 'on'),
          (e = { remove: this.closeTooltip, move: this._moveTooltip }),
          this._tooltip.options.permanent
            ? (e.add = this._openTooltip)
            : ((e.mouseover = this._openTooltip),
              (e.mouseout = this.closeTooltip),
              this._tooltip.options.sticky && (e.mousemove = this._moveTooltip),
              bt && (e.click = this._openTooltip)),
          this[i](e),
          (this._tooltipHandlersAdded = !t))
      },
      openTooltip: function (t, i) {
        return (
          this._tooltip &&
            this._map &&
            ((i = this._tooltip._prepareOpen(this, t, i)),
            this._map.openTooltip(this._tooltip, i),
            this._tooltip.options.interactive &&
              this._tooltip._container &&
              (ci(this._tooltip._container, 'leaflet-clickable'), this.addInteractiveTarget(this._tooltip._container))),
          this
        )
      },
      closeTooltip: function () {
        return (
          this._tooltip &&
            (this._tooltip._close(),
            this._tooltip.options.interactive &&
              this._tooltip._container &&
              (_i(this._tooltip._container, 'leaflet-clickable'), this.removeInteractiveTarget(this._tooltip._container))),
          this
        )
      },
      toggleTooltip: function (t) {
        return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(t)), this
      },
      isTooltipOpen: function () {
        return this._tooltip.isOpen()
      },
      setTooltipContent: function (t) {
        return this._tooltip && this._tooltip.setContent(t), this
      },
      getTooltip: function () {
        return this._tooltip
      },
      _openTooltip: function (t) {
        var i = t.layer || t.target
        this._tooltip && this._map && this.openTooltip(i, this._tooltip.options.sticky ? t.latlng : void 0)
      },
      _moveTooltip: function (t) {
        var i,
          e,
          n = t.latlng
        this._tooltip.options.sticky &&
          t.originalEvent &&
          ((i = this._map.mouseEventToContainerPoint(t.originalEvent)),
          (e = this._map.containerPointToLayerPoint(i)),
          (n = this._map.layerPointToLatLng(e))),
          this._tooltip.setLatLng(n)
      },
    })
  var nn = Se.extend({
    options: { iconSize: [12, 12], html: !1, bgPos: null, className: 'leaflet-div-icon' },
    createIcon: function (t) {
      var i,
        e = t && 'DIV' === t.tagName ? t : document.createElement('div'),
        n = this.options
      return (
        n.html instanceof Element ? (ai(e), e.appendChild(n.html)) : (e.innerHTML = !1 !== n.html ? n.html : ''),
        n.bgPos && ((i = A(n.bgPos)), (e.style.backgroundPosition = -i.x + 'px ' + -i.y + 'px')),
        this._setIconStyles(e, 'icon'),
        e
      )
    },
    createShadow: function () {
      return null
    },
  })
  Se.Default = Ze
  var on = Me.extend({
    options: {
      tileSize: 256,
      opacity: 1,
      updateWhenIdle: yt,
      updateWhenZooming: !0,
      updateInterval: 200,
      zIndex: 1,
      bounds: null,
      minZoom: 0,
      maxZoom: void 0,
      maxNativeZoom: void 0,
      minNativeZoom: void 0,
      noWrap: !1,
      pane: 'tilePane',
      className: '',
      keepBuffer: 2,
    },
    initialize: function (t) {
      c(this, t)
    },
    onAdd: function () {
      this._initContainer(), (this._levels = {}), (this._tiles = {}), this._resetView(), this._update()
    },
    beforeAdd: function (t) {
      t._addZoomLimit(this)
    },
    onRemove: function (t) {
      this._removeAllTiles(), ri(this._container), t._removeZoomLimit(this), (this._container = null), (this._tileZoom = void 0)
    },
    bringToFront: function () {
      return this._map && (hi(this._container), this._setAutoZIndex(Math.max)), this
    },
    bringToBack: function () {
      return this._map && (ui(this._container), this._setAutoZIndex(Math.min)), this
    },
    getContainer: function () {
      return this._container
    },
    setOpacity: function (t) {
      return (this.options.opacity = t), this._updateOpacity(), this
    },
    setZIndex: function (t) {
      return (this.options.zIndex = t), this._updateZIndex(), this
    },
    isLoading: function () {
      return this._loading
    },
    redraw: function () {
      return this._map && (this._removeAllTiles(), this._update()), this
    },
    getEvents: function () {
      var t = { viewprereset: this._invalidateAll, viewreset: this._resetView, zoom: this._resetView, moveend: this._onMoveEnd }
      return (
        this.options.updateWhenIdle ||
          (this._onMove || (this._onMove = n(this._onMoveEnd, this.options.updateInterval, this)), (t.move = this._onMove)),
        this._zoomAnimated && (t.zoomanim = this._animateZoom),
        t
      )
    },
    createTile: function () {
      return document.createElement('div')
    },
    getTileSize: function () {
      var t = this.options.tileSize
      return t instanceof k ? t : new k(t, t)
    },
    _updateZIndex: function () {
      this._container && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
    },
    _setAutoZIndex: function (t) {
      for (var i, e = this.getPane().children, n = -t(-1 / 0, 1 / 0), o = 0, s = e.length; o < s; o++)
        (i = e[o].style.zIndex), e[o] !== this._container && i && (n = t(n, +i))
      isFinite(n) && ((this.options.zIndex = n + t(-1, 1)), this._updateZIndex())
    },
    _updateOpacity: function () {
      if (this._map && !it) {
        mi(this._container, this.options.opacity)
        var t = +new Date(),
          i = !1,
          e = !1
        for (var n in this._tiles) {
          var o,
            s = this._tiles[n]
          s.current &&
            s.loaded &&
            ((o = Math.min(1, (t - s.loaded) / 200)), mi(s.el, o), o < 1 ? (i = !0) : (s.active ? (e = !0) : this._onOpaqueTile(s), (s.active = !0)))
        }
        e && !this._noPrune && this._pruneTiles(), i && (z(this._fadeFrame), (this._fadeFrame = M(this._updateOpacity, this)))
      }
    },
    _onOpaqueTile: a,
    _initContainer: function () {
      this._container ||
        ((this._container = si('div', 'leaflet-layer ' + (this.options.className || ''))),
        this._updateZIndex(),
        this.options.opacity < 1 && this._updateOpacity(),
        this.getPane().appendChild(this._container))
    },
    _updateLevels: function () {
      var t = this._tileZoom,
        i = this.options.maxZoom
      if (void 0 !== t) {
        for (var e in this._levels)
          (e = Number(e)),
            this._levels[e].el.children.length || e === t
              ? ((this._levels[e].el.style.zIndex = i - Math.abs(t - e)), this._onUpdateLevel(e))
              : (ri(this._levels[e].el), this._removeTilesAtZoom(e), this._onRemoveLevel(e), delete this._levels[e])
        var n = this._levels[t],
          o = this._map
        return (
          n ||
            (((n = this._levels[t] = {}).el = si('div', 'leaflet-tile-container leaflet-zoom-animated', this._container)),
            (n.el.style.zIndex = i),
            (n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round()),
            (n.zoom = t),
            this._setZoomTransform(n, o.getCenter(), o.getZoom()),
            a(n.el.offsetWidth),
            this._onCreateLevel(n)),
          (this._level = n)
        )
      }
    },
    _onUpdateLevel: a,
    _onRemoveLevel: a,
    _onCreateLevel: a,
    _pruneTiles: function () {
      if (this._map) {
        var t,
          i,
          e,
          n = this._map.getZoom()
        if (n > this.options.maxZoom || n < this.options.minZoom) this._removeAllTiles()
        else {
          for (t in this._tiles) (e = this._tiles[t]).retain = e.current
          for (t in this._tiles) {
            ;(e = this._tiles[t]).current &&
              !e.active &&
              ((i = e.coords), this._retainParent(i.x, i.y, i.z, i.z - 5) || this._retainChildren(i.x, i.y, i.z, i.z + 2))
          }
          for (t in this._tiles) this._tiles[t].retain || this._removeTile(t)
        }
      }
    },
    _removeTilesAtZoom: function (t) {
      for (var i in this._tiles) this._tiles[i].coords.z === t && this._removeTile(i)
    },
    _removeAllTiles: function () {
      for (var t in this._tiles) this._removeTile(t)
    },
    _invalidateAll: function () {
      for (var t in this._levels) ri(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t]
      this._removeAllTiles(), (this._tileZoom = void 0)
    },
    _retainParent: function (t, i, e, n) {
      var o = Math.floor(t / 2),
        s = Math.floor(i / 2),
        r = e - 1,
        a = new k(+o, +s)
      a.z = +r
      var h = this._tileCoordsToKey(a),
        u = this._tiles[h]
      return u && u.active ? (u.retain = !0) : (u && u.loaded && (u.retain = !0), n < r && this._retainParent(o, s, r, n))
    },
    _retainChildren: function (t, i, e, n) {
      for (var o = 2 * t; o < 2 * t + 2; o++)
        for (var s = 2 * i; s < 2 * i + 2; s++) {
          var r = new k(o, s)
          r.z = e + 1
          var a = this._tileCoordsToKey(r),
            h = this._tiles[a]
          h && h.active ? (h.retain = !0) : (h && h.loaded && (h.retain = !0), e + 1 < n && this._retainChildren(o, s, e + 1, n))
        }
    },
    _resetView: function (t) {
      var i = t && (t.pinch || t.flyTo)
      this._setView(this._map.getCenter(), this._map.getZoom(), i, i)
    },
    _animateZoom: function (t) {
      this._setView(t.center, t.zoom, !0, t.noUpdate)
    },
    _clampZoom: function (t) {
      var i = this.options
      return void 0 !== i.minNativeZoom && t < i.minNativeZoom
        ? i.minNativeZoom
        : void 0 !== i.maxNativeZoom && i.maxNativeZoom < t
        ? i.maxNativeZoom
        : t
    },
    _setView: function (t, i, e, n) {
      var o = Math.round(i),
        o =
          (void 0 !== this.options.maxZoom && o > this.options.maxZoom) || (void 0 !== this.options.minZoom && o < this.options.minZoom)
            ? void 0
            : this._clampZoom(o),
        s = this.options.updateWhenZooming && o !== this._tileZoom
      ;(n && !s) ||
        ((this._tileZoom = o),
        this._abortLoading && this._abortLoading(),
        this._updateLevels(),
        this._resetGrid(),
        void 0 !== o && this._update(t),
        e || this._pruneTiles(),
        (this._noPrune = !!e)),
        this._setZoomTransforms(t, i)
    },
    _setZoomTransforms: function (t, i) {
      for (var e in this._levels) this._setZoomTransform(this._levels[e], t, i)
    },
    _setZoomTransform: function (t, i, e) {
      var n = this._map.getZoomScale(e, t.zoom),
        o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(i, e)).round()
      vt ? gi(t.el, o, n) : vi(t.el, o)
    },
    _resetGrid: function () {
      var t = this._map,
        i = t.options.crs,
        e = (this._tileSize = this.getTileSize()),
        n = this._tileZoom,
        o = this._map.getPixelWorldBounds(this._tileZoom)
      o && (this._globalTileRange = this._pxBoundsToTileRange(o)),
        (this._wrapX = i.wrapLng &&
          !this.options.noWrap && [Math.floor(t.project([0, i.wrapLng[0]], n).x / e.x), Math.ceil(t.project([0, i.wrapLng[1]], n).x / e.y)]),
        (this._wrapY = i.wrapLat &&
          !this.options.noWrap && [Math.floor(t.project([i.wrapLat[0], 0], n).y / e.x), Math.ceil(t.project([i.wrapLat[1], 0], n).y / e.y)])
    },
    _onMoveEnd: function () {
      this._map && !this._map._animatingZoom && this._update()
    },
    _getTiledPixelBounds: function (t) {
      var i = this._map,
        e = i._animatingZoom ? Math.max(i._animateToZoom, i.getZoom()) : i.getZoom(),
        n = i.getZoomScale(e, this._tileZoom),
        o = i.project(t, this._tileZoom).floor(),
        s = i.getSize().divideBy(2 * n)
      return new I(o.subtract(s), o.add(s))
    },
    _update: function (t) {
      var i = this._map
      if (i) {
        var e = this._clampZoom(i.getZoom())
        if ((void 0 === t && (t = i.getCenter()), void 0 !== this._tileZoom)) {
          var n = this._getTiledPixelBounds(t),
            o = this._pxBoundsToTileRange(n),
            s = o.getCenter(),
            r = [],
            a = this.options.keepBuffer,
            h = new I(o.getBottomLeft().subtract([a, -a]), o.getTopRight().add([a, -a]))
          if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y)))
            throw new Error('Attempted to load an infinite number of tiles')
          for (var u in this._tiles) {
            var l = this._tiles[u].coords
            ;(l.z === this._tileZoom && h.contains(new k(l.x, l.y))) || (this._tiles[u].current = !1)
          }
          if (1 < Math.abs(e - this._tileZoom)) this._setView(t, e)
          else {
            for (var c = o.min.y; c <= o.max.y; c++)
              for (var _ = o.min.x; _ <= o.max.x; _++) {
                var d,
                  p = new k(_, c)
                ;(p.z = this._tileZoom), this._isValidTile(p) && ((d = this._tiles[this._tileCoordsToKey(p)]) ? (d.current = !0) : r.push(p))
              }
            if (
              (r.sort(function (t, i) {
                return t.distanceTo(s) - i.distanceTo(s)
              }),
              0 !== r.length)
            ) {
              this._loading || ((this._loading = !0), this.fire('loading'))
              for (var m = document.createDocumentFragment(), _ = 0; _ < r.length; _++) this._addTile(r[_], m)
              this._level.el.appendChild(m)
            }
          }
        }
      }
    },
    _isValidTile: function (t) {
      var i = this._map.options.crs
      if (!i.infinite) {
        var e = this._globalTileRange
        if ((!i.wrapLng && (t.x < e.min.x || t.x > e.max.x)) || (!i.wrapLat && (t.y < e.min.y || t.y > e.max.y))) return !1
      }
      if (!this.options.bounds) return !0
      var n = this._tileCoordsToBounds(t)
      return N(this.options.bounds).overlaps(n)
    },
    _keyToBounds: function (t) {
      return this._tileCoordsToBounds(this._keyToTileCoords(t))
    },
    _tileCoordsToNwSe: function (t) {
      var i = this._map,
        e = this.getTileSize(),
        n = t.scaleBy(e),
        o = n.add(e)
      return [i.unproject(n, t.z), i.unproject(o, t.z)]
    },
    _tileCoordsToBounds: function (t) {
      var i = this._tileCoordsToNwSe(t),
        e = new R(i[0], i[1])
      return this.options.noWrap || (e = this._map.wrapLatLngBounds(e)), e
    },
    _tileCoordsToKey: function (t) {
      return t.x + ':' + t.y + ':' + t.z
    },
    _keyToTileCoords: function (t) {
      var i = t.split(':'),
        e = new k(+i[0], +i[1])
      return (e.z = +i[2]), e
    },
    _removeTile: function (t) {
      var i = this._tiles[t]
      i && (ri(i.el), delete this._tiles[t], this.fire('tileunload', { tile: i.el, coords: this._keyToTileCoords(t) }))
    },
    _initTile: function (t) {
      ci(t, 'leaflet-tile')
      var i = this.getTileSize()
      ;(t.style.width = i.x + 'px'),
        (t.style.height = i.y + 'px'),
        (t.onselectstart = a),
        (t.onmousemove = a),
        it && this.options.opacity < 1 && mi(t, this.options.opacity),
        ot && !st && (t.style.WebkitBackfaceVisibility = 'hidden')
    },
    _addTile: function (t, i) {
      var e = this._getTilePos(t),
        n = this._tileCoordsToKey(t),
        o = this.createTile(this._wrapCoords(t), p(this._tileReady, this, t))
      this._initTile(o),
        this.createTile.length < 2 && M(p(this._tileReady, this, t, null, o)),
        vi(o, e),
        (this._tiles[n] = { el: o, coords: t, current: !0 }),
        i.appendChild(o),
        this.fire('tileloadstart', { tile: o, coords: t })
    },
    _tileReady: function (t, i, e) {
      i && this.fire('tileerror', { error: i, tile: e, coords: t })
      var n = this._tileCoordsToKey(t)
      ;(e = this._tiles[n]) &&
        ((e.loaded = +new Date()),
        this._map._fadeAnimated
          ? (mi(e.el, 0), z(this._fadeFrame), (this._fadeFrame = M(this._updateOpacity, this)))
          : ((e.active = !0), this._pruneTiles()),
        i || (ci(e.el, 'leaflet-tile-loaded'), this.fire('tileload', { tile: e.el, coords: t })),
        this._noTilesToLoad() &&
          ((this._loading = !1),
          this.fire('load'),
          it || !this._map._fadeAnimated ? M(this._pruneTiles, this) : setTimeout(p(this._pruneTiles, this), 250)))
    },
    _getTilePos: function (t) {
      return t.scaleBy(this.getTileSize()).subtract(this._level.origin)
    },
    _wrapCoords: function (t) {
      var i = new k(this._wrapX ? o(t.x, this._wrapX) : t.x, this._wrapY ? o(t.y, this._wrapY) : t.y)
      return (i.z = t.z), i
    },
    _pxBoundsToTileRange: function (t) {
      var i = this.getTileSize()
      return new I(t.min.unscaleBy(i).floor(), t.max.unscaleBy(i).ceil().subtract([1, 1]))
    },
    _noTilesToLoad: function () {
      for (var t in this._tiles) if (!this._tiles[t].loaded) return !1
      return !0
    },
  })
  var sn = on.extend({
    options: {
      minZoom: 0,
      maxZoom: 18,
      subdomains: 'abc',
      errorTileUrl: '',
      zoomOffset: 0,
      tms: !1,
      zoomReverse: !1,
      detectRetina: !1,
      crossOrigin: !1,
    },
    initialize: function (t, i) {
      ;(this._url = t),
        (i = c(this, i)).detectRetina &&
          zt &&
          0 < i.maxZoom &&
          ((i.tileSize = Math.floor(i.tileSize / 2)),
          i.zoomReverse ? (i.zoomOffset--, i.minZoom++) : (i.zoomOffset++, i.maxZoom--),
          (i.minZoom = Math.max(0, i.minZoom))),
        'string' == typeof i.subdomains && (i.subdomains = i.subdomains.split('')),
        ot || this.on('tileunload', this._onTileRemove)
    },
    setUrl: function (t, i) {
      return this._url === t && void 0 === i && (i = !0), (this._url = t), i || this.redraw(), this
    },
    createTile: function (t, i) {
      var e = document.createElement('img')
      return (
        zi(e, 'load', p(this._tileOnLoad, this, i, e)),
        zi(e, 'error', p(this._tileOnError, this, i, e)),
        (!this.options.crossOrigin && '' !== this.options.crossOrigin) ||
          (e.crossOrigin = !0 === this.options.crossOrigin ? '' : this.options.crossOrigin),
        (e.alt = ''),
        e.setAttribute('role', 'presentation'),
        (e.src = this.getTileUrl(t)),
        e
      )
    },
    getTileUrl: function (t) {
      var i,
        e = { r: zt ? '@2x' : '', s: this._getSubdomain(t), x: t.x, y: t.y, z: this._getZoomForUrl() }
      return (
        this._map && !this._map.options.crs.infinite && ((i = this._globalTileRange.max.y - t.y), this.options.tms && (e.y = i), (e['-y'] = i)),
        f(this._url, h(e, this.options))
      )
    },
    _tileOnLoad: function (t, i) {
      it ? setTimeout(p(t, this, null, i), 0) : t(null, i)
    },
    _tileOnError: function (t, i, e) {
      var n = this.options.errorTileUrl
      n && i.getAttribute('src') !== n && (i.src = n), t(e, i)
    },
    _onTileRemove: function (t) {
      t.tile.onload = null
    },
    _getZoomForUrl: function () {
      var t = this._tileZoom,
        i = this.options.maxZoom
      return this.options.zoomReverse && (t = i - t), t + this.options.zoomOffset
    },
    _getSubdomain: function (t) {
      var i = Math.abs(t.x + t.y) % this.options.subdomains.length
      return this.options.subdomains[i]
    },
    _abortLoading: function () {
      var t, i
      for (t in this._tiles)
        this._tiles[t].coords.z !== this._tileZoom &&
          (((i = this._tiles[t].el).onload = a), (i.onerror = a), i.complete || ((i.src = y), ri(i), delete this._tiles[t]))
    },
    _removeTile: function (t) {
      var i = this._tiles[t]
      if (i) return at || i.el.setAttribute('src', y), on.prototype._removeTile.call(this, t)
    },
    _tileReady: function (t, i, e) {
      if (this._map && (!e || e.getAttribute('src') !== y)) return on.prototype._tileReady.call(this, t, i, e)
    },
  })
  function rn(t, i) {
    return new sn(t, i)
  }
  var an = sn.extend({
    defaultWmsParams: { service: 'WMS', request: 'GetMap', layers: '', styles: '', format: 'image/jpeg', transparent: !1, version: '1.1.1' },
    options: { crs: null, uppercase: !1 },
    initialize: function (t, i) {
      this._url = t
      var e = h({}, this.defaultWmsParams)
      for (var n in i) n in this.options || (e[n] = i[n])
      var o = (i = c(this, i)).detectRetina && zt ? 2 : 1,
        s = this.getTileSize()
      ;(e.width = s.x * o), (e.height = s.y * o), (this.wmsParams = e)
    },
    onAdd: function (t) {
      ;(this._crs = this.options.crs || t.options.crs), (this._wmsVersion = parseFloat(this.wmsParams.version))
      var i = 1.3 <= this._wmsVersion ? 'crs' : 'srs'
      ;(this.wmsParams[i] = this._crs.code), sn.prototype.onAdd.call(this, t)
    },
    getTileUrl: function (t) {
      var i = this._tileCoordsToNwSe(t),
        e = this._crs,
        n = O(e.project(i[0]), e.project(i[1])),
        o = n.min,
        s = n.max,
        r = (1.3 <= this._wmsVersion && this._crs === be ? [o.y, o.x, s.y, s.x] : [o.x, o.y, s.x, s.y]).join(','),
        a = sn.prototype.getTileUrl.call(this, t)
      return a + _(this.wmsParams, a, this.options.uppercase) + (this.options.uppercase ? '&BBOX=' : '&bbox=') + r
    },
    setParams: function (t, i) {
      return h(this.wmsParams, t), i || this.redraw(), this
    },
  })
  ;(sn.WMS = an),
    (rn.wms = function (t, i) {
      return new an(t, i)
    })
  var hn = Me.extend({
      options: { padding: 0.1, tolerance: 0 },
      initialize: function (t) {
        c(this, t), m(this), (this._layers = this._layers || {})
      },
      onAdd: function () {
        this._container || (this._initContainer(), this._zoomAnimated && ci(this._container, 'leaflet-zoom-animated')),
          this.getPane().appendChild(this._container),
          this._update(),
          this.on('update', this._updatePaths, this)
      },
      onRemove: function () {
        this.off('update', this._updatePaths, this), this._destroyContainer()
      },
      getEvents: function () {
        var t = { viewreset: this._reset, zoom: this._onZoom, moveend: this._update, zoomend: this._onZoomEnd }
        return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t
      },
      _onAnimZoom: function (t) {
        this._updateTransform(t.center, t.zoom)
      },
      _onZoom: function () {
        this._updateTransform(this._map.getCenter(), this._map.getZoom())
      },
      _updateTransform: function (t, i) {
        var e = this._map.getZoomScale(i, this._zoom),
          n = yi(this._container),
          o = this._map.getSize().multiplyBy(0.5 + this.options.padding),
          s = this._map.project(this._center, i),
          r = this._map.project(t, i).subtract(s),
          a = o.multiplyBy(-e).add(n).add(o).subtract(r)
        vt ? gi(this._container, a, e) : vi(this._container, a)
      },
      _reset: function () {
        for (var t in (this._update(), this._updateTransform(this._center, this._zoom), this._layers)) this._layers[t]._reset()
      },
      _onZoomEnd: function () {
        for (var t in this._layers) this._layers[t]._project()
      },
      _updatePaths: function () {
        for (var t in this._layers) this._layers[t]._update()
      },
      _update: function () {
        var t = this.options.padding,
          i = this._map.getSize(),
          e = this._map.containerPointToLayerPoint(i.multiplyBy(-t)).round()
        ;(this._bounds = new I(e, e.add(i.multiplyBy(1 + 2 * t)).round())), (this._center = this._map.getCenter()), (this._zoom = this._map.getZoom())
      },
    }),
    un = hn.extend({
      getEvents: function () {
        var t = hn.prototype.getEvents.call(this)
        return (t.viewprereset = this._onViewPreReset), t
      },
      _onViewPreReset: function () {
        this._postponeUpdatePaths = !0
      },
      onAdd: function () {
        hn.prototype.onAdd.call(this), this._draw()
      },
      _initContainer: function () {
        var t = (this._container = document.createElement('canvas'))
        zi(t, 'mousemove', this._onMouseMove, this),
          zi(t, 'click dblclick mousedown mouseup contextmenu', this._onClick, this),
          zi(t, 'mouseout', this._handleMouseOut, this),
          (this._ctx = t.getContext('2d'))
      },
      _destroyContainer: function () {
        z(this._redrawRequest), delete this._ctx, ri(this._container), Si(this._container), delete this._container
      },
      _updatePaths: function () {
        if (!this._postponeUpdatePaths) {
          for (var t in ((this._redrawBounds = null), this._layers)) this._layers[t]._update()
          this._redraw()
        }
      },
      _update: function () {
        var t, i, e, n
        ;(this._map._animatingZoom && this._bounds) ||
          (hn.prototype._update.call(this),
          (t = this._bounds),
          (i = this._container),
          (e = t.getSize()),
          (n = zt ? 2 : 1),
          vi(i, t.min),
          (i.width = n * e.x),
          (i.height = n * e.y),
          (i.style.width = e.x + 'px'),
          (i.style.height = e.y + 'px'),
          zt && this._ctx.scale(2, 2),
          this._ctx.translate(-t.min.x, -t.min.y),
          this.fire('update'))
      },
      _reset: function () {
        hn.prototype._reset.call(this), this._postponeUpdatePaths && ((this._postponeUpdatePaths = !1), this._updatePaths())
      },
      _initPath: function (t) {
        this._updateDashArray(t)
        var i = ((this._layers[m(t)] = t)._order = { layer: t, prev: this._drawLast, next: null })
        this._drawLast && (this._drawLast.next = i), (this._drawLast = i), (this._drawFirst = this._drawFirst || this._drawLast)
      },
      _addPath: function (t) {
        this._requestRedraw(t)
      },
      _removePath: function (t) {
        var i = t._order,
          e = i.next,
          n = i.prev
        e ? (e.prev = n) : (this._drawLast = n),
          n ? (n.next = e) : (this._drawFirst = e),
          delete t._order,
          delete this._layers[m(t)],
          this._requestRedraw(t)
      },
      _updatePath: function (t) {
        this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t)
      },
      _updateStyle: function (t) {
        this._updateDashArray(t), this._requestRedraw(t)
      },
      _updateDashArray: function (t) {
        if ('string' == typeof t.options.dashArray) {
          for (var i, e = t.options.dashArray.split(/[, ]+/), n = [], o = 0; o < e.length; o++) {
            if (((i = Number(e[o])), isNaN(i))) return
            n.push(i)
          }
          t.options._dashArray = n
        } else t.options._dashArray = t.options.dashArray
      },
      _requestRedraw: function (t) {
        this._map && (this._extendRedrawBounds(t), (this._redrawRequest = this._redrawRequest || M(this._redraw, this)))
      },
      _extendRedrawBounds: function (t) {
        var i
        t._pxBounds &&
          ((i = (t.options.weight || 0) + 1),
          (this._redrawBounds = this._redrawBounds || new I()),
          this._redrawBounds.extend(t._pxBounds.min.subtract([i, i])),
          this._redrawBounds.extend(t._pxBounds.max.add([i, i])))
      },
      _redraw: function () {
        ;(this._redrawRequest = null),
          this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()),
          this._clear(),
          this._draw(),
          (this._redrawBounds = null)
      },
      _clear: function () {
        var t,
          i = this._redrawBounds
        i
          ? ((t = i.getSize()), this._ctx.clearRect(i.min.x, i.min.y, t.x, t.y))
          : (this._ctx.save(),
            this._ctx.setTransform(1, 0, 0, 1, 0, 0),
            this._ctx.clearRect(0, 0, this._container.width, this._container.height),
            this._ctx.restore())
      },
      _draw: function () {
        var t,
          i,
          e = this._redrawBounds
        this._ctx.save(),
          e && ((i = e.getSize()), this._ctx.beginPath(), this._ctx.rect(e.min.x, e.min.y, i.x, i.y), this._ctx.clip()),
          (this._drawing = !0)
        for (var n = this._drawFirst; n; n = n.next) (t = n.layer), (!e || (t._pxBounds && t._pxBounds.intersects(e))) && t._updatePath()
        ;(this._drawing = !1), this._ctx.restore()
      },
      _updatePoly: function (t, i) {
        if (this._drawing) {
          var e,
            n,
            o,
            s,
            r = t._parts,
            a = r.length,
            h = this._ctx
          if (a) {
            for (h.beginPath(), e = 0; e < a; e++) {
              for (n = 0, o = r[e].length; n < o; n++) (s = r[e][n]), h[n ? 'lineTo' : 'moveTo'](s.x, s.y)
              i && h.closePath()
            }
            this._fillStroke(h, t)
          }
        }
      },
      _updateCircle: function (t) {
        var i, e, n, o
        this._drawing &&
          !t._empty() &&
          ((i = t._point),
          (e = this._ctx),
          (n = Math.max(Math.round(t._radius), 1)),
          1 != (o = (Math.max(Math.round(t._radiusY), 1) || n) / n) && (e.save(), e.scale(1, o)),
          e.beginPath(),
          e.arc(i.x, i.y / o, n, 0, 2 * Math.PI, !1),
          1 != o && e.restore(),
          this._fillStroke(e, t))
      },
      _fillStroke: function (t, i) {
        var e = i.options
        e.fill && ((t.globalAlpha = e.fillOpacity), (t.fillStyle = e.fillColor || e.color), t.fill(e.fillRule || 'evenodd')),
          e.stroke &&
            0 !== e.weight &&
            (t.setLineDash && t.setLineDash((i.options && i.options._dashArray) || []),
            (t.globalAlpha = e.opacity),
            (t.lineWidth = e.weight),
            (t.strokeStyle = e.color),
            (t.lineCap = e.lineCap),
            (t.lineJoin = e.lineJoin),
            t.stroke())
      },
      _onClick: function (t) {
        for (var i, e, n = this._map.mouseEventToLayerPoint(t), o = this._drawFirst; o; o = o.next)
          (i = o.layer).options.interactive &&
            i._containsPoint(n) &&
            ((('click' === t.type || 'preclick' !== t.type) && this._map._draggableMoved(i)) || (e = i))
        e && (Fi(t), this._fireEvent([e], t))
      },
      _onMouseMove: function (t) {
        var i
        !this._map ||
          this._map.dragging.moving() ||
          this._map._animatingZoom ||
          ((i = this._map.mouseEventToLayerPoint(t)), this._handleMouseHover(t, i))
      },
      _handleMouseOut: function (t) {
        var i = this._hoveredLayer
        i &&
          (_i(this._container, 'leaflet-interactive'),
          this._fireEvent([i], t, 'mouseout'),
          (this._hoveredLayer = null),
          (this._mouseHoverThrottled = !1))
      },
      _handleMouseHover: function (t, i) {
        if (!this._mouseHoverThrottled) {
          for (var e, n, o = this._drawFirst; o; o = o.next) (e = o.layer).options.interactive && e._containsPoint(i) && (n = e)
          n !== this._hoveredLayer &&
            (this._handleMouseOut(t),
            n && (ci(this._container, 'leaflet-interactive'), this._fireEvent([n], t, 'mouseover'), (this._hoveredLayer = n))),
            this._hoveredLayer && this._fireEvent([this._hoveredLayer], t),
            (this._mouseHoverThrottled = !0),
            setTimeout(
              p(function () {
                this._mouseHoverThrottled = !1
              }, this),
              32
            )
        }
      },
      _fireEvent: function (t, i, e) {
        this._map._fireDOMEvent(i, e || i.type, t)
      },
      _bringToFront: function (t) {
        var i,
          e,
          n = t._order
        n &&
          ((i = n.next),
          (e = n.prev),
          i &&
            ((i.prev = e) ? (e.next = i) : i && (this._drawFirst = i),
            (n.prev = this._drawLast),
            ((this._drawLast.next = n).next = null),
            (this._drawLast = n),
            this._requestRedraw(t)))
      },
      _bringToBack: function (t) {
        var i,
          e,
          n = t._order
        n &&
          ((i = n.next),
          (e = n.prev) &&
            ((e.next = i) ? (i.prev = e) : e && (this._drawLast = e),
            (n.prev = null),
            (n.next = this._drawFirst),
            (this._drawFirst.prev = n),
            (this._drawFirst = n),
            this._requestRedraw(t)))
      },
    })
  function ln(t) {
    return St ? new un(t) : null
  }
  var cn = (function () {
      try {
        return (
          document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml'),
          function (t) {
            return document.createElement('<lvml:' + t + ' class="lvml">')
          }
        )
      } catch (t) {
        return function (t) {
          return document.createElement('<' + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
        }
      }
    })(),
    _n = {
      _initContainer: function () {
        this._container = si('div', 'leaflet-vml-container')
      },
      _update: function () {
        this._map._animatingZoom || (hn.prototype._update.call(this), this.fire('update'))
      },
      _initPath: function (t) {
        var i = (t._container = cn('shape'))
        ci(i, 'leaflet-vml-shape ' + (this.options.className || '')),
          (i.coordsize = '1 1'),
          (t._path = cn('path')),
          i.appendChild(t._path),
          this._updateStyle(t),
          (this._layers[m(t)] = t)
      },
      _addPath: function (t) {
        var i = t._container
        this._container.appendChild(i), t.options.interactive && t.addInteractiveTarget(i)
      },
      _removePath: function (t) {
        var i = t._container
        ri(i), t.removeInteractiveTarget(i), delete this._layers[m(t)]
      },
      _updateStyle: function (t) {
        var i = t._stroke,
          e = t._fill,
          n = t.options,
          o = t._container
        ;(o.stroked = !!n.stroke),
          (o.filled = !!n.fill),
          n.stroke
            ? ((i = i || (t._stroke = cn('stroke'))),
              o.appendChild(i),
              (i.weight = n.weight + 'px'),
              (i.color = n.color),
              (i.opacity = n.opacity),
              n.dashArray ? (i.dashStyle = g(n.dashArray) ? n.dashArray.join(' ') : n.dashArray.replace(/( *, *)/g, ' ')) : (i.dashStyle = ''),
              (i.endcap = n.lineCap.replace('butt', 'flat')),
              (i.joinstyle = n.lineJoin))
            : i && (o.removeChild(i), (t._stroke = null)),
          n.fill
            ? ((e = e || (t._fill = cn('fill'))), o.appendChild(e), (e.color = n.fillColor || n.color), (e.opacity = n.fillOpacity))
            : e && (o.removeChild(e), (t._fill = null))
      },
      _updateCircle: function (t) {
        var i = t._point.round(),
          e = Math.round(t._radius),
          n = Math.round(t._radiusY || e)
        this._setPath(t, t._empty() ? 'M0 0' : 'AL ' + i.x + ',' + i.y + ' ' + e + ',' + n + ' 0,23592600')
      },
      _setPath: function (t, i) {
        t._path.v = i
      },
      _bringToFront: function (t) {
        hi(t._container)
      },
      _bringToBack: function (t) {
        ui(t._container)
      },
    },
    dn = Et ? cn : J,
    pn = hn.extend({
      getEvents: function () {
        var t = hn.prototype.getEvents.call(this)
        return (t.zoomstart = this._onZoomStart), t
      },
      _initContainer: function () {
        ;(this._container = dn('svg')),
          this._container.setAttribute('pointer-events', 'none'),
          (this._rootGroup = dn('g')),
          this._container.appendChild(this._rootGroup)
      },
      _destroyContainer: function () {
        ri(this._container), Si(this._container), delete this._container, delete this._rootGroup, delete this._svgSize
      },
      _onZoomStart: function () {
        this._update()
      },
      _update: function () {
        var t, i, e
        ;(this._map._animatingZoom && this._bounds) ||
          (hn.prototype._update.call(this),
          (i = (t = this._bounds).getSize()),
          (e = this._container),
          (this._svgSize && this._svgSize.equals(i)) || ((this._svgSize = i), e.setAttribute('width', i.x), e.setAttribute('height', i.y)),
          vi(e, t.min),
          e.setAttribute('viewBox', [t.min.x, t.min.y, i.x, i.y].join(' ')),
          this.fire('update'))
      },
      _initPath: function (t) {
        var i = (t._path = dn('path'))
        t.options.className && ci(i, t.options.className),
          t.options.interactive && ci(i, 'leaflet-interactive'),
          this._updateStyle(t),
          (this._layers[m(t)] = t)
      },
      _addPath: function (t) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path)
      },
      _removePath: function (t) {
        ri(t._path), t.removeInteractiveTarget(t._path), delete this._layers[m(t)]
      },
      _updatePath: function (t) {
        t._project(), t._update()
      },
      _updateStyle: function (t) {
        var i = t._path,
          e = t.options
        i &&
          (e.stroke
            ? (i.setAttribute('stroke', e.color),
              i.setAttribute('stroke-opacity', e.opacity),
              i.setAttribute('stroke-width', e.weight),
              i.setAttribute('stroke-linecap', e.lineCap),
              i.setAttribute('stroke-linejoin', e.lineJoin),
              e.dashArray ? i.setAttribute('stroke-dasharray', e.dashArray) : i.removeAttribute('stroke-dasharray'),
              e.dashOffset ? i.setAttribute('stroke-dashoffset', e.dashOffset) : i.removeAttribute('stroke-dashoffset'))
            : i.setAttribute('stroke', 'none'),
          e.fill
            ? (i.setAttribute('fill', e.fillColor || e.color),
              i.setAttribute('fill-opacity', e.fillOpacity),
              i.setAttribute('fill-rule', e.fillRule || 'evenodd'))
            : i.setAttribute('fill', 'none'))
      },
      _updatePoly: function (t, i) {
        this._setPath(t, $(t._parts, i))
      },
      _updateCircle: function (t) {
        var i = t._point,
          e = Math.max(Math.round(t._radius), 1),
          n = 'a' + e + ',' + (Math.max(Math.round(t._radiusY), 1) || e) + ' 0 1,0 ',
          o = t._empty() ? 'M0 0' : 'M' + (i.x - e) + ',' + i.y + n + 2 * e + ',0 ' + n + 2 * -e + ',0 '
        this._setPath(t, o)
      },
      _setPath: function (t, i) {
        t._path.setAttribute('d', i)
      },
      _bringToFront: function (t) {
        hi(t._path)
      },
      _bringToBack: function (t) {
        ui(t._path)
      },
    })
  function mn(t) {
    return Zt || Et ? new pn(t) : null
  }
  Et && pn.include(_n),
    Ki.include({
      getRenderer: function (t) {
        var i =
          (i = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer) ||
          (this._renderer = this._createRenderer())
        return this.hasLayer(i) || this.addLayer(i), i
      },
      _getPaneRenderer: function (t) {
        if ('overlayPane' === t || void 0 === t) return !1
        var i = this._paneRenderers[t]
        return void 0 === i && ((i = this._createRenderer({ pane: t })), (this._paneRenderers[t] = i)), i
      },
      _createRenderer: function (t) {
        return (this.options.preferCanvas && ln(t)) || mn(t)
      },
    })
  var fn = Re.extend({
    initialize: function (t, i) {
      Re.prototype.initialize.call(this, this._boundsToLatLngs(t), i)
    },
    setBounds: function (t) {
      return this.setLatLngs(this._boundsToLatLngs(t))
    },
    _boundsToLatLngs: function (t) {
      return [(t = N(t)).getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
    },
  })
  ;(pn.create = dn),
    (pn.pointsToPath = $),
    (Ne.geometryToLayer = De),
    (Ne.coordsToLatLng = We),
    (Ne.coordsToLatLngs = He),
    (Ne.latLngToCoords = Fe),
    (Ne.latLngsToCoords = Ue),
    (Ne.getFeature = Ve),
    (Ne.asFeature = qe),
    Ki.mergeOptions({ boxZoom: !0 })
  var gn = ie.extend({
    initialize: function (t) {
      ;(this._map = t),
        (this._container = t._container),
        (this._pane = t._panes.overlayPane),
        (this._resetStateTimeout = 0),
        t.on('unload', this._destroy, this)
    },
    addHooks: function () {
      zi(this._container, 'mousedown', this._onMouseDown, this)
    },
    removeHooks: function () {
      Si(this._container, 'mousedown', this._onMouseDown, this)
    },
    moved: function () {
      return this._moved
    },
    _destroy: function () {
      ri(this._pane), delete this._pane
    },
    _resetState: function () {
      ;(this._resetStateTimeout = 0), (this._moved = !1)
    },
    _clearDeferredResetState: function () {
      0 !== this._resetStateTimeout && (clearTimeout(this._resetStateTimeout), (this._resetStateTimeout = 0))
    },
    _onMouseDown: function (t) {
      if (!t.shiftKey || (1 !== t.which && 1 !== t.button)) return !1
      this._clearDeferredResetState(),
        this._resetState(),
        Xt(),
        xi(),
        (this._startPoint = this._map.mouseEventToContainerPoint(t)),
        zi(document, { contextmenu: Ni, mousemove: this._onMouseMove, mouseup: this._onMouseUp, keydown: this._onKeyDown }, this)
    },
    _onMouseMove: function (t) {
      this._moved ||
        ((this._moved = !0),
        (this._box = si('div', 'leaflet-zoom-box', this._container)),
        ci(this._container, 'leaflet-crosshair'),
        this._map.fire('boxzoomstart')),
        (this._point = this._map.mouseEventToContainerPoint(t))
      var i = new I(this._point, this._startPoint),
        e = i.getSize()
      vi(this._box, i.min), (this._box.style.width = e.x + 'px'), (this._box.style.height = e.y + 'px')
    },
    _finish: function () {
      this._moved && (ri(this._box), _i(this._container, 'leaflet-crosshair')),
        Jt(),
        wi(),
        Si(document, { contextmenu: Ni, mousemove: this._onMouseMove, mouseup: this._onMouseUp, keydown: this._onKeyDown }, this)
    },
    _onMouseUp: function (t) {
      var i
      ;(1 !== t.which && 1 !== t.button) ||
        (this._finish(),
        this._moved &&
          (this._clearDeferredResetState(),
          (this._resetStateTimeout = setTimeout(p(this._resetState, this), 0)),
          (i = new R(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point))),
          this._map.fitBounds(i).fire('boxzoomend', { boxZoomBounds: i })))
    },
    _onKeyDown: function (t) {
      27 === t.keyCode && this._finish()
    },
  })
  Ki.addInitHook('addHandler', 'boxZoom', gn), Ki.mergeOptions({ doubleClickZoom: !0 })
  var vn = ie.extend({
    addHooks: function () {
      this._map.on('dblclick', this._onDoubleClick, this)
    },
    removeHooks: function () {
      this._map.off('dblclick', this._onDoubleClick, this)
    },
    _onDoubleClick: function (t) {
      var i = this._map,
        e = i.getZoom(),
        n = i.options.zoomDelta,
        o = t.originalEvent.shiftKey ? e - n : e + n
      'center' === i.options.doubleClickZoom ? i.setZoom(o) : i.setZoomAround(t.containerPoint, o)
    },
  })
  Ki.addInitHook('addHandler', 'doubleClickZoom', vn),
    Ki.mergeOptions({
      dragging: !0,
      inertia: !st,
      inertiaDeceleration: 3400,
      inertiaMaxSpeed: 1 / 0,
      easeLinearity: 0.2,
      worldCopyJump: !1,
      maxBoundsViscosity: 0,
    })
  var yn = ie.extend({
    addHooks: function () {
      var t
      this._draggable ||
        ((t = this._map),
        (this._draggable = new ae(t._mapPane, t._container)),
        this._draggable.on({ dragstart: this._onDragStart, drag: this._onDrag, dragend: this._onDragEnd }, this),
        this._draggable.on('predrag', this._onPreDragLimit, this),
        t.options.worldCopyJump &&
          (this._draggable.on('predrag', this._onPreDragWrap, this), t.on('zoomend', this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this))),
        ci(this._map._container, 'leaflet-grab leaflet-touch-drag'),
        this._draggable.enable(),
        (this._positions = []),
        (this._times = [])
    },
    removeHooks: function () {
      _i(this._map._container, 'leaflet-grab'), _i(this._map._container, 'leaflet-touch-drag'), this._draggable.disable()
    },
    moved: function () {
      return this._draggable && this._draggable._moved
    },
    moving: function () {
      return this._draggable && this._draggable._moving
    },
    _onDragStart: function () {
      var t,
        i = this._map
      i._stop(),
        this._map.options.maxBounds && this._map.options.maxBoundsViscosity
          ? ((t = N(this._map.options.maxBounds)),
            (this._offsetLimit = O(
              this._map.latLngToContainerPoint(t.getNorthWest()).multiplyBy(-1),
              this._map.latLngToContainerPoint(t.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
            )),
            (this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))))
          : (this._offsetLimit = null),
        i.fire('movestart').fire('dragstart'),
        i.options.inertia && ((this._positions = []), (this._times = []))
    },
    _onDrag: function (t) {
      var i, e
      this._map.options.inertia &&
        ((i = this._lastTime = +new Date()),
        (e = this._lastPos = this._draggable._absPos || this._draggable._newPos),
        this._positions.push(e),
        this._times.push(i),
        this._prunePositions(i)),
        this._map.fire('move', t).fire('drag', t)
    },
    _prunePositions: function (t) {
      for (; 1 < this._positions.length && 50 < t - this._times[0]; ) this._positions.shift(), this._times.shift()
    },
    _onZoomEnd: function () {
      var t = this._map.getSize().divideBy(2),
        i = this._map.latLngToLayerPoint([0, 0])
      ;(this._initialWorldOffset = i.subtract(t).x), (this._worldWidth = this._map.getPixelWorldBounds().getSize().x)
    },
    _viscousLimit: function (t, i) {
      return t - (t - i) * this._viscosity
    },
    _onPreDragLimit: function () {
      var t, i
      this._viscosity &&
        this._offsetLimit &&
        ((t = this._draggable._newPos.subtract(this._draggable._startPos)),
        (i = this._offsetLimit),
        t.x < i.min.x && (t.x = this._viscousLimit(t.x, i.min.x)),
        t.y < i.min.y && (t.y = this._viscousLimit(t.y, i.min.y)),
        t.x > i.max.x && (t.x = this._viscousLimit(t.x, i.max.x)),
        t.y > i.max.y && (t.y = this._viscousLimit(t.y, i.max.y)),
        (this._draggable._newPos = this._draggable._startPos.add(t)))
    },
    _onPreDragWrap: function () {
      var t = this._worldWidth,
        i = Math.round(t / 2),
        e = this._initialWorldOffset,
        n = this._draggable._newPos.x,
        o = ((n - i + e) % t) + i - e,
        s = ((n + i + e) % t) - i - e,
        r = Math.abs(o + e) < Math.abs(s + e) ? o : s
      ;(this._draggable._absPos = this._draggable._newPos.clone()), (this._draggable._newPos.x = r)
    },
    _onDragEnd: function (t) {
      var i,
        e,
        n,
        o,
        s,
        r,
        a,
        h,
        u,
        l = this._map,
        c = l.options,
        _ = !c.inertia || this._times.length < 2
      l.fire('dragend', t),
        _
          ? l.fire('moveend')
          : (this._prunePositions(+new Date()),
            (i = this._lastPos.subtract(this._positions[0])),
            (e = (this._lastTime - this._times[0]) / 1e3),
            (n = c.easeLinearity),
            (s = (o = i.multiplyBy(n / e)).distanceTo([0, 0])),
            (r = Math.min(c.inertiaMaxSpeed, s)),
            (a = o.multiplyBy(r / s)),
            (h = r / (c.inertiaDeceleration * n)),
            (u = a.multiplyBy(-h / 2).round()).x || u.y
              ? ((u = l._limitOffset(u, l.options.maxBounds)),
                M(function () {
                  l.panBy(u, { duration: h, easeLinearity: n, noMoveStart: !0, animate: !0 })
                }))
              : l.fire('moveend'))
    },
  })
  Ki.addInitHook('addHandler', 'dragging', yn), Ki.mergeOptions({ keyboard: !0, keyboardPanDelta: 80 })
  var xn = ie.extend({
    keyCodes: { left: [37], right: [39], down: [40], up: [38], zoomIn: [187, 107, 61, 171], zoomOut: [189, 109, 54, 173] },
    initialize: function (t) {
      ;(this._map = t), this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta)
    },
    addHooks: function () {
      var t = this._map._container
      t.tabIndex <= 0 && (t.tabIndex = '0'),
        zi(t, { focus: this._onFocus, blur: this._onBlur, mousedown: this._onMouseDown }, this),
        this._map.on({ focus: this._addHooks, blur: this._removeHooks }, this)
    },
    removeHooks: function () {
      this._removeHooks(),
        Si(this._map._container, { focus: this._onFocus, blur: this._onBlur, mousedown: this._onMouseDown }, this),
        this._map.off({ focus: this._addHooks, blur: this._removeHooks }, this)
    },
    _onMouseDown: function () {
      var t, i, e, n
      this._focused ||
        ((t = document.body),
        (i = document.documentElement),
        (e = t.scrollTop || i.scrollTop),
        (n = t.scrollLeft || i.scrollLeft),
        this._map._container.focus(),
        window.scrollTo(n, e))
    },
    _onFocus: function () {
      ;(this._focused = !0), this._map.fire('focus')
    },
    _onBlur: function () {
      ;(this._focused = !1), this._map.fire('blur')
    },
    _setPanDelta: function (t) {
      for (var i = (this._panKeys = {}), e = this.keyCodes, n = 0, o = e.left.length; n < o; n++) i[e.left[n]] = [-1 * t, 0]
      for (n = 0, o = e.right.length; n < o; n++) i[e.right[n]] = [t, 0]
      for (n = 0, o = e.down.length; n < o; n++) i[e.down[n]] = [0, t]
      for (n = 0, o = e.up.length; n < o; n++) i[e.up[n]] = [0, -1 * t]
    },
    _setZoomDelta: function (t) {
      for (var i = (this._zoomKeys = {}), e = this.keyCodes, n = 0, o = e.zoomIn.length; n < o; n++) i[e.zoomIn[n]] = t
      for (n = 0, o = e.zoomOut.length; n < o; n++) i[e.zoomOut[n]] = -t
    },
    _addHooks: function () {
      zi(document, 'keydown', this._onKeyDown, this)
    },
    _removeHooks: function () {
      Si(document, 'keydown', this._onKeyDown, this)
    },
    _onKeyDown: function (t) {
      if (!(t.altKey || t.ctrlKey || t.metaKey)) {
        var i,
          e = t.keyCode,
          n = this._map
        if (e in this._panKeys)
          (n._panAnim && n._panAnim._inProgress) ||
            ((i = this._panKeys[e]),
            t.shiftKey && (i = A(i).multiplyBy(3)),
            n.panBy(i),
            n.options.maxBounds && n.panInsideBounds(n.options.maxBounds))
        else if (e in this._zoomKeys) n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e])
        else {
          if (27 !== e || !n._popup || !n._popup.options.closeOnEscapeKey) return
          n.closePopup()
        }
        Ni(t)
      }
    },
  })
  Ki.addInitHook('addHandler', 'keyboard', xn), Ki.mergeOptions({ scrollWheelZoom: !0, wheelDebounceTime: 40, wheelPxPerZoomLevel: 60 })
  var wn = ie.extend({
    addHooks: function () {
      zi(this._map._container, 'wheel', this._onWheelScroll, this), (this._delta = 0)
    },
    removeHooks: function () {
      Si(this._map._container, 'wheel', this._onWheelScroll, this)
    },
    _onWheelScroll: function (t) {
      var i = Wi(t),
        e = this._map.options.wheelDebounceTime
      ;(this._delta += i), (this._lastMousePos = this._map.mouseEventToContainerPoint(t)), this._startTime || (this._startTime = +new Date())
      var n = Math.max(e - (new Date() - this._startTime), 0)
      clearTimeout(this._timer), (this._timer = setTimeout(p(this._performZoom, this), n)), Ni(t)
    },
    _performZoom: function () {
      var t = this._map,
        i = t.getZoom(),
        e = this._map.options.zoomSnap || 0
      t._stop()
      var n = this._delta / (4 * this._map.options.wheelPxPerZoomLevel),
        o = (4 * Math.log(2 / (1 + Math.exp(-Math.abs(n))))) / Math.LN2,
        s = e ? Math.ceil(o / e) * e : o,
        r = t._limitZoom(i + (0 < this._delta ? s : -s)) - i
      ;(this._delta = 0),
        (this._startTime = null),
        r && ('center' === t.options.scrollWheelZoom ? t.setZoom(i + r) : t.setZoomAround(this._lastMousePos, i + r))
    },
  })
  Ki.addInitHook('addHandler', 'scrollWheelZoom', wn), Ki.mergeOptions({ tap: !0, tapTolerance: 15 })
  var Pn = ie.extend({
    addHooks: function () {
      zi(this._map._container, 'touchstart', this._onDown, this)
    },
    removeHooks: function () {
      Si(this._map._container, 'touchstart', this._onDown, this)
    },
    _onDown: function (t) {
      if (t.touches) {
        if ((Ri(t), (this._fireClick = !0), 1 < t.touches.length)) return (this._fireClick = !1), void clearTimeout(this._holdTimeout)
        var i = t.touches[0],
          e = i.target
        ;(this._startPos = this._newPos = new k(i.clientX, i.clientY)),
          e.tagName && 'a' === e.tagName.toLowerCase() && ci(e, 'leaflet-active'),
          (this._holdTimeout = setTimeout(
            p(function () {
              this._isTapValid() && ((this._fireClick = !1), this._onUp(), this._simulateEvent('contextmenu', i))
            }, this),
            1e3
          )),
          this._simulateEvent('mousedown', i),
          zi(document, { touchmove: this._onMove, touchend: this._onUp }, this)
      }
    },
    _onUp: function (t) {
      var i, e
      clearTimeout(this._holdTimeout),
        Si(document, { touchmove: this._onMove, touchend: this._onUp }, this),
        this._fireClick &&
          t &&
          t.changedTouches &&
          ((e = (i = t.changedTouches[0]).target) && e.tagName && 'a' === e.tagName.toLowerCase() && _i(e, 'leaflet-active'),
          this._simulateEvent('mouseup', i),
          this._isTapValid() && this._simulateEvent('click', i))
    },
    _isTapValid: function () {
      return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
    },
    _onMove: function (t) {
      var i = t.touches[0]
      ;(this._newPos = new k(i.clientX, i.clientY)), this._simulateEvent('mousemove', i)
    },
    _simulateEvent: function (t, i) {
      var e = document.createEvent('MouseEvents')
      ;(e._simulated = !0),
        (i.target._simulatedClick = !0),
        e.initMouseEvent(t, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null),
        i.target.dispatchEvent(e)
    },
  })
  !bt || (Lt && !ct) || Ki.addInitHook('addHandler', 'tap', Pn), Ki.mergeOptions({ touchZoom: bt && !st, bounceAtZoomLimits: !0 })
  var Ln = ie.extend({
    addHooks: function () {
      ci(this._map._container, 'leaflet-touch-zoom'), zi(this._map._container, 'touchstart', this._onTouchStart, this)
    },
    removeHooks: function () {
      _i(this._map._container, 'leaflet-touch-zoom'), Si(this._map._container, 'touchstart', this._onTouchStart, this)
    },
    _onTouchStart: function (t) {
      var i,
        e,
        n = this._map
      !t.touches ||
        2 !== t.touches.length ||
        n._animatingZoom ||
        this._zooming ||
        ((i = n.mouseEventToContainerPoint(t.touches[0])),
        (e = n.mouseEventToContainerPoint(t.touches[1])),
        (this._centerPoint = n.getSize()._divideBy(2)),
        (this._startLatLng = n.containerPointToLatLng(this._centerPoint)),
        'center' !== n.options.touchZoom && (this._pinchStartLatLng = n.containerPointToLatLng(i.add(e)._divideBy(2))),
        (this._startDist = i.distanceTo(e)),
        (this._startZoom = n.getZoom()),
        (this._moved = !1),
        (this._zooming = !0),
        n._stop(),
        zi(document, 'touchmove', this._onTouchMove, this),
        zi(document, 'touchend', this._onTouchEnd, this),
        Ri(t))
    },
    _onTouchMove: function (t) {
      if (t.touches && 2 === t.touches.length && this._zooming) {
        var i = this._map,
          e = i.mouseEventToContainerPoint(t.touches[0]),
          n = i.mouseEventToContainerPoint(t.touches[1]),
          o = e.distanceTo(n) / this._startDist
        if (
          ((this._zoom = i.getScaleZoom(o, this._startZoom)),
          !i.options.bounceAtZoomLimits &&
            ((this._zoom < i.getMinZoom() && o < 1) || (this._zoom > i.getMaxZoom() && 1 < o)) &&
            (this._zoom = i._limitZoom(this._zoom)),
          'center' === i.options.touchZoom)
        ) {
          if (((this._center = this._startLatLng), 1 == o)) return
        } else {
          var s = e._add(n)._divideBy(2)._subtract(this._centerPoint)
          if (1 == o && 0 === s.x && 0 === s.y) return
          this._center = i.unproject(i.project(this._pinchStartLatLng, this._zoom).subtract(s), this._zoom)
        }
        this._moved || (i._moveStart(!0, !1), (this._moved = !0)), z(this._animRequest)
        var r = p(i._move, i, this._center, this._zoom, { pinch: !0, round: !1 })
        ;(this._animRequest = M(r, this, !0)), Ri(t)
      }
    },
    _onTouchEnd: function () {
      this._moved && this._zooming
        ? ((this._zooming = !1),
          z(this._animRequest),
          Si(document, 'touchmove', this._onTouchMove, this),
          Si(document, 'touchend', this._onTouchEnd, this),
          this._map.options.zoomAnimation
            ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap)
            : this._map._resetView(this._center, this._map._limitZoom(this._zoom)))
        : (this._zooming = !1)
    },
  })
  Ki.addInitHook('addHandler', 'touchZoom', Ln),
    (Ki.BoxZoom = gn),
    (Ki.DoubleClickZoom = vn),
    (Ki.Drag = yn),
    (Ki.Keyboard = xn),
    (Ki.ScrollWheelZoom = wn),
    (Ki.Tap = Pn),
    (Ki.TouchZoom = Ln),
    (t.version = '1.7.1'),
    (t.Control = Xi),
    (t.control = Yi),
    (t.Browser = Bt),
    (t.Evented = E),
    (t.Mixin = ne),
    (t.Util = C),
    (t.Class = S),
    (t.Handler = ie),
    (t.extend = h),
    (t.bind = p),
    (t.stamp = m),
    (t.setOptions = c),
    (t.DomEvent = qi),
    (t.DomUtil = Mi),
    (t.PosAnimation = Gi),
    (t.Draggable = ae),
    (t.LineUtil = fe),
    (t.PolyUtil = ye),
    (t.Point = k),
    (t.point = A),
    (t.Bounds = I),
    (t.bounds = O),
    (t.Transformation = q),
    (t.transformation = G),
    (t.Projection = Pe),
    (t.LatLng = D),
    (t.latLng = j),
    (t.LatLngBounds = R),
    (t.latLngBounds = N),
    (t.CRS = H),
    (t.GeoJSON = Ne),
    (t.geoJSON = Ke),
    (t.geoJson = Ye),
    (t.Layer = Me),
    (t.LayerGroup = ze),
    (t.layerGroup = function (t, i) {
      return new ze(t, i)
    }),
    (t.FeatureGroup = Ce),
    (t.featureGroup = function (t, i) {
      return new Ce(t, i)
    }),
    (t.ImageOverlay = Xe),
    (t.imageOverlay = function (t, i, e) {
      return new Xe(t, i, e)
    }),
    (t.VideoOverlay = Je),
    (t.videoOverlay = function (t, i, e) {
      return new Je(t, i, e)
    }),
    (t.SVGOverlay = $e),
    (t.svgOverlay = function (t, i, e) {
      return new $e(t, i, e)
    }),
    (t.DivOverlay = Qe),
    (t.Popup = tn),
    (t.popup = function (t, i) {
      return new tn(t, i)
    }),
    (t.Tooltip = en),
    (t.tooltip = function (t, i) {
      return new en(t, i)
    }),
    (t.Icon = Se),
    (t.icon = function (t) {
      return new Se(t)
    }),
    (t.DivIcon = nn),
    (t.divIcon = function (t) {
      return new nn(t)
    }),
    (t.Marker = ke),
    (t.marker = function (t, i) {
      return new ke(t, i)
    }),
    (t.TileLayer = sn),
    (t.tileLayer = rn),
    (t.GridLayer = on),
    (t.gridLayer = function (t) {
      return new on(t)
    }),
    (t.SVG = pn),
    (t.svg = mn),
    (t.Renderer = hn),
    (t.Canvas = un),
    (t.canvas = ln),
    (t.Path = Be),
    (t.CircleMarker = Ae),
    (t.circleMarker = function (t, i) {
      return new Ae(t, i)
    }),
    (t.Circle = Ie),
    (t.circle = function (t, i, e) {
      return new Ie(t, i, e)
    }),
    (t.Polyline = Oe),
    (t.polyline = function (t, i) {
      return new Oe(t, i)
    }),
    (t.Polygon = Re),
    (t.polygon = function (t, i) {
      return new Re(t, i)
    }),
    (t.Rectangle = fn),
    (t.rectangle = function (t, i) {
      return new fn(t, i)
    }),
    (t.Map = Ki),
    (t.map = function (t, i) {
      return new Ki(t, i)
    })
  var bn = window.L
  ;(t.noConflict = function () {
    return (window.L = bn), this
  }),
    (window.L = t)
})

/*
 Leaflet.draw 0.4.14, a plugin that adds drawing and editing tools to Leaflet powered maps.
 (c) 2012-2017, Jacob Toye, Jon West, Smartrak, Leaflet

 https://github.com/Leaflet/Leaflet.draw
 http://leafletjs.com
 */
!(function (t, e, i) {
  function o(t, e) {
    for (; (t = t.parentElement) && !t.classList.contains(e); );
    return t
  }
  ;(L.drawVersion = '0.4.14'),
    (L.Draw = {}),
    (L.drawLocal = {
      draw: {
        toolbar: {
          actions: { title: 'Cancel drawing', text: 'Cancel' },
          finish: { title: 'Finish drawing', text: 'Finish' },
          undo: { title: 'Delete last point drawn', text: 'Delete last point' },
          buttons: {
            polyline: 'Draw a polyline',
            polygon: 'Draw a polygon',
            rectangle: 'Draw a rectangle',
            circle: 'Draw a circle',
            marker: 'Draw a marker',
            circlemarker: 'Draw a circlemarker',
          },
        },
        handlers: {
          circle: { tooltip: { start: 'Click and drag to draw circle.' }, radius: 'Radius' },
          circlemarker: { tooltip: { start: 'Click map to place circle marker.' } },
          marker: { tooltip: { start: 'Click map to place marker.' } },
          polygon: {
            tooltip: {
              start: 'Click to start drawing shape.',
              cont: 'Click to continue drawing shape.',
              end: 'Click first point to close this shape.',
            },
          },
          polyline: {
            error: '<strong>Error:</strong> shape edges cannot cross!',
            tooltip: { start: 'Click to start drawing line.', cont: 'Click to continue drawing line.', end: 'Click last point to finish line.' },
          },
          rectangle: { tooltip: { start: 'Click and drag to draw rectangle.' } },
          simpleshape: { tooltip: { end: 'Release mouse to finish drawing.' } },
        },
      },
      edit: {
        toolbar: {
          actions: {
            save: { title: 'Save changes', text: 'Save' },
            cancel: { title: 'Cancel editing, discards all changes', text: 'Cancel' },
            clearAll: { title: 'Clear all layers', text: 'Clear All' },
          },
          buttons: { edit: 'Edit layers', editDisabled: 'No layers to edit', remove: 'Delete layers', removeDisabled: 'No layers to delete' },
        },
        handlers: {
          edit: { tooltip: { text: 'Drag handles or markers to edit features.', subtext: 'Click cancel to undo changes.' } },
          remove: { tooltip: { text: 'Click on a feature to remove.' } },
        },
      },
    }),
    (L.Draw.Event = {}),
    (L.Draw.Event.CREATED = 'draw:created'),
    (L.Draw.Event.EDITED = 'draw:edited'),
    (L.Draw.Event.DELETED = 'draw:deleted'),
    (L.Draw.Event.DRAWSTART = 'draw:drawstart'),
    (L.Draw.Event.DRAWSTOP = 'draw:drawstop'),
    (L.Draw.Event.DRAWVERTEX = 'draw:drawvertex'),
    (L.Draw.Event.EDITSTART = 'draw:editstart'),
    (L.Draw.Event.EDITMOVE = 'draw:editmove'),
    (L.Draw.Event.EDITRESIZE = 'draw:editresize'),
    (L.Draw.Event.EDITVERTEX = 'draw:editvertex'),
    (L.Draw.Event.EDITSTOP = 'draw:editstop'),
    (L.Draw.Event.DELETESTART = 'draw:deletestart'),
    (L.Draw.Event.DELETESTOP = 'draw:deletestop'),
    (L.Draw.Event.TOOLBAROPENED = 'draw:toolbaropened'),
    (L.Draw.Event.TOOLBARCLOSED = 'draw:toolbarclosed'),
    (L.Draw.Event.MARKERCONTEXT = 'draw:markercontext'),
    (L.Draw = L.Draw || {}),
    (L.Draw.Feature = L.Handler.extend({
      initialize: function (t, e) {
        ;(this._map = t),
          (this._container = t._container),
          (this._overlayPane = t._panes.overlayPane),
          (this._popupPane = t._panes.popupPane),
          e && e.shapeOptions && (e.shapeOptions = L.Util.extend({}, this.options.shapeOptions, e.shapeOptions)),
          L.setOptions(this, e)
        var i = L.version.split('.')
        1 === parseInt(i[0], 10) && parseInt(i[1], 10) >= 2 ? L.Draw.Feature.include(L.Evented.prototype) : L.Draw.Feature.include(L.Mixin.Events)
      },
      enable: function () {
        this._enabled ||
          (L.Handler.prototype.enable.call(this),
          this.fire('enabled', { handler: this.type }),
          this._map.fire(L.Draw.Event.DRAWSTART, { layerType: this.type }))
      },
      disable: function () {
        this._enabled &&
          (L.Handler.prototype.disable.call(this),
          this._map.fire(L.Draw.Event.DRAWSTOP, { layerType: this.type }),
          this.fire('disabled', { handler: this.type }))
      },
      addHooks: function () {
        var t = this._map
        t &&
          (L.DomUtil.disableTextSelection(),
          t.getContainer().focus(),
          (this._tooltip = new L.Draw.Tooltip(this._map)),
          L.DomEvent.on(this._container, 'keyup', this._cancelDrawing, this))
      },
      removeHooks: function () {
        this._map &&
          (L.DomUtil.enableTextSelection(),
          this._tooltip.dispose(),
          (this._tooltip = null),
          L.DomEvent.off(this._container, 'keyup', this._cancelDrawing, this))
      },
      setOptions: function (t) {
        L.setOptions(this, t)
      },
      _fireCreatedEvent: function (t) {
        this._map.fire(L.Draw.Event.CREATED, { layer: t, layerType: this.type })
      },
      _cancelDrawing: function (t) {
        27 === t.keyCode && (this._map.fire('draw:canceled', { layerType: this.type }), this.disable())
      },
    })),
    (L.Draw.Polyline = L.Draw.Feature.extend({
      statics: { TYPE: 'polyline' },
      Poly: L.Polyline,
      options: {
        allowIntersection: !0,
        repeatMode: !1,
        drawError: { color: '#b00b00', timeout: 2500 },
        icon: new L.DivIcon({ iconSize: new L.Point(8, 8), className: 'leaflet-div-icon leaflet-editing-icon' }),
        touchIcon: new L.DivIcon({ iconSize: new L.Point(20, 20), className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon' }),
        guidelineDistance: 20,
        maxGuideLineLength: 4e3,
        shapeOptions: { stroke: !0, color: '#3388ff', weight: 4, opacity: 0.5, fill: !1, clickable: !0 },
        metric: !0,
        feet: !0,
        nautic: !1,
        showLength: !0,
        zIndexOffset: 2e3,
        factor: 1,
        maxPoints: 0,
      },
      initialize: function (t, e) {
        L.Browser.touch && (this.options.icon = this.options.touchIcon),
          (this.options.drawError.message = L.drawLocal.draw.handlers.polyline.error),
          e && e.drawError && (e.drawError = L.Util.extend({}, this.options.drawError, e.drawError)),
          (this.type = L.Draw.Polyline.TYPE),
          L.Draw.Feature.prototype.initialize.call(this, t, e)
      },
      addHooks: function () {
        L.Draw.Feature.prototype.addHooks.call(this),
          this._map &&
            ((this._markers = []),
            (this._markerGroup = new L.LayerGroup()),
            this._map.addLayer(this._markerGroup),
            (this._poly = new L.Polyline([], this.options.shapeOptions)),
            this._tooltip.updateContent(this._getTooltipText()),
            this._mouseMarker ||
              (this._mouseMarker = L.marker(this._map.getCenter(), {
                icon: L.divIcon({ className: 'leaflet-mouse-marker', iconAnchor: [20, 20], iconSize: [40, 40] }),
                opacity: 0,
                zIndexOffset: this.options.zIndexOffset,
              })),
            this._mouseMarker
              .on('mouseout', this._onMouseOut, this)
              .on('mousemove', this._onMouseMove, this)
              .on('mousedown', this._onMouseDown, this)
              .on('mouseup', this._onMouseUp, this)
              .addTo(this._map),
            this._map
              .on('mouseup', this._onMouseUp, this)
              .on('mousemove', this._onMouseMove, this)
              .on('zoomlevelschange', this._onZoomEnd, this)
              .on('touchstart', this._onTouch, this)
              .on('zoomend', this._onZoomEnd, this))
      },
      removeHooks: function () {
        L.Draw.Feature.prototype.removeHooks.call(this),
          this._clearHideErrorTimeout(),
          this._cleanUpShape(),
          this._map.removeLayer(this._markerGroup),
          delete this._markerGroup,
          delete this._markers,
          this._map.removeLayer(this._poly),
          delete this._poly,
          this._mouseMarker
            .off('mousedown', this._onMouseDown, this)
            .off('mouseout', this._onMouseOut, this)
            .off('mouseup', this._onMouseUp, this)
            .off('mousemove', this._onMouseMove, this),
          this._map.removeLayer(this._mouseMarker),
          delete this._mouseMarker,
          this._clearGuides(),
          this._map
            .off('mouseup', this._onMouseUp, this)
            .off('mousemove', this._onMouseMove, this)
            .off('zoomlevelschange', this._onZoomEnd, this)
            .off('zoomend', this._onZoomEnd, this)
            .off('touchstart', this._onTouch, this)
            .off('click', this._onTouch, this)
      },
      deleteLastVertex: function () {
        if (!(this._markers.length <= 1)) {
          var t = this._markers.pop(),
            e = this._poly,
            i = e.getLatLngs(),
            o = i.splice(-1, 1)[0]
          this._poly.setLatLngs(i),
            this._markerGroup.removeLayer(t),
            e.getLatLngs().length < 2 && this._map.removeLayer(e),
            this._vertexChanged(o, !1)
        }
      },
      addVertex: function (t) {
        if (this._markers.length >= 2 && !this.options.allowIntersection && this._poly.newLatLngIntersects(t)) return void this._showErrorTooltip()
        this._errorShown && this._hideErrorTooltip(),
          this._markers.push(this._createMarker(t)),
          this._poly.addLatLng(t),
          2 === this._poly.getLatLngs().length && this._map.addLayer(this._poly),
          this._vertexChanged(t, !0)
      },
      completeShape: function () {
        this._markers.length <= 1 || (this._fireCreatedEvent(), this.disable(), this.options.repeatMode && this.enable())
      },
      _finishShape: function () {
        var t = this._poly._defaultShape ? this._poly._defaultShape() : this._poly.getLatLngs(),
          e = this._poly.newLatLngIntersects(t[t.length - 1])
        if ((!this.options.allowIntersection && e) || !this._shapeIsValid()) return void this._showErrorTooltip()
        this._fireCreatedEvent(), this.disable(), this.options.repeatMode && this.enable()
      },
      _shapeIsValid: function () {
        return !0
      },
      _onZoomEnd: function () {
        null !== this._markers && this._updateGuide()
      },
      _onMouseMove: function (t) {
        var e = this._map.mouseEventToLayerPoint(t.originalEvent),
          i = this._map.layerPointToLatLng(e)
        ;(this._currentLatLng = i),
          this._updateTooltip(i),
          this._updateGuide(e),
          this._mouseMarker.setLatLng(i),
          L.DomEvent.preventDefault(t.originalEvent)
      },
      _vertexChanged: function (t, e) {
        this._map.fire(L.Draw.Event.DRAWVERTEX, { layers: this._markerGroup }),
          this._updateFinishHandler(),
          this._updateRunningMeasure(t, e),
          this._clearGuides(),
          this._updateTooltip()
      },
      _onMouseDown: function (t) {
        if (!this._clickHandled && !this._touchHandled && !this._disableMarkers) {
          this._onMouseMove(t), (this._clickHandled = !0), this._disableNewMarkers()
          var e = t.originalEvent,
            i = e.clientX,
            o = e.clientY
          this._startPoint.call(this, i, o)
        }
      },
      _startPoint: function (t, e) {
        this._mouseDownOrigin = L.point(t, e)
      },
      _onMouseUp: function (t) {
        var e = t.originalEvent,
          i = e.clientX,
          o = e.clientY
        this._endPoint.call(this, i, o, t), (this._clickHandled = null)
      },
      _endPoint: function (e, i, o) {
        if (this._mouseDownOrigin) {
          var n = L.point(e, i).distanceTo(this._mouseDownOrigin),
            a = this._calculateFinishDistance(o.latlng)
          this.options.maxPoints > 1 && this.options.maxPoints == this._markers.length + 1
            ? (this.addVertex(o.latlng), this._finishShape())
            : a < 10 && L.Browser.touch
            ? this._finishShape()
            : Math.abs(n) < 9 * (t.devicePixelRatio || 1) && this.addVertex(o.latlng),
            this._enableNewMarkers()
        }
        this._mouseDownOrigin = null
      },
      _onTouch: function (t) {
        var e,
          i,
          o = t.originalEvent
        !o.touches ||
          !o.touches[0] ||
          this._clickHandled ||
          this._touchHandled ||
          this._disableMarkers ||
          ((e = o.touches[0].clientX),
          (i = o.touches[0].clientY),
          this._disableNewMarkers(),
          (this._touchHandled = !0),
          this._startPoint.call(this, e, i),
          this._endPoint.call(this, e, i, t),
          (this._touchHandled = null)),
          (this._clickHandled = null)
      },
      _onMouseOut: function () {
        this._tooltip && this._tooltip._onMouseOut.call(this._tooltip)
      },
      _calculateFinishDistance: function (t) {
        var e
        if (this._markers.length > 0) {
          var i
          if (this.type === L.Draw.Polyline.TYPE) i = this._markers[this._markers.length - 1]
          else {
            if (this.type !== L.Draw.Polygon.TYPE) return 1 / 0
            i = this._markers[0]
          }
          var o = this._map.latLngToContainerPoint(i.getLatLng()),
            n = new L.Marker(t, { icon: this.options.icon, zIndexOffset: 2 * this.options.zIndexOffset }),
            a = this._map.latLngToContainerPoint(n.getLatLng())
          e = o.distanceTo(a)
        } else e = 1 / 0
        return e
      },
      _updateFinishHandler: function () {
        var t = this._markers.length
        t > 1 && this._markers[t - 1].on('click', this._finishShape, this), t > 2 && this._markers[t - 2].off('click', this._finishShape, this)
      },
      _createMarker: function (t) {
        var e = new L.Marker(t, { icon: this.options.icon, zIndexOffset: 2 * this.options.zIndexOffset })
        return this._markerGroup.addLayer(e), e
      },
      _updateGuide: function (t) {
        var e = this._markers ? this._markers.length : 0
        e > 0 &&
          ((t = t || this._map.latLngToLayerPoint(this._currentLatLng)),
          this._clearGuides(),
          this._drawGuide(this._map.latLngToLayerPoint(this._markers[e - 1].getLatLng()), t))
      },
      _updateTooltip: function (t) {
        var e = this._getTooltipText()
        t && this._tooltip.updatePosition(t), this._errorShown || this._tooltip.updateContent(e)
      },
      _drawGuide: function (t, e) {
        var i,
          o,
          n,
          a = Math.floor(Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))),
          s = this.options.guidelineDistance,
          r = this.options.maxGuideLineLength,
          l = a > r ? a - r : s
        for (
          this._guidesContainer || (this._guidesContainer = L.DomUtil.create('div', 'leaflet-draw-guides', this._overlayPane));
          l < a;
          l += this.options.guidelineDistance
        )
          (i = l / a),
            (o = { x: Math.floor(t.x * (1 - i) + i * e.x), y: Math.floor(t.y * (1 - i) + i * e.y) }),
            (n = L.DomUtil.create('div', 'leaflet-draw-guide-dash', this._guidesContainer)),
            (n.style.backgroundColor = this._errorShown ? this.options.drawError.color : this.options.shapeOptions.color),
            L.DomUtil.setPosition(n, o)
      },
      _updateGuideColor: function (t) {
        if (this._guidesContainer)
          for (var e = 0, i = this._guidesContainer.childNodes.length; e < i; e++) this._guidesContainer.childNodes[e].style.backgroundColor = t
      },
      _clearGuides: function () {
        if (this._guidesContainer) for (; this._guidesContainer.firstChild; ) this._guidesContainer.removeChild(this._guidesContainer.firstChild)
      },
      _getTooltipText: function () {
        var t,
          e,
          i = this.options.showLength
        return (
          0 === this._markers.length
            ? (t = { text: L.drawLocal.draw.handlers.polyline.tooltip.start })
            : ((e = i ? this._getMeasurementString() : ''),
              (t =
                1 === this._markers.length
                  ? { text: L.drawLocal.draw.handlers.polyline.tooltip.cont, subtext: e }
                  : { text: L.drawLocal.draw.handlers.polyline.tooltip.end, subtext: e })),
          t
        )
      },
      _updateRunningMeasure: function (t, e) {
        var i,
          o,
          n = this._markers.length
        1 === this._markers.length
          ? (this._measurementRunningTotal = 0)
          : ((i = n - (e ? 2 : 1)),
            (o = L.GeometryUtil.isVersion07x()
              ? t.distanceTo(this._markers[i].getLatLng()) * (this.options.factor || 1)
              : this._map.distance(t, this._markers[i].getLatLng()) * (this.options.factor || 1)),
            (this._measurementRunningTotal += o * (e ? 1 : -1)))
      },
      _getMeasurementString: function () {
        var t,
          e = this._currentLatLng,
          i = this._markers[this._markers.length - 1].getLatLng()
        return (
          (t = L.GeometryUtil.isVersion07x()
            ? i && e && e.distanceTo
              ? this._measurementRunningTotal + e.distanceTo(i) * (this.options.factor || 1)
              : this._measurementRunningTotal || 0
            : i && e
            ? this._measurementRunningTotal + this._map.distance(e, i) * (this.options.factor || 1)
            : this._measurementRunningTotal || 0),
          L.GeometryUtil.readableDistance(t, this.options.metric, this.options.feet, this.options.nautic, this.options.precision)
        )
      },
      _showErrorTooltip: function () {
        ;(this._errorShown = !0),
          this._tooltip.showAsError().updateContent({ text: this.options.drawError.message }),
          this._updateGuideColor(this.options.drawError.color),
          this._poly.setStyle({ color: this.options.drawError.color }),
          this._clearHideErrorTimeout(),
          (this._hideErrorTimeout = setTimeout(L.Util.bind(this._hideErrorTooltip, this), this.options.drawError.timeout))
      },
      _hideErrorTooltip: function () {
        ;(this._errorShown = !1),
          this._clearHideErrorTimeout(),
          this._tooltip.removeError().updateContent(this._getTooltipText()),
          this._updateGuideColor(this.options.shapeOptions.color),
          this._poly.setStyle({ color: this.options.shapeOptions.color })
      },
      _clearHideErrorTimeout: function () {
        this._hideErrorTimeout && (clearTimeout(this._hideErrorTimeout), (this._hideErrorTimeout = null))
      },
      _disableNewMarkers: function () {
        this._disableMarkers = !0
      },
      _enableNewMarkers: function () {
        setTimeout(
          function () {
            this._disableMarkers = !1
          }.bind(this),
          50
        )
      },
      _cleanUpShape: function () {
        this._markers.length > 1 && this._markers[this._markers.length - 1].off('click', this._finishShape, this)
      },
      _fireCreatedEvent: function () {
        var t = new this.Poly(this._poly.getLatLngs(), this.options.shapeOptions)
        L.Draw.Feature.prototype._fireCreatedEvent.call(this, t)
      },
    })),
    (L.Draw.Polygon = L.Draw.Polyline.extend({
      statics: { TYPE: 'polygon' },
      Poly: L.Polygon,
      options: {
        showArea: !1,
        showLength: !1,
        shapeOptions: { stroke: !0, color: '#3388ff', weight: 4, opacity: 0.5, fill: !0, fillColor: null, fillOpacity: 0.2, clickable: !0 },
        metric: !0,
        feet: !0,
        nautic: !1,
        precision: {},
      },
      initialize: function (t, e) {
        L.Draw.Polyline.prototype.initialize.call(this, t, e), (this.type = L.Draw.Polygon.TYPE)
      },
      _updateFinishHandler: function () {
        var t = this._markers.length
        1 === t && this._markers[0].on('click', this._finishShape, this),
          t > 2 &&
            (this._markers[t - 1].on('dblclick', this._finishShape, this), t > 3 && this._markers[t - 2].off('dblclick', this._finishShape, this))
      },
      _getTooltipText: function () {
        var t, e
        return (
          0 === this._markers.length
            ? (t = L.drawLocal.draw.handlers.polygon.tooltip.start)
            : this._markers.length < 3
            ? ((t = L.drawLocal.draw.handlers.polygon.tooltip.cont), (e = this._getMeasurementString()))
            : ((t = L.drawLocal.draw.handlers.polygon.tooltip.end), (e = this._getMeasurementString())),
          { text: t, subtext: e }
        )
      },
      _getMeasurementString: function () {
        var t = this._area,
          e = ''
        return t || this.options.showLength
          ? (this.options.showLength && (e = L.Draw.Polyline.prototype._getMeasurementString.call(this)),
            t && (e += '<br>' + L.GeometryUtil.readableArea(t, this.options.metric, this.options.precision)),
            e)
          : null
      },
      _shapeIsValid: function () {
        return this._markers.length >= 3
      },
      _vertexChanged: function (t, e) {
        var i
        !this.options.allowIntersection && this.options.showArea && ((i = this._poly.getLatLngs()), (this._area = L.GeometryUtil.geodesicArea(i))),
          L.Draw.Polyline.prototype._vertexChanged.call(this, t, e)
      },
      _cleanUpShape: function () {
        var t = this._markers.length
        t > 0 && (this._markers[0].off('click', this._finishShape, this), t > 2 && this._markers[t - 1].off('dblclick', this._finishShape, this))
      },
    })),
    (L.SimpleShape = {}),
    (L.Draw.SimpleShape = L.Draw.Feature.extend({
      options: { repeatMode: !1 },
      initialize: function (t, e) {
        ;(this._endLabelText = L.drawLocal.draw.handlers.simpleshape.tooltip.end), L.Draw.Feature.prototype.initialize.call(this, t, e)
      },
      addHooks: function () {
        L.Draw.Feature.prototype.addHooks.call(this),
          this._map &&
            ((this._mapDraggable = this._map.dragging.enabled()),
            this._mapDraggable && this._map.dragging.disable(),
            (this._container.style.cursor = 'crosshair'),
            this._tooltip.updateContent({ text: this._initialLabelText }),
            this._map
              .on('mousedown', this._onMouseDown, this)
              .on('mousemove', this._onMouseMove, this)
              .on('touchstart', this._onMouseDown, this)
              .on('touchmove', this._onMouseMove, this),
            e.addEventListener('touchstart', L.DomEvent.preventDefault, { passive: !1 }))
      },
      removeHooks: function () {
        L.Draw.Feature.prototype.removeHooks.call(this),
          this._map &&
            (this._mapDraggable && this._map.dragging.enable(),
            (this._container.style.cursor = ''),
            this._map
              .off('mousedown', this._onMouseDown, this)
              .off('mousemove', this._onMouseMove, this)
              .off('touchstart', this._onMouseDown, this)
              .off('touchmove', this._onMouseMove, this),
            L.DomEvent.off(e, 'mouseup', this._onMouseUp, this),
            L.DomEvent.off(e, 'touchend', this._onMouseUp, this),
            e.removeEventListener('touchstart', L.DomEvent.preventDefault),
            this._shape && (this._map.removeLayer(this._shape), delete this._shape)),
          (this._isDrawing = !1)
      },
      _getTooltipText: function () {
        return { text: this._endLabelText }
      },
      _onMouseDown: function (t) {
        ;(this._isDrawing = !0),
          (this._startLatLng = t.latlng),
          L.DomEvent.on(e, 'mouseup', this._onMouseUp, this).on(e, 'touchend', this._onMouseUp, this).preventDefault(t.originalEvent)
      },
      _onMouseMove: function (t) {
        var e = t.latlng
        this._tooltip.updatePosition(e), this._isDrawing && (this._tooltip.updateContent(this._getTooltipText()), this._drawShape(e))
      },
      _onMouseUp: function () {
        this._shape && this._fireCreatedEvent(), this.disable(), this.options.repeatMode && this.enable()
      },
    })),
    (L.Draw.Rectangle = L.Draw.SimpleShape.extend({
      statics: { TYPE: 'rectangle' },
      options: {
        shapeOptions: {
          stroke: !0,
          color: '#3388ff',
          weight: 4,
          opacity: 0.5,
          fill: !0,
          fillColor: null,
          fillOpacity: 0.2,
          showArea: !0,
          clickable: !0,
        },
        metric: !0,
      },
      initialize: function (t, e) {
        ;(this.type = L.Draw.Rectangle.TYPE),
          (this._initialLabelText = L.drawLocal.draw.handlers.rectangle.tooltip.start),
          L.Draw.SimpleShape.prototype.initialize.call(this, t, e)
      },
      disable: function () {
        this._enabled && ((this._isCurrentlyTwoClickDrawing = !1), L.Draw.SimpleShape.prototype.disable.call(this))
      },
      _onMouseUp: function (t) {
        if (!this._shape && !this._isCurrentlyTwoClickDrawing) return void (this._isCurrentlyTwoClickDrawing = !0)
        ;(this._isCurrentlyTwoClickDrawing && !o(t.target, 'leaflet-pane')) || L.Draw.SimpleShape.prototype._onMouseUp.call(this)
      },
      _drawShape: function (t) {
        this._shape
          ? this._shape.setBounds(new L.LatLngBounds(this._startLatLng, t))
          : ((this._shape = new L.Rectangle(new L.LatLngBounds(this._startLatLng, t), this.options.shapeOptions)), this._map.addLayer(this._shape))
      },
      _fireCreatedEvent: function () {
        var t = new L.Rectangle(this._shape.getBounds(), this.options.shapeOptions)
        L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, t)
      },
      _getTooltipText: function () {
        var t,
          e,
          i,
          o = L.Draw.SimpleShape.prototype._getTooltipText.call(this),
          n = this._shape,
          a = this.options.showArea
        return (
          n &&
            ((t = this._shape._defaultShape ? this._shape._defaultShape() : this._shape.getLatLngs()),
            (e = L.GeometryUtil.geodesicArea(t)),
            (i = a ? L.GeometryUtil.readableArea(e, this.options.metric) : '')),
          { text: o.text, subtext: i }
        )
      },
    })),
    (L.Draw.Marker = L.Draw.Feature.extend({
      statics: { TYPE: 'marker' },
      options: { icon: new L.Icon.Default(), repeatMode: !1, zIndexOffset: 2e3 },
      initialize: function (t, e) {
        ;(this.type = L.Draw.Marker.TYPE),
          (this._initialLabelText = L.drawLocal.draw.handlers.marker.tooltip.start),
          L.Draw.Feature.prototype.initialize.call(this, t, e)
      },
      addHooks: function () {
        L.Draw.Feature.prototype.addHooks.call(this),
          this._map &&
            (this._tooltip.updateContent({ text: this._initialLabelText }),
            this._mouseMarker ||
              (this._mouseMarker = L.marker(this._map.getCenter(), {
                icon: L.divIcon({ className: 'leaflet-mouse-marker', iconAnchor: [20, 20], iconSize: [40, 40] }),
                opacity: 0,
                zIndexOffset: this.options.zIndexOffset,
              })),
            this._mouseMarker.on('click', this._onClick, this).addTo(this._map),
            this._map.on('mousemove', this._onMouseMove, this),
            this._map.on('click', this._onTouch, this))
      },
      removeHooks: function () {
        L.Draw.Feature.prototype.removeHooks.call(this),
          this._map &&
            (this._map.off('click', this._onClick, this).off('click', this._onTouch, this),
            this._marker && (this._marker.off('click', this._onClick, this), this._map.removeLayer(this._marker), delete this._marker),
            this._mouseMarker.off('click', this._onClick, this),
            this._map.removeLayer(this._mouseMarker),
            delete this._mouseMarker,
            this._map.off('mousemove', this._onMouseMove, this))
      },
      _onMouseMove: function (t) {
        var e = t.latlng
        this._tooltip.updatePosition(e),
          this._mouseMarker.setLatLng(e),
          this._marker
            ? ((e = this._mouseMarker.getLatLng()), this._marker.setLatLng(e))
            : ((this._marker = this._createMarker(e)),
              this._marker.on('click', this._onClick, this),
              this._map.on('click', this._onClick, this).addLayer(this._marker))
      },
      _createMarker: function (t) {
        return new L.Marker(t, { icon: this.options.icon, zIndexOffset: this.options.zIndexOffset })
      },
      _onClick: function () {
        this._fireCreatedEvent(), this.disable(), this.options.repeatMode && this.enable()
      },
      _onTouch: function (t) {
        this._onMouseMove(t), this._onClick()
      },
      _fireCreatedEvent: function () {
        var t = new L.Marker.Touch(this._marker.getLatLng(), { icon: this.options.icon })
        L.Draw.Feature.prototype._fireCreatedEvent.call(this, t)
      },
    })),
    (L.Draw.CircleMarker = L.Draw.Marker.extend({
      statics: { TYPE: 'circlemarker' },
      options: {
        stroke: !0,
        color: '#3388ff',
        weight: 4,
        opacity: 0.5,
        fill: !0,
        fillColor: null,
        fillOpacity: 0.2,
        clickable: !0,
        zIndexOffset: 2e3,
      },
      initialize: function (t, e) {
        ;(this.type = L.Draw.CircleMarker.TYPE),
          (this._initialLabelText = L.drawLocal.draw.handlers.circlemarker.tooltip.start),
          L.Draw.Feature.prototype.initialize.call(this, t, e)
      },
      _fireCreatedEvent: function () {
        var t = new L.CircleMarker(this._marker.getLatLng(), this.options)
        L.Draw.Feature.prototype._fireCreatedEvent.call(this, t)
      },
      _createMarker: function (t) {
        return new L.CircleMarker(t, this.options)
      },
    })),
    (L.Draw.Circle = L.Draw.SimpleShape.extend({
      statics: { TYPE: 'circle' },
      options: {
        shapeOptions: { stroke: !0, color: '#3388ff', weight: 4, opacity: 0.5, fill: !0, fillColor: null, fillOpacity: 0.2, clickable: !0 },
        showRadius: !0,
        metric: !0,
        feet: !0,
        nautic: !1,
      },
      initialize: function (t, e) {
        ;(this.type = L.Draw.Circle.TYPE),
          (this._initialLabelText = L.drawLocal.draw.handlers.circle.tooltip.start),
          L.Draw.SimpleShape.prototype.initialize.call(this, t, e)
      },
      _drawShape: function (t) {
        if (L.GeometryUtil.isVersion07x()) var e = this._startLatLng.distanceTo(t)
        else var e = this._map.distance(this._startLatLng, t)
        this._shape
          ? this._shape.setRadius(e)
          : ((this._shape = new L.Circle(this._startLatLng, e, this.options.shapeOptions)), this._map.addLayer(this._shape))
      },
      _fireCreatedEvent: function () {
        var t = new L.Circle(this._startLatLng, this._shape.getRadius(), this.options.shapeOptions)
        L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, t)
      },
      _onMouseMove: function (t) {
        var e,
          i = t.latlng,
          o = this.options.showRadius,
          n = this.options.metric
        if ((this._tooltip.updatePosition(i), this._isDrawing)) {
          this._drawShape(i), (e = this._shape.getRadius().toFixed(1))
          var a = ''
          o && (a = L.drawLocal.draw.handlers.circle.radius + ': ' + L.GeometryUtil.readableDistance(e, n, this.options.feet, this.options.nautic)),
            this._tooltip.updateContent({ text: this._endLabelText, subtext: a })
        }
      },
    })),
    (L.Edit = L.Edit || {}),
    (L.Edit.Marker = L.Handler.extend({
      initialize: function (t, e) {
        ;(this._marker = t), L.setOptions(this, e)
      },
      addHooks: function () {
        var t = this._marker
        t.dragging.enable(), t.on('dragend', this._onDragEnd, t), this._toggleMarkerHighlight()
      },
      removeHooks: function () {
        var t = this._marker
        t.dragging.disable(), t.off('dragend', this._onDragEnd, t), this._toggleMarkerHighlight()
      },
      _onDragEnd: function (t) {
        var e = t.target
        ;(e.edited = !0), this._map.fire(L.Draw.Event.EDITMOVE, { layer: e })
      },
      _toggleMarkerHighlight: function () {
        var t = this._marker._icon
        t &&
          ((t.style.display = 'none'),
          L.DomUtil.hasClass(t, 'leaflet-edit-marker-selected')
            ? (L.DomUtil.removeClass(t, 'leaflet-edit-marker-selected'), this._offsetMarker(t, -4))
            : (L.DomUtil.addClass(t, 'leaflet-edit-marker-selected'), this._offsetMarker(t, 4)),
          (t.style.display = ''))
      },
      _offsetMarker: function (t, e) {
        var i = parseInt(t.style.marginTop, 10) - e,
          o = parseInt(t.style.marginLeft, 10) - e
        ;(t.style.marginTop = i + 'px'), (t.style.marginLeft = o + 'px')
      },
    })),
    L.Marker.addInitHook(function () {
      L.Edit.Marker && ((this.editing = new L.Edit.Marker(this)), this.options.editable && this.editing.enable())
    }),
    (L.Edit = L.Edit || {}),
    (L.Edit.Poly = L.Handler.extend({
      initialize: function (t) {
        ;(this.latlngs = [t._latlngs]),
          t._holes && (this.latlngs = this.latlngs.concat(t._holes)),
          (this._poly = t),
          this._poly.on('revert-edited', this._updateLatLngs, this)
      },
      _defaultShape: function () {
        return L.Polyline._flat ? (L.Polyline._flat(this._poly._latlngs) ? this._poly._latlngs : this._poly._latlngs[0]) : this._poly._latlngs
      },
      _eachVertexHandler: function (t) {
        for (var e = 0; e < this._verticesHandlers.length; e++) t(this._verticesHandlers[e])
      },
      addHooks: function () {
        this._initHandlers(),
          this._eachVertexHandler(function (t) {
            t.addHooks()
          })
      },
      removeHooks: function () {
        this._eachVertexHandler(function (t) {
          t.removeHooks()
        })
      },
      updateMarkers: function () {
        this._eachVertexHandler(function (t) {
          t.updateMarkers()
        })
      },
      _initHandlers: function () {
        this._verticesHandlers = []
        for (var t = 0; t < this.latlngs.length; t++)
          this._verticesHandlers.push(new L.Edit.PolyVerticesEdit(this._poly, this.latlngs[t], this._poly.options.poly))
      },
      _updateLatLngs: function (t) {
        ;(this.latlngs = [t.layer._latlngs]), t.layer._holes && (this.latlngs = this.latlngs.concat(t.layer._holes))
      },
    })),
    (L.Edit.PolyVerticesEdit = L.Handler.extend({
      options: {
        icon: new L.DivIcon({ iconSize: new L.Point(8, 8), className: 'leaflet-div-icon leaflet-editing-icon' }),
        touchIcon: new L.DivIcon({ iconSize: new L.Point(20, 20), className: 'leaflet-div-icon leaflet-editing-icon leaflet-touch-icon' }),
        drawError: { color: '#b00b00', timeout: 1e3 },
      },
      initialize: function (t, e, i) {
        L.Browser.touch && (this.options.icon = this.options.touchIcon),
          (this._poly = t),
          i && i.drawError && (i.drawError = L.Util.extend({}, this.options.drawError, i.drawError)),
          (this._latlngs = e),
          L.setOptions(this, i)
      },
      _defaultShape: function () {
        return L.Polyline._flat ? (L.Polyline._flat(this._latlngs) ? this._latlngs : this._latlngs[0]) : this._latlngs
      },
      addHooks: function () {
        var t = this._poly,
          e = t._path
        t instanceof L.Polygon || ((t.options.fill = !1), t.options.editing && (t.options.editing.fill = !1)),
          e &&
            t.options.editing.className &&
            (t.options.original.className &&
              t.options.original.className.split(' ').forEach(function (t) {
                L.DomUtil.removeClass(e, t)
              }),
            t.options.editing.className.split(' ').forEach(function (t) {
              L.DomUtil.addClass(e, t)
            })),
          t.setStyle(t.options.editing),
          this._poly._map && ((this._map = this._poly._map), this._markerGroup || this._initMarkers(), this._poly._map.addLayer(this._markerGroup))
      },
      removeHooks: function () {
        var t = this._poly,
          e = t._path
        e &&
          t.options.editing.className &&
          (t.options.editing.className.split(' ').forEach(function (t) {
            L.DomUtil.removeClass(e, t)
          }),
          t.options.original.className &&
            t.options.original.className.split(' ').forEach(function (t) {
              L.DomUtil.addClass(e, t)
            })),
          t.setStyle(t.options.original),
          t._map && (t._map.removeLayer(this._markerGroup), delete this._markerGroup, delete this._markers)
      },
      updateMarkers: function () {
        this._markerGroup.clearLayers(), this._initMarkers()
      },
      _initMarkers: function () {
        this._markerGroup || (this._markerGroup = new L.LayerGroup()), (this._markers = [])
        var t,
          e,
          i,
          o,
          n = this._defaultShape()
        for (t = 0, i = n.length; t < i; t++)
          (o = this._createMarker(n[t], t)),
            o.on('click', this._onMarkerClick, this),
            o.on('contextmenu', this._onContextMenu, this),
            this._markers.push(o)
        var a, s
        for (t = 0, e = i - 1; t < i; e = t++)
          (0 !== t || (L.Polygon && this._poly instanceof L.Polygon)) &&
            ((a = this._markers[e]), (s = this._markers[t]), this._createMiddleMarker(a, s), this._updatePrevNext(a, s))
      },
      _createMarker: function (t, e) {
        var i = new L.Marker.Touch(t, { draggable: !0, icon: this.options.icon })
        return (
          (i._origLatLng = t),
          (i._index = e),
          i
            .on('dragstart', this._onMarkerDragStart, this)
            .on('drag', this._onMarkerDrag, this)
            .on('dragend', this._fireEdit, this)
            .on('touchmove', this._onTouchMove, this)
            .on('touchend', this._fireEdit, this)
            .on('MSPointerMove', this._onTouchMove, this)
            .on('MSPointerUp', this._fireEdit, this),
          this._markerGroup.addLayer(i),
          i
        )
      },
      _onMarkerDragStart: function () {
        this._poly.fire('editstart')
      },
      _spliceLatLngs: function () {
        var t = this._defaultShape(),
          e = [].splice.apply(t, arguments)
        return this._poly._convertLatLngs(t, !0), this._poly.redraw(), e
      },
      _removeMarker: function (t) {
        var e = t._index
        this._markerGroup.removeLayer(t),
          this._markers.splice(e, 1),
          this._spliceLatLngs(e, 1),
          this._updateIndexes(e, -1),
          t
            .off('dragstart', this._onMarkerDragStart, this)
            .off('drag', this._onMarkerDrag, this)
            .off('dragend', this._fireEdit, this)
            .off('touchmove', this._onMarkerDrag, this)
            .off('touchend', this._fireEdit, this)
            .off('click', this._onMarkerClick, this)
            .off('MSPointerMove', this._onTouchMove, this)
            .off('MSPointerUp', this._fireEdit, this)
      },
      _fireEdit: function () {
        ;(this._poly.edited = !0),
          this._poly.fire('edit'),
          this._poly._map.fire(L.Draw.Event.EDITVERTEX, { layers: this._markerGroup, poly: this._poly })
      },
      _onMarkerDrag: function (t) {
        var e = t.target,
          i = this._poly
        if (
          (L.extend(e._origLatLng, e._latlng),
          e._middleLeft && e._middleLeft.setLatLng(this._getMiddleLatLng(e._prev, e)),
          e._middleRight && e._middleRight.setLatLng(this._getMiddleLatLng(e, e._next)),
          i.options.poly)
        ) {
          var o = i._map._editTooltip
          if (!i.options.poly.allowIntersection && i.intersects()) {
            var n = i.options.color
            i.setStyle({ color: this.options.drawError.color }),
              0 !== L.version.indexOf('0.7') && e.dragging._draggable._onUp(t),
              this._onMarkerClick(t),
              o && o.updateContent({ text: L.drawLocal.draw.handlers.polyline.error }),
              setTimeout(function () {
                i.setStyle({ color: n }),
                  o && o.updateContent({ text: L.drawLocal.edit.handlers.edit.tooltip.text, subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext })
              }, 1e3)
          }
        }
        ;(this._poly._bounds._southWest = L.latLng(1 / 0, 1 / 0)), (this._poly._bounds._northEast = L.latLng(-1 / 0, -1 / 0))
        var a = this._poly.getLatLngs()
        this._poly._convertLatLngs(a, !0), this._poly.redraw(), this._poly.fire('editdrag')
      },
      _onMarkerClick: function (t) {
        var e = L.Polygon && this._poly instanceof L.Polygon ? 4 : 3,
          i = t.target
        this._defaultShape().length < e ||
          (this._removeMarker(i),
          this._updatePrevNext(i._prev, i._next),
          i._middleLeft && this._markerGroup.removeLayer(i._middleLeft),
          i._middleRight && this._markerGroup.removeLayer(i._middleRight),
          i._prev && i._next
            ? this._createMiddleMarker(i._prev, i._next)
            : i._prev
            ? i._next || (i._prev._middleRight = null)
            : (i._next._middleLeft = null),
          this._fireEdit())
      },
      _onContextMenu: function (t) {
        var e = t.target
        this._poly
        this._poly._map.fire(L.Draw.Event.MARKERCONTEXT, { marker: e, layers: this._markerGroup, poly: this._poly }), L.DomEvent.stopPropagation
      },
      _onTouchMove: function (t) {
        var e = this._map.mouseEventToLayerPoint(t.originalEvent.touches[0]),
          i = this._map.layerPointToLatLng(e),
          o = t.target
        L.extend(o._origLatLng, i),
          o._middleLeft && o._middleLeft.setLatLng(this._getMiddleLatLng(o._prev, o)),
          o._middleRight && o._middleRight.setLatLng(this._getMiddleLatLng(o, o._next)),
          this._poly.redraw(),
          this.updateMarkers()
      },
      _updateIndexes: function (t, e) {
        this._markerGroup.eachLayer(function (i) {
          i._index > t && (i._index += e)
        })
      },
      _createMiddleMarker: function (t, e) {
        var i,
          o,
          n,
          a = this._getMiddleLatLng(t, e),
          s = this._createMarker(a)
        s.setOpacity(0.6),
          (t._middleRight = e._middleLeft = s),
          (o = function () {
            s.off('touchmove', o, this)
            var n = e._index
            ;(s._index = n),
              s.off('click', i, this).on('click', this._onMarkerClick, this),
              (a.lat = s.getLatLng().lat),
              (a.lng = s.getLatLng().lng),
              this._spliceLatLngs(n, 0, a),
              this._markers.splice(n, 0, s),
              s.setOpacity(1),
              this._updateIndexes(n, 1),
              e._index++,
              this._updatePrevNext(t, s),
              this._updatePrevNext(s, e),
              this._poly.fire('editstart')
          }),
          (n = function () {
            s.off('dragstart', o, this),
              s.off('dragend', n, this),
              s.off('touchmove', o, this),
              this._createMiddleMarker(t, s),
              this._createMiddleMarker(s, e)
          }),
          (i = function () {
            o.call(this), n.call(this), this._fireEdit()
          }),
          s.on('click', i, this).on('dragstart', o, this).on('dragend', n, this).on('touchmove', o, this),
          this._markerGroup.addLayer(s)
      },
      _updatePrevNext: function (t, e) {
        t && (t._next = e), e && (e._prev = t)
      },
      _getMiddleLatLng: function (t, e) {
        var i = this._poly._map,
          o = i.project(t.getLatLng()),
          n = i.project(e.getLatLng())
        return i.unproject(o._add(n)._divideBy(2))
      },
    })),
    L.Polyline.addInitHook(function () {
      this.editing ||
        (L.Edit.Poly && ((this.editing = new L.Edit.Poly(this)), this.options.editable && this.editing.enable()),
        this.on('add', function () {
          this.editing && this.editing.enabled() && this.editing.addHooks()
        }),
        this.on('remove', function () {
          this.editing && this.editing.enabled() && this.editing.removeHooks()
        }))
    }),
    (L.Edit = L.Edit || {}),
    (L.Edit.SimpleShape = L.Handler.extend({
      options: {
        moveIcon: new L.DivIcon({ iconSize: new L.Point(8, 8), className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move' }),
        resizeIcon: new L.DivIcon({ iconSize: new L.Point(8, 8), className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize' }),
        touchMoveIcon: new L.DivIcon({
          iconSize: new L.Point(20, 20),
          className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move leaflet-touch-icon',
        }),
        touchResizeIcon: new L.DivIcon({
          iconSize: new L.Point(20, 20),
          className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-resize leaflet-touch-icon',
        }),
      },
      initialize: function (t, e) {
        L.Browser.touch && ((this.options.moveIcon = this.options.touchMoveIcon), (this.options.resizeIcon = this.options.touchResizeIcon)),
          (this._shape = t),
          L.Util.setOptions(this, e)
      },
      addHooks: function () {
        var t = this._shape
        this._shape._map &&
          ((this._map = this._shape._map),
          t.setStyle(t.options.editing),
          t._map && ((this._map = t._map), this._markerGroup || this._initMarkers(), this._map.addLayer(this._markerGroup)))
      },
      removeHooks: function () {
        var t = this._shape
        if ((t.setStyle(t.options.original), t._map)) {
          this._unbindMarker(this._moveMarker)
          for (var e = 0, i = this._resizeMarkers.length; e < i; e++) this._unbindMarker(this._resizeMarkers[e])
          ;(this._resizeMarkers = null), this._map.removeLayer(this._markerGroup), delete this._markerGroup
        }
        this._map = null
      },
      updateMarkers: function () {
        this._markerGroup.clearLayers(), this._initMarkers()
      },
      _initMarkers: function () {
        this._markerGroup || (this._markerGroup = new L.LayerGroup()), this._createMoveMarker(), this._createResizeMarker()
      },
      _createMoveMarker: function () {},
      _createResizeMarker: function () {},
      _createMarker: function (t, e) {
        var i = new L.Marker.Touch(t, { draggable: !0, icon: e, zIndexOffset: 10 })
        return this._bindMarker(i), this._markerGroup.addLayer(i), i
      },
      _bindMarker: function (t) {
        t.on('dragstart', this._onMarkerDragStart, this)
          .on('drag', this._onMarkerDrag, this)
          .on('dragend', this._onMarkerDragEnd, this)
          .on('touchstart', this._onTouchStart, this)
          .on('touchmove', this._onTouchMove, this)
          .on('MSPointerMove', this._onTouchMove, this)
          .on('touchend', this._onTouchEnd, this)
          .on('MSPointerUp', this._onTouchEnd, this)
      },
      _unbindMarker: function (t) {
        t.off('dragstart', this._onMarkerDragStart, this)
          .off('drag', this._onMarkerDrag, this)
          .off('dragend', this._onMarkerDragEnd, this)
          .off('touchstart', this._onTouchStart, this)
          .off('touchmove', this._onTouchMove, this)
          .off('MSPointerMove', this._onTouchMove, this)
          .off('touchend', this._onTouchEnd, this)
          .off('MSPointerUp', this._onTouchEnd, this)
      },
      _onMarkerDragStart: function (t) {
        t.target.setOpacity(0), this._shape.fire('editstart')
      },
      _fireEdit: function () {
        ;(this._shape.edited = !0), this._shape.fire('edit')
      },
      _onMarkerDrag: function (t) {
        var e = t.target,
          i = e.getLatLng()
        e === this._moveMarker ? this._move(i) : this._resize(i), this._shape.redraw(), this._shape.fire('editdrag')
      },
      _onMarkerDragEnd: function (t) {
        t.target.setOpacity(1), this._fireEdit()
      },
      _onTouchStart: function (t) {
        if ((L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, t), 'function' == typeof this._getCorners)) {
          var e = this._getCorners(),
            i = t.target,
            o = i._cornerIndex
          i.setOpacity(0), (this._oppositeCorner = e[(o + 2) % 4]), this._toggleCornerMarkers(0, o)
        }
        this._shape.fire('editstart')
      },
      _onTouchMove: function (t) {
        var e = this._map.mouseEventToLayerPoint(t.originalEvent.touches[0]),
          i = this._map.layerPointToLatLng(e)
        return t.target === this._moveMarker ? this._move(i) : this._resize(i), this._shape.redraw(), !1
      },
      _onTouchEnd: function (t) {
        t.target.setOpacity(1), this.updateMarkers(), this._fireEdit()
      },
      _move: function () {},
      _resize: function () {},
    })),
    (L.Edit = L.Edit || {}),
    (L.Edit.Rectangle = L.Edit.SimpleShape.extend({
      _createMoveMarker: function () {
        var t = this._shape.getBounds(),
          e = t.getCenter()
        this._moveMarker = this._createMarker(e, this.options.moveIcon)
      },
      _createResizeMarker: function () {
        var t = this._getCorners()
        this._resizeMarkers = []
        for (var e = 0, i = t.length; e < i; e++)
          this._resizeMarkers.push(this._createMarker(t[e], this.options.resizeIcon)), (this._resizeMarkers[e]._cornerIndex = e)
      },
      _onMarkerDragStart: function (t) {
        L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, t)
        var e = this._getCorners(),
          i = t.target,
          o = i._cornerIndex
        ;(this._oppositeCorner = e[(o + 2) % 4]), this._toggleCornerMarkers(0, o)
      },
      _onMarkerDragEnd: function (t) {
        var e,
          i,
          o = t.target
        o === this._moveMarker && ((e = this._shape.getBounds()), (i = e.getCenter()), o.setLatLng(i)),
          this._toggleCornerMarkers(1),
          this._repositionCornerMarkers(),
          L.Edit.SimpleShape.prototype._onMarkerDragEnd.call(this, t)
      },
      _move: function (t) {
        for (
          var e,
            i = this._shape._defaultShape ? this._shape._defaultShape() : this._shape.getLatLngs(),
            o = this._shape.getBounds(),
            n = o.getCenter(),
            a = [],
            s = 0,
            r = i.length;
          s < r;
          s++
        )
          (e = [i[s].lat - n.lat, i[s].lng - n.lng]), a.push([t.lat + e[0], t.lng + e[1]])
        this._shape.setLatLngs(a), this._repositionCornerMarkers(), this._map.fire(L.Draw.Event.EDITMOVE, { layer: this._shape })
      },
      _resize: function (t) {
        var e
        this._shape.setBounds(L.latLngBounds(t, this._oppositeCorner)),
          (e = this._shape.getBounds()),
          this._moveMarker.setLatLng(e.getCenter()),
          this._map.fire(L.Draw.Event.EDITRESIZE, { layer: this._shape })
      },
      _getCorners: function () {
        var t = this._shape.getBounds()
        return [t.getNorthWest(), t.getNorthEast(), t.getSouthEast(), t.getSouthWest()]
      },
      _toggleCornerMarkers: function (t) {
        for (var e = 0, i = this._resizeMarkers.length; e < i; e++) this._resizeMarkers[e].setOpacity(t)
      },
      _repositionCornerMarkers: function () {
        for (var t = this._getCorners(), e = 0, i = this._resizeMarkers.length; e < i; e++) this._resizeMarkers[e].setLatLng(t[e])
      },
    })),
    L.Rectangle.addInitHook(function () {
      L.Edit.Rectangle && ((this.editing = new L.Edit.Rectangle(this)), this.options.editable && this.editing.enable())
    }),
    (L.Edit = L.Edit || {}),
    (L.Edit.CircleMarker = L.Edit.SimpleShape.extend({
      _createMoveMarker: function () {
        var t = this._shape.getLatLng()
        this._moveMarker = this._createMarker(t, this.options.moveIcon)
      },
      _createResizeMarker: function () {
        this._resizeMarkers = []
      },
      _move: function (t) {
        if (this._resizeMarkers.length) {
          var e = this._getResizeMarkerPoint(t)
          this._resizeMarkers[0].setLatLng(e)
        }
        this._shape.setLatLng(t), this._map.fire(L.Draw.Event.EDITMOVE, { layer: this._shape })
      },
    })),
    L.CircleMarker.addInitHook(function () {
      L.Edit.CircleMarker && ((this.editing = new L.Edit.CircleMarker(this)), this.options.editable && this.editing.enable()),
        this.on('add', function () {
          this.editing && this.editing.enabled() && this.editing.addHooks()
        }),
        this.on('remove', function () {
          this.editing && this.editing.enabled() && this.editing.removeHooks()
        })
    }),
    (L.Edit = L.Edit || {}),
    (L.Edit.Circle = L.Edit.CircleMarker.extend({
      _createResizeMarker: function () {
        var t = this._shape.getLatLng(),
          e = this._getResizeMarkerPoint(t)
        ;(this._resizeMarkers = []), this._resizeMarkers.push(this._createMarker(e, this.options.resizeIcon))
      },
      _getResizeMarkerPoint: function (t) {
        var e = this._shape._radius * Math.cos(Math.PI / 4),
          i = this._map.project(t)
        return this._map.unproject([i.x + e, i.y - e])
      },
      _resize: function (t) {
        var e = this._moveMarker.getLatLng()
        L.GeometryUtil.isVersion07x() ? (radius = e.distanceTo(t)) : (radius = this._map.distance(e, t)),
          this._shape.setRadius(radius),
          this._map._editTooltip.updateContent({
            text: L.drawLocal.edit.handlers.edit.tooltip.subtext + '<br />' + L.drawLocal.edit.handlers.edit.tooltip.text,
            subtext:
              L.drawLocal.draw.handlers.circle.radius + ': ' + L.GeometryUtil.readableDistance(radius, !0, this.options.feet, this.options.nautic),
          }),
          this._shape.setRadius(radius),
          this._map.fire(L.Draw.Event.EDITRESIZE, { layer: this._shape })
      },
    })),
    L.Circle.addInitHook(function () {
      L.Edit.Circle && ((this.editing = new L.Edit.Circle(this)), this.options.editable && this.editing.enable()),
        this.on('add', function () {
          this.editing && this.editing.enabled() && this.editing.addHooks()
        }),
        this.on('remove', function () {
          this.editing && this.editing.enabled() && this.editing.removeHooks()
        })
    }),
    L.Map.mergeOptions({ touchExtend: !0 }),
    (L.Map.TouchExtend = L.Handler.extend({
      initialize: function (t) {
        ;(this._map = t), (this._container = t._container), (this._pane = t._panes.overlayPane)
      },
      addHooks: function () {
        L.DomEvent.on(this._container, 'touchstart', this._onTouchStart, this),
          L.DomEvent.on(this._container, 'touchend', this._onTouchEnd, this),
          L.DomEvent.on(this._container, 'touchmove', this._onTouchMove, this),
          this._detectIE()
            ? (L.DomEvent.on(this._container, 'MSPointerDown', this._onTouchStart, this),
              L.DomEvent.on(this._container, 'MSPointerUp', this._onTouchEnd, this),
              L.DomEvent.on(this._container, 'MSPointerMove', this._onTouchMove, this),
              L.DomEvent.on(this._container, 'MSPointerCancel', this._onTouchCancel, this))
            : (L.DomEvent.on(this._container, 'touchcancel', this._onTouchCancel, this),
              L.DomEvent.on(this._container, 'touchleave', this._onTouchLeave, this))
      },
      removeHooks: function () {
        L.DomEvent.off(this._container, 'touchstart', this._onTouchStart),
          L.DomEvent.off(this._container, 'touchend', this._onTouchEnd),
          L.DomEvent.off(this._container, 'touchmove', this._onTouchMove),
          this._detectIE()
            ? (L.DomEvent.off(this._container, 'MSPointerDowm', this._onTouchStart),
              L.DomEvent.off(this._container, 'MSPointerUp', this._onTouchEnd),
              L.DomEvent.off(this._container, 'MSPointerMove', this._onTouchMove),
              L.DomEvent.off(this._container, 'MSPointerCancel', this._onTouchCancel))
            : (L.DomEvent.off(this._container, 'touchcancel', this._onTouchCancel), L.DomEvent.off(this._container, 'touchleave', this._onTouchLeave))
      },
      _touchEvent: function (t, e) {
        var i = {}
        if (void 0 !== t.touches) {
          if (!t.touches.length) return
          i = t.touches[0]
        } else {
          if ('touch' !== t.pointerType) return
          if (((i = t), !this._filterClick(t))) return
        }
        var o = this._map.mouseEventToContainerPoint(i),
          n = this._map.mouseEventToLayerPoint(i),
          a = this._map.layerPointToLatLng(n)
        this._map.fire(e, { latlng: a, layerPoint: n, containerPoint: o, pageX: i.pageX, pageY: i.pageY, originalEvent: t })
      },
      _filterClick: function (t) {
        var e = t.timeStamp || t.originalEvent.timeStamp,
          i = L.DomEvent._lastClick && e - L.DomEvent._lastClick
        return (i && i > 100 && i < 500) || (t.target._simulatedClick && !t._simulated) ? (L.DomEvent.stop(t), !1) : ((L.DomEvent._lastClick = e), !0)
      },
      _onTouchStart: function (t) {
        if (this._map._loaded) {
          this._touchEvent(t, 'touchstart')
        }
      },
      _onTouchEnd: function (t) {
        if (this._map._loaded) {
          this._touchEvent(t, 'touchend')
        }
      },
      _onTouchCancel: function (t) {
        if (this._map._loaded) {
          var e = 'touchcancel'
          this._detectIE() && (e = 'pointercancel'), this._touchEvent(t, e)
        }
      },
      _onTouchLeave: function (t) {
        if (this._map._loaded) {
          this._touchEvent(t, 'touchleave')
        }
      },
      _onTouchMove: function (t) {
        if (this._map._loaded) {
          this._touchEvent(t, 'touchmove')
        }
      },
      _detectIE: function () {
        var e = t.navigator.userAgent,
          i = e.indexOf('MSIE ')
        if (i > 0) return parseInt(e.substring(i + 5, e.indexOf('.', i)), 10)
        if (e.indexOf('Trident/') > 0) {
          var o = e.indexOf('rv:')
          return parseInt(e.substring(o + 3, e.indexOf('.', o)), 10)
        }
        var n = e.indexOf('Edge/')
        return n > 0 && parseInt(e.substring(n + 5, e.indexOf('.', n)), 10)
      },
    })),
    L.Map.addInitHook('addHandler', 'touchExtend', L.Map.TouchExtend),
    (L.Marker.Touch = L.Marker.extend({
      _initInteraction: function () {
        return this.addInteractiveTarget ? L.Marker.prototype._initInteraction.apply(this) : this._initInteractionLegacy()
      },
      _initInteractionLegacy: function () {
        if (this.options.clickable) {
          var t = this._icon,
            e = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu', 'touchstart', 'touchend', 'touchmove']
          this._detectIE ? e.concat(['MSPointerDown', 'MSPointerUp', 'MSPointerMove', 'MSPointerCancel']) : e.concat(['touchcancel']),
            L.DomUtil.addClass(t, 'leaflet-clickable'),
            L.DomEvent.on(t, 'click', this._onMouseClick, this),
            L.DomEvent.on(t, 'keypress', this._onKeyPress, this)
          for (var i = 0; i < e.length; i++) L.DomEvent.on(t, e[i], this._fireMouseEvent, this)
          L.Handler.MarkerDrag && ((this.dragging = new L.Handler.MarkerDrag(this)), this.options.draggable && this.dragging.enable())
        }
      },
      _detectIE: function () {
        var e = t.navigator.userAgent,
          i = e.indexOf('MSIE ')
        if (i > 0) return parseInt(e.substring(i + 5, e.indexOf('.', i)), 10)
        if (e.indexOf('Trident/') > 0) {
          var o = e.indexOf('rv:')
          return parseInt(e.substring(o + 3, e.indexOf('.', o)), 10)
        }
        var n = e.indexOf('Edge/')
        return n > 0 && parseInt(e.substring(n + 5, e.indexOf('.', n)), 10)
      },
    })),
    (L.LatLngUtil = {
      cloneLatLngs: function (t) {
        for (var e = [], i = 0, o = t.length; i < o; i++)
          Array.isArray(t[i]) ? e.push(L.LatLngUtil.cloneLatLngs(t[i])) : e.push(this.cloneLatLng(t[i]))
        return e
      },
      cloneLatLng: function (t) {
        return L.latLng(t.lat, t.lng)
      },
    }),
    (function () {
      var t = { km: 2, ha: 2, m: 0, mi: 2, ac: 2, yd: 0, ft: 0, nm: 2 }
      L.GeometryUtil = L.extend(L.GeometryUtil || {}, {
        geodesicArea: function (t) {
          var e,
            i,
            o = t.length,
            n = 0,
            a = Math.PI / 180
          if (o > 2) {
            for (var s = 0; s < o; s++) (e = t[s]), (i = t[(s + 1) % o]), (n += (i.lng - e.lng) * a * (2 + Math.sin(e.lat * a) + Math.sin(i.lat * a)))
            n = (6378137 * n * 6378137) / 2
          }
          return Math.abs(n)
        },
        formattedNumber: function (t, e) {
          var i = parseFloat(t).toFixed(e),
            o = L.drawLocal.format && L.drawLocal.format.numeric,
            n = o && o.delimiters,
            a = n && n.thousands,
            s = n && n.decimal
          if (a || s) {
            var r = i.split('.')
            ;(i = a ? r[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + a) : r[0]), (s = s || '.'), r.length > 1 && (i = i + s + r[1])
          }
          return i
        },
        readableArea: function (e, i, o) {
          var n,
            a,
            o = L.Util.extend({}, t, o)
          return (
            i
              ? ((a = ['ha', 'm']),
                (type = typeof i),
                'string' === type ? (a = [i]) : 'boolean' !== type && (a = i),
                (n =
                  e >= 1e6 && -1 !== a.indexOf('km')
                    ? L.GeometryUtil.formattedNumber(1e-6 * e, o.km) + ' km²'
                    : e >= 1e4 && -1 !== a.indexOf('ha')
                    ? L.GeometryUtil.formattedNumber(1e-4 * e, o.ha) + ' ha'
                    : L.GeometryUtil.formattedNumber(e, o.m) + ' m²'))
              : ((e /= 0.836127),
                (n =
                  e >= 3097600
                    ? L.GeometryUtil.formattedNumber(e / 3097600, o.mi) + ' mi²'
                    : e >= 4840
                    ? L.GeometryUtil.formattedNumber(e / 4840, o.ac) + ' acres'
                    : L.GeometryUtil.formattedNumber(e, o.yd) + ' yd²')),
            n
          )
        },
        readableDistance: function (e, i, o, n, a) {
          var s,
            a = L.Util.extend({}, t, a)
          switch (i ? ('string' == typeof i ? i : 'metric') : o ? 'feet' : n ? 'nauticalMile' : 'yards') {
            case 'metric':
              s = e > 1e3 ? L.GeometryUtil.formattedNumber(e / 1e3, a.km) + ' km' : L.GeometryUtil.formattedNumber(e, a.m) + ' m'
              break
            case 'feet':
              ;(e *= 3.28083), (s = L.GeometryUtil.formattedNumber(e, a.ft) + ' ft')
              break
            case 'nauticalMile':
              ;(e *= 0.53996), (s = L.GeometryUtil.formattedNumber(e / 1e3, a.nm) + ' nm')
              break
            case 'yards':
            default:
              ;(e *= 1.09361),
                (s = e > 1760 ? L.GeometryUtil.formattedNumber(e / 1760, a.mi) + ' miles' : L.GeometryUtil.formattedNumber(e, a.yd) + ' yd')
          }
          return s
        },
        isVersion07x: function () {
          var t = L.version.split('.')
          return 0 === parseInt(t[0], 10) && 7 === parseInt(t[1], 10)
        },
      })
    })(),
    L.Util.extend(L.LineUtil, {
      segmentsIntersect: function (t, e, i, o) {
        return (
          this._checkCounterclockwise(t, i, o) !== this._checkCounterclockwise(e, i, o) &&
          this._checkCounterclockwise(t, e, i) !== this._checkCounterclockwise(t, e, o)
        )
      },
      _checkCounterclockwise: function (t, e, i) {
        return (i.y - t.y) * (e.x - t.x) > (e.y - t.y) * (i.x - t.x)
      },
    }),
    L.Polyline.include({
      intersects: function () {
        var t,
          e,
          i,
          o = this._getProjectedPoints(),
          n = o ? o.length : 0
        if (this._tooFewPointsForIntersection()) return !1
        for (t = n - 1; t >= 3; t--) if (((e = o[t - 1]), (i = o[t]), this._lineSegmentsIntersectsRange(e, i, t - 2))) return !0
        return !1
      },
      newLatLngIntersects: function (t, e) {
        return !!this._map && this.newPointIntersects(this._map.latLngToLayerPoint(t), e)
      },
      newPointIntersects: function (t, e) {
        var i = this._getProjectedPoints(),
          o = i ? i.length : 0,
          n = i ? i[o - 1] : null,
          a = o - 2
        return !this._tooFewPointsForIntersection(1) && this._lineSegmentsIntersectsRange(n, t, a, e ? 1 : 0)
      },
      _tooFewPointsForIntersection: function (t) {
        var e = this._getProjectedPoints(),
          i = e ? e.length : 0
        return (i += t || 0), !e || i <= 3
      },
      _lineSegmentsIntersectsRange: function (t, e, i, o) {
        var n,
          a,
          s = this._getProjectedPoints()
        o = o || 0
        for (var r = i; r > o; r--) if (((n = s[r - 1]), (a = s[r]), L.LineUtil.segmentsIntersect(t, e, n, a))) return !0
        return !1
      },
      _getProjectedPoints: function () {
        if (!this._defaultShape) return this._originalPoints
        for (var t = [], e = this._defaultShape(), i = 0; i < e.length; i++) t.push(this._map.latLngToLayerPoint(e[i]))
        return t
      },
    }),
    L.Polygon.include({
      intersects: function () {
        var t,
          e,
          i,
          o,
          n = this._getProjectedPoints()
        return (
          !this._tooFewPointsForIntersection() &&
          (!!L.Polyline.prototype.intersects.call(this) ||
            ((t = n.length), (e = n[0]), (i = n[t - 1]), (o = t - 2), this._lineSegmentsIntersectsRange(i, e, o, 1)))
        )
      },
    }),
    (L.Control.Draw = L.Control.extend({
      options: { position: 'topleft', draw: {}, edit: !1 },
      initialize: function (t) {
        if (L.version < '0.7')
          throw new Error('Leaflet.draw 0.2.3+ requires Leaflet 0.7.0+. Download latest from https://github.com/Leaflet/Leaflet/')
        L.Control.prototype.initialize.call(this, t)
        var e
        ;(this._toolbars = {}),
          L.DrawToolbar &&
            this.options.draw &&
            ((e = new L.DrawToolbar(this.options.draw)),
            (this._toolbars[L.DrawToolbar.TYPE] = e),
            this._toolbars[L.DrawToolbar.TYPE].on('enable', this._toolbarEnabled, this)),
          L.EditToolbar &&
            this.options.edit &&
            ((e = new L.EditToolbar(this.options.edit)),
            (this._toolbars[L.EditToolbar.TYPE] = e),
            this._toolbars[L.EditToolbar.TYPE].on('enable', this._toolbarEnabled, this)),
          (L.toolbar = this)
      },
      onAdd: function (t) {
        var e,
          i = L.DomUtil.create('div', 'leaflet-draw'),
          o = !1
        for (var n in this._toolbars)
          this._toolbars.hasOwnProperty(n) &&
            (e = this._toolbars[n].addToolbar(t)) &&
            (o || (L.DomUtil.hasClass(e, 'leaflet-draw-toolbar-top') || L.DomUtil.addClass(e.childNodes[0], 'leaflet-draw-toolbar-top'), (o = !0)),
            i.appendChild(e))
        return i
      },
      onRemove: function () {
        for (var t in this._toolbars) this._toolbars.hasOwnProperty(t) && this._toolbars[t].removeToolbar()
      },
      setDrawingOptions: function (t) {
        for (var e in this._toolbars) this._toolbars[e] instanceof L.DrawToolbar && this._toolbars[e].setOptions(t)
      },
      _toolbarEnabled: function (t) {
        var e = t.target
        for (var i in this._toolbars) this._toolbars[i] !== e && this._toolbars[i].disable()
      },
    })),
    L.Map.mergeOptions({ drawControlTooltips: !0, drawControl: !1 }),
    L.Map.addInitHook(function () {
      this.options.drawControl && ((this.drawControl = new L.Control.Draw()), this.addControl(this.drawControl))
    }),
    (L.Toolbar = L.Class.extend({
      initialize: function (t) {
        L.setOptions(this, t), (this._modes = {}), (this._actionButtons = []), (this._activeMode = null)
        var e = L.version.split('.')
        1 === parseInt(e[0], 10) && parseInt(e[1], 10) >= 2 ? L.Toolbar.include(L.Evented.prototype) : L.Toolbar.include(L.Mixin.Events)
      },
      enabled: function () {
        return null !== this._activeMode
      },
      disable: function () {
        this.enabled() && this._activeMode.handler.disable()
      },
      addToolbar: function (t) {
        var e,
          i = L.DomUtil.create('div', 'leaflet-draw-section'),
          o = 0,
          n = this._toolbarClass || '',
          a = this.getModeHandlers(t)
        for (this._toolbarContainer = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar'), this._map = t, e = 0; e < a.length; e++)
          a[e].enabled && this._initModeHandler(a[e].handler, this._toolbarContainer, o++, n, a[e].title)
        if (o)
          return (
            (this._lastButtonIndex = --o),
            (this._actionsContainer = L.DomUtil.create('ul', 'leaflet-draw-actions')),
            i.appendChild(this._toolbarContainer),
            i.appendChild(this._actionsContainer),
            i
          )
      },
      removeToolbar: function () {
        for (var t in this._modes)
          this._modes.hasOwnProperty(t) &&
            (this._disposeButton(this._modes[t].button, this._modes[t].handler.enable, this._modes[t].handler),
            this._modes[t].handler.disable(),
            this._modes[t].handler.off('enabled', this._handlerActivated, this).off('disabled', this._handlerDeactivated, this))
        this._modes = {}
        for (var e = 0, i = this._actionButtons.length; e < i; e++)
          this._disposeButton(this._actionButtons[e].button, this._actionButtons[e].callback, this)
        ;(this._actionButtons = []), (this._actionsContainer = null)
      },
      _initModeHandler: function (t, e, i, o, n) {
        var a = t.type
        ;(this._modes[a] = {}),
          (this._modes[a].handler = t),
          (this._modes[a].button = this._createButton({
            type: a,
            title: n,
            className: o + '-' + a,
            container: e,
            callback: this._modes[a].handler.enable,
            context: this._modes[a].handler,
          })),
          (this._modes[a].buttonIndex = i),
          this._modes[a].handler.on('enabled', this._handlerActivated, this).on('disabled', this._handlerDeactivated, this)
      },
      _detectIOS: function () {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !t.MSStream
      },
      _createButton: function (t) {
        var e = L.DomUtil.create('a', t.className || '', t.container),
          i = L.DomUtil.create('span', 'sr-only', t.container)
        ;(e.href = '#'),
          e.appendChild(i),
          t.title && ((e.title = t.title), (i.innerHTML = t.title)),
          t.text && ((e.innerHTML = t.text), (i.innerHTML = t.text))
        var o = this._detectIOS() ? 'touchstart' : 'click'
        return (
          L.DomEvent.on(e, 'click', L.DomEvent.stopPropagation)
            .on(e, 'mousedown', L.DomEvent.stopPropagation)
            .on(e, 'dblclick', L.DomEvent.stopPropagation)
            .on(e, 'touchstart', L.DomEvent.stopPropagation)
            .on(e, 'click', L.DomEvent.preventDefault)
            .on(e, o, t.callback, t.context),
          e
        )
      },
      _disposeButton: function (t, e) {
        var i = this._detectIOS() ? 'touchstart' : 'click'
        L.DomEvent.off(t, 'click', L.DomEvent.stopPropagation)
          .off(t, 'mousedown', L.DomEvent.stopPropagation)
          .off(t, 'dblclick', L.DomEvent.stopPropagation)
          .off(t, 'touchstart', L.DomEvent.stopPropagation)
          .off(t, 'click', L.DomEvent.preventDefault)
          .off(t, i, e)
      },
      _handlerActivated: function (t) {
        this.disable(),
          (this._activeMode = this._modes[t.handler]),
          L.DomUtil.addClass(this._activeMode.button, 'leaflet-draw-toolbar-button-enabled'),
          this._showActionsToolbar(),
          this.fire('enable')
      },
      _handlerDeactivated: function () {
        this._hideActionsToolbar(),
          L.DomUtil.removeClass(this._activeMode.button, 'leaflet-draw-toolbar-button-enabled'),
          (this._activeMode = null),
          this.fire('disable')
      },
      _createActions: function (t) {
        var e,
          i,
          o,
          n,
          a = this._actionsContainer,
          s = this.getActions(t),
          r = s.length
        for (i = 0, o = this._actionButtons.length; i < o; i++) this._disposeButton(this._actionButtons[i].button, this._actionButtons[i].callback)
        for (this._actionButtons = []; a.firstChild; ) a.removeChild(a.firstChild)
        for (var l = 0; l < r; l++)
          ('enabled' in s[l] && !s[l].enabled) ||
            ((e = L.DomUtil.create('li', '', a)),
            (n = this._createButton({ title: s[l].title, text: s[l].text, container: e, callback: s[l].callback, context: s[l].context })),
            this._actionButtons.push({ button: n, callback: s[l].callback }))
      },
      _showActionsToolbar: function () {
        var t = this._activeMode.buttonIndex,
          e = this._lastButtonIndex,
          i = this._activeMode.button.offsetTop - 1
        this._createActions(this._activeMode.handler),
          (this._actionsContainer.style.top = i + 'px'),
          0 === t &&
            (L.DomUtil.addClass(this._toolbarContainer, 'leaflet-draw-toolbar-notop'),
            L.DomUtil.addClass(this._actionsContainer, 'leaflet-draw-actions-top')),
          t === e &&
            (L.DomUtil.addClass(this._toolbarContainer, 'leaflet-draw-toolbar-nobottom'),
            L.DomUtil.addClass(this._actionsContainer, 'leaflet-draw-actions-bottom')),
          (this._actionsContainer.style.display = 'block'),
          this._map.fire(L.Draw.Event.TOOLBAROPENED)
      },
      _hideActionsToolbar: function () {
        ;(this._actionsContainer.style.display = 'none'),
          L.DomUtil.removeClass(this._toolbarContainer, 'leaflet-draw-toolbar-notop'),
          L.DomUtil.removeClass(this._toolbarContainer, 'leaflet-draw-toolbar-nobottom'),
          L.DomUtil.removeClass(this._actionsContainer, 'leaflet-draw-actions-top'),
          L.DomUtil.removeClass(this._actionsContainer, 'leaflet-draw-actions-bottom'),
          this._map.fire(L.Draw.Event.TOOLBARCLOSED)
      },
    })),
    (L.Draw = L.Draw || {}),
    (L.Draw.Tooltip = L.Class.extend({
      initialize: function (t) {
        ;(this._map = t),
          (this._popupPane = t._panes.popupPane),
          (this._visible = !1),
          (this._container = t.options.drawControlTooltips ? L.DomUtil.create('div', 'leaflet-draw-tooltip', this._popupPane) : null),
          (this._singleLineLabel = !1),
          this._map.on('mouseout', this._onMouseOut, this)
      },
      dispose: function () {
        this._map.off('mouseout', this._onMouseOut, this), this._container && (this._popupPane.removeChild(this._container), (this._container = null))
      },
      updateContent: function (t) {
        return this._container
          ? ((t.subtext = t.subtext || ''),
            0 !== t.subtext.length || this._singleLineLabel
              ? t.subtext.length > 0 &&
                this._singleLineLabel &&
                (L.DomUtil.removeClass(this._container, 'leaflet-draw-tooltip-single'), (this._singleLineLabel = !1))
              : (L.DomUtil.addClass(this._container, 'leaflet-draw-tooltip-single'), (this._singleLineLabel = !0)),
            (this._container.innerHTML =
              (t.subtext.length > 0 ? '<span class="leaflet-draw-tooltip-subtext">' + t.subtext + '</span><br />' : '') +
              '<span>' +
              t.text +
              '</span>'),
            t.text || t.subtext
              ? ((this._visible = !0), (this._container.style.visibility = 'inherit'))
              : ((this._visible = !1), (this._container.style.visibility = 'hidden')),
            this)
          : this
      },
      updatePosition: function (t) {
        var e = this._map.latLngToLayerPoint(t),
          i = this._container
        return this._container && (this._visible && (i.style.visibility = 'inherit'), L.DomUtil.setPosition(i, e)), this
      },
      showAsError: function () {
        return this._container && L.DomUtil.addClass(this._container, 'leaflet-error-draw-tooltip'), this
      },
      removeError: function () {
        return this._container && L.DomUtil.removeClass(this._container, 'leaflet-error-draw-tooltip'), this
      },
      _onMouseOut: function () {
        this._container && (this._container.style.visibility = 'hidden')
      },
    })),
    (L.DrawToolbar = L.Toolbar.extend({
      statics: { TYPE: 'draw' },
      options: { polyline: {}, polygon: {}, rectangle: {}, circle: {}, marker: {}, circlemarker: {} },
      initialize: function (t) {
        for (var e in this.options) this.options.hasOwnProperty(e) && t[e] && (t[e] = L.extend({}, this.options[e], t[e]))
        ;(this._toolbarClass = 'leaflet-draw-draw'), L.Toolbar.prototype.initialize.call(this, t)
      },
      getModeHandlers: function (t) {
        return [
          {
            enabled: this.options.polyline,
            handler: new L.Draw.Polyline(t, this.options.polyline),
            title: L.drawLocal.draw.toolbar.buttons.polyline,
          },
          { enabled: this.options.polygon, handler: new L.Draw.Polygon(t, this.options.polygon), title: L.drawLocal.draw.toolbar.buttons.polygon },
          {
            enabled: this.options.rectangle,
            handler: new L.Draw.Rectangle(t, this.options.rectangle),
            title: L.drawLocal.draw.toolbar.buttons.rectangle,
          },
          { enabled: this.options.circle, handler: new L.Draw.Circle(t, this.options.circle), title: L.drawLocal.draw.toolbar.buttons.circle },
          { enabled: this.options.marker, handler: new L.Draw.Marker(t, this.options.marker), title: L.drawLocal.draw.toolbar.buttons.marker },
          {
            enabled: this.options.circlemarker,
            handler: new L.Draw.CircleMarker(t, this.options.circlemarker),
            title: L.drawLocal.draw.toolbar.buttons.circlemarker,
          },
        ]
      },
      getActions: function (t) {
        return [
          {
            enabled: t.completeShape,
            title: L.drawLocal.draw.toolbar.finish.title,
            text: L.drawLocal.draw.toolbar.finish.text,
            callback: t.completeShape,
            context: t,
          },
          {
            enabled: t.deleteLastVertex,
            title: L.drawLocal.draw.toolbar.undo.title,
            text: L.drawLocal.draw.toolbar.undo.text,
            callback: t.deleteLastVertex,
            context: t,
          },
          { title: L.drawLocal.draw.toolbar.actions.title, text: L.drawLocal.draw.toolbar.actions.text, callback: this.disable, context: this },
        ]
      },
      setOptions: function (t) {
        L.setOptions(this, t)
        for (var e in this._modes) this._modes.hasOwnProperty(e) && t.hasOwnProperty(e) && this._modes[e].handler.setOptions(t[e])
      },
    })),
    (L.EditToolbar = L.Toolbar.extend({
      statics: { TYPE: 'edit' },
      options: {
        edit: { selectedPathOptions: { dashArray: '10, 10', fill: !0, fillColor: '#fe57a1', fillOpacity: 0.1, maintainColor: !1 } },
        remove: {},
        poly: null,
        featureGroup: null,
      },
      initialize: function (t) {
        t.edit &&
          (void 0 === t.edit.selectedPathOptions && (t.edit.selectedPathOptions = this.options.edit.selectedPathOptions),
          (t.edit.selectedPathOptions = L.extend({}, this.options.edit.selectedPathOptions, t.edit.selectedPathOptions))),
          t.remove && (t.remove = L.extend({}, this.options.remove, t.remove)),
          t.poly && (t.poly = L.extend({}, this.options.poly, t.poly)),
          (this._toolbarClass = 'leaflet-draw-edit'),
          L.Toolbar.prototype.initialize.call(this, t),
          (this._selectedFeatureCount = 0)
      },
      getModeHandlers: function (t) {
        var e = this.options.featureGroup
        return [
          {
            enabled: this.options.edit,
            handler: new L.EditToolbar.Edit(t, {
              featureGroup: e,
              selectedPathOptions: this.options.edit.selectedPathOptions,
              poly: this.options.poly,
            }),
            title: L.drawLocal.edit.toolbar.buttons.edit,
          },
          { enabled: this.options.remove, handler: new L.EditToolbar.Delete(t, { featureGroup: e }), title: L.drawLocal.edit.toolbar.buttons.remove },
        ]
      },
      getActions: function (t) {
        var e = [
          {
            title: L.drawLocal.edit.toolbar.actions.save.title,
            text: L.drawLocal.edit.toolbar.actions.save.text,
            callback: this._save,
            context: this,
          },
          {
            title: L.drawLocal.edit.toolbar.actions.cancel.title,
            text: L.drawLocal.edit.toolbar.actions.cancel.text,
            callback: this.disable,
            context: this,
          },
        ]
        return (
          t.removeAllLayers &&
            e.push({
              title: L.drawLocal.edit.toolbar.actions.clearAll.title,
              text: L.drawLocal.edit.toolbar.actions.clearAll.text,
              callback: this._clearAllLayers,
              context: this,
            }),
          e
        )
      },
      addToolbar: function (t) {
        var e = L.Toolbar.prototype.addToolbar.call(this, t)
        return this._checkDisabled(), this.options.featureGroup.on('layeradd layerremove', this._checkDisabled, this), e
      },
      removeToolbar: function () {
        this.options.featureGroup.off('layeradd layerremove', this._checkDisabled, this), L.Toolbar.prototype.removeToolbar.call(this)
      },
      disable: function () {
        this.enabled() && (this._activeMode.handler.revertLayers(), L.Toolbar.prototype.disable.call(this))
      },
      _save: function () {
        this._activeMode.handler.save(), this._activeMode && this._activeMode.handler.disable()
      },
      _clearAllLayers: function () {
        this._activeMode.handler.removeAllLayers(), this._activeMode && this._activeMode.handler.disable()
      },
      _checkDisabled: function () {
        var t,
          e = this.options.featureGroup,
          i = 0 !== e.getLayers().length
        this.options.edit &&
          ((t = this._modes[L.EditToolbar.Edit.TYPE].button),
          i ? L.DomUtil.removeClass(t, 'leaflet-disabled') : L.DomUtil.addClass(t, 'leaflet-disabled'),
          t.setAttribute('title', i ? L.drawLocal.edit.toolbar.buttons.edit : L.drawLocal.edit.toolbar.buttons.editDisabled)),
          this.options.remove &&
            ((t = this._modes[L.EditToolbar.Delete.TYPE].button),
            i ? L.DomUtil.removeClass(t, 'leaflet-disabled') : L.DomUtil.addClass(t, 'leaflet-disabled'),
            t.setAttribute('title', i ? L.drawLocal.edit.toolbar.buttons.remove : L.drawLocal.edit.toolbar.buttons.removeDisabled))
      },
    })),
    (L.EditToolbar.Edit = L.Handler.extend({
      statics: { TYPE: 'edit' },
      initialize: function (t, e) {
        if (
          (L.Handler.prototype.initialize.call(this, t),
          L.setOptions(this, e),
          (this._featureGroup = e.featureGroup),
          !(this._featureGroup instanceof L.FeatureGroup))
        )
          throw new Error('options.featureGroup must be a L.FeatureGroup')
        ;(this._uneditedLayerProps = {}), (this.type = L.EditToolbar.Edit.TYPE)
        var i = L.version.split('.')
        1 === parseInt(i[0], 10) && parseInt(i[1], 10) >= 2
          ? L.EditToolbar.Edit.include(L.Evented.prototype)
          : L.EditToolbar.Edit.include(L.Mixin.Events)
      },
      enable: function () {
        !this._enabled &&
          this._hasAvailableLayers() &&
          (this.fire('enabled', { handler: this.type }),
          this._map.fire(L.Draw.Event.EDITSTART, { handler: this.type }),
          L.Handler.prototype.enable.call(this),
          this._featureGroup.on('layeradd', this._enableLayerEdit, this).on('layerremove', this._disableLayerEdit, this))
      },
      disable: function () {
        this._enabled &&
          (this._featureGroup.off('layeradd', this._enableLayerEdit, this).off('layerremove', this._disableLayerEdit, this),
          L.Handler.prototype.disable.call(this),
          this._map.fire(L.Draw.Event.EDITSTOP, { handler: this.type }),
          this.fire('disabled', { handler: this.type }))
      },
      addHooks: function () {
        var t = this._map
        t &&
          (t.getContainer().focus(),
          this._featureGroup.eachLayer(this._enableLayerEdit, this),
          (this._tooltip = new L.Draw.Tooltip(this._map)),
          this._tooltip.updateContent({ text: L.drawLocal.edit.handlers.edit.tooltip.text, subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext }),
          (t._editTooltip = this._tooltip),
          this._updateTooltip(),
          this._map
            .on('mousemove', this._onMouseMove, this)
            .on('touchmove', this._onMouseMove, this)
            .on('MSPointerMove', this._onMouseMove, this)
            .on(L.Draw.Event.EDITVERTEX, this._updateTooltip, this))
      },
      removeHooks: function () {
        this._map &&
          (this._featureGroup.eachLayer(this._disableLayerEdit, this),
          (this._uneditedLayerProps = {}),
          this._tooltip.dispose(),
          (this._tooltip = null),
          this._map
            .off('mousemove', this._onMouseMove, this)
            .off('touchmove', this._onMouseMove, this)
            .off('MSPointerMove', this._onMouseMove, this)
            .off(L.Draw.Event.EDITVERTEX, this._updateTooltip, this))
      },
      revertLayers: function () {
        this._featureGroup.eachLayer(function (t) {
          this._revertLayer(t)
        }, this)
      },
      save: function () {
        var t = new L.LayerGroup()
        this._featureGroup.eachLayer(function (e) {
          e.edited && (t.addLayer(e), (e.edited = !1))
        }),
          this._map.fire(L.Draw.Event.EDITED, { layers: t })
      },
      _backupLayer: function (t) {
        var e = L.Util.stamp(t)
        this._uneditedLayerProps[e] ||
          (t instanceof L.Polyline || t instanceof L.Polygon || t instanceof L.Rectangle
            ? (this._uneditedLayerProps[e] = { latlngs: L.LatLngUtil.cloneLatLngs(t.getLatLngs()) })
            : t instanceof L.Circle
            ? (this._uneditedLayerProps[e] = { latlng: L.LatLngUtil.cloneLatLng(t.getLatLng()), radius: t.getRadius() })
            : (t instanceof L.Marker || t instanceof L.CircleMarker) &&
              (this._uneditedLayerProps[e] = { latlng: L.LatLngUtil.cloneLatLng(t.getLatLng()) }))
      },
      _getTooltipText: function () {
        return { text: L.drawLocal.edit.handlers.edit.tooltip.text, subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext }
      },
      _updateTooltip: function () {
        this._tooltip.updateContent(this._getTooltipText())
      },
      _revertLayer: function (t) {
        var e = L.Util.stamp(t)
        ;(t.edited = !1),
          this._uneditedLayerProps.hasOwnProperty(e) &&
            (t instanceof L.Polyline || t instanceof L.Polygon || t instanceof L.Rectangle
              ? t.setLatLngs(this._uneditedLayerProps[e].latlngs)
              : t instanceof L.Circle
              ? (t.setLatLng(this._uneditedLayerProps[e].latlng), t.setRadius(this._uneditedLayerProps[e].radius))
              : (t instanceof L.Marker || t instanceof L.CircleMarker) && t.setLatLng(this._uneditedLayerProps[e].latlng),
            t.fire('revert-edited', { layer: t }))
      },
      _enableLayerEdit: function (t) {
        var e,
          i,
          o = t.layer || t.target || t
        this._backupLayer(o),
          this.options.poly && ((i = L.Util.extend({}, this.options.poly)), (o.options.poly = i)),
          this.options.selectedPathOptions &&
            ((e = L.Util.extend({}, this.options.selectedPathOptions)),
            e.maintainColor && ((e.color = o.options.color), (e.fillColor = o.options.fillColor)),
            (o.options.original = L.extend({}, o.options)),
            (o.options.editing = e)),
          o instanceof L.Marker
            ? (o.editing && o.editing.enable(),
              o.dragging.enable(),
              o
                .on('dragend', this._onMarkerDragEnd)
                .on('touchmove', this._onTouchMove, this)
                .on('MSPointerMove', this._onTouchMove, this)
                .on('touchend', this._onMarkerDragEnd, this)
                .on('MSPointerUp', this._onMarkerDragEnd, this))
            : o.editing.enable()
      },
      _disableLayerEdit: function (t) {
        var e = t.layer || t.target || t
        ;(e.edited = !1),
          e.editing && e.editing.disable(),
          delete e.options.editing,
          delete e.options.original,
          this._selectedPathOptions &&
            (e instanceof L.Marker ? this._toggleMarkerHighlight(e) : (e.setStyle(e.options.previousOptions), delete e.options.previousOptions)),
          e instanceof L.Marker
            ? (e.dragging.disable(),
              e
                .off('dragend', this._onMarkerDragEnd, this)
                .off('touchmove', this._onTouchMove, this)
                .off('MSPointerMove', this._onTouchMove, this)
                .off('touchend', this._onMarkerDragEnd, this)
                .off('MSPointerUp', this._onMarkerDragEnd, this))
            : e.editing.disable()
      },
      _onMouseMove: function (t) {
        this._tooltip.updatePosition(t.latlng)
      },
      _onMarkerDragEnd: function (t) {
        var e = t.target
        ;(e.edited = !0), this._map.fire(L.Draw.Event.EDITMOVE, { layer: e })
      },
      _onTouchMove: function (t) {
        var e = t.originalEvent.changedTouches[0],
          i = this._map.mouseEventToLayerPoint(e),
          o = this._map.layerPointToLatLng(i)
        t.target.setLatLng(o)
      },
      _hasAvailableLayers: function () {
        return 0 !== this._featureGroup.getLayers().length
      },
    })),
    (L.EditToolbar.Delete = L.Handler.extend({
      statics: { TYPE: 'remove' },
      initialize: function (t, e) {
        if (
          (L.Handler.prototype.initialize.call(this, t),
          L.Util.setOptions(this, e),
          (this._deletableLayers = this.options.featureGroup),
          !(this._deletableLayers instanceof L.FeatureGroup))
        )
          throw new Error('options.featureGroup must be a L.FeatureGroup')
        this.type = L.EditToolbar.Delete.TYPE
        var i = L.version.split('.')
        1 === parseInt(i[0], 10) && parseInt(i[1], 10) >= 2
          ? L.EditToolbar.Delete.include(L.Evented.prototype)
          : L.EditToolbar.Delete.include(L.Mixin.Events)
      },
      enable: function () {
        !this._enabled &&
          this._hasAvailableLayers() &&
          (this.fire('enabled', { handler: this.type }),
          this._map.fire(L.Draw.Event.DELETESTART, { handler: this.type }),
          L.Handler.prototype.enable.call(this),
          this._deletableLayers.on('layeradd', this._enableLayerDelete, this).on('layerremove', this._disableLayerDelete, this))
      },
      disable: function () {
        this._enabled &&
          (this._deletableLayers.off('layeradd', this._enableLayerDelete, this).off('layerremove', this._disableLayerDelete, this),
          L.Handler.prototype.disable.call(this),
          this._map.fire(L.Draw.Event.DELETESTOP, { handler: this.type }),
          this.fire('disabled', { handler: this.type }))
      },
      addHooks: function () {
        var t = this._map
        t &&
          (t.getContainer().focus(),
          this._deletableLayers.eachLayer(this._enableLayerDelete, this),
          (this._deletedLayers = new L.LayerGroup()),
          (this._tooltip = new L.Draw.Tooltip(this._map)),
          this._tooltip.updateContent({ text: L.drawLocal.edit.handlers.remove.tooltip.text }),
          this._map.on('mousemove', this._onMouseMove, this))
      },
      removeHooks: function () {
        this._map &&
          (this._deletableLayers.eachLayer(this._disableLayerDelete, this),
          (this._deletedLayers = null),
          this._tooltip.dispose(),
          (this._tooltip = null),
          this._map.off('mousemove', this._onMouseMove, this))
      },
      revertLayers: function () {
        this._deletedLayers.eachLayer(function (t) {
          this._deletableLayers.addLayer(t), t.fire('revert-deleted', { layer: t })
        }, this)
      },
      save: function () {
        this._map.fire(L.Draw.Event.DELETED, { layers: this._deletedLayers })
      },
      removeAllLayers: function () {
        this._deletableLayers.eachLayer(function (t) {
          this._removeLayer({ layer: t })
        }, this),
          this.save()
      },
      _enableLayerDelete: function (t) {
        ;(t.layer || t.target || t).on('click', this._removeLayer, this)
      },
      _disableLayerDelete: function (t) {
        var e = t.layer || t.target || t
        e.off('click', this._removeLayer, this), this._deletedLayers.removeLayer(e)
      },
      _removeLayer: function (t) {
        var e = t.layer || t.target || t
        this._deletableLayers.removeLayer(e), this._deletedLayers.addLayer(e), e.fire('deleted')
      },
      _onMouseMove: function (t) {
        this._tooltip.updatePosition(t.latlng)
      },
      _hasAvailableLayers: function () {
        return 0 !== this._deletableLayers.getLayers().length
      },
    }))
})(window, document)

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
  initialize: function (poly, latlngs, options) {
    // if touch, switch to touch icon
    // if (L.Browser.touch) {
    // this.options.icon = this.options.touchIcon;
    // }
    this._poly = poly

    if (options && options.drawError) {
      options.drawError = L.Util.extend({}, this.options.drawError, options.drawError)
    }

    this._latlngs = latlngs

    L.setOptions(this, options)
  },

  // Compatibility method to normalize Poly* objects
  // between 0.7.x and 1.0+
  _defaultShape: function () {
    return L.LineUtil.isFlat(this._latlngs) ? this._latlngs : this._latlngs[0]
  },

  // @method addHooks(): void
  // Add listener hooks to this handler.
  addHooks: function () {
    var poly = this._poly
    var path = poly._path

    if (!(poly instanceof L.Polygon)) {
      poly.options.fill = false
      if (poly.options.editing) {
        poly.options.editing.fill = false
      }
    }

    if (path) {
      if (poly.options.editing.className) {
        if (poly.options.original.className) {
          poly.options.original.className.split(' ').forEach(function (className) {
            L.DomUtil.removeClass(path, className)
          })
        }
        poly.options.editing.className.split(' ').forEach(function (className) {
          L.DomUtil.addClass(path, className)
        })
      }
    }

    poly.setStyle(poly.options.editing)

    if (this._poly._map) {
      this._map = this._poly._map // Set map

      if (!this._markerGroup) {
        this._initMarkers()
      }
      this._poly._map.addLayer(this._markerGroup)
    }
  },

  // @method removeHooks(): void
  // Remove listener hooks from this handler.
  removeHooks: function () {
    var poly = this._poly
    var path = poly._path

    if (path) {
      if (poly.options.editing.className) {
        poly.options.editing.className.split(' ').forEach(function (className) {
          L.DomUtil.removeClass(path, className)
        })
        if (poly.options.original.className) {
          poly.options.original.className.split(' ').forEach(function (className) {
            L.DomUtil.addClass(path, className)
          })
        }
      }
    }

    poly.setStyle(poly.options.original)

    if (poly._map) {
      poly._map.removeLayer(this._markerGroup)
      delete this._markerGroup
      delete this._markers
    }
  },

  // @method updateMarkers(): void
  // Clear markers and update their location
  updateMarkers: function () {
    this._markerGroup.clearLayers()
    this._initMarkers()
  },

  _initMarkers: function () {
    if (!this._markerGroup) {
      this._markerGroup = new L.LayerGroup()
    }
    this._markers = []

    var latlngs = this._latlngs,
      i,
      j,
      marker

    var markerLeft, markerRight

    // console.log("_initMarkers", latlngs);

    if (Array.isArray(latlngs[0])) {
      // POLY
      latlngs.forEach((latlng, ring) => {
        var len = latlng.length
        this._markers.push([])
        for (i = 0, len; i < len; i++) {
          marker = this._createMarkerRing(latlng[i], ring, i)
          marker.on('click', this._onMarkerClick, this)
          marker.on('contextmenu', this._onContextMenu, this)
          this._markers[ring].push(marker)
        }
      })

      latlngs.forEach((latlng, ring) => {
        var len = latlng.length
        for (i = 0, j = len - 1; i < len; j = i++) {
          if (i === 0 && !(L.Polygon && this._poly instanceof L.Polygon)) {
            continue
          }
          markerLeft = this._markers[ring][j]
          markerRight = this._markers[ring][i]
          this._createMiddleMarker(markerLeft, markerRight)
          this._updatePrevNext(markerLeft, markerRight)
        }
      })
    } else {
      // LINE
      latlngs.forEach((latlng, index) => {
        marker = this._createMarker(latlng, index)
        marker.on('click', this._onMarkerClick, this)
        marker.on('contextmenu', this._onContextMenu, this)
        this._markers.push(marker)
      })
      var len = latlngs.length
      for (i = 0, j = len - 1; i < len; j = i++) {
        if (i === 0 && !(L.Polygon && this._poly instanceof L.Polygon)) {
          continue
        }
        markerLeft = this._markers[j]
        markerRight = this._markers[i]
        this._createMiddleMarker(markerLeft, markerRight)
        this._updatePrevNext(markerLeft, markerRight)
      }
    }
  },

  _createMarkerRing: function (latlng, ring, index) {
    // Extending L.Marker in TouchEvents.js to include touch.
    var marker = new L.Marker.Touch(latlng, {
      draggable: true,
      icon: this.options.icon,
    })
    // console.log("createMarker", latlng, ring, index);
    marker._origLatLng = latlng
    marker._index = index
    marker._ring = ring

    marker
      .on('dragstart', this._onMarkerDragStart, this)
      .on('drag', this._onMarkerDrag, this)
      .on('dragend', this._fireEdit, this)
      .on('touchmove', this._onTouchMove, this)
      .on('touchend', this._fireEdit, this)
      .on('MSPointerMove', this._onTouchMove, this)
      .on('MSPointerUp', this._fireEdit, this)

    this._markerGroup.addLayer(marker)
    return marker
  },

  _createMarker: function (latlng, index) {
    // Extending L.Marker in TouchEvents.js to include touch.
    var marker = new L.Marker.Touch(latlng, {
      draggable: true,
      icon: this.options.icon,
    })

    marker._origLatLng = latlng
    marker._index = index

    marker
      .on('dragstart', this._onMarkerDragStart, this)
      .on('drag', this._onMarkerDrag, this)
      .on('dragend', this._fireEdit, this)
      .on('touchmove', this._onTouchMove, this)
      .on('touchend', this._fireEdit, this)
      .on('MSPointerMove', this._onTouchMove, this)
      .on('MSPointerUp', this._fireEdit, this)

    this._markerGroup.addLayer(marker)

    return marker
  },

  _onMarkerDragStart: function () {
    this._poly.fire('editstart')
  },

  _spliceLatLngs: function () {
    var latlngs = this._latlngs
    var removed = [].splice.apply(latlngs, arguments)
    this._poly._convertLatLngs(latlngs, true)
    this._poly.redraw()
    return removed
  },

  // this._spliceLatLngs(i, 0, latlng);
  // this._spliceLatLngsInsert(ring, ind, latlng);

  _spliceLatLngsInsert: function (ring, ind, latlng) {
    var latlngs = this._latlngs[ring]
    latlngs.splice(ind, 0, latlng)
    this._poly._convertLatLngs(latlngs, true)
    this._poly.redraw()
  },

  _spliceLatLngsRemove: function (ring, ind) {
    var latlngs = this._latlngs[ring]
    latlngs.splice(ind, 1)
    this._poly._convertLatLngs(latlngs, true)
    this._poly.redraw()
  },

  _removeMarker: function (marker) {
    var i = marker._index
    var ring = marker._ring

    this._markerGroup.removeLayer(marker)

    if (Array.isArray(this._markers[ring])) {
      this._markers[ring].splice(i, 1)
      this._spliceLatLngsRemove(ring, i)
      this._updateIndexesRings(ring, i, -1)
    } else {
      this._markers.splice(i, 1)
      this._spliceLatLngs(i, 1)
      this._updateIndexes(i, -1)
    }

    marker
      .off('dragstart', this._onMarkerDragStart, this)
      .off('drag', this._onMarkerDrag, this)
      .off('dragend', this._fireEdit, this)
      .off('touchmove', this._onMarkerDrag, this)
      .off('touchend', this._fireEdit, this)
      .off('click', this._onMarkerClick, this)
      .off('MSPointerMove', this._onTouchMove, this)
      .off('MSPointerUp', this._fireEdit, this)
  },

  _fireEdit: function () {
    this._poly.edited = true
    this._poly.fire('edit')
    this._poly._map.fire(L.Draw.Event.EDITVERTEX, {
      layers: this._markerGroup,
      poly: this._poly,
    })
  },

  _onMarkerDrag: function (e) {
    var marker = e.target
    var poly = this._poly

    L.extend(marker._origLatLng, marker._latlng)

    if (marker._middleLeft) {
      marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker))
    }
    if (marker._middleRight) {
      marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next))
    }

    if (poly.options.poly) {
      var tooltip = poly._map._editTooltip // Access the tooltip

      // If we don't allow intersections and the polygon intersects
      if (!poly.options.poly.allowIntersection && poly.intersects()) {
        var originalColor = poly.options.color
        poly.setStyle({
          color: this.options.drawError.color,
        })

        // Manually trigger 'dragend' behavior on marker we are about to remove
        // WORKAROUND: introduced in 1.0.0-rc2, may be related to #4484
        if (L.version.indexOf('0.7') !== 0) {
          marker.dragging._draggable._onUp(e)
        }
        this._onMarkerClick(e) // Remove violating marker
        // FIXME: Reset the marker to it's original position (instead of remove)

        if (tooltip) {
          tooltip.updateContent({
            text: L.drawLocal.draw.handlers.polyline.error,
          })
        }

        // Reset everything back to normal after a second
        setTimeout(function () {
          poly.setStyle({
            color: originalColor,
          })
          if (tooltip) {
            tooltip.updateContent({
              text: L.drawLocal.edit.handlers.edit.tooltip.text,
              subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext,
            })
          }
        }, 1000)
      }
    }
    //refresh the bounds when draging
    this._poly._bounds._southWest = L.latLng(Infinity, Infinity)
    this._poly._bounds._northEast = L.latLng(-Infinity, -Infinity)
    var latlngs = this._poly.getLatLngs()
    this._poly._convertLatLngs(latlngs, true)
    this._poly.redraw()
    this._poly.fire('editdrag')
  },

  _checkMinPoints(marker) {
    var minPoints = L.Polygon && this._poly instanceof L.Polygon ? 4 : 3

    // Per Polyline non ho ring controllo this._defaultShape().length
    if (marker._ring === undefined) {
      if (this._defaultShape().length < minPoints) {
        return false
      }
    } else {
      if (this._poly._rings[marker._ring].length < minPoints) {
        return false
      }
    }

    return true
  },

  _onMarkerClick: function (e) {
    var marker = e.target
    // If removing this point would create an invalid polyline/polygon don't remove
    if (!this._checkMinPoints(marker)) {
      return
    }

    // remove the marker
    this._removeMarker(marker)

    // update prev/next links of adjacent markers
    this._updatePrevNext(marker._prev, marker._next)

    // remove ghost markers near the removed marker
    if (marker._middleLeft) {
      this._markerGroup.removeLayer(marker._middleLeft)
    }
    if (marker._middleRight) {
      this._markerGroup.removeLayer(marker._middleRight)
    }

    // create a ghost marker in place of the removed one
    if (marker._prev && marker._next) {
      this._createMiddleMarker(marker._prev, marker._next)
    } else if (!marker._prev) {
      marker._next._middleLeft = null
    } else if (!marker._next) {
      marker._prev._middleRight = null
    }

    this._fireEdit()
  },

  _onContextMenu: function (e) {
    var marker = e.target
    var poly = this._poly
    this._poly._map.fire(L.Draw.Event.MARKERCONTEXT, {
      marker: marker,
      layers: this._markerGroup,
      poly: this._poly,
    })
    L.DomEvent.stopPropagation
  },

  _onTouchMove: function (e) {
    var layerPoint = this._map.mouseEventToLayerPoint(e.originalEvent.touches[0]),
      latlng = this._map.layerPointToLatLng(layerPoint),
      marker = e.target

    L.extend(marker._origLatLng, latlng)

    if (marker._middleLeft) {
      marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker))
    }
    if (marker._middleRight) {
      marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next))
    }

    this._poly.redraw()
    this.updateMarkers()
  },

  _updateIndexesRings: function (ring, index, delta) {
    this._markerGroup.eachLayer(function (marker) {
      if (marker._ring == ring && marker._index > index) {
        marker._index += delta
      }
    })
  },

  _updateIndexes: function (index, delta) {
    this._markerGroup.eachLayer(function (marker) {
      if (marker._index > index) {
        marker._index += delta
      }
    })
  },

  _createMiddleMarker: function (marker1, marker2) {
    if (marker1._ring !== undefined) marker2._ring = marker1._ring
    if (marker2._ring !== undefined) marker1._ring = marker2._ring
    var latlng = this._getMiddleLatLng(marker1, marker2),
      marker = this._createMarker(latlng, marker1._ring),
      onClick,
      onDragStart,
      onDragEnd

    marker._ring = marker1._ring
    marker.setOpacity(0.6)

    marker1._middleRight = marker2._middleLeft = marker

    onDragStart = function () {
      marker.off('touchmove', onDragStart, this)
      var i = marker2._index
      var ring = marker2._ring

      marker._index = i

      marker.off('click', onClick, this).on('click', this._onMarkerClick, this)

      latlng.lat = marker.getLatLng().lat
      latlng.lng = marker.getLatLng().lng

      if (ring === undefined) {
        // console.log('_spliceLatLngs');
        this._spliceLatLngs(i, 0, latlng)
        this._markers.splice(i, 0, marker)
        this._updateIndexes(i, 1)
      } else {
        // console.log('_spliceLatLngsInsert', ring);
        this._spliceLatLngsInsert(ring, i, latlng)
        this._markers[ring].splice(i, 0, marker)
        this._updateIndexesRings(ring, i, 1)
      }

      marker2._index++
      this._updatePrevNext(marker1, marker)
      this._updatePrevNext(marker, marker2)

      marker.setOpacity(1)
      this._poly.fire('editstart')
    }

    onDragEnd = function () {
      marker.off('dragstart', onDragStart, this)
      marker.off('dragend', onDragEnd, this)
      marker.off('touchmove', onDragStart, this)

      this._createMiddleMarker(marker1, marker)
      this._createMiddleMarker(marker, marker2)
    }

    onClick = function () {
      onDragStart.call(this)
      onDragEnd.call(this)
      this._fireEdit()
    }

    marker.on('click', onClick, this).on('dragstart', onDragStart, this).on('dragend', onDragEnd, this).on('touchmove', onDragStart, this)

    // console.log('_createMiddleMarker', marker1, marker2, marker);

    this._markerGroup.addLayer(marker)
  },

  _updatePrevNext: function (marker1, marker2) {
    if (marker1) {
      marker1._next = marker2
    }
    if (marker2) {
      marker2._prev = marker1
    }
  },

  _getMiddleLatLng: function (marker1, marker2) {
    var map = this._poly._map,
      p1 = map.project(marker1.getLatLng()),
      p2 = map.project(marker2.getLatLng())

    return map.unproject(p1._add(p2)._divideBy(2))
  },
})

L.drawLocal = {
  draw: {
    toolbar: {
      actions: {
        title: 'Annulla disegno',
        text: 'Annulla',
      },
      finish: {
        title: 'Termina disegno',
        text: 'Termina',
      },
      undo: {
        title: 'Cancella ultimo punto',
        text: 'Cancella ultimo punto',
      },
      buttons: {
        polyline: 'Disegna linea',
        polygon: 'Disegna poligono',
        rectangle: 'Disegna rettangolo',
        circle: 'Disegna cerchio',
        marker: 'Disegna punto',
        circlemarker: 'Disegna punto',
      },
    },
    handlers: {
      circle: {
        tooltip: {
          start: 'Seleziona e trascina per disegnare il cerchio.',
        },
        radius: 'Radius',
      },
      circlemarker: {
        tooltip: {
          start: 'Seleziona la mappa per disegnare il punto.',
        },
      },
      marker: {
        tooltip: {
          start: 'Seleziona la mappa per disegnare il punto.',
        },
      },
      polygon: {
        tooltip: {
          start: 'Seleziona per iniziare il disegno del poligono.',
          cont: 'Seleziona per continuare il disegno del poligono.',
          end: 'Seleziona il primo vertice oppure effettua <br>un doppio click per completare il poligono.',
        },
      },
      polyline: {
        error: '<strong>Errore:</strong> intersezione non ammessa!',
        tooltip: {
          start: 'Seleziona per iniziare il disegno della linea.',
          cont: 'Seleziona per continuare o doppio click per completare la linea.',
          end: 'Seleziona per continuare o doppio click per completare la linea.',
        },
      },
      rectangle: {
        tooltip: {
          start: 'Seleziona e trascina per disegnare il rettangolo.',
        },
      },
      simpleshape: {
        tooltip: {
          end: 'Rilascia il bottone del mouse per terminare il disegno.',
        },
      },
    },
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: 'Salva i cambiamenti',
          text: 'Salva',
        },
        cancel: {
          title: 'Annulla modifiche',
          text: 'Annulla',
        },
        clearAll: {
          title: 'Cancella tutte le geometrie',
          text: 'Cancella Tutto',
        },
      },
      buttons: {
        edit: 'Modifica Geometrie',
        editDisabled: 'Nessuna geometria da modificare',
        remove: 'Cancella Geometrie',
        removeDisabled: 'Nessuna geometria da cacellare',
      },
    },
    handlers: {
      edit: {
        tooltip: {
          text: 'Trascina il punto o i vertici per modificare le geometrie.',
          subtext: 'Seleziona "Annulla" per annulare le modifiche.',
        },
      },
      remove: {
        tooltip: {
          text: 'Seleziona una geometria per rimuoverla.',
        },
      },
    },
  },
}

// MARKERCLUSTER
L.MarkerClusterGroup = L.FeatureGroup.extend({
  options: {
    maxClusterRadius: 80, //A cluster will cover at most this many pixels from its center
    iconCreateFunction: null,

    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    singleMarkerMode: false,

    disableClusteringAtZoom: null,

    // Setting this to false prevents the removal of any clusters outside of the viewpoint, which
    // is the default behaviour for performance reasons.
    removeOutsideVisibleBounds: true,

    // Set to false to disable all animations (zoom and spiderfy).
    // If false, option animateAddingMarkers below has no effect.
    // If L.DomUtil.TRANSITION is falsy, this option has no effect.
    animate: true,

    //Whether to animate adding markers after adding the MarkerClusterGroup to the map
    // If you are adding individual markers set to true, if adding bulk markers leave false for massive performance gains.
    animateAddingMarkers: false,

    //Increase to increase the distance away that spiderfied markers appear from the center
    spiderfyDistanceMultiplier: 1,

    // Make it possible to specify a polyline options on a spider leg
    spiderLegPolylineOptions: { weight: 1.5, color: '#222', opacity: 0.5 },

    // When bulk adding layers, adds markers in chunks. Means addLayers may not add all the layers in the call, others will be loaded during setTimeouts
    chunkedLoading: false,
    chunkInterval: 200, // process markers for a maximum of ~ n milliseconds (then trigger the chunkProgress callback)
    chunkDelay: 50, // at the end of each interval, give n milliseconds back to system/browser
    chunkProgress: null, // progress callback: function(processed, total, elapsed) (e.g. for a progress indicator)

    //Options to pass to the L.Polygon constructor
    polygonOptions: {},
  },

  initialize: function (options) {
    L.Util.setOptions(this, options)
    if (!this.options.iconCreateFunction) {
      this.options.iconCreateFunction = this._defaultIconCreateFunction
    }

    this._featureGroup = L.featureGroup()
    this._featureGroup.addEventParent(this)

    this._nonPointGroup = L.featureGroup()
    this._nonPointGroup.addEventParent(this)

    this._inZoomAnimation = 0
    this._needsClustering = []
    this._needsRemoving = [] //Markers removed while we aren't on the map need to be kept track of
    //The bounds of the currently shown area (from _getExpandedVisibleBounds) Updated on zoom/move
    this._currentShownBounds = null

    this._queue = []

    // Hook the appropriate animation methods.
    var animate = L.DomUtil.TRANSITION && this.options.animate
    L.extend(this, animate ? this._withAnimation : this._noAnimation)
    // Remember which MarkerCluster class to instantiate (animated or not).
    this._markerCluster = animate ? L.MarkerCluster : L.MarkerClusterNonAnimated
  },

  addLayer: function (layer) {
    if (layer instanceof L.LayerGroup) {
      return this.addLayers([layer])
    }

    //Don't cluster non point data
    if (!layer.getLatLng) {
      this._nonPointGroup.addLayer(layer)
      return this
    }

    if (!this._map) {
      this._needsClustering.push(layer)
      return this
    }

    if (this.hasLayer(layer)) {
      return this
    }

    //If we have already clustered we'll need to add this one to a cluster

    if (this._unspiderfy) {
      this._unspiderfy()
    }

    this._addLayer(layer, this._maxZoom)

    // Refresh bounds and weighted positions.
    this._topClusterLevel._recalculateBounds()

    //Work out what is visible
    var visibleLayer = layer,
      currentZoom = this._map.getZoom()
    if (layer.__parent) {
      while (visibleLayer.__parent._zoom >= currentZoom) {
        visibleLayer = visibleLayer.__parent
      }
    }

    if (this._currentShownBounds.contains(visibleLayer.getLatLng())) {
      if (this.options.animateAddingMarkers) {
        this._animationAddLayer(layer, visibleLayer)
      } else {
        this._animationAddLayerNonAnimated(layer, visibleLayer)
      }
    }
    return this
  },

  removeLayer: function (layer) {
    if (layer instanceof L.LayerGroup) {
      return this.removeLayers([layer])
    }

    //Non point layers
    if (!layer.getLatLng) {
      this._nonPointGroup.removeLayer(layer)
      return this
    }

    if (!this._map) {
      if (!this._arraySplice(this._needsClustering, layer) && this.hasLayer(layer)) {
        this._needsRemoving.push(layer)
      }
      return this
    }

    if (!layer.__parent) {
      return this
    }

    if (this._unspiderfy) {
      this._unspiderfy()
      this._unspiderfyLayer(layer)
    }

    //Remove the marker from clusters
    this._removeLayer(layer, true)

    // Refresh bounds and weighted positions.
    this._topClusterLevel._recalculateBounds()

    layer.off('move', this._childMarkerMoved, this)

    if (this._featureGroup.hasLayer(layer)) {
      this._featureGroup.removeLayer(layer)
      if (layer.clusterShow) {
        layer.clusterShow()
      }
    }

    return this
  },

  //Takes an array of markers and adds them in bulk
  addLayers: function (layersArray) {
    if (!L.Util.isArray(layersArray)) {
      return this.addLayer(layersArray)
    }

    var fg = this._featureGroup,
      npg = this._nonPointGroup,
      chunked = this.options.chunkedLoading,
      chunkInterval = this.options.chunkInterval,
      chunkProgress = this.options.chunkProgress,
      l = layersArray.length,
      offset = 0,
      originalArray = true,
      m

    if (this._map) {
      var started = new Date().getTime()
      var process = L.bind(function () {
        var start = new Date().getTime()
        for (; offset < l; offset++) {
          if (chunked && offset % 200 === 0) {
            // every couple hundred markers, instrument the time elapsed since processing started:
            var elapsed = new Date().getTime() - start
            if (elapsed > chunkInterval) {
              break // been working too hard, time to take a break :-)
            }
          }

          m = layersArray[offset]

          // Group of layers, append children to layersArray and skip.
          // Side effects:
          // - Total increases, so chunkProgress ratio jumps backward.
          // - Groups are not included in this group, only their non-group child layers (hasLayer).
          // Changing array length while looping does not affect performance in current browsers:
          // http://jsperf.com/for-loop-changing-length/6
          if (m instanceof L.LayerGroup) {
            if (originalArray) {
              layersArray = layersArray.slice()
              originalArray = false
            }
            this._extractNonGroupLayers(m, layersArray)
            l = layersArray.length
            continue
          }

          //Not point data, can't be clustered
          if (!m.getLatLng) {
            npg.addLayer(m)
            continue
          }

          if (this.hasLayer(m)) {
            continue
          }

          this._addLayer(m, this._maxZoom)

          //If we just made a cluster of size 2 then we need to remove the other marker from the map (if it is) or we never will
          if (m.__parent) {
            if (m.__parent.getChildCount() === 2) {
              var markers = m.__parent.getAllChildMarkers(),
                otherMarker = markers[0] === m ? markers[1] : markers[0]
              fg.removeLayer(otherMarker)
            }
          }
        }

        if (chunkProgress) {
          // report progress and time elapsed:
          chunkProgress(offset, l, new Date().getTime() - started)
        }

        // Completed processing all markers.
        if (offset === l) {
          // Refresh bounds and weighted positions.
          this._topClusterLevel._recalculateBounds()

          //Update the icons of all those visible clusters that were affected
          this._featureGroup.eachLayer(function (c) {
            if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) {
              c._updateIcon()
            }
          })

          this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)
        } else {
          setTimeout(process, this.options.chunkDelay)
        }
      }, this)

      process()
    } else {
      var needsClustering = this._needsClustering

      for (; offset < l; offset++) {
        m = layersArray[offset]

        // Group of layers, append children to layersArray and skip.
        if (m instanceof L.LayerGroup) {
          if (originalArray) {
            layersArray = layersArray.slice()
            originalArray = false
          }
          this._extractNonGroupLayers(m, layersArray)
          l = layersArray.length
          continue
        }

        //Not point data, can't be clustered
        if (!m.getLatLng) {
          npg.addLayer(m)
          continue
        }

        if (this.hasLayer(m)) {
          continue
        }

        needsClustering.push(m)
      }
    }
    return this
  },

  //Takes an array of markers and removes them in bulk
  removeLayers: function (layersArray) {
    var i,
      m,
      l = layersArray.length,
      fg = this._featureGroup,
      npg = this._nonPointGroup,
      originalArray = true

    if (!this._map) {
      for (i = 0; i < l; i++) {
        m = layersArray[i]

        // Group of layers, append children to layersArray and skip.
        if (m instanceof L.LayerGroup) {
          if (originalArray) {
            layersArray = layersArray.slice()
            originalArray = false
          }
          this._extractNonGroupLayers(m, layersArray)
          l = layersArray.length
          continue
        }

        this._arraySplice(this._needsClustering, m)
        npg.removeLayer(m)
        if (this.hasLayer(m)) {
          this._needsRemoving.push(m)
        }
      }
      return this
    }

    if (this._unspiderfy) {
      this._unspiderfy()

      // Work on a copy of the array, so that next loop is not affected.
      var layersArray2 = layersArray.slice(),
        l2 = l
      for (i = 0; i < l2; i++) {
        m = layersArray2[i]

        // Group of layers, append children to layersArray and skip.
        if (m instanceof L.LayerGroup) {
          this._extractNonGroupLayers(m, layersArray2)
          l2 = layersArray2.length
          continue
        }

        this._unspiderfyLayer(m)
      }
    }

    for (i = 0; i < l; i++) {
      m = layersArray[i]

      // Group of layers, append children to layersArray and skip.
      if (m instanceof L.LayerGroup) {
        if (originalArray) {
          layersArray = layersArray.slice()
          originalArray = false
        }
        this._extractNonGroupLayers(m, layersArray)
        l = layersArray.length
        continue
      }

      if (!m.__parent) {
        npg.removeLayer(m)
        continue
      }

      this._removeLayer(m, true, true)

      if (fg.hasLayer(m)) {
        fg.removeLayer(m)
        if (m.clusterShow) {
          m.clusterShow()
        }
      }
    }

    // Refresh bounds and weighted positions.
    this._topClusterLevel._recalculateBounds()

    //Fix up the clusters and markers on the map
    this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)

    fg.eachLayer(function (c) {
      if (c instanceof L.MarkerCluster) {
        c._updateIcon()
      }
    })

    return this
  },

  //Removes all layers from the MarkerClusterGroup
  clearLayers: function () {
    //Need our own special implementation as the LayerGroup one doesn't work for us

    //If we aren't on the map (yet), blow away the markers we know of
    if (!this._map) {
      this._needsClustering = []
      delete this._gridClusters
      delete this._gridUnclustered
    }

    if (this._noanimationUnspiderfy) {
      this._noanimationUnspiderfy()
    }

    //Remove all the visible layers
    this._featureGroup.clearLayers()
    this._nonPointGroup.clearLayers()

    this.eachLayer(function (marker) {
      marker.off('move', this._childMarkerMoved, this)
      delete marker.__parent
    })

    if (this._map) {
      //Reset _topClusterLevel and the DistanceGrids
      this._generateInitialClusters()
    }

    return this
  },

  //Override FeatureGroup.getBounds as it doesn't work
  getBounds: function () {
    var bounds = new L.LatLngBounds()

    if (this._topClusterLevel) {
      bounds.extend(this._topClusterLevel._bounds)
    }

    for (var i = this._needsClustering.length - 1; i >= 0; i--) {
      bounds.extend(this._needsClustering[i].getLatLng())
    }

    bounds.extend(this._nonPointGroup.getBounds())

    return bounds
  },

  //Overrides LayerGroup.eachLayer
  eachLayer: function (method, context) {
    var markers = this._needsClustering.slice(),
      needsRemoving = this._needsRemoving,
      i

    if (this._topClusterLevel) {
      this._topClusterLevel.getAllChildMarkers(markers)
    }

    for (i = markers.length - 1; i >= 0; i--) {
      if (needsRemoving.indexOf(markers[i]) === -1) {
        method.call(context, markers[i])
      }
    }

    this._nonPointGroup.eachLayer(method, context)
  },

  //Overrides LayerGroup.getLayers
  getLayers: function () {
    var layers = []
    this.eachLayer(function (l) {
      layers.push(l)
    })
    return layers
  },

  //Overrides LayerGroup.getLayer, WARNING: Really bad performance
  getLayer: function (id) {
    var result = null

    id = parseInt(id, 10)

    this.eachLayer(function (l) {
      if (L.stamp(l) === id) {
        result = l
      }
    })

    return result
  },

  //Returns true if the given layer is in this MarkerClusterGroup
  hasLayer: function (layer) {
    if (!layer) {
      return false
    }

    var i,
      anArray = this._needsClustering

    for (i = anArray.length - 1; i >= 0; i--) {
      if (anArray[i] === layer) {
        return true
      }
    }

    anArray = this._needsRemoving
    for (i = anArray.length - 1; i >= 0; i--) {
      if (anArray[i] === layer) {
        return false
      }
    }

    return !!(layer.__parent && layer.__parent._group === this) || this._nonPointGroup.hasLayer(layer)
  },

  //Zoom down to show the given layer (spiderfying if necessary) then calls the callback
  zoomToShowLayer: function (layer, callback) {
    if (typeof callback !== 'function') {
      callback = function () {}
    }

    var showMarker = function () {
      if ((layer._icon || layer.__parent._icon) && !this._inZoomAnimation) {
        this._map.off('moveend', showMarker, this)
        this.off('animationend', showMarker, this)

        if (layer._icon) {
          callback()
        } else if (layer.__parent._icon) {
          this.once('spiderfied', callback, this)
          layer.__parent.spiderfy()
        }
      }
    }

    if (layer._icon && this._map.getBounds().contains(layer.getLatLng())) {
      //Layer is visible ond on screen, immediate return
      callback()
    } else if (layer.__parent._zoom < this._map.getZoom()) {
      //Layer should be visible at this zoom level. It must not be on screen so just pan over to it
      this._map.on('moveend', showMarker, this)
      this._map.panTo(layer.getLatLng())
    } else {
      var moveStart = function () {
        this._map.off('movestart', moveStart, this)
        moveStart = null
      }

      this._map.on('movestart', moveStart, this)
      this._map.on('moveend', showMarker, this)
      this.on('animationend', showMarker, this)
      layer.__parent.zoomToBounds()

      if (moveStart) {
        //Never started moving, must already be there, probably need clustering however
        showMarker.call(this)
      }
    }
  },

  //Overrides FeatureGroup.onAdd
  onAdd: function (map) {
    this._map = map
    var i, l, layer

    if (!isFinite(this._map.getMaxZoom())) {
      throw 'Map has no maxZoom specified'
    }

    this._featureGroup.addTo(map)
    this._nonPointGroup.addTo(map)

    if (!this._gridClusters) {
      this._generateInitialClusters()
    }

    this._maxLat = map.options.crs.projection.MAX_LATITUDE

    for (i = 0, l = this._needsRemoving.length; i < l; i++) {
      layer = this._needsRemoving[i]
      this._removeLayer(layer, true)
    }
    this._needsRemoving = []

    //Remember the current zoom level and bounds
    this._zoom = this._map.getZoom()
    this._currentShownBounds = this._getExpandedVisibleBounds()

    this._map.on('zoomend', this._zoomEnd, this)
    this._map.on('moveend', this._moveEnd, this)

    if (this._spiderfierOnAdd) {
      //TODO FIXME: Not sure how to have spiderfier add something on here nicely
      this._spiderfierOnAdd()
    }

    this._bindEvents()

    //Actually add our markers to the map:
    l = this._needsClustering
    this._needsClustering = []
    this.addLayers(l)
  },

  //Overrides FeatureGroup.onRemove
  onRemove: function (map) {
    map.off('zoomend', this._zoomEnd, this)
    map.off('moveend', this._moveEnd, this)

    this._unbindEvents()

    //In case we are in a cluster animation
    this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '')

    if (this._spiderfierOnRemove) {
      //TODO FIXME: Not sure how to have spiderfier add something on here nicely
      this._spiderfierOnRemove()
    }

    delete this._maxLat

    //Clean up all the layers we added to the map
    this._hideCoverage()
    this._featureGroup.remove()
    this._nonPointGroup.remove()

    this._featureGroup.clearLayers()

    this._map = null
  },

  getVisibleParent: function (marker) {
    var vMarker = marker
    while (vMarker && !vMarker._icon) {
      vMarker = vMarker.__parent
    }
    return vMarker || null
  },

  //Remove the given object from the given array
  _arraySplice: function (anArray, obj) {
    for (var i = anArray.length - 1; i >= 0; i--) {
      if (anArray[i] === obj) {
        anArray.splice(i, 1)
        return true
      }
    }
  },

  /**
   * Removes a marker from all _gridUnclustered zoom levels, starting at the supplied zoom.
   * @param marker to be removed from _gridUnclustered.
   * @param z integer bottom start zoom level (included)
   * @private
   */
  _removeFromGridUnclustered: function (marker, z) {
    var map = this._map,
      gridUnclustered = this._gridUnclustered

    for (; z >= 0; z--) {
      if (!gridUnclustered[z].removeObject(marker, map.project(marker.getLatLng(), z))) {
        break
      }
    }
  },

  _childMarkerMoved: function (e) {
    if (!this._ignoreMove) {
      e.target._latlng = e.oldLatLng
      this.removeLayer(e.target)

      e.target._latlng = e.latlng
      this.addLayer(e.target)
    }
  },

  //Internal function for removing a marker from everything.
  //dontUpdateMap: set to true if you will handle updating the map manually (for bulk functions)
  _removeLayer: function (marker, removeFromDistanceGrid, dontUpdateMap) {
    var gridClusters = this._gridClusters,
      gridUnclustered = this._gridUnclustered,
      fg = this._featureGroup,
      map = this._map

    //Remove the marker from distance clusters it might be in
    if (removeFromDistanceGrid) {
      this._removeFromGridUnclustered(marker, this._maxZoom)
    }

    //Work our way up the clusters removing them as we go if required
    var cluster = marker.__parent,
      markers = cluster._markers,
      otherMarker

    //Remove the marker from the immediate parents marker list
    this._arraySplice(markers, marker)

    while (cluster) {
      cluster._childCount--
      cluster._boundsNeedUpdate = true

      if (cluster._zoom < 0) {
        //Top level, do nothing
        break
      } else if (removeFromDistanceGrid && cluster._childCount <= 1) {
        //Cluster no longer required
        //We need to push the other marker up to the parent
        otherMarker = cluster._markers[0] === marker ? cluster._markers[1] : cluster._markers[0]

        //Update distance grid
        gridClusters[cluster._zoom].removeObject(cluster, map.project(cluster._cLatLng, cluster._zoom))
        gridUnclustered[cluster._zoom].addObject(otherMarker, map.project(otherMarker.getLatLng(), cluster._zoom))

        //Move otherMarker up to parent
        this._arraySplice(cluster.__parent._childClusters, cluster)
        cluster.__parent._markers.push(otherMarker)
        otherMarker.__parent = cluster.__parent

        if (cluster._icon) {
          //Cluster is currently on the map, need to put the marker on the map instead
          fg.removeLayer(cluster)
          if (!dontUpdateMap) {
            fg.addLayer(otherMarker)
          }
        }
      } else {
        if (!dontUpdateMap || !cluster._icon) {
          cluster._updateIcon()
        }
      }

      cluster = cluster.__parent
    }

    delete marker.__parent
  },

  _isOrIsParent: function (el, oel) {
    while (oel) {
      if (el === oel) {
        return true
      }
      oel = oel.parentNode
    }
    return false
  },

  //Override L.Evented.fire
  fire: function (type, data, propagate) {
    if (data && data.layer instanceof L.MarkerCluster) {
      //Prevent multiple clustermouseover/off events if the icon is made up of stacked divs (Doesn't work in ie <= 8, no relatedTarget)
      if (data.originalEvent && this._isOrIsParent(data.layer._icon, data.originalEvent.relatedTarget)) {
        return
      }
      type = 'cluster' + type
    }

    L.FeatureGroup.prototype.fire.call(this, type, data, propagate)
  },

  //Override L.Evented.listens
  listens: function (type, propagate) {
    return L.FeatureGroup.prototype.listens.call(this, type, propagate) || L.FeatureGroup.prototype.listens.call(this, 'cluster' + type, propagate)
  },

  //Default functionality
  _defaultIconCreateFunction: function (cluster) {
    var childCount = cluster.getChildCount()

    var c = ' marker-cluster-'
    if (childCount < 10) {
      c += 'small'
    } else if (childCount < 100) {
      c += 'medium'
    } else {
      c += 'large'
    }

    return new L.DivIcon({
      html: '<div><span>' + childCount + '</span></div>',
      className: 'marker-cluster' + c,
      iconSize: new L.Point(40, 40),
    })
  },

  _bindEvents: function () {
    var map = this._map,
      spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
      showCoverageOnHover = this.options.showCoverageOnHover,
      zoomToBoundsOnClick = this.options.zoomToBoundsOnClick

    //Zoom on cluster click or spiderfy if we are at the lowest level
    if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
      this.on('clusterclick', this._zoomOrSpiderfy, this)
    }

    //Show convex hull (boundary) polygon on mouse over
    if (showCoverageOnHover) {
      this.on('clustermouseover', this._showCoverage, this)
      this.on('clustermouseout', this._hideCoverage, this)
      map.on('zoomend', this._hideCoverage, this)
    }
  },

  _zoomOrSpiderfy: function (e) {
    var cluster = e.layer,
      bottomCluster = cluster

    while (bottomCluster._childClusters.length === 1) {
      bottomCluster = bottomCluster._childClusters[0]
    }

    if (bottomCluster._zoom === this._maxZoom && bottomCluster._childCount === cluster._childCount && this.options.spiderfyOnMaxZoom) {
      // All child markers are contained in a single cluster from this._maxZoom to this cluster.
      cluster.spiderfy()
    } else if (this.options.zoomToBoundsOnClick) {
      cluster.zoomToBounds()
    }

    // Focus the map again for keyboard users.
    if (e.originalEvent && e.originalEvent.keyCode === 13) {
      this._map._container.focus()
    }
  },

  _showCoverage: function (e) {
    var map = this._map
    if (this._inZoomAnimation) {
      return
    }
    if (this._shownPolygon) {
      map.removeLayer(this._shownPolygon)
    }
    if (e.layer.getChildCount() > 2 && e.layer !== this._spiderfied) {
      this._shownPolygon = new L.Polygon(e.layer.getConvexHull(), this.options.polygonOptions)
      map.addLayer(this._shownPolygon)
    }
  },

  _hideCoverage: function () {
    if (this._shownPolygon) {
      this._map.removeLayer(this._shownPolygon)
      this._shownPolygon = null
    }
  },

  _unbindEvents: function () {
    var spiderfyOnMaxZoom = this.options.spiderfyOnMaxZoom,
      showCoverageOnHover = this.options.showCoverageOnHover,
      zoomToBoundsOnClick = this.options.zoomToBoundsOnClick,
      map = this._map

    if (spiderfyOnMaxZoom || zoomToBoundsOnClick) {
      this.off('clusterclick', this._zoomOrSpiderfy, this)
    }
    if (showCoverageOnHover) {
      this.off('clustermouseover', this._showCoverage, this)
      this.off('clustermouseout', this._hideCoverage, this)
      map.off('zoomend', this._hideCoverage, this)
    }
  },

  _zoomEnd: function () {
    if (!this._map) {
      //May have been removed from the map by a zoomEnd handler
      return
    }
    this._mergeSplitClusters()

    this._zoom = Math.round(this._map._zoom)
    this._currentShownBounds = this._getExpandedVisibleBounds()
  },

  _moveEnd: function () {
    if (this._inZoomAnimation) {
      return
    }

    var newBounds = this._getExpandedVisibleBounds()

    this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, newBounds)
    this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), newBounds)

    this._currentShownBounds = newBounds
    return
  },

  _generateInitialClusters: function () {
    var maxZoom = this._map.getMaxZoom(),
      radius = this.options.maxClusterRadius,
      radiusFn = radius

    //If we just set maxClusterRadius to a single number, we need to create
    //a simple function to return that number. Otherwise, we just have to
    //use the function we've passed in.
    if (typeof radius !== 'function') {
      radiusFn = function () {
        return radius
      }
    }

    if (this.options.disableClusteringAtZoom) {
      maxZoom = this.options.disableClusteringAtZoom - 1
    }
    this._maxZoom = maxZoom
    this._gridClusters = {}
    this._gridUnclustered = {}

    //Set up DistanceGrids for each zoom
    for (var zoom = maxZoom; zoom >= 0; zoom--) {
      this._gridClusters[zoom] = new L.DistanceGrid(radiusFn(zoom))
      this._gridUnclustered[zoom] = new L.DistanceGrid(radiusFn(zoom))
    }

    // Instantiate the appropriate L.MarkerCluster class (animated or not).
    this._topClusterLevel = new this._markerCluster(this, -1)
  },

  //Zoom: Zoom to start adding at (Pass this._maxZoom to start at the bottom)
  _addLayer: function (layer, zoom) {
    var gridClusters = this._gridClusters,
      gridUnclustered = this._gridUnclustered,
      markerPoint,
      z

    if (this.options.singleMarkerMode) {
      this._overrideMarkerIcon(layer)
    }

    layer.on('move', this._childMarkerMoved, this)

    //Find the lowest zoom level to slot this one in
    for (; zoom >= 0; zoom--) {
      markerPoint = this._map.project(layer.getLatLng(), zoom) // calculate pixel position

      //Try find a cluster close by
      var closest = gridClusters[zoom].getNearObject(markerPoint)
      if (closest) {
        closest._addChild(layer)
        layer.__parent = closest
        return
      }

      //Try find a marker close by to form a new cluster with
      closest = gridUnclustered[zoom].getNearObject(markerPoint)
      if (closest) {
        var parent = closest.__parent
        if (parent) {
          this._removeLayer(closest, false)
        }

        //Create new cluster with these 2 in it

        var newCluster = new this._markerCluster(this, zoom, closest, layer)
        gridClusters[zoom].addObject(newCluster, this._map.project(newCluster._cLatLng, zoom))
        closest.__parent = newCluster
        layer.__parent = newCluster

        //First create any new intermediate parent clusters that don't exist
        var lastParent = newCluster
        for (z = zoom - 1; z > parent._zoom; z--) {
          lastParent = new this._markerCluster(this, z, lastParent)
          gridClusters[z].addObject(lastParent, this._map.project(closest.getLatLng(), z))
        }
        parent._addChild(lastParent)

        //Remove closest from this zoom level and any above that it is in, replace with newCluster
        this._removeFromGridUnclustered(closest, zoom)

        return
      }

      //Didn't manage to cluster in at this zoom, record us as a marker here and continue upwards
      gridUnclustered[zoom].addObject(layer, markerPoint)
    }

    //Didn't get in anything, add us to the top
    this._topClusterLevel._addChild(layer)
    layer.__parent = this._topClusterLevel
    return
  },

  //Enqueue code to fire after the marker expand/contract has happened
  _enqueue: function (fn) {
    this._queue.push(fn)
    if (!this._queueTimeout) {
      this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300)
    }
  },
  _processQueue: function () {
    for (var i = 0; i < this._queue.length; i++) {
      this._queue[i].call(this)
    }
    this._queue.length = 0
    clearTimeout(this._queueTimeout)
    this._queueTimeout = null
  },

  //Merge and split any existing clusters that are too big or small
  _mergeSplitClusters: function () {
    var mapZoom = Math.round(this._map._zoom)

    //In case we are starting to split before the animation finished
    this._processQueue()

    if (this._zoom < mapZoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds())) {
      //Zoom in, split
      this._animationStart()
      //Remove clusters now off screen
      this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, this._getExpandedVisibleBounds())

      this._animationZoomIn(this._zoom, mapZoom)
    } else if (this._zoom > mapZoom) {
      //Zoom out, merge
      this._animationStart()

      this._animationZoomOut(this._zoom, mapZoom)
    } else {
      this._moveEnd()
    }
  },

  //Gets the maps visible bounds expanded in each direction by the size of the screen (so the user cannot see an area we do not cover in one pan)
  _getExpandedVisibleBounds: function () {
    if (!this.options.removeOutsideVisibleBounds) {
      return this._mapBoundsInfinite
    } else if (L.Browser.mobile) {
      return this._checkBoundsMaxLat(this._map.getBounds())
    }

    return this._checkBoundsMaxLat(this._map.getBounds().pad(1)) // Padding expands the bounds by its own dimensions but scaled with the given factor.
  },

  /**
   * Expands the latitude to Infinity (or -Infinity) if the input bounds reach the map projection maximum defined latitude
   * (in the case of Web/Spherical Mercator, it is 85.0511287798 / see https://en.wikipedia.org/wiki/Web_Mercator#Formulas).
   * Otherwise, the removeOutsideVisibleBounds option will remove markers beyond that limit, whereas the same markers without
   * this option (or outside MCG) will have their position floored (ceiled) by the projection and rendered at that limit,
   * making the user think that MCG "eats" them and never displays them again.
   * @param bounds L.LatLngBounds
   * @returns {L.LatLngBounds}
   * @private
   */
  _checkBoundsMaxLat: function (bounds) {
    var maxLat = this._maxLat

    if (maxLat !== undefined) {
      if (bounds.getNorth() >= maxLat) {
        bounds._northEast.lat = Infinity
      }
      if (bounds.getSouth() <= -maxLat) {
        bounds._southWest.lat = -Infinity
      }
    }

    return bounds
  },

  //Shared animation code
  _animationAddLayerNonAnimated: function (layer, newCluster) {
    if (newCluster === layer) {
      this._featureGroup.addLayer(layer)
    } else if (newCluster._childCount === 2) {
      newCluster._addToMap()

      var markers = newCluster.getAllChildMarkers()
      this._featureGroup.removeLayer(markers[0])
      this._featureGroup.removeLayer(markers[1])
    } else {
      newCluster._updateIcon()
    }
  },

  /**
   * Extracts individual (i.e. non-group) layers from a Layer Group.
   * @param group to extract layers from.
   * @param output {Array} in which to store the extracted layers.
   * @returns {*|Array}
   * @private
   */
  _extractNonGroupLayers: function (group, output) {
    var layers = group.getLayers(),
      i = 0,
      layer

    output = output || []

    for (; i < layers.length; i++) {
      layer = layers[i]

      if (layer instanceof L.LayerGroup) {
        this._extractNonGroupLayers(layer, output)
        continue
      }

      output.push(layer)
    }

    return output
  },

  /**
   * Implements the singleMarkerMode option.
   * @param layer Marker to re-style using the Clusters iconCreateFunction.
   * @returns {L.Icon} The newly created icon.
   * @private
   */
  _overrideMarkerIcon: function (layer) {
    var icon = (layer.options.icon = this.options.iconCreateFunction({
      getChildCount: function () {
        return 1
      },
      getAllChildMarkers: function () {
        return [layer]
      },
    }))

    return icon
  },
})

// Constant bounds used in case option "removeOutsideVisibleBounds" is set to false.
L.MarkerClusterGroup.include({
  _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity)),
})

L.MarkerClusterGroup.include({
  _noAnimation: {
    //Non Animated versions of everything
    _animationStart: function () {
      //Do nothing...
    },
    _animationZoomIn: function (previousZoomLevel, newZoomLevel) {
      this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel)
      this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds())

      //We didn't actually animate, but we use this event to mean "clustering animations have finished"
      this.fire('animationend')
    },
    _animationZoomOut: function (previousZoomLevel, newZoomLevel) {
      this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel)
      this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds())

      //We didn't actually animate, but we use this event to mean "clustering animations have finished"
      this.fire('animationend')
    },
    _animationAddLayer: function (layer, newCluster) {
      this._animationAddLayerNonAnimated(layer, newCluster)
    },
  },

  _withAnimation: {
    //Animated versions here
    _animationStart: function () {
      this._map._mapPane.className += ' leaflet-cluster-anim'
      this._inZoomAnimation++
    },

    _animationZoomIn: function (previousZoomLevel, newZoomLevel) {
      var bounds = this._getExpandedVisibleBounds(),
        fg = this._featureGroup,
        i

      this._ignoreMove = true

      //Add all children of current clusters to map and remove those clusters from map
      this._topClusterLevel._recursively(bounds, previousZoomLevel, 0, function (c) {
        var startPos = c._latlng,
          markers = c._markers,
          m

        if (!bounds.contains(startPos)) {
          startPos = null
        }

        if (c._isSingleParent() && previousZoomLevel + 1 === newZoomLevel) {
          //Immediately add the new child and remove us
          fg.removeLayer(c)
          c._recursivelyAddChildrenToMap(null, newZoomLevel, bounds)
        } else {
          //Fade out old cluster
          c.clusterHide()
          c._recursivelyAddChildrenToMap(startPos, newZoomLevel, bounds)
        }

        //Remove all markers that aren't visible any more
        //TODO: Do we actually need to do this on the higher levels too?
        for (i = markers.length - 1; i >= 0; i--) {
          m = markers[i]
          if (!bounds.contains(m._latlng)) {
            fg.removeLayer(m)
          }
        }
      })

      this._forceLayout()

      //Update opacities
      this._topClusterLevel._recursivelyBecomeVisible(bounds, newZoomLevel)
      //TODO Maybe? Update markers in _recursivelyBecomeVisible
      fg.eachLayer(function (n) {
        if (!(n instanceof L.MarkerCluster) && n._icon) {
          n.clusterShow()
        }
      })

      //update the positions of the just added clusters/markers
      this._topClusterLevel._recursively(bounds, previousZoomLevel, newZoomLevel, function (c) {
        c._recursivelyRestoreChildPositions(newZoomLevel)
      })

      this._ignoreMove = false

      //Remove the old clusters and close the zoom animation
      this._enqueue(function () {
        //update the positions of the just added clusters/markers
        this._topClusterLevel._recursively(bounds, previousZoomLevel, 0, function (c) {
          fg.removeLayer(c)
          c.clusterShow()
        })

        this._animationEnd()
      })
    },

    _animationZoomOut: function (previousZoomLevel, newZoomLevel) {
      this._animationZoomOutSingle(this._topClusterLevel, previousZoomLevel - 1, newZoomLevel)

      //Need to add markers for those that weren't on the map before but are now
      this._topClusterLevel._recursivelyAddChildrenToMap(null, newZoomLevel, this._getExpandedVisibleBounds())
      //Remove markers that were on the map before but won't be now
      this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, previousZoomLevel, this._getExpandedVisibleBounds())
    },

    _animationAddLayer: function (layer, newCluster) {
      var me = this,
        fg = this._featureGroup

      fg.addLayer(layer)
      if (newCluster !== layer) {
        if (newCluster._childCount > 2) {
          //Was already a cluster

          newCluster._updateIcon()
          this._forceLayout()
          this._animationStart()

          layer._setPos(this._map.latLngToLayerPoint(newCluster.getLatLng()))
          layer.clusterHide()

          this._enqueue(function () {
            fg.removeLayer(layer)
            layer.clusterShow()

            me._animationEnd()
          })
        } else {
          //Just became a cluster
          this._forceLayout()

          me._animationStart()
          me._animationZoomOutSingle(newCluster, this._map.getMaxZoom(), this._map.getZoom())
        }
      }
    },
  },

  // Private methods for animated versions.
  _animationZoomOutSingle: function (cluster, previousZoomLevel, newZoomLevel) {
    var bounds = this._getExpandedVisibleBounds()

    //Animate all of the markers in the clusters to move to their cluster center point
    cluster._recursivelyAnimateChildrenInAndAddSelfToMap(bounds, previousZoomLevel + 1, newZoomLevel)

    var me = this

    //Update the opacity (If we immediately set it they won't animate)
    this._forceLayout()
    cluster._recursivelyBecomeVisible(bounds, newZoomLevel)

    //TODO: Maybe use the transition timing stuff to make this more reliable
    //When the animations are done, tidy up
    this._enqueue(function () {
      //This cluster stopped being a cluster before the timeout fired
      if (cluster._childCount === 1) {
        var m = cluster._markers[0]
        //If we were in a cluster animation at the time then the opacity and position of our child could be wrong now, so fix it
        this._ignoreMove = true
        m.setLatLng(m.getLatLng())
        this._ignoreMove = false
        if (m.clusterShow) {
          m.clusterShow()
        }
      } else {
        cluster._recursively(bounds, newZoomLevel, 0, function (c) {
          c._recursivelyRemoveChildrenFromMap(bounds, previousZoomLevel + 1)
        })
      }
      me._animationEnd()
    })
  },

  _animationEnd: function () {
    if (this._map) {
      this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-cluster-anim', '')
    }
    this._inZoomAnimation--
    this.fire('animationend')
  },

  //Force a browser layout of stuff in the map
  // Should apply the current opacity and location to all elements so we can update them again for an animation
  _forceLayout: function () {
    //In my testing this works, infact offsetWidth of any element seems to work.
    //Could loop all this._layers and do this for each _icon if it stops working

    L.Util.falseFn(document.body.offsetWidth)
  },
})

L.markerClusterGroup = function (options) {
  return new L.MarkerClusterGroup(options)
}

L.MarkerCluster = L.Marker.extend({
  initialize: function (group, zoom, a, b) {
    L.Marker.prototype.initialize.call(this, a ? a._cLatLng || a.getLatLng() : new L.LatLng(0, 0), { icon: this })

    this._group = group
    this._zoom = zoom

    this._markers = []
    this._childClusters = []
    this._childCount = 0
    this._iconNeedsUpdate = true
    this._boundsNeedUpdate = true

    this._bounds = new L.LatLngBounds()

    if (a) {
      this._addChild(a)
    }
    if (b) {
      this._addChild(b)
    }
  },

  //Recursively retrieve all child markers of this cluster
  getAllChildMarkers: function (storageArray) {
    storageArray = storageArray || []

    for (var i = this._childClusters.length - 1; i >= 0; i--) {
      this._childClusters[i].getAllChildMarkers(storageArray)
    }

    for (var j = this._markers.length - 1; j >= 0; j--) {
      storageArray.push(this._markers[j])
    }

    return storageArray
  },

  //Returns the count of how many child markers we have
  getChildCount: function () {
    return this._childCount
  },

  //Zoom to the minimum of showing all of the child markers, or the extents of this cluster
  zoomToBounds: function () {
    var childClusters = this._childClusters.slice(),
      map = this._group._map,
      boundsZoom = map.getBoundsZoom(this._bounds),
      zoom = this._zoom + 1,
      mapZoom = map.getZoom(),
      i

    //calculate how far we need to zoom down to see all of the markers
    while (childClusters.length > 0 && boundsZoom > zoom) {
      zoom++
      var newClusters = []
      for (i = 0; i < childClusters.length; i++) {
        newClusters = newClusters.concat(childClusters[i]._childClusters)
      }
      childClusters = newClusters
    }

    if (boundsZoom > zoom) {
      this._group._map.setView(this._latlng, zoom)
    } else if (boundsZoom <= mapZoom) {
      this._group._map.setView(this._latlng, mapZoom + 1)
    } else {
      this._group._map.fitBounds(this._bounds)
    }
  },

  getBounds: function () {
    var bounds = new L.LatLngBounds()
    bounds.extend(this._bounds)
    return bounds
  },

  _updateIcon: function () {
    this._iconNeedsUpdate = true
    if (this._icon) {
      this.setIcon(this)
    }
  },

  //Cludge for Icon, we pretend to be an icon for performance
  createIcon: function () {
    if (this._iconNeedsUpdate) {
      this._iconObj = this._group.options.iconCreateFunction(this)
      this._iconNeedsUpdate = false
    }
    return this._iconObj.createIcon()
  },
  createShadow: function () {
    return this._iconObj.createShadow()
  },

  _addChild: function (new1, isNotificationFromChild) {
    this._iconNeedsUpdate = true

    this._boundsNeedUpdate = true
    this._setClusterCenter(new1)

    if (new1 instanceof L.MarkerCluster) {
      if (!isNotificationFromChild) {
        this._childClusters.push(new1)
        new1.__parent = this
      }
      this._childCount += new1._childCount
    } else {
      if (!isNotificationFromChild) {
        this._markers.push(new1)
      }
      this._childCount++
    }

    if (this.__parent) {
      this.__parent._addChild(new1, true)
    }
  },

  /**
   * Makes sure the cluster center is set. If not, uses the child center if it is a cluster, or the marker position.
   * @param child L.MarkerCluster|L.Marker that will be used as cluster center if not defined yet.
   * @private
   */
  _setClusterCenter: function (child) {
    if (!this._cLatLng) {
      // when clustering, take position of the first point as the cluster center
      this._cLatLng = child._cLatLng || child._latlng
    }
  },

  /**
   * Assigns impossible bounding values so that the next extend entirely determines the new bounds.
   * This method avoids having to trash the previous L.LatLngBounds object and to create a new one, which is much slower for this class.
   * As long as the bounds are not extended, most other methods would probably fail, as they would with bounds initialized but not extended.
   * @private
   */
  _resetBounds: function () {
    var bounds = this._bounds

    if (bounds._southWest) {
      bounds._southWest.lat = Infinity
      bounds._southWest.lng = Infinity
    }
    if (bounds._northEast) {
      bounds._northEast.lat = -Infinity
      bounds._northEast.lng = -Infinity
    }
  },

  _recalculateBounds: function () {
    var markers = this._markers,
      childClusters = this._childClusters,
      latSum = 0,
      lngSum = 0,
      totalCount = this._childCount,
      i,
      child,
      childLatLng,
      childCount

    // Case where all markers are removed from the map and we are left with just an empty _topClusterLevel.
    if (totalCount === 0) {
      return
    }

    // Reset rather than creating a new object, for performance.
    this._resetBounds()

    // Child markers.
    for (i = 0; i < markers.length; i++) {
      childLatLng = markers[i]._latlng

      this._bounds.extend(childLatLng)

      latSum += childLatLng.lat
      lngSum += childLatLng.lng
    }

    // Child clusters.
    for (i = 0; i < childClusters.length; i++) {
      child = childClusters[i]

      // Re-compute child bounds and weighted position first if necessary.
      if (child._boundsNeedUpdate) {
        child._recalculateBounds()
      }

      this._bounds.extend(child._bounds)

      childLatLng = child._wLatLng
      childCount = child._childCount

      latSum += childLatLng.lat * childCount
      lngSum += childLatLng.lng * childCount
    }

    this._latlng = this._wLatLng = new L.LatLng(latSum / totalCount, lngSum / totalCount)

    // Reset dirty flag.
    this._boundsNeedUpdate = false
  },

  //Set our markers position as given and add it to the map
  _addToMap: function (startPos) {
    if (startPos) {
      this._backupLatlng = this._latlng
      this.setLatLng(startPos)
    }
    this._group._featureGroup.addLayer(this)
  },

  _recursivelyAnimateChildrenIn: function (bounds, center, maxZoom) {
    this._recursively(
      bounds,
      0,
      maxZoom - 1,
      function (c) {
        var markers = c._markers,
          i,
          m
        for (i = markers.length - 1; i >= 0; i--) {
          m = markers[i]

          //Only do it if the icon is still on the map
          if (m._icon) {
            m._setPos(center)
            m.clusterHide()
          }
        }
      },
      function (c) {
        var childClusters = c._childClusters,
          j,
          cm
        for (j = childClusters.length - 1; j >= 0; j--) {
          cm = childClusters[j]
          if (cm._icon) {
            cm._setPos(center)
            cm.clusterHide()
          }
        }
      }
    )
  },

  _recursivelyAnimateChildrenInAndAddSelfToMap: function (bounds, previousZoomLevel, newZoomLevel) {
    this._recursively(bounds, newZoomLevel, 0, function (c) {
      c._recursivelyAnimateChildrenIn(bounds, c._group._map.latLngToLayerPoint(c.getLatLng()).round(), previousZoomLevel)

      //TODO: depthToAnimateIn affects _isSingleParent, if there is a multizoom we may/may not be.
      //As a hack we only do a animation free zoom on a single level zoom, if someone does multiple levels then we always animate
      if (c._isSingleParent() && previousZoomLevel - 1 === newZoomLevel) {
        c.clusterShow()
        c._recursivelyRemoveChildrenFromMap(bounds, previousZoomLevel) //Immediately remove our children as we are replacing them. TODO previousBounds not bounds
      } else {
        c.clusterHide()
      }

      c._addToMap()
    })
  },

  _recursivelyBecomeVisible: function (bounds, zoomLevel) {
    this._recursively(bounds, 0, zoomLevel, null, function (c) {
      c.clusterShow()
    })
  },

  _recursivelyAddChildrenToMap: function (startPos, zoomLevel, bounds) {
    this._recursively(
      bounds,
      -1,
      zoomLevel,
      function (c) {
        if (zoomLevel === c._zoom) {
          return
        }

        //Add our child markers at startPos (so they can be animated out)
        for (var i = c._markers.length - 1; i >= 0; i--) {
          var nm = c._markers[i]

          if (!bounds.contains(nm._latlng)) {
            continue
          }

          if (startPos) {
            nm._backupLatlng = nm.getLatLng()

            nm.setLatLng(startPos)
            if (nm.clusterHide) {
              nm.clusterHide()
            }
          }

          c._group._featureGroup.addLayer(nm)
        }
      },
      function (c) {
        c._addToMap(startPos)
      }
    )
  },

  _recursivelyRestoreChildPositions: function (zoomLevel) {
    //Fix positions of child markers
    for (var i = this._markers.length - 1; i >= 0; i--) {
      var nm = this._markers[i]
      if (nm._backupLatlng) {
        nm.setLatLng(nm._backupLatlng)
        delete nm._backupLatlng
      }
    }

    if (zoomLevel - 1 === this._zoom) {
      //Reposition child clusters
      for (var j = this._childClusters.length - 1; j >= 0; j--) {
        this._childClusters[j]._restorePosition()
      }
    } else {
      for (var k = this._childClusters.length - 1; k >= 0; k--) {
        this._childClusters[k]._recursivelyRestoreChildPositions(zoomLevel)
      }
    }
  },

  _restorePosition: function () {
    if (this._backupLatlng) {
      this.setLatLng(this._backupLatlng)
      delete this._backupLatlng
    }
  },

  //exceptBounds: If set, don't remove any markers/clusters in it
  _recursivelyRemoveChildrenFromMap: function (previousBounds, zoomLevel, exceptBounds) {
    var m, i
    this._recursively(
      previousBounds,
      -1,
      zoomLevel - 1,
      function (c) {
        //Remove markers at every level
        for (i = c._markers.length - 1; i >= 0; i--) {
          m = c._markers[i]
          if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
            c._group._featureGroup.removeLayer(m)
            if (m.clusterShow) {
              m.clusterShow()
            }
          }
        }
      },
      function (c) {
        //Remove child clusters at just the bottom level
        for (i = c._childClusters.length - 1; i >= 0; i--) {
          m = c._childClusters[i]
          if (!exceptBounds || !exceptBounds.contains(m._latlng)) {
            c._group._featureGroup.removeLayer(m)
            if (m.clusterShow) {
              m.clusterShow()
            }
          }
        }
      }
    )
  },

  //Run the given functions recursively to this and child clusters
  // boundsToApplyTo: a L.LatLngBounds representing the bounds of what clusters to recurse in to
  // zoomLevelToStart: zoom level to start running functions (inclusive)
  // zoomLevelToStop: zoom level to stop running functions (inclusive)
  // runAtEveryLevel: function that takes an L.MarkerCluster as an argument that should be applied on every level
  // runAtBottomLevel: function that takes an L.MarkerCluster as an argument that should be applied at only the bottom level
  _recursively: function (boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel) {
    var childClusters = this._childClusters,
      zoom = this._zoom,
      i,
      c

    if (zoomLevelToStart > zoom) {
      //Still going down to required depth, just recurse to child clusters
      for (i = childClusters.length - 1; i >= 0; i--) {
        c = childClusters[i]
        if (boundsToApplyTo.intersects(c._bounds)) {
          c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel)
        }
      }
    } else {
      //In required depth

      if (runAtEveryLevel) {
        runAtEveryLevel(this)
      }
      if (runAtBottomLevel && this._zoom === zoomLevelToStop) {
        runAtBottomLevel(this)
      }

      //TODO: This loop is almost the same as above
      if (zoomLevelToStop > zoom) {
        for (i = childClusters.length - 1; i >= 0; i--) {
          c = childClusters[i]
          if (boundsToApplyTo.intersects(c._bounds)) {
            c._recursively(boundsToApplyTo, zoomLevelToStart, zoomLevelToStop, runAtEveryLevel, runAtBottomLevel)
          }
        }
      }
    }
  },

  //Returns true if we are the parent of only one cluster and that cluster is the same as us
  _isSingleParent: function () {
    //Don't need to check this._markers as the rest won't work if there are any
    return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount
  },
})

L.Marker.include({
  clusterHide: function () {
    this.options.opacityWhenUnclustered = this.options.opacity || 1
    return this.setOpacity(0)
  },

  clusterShow: function () {
    var ret = this.setOpacity(this.options.opacity || this.options.opacityWhenUnclustered)
    delete this.options.opacityWhenUnclustered
    return ret
  },
})

L.DistanceGrid = function (cellSize) {
  this._cellSize = cellSize
  this._sqCellSize = cellSize * cellSize
  this._grid = {}
  this._objectPoint = {}
}

L.DistanceGrid.prototype = {
  addObject: function (obj, point) {
    var x = this._getCoord(point.x),
      y = this._getCoord(point.y),
      grid = this._grid,
      row = (grid[y] = grid[y] || {}),
      cell = (row[x] = row[x] || []),
      stamp = L.Util.stamp(obj)

    this._objectPoint[stamp] = point

    cell.push(obj)
  },

  updateObject: function (obj, point) {
    this.removeObject(obj)
    this.addObject(obj, point)
  },

  //Returns true if the object was found
  removeObject: function (obj, point) {
    var x = this._getCoord(point.x),
      y = this._getCoord(point.y),
      grid = this._grid,
      row = (grid[y] = grid[y] || {}),
      cell = (row[x] = row[x] || []),
      i,
      len

    delete this._objectPoint[L.Util.stamp(obj)]

    for (i = 0, len = cell.length; i < len; i++) {
      if (cell[i] === obj) {
        cell.splice(i, 1)

        if (len === 1) {
          delete row[x]
        }

        return true
      }
    }
  },

  eachObject: function (fn, context) {
    var i,
      j,
      k,
      len,
      row,
      cell,
      removed,
      grid = this._grid

    for (i in grid) {
      row = grid[i]

      for (j in row) {
        cell = row[j]

        for (k = 0, len = cell.length; k < len; k++) {
          removed = fn.call(context, cell[k])
          if (removed) {
            k--
            len--
          }
        }
      }
    }
  },

  getNearObject: function (point) {
    var x = this._getCoord(point.x),
      y = this._getCoord(point.y),
      i,
      j,
      k,
      row,
      cell,
      len,
      obj,
      dist,
      objectPoint = this._objectPoint,
      closestDistSq = this._sqCellSize,
      closest = null

    for (i = y - 1; i <= y + 1; i++) {
      row = this._grid[i]
      if (row) {
        for (j = x - 1; j <= x + 1; j++) {
          cell = row[j]
          if (cell) {
            for (k = 0, len = cell.length; k < len; k++) {
              obj = cell[k]
              dist = this._sqDist(objectPoint[L.Util.stamp(obj)], point)
              if (dist < closestDistSq) {
                closestDistSq = dist
                closest = obj
              }
            }
          }
        }
      }
    }
    return closest
  },

  _getCoord: function (x) {
    return Math.floor(x / this._cellSize)
  },

  _sqDist: function (p, p2) {
    var dx = p2.x - p.x,
      dy = p2.y - p.y
    return dx * dx + dy * dy
  },
}
;(function () {
  L.QuickHull = {
    /*
     * @param {Object} cpt a point to be measured from the baseline
     * @param {Array} bl the baseline, as represented by a two-element
     *   array of latlng objects.
     * @returns {Number} an approximate distance measure
     */
    getDistant: function (cpt, bl) {
      var vY = bl[1].lat - bl[0].lat,
        vX = bl[0].lng - bl[1].lng
      return vX * (cpt.lat - bl[0].lat) + vY * (cpt.lng - bl[0].lng)
    },

    /*
     * @param {Array} baseLine a two-element array of latlng objects
     *   representing the baseline to project from
     * @param {Array} latLngs an array of latlng objects
     * @returns {Object} the maximum point and all new points to stay
     *   in consideration for the hull.
     */
    findMostDistantPointFromBaseLine: function (baseLine, latLngs) {
      var maxD = 0,
        maxPt = null,
        newPoints = [],
        i,
        pt,
        d

      for (i = latLngs.length - 1; i >= 0; i--) {
        pt = latLngs[i]
        d = this.getDistant(pt, baseLine)

        if (d > 0) {
          newPoints.push(pt)
        } else {
          continue
        }

        if (d > maxD) {
          maxD = d
          maxPt = pt
        }
      }

      return { maxPoint: maxPt, newPoints: newPoints }
    },

    /*
     * Given a baseline, compute the convex hull of latLngs as an array
     * of latLngs.
     *
     * @param {Array} latLngs
     * @returns {Array}
     */
    buildConvexHull: function (baseLine, latLngs) {
      var convexHullBaseLines = [],
        t = this.findMostDistantPointFromBaseLine(baseLine, latLngs)

      if (t.maxPoint) {
        // if there is still a point "outside" the base line
        convexHullBaseLines = convexHullBaseLines.concat(this.buildConvexHull([baseLine[0], t.maxPoint], t.newPoints))
        convexHullBaseLines = convexHullBaseLines.concat(this.buildConvexHull([t.maxPoint, baseLine[1]], t.newPoints))
        return convexHullBaseLines
      } else {
        // if there is no more point "outside" the base line, the current base line is part of the convex hull
        return [baseLine[0]]
      }
    },

    /*
     * Given an array of latlngs, compute a convex hull as an array
     * of latlngs
     *
     * @param {Array} latLngs
     * @returns {Array}
     */
    getConvexHull: function (latLngs) {
      // find first baseline
      var maxLat = false,
        minLat = false,
        maxLng = false,
        minLng = false,
        maxLatPt = null,
        minLatPt = null,
        maxLngPt = null,
        minLngPt = null,
        maxPt = null,
        minPt = null,
        i

      for (i = latLngs.length - 1; i >= 0; i--) {
        var pt = latLngs[i]
        if (maxLat === false || pt.lat > maxLat) {
          maxLatPt = pt
          maxLat = pt.lat
        }
        if (minLat === false || pt.lat < minLat) {
          minLatPt = pt
          minLat = pt.lat
        }
        if (maxLng === false || pt.lng > maxLng) {
          maxLngPt = pt
          maxLng = pt.lng
        }
        if (minLng === false || pt.lng < minLng) {
          minLngPt = pt
          minLng = pt.lng
        }
      }

      if (minLat !== maxLat) {
        minPt = minLatPt
        maxPt = maxLatPt
      } else {
        minPt = minLngPt
        maxPt = maxLngPt
      }

      var ch = [].concat(this.buildConvexHull([minPt, maxPt], latLngs), this.buildConvexHull([maxPt, minPt], latLngs))
      return ch
    },
  }
})()

L.MarkerCluster.include({
  getConvexHull: function () {
    var childMarkers = this.getAllChildMarkers(),
      points = [],
      p,
      i

    for (i = childMarkers.length - 1; i >= 0; i--) {
      p = childMarkers[i].getLatLng()
      points.push(p)
    }

    return L.QuickHull.getConvexHull(points)
  },
})

//This code is 100% based on https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
//Huge thanks to jawj for implementing it first to make my job easy :-)

L.MarkerCluster.include({
  _2PI: Math.PI * 2,
  _circleFootSeparation: 25, //related to circumference of circle
  _circleStartAngle: Math.PI / 6,

  _spiralFootSeparation: 28, //related to size of spiral (experiment!)
  _spiralLengthStart: 11,
  _spiralLengthFactor: 5,

  _circleSpiralSwitchover: 9, //show spiral instead of circle from this marker count upwards.
  // 0 -> always spiral; Infinity -> always circle

  spiderfy: function () {
    if (this._group._spiderfied === this || this._group._inZoomAnimation) {
      return
    }

    var childMarkers = this.getAllChildMarkers(),
      group = this._group,
      map = group._map,
      center = map.latLngToLayerPoint(this._latlng),
      positions

    this._group._unspiderfy()
    this._group._spiderfied = this

    //TODO Maybe: childMarkers order by distance to center

    if (childMarkers.length >= this._circleSpiralSwitchover) {
      positions = this._generatePointsSpiral(childMarkers.length, center)
    } else {
      center.y += 10 // Otherwise circles look wrong => hack for standard blue icon, renders differently for other icons.
      positions = this._generatePointsCircle(childMarkers.length, center)
    }

    this._animationSpiderfy(childMarkers, positions)
  },

  unspiderfy: function (zoomDetails) {
    /// <param Name="zoomDetails">Argument from zoomanim if being called in a zoom animation or null otherwise</param>
    if (this._group._inZoomAnimation) {
      return
    }
    this._animationUnspiderfy(zoomDetails)

    this._group._spiderfied = null
  },

  _generatePointsCircle: function (count, centerPt) {
    var circumference = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + count),
      legLength = circumference / this._2PI, //radius from circumference
      angleStep = this._2PI / count,
      res = [],
      i,
      angle

    res.length = count

    for (i = count - 1; i >= 0; i--) {
      angle = this._circleStartAngle + i * angleStep
      res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round()
    }

    return res
  },

  _generatePointsSpiral: function (count, centerPt) {
    var spiderfyDistanceMultiplier = this._group.options.spiderfyDistanceMultiplier,
      legLength = spiderfyDistanceMultiplier * this._spiralLengthStart,
      separation = spiderfyDistanceMultiplier * this._spiralFootSeparation,
      lengthFactor = spiderfyDistanceMultiplier * this._spiralLengthFactor * this._2PI,
      angle = 0,
      res = [],
      i

    res.length = count

    // Higher index, closer position to cluster center.
    for (i = count - 1; i >= 0; i--) {
      angle += separation / legLength + i * 0.0005
      res[i] = new L.Point(centerPt.x + legLength * Math.cos(angle), centerPt.y + legLength * Math.sin(angle))._round()
      legLength += lengthFactor / angle
    }
    return res
  },

  _noanimationUnspiderfy: function () {
    var group = this._group,
      map = group._map,
      fg = group._featureGroup,
      childMarkers = this.getAllChildMarkers(),
      m,
      i

    group._ignoreMove = true

    this.setOpacity(1)
    for (i = childMarkers.length - 1; i >= 0; i--) {
      m = childMarkers[i]

      fg.removeLayer(m)

      if (m._preSpiderfyLatlng) {
        m.setLatLng(m._preSpiderfyLatlng)
        delete m._preSpiderfyLatlng
      }
      if (m.setZIndexOffset) {
        m.setZIndexOffset(0)
      }

      if (m._spiderLeg) {
        map.removeLayer(m._spiderLeg)
        delete m._spiderLeg
      }
    }

    group.fire('unspiderfied', {
      cluster: this,
      markers: childMarkers,
    })
    group._ignoreMove = false
    group._spiderfied = null
  },
})

//Non Animated versions of everything
L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
  _animationSpiderfy: function (childMarkers, positions) {
    var group = this._group,
      map = group._map,
      fg = group._featureGroup,
      legOptions = this._group.options.spiderLegPolylineOptions,
      i,
      m,
      leg,
      newPos

    group._ignoreMove = true

    // Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
    // The reverse order trick no longer improves performance on modern browsers.
    for (i = 0; i < childMarkers.length; i++) {
      newPos = map.layerPointToLatLng(positions[i])
      m = childMarkers[i]

      // Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.
      leg = new L.Polyline([this._latlng, newPos], legOptions)
      map.addLayer(leg)
      m._spiderLeg = leg

      // Now add the marker.
      m._preSpiderfyLatlng = m._latlng
      m.setLatLng(newPos)
      if (m.setZIndexOffset) {
        m.setZIndexOffset(1000000) //Make these appear on top of EVERYTHING
      }

      fg.addLayer(m)
    }
    this.setOpacity(0.3)

    group._ignoreMove = false
    group.fire('spiderfied', {
      cluster: this,
      markers: childMarkers,
    })
  },

  _animationUnspiderfy: function () {
    this._noanimationUnspiderfy()
  },
})

//Animated versions here
L.MarkerCluster.include({
  _animationSpiderfy: function (childMarkers, positions) {
    var me = this,
      group = this._group,
      map = group._map,
      fg = group._featureGroup,
      thisLayerLatLng = this._latlng,
      thisLayerPos = map.latLngToLayerPoint(thisLayerLatLng),
      svg = L.Path.SVG,
      legOptions = L.extend({}, this._group.options.spiderLegPolylineOptions), // Copy the options so that we can modify them for animation.
      finalLegOpacity = legOptions.opacity,
      i,
      m,
      leg,
      legPath,
      legLength,
      newPos

    if (finalLegOpacity === undefined) {
      finalLegOpacity = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity
    }

    if (svg) {
      // If the initial opacity of the spider leg is not 0 then it appears before the animation starts.
      legOptions.opacity = 0

      // Add the class for CSS transitions.
      legOptions.className = (legOptions.className || '') + ' leaflet-cluster-spider-leg'
    } else {
      // Make sure we have a defined opacity.
      legOptions.opacity = finalLegOpacity
    }

    group._ignoreMove = true

    // Add markers and spider legs to map, hidden at our center point.
    // Traverse in ascending order to make sure that inner circleMarkers are on top of further legs. Normal markers are re-ordered by newPosition.
    // The reverse order trick no longer improves performance on modern browsers.
    for (i = 0; i < childMarkers.length; i++) {
      m = childMarkers[i]

      newPos = map.layerPointToLatLng(positions[i])

      // Add the leg before the marker, so that in case the latter is a circleMarker, the leg is behind it.
      leg = new L.Polyline([thisLayerLatLng, newPos], legOptions)
      map.addLayer(leg)
      m._spiderLeg = leg

      // Explanations: https://jakearchibald.com/2013/animated-line-drawing-svg/
      // In our case the transition property is declared in the CSS file.
      if (svg) {
        legPath = leg._path
        legLength = legPath.getTotalLength() + 0.1 // Need a small extra length to avoid remaining dot in Firefox.
        legPath.style.strokeDasharray = legLength // Just 1 length is enough, it will be duplicated.
        legPath.style.strokeDashoffset = legLength
      }

      // If it is a marker, add it now and we'll animate it out
      if (m.setZIndexOffset) {
        m.setZIndexOffset(1000000) // Make normal markers appear on top of EVERYTHING
      }
      if (m.clusterHide) {
        m.clusterHide()
      }

      // Vectors just get immediately added
      fg.addLayer(m)

      if (m._setPos) {
        m._setPos(thisLayerPos)
      }
    }

    group._forceLayout()
    group._animationStart()

    // Reveal markers and spider legs.
    for (i = childMarkers.length - 1; i >= 0; i--) {
      newPos = map.layerPointToLatLng(positions[i])
      m = childMarkers[i]

      //Move marker to new position
      m._preSpiderfyLatlng = m._latlng
      m.setLatLng(newPos)

      if (m.clusterShow) {
        m.clusterShow()
      }

      // Animate leg (animation is actually delegated to CSS transition).
      if (svg) {
        leg = m._spiderLeg
        legPath = leg._path
        legPath.style.strokeDashoffset = 0
        //legPath.style.strokeOpacity = finalLegOpacity;
        leg.setStyle({ opacity: finalLegOpacity })
      }
    }
    this.setOpacity(0.3)

    group._ignoreMove = false

    setTimeout(function () {
      group._animationEnd()
      group.fire('spiderfied', {
        cluster: me,
        markers: childMarkers,
      })
    }, 200)
  },

  _animationUnspiderfy: function (zoomDetails) {
    var me = this,
      group = this._group,
      map = group._map,
      fg = group._featureGroup,
      thisLayerPos = zoomDetails
        ? map._latLngToNewLayerPoint(this._latlng, zoomDetails.zoom, zoomDetails.center)
        : map.latLngToLayerPoint(this._latlng),
      childMarkers = this.getAllChildMarkers(),
      svg = L.Path.SVG,
      m,
      i,
      leg,
      legPath,
      legLength,
      nonAnimatable

    group._ignoreMove = true
    group._animationStart()

    //Make us visible and bring the child markers back in
    this.setOpacity(1)
    for (i = childMarkers.length - 1; i >= 0; i--) {
      m = childMarkers[i]

      //Marker was added to us after we were spiderfied
      if (!m._preSpiderfyLatlng) {
        continue
      }

      //Fix up the location to the real one
      m.setLatLng(m._preSpiderfyLatlng)
      delete m._preSpiderfyLatlng

      //Hack override the location to be our center
      nonAnimatable = true
      if (m._setPos) {
        m._setPos(thisLayerPos)
        nonAnimatable = false
      }
      if (m.clusterHide) {
        m.clusterHide()
        nonAnimatable = false
      }
      if (nonAnimatable) {
        fg.removeLayer(m)
      }

      // Animate the spider leg back in (animation is actually delegated to CSS transition).
      if (svg) {
        leg = m._spiderLeg
        legPath = leg._path
        legLength = legPath.getTotalLength() + 0.1
        legPath.style.strokeDashoffset = legLength
        leg.setStyle({ opacity: 0 })
      }
    }

    group._ignoreMove = false

    setTimeout(function () {
      //If we have only <= one child left then that marker will be shown on the map so don't remove it!
      var stillThereChildCount = 0
      for (i = childMarkers.length - 1; i >= 0; i--) {
        m = childMarkers[i]
        if (m._spiderLeg) {
          stillThereChildCount++
        }
      }

      for (i = childMarkers.length - 1; i >= 0; i--) {
        m = childMarkers[i]

        if (!m._spiderLeg) {
          //Has already been unspiderfied
          continue
        }

        if (m.clusterShow) {
          m.clusterShow()
        }
        if (m.setZIndexOffset) {
          m.setZIndexOffset(0)
        }

        if (stillThereChildCount > 1) {
          fg.removeLayer(m)
        }

        map.removeLayer(m._spiderLeg)
        delete m._spiderLeg
      }
      group._animationEnd()
      group.fire('unspiderfied', {
        cluster: me,
        markers: childMarkers,
      })
    }, 200)
  },
})

L.MarkerClusterGroup.include({
  //The MarkerCluster currently spiderfied (if any)
  _spiderfied: null,

  unspiderfy: function () {
    this._unspiderfy.apply(this, arguments)
  },

  _spiderfierOnAdd: function () {
    this._map.on('click', this._unspiderfyWrapper, this)

    if (this._map.options.zoomAnimation) {
      this._map.on('zoomstart', this._unspiderfyZoomStart, this)
    }
    //Browsers without zoomAnimation or a big zoom don't fire zoomstart
    this._map.on('zoomend', this._noanimationUnspiderfy, this)

    if (!L.Browser.touch) {
      this._map.getRenderer(this)
      //Needs to happen in the pageload, not after, or animations don't work in webkit
      //  http://stackoverflow.com/questions/8455200/svg-animate-with-dynamically-added-elements
      //Disable on touch browsers as the animation messes up on a touch zoom and isn't very noticable
    }
  },

  _spiderfierOnRemove: function () {
    this._map.off('click', this._unspiderfyWrapper, this)
    this._map.off('zoomstart', this._unspiderfyZoomStart, this)
    this._map.off('zoomanim', this._unspiderfyZoomAnim, this)
    this._map.off('zoomend', this._noanimationUnspiderfy, this)

    //Ensure that markers are back where they should be
    // Use no animation to avoid a sticky leaflet-cluster-anim class on mapPane
    this._noanimationUnspiderfy()
  },

  //On zoom start we add a zoomanim handler so that we are guaranteed to be last (after markers are animated)
  //This means we can define the animation they do rather than Markers doing an animation to their actual location
  _unspiderfyZoomStart: function () {
    if (!this._map) {
      //May have been removed from the map by a zoomEnd handler
      return
    }

    this._map.on('zoomanim', this._unspiderfyZoomAnim, this)
  },

  _unspiderfyZoomAnim: function (zoomDetails) {
    //Wait until the first zoomanim after the user has finished touch-zooming before running the animation
    if (L.DomUtil.hasClass(this._map._mapPane, 'leaflet-touching')) {
      return
    }

    this._map.off('zoomanim', this._unspiderfyZoomAnim, this)
    this._unspiderfy(zoomDetails)
  },

  _unspiderfyWrapper: function () {
    /// <summary>_unspiderfy but passes no arguments</summary>
    this._unspiderfy()
  },

  _unspiderfy: function (zoomDetails) {
    if (this._spiderfied) {
      this._spiderfied.unspiderfy(zoomDetails)
    }
  },

  _noanimationUnspiderfy: function () {
    if (this._spiderfied) {
      this._spiderfied._noanimationUnspiderfy()
    }
  },

  //If the given layer is currently being spiderfied then we unspiderfy it so it isn't on the map anymore etc
  _unspiderfyLayer: function (layer) {
    if (layer._spiderLeg) {
      this._featureGroup.removeLayer(layer)

      if (layer.clusterShow) {
        layer.clusterShow()
      }
      //Position will be fixed up immediately in _animationUnspiderfy
      if (layer.setZIndexOffset) {
        layer.setZIndexOffset(0)
      }

      this._map.removeLayer(layer._spiderLeg)
      delete layer._spiderLeg
    }
  },
})

/**
 * Adds 1 public method to MCG and 1 to L.Marker to facilitate changing
 * markers' icon options and refreshing their icon and their parent clusters
 * accordingly (case where their iconCreateFunction uses data of childMarkers
 * to make up the cluster icon).
 */

L.MarkerClusterGroup.include({
  /**
   * Updates the icon of all clusters which are parents of the given marker(s).
   * In singleMarkerMode, also updates the given marker(s) icon.
   * @param layers L.MarkerClusterGroup|L.LayerGroup|Array(L.Marker)|Map(L.Marker)|
   * L.MarkerCluster|L.Marker (optional) list of markers (or single marker) whose parent
   * clusters need to be updated. If not provided, retrieves all child markers of this.
   * @returns {L.MarkerClusterGroup}
   */
  refreshClusters: function (layers) {
    if (!layers) {
      layers = this._topClusterLevel.getAllChildMarkers()
    } else if (layers instanceof L.MarkerClusterGroup) {
      layers = layers._topClusterLevel.getAllChildMarkers()
    } else if (layers instanceof L.LayerGroup) {
      layers = layers._layers
    } else if (layers instanceof L.MarkerCluster) {
      layers = layers.getAllChildMarkers()
    } else if (layers instanceof L.Marker) {
      layers = [layers]
    } // else: must be an Array(L.Marker)|Map(L.Marker)
    this._flagParentsIconsNeedUpdate(layers)
    this._refreshClustersIcons()

    // In case of singleMarkerMode, also re-draw the markers.
    if (this.options.singleMarkerMode) {
      this._refreshSingleMarkerModeMarkers(layers)
    }

    return this
  },

  /**
   * Simply flags all parent clusters of the given markers as having a "dirty" icon.
   * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
   * @private
   */
  _flagParentsIconsNeedUpdate: function (layers) {
    var id, parent

    // Assumes layers is an Array or an Object whose prototype is non-enumerable.
    for (id in layers) {
      // Flag parent clusters' icon as "dirty", all the way up.
      // Dumb process that flags multiple times upper parents, but still
      // much more efficient than trying to be smart and make short lists,
      // at least in the case of a hierarchy following a power law:
      // http://jsperf.com/flag-nodes-in-power-hierarchy/2
      parent = layers[id].__parent
      while (parent) {
        parent._iconNeedsUpdate = true
        parent = parent.__parent
      }
    }
  },

  /**
   * Refreshes the icon of all "dirty" visible clusters.
   * Non-visible "dirty" clusters will be updated when they are added to the map.
   * @private
   */
  _refreshClustersIcons: function () {
    this._featureGroup.eachLayer(function (c) {
      if (c instanceof L.MarkerCluster && c._iconNeedsUpdate) {
        c._updateIcon()
      }
    })
  },

  /**
   * Re-draws the icon of the supplied markers.
   * To be used in singleMarkerMode only.
   * @param layers Array(L.Marker)|Map(L.Marker) list of markers.
   * @private
   */
  _refreshSingleMarkerModeMarkers: function (layers) {
    var id, layer

    for (id in layers) {
      layer = layers[id]

      // Make sure we do not override markers that do not belong to THIS group.
      if (this.hasLayer(layer)) {
        // Need to re-create the icon first, then re-draw the marker.
        layer.setIcon(this._overrideMarkerIcon(layer))
      }
    }
  },
})

L.Marker.include({
  /**
   * Updates the given options in the marker's icon and refreshes the marker.
   * @param options map object of icon options.
   * @param directlyRefreshClusters boolean (optional) true to trigger
   * MCG.refreshClustersOf() right away with this single marker.
   * @returns {L.Marker}
   */
  refreshIconOptions: function (options, directlyRefreshClusters) {
    var icon = this.options.icon

    L.setOptions(icon, options)

    this.setIcon(icon)

    // Shortcut to refresh the associated MCG clusters right away.
    // To be used when refreshing a single marker.
    // Otherwise, better use MCG.refreshClusters() once at the end with
    // the list of modified markers.
    if (directlyRefreshClusters && this.__parent) {
      this.__parent._group.refreshClusters(this)
    }

    return this
  },
})
// FINE MARKERCLUSTER

L.NonTiledLayer = L.Layer.extend({
  includes: L.Evented,
  options: {
    attribution: '',
    opacity: 1.0,
    zIndex: undefined,
    minZoom: 0,
    maxZoom: 18,
    pointerEvents: null,
    errorImageUrl: 'data:image/gif;base64,R0lGODlhAQABAHAAACH5BAUAAAAALAAAAAABAAEAAAICRAEAOw==', //1px transparent GIF
    bounds: L.latLngBounds([-85.05, -180], [85.05, 180]),
  },
  url: '',

  // override this method in the inherited class
  //getImageUrl: function (world1, world2, width, height) {},
  //getImageUrlAsync: function (world1, world2, width, height, f) {},

  initialize: function (options) {
    L.setOptions(this, options)
  },

  onAdd: function (map) {
    this._map = map

    if (!this._div) {
      this._div = L.DomUtil.create('div', 'leaflet-image-layer')
      if (this.options.pointerEvents) {
        this._div.style['pointer-events'] = this.options.pointerEvents
      }
      if (this.options.zIndex !== undefined) {
        this._div.style.zIndex = this.options.zIndex
      }
      if (this.options.opacity !== undefined) {
        this._div.style.opacity = this.options.opacity
      }
    }

    this.getPane().appendChild(this._div)

    this._bufferImage = this._initImage()
    this._currentImage = this._initImage()

    this._update()
  },

  onRemove: function (map) {
    this.getPane().removeChild(this._div)

    this._div.removeChild(this._bufferImage)
    this._div.removeChild(this._currentImage)
  },

  addTo: function (map) {
    map.addLayer(this)
    return this
  },

  getEvents: function () {
    var events = {
      moveend: this._update,
      zoom: this._viewreset,
    }

    if (this._zoomAnimated) {
      events.zoomanim = this._animateZoom
    }

    return events
  },

  getElement: function () {
    return this._div
  },

  setOpacity: function (opacity) {
    this.options.opacity = opacity
    if (this._div) {
      L.DomUtil.setOpacity(this._div, this.options.opacity)
    }
    return this
  },

  setZIndex: function (zIndex) {
    if (zIndex) {
      this.options.zIndex = zIndex
      if (this._div) {
        this._div.style.zIndex = zIndex
      }
    }
    return this
  },

  // TODO remove bringToFront/bringToBack duplication from TileLayer/Path
  bringToFront: function () {
    if (this._div) {
      this._pane.appendChild(this._div)
    }
    return this
  },

  bringToBack: function () {
    if (this._div) {
      this._pane.insertBefore(this._div, this._pane.firstChild)
    }
    return this
  },

  getAttribution: function () {
    return this.options.attribution
  },

  _initImage: function (_image) {
    var _image = L.DomUtil.create('img', 'leaflet-image-layer')

    this._div.appendChild(_image)

    if (this._map.options.zoomAnimation && L.Browser.any3d) {
      L.DomUtil.addClass(_image, 'leaflet-zoom-animated')
    } else {
      L.DomUtil.addClass(_image, 'leaflet-zoom-hide')
    }

    //TODO createImage util method to remove duplication
    L.extend(_image, {
      galleryimg: 'no',
      onselectstart: L.Util.falseFn,
      onmousemove: L.Util.falseFn,
      onload: L.bind(this._onImageLoad, this),
      onerror: L.bind(this._onImageError, this),
    })

    return _image
  },

  redraw: function () {
    if (this._map) {
      this._update()
    }
    return this
  },

  _animateZoom: function (e) {
    if (this._currentImage._bounds) {
      this._animateImage(this._currentImage, e)
    }
    if (this._bufferImage._bounds) {
      this._animateImage(this._bufferImage, e)
    }
  },

  _animateImage: function (image, e) {
    var scale = this._map.getZoomScale(e.zoom),
      offset = this._map._latLngToNewLayerPoint(image._bounds.getNorthWest(), e.zoom, e.center)

    L.DomUtil.setTransform(image, offset, scale)
  },

  _resetImage: function (image) {
    var bounds = new L.Bounds(this._map.latLngToLayerPoint(image._bounds.getNorthWest()), this._map.latLngToLayerPoint(image._bounds.getSouthEast())),
      size = bounds.getSize()

    L.DomUtil.setPosition(image, bounds.min)

    image.style.width = size.x + 'px'
    image.style.height = size.y + 'px'
  },

  _getClippedBounds: function () {
    var wgsBounds = this._map.getBounds()

    // truncate bounds to valid wgs bounds
    var mSouth = wgsBounds.getSouth()
    var mNorth = wgsBounds.getNorth()
    var mWest = wgsBounds.getWest()
    var mEast = wgsBounds.getEast()

    var lSouth = this.options.bounds.getSouth()
    var lNorth = this.options.bounds.getNorth()
    var lWest = this.options.bounds.getWest()
    var lEast = this.options.bounds.getEast()

    //mWest = (mWest + 180) % 360 - 180;
    if (mSouth < lSouth) {
      mSouth = lSouth
    }
    if (mNorth > lNorth) {
      mNorth = lNorth
    }
    if (mWest < lWest) {
      mWest = lWest
    }
    if (mEast > lEast) {
      mEast = lEast
    }

    var world1 = new L.LatLng(mNorth, mWest)
    var world2 = new L.LatLng(mSouth, mEast)

    return new L.LatLngBounds(world1, world2)
  },

  _viewreset: function () {
    if (this._bufferImage._bounds) {
      this._resetImage(this._bufferImage)
    }
    if (this._currentImage._bounds) {
      this._resetImage(this._currentImage)
    }
  },

  _update: function () {
    if (this._map.getZoom() < this.options.minZoom || this._map.getZoom() > this.options.maxZoom) {
      this._div.style.visibility = 'hidden'
      return
    } else {
      this._div.style.visibility = 'visible'
    }

    if (this._bufferImage._bounds) {
      this._resetImage(this._bufferImage)
    }

    var bounds = this._getClippedBounds()

    // re-project to corresponding pixel bounds
    var pix1 = this._map.latLngToContainerPoint(bounds.getNorthWest())
    var pix2 = this._map.latLngToContainerPoint(bounds.getSouthEast())

    // get pixel size
    var width = pix2.x - pix1.x
    var height = pix2.y - pix1.y

    // resulting image is too small
    if (width < 32 || height < 32) {
      return
    }

    this._currentImage._bounds = bounds

    this._resetImage(this._currentImage)

    var i = this._currentImage
    if (this.getImageUrl) {
      i.src = this.getImageUrl(bounds.getNorthWest(), bounds.getSouthEast(), width, height)
    } else {
      this.getImageUrlAsync(bounds.getNorthWest(), bounds.getSouthEast(), width, height, function (url, tag) {
        i.src = url
        i.tag = tag
      })
    }

    this.url = i.src

    L.DomUtil.setOpacity(this._currentImage, 0)
  },
  _onImageError: function (e) {
    this.fire('error', e)
    L.DomUtil.addClass(e.target, 'invalid')
    if (e.target.src !== this.options.errorImageUrl) {
      // prevent error loop if error image is not valid
      e.target.src = this.options.errorImageUrl
      this._onImageDone(false, e)
    }
  },
  _onImageLoad: function (e) {
    if (e.target.src !== this.options.errorImageUrl) {
      L.DomUtil.removeClass(e.target, 'invalid')
      if (e.target.src !== this.url) {
        // obsolete image
        return
      }
      this._onImageDone(true, e)
    }
  },
  _onImageDone: function (success, e) {
    L.DomUtil.setOpacity(this._currentImage, 1)
    L.DomUtil.setOpacity(this._bufferImage, 0)

    if (this._addInteraction) {
      this._addInteraction(this._currentImage.tag)
    }

    var tmp = this._bufferImage
    this._bufferImage = this._currentImage
    this._currentImage = tmp
    this.fire('load', e)
  },
})

L.nonTiledLayer = function () {
  return new L.NonTiledLayer()
}

/*
 * L.NonTiledLayer.WMS is used for putting WMS non tiled layers on the map.
 */
L.NonTiledLayer.WMS = L.NonTiledLayer.extend({
  defaultWmsParams: {
    service: 'WMS',
    request: 'GetMap',
    version: '1.1.1',
    layers: '',
    styles: '',
    format: 'image/jpeg',
    transparent: false,
  },

  options: {
    crs: null,
    uppercase: false,
  },

  initialize: function (url, options) {
    // (String, Object)
    this._wmsUrl = url

    var wmsParams = L.extend({}, this.defaultWmsParams)

    // all keys that are not NonTiledLayer options go to WMS params
    for (var i in options) {
      if (!L.NonTiledLayer.prototype.options.hasOwnProperty(i) && !L.Layer.prototype.options.hasOwnProperty(i)) {
        wmsParams[i] = options[i]
      }
    }

    this.wmsParams = wmsParams

    L.setOptions(this, options)
  },

  onAdd: function (map) {
    this._crs = this.options.crs || map.options.crs
    this._wmsVersion = parseFloat(this.wmsParams.version)

    var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs'
    this.wmsParams[projectionKey] = this._crs.code

    L.NonTiledLayer.prototype.onAdd.call(this, map)
  },

  getImageUrl: function (world1, world2, width, height) {
    var wmsParams = this.wmsParams
    wmsParams.width = width
    wmsParams.height = height

    var nw = this._crs.project(world1)
    var se = this._crs.project(world2)

    var url = this._wmsUrl

    var bbox = (bbox = (this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ? [se.y, nw.x, nw.y, se.x] : [nw.x, se.y, se.x, nw.y]).join(','))

    return url + L.Util.getParamString(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox
  },

  setParams: function (params, noRedraw) {
    L.extend(this.wmsParams, params)

    if (!noRedraw) {
      this.redraw()
    }

    return this
  },
})

L.nonTiledLayer.wms = function (url, options) {
  return new L.NonTiledLayer.WMS(url, options)
}
;(L.controlCredits = function (t) {
  return new L.CreditsControl(t)
}),
  (L.CreditsControl = L.Control.extend({
    initialize: function (t) {
      L.setOptions(this, t)
    },
    onAdd: function (t) {
      this._map = t
      var i = L.DomUtil.create('div', 'leaflet-credits-control', i)
      var o = L.DomUtil.create('img', '', i)
      o.src = this.options.image
      return (this._container = i)
    },
  }))
