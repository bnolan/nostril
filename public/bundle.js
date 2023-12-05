(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var o;
  var r;
  var f;
  var e;
  var c = {};
  var s = [];
  var a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var h = Array.isArray;
  function v(n2, l4) {
    for (var u3 in l4)
      n2[u3] = l4[u3];
    return n2;
  }
  function p(n2) {
    var l4 = n2.parentNode;
    l4 && l4.removeChild(n2);
  }
  function y(l4, u3, t3) {
    var i3, o3, r3, f3 = {};
    for (r3 in u3)
      "key" == r3 ? i3 = u3[r3] : "ref" == r3 ? o3 = u3[r3] : f3[r3] = u3[r3];
    if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l4 && null != l4.defaultProps)
      for (r3 in l4.defaultProps)
        void 0 === f3[r3] && (f3[r3] = l4.defaultProps[r3]);
    return d(l4, f3, i3, o3, null);
  }
  function d(n2, t3, i3, o3, r3) {
    var f3 = { type: n2, props: t3, key: i3, ref: o3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r3 ? ++u : r3 };
    return null == r3 && null != l.vnode && l.vnode(f3), f3;
  }
  function k(n2) {
    return n2.children;
  }
  function b(n2, l4) {
    this.props = n2, this.context = l4;
  }
  function g(n2, l4) {
    if (null == l4)
      return n2.__ ? g(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l4 < n2.__k.length; l4++)
      if (null != (u3 = n2.__k[l4]) && null != u3.__e)
        return u3.__e;
    return "function" == typeof n2.type ? g(n2) : null;
  }
  function m(n2) {
    var l4, u3;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l4 = 0; l4 < n2.__k.length; l4++)
        if (null != (u3 = n2.__k[l4]) && null != u3.__e) {
          n2.__e = n2.__c.base = u3.__e;
          break;
        }
      return m(n2);
    }
  }
  function w(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !x.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(x);
  }
  function x() {
    var n2, l4, u3, t3, o3, r3, e3, c4, s3;
    for (i.sort(f); n2 = i.shift(); )
      n2.__d && (l4 = i.length, t3 = void 0, o3 = void 0, r3 = void 0, c4 = (e3 = (u3 = n2).__v).__e, (s3 = u3.__P) && (t3 = [], o3 = [], (r3 = v({}, e3)).__v = e3.__v + 1, L(s3, e3, r3, u3.__n, void 0 !== s3.ownerSVGElement, null != e3.__h ? [c4] : null, t3, null == c4 ? g(e3) : c4, e3.__h, o3), M(t3, e3, o3), e3.__e != c4 && m(e3)), i.length > l4 && i.sort(f));
    x.__r = 0;
  }
  function P(n2, l4, u3, t3, i3, o3, r3, f3, e3, a4, v4) {
    var p4, y3, _2, b4, m4, w4, x2, P2, C2, H2 = 0, I3 = t3 && t3.__k || s, T2 = I3.length, j3 = T2, z2 = l4.length;
    for (u3.__k = [], p4 = 0; p4 < z2; p4++)
      null != (b4 = u3.__k[p4] = null == (b4 = l4[p4]) || "boolean" == typeof b4 || "function" == typeof b4 ? null : "string" == typeof b4 || "number" == typeof b4 || "bigint" == typeof b4 ? d(null, b4, null, null, b4) : h(b4) ? d(k, { children: b4 }, null, null, null) : b4.__b > 0 ? d(b4.type, b4.props, b4.key, b4.ref ? b4.ref : null, b4.__v) : b4) ? (b4.__ = u3, b4.__b = u3.__b + 1, -1 === (P2 = A(b4, I3, x2 = p4 + H2, j3)) ? _2 = c : (_2 = I3[P2] || c, I3[P2] = void 0, j3--), L(n2, b4, _2, i3, o3, r3, f3, e3, a4, v4), m4 = b4.__e, (y3 = b4.ref) && _2.ref != y3 && (_2.ref && O(_2.ref, null, b4), v4.push(y3, b4.__c || m4, b4)), null != m4 && (null == w4 && (w4 = m4), (C2 = _2 === c || null === _2.__v) ? -1 == P2 && H2-- : P2 !== x2 && (P2 === x2 + 1 ? H2++ : P2 > x2 ? j3 > z2 - x2 ? H2 += P2 - x2 : H2-- : H2 = P2 < x2 && P2 == x2 - 1 ? P2 - x2 : 0), x2 = p4 + H2, "function" != typeof b4.type || P2 === x2 && _2.__k !== b4.__k ? "function" == typeof b4.type || P2 === x2 && !C2 ? void 0 !== b4.__d ? (e3 = b4.__d, b4.__d = void 0) : e3 = m4.nextSibling : e3 = S(n2, m4, e3) : e3 = $(b4, e3, n2), "function" == typeof u3.type && (u3.__d = e3))) : (_2 = I3[p4]) && null == _2.key && _2.__e && (_2.__e == e3 && (e3 = g(_2)), q(_2, _2, false), I3[p4] = null);
    for (u3.__e = w4, p4 = T2; p4--; )
      null != I3[p4] && ("function" == typeof u3.type && null != I3[p4].__e && I3[p4].__e == u3.__d && (u3.__d = I3[p4].__e.nextSibling), q(I3[p4], I3[p4]));
  }
  function $(n2, l4, u3) {
    for (var t3, i3 = n2.__k, o3 = 0; i3 && o3 < i3.length; o3++)
      (t3 = i3[o3]) && (t3.__ = n2, l4 = "function" == typeof t3.type ? $(t3, l4, u3) : S(u3, t3.__e, l4));
    return l4;
  }
  function C(n2, l4) {
    return l4 = l4 || [], null == n2 || "boolean" == typeof n2 || (h(n2) ? n2.some(function(n3) {
      C(n3, l4);
    }) : l4.push(n2)), l4;
  }
  function S(n2, l4, u3) {
    return null == u3 || u3.parentNode !== n2 ? n2.insertBefore(l4, null) : l4 == u3 && null != l4.parentNode || n2.insertBefore(l4, u3), l4.nextSibling;
  }
  function A(n2, l4, u3, t3) {
    var i3 = n2.key, o3 = n2.type, r3 = u3 - 1, f3 = u3 + 1, e3 = l4[u3];
    if (null === e3 || e3 && i3 == e3.key && o3 === e3.type)
      return u3;
    if (t3 > (null != e3 ? 1 : 0))
      for (; r3 >= 0 || f3 < l4.length; ) {
        if (r3 >= 0) {
          if ((e3 = l4[r3]) && i3 == e3.key && o3 === e3.type)
            return r3;
          r3--;
        }
        if (f3 < l4.length) {
          if ((e3 = l4[f3]) && i3 == e3.key && o3 === e3.type)
            return f3;
          f3++;
        }
      }
    return -1;
  }
  function H(n2, l4, u3, t3, i3) {
    var o3;
    for (o3 in u3)
      "children" === o3 || "key" === o3 || o3 in l4 || T(n2, o3, null, u3[o3], t3);
    for (o3 in l4)
      i3 && "function" != typeof l4[o3] || "children" === o3 || "key" === o3 || "value" === o3 || "checked" === o3 || u3[o3] === l4[o3] || T(n2, o3, l4[o3], u3[o3], t3);
  }
  function I(n2, l4, u3) {
    "-" === l4[0] ? n2.setProperty(l4, null == u3 ? "" : u3) : n2[l4] = null == u3 ? "" : "number" != typeof u3 || a.test(l4) ? u3 : u3 + "px";
  }
  function T(n2, l4, u3, t3, i3) {
    var o3;
    n:
      if ("style" === l4)
        if ("string" == typeof u3)
          n2.style.cssText = u3;
        else {
          if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3)
            for (l4 in t3)
              u3 && l4 in u3 || I(n2.style, l4, "");
          if (u3)
            for (l4 in u3)
              t3 && u3[l4] === t3[l4] || I(n2.style, l4, u3[l4]);
        }
      else if ("o" === l4[0] && "n" === l4[1])
        o3 = l4 !== (l4 = l4.replace(/(PointerCapture)$|Capture$/, "$1")), l4 = l4.toLowerCase() in n2 ? l4.toLowerCase().slice(2) : l4.slice(2), n2.l || (n2.l = {}), n2.l[l4 + o3] = u3, u3 ? t3 || n2.addEventListener(l4, o3 ? z : j, o3) : n2.removeEventListener(l4, o3 ? z : j, o3);
      else if ("dangerouslySetInnerHTML" !== l4) {
        if (i3)
          l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l4 && "height" !== l4 && "href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && "rowSpan" !== l4 && "colSpan" !== l4 && l4 in n2)
          try {
            n2[l4] = null == u3 ? "" : u3;
            break n;
          } catch (n3) {
          }
        "function" == typeof u3 || (null == u3 || false === u3 && "-" !== l4[4] ? n2.removeAttribute(l4) : n2.setAttribute(l4, u3));
      }
  }
  function j(n2) {
    return this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function z(n2) {
    return this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function L(n2, u3, t3, i3, o3, r3, f3, e3, c4, s3) {
    var a4, p4, y3, d3, _2, g4, m4, w4, x2, $3, C2, S2, A2, H2, I3, T2 = u3.type;
    if (void 0 !== u3.constructor)
      return null;
    null != t3.__h && (c4 = t3.__h, e3 = u3.__e = t3.__e, u3.__h = null, r3 = [e3]), (a4 = l.__b) && a4(u3);
    n:
      if ("function" == typeof T2)
        try {
          if (w4 = u3.props, x2 = (a4 = T2.contextType) && i3[a4.__c], $3 = a4 ? x2 ? x2.props.value : a4.__ : i3, t3.__c ? m4 = (p4 = u3.__c = t3.__c).__ = p4.__E : ("prototype" in T2 && T2.prototype.render ? u3.__c = p4 = new T2(w4, $3) : (u3.__c = p4 = new b(w4, $3), p4.constructor = T2, p4.render = B), x2 && x2.sub(p4), p4.props = w4, p4.state || (p4.state = {}), p4.context = $3, p4.__n = i3, y3 = p4.__d = true, p4.__h = [], p4._sb = []), null == p4.__s && (p4.__s = p4.state), null != T2.getDerivedStateFromProps && (p4.__s == p4.state && (p4.__s = v({}, p4.__s)), v(p4.__s, T2.getDerivedStateFromProps(w4, p4.__s))), d3 = p4.props, _2 = p4.state, p4.__v = u3, y3)
            null == T2.getDerivedStateFromProps && null != p4.componentWillMount && p4.componentWillMount(), null != p4.componentDidMount && p4.__h.push(p4.componentDidMount);
          else {
            if (null == T2.getDerivedStateFromProps && w4 !== d3 && null != p4.componentWillReceiveProps && p4.componentWillReceiveProps(w4, $3), !p4.__e && (null != p4.shouldComponentUpdate && false === p4.shouldComponentUpdate(w4, p4.__s, $3) || u3.__v === t3.__v)) {
              for (u3.__v !== t3.__v && (p4.props = w4, p4.state = p4.__s, p4.__d = false), u3.__e = t3.__e, u3.__k = t3.__k, u3.__k.forEach(function(n3) {
                n3 && (n3.__ = u3);
              }), C2 = 0; C2 < p4._sb.length; C2++)
                p4.__h.push(p4._sb[C2]);
              p4._sb = [], p4.__h.length && f3.push(p4);
              break n;
            }
            null != p4.componentWillUpdate && p4.componentWillUpdate(w4, p4.__s, $3), null != p4.componentDidUpdate && p4.__h.push(function() {
              p4.componentDidUpdate(d3, _2, g4);
            });
          }
          if (p4.context = $3, p4.props = w4, p4.__P = n2, p4.__e = false, S2 = l.__r, A2 = 0, "prototype" in T2 && T2.prototype.render) {
            for (p4.state = p4.__s, p4.__d = false, S2 && S2(u3), a4 = p4.render(p4.props, p4.state, p4.context), H2 = 0; H2 < p4._sb.length; H2++)
              p4.__h.push(p4._sb[H2]);
            p4._sb = [];
          } else
            do {
              p4.__d = false, S2 && S2(u3), a4 = p4.render(p4.props, p4.state, p4.context), p4.state = p4.__s;
            } while (p4.__d && ++A2 < 25);
          p4.state = p4.__s, null != p4.getChildContext && (i3 = v(v({}, i3), p4.getChildContext())), y3 || null == p4.getSnapshotBeforeUpdate || (g4 = p4.getSnapshotBeforeUpdate(d3, _2)), P(n2, h(I3 = null != a4 && a4.type === k && null == a4.key ? a4.props.children : a4) ? I3 : [I3], u3, t3, i3, o3, r3, f3, e3, c4, s3), p4.base = u3.__e, u3.__h = null, p4.__h.length && f3.push(p4), m4 && (p4.__E = p4.__ = null);
        } catch (n3) {
          u3.__v = null, (c4 || null != r3) && (u3.__e = e3, u3.__h = !!c4, r3[r3.indexOf(e3)] = null), l.__e(n3, u3, t3);
        }
      else
        null == r3 && u3.__v === t3.__v ? (u3.__k = t3.__k, u3.__e = t3.__e) : u3.__e = N(t3.__e, u3, t3, i3, o3, r3, f3, c4, s3);
    (a4 = l.diffed) && a4(u3);
  }
  function M(n2, u3, t3) {
    for (var i3 = 0; i3 < t3.length; i3++)
      O(t3[i3], t3[++i3], t3[++i3]);
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function N(l4, u3, t3, i3, o3, r3, f3, e3, s3) {
    var a4, v4, y3, d3 = t3.props, _2 = u3.props, k4 = u3.type, b4 = 0;
    if ("svg" === k4 && (o3 = true), null != r3) {
      for (; b4 < r3.length; b4++)
        if ((a4 = r3[b4]) && "setAttribute" in a4 == !!k4 && (k4 ? a4.localName === k4 : 3 === a4.nodeType)) {
          l4 = a4, r3[b4] = null;
          break;
        }
    }
    if (null == l4) {
      if (null === k4)
        return document.createTextNode(_2);
      l4 = o3 ? document.createElementNS("http://www.w3.org/2000/svg", k4) : document.createElement(k4, _2.is && _2), r3 = null, e3 = false;
    }
    if (null === k4)
      d3 === _2 || e3 && l4.data === _2 || (l4.data = _2);
    else {
      if (r3 = r3 && n.call(l4.childNodes), v4 = (d3 = t3.props || c).dangerouslySetInnerHTML, y3 = _2.dangerouslySetInnerHTML, !e3) {
        if (null != r3)
          for (d3 = {}, b4 = 0; b4 < l4.attributes.length; b4++)
            d3[l4.attributes[b4].name] = l4.attributes[b4].value;
        (y3 || v4) && (y3 && (v4 && y3.__html == v4.__html || y3.__html === l4.innerHTML) || (l4.innerHTML = y3 && y3.__html || ""));
      }
      if (H(l4, _2, d3, o3, e3), y3)
        u3.__k = [];
      else if (P(l4, h(b4 = u3.props.children) ? b4 : [b4], u3, t3, i3, o3 && "foreignObject" !== k4, r3, f3, r3 ? r3[0] : t3.__k && g(t3, 0), e3, s3), null != r3)
        for (b4 = r3.length; b4--; )
          null != r3[b4] && p(r3[b4]);
      e3 || ("value" in _2 && void 0 !== (b4 = _2.value) && (b4 !== l4.value || "progress" === k4 && !b4 || "option" === k4 && b4 !== d3.value) && T(l4, "value", b4, d3.value, false), "checked" in _2 && void 0 !== (b4 = _2.checked) && b4 !== l4.checked && T(l4, "checked", b4, d3.checked, false));
    }
    return l4;
  }
  function O(n2, u3, t3) {
    try {
      "function" == typeof n2 ? n2(u3) : n2.current = u3;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function q(n2, u3, t3) {
    var i3, o3;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current !== n2.__e || O(i3, null, u3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount)
        try {
          i3.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u3);
        }
      i3.base = i3.__P = null, n2.__c = void 0;
    }
    if (i3 = n2.__k)
      for (o3 = 0; o3 < i3.length; o3++)
        i3[o3] && q(i3[o3], u3, t3 || "function" != typeof n2.type);
    t3 || null == n2.__e || p(n2.__e), n2.__ = n2.__e = n2.__d = void 0;
  }
  function B(n2, l4, u3) {
    return this.constructor(n2, u3);
  }
  function D(u3, t3, i3) {
    var o3, r3, f3, e3;
    l.__ && l.__(u3, t3), r3 = (o3 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, f3 = [], e3 = [], L(t3, u3 = (!o3 && i3 || t3).__k = y(k, null, [u3]), r3 || c, c, void 0 !== t3.ownerSVGElement, !o3 && i3 ? [i3] : r3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, f3, !o3 && i3 ? i3 : r3 ? r3.__e : t3.firstChild, o3, e3), M(f3, u3, e3);
  }
  function F(l4, u3, t3) {
    var i3, o3, r3, f3, e3 = v({}, l4.props);
    for (r3 in l4.type && l4.type.defaultProps && (f3 = l4.type.defaultProps), u3)
      "key" == r3 ? i3 = u3[r3] : "ref" == r3 ? o3 = u3[r3] : e3[r3] = void 0 === u3[r3] && void 0 !== f3 ? f3[r3] : u3[r3];
    return arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), d(l4.type, e3, i3 || l4.key, o3 || l4.ref, null);
  }
  function G(n2, l4) {
    var u3 = { __c: l4 = "__cC" + e++, __: n2, Consumer: function(n3, l5) {
      return n3.children(l5);
    }, Provider: function(n3) {
      var u4, t3;
      return this.getChildContext || (u4 = [], (t3 = {})[l4] = this, this.getChildContext = function() {
        return t3;
      }, this.shouldComponentUpdate = function(n4) {
        this.props.value !== n4.value && u4.some(function(n5) {
          n5.__e = true, w(n5);
        });
      }, this.sub = function(n4) {
        u4.push(n4);
        var l5 = n4.componentWillUnmount;
        n4.componentWillUnmount = function() {
          u4.splice(u4.indexOf(n4), 1), l5 && l5.call(n4);
        };
      }), n3.children;
    } };
    return u3.Provider.__ = u3.Consumer.contextType = u3;
  }
  n = s.slice, l = { __e: function(n2, l4, u3, t3) {
    for (var i3, o3, r3; l4 = l4.__; )
      if ((i3 = l4.__c) && !i3.__)
        try {
          if ((o3 = i3.constructor) && null != o3.getDerivedStateFromError && (i3.setState(o3.getDerivedStateFromError(n2)), r3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), r3 = i3.__d), r3)
            return i3.__E = i3;
        } catch (l5) {
          n2 = l5;
        }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, b.prototype.setState = function(n2, l4) {
    var u3;
    u3 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = v({}, this.state), "function" == typeof n2 && (n2 = n2(v({}, u3), this.props)), n2 && v(u3, n2), null != n2 && this.__v && (l4 && this._sb.push(l4), w(this));
  }, b.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), w(this));
  }, b.prototype.render = k, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n2, l4) {
    return n2.__v.__b - l4.__v.__b;
  }, x.__r = 0, e = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var f2 = [];
  var c2 = [];
  var e2 = l.__b;
  var a2 = l.__r;
  var v2 = l.diffed;
  var l2 = l.__c;
  var m2 = l.unmount;
  function b2() {
    for (var t3; t3 = f2.shift(); )
      if (t3.__P && t3.__H)
        try {
          t3.__H.__h.forEach(k2), t3.__H.__h.forEach(w2), t3.__H.__h = [];
        } catch (r3) {
          t3.__H.__h = [], l.__e(r3, t3.__v);
        }
  }
  l.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, l.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i3 = (r2 = n2.__c).__H;
    i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.__V = c2, n3.__N = n3.i = void 0;
    })) : (i3.__h.forEach(k2), i3.__h.forEach(w2), i3.__h = [], t2 = 0)), u2 = r2;
  }, l.diffed = function(t3) {
    v2 && v2(t3);
    var o3 = t3.__c;
    o3 && o3.__H && (o3.__H.__h.length && (1 !== f2.push(o3) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || j2)(b2)), o3.__H.__.forEach(function(n2) {
      n2.i && (n2.__H = n2.i), n2.__V !== c2 && (n2.__ = n2.__V), n2.i = void 0, n2.__V = c2;
    })), u2 = r2 = null;
  }, l.__c = function(t3, r3) {
    r3.some(function(t4) {
      try {
        t4.__h.forEach(k2), t4.__h = t4.__h.filter(function(n2) {
          return !n2.__ || w2(n2);
        });
      } catch (u3) {
        r3.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), r3 = [], l.__e(u3, t4.__v);
      }
    }), l2 && l2(t3, r3);
  }, l.unmount = function(t3) {
    m2 && m2(t3);
    var r3, u3 = t3.__c;
    u3 && u3.__H && (u3.__H.__.forEach(function(n2) {
      try {
        k2(n2);
      } catch (n3) {
        r3 = n3;
      }
    }), u3.__H = void 0, r3 && l.__e(r3, u3.__v));
  };
  var g2 = "function" == typeof requestAnimationFrame;
  function j2(n2) {
    var t3, r3 = function() {
      clearTimeout(u3), g2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u3 = setTimeout(r3, 100);
    g2 && (t3 = requestAnimationFrame(r3));
  }
  function k2(n2) {
    var t3 = r2, u3 = n2.__c;
    "function" == typeof u3 && (n2.__c = void 0, u3()), r2 = t3;
  }
  function w2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }

  // node_modules/preact-router/dist/preact-router.mjs
  var a3 = {};
  function c3(n2, t3) {
    for (var r3 in t3)
      n2[r3] = t3[r3];
    return n2;
  }
  function s2(n2, t3, r3) {
    var i3, o3 = /(?:\?([^#]*))?(#.*)?$/, e3 = n2.match(o3), u3 = {};
    if (e3 && e3[1])
      for (var f3 = e3[1].split("&"), c4 = 0; c4 < f3.length; c4++) {
        var s3 = f3[c4].split("=");
        u3[decodeURIComponent(s3[0])] = decodeURIComponent(s3.slice(1).join("="));
      }
    n2 = d2(n2.replace(o3, "")), t3 = d2(t3 || "");
    for (var h4 = Math.max(n2.length, t3.length), v4 = 0; v4 < h4; v4++)
      if (t3[v4] && ":" === t3[v4].charAt(0)) {
        var l4 = t3[v4].replace(/(^:|[+*?]+$)/g, ""), p4 = (t3[v4].match(/[+*?]+$/) || a3)[0] || "", m4 = ~p4.indexOf("+"), y3 = ~p4.indexOf("*"), U2 = n2[v4] || "";
        if (!U2 && !y3 && (p4.indexOf("?") < 0 || m4)) {
          i3 = false;
          break;
        }
        if (u3[l4] = decodeURIComponent(U2), m4 || y3) {
          u3[l4] = n2.slice(v4).map(decodeURIComponent).join("/");
          break;
        }
      } else if (t3[v4] !== n2[v4]) {
        i3 = false;
        break;
      }
    return (true === r3.default || false !== i3) && u3;
  }
  function h3(n2, t3) {
    return n2.rank < t3.rank ? 1 : n2.rank > t3.rank ? -1 : n2.index - t3.index;
  }
  function v3(n2, t3) {
    return n2.index = t3, n2.rank = function(n3) {
      return n3.props.default ? 0 : d2(n3.props.path).map(l3).join("");
    }(n2), n2.props;
  }
  function d2(n2) {
    return n2.replace(/(^\/+|\/+$)/g, "").split("/");
  }
  function l3(n2) {
    return ":" == n2.charAt(0) ? 1 + "*+?".indexOf(n2.charAt(n2.length - 1)) || 4 : 5;
  }
  var p3 = {};
  var m3 = [];
  var y2 = [];
  var U = null;
  var g3 = { url: R() };
  var k3 = G(g3);
  function R() {
    var n2;
    return "" + ((n2 = U && U.location ? U.location : U && U.getCurrentLocation ? U.getCurrentLocation() : "undefined" != typeof location ? location : p3).pathname || "") + (n2.search || "");
  }
  function $2(n2, t3) {
    return void 0 === t3 && (t3 = false), "string" != typeof n2 && n2.url && (t3 = n2.replace, n2 = n2.url), function(n3) {
      for (var t4 = m3.length; t4--; )
        if (m3[t4].canRoute(n3))
          return true;
      return false;
    }(n2) && function(n3, t4) {
      void 0 === t4 && (t4 = "push"), U && U[t4] ? U[t4](n3) : "undefined" != typeof history && history[t4 + "State"] && history[t4 + "State"](null, null, n3);
    }(n2, t3 ? "replace" : "push"), I2(n2);
  }
  function I2(n2) {
    for (var t3 = false, r3 = 0; r3 < m3.length; r3++)
      m3[r3].routeTo(n2) && (t3 = true);
    return t3;
  }
  function M2(n2) {
    if (n2 && n2.getAttribute) {
      var t3 = n2.getAttribute("href"), r3 = n2.getAttribute("target");
      if (t3 && t3.match(/^\//g) && (!r3 || r3.match(/^_?self$/i)))
        return $2(t3);
    }
  }
  function b3(n2) {
    return n2.stopImmediatePropagation && n2.stopImmediatePropagation(), n2.stopPropagation && n2.stopPropagation(), n2.preventDefault(), false;
  }
  function W(n2) {
    if (!(n2.ctrlKey || n2.metaKey || n2.altKey || n2.shiftKey || n2.button)) {
      var t3 = n2.target;
      do {
        if ("a" === t3.localName && t3.getAttribute("href")) {
          if (t3.hasAttribute("data-native") || t3.hasAttribute("native"))
            return;
          if (M2(t3))
            return b3(n2);
        }
      } while (t3 = t3.parentNode);
    }
  }
  var w3 = false;
  function D2(n2) {
    n2.history && (U = n2.history), this.state = { url: n2.url || R() };
  }
  c3(D2.prototype = new b(), { shouldComponentUpdate: function(n2) {
    return true !== n2.static || n2.url !== this.props.url || n2.onChange !== this.props.onChange;
  }, canRoute: function(n2) {
    var t3 = C(this.props.children);
    return void 0 !== this.g(t3, n2);
  }, routeTo: function(n2) {
    this.setState({ url: n2 });
    var t3 = this.canRoute(n2);
    return this.p || this.forceUpdate(), t3;
  }, componentWillMount: function() {
    this.p = true;
  }, componentDidMount: function() {
    var n2 = this;
    w3 || (w3 = true, U || addEventListener("popstate", function() {
      I2(R());
    }), addEventListener("click", W)), m3.push(this), U && (this.u = U.listen(function(t3) {
      var r3 = t3.location || t3;
      n2.routeTo("" + (r3.pathname || "") + (r3.search || ""));
    })), this.p = false;
  }, componentWillUnmount: function() {
    "function" == typeof this.u && this.u(), m3.splice(m3.indexOf(this), 1);
  }, componentWillUpdate: function() {
    this.p = true;
  }, componentDidUpdate: function() {
    this.p = false;
  }, g: function(n2, t3) {
    n2 = n2.filter(v3).sort(h3);
    for (var r3 = 0; r3 < n2.length; r3++) {
      var i3 = n2[r3], o3 = s2(t3, i3.props.path, i3.props);
      if (o3)
        return [i3, o3];
    }
  }, render: function(n2, t3) {
    var e3, u3, f3 = n2.onChange, a4 = t3.url, s3 = this.c, h4 = this.g(C(n2.children), a4);
    if (h4 && (u3 = F(h4[0], c3(c3({ url: a4, matches: e3 = h4[1] }, e3), { key: void 0, ref: void 0 }))), a4 !== (s3 && s3.url)) {
      c3(g3, s3 = this.c = { url: a4, previous: s3 && s3.url, current: u3, path: u3 ? u3.props.path : null, matches: e3 }), s3.router = this, s3.active = u3 ? [u3] : [];
      for (var v4 = y2.length; v4--; )
        y2[v4]({});
      "function" == typeof f3 && f3(s3);
    }
    return y(k3.Provider, { value: s3 }, u3);
  } });

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var _ = 0;
  function o2(o3, e3, n2, t3, f3, l4) {
    var s3, u3, a4 = {};
    for (u3 in e3)
      "ref" == u3 ? s3 = e3[u3] : a4[u3] = e3[u3];
    var i3 = { type: o3, props: a4, key: n2, ref: s3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_, __source: f3, __self: l4 };
    if ("function" == typeof o3 && (s3 = o3.defaultProps))
      for (u3 in s3)
        void 0 === a4[u3] && (a4[u3] = s3[u3]);
    return l.vnode && l.vnode(i3), i3;
  }

  // app/views/header.tsx
  function Header(props) {
    return /* @__PURE__ */ o2("header", { children: /* @__PURE__ */ o2("div", { class: "logo", children: /* @__PURE__ */ o2("a", { href: "/", children: /* @__PURE__ */ o2("img", { src: "/nostril-logo.jpg" }) }) }) });
  }

  // app/views/root.tsx
  function Home(props) {
    let filters = props.filters?.map((p4) => /* @__PURE__ */ o2("code", { children: JSON.stringify(p4) }));
    return /* @__PURE__ */ o2("section", { children: [
      /* @__PURE__ */ o2(Header, {}),
      /* @__PURE__ */ o2("h2", { children: "A modern social network" }),
      /* @__PURE__ */ o2("p", { class: "type-m", children: "Your 2007-era news feed \u2014 rebuilt for iOS 17 and Android 14." }),
      /* @__PURE__ */ o2("ol", { children: [
        /* @__PURE__ */ o2("li", { children: [
          /* @__PURE__ */ o2("b", { children: "Human" }),
          " Chronologically ordered, without algorithmic filtering or recommended content"
        ] }),
        /* @__PURE__ */ o2("li", { children: [
          /* @__PURE__ */ o2("b", { children: "Secure" }),
          " Share your posts securely with end to end encryption"
        ] }),
        /* @__PURE__ */ o2("li", { children: [
          /* @__PURE__ */ o2("b", { children: "Private" }),
          " Your content is only viewable by your invited friends and family"
        ] })
      ] })
    ] });
  }

  // app/web/index.tsx
  var Main = () => /* @__PURE__ */ o2(k, { children: /* @__PURE__ */ o2(D2, { children: /* @__PURE__ */ o2(Home, { path: "/" }) }) });
  document.addEventListener("DOMContentLoaded", () => {
    D(/* @__PURE__ */ o2(Main, {}), document.body);
  });
})();
