/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, tt = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, et = Symbol(), at = /* @__PURE__ */ new WeakMap();
let vt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (tt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = at.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && at.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const bt = (a) => new vt(typeof a == "string" ? a : a + "", void 0, et), N = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + a[o + 1], a[0]);
  return new vt(e, a, et);
}, At = (a, t) => {
  if (tt) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = W.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, a.appendChild(i);
  }
}, ot = tt ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return bt(e);
})(a) : a;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: kt, defineProperty: Dt, getOwnPropertyDescriptor: Et, getOwnPropertyNames: Pt, getOwnPropertySymbols: Tt, getPrototypeOf: Ot } = Object, x = globalThis, rt = x.trustedTypes, Lt = rt ? rt.emptyScript : "", Y = x.reactiveElementPolyfillSupport, z = (a, t) => a, B = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? Lt : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, t) {
  let e = a;
  switch (t) {
    case Boolean:
      e = a !== null;
      break;
    case Number:
      e = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(a);
      } catch {
        e = null;
      }
  }
  return e;
} }, it = (a, t) => !kt(a, t), nt = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: it };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = nt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Dt(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = Et(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const l = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const t = Ot(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const e = this.properties, i = [...Pt(e), ...Tt(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(ot(s));
    } else t !== void 0 && e.push(ot(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return At(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : B).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, r;
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), n = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : B;
      this._$Em = s, this[s] = n.fromAttribute(e, l.type) ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    var s;
    if (t !== void 0) {
      const o = this.constructor, r = this[t];
      if (i ?? (i = o.getPropertyOptions(t)), !((i.hasChanged ?? it)(r, e) || i.useDefault && i.reflect && r === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: l } = r, n = this[o];
        l !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, r, n);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[z("elementProperties")] = /* @__PURE__ */ new Map(), P[z("finalized")] = /* @__PURE__ */ new Map(), Y == null || Y({ ReactiveElement: P }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, F = U.trustedTypes, lt = F ? F.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, _t = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, xt = "?" + b, Mt = `<${xt}>`, D = document, j = () => D.createComment(""), H = (a) => a === null || typeof a != "object" && typeof a != "function", st = Array.isArray, zt = (a) => st(a) || typeof (a == null ? void 0 : a[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, dt = />/g, S = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, pt = /"/g, $t = /^(?:script|style|textarea|title)$/i, Ut = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), u = Ut(1), T = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), A = D.createTreeWalker(D, 129);
function Ct(a, t) {
  if (!st(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return lt !== void 0 ? lt.createHTML(t) : t;
}
const jt = (a, t) => {
  const e = a.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = M;
  for (let l = 0; l < e; l++) {
    const n = a[l];
    let d, p, c = -1, w = 0;
    for (; w < n.length && (r.lastIndex = w, p = r.exec(n), p !== null); ) w = r.lastIndex, r === M ? p[1] === "!--" ? r = ct : p[1] !== void 0 ? r = dt : p[2] !== void 0 ? ($t.test(p[2]) && (s = RegExp("</" + p[2], "g")), r = S) : p[3] !== void 0 && (r = S) : r === S ? p[0] === ">" ? (r = s ?? M, c = -1) : p[1] === void 0 ? c = -2 : (c = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? S : p[3] === '"' ? pt : ht) : r === pt || r === ht ? r = S : r === ct || r === dt ? r = M : (r = S, s = void 0);
    const v = r === S && a[l + 1].startsWith("/>") ? " " : "";
    o += r === M ? n + Mt : c >= 0 ? (i.push(d), n.slice(0, c) + _t + n.slice(c) + b + v) : n + b + (c === -2 ? l : v);
  }
  return [Ct(a, o + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class R {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const l = t.length - 1, n = this.parts, [d, p] = jt(t, e);
    if (this.el = R.createElement(d, i), A.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = A.nextNode()) !== null && n.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(_t)) {
          const w = p[r++], v = s.getAttribute(c).split(b), q = /([.?@])?(.*)/.exec(w);
          n.push({ type: 1, index: o, name: q[2], strings: v, ctor: q[1] === "." ? Rt : q[1] === "?" ? Nt : q[1] === "@" ? It : G }), s.removeAttribute(c);
        } else c.startsWith(b) && (n.push({ type: 6, index: o }), s.removeAttribute(c));
        if ($t.test(s.tagName)) {
          const c = s.textContent.split(b), w = c.length - 1;
          if (w > 0) {
            s.textContent = F ? F.emptyScript : "";
            for (let v = 0; v < w; v++) s.append(c[v], j()), A.nextNode(), n.push({ type: 2, index: ++o });
            s.append(c[w], j());
          }
        }
      } else if (s.nodeType === 8) if (s.data === xt) n.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(b, c + 1)) !== -1; ) n.push({ type: 7, index: o }), c += b.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = D.createElement("template");
    return i.innerHTML = t, i;
  }
}
function O(a, t, e = a, i) {
  var r, l;
  if (t === T) return t;
  let s = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const o = H(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(a), s._$AT(a, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = O(a, s._$AS(a, t.values), s, i)), t;
}
class Ht {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? D).importNode(e, !0);
    A.currentNode = s;
    let o = A.nextNode(), r = 0, l = 0, n = i[0];
    for (; n !== void 0; ) {
      if (r === n.index) {
        let d;
        n.type === 2 ? d = new I(o, o.nextSibling, this, t) : n.type === 1 ? d = new n.ctor(o, n.name, n.strings, this, t) : n.type === 6 && (d = new Vt(o, this, t)), this._$AV.push(d), n = i[++l];
      }
      r !== (n == null ? void 0 : n.index) && (o = A.nextNode(), r++);
    }
    return A.currentNode = D, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class I {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = O(this, t, e), H(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== T && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : zt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = R.createElement(Ct(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(e);
    else {
      const r = new Ht(s, this), l = r.u(this.options);
      r.p(e), this.T(l), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ut.get(t.strings);
    return e === void 0 && ut.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new I(this.O(j()), this.O(j()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class G {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = O(this, t, e, 0), r = !H(t) || t !== this._$AH && t !== T, r && (this._$AH = t);
    else {
      const l = t;
      let n, d;
      for (t = o[0], n = 0; n < o.length - 1; n++) d = O(this, l[i + n], e, n), d === T && (d = this._$AH[n]), r || (r = !H(d) || d !== this._$AH[n]), d === h ? t = h : t !== h && (t += (d ?? "") + o[n + 1]), this._$AH[n] = d;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Rt extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Nt extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class It extends G {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? h) === T) return;
    const i = this._$AH, s = t === h && i !== h || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== h && (i === h || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Vt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const Q = U.litHtmlPolyfillSupport;
Q == null || Q(R, I), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.0");
const qt = (a, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = s = new I(t.insertBefore(j(), o), o, void 0, e ?? {});
  }
  return s._$AI(a), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis;
class $ extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return T;
  }
}
var yt;
$._$litElement$ = !0, $.finalized = !0, (yt = k.litElementHydrateSupport) == null || yt.call(k, { LitElement: $ });
const X = k.litElementPolyfillSupport;
X == null || X({ LitElement: $ });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = (a) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(a, t);
  }) : customElements.define(a, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Wt = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: it }, Bt = (a = Wt, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((a = Object.create(a)).wrapped = !0), o.set(e.name, a), i === "accessor") {
    const { name: r } = e;
    return { set(l) {
      const n = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, n, a);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, a, l), l;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(l) {
      const n = this[r];
      t.call(this, l), this.requestUpdate(r, n, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function C(a) {
  return (t, e) => typeof e == "object" ? Bt(a, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(a, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(a) {
  return C({ ...a, state: !0, attribute: !1 });
}
const Ft = '/*! tailwindcss v4.1.7 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-x-reverse:0;--tw-border-style:solid;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-gray-100:oklch(96.7% .003 264.542);--color-gray-200:oklch(92.8% .006 264.531);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-500:oklch(55.1% .027 264.364);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-black:#000;--color-white:#fff;--spacing:.25rem;--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-lg:1.125rem;--text-lg--line-height:calc(1.75/1.125);--font-weight-semibold:600;--radius-md:.375rem;--radius-lg:.5rem;--blur-sm:8px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.inset-0{inset:calc(var(--spacing)*0)}.top-4{top:calc(var(--spacing)*4)}.right-4{right:calc(var(--spacing)*4)}.right-\\[20px\\]{right:20px}.left-\\[20px\\]{left:20px}.z-10,.z-\\[10\\]{z-index:10}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.ms-3{margin-inline-start:calc(var(--spacing)*3)}.ms-10{margin-inline-start:calc(var(--spacing)*10)}.mt-2{margin-top:calc(var(--spacing)*2)}.mr-1{margin-right:calc(var(--spacing)*1)}.mb-3{margin-bottom:calc(var(--spacing)*3)}.mb-5{margin-bottom:calc(var(--spacing)*5)}.flex{display:flex}.h-3{height:calc(var(--spacing)*3)}.max-h-\\[670px\\]{max-height:670px}.w-3{width:calc(var(--spacing)*3)}.w-\\[100\\%\\]{width:100%}.w-\\[514px\\]{width:514px}.w-\\[630px\\]{width:630px}.max-w-\\[632px\\]{max-width:632px}.flex-shrink{flex-shrink:1}.flex-shrink-0{flex-shrink:0}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.resize{resize:both}.flex-col{flex-direction:column}.flex-row{flex-direction:row}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-evenly{justify-content:space-evenly}.gap-2{gap:calc(var(--spacing)*2)}:where(.space-x-1>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing)*1)*var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing)*1)*calc(1 - var(--tw-space-x-reverse)))}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.border{border-style:var(--tw-border-style);border-width:1px}.border-transparent{border-color:#0000}.bg-\\[\\#0FCC93\\]{background-color:#0fcc93}.bg-black\\/30{background-color:#0000004d}@supports (color:color-mix(in lab,red,red)){.bg-black\\/30{background-color:color-mix(in oklab,var(--color-black)30%,transparent)}}.bg-white{background-color:var(--color-white)}.p-1{padding:calc(var(--spacing)*1)}.p-2{padding:calc(var(--spacing)*2)}.p-4{padding:calc(var(--spacing)*4)}.px-1{padding-inline:calc(var(--spacing)*1)}.px-4{padding-inline:calc(var(--spacing)*4)}.py-2{padding-block:calc(var(--spacing)*2)}.ps-3{padding-inline-start:calc(var(--spacing)*3)}.pt-8{padding-top:calc(var(--spacing)*8)}.pb-2{padding-bottom:calc(var(--spacing)*2)}.pb-3{padding-bottom:calc(var(--spacing)*3)}.text-center{text-align:center}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-gray-200{color:var(--color-gray-200)}.text-gray-400{color:var(--color-gray-400)}.text-gray-500{color:var(--color-gray-500)}.text-gray-600{color:var(--color-gray-600)}.text-white{color:var(--color-white)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a),0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(var(--blur-sm));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,visibility,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}@media (hover:hover){.hover\\:bg-gray-100:hover{background-color:var(--color-gray-100)}.hover\\:bg-gray-200:hover{background-color:var(--color-gray-200)}.hover\\:text-\\[\\#0b9a72\\]:hover{color:#0b9a72}.hover\\:text-gray-700:hover{color:var(--color-gray-700)}}.focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-\\[\\#0FCC93\\]:focus{--tw-ring-color:#0fcc93}.focus\\:ring-gray-400:focus{--tw-ring-color:var(--color-gray-400)}.focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,)0 0 0 var(--tw-ring-offset-width)var(--tw-ring-offset-color)}.focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,)0 0 0 var(--tw-ring-offset-width)var(--tw-ring-offset-color)}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}@media (min-width:40rem){.sm\\:px-2{padding-inline:calc(var(--spacing)*2)}}}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}', Gt = bt(Ft), K = (a) => {
  var t;
  return t = class extends a {
    constructor(...i) {
      super(...i);
    }
  }, t.styles = [
    ...Array.isArray(a.styles) ? a.styles : [a.styles].filter(Boolean),
    N`${Gt}`
  ], t;
};
var Zt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, Yt = Object.getPrototypeOf, Jt = Reflect.get, St = (a, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Kt(t, e) : t, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && Zt(t, e, s), s;
}, gt = (a, t, e) => Jt(Yt(a), e, t);
const Qt = K($);
let _ = class extends Qt {
  constructor() {
    super(...arguments), this.email = "email@example.com";
  }
  render() {
    return u`
      <div class="pt-8 pb-3 text-center flex flex-col items-center flex-shrink-0">
        <p class="text-sm font-semibold mb-3">BOOK YOUR APPOINTMENT WITH</p>
        <h2 class="text-lg  text-gray-600">${this.email}</h2>
      </div>
    `;
  }
};
_.styles = [
  ...gt(_, _, "styles") ? [gt(_, _, "styles")] : [],
  N`
      :host {
        display: block; 
      }
    `
];
St([
  C({ type: String })
], _.prototype, "email", 2);
_ = St([
  Z("ca-widget-header")
], _);
const Xt = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='8'%20cy='8'%20r='8'%20fill='%23354354'/%3e%3cpath%20d='M9.354%206.10169V10.1432C9.354%2010.3072%209.26072%2010.4576%209.11232%2010.5337C8.96364%2010.6098%208.78409%2010.5989%208.64639%2010.5055L5.58906%208.43285C5.47996%208.35902%205.41526%208.23739%205.41554%208.10783C5.4161%207.97814%205.48168%207.85689%205.59107%207.78366L8.6484%205.738C8.78669%205.64557%208.9654%205.63554%209.11354%205.71176C9.26132%205.78809%209.354%205.93812%209.354%206.10169Z'%20fill='white'/%3e%3c/svg%3e", te = "data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='8'%20cy='8'%20r='8'%20transform='rotate(-180%208%208)'%20fill='%23354354'/%3e%3cpath%20d='M6.646%209.89831V5.8568C6.646%205.69279%206.73928%205.54236%206.88768%205.4663C7.03636%205.39024%207.21591%205.40112%207.35361%205.49452L10.4109%207.56715C10.52%207.64098%2010.5847%207.76261%2010.5845%207.89217C10.5839%208.02186%2010.5183%208.14311%2010.4089%208.21634L7.3516%2010.262C7.21331%2010.3544%207.0346%2010.3645%206.88646%2010.2882C6.73868%2010.2119%206.646%2010.0619%206.646%209.89831Z'%20fill='white'/%3e%3c/svg%3e";
var ee = Object.defineProperty, ie = Object.getOwnPropertyDescriptor, se = Object.getPrototypeOf, ae = Reflect.get, V = (a, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? ie(t, e) : t, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && ee(t, e, s), s;
}, ft = (a, t, e) => ae(se(a), e, t);
const oe = K($);
let m = class extends oe {
  constructor() {
    super(...arguments), this.initialDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0], this._currentStartDate = /* @__PURE__ */ new Date(), this._datesToDisplay = [], this._daysToShow = 5, this._today = /* @__PURE__ */ new Date(), this._handleResize = () => {
      const a = window.innerWidth <= 640 ? 3 : 5;
      this._daysToShow !== a && (this._daysToShow = a, this._generateDates(), this.requestUpdate());
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._today = /* @__PURE__ */ new Date(), this._today.setHours(0, 0, 0, 0);
    let a = /* @__PURE__ */ new Date(this.initialDate + "T00:00:00");
    isNaN(a.getTime()) ? a = new Date(this._today) : a.setHours(0, 0, 0, 0), this._currentStartDate = a < this._today ? new Date(this._today) : new Date(a), window.addEventListener("resize", this._handleResize), this._handleResize(), this._generateDates();
  }
  // LitElement lifecycle callback: Called once before the component is removed from the DOM.
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("resize", this._handleResize);
  }
  // Generates the array of dates to be displayed in the slider based on _currentStartDate.
  _generateDates() {
    const a = [];
    for (let t = 0; t < this._daysToShow; t++) {
      const e = new Date(this._currentStartDate);
      e.setDate(this._currentStartDate.getDate() + t), a.push(e);
    }
    this._datesToDisplay = a, this._emitDatesDisplayedChanged();
  }
  // Formats a Date object into a short weekday name and month/day string.
  _formatDate(a) {
    const t = a.toLocaleDateString(void 0, { weekday: "short" }), e = a.toLocaleDateString(void 0, {
      month: "numeric",
      day: "numeric"
    });
    return { dayName: t, monthDay: e };
  }
  // Checks if a given date is in the past compared to _today.
  _isPastDate(a) {
    const t = new Date(a);
    return t.setHours(0, 0, 0, 0), t < this._today;
  }
  // Checks if two Date objects represent the same day (ignoring time).
  _isSameDate(a, t) {
    return a.getFullYear() === t.getFullYear() && a.getMonth() === t.getMonth() && a.getDate() === t.getDate();
  }
  // Dispatches a custom event 'dates-displayed-changed' with the current _datesToDisplay array.
  // A new array reference is mapped to ensure Lit detects the change in the parent component.
  _emitDatesDisplayedChanged() {
    this.dispatchEvent(
      new CustomEvent("dates-displayed-changed", {
        detail: { dates: this._datesToDisplay.map((a) => new Date(a)) },
        bubbles: !0,
        composed: !0
      })
    );
  }
  // Handles navigation (previous/next) for the date slider.
  _navigate(a) {
    const t = new Date(this._currentStartDate), e = a === "prev" ? -this._daysToShow : this._daysToShow;
    t.setDate(this._currentStartDate.getDate() + e), a === "prev" && t < this._today ? this._currentStartDate = new Date(this._today) : this._currentStartDate = t, this._generateDates(), this.requestUpdate();
  }
  // LitElement render method: Defines the component's UI
  render() {
    const a = !this._isSameDate(this._currentStartDate, this._today) && this._currentStartDate > this._today;
    return u`
      <div class="slider-container flex items-center justify-between px-1 sm:px-2 mb-5 bg-white w-[630px]">
        <button
          @click=${() => this._navigate("prev")} // Click handler for previous navigation
          class="nav-button left-chevron p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0FCC93] relative left-[20px]"
          .disabled=${!a} // Disable button if cannot navigate previous
          aria-label="Previous dates"
        >
          <img src=${Xt} alt="Previous" class="nav-icon" />
        </button>
        <div class="flex space-x-1  justify-evenly w-[100%]">
          ${this._datesToDisplay.map((t) => {
      const { dayName: e, monthDay: i } = this._formatDate(t), s = this._isPastDate(t);
      return u`
              <div
                class="date-item-base flex flex-row items-center justify-center p-2 border border-transparent rounded-md
                       ${s ? "disabled" : ""} // Apply disabled styling if date is in the past
                       ${!s && this._datesToDisplay.some(
        (o) => this._isSameDate(o, t)
      ) ? "active" : ""}" // Apply active styling if date is current and visible
              >
                <span class="day-name text-sm font-semibold ${s ? "text-gray-400" : "text-black-600"} mr-1">${e}</span>
                <span class="month-day text-sm ${s ? "text-gray-200" : "text-gray-400"}">${i}</span>
              </div>
            `;
    })}
        </div>
        <button
          @click=${() => this._navigate("next")}
          class="nav-button right-chevron p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0FCC93] relative right-[20px]"
          aria-label="Next dates"
        >
          <img src=${te} alt="Next" class="nav-icon" />
        </button>
      </div>
    `;
  }
};
m.styles = [
  ...ft(m, m, "styles") ? [ft(m, m, "styles")] : [],
  N`
    :host {
      display: block;
      font-family: "Source Sans Pro", sans-serif;
    }

    .date-item-base {
      max-width: 84px;
      flex-shrink: 0;
    }

    .disabled {
      cursor: not-allowed;
    }

    .nav-button:disabled {
      color: #cbd5e0;
      cursor: not-allowed;
      opacity: 0.5;
    }

    @media (min-width: 381px) and (max-width: 429px) {
      .slider-container {
        width: 350px !important;
      }
      .left-chevron {
        left: 0 !important;
      }
      .right-chevron {
        right: 0 !important;
      }
    }

    @media (min-width: 430px) and (max-width: 640px) {
      .slider-container {
        width: 397px !important;
      }
    }
  `
];
V([
  C({ type: String })
], m.prototype, "initialDate", 2);
V([
  y()
], m.prototype, "_currentStartDate", 2);
V([
  y()
], m.prototype, "_datesToDisplay", 2);
V([
  y()
], m.prototype, "_daysToShow", 2);
m = V([
  Z("date-slider")
], m);
const re = "data:image/svg+xml,%3csvg%20width='14'%20height='9'%20viewBox='0%200%2014%209'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.17188%200.700195C8.13367%200.700396%208.9246%201.47213%208.9248%202.45312V6.50977C8.92455%207.47511%208.13723%208.26249%207.17188%208.2627H2.70312C1.73777%208.26249%200.950448%207.47511%200.950195%206.50977V2.45312C0.9504%201.48774%201.73774%200.7004%202.70312%200.700195H7.17188ZM11.5186%201.37012C12.3276%201.20441%2013.0498%201.8304%2013.0498%202.61035V6.3291C13.0497%206.56573%2012.9837%206.77718%2012.8838%206.95703L12.8779%206.96777C12.5257%207.56872%2011.7624%207.7902%2011.1436%207.43066V7.43164L9.25391%206.34863L8.97754%206.19043V2.76172L9.25195%202.60254L11.1299%201.51953C11.2035%201.47586%2011.3306%201.4089%2011.4854%201.37695V1.37598C11.4909%201.3747%2011.4964%201.37327%2011.502%201.37207C11.5075%201.37104%2011.513%201.37007%2011.5186%201.36914V1.37012Z'%20fill='%23354354'%20stroke='white'%20stroke-width='1.1'/%3e%3c/svg%3e", ne = "data:image/svg+xml,%3csvg%20width='14'%20height='15'%20viewBox='0%200%2014%2015'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6.97827%201.89355C8.66001%201.89366%2010.0339%203.26746%2010.0339%204.94922C10.0339%206.13574%209.34852%207.16624%208.35522%207.67188C9.82558%208.068%2011.0611%209.0845%2011.615%2010.4854H11.616C11.8391%2011.0209%2011.8027%2011.6979%2011.4275%2012.2139L11.4255%2012.2129C11.0993%2012.7025%2010.5281%2013.0048%209.94702%2013.0049H4.00952C3.42849%2013.0049%202.85728%2012.7025%202.53101%2012.2129L2.52905%2012.2139C2.15153%2011.6948%202.12183%2011.0536%202.33472%2010.5L2.33569%2010.4961L2.40601%2010.3271C2.98792%209.00783%204.186%208.05308%205.60034%207.67188C4.6073%207.16615%203.92261%206.13556%203.92261%204.94922C3.92261%203.26739%205.29645%201.89355%206.97827%201.89355Z'%20fill='%23354354'%20stroke='white'%20stroke-width='1.11111'/%3e%3c/svg%3e", le = "data:image/svg+xml,%3csvg%20width='14'%20height='13'%20viewBox='0%200%2014%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5.03106%203.86216C4.70216%204.08192%204.31548%204.19922%203.91992%204.19922C3.38949%204.19922%202.88078%203.98851%202.50571%203.61343C2.13064%203.23836%201.91992%202.72965%201.91992%202.19922C1.91992%201.80366%202.03722%201.41698%202.25698%201.08808C2.47675%200.759181%202.7891%200.502836%203.15455%200.351461C3.52001%200.200085%203.92214%200.160479%204.3101%200.237649C4.69806%200.31482%205.05443%200.505301%205.33414%200.785006C5.61384%201.06471%205.80432%201.42108%205.88149%201.80904C5.95866%202.197%205.91906%202.59913%205.76768%202.96459C5.61631%203.33004%205.35996%203.6424%205.03106%203.86216Z'%20fill='%23354354'/%3e%3cpath%20d='M5.83556%205.18697C6.41107%205.54113%206.8739%206.05177%207.16994%206.65922H5.39994C4.94378%206.64678%204.49882%206.80157%204.14886%207.09443C3.7989%207.38729%203.5681%207.79801%203.49994%208.24922H1.49994C1.3396%208.25008%201.18141%208.21238%201.0387%208.13928C0.895984%208.06618%200.772941%207.95984%200.679945%207.82922C0.576502%207.6862%200.512761%207.51834%200.495198%207.3427C0.477634%207.16706%200.506873%206.9899%200.579945%206.82922C0.855821%206.17498%201.32154%205.6185%201.91694%205.23167C2.51234%204.84484%203.21005%204.64544%203.91994%204.65922C4.59563%204.64977%205.26005%204.83281%205.83556%205.18697Z'%20fill='%23354354'/%3e%3cpath%20d='M9.06992%207.55922H5.39992C4.85868%207.55922%204.41992%207.99798%204.41992%208.53922V11.8692C4.41992%2012.4105%204.85868%2012.8492%205.39992%2012.8492H9.06992C9.61116%2012.8492%2010.0499%2012.4105%2010.0499%2011.8692V8.53922C10.0499%207.99798%209.61116%207.55922%209.06992%207.55922Z'%20fill='%23354354'/%3e%3cpath%20d='M12.5002%208.14922C12.563%208.13732%2012.6274%208.13732%2012.6902%208.14922C12.773%208.13184%2012.8586%208.13248%2012.9411%208.15108C13.0237%208.16968%2013.1012%208.20582%2013.1686%208.25703C13.2359%208.30825%2013.2914%208.37335%2013.3314%208.44792C13.3714%208.52249%2013.3948%208.60479%2013.4002%208.68922V11.6892C13.3999%2011.7944%2013.3723%2011.8978%2013.3202%2011.9892C13.281%2012.0564%2013.2289%2012.1151%2013.1668%2012.162C13.1048%2012.2089%2013.0342%2012.2431%2012.9589%2012.2627C12.8836%2012.2822%2012.8052%2012.2866%2012.7282%2012.2757C12.6512%2012.2648%2012.5771%2012.2388%2012.5102%2012.1992L10.9702%2011.3192V9.02922L12.5002%208.14922Z'%20fill='%23354354'/%3e%3c/svg%3e";
var ce = Object.defineProperty, de = Object.getOwnPropertyDescriptor, he = Object.getPrototypeOf, pe = Reflect.get, L = (a, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? de(t, e) : t, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && ce(t, e, s), s;
}, mt = (a, t, e) => pe(he(a), e, t);
const ue = K($);
let f = class extends ue {
  constructor() {
    super(...arguments), this.availableSlotsData = [], this.displayedDates = [], this.isLoading = !1, this._uniqueTimeSlots = [], this._isExpanded = !1, this.INITIAL_ROWS_TO_SHOW = 3;
  }
  // Lifecycle hook that runs after the component's properties have been updated
  updated(a) {
    super.updated(a), a.has("availableSlotsData") && (console.log(
      "time-slots-display: availableSlotsData changed:",
      this.availableSlotsData
    ), this._generateUniqueTimeSlots(), console.log(
      "time-slots-display: generated _uniqueTimeSlots:",
      this._uniqueTimeSlots
    ), this._isExpanded = !1), a.has("displayedDates") && console.log(
      "time-slots-display: displayedDates changed:",
      this.displayedDates
    );
  }
  // Helper method to extract all unique time strings from the available slots data
  // and sort them chronologically.
  _generateUniqueTimeSlots() {
    const a = /* @__PURE__ */ new Set();
    this.availableSlotsData.forEach((t) => {
      const e = Object.keys(t)[0];
      t[e].forEach((s) => a.add(s.slot_time_str));
    }), this._uniqueTimeSlots = Array.from(a).sort((t, e) => {
      const i = /* @__PURE__ */ new Date(`2000/01/01 ${t}`), s = /* @__PURE__ */ new Date(`2000/01/01 ${e}`);
      return i.getTime() - s.getTime();
    });
  }
  // Helper method to format a Date object into a YYYY-MM-DD string key
  _formatDateToKey(a) {
    const t = a.getFullYear(), e = (a.getMonth() + 1).toString().padStart(2, "0"), i = a.getDate().toString().padStart(2, "0");
    return `${t}-${e}-${i}`;
  }
  // Toggles the expansion state of the time slots display
  _toggleView() {
    this._isExpanded = !this._isExpanded;
  }
  // Handle slot button click
  _handleSlotClick(a) {
    console.log("Slot Details:", {
      slot_start_date_time: a.slot_start_date_time,
      meeting_pref: a.meeting_pref,
      tool_tip: a.tool_tip
    });
  }
  render() {
    if (this.isLoading)
      return u`
        <div class="time-slots-wrapper">
          <div class="loading-spinner"></div>
        </div>
      `;
    console.log(
      "time-slots-display: Rendering with _uniqueTimeSlots:",
      this._uniqueTimeSlots
    ), console.log(
      "time-slots-display: Rendering with displayedDates:",
      this.displayedDates
    ), console.log(
      "time-slots-display: Rendering with availableSlotsData:",
      this.availableSlotsData
    ), console.log(
      "time-slots-display: Rendering with _isExpanded:",
      this._isExpanded
    );
    const a = this._isExpanded ? this._uniqueTimeSlots : this._uniqueTimeSlots.slice(0, this.INITIAL_ROWS_TO_SHOW), t = this._uniqueTimeSlots.length > this.INITIAL_ROWS_TO_SHOW;
    return u`
      <div class="time-slots-wrapper">
        <div class="time-slots-container justify-center">
          ${this.displayedDates.map((e) => {
      const i = this._formatDateToKey(e);
      console.log("time-slots-display: Processing date:", i);
      const s = this.availableSlotsData.find(
        (r) => Object.keys(r)[0] === i
      ), o = s ? Object.values(s)[0] : [];
      return console.log(
        `time-slots-display: Slots for ${i}:`,
        o
      ), u`
              <div class="date-column">
                ${a.map((r) => {
        const l = o.find(
          (n) => n.slot_time_str === r
        );
        return console.log(
          `time-slots-display: Checking time ${r} for slot on ${i}:`,
          l
        ), l ? u`
                      <button
                        class="slot-item slot-button pb-2"
                        @click=${() => this._handleSlotClick(l)}
                      >
                        ${l.meeting_pref === "online" ? u`
                              <img
                                src=${re}
                                alt="Online"
                                class="meeting-icon ms-3"
                              />
                            ` : l.meeting_pref === "inperson" ? u`
                              <img
                                src=${ne}
                                alt="In Person"
                                class="meeting-icon ps-3"
                              />
                            ` : u`
                              <img
                                src=${le}
                                alt="Online or In Person"
                                class="meeting-icon "
                              />
                            `}
                        <div>${l.slot_time_str}</div>
                      </button>
                    ` : u`
                      <div class="slot-item unavailable-slot">-</div>
                    `;
      })}
              </div>
            `;
    })}
        </div>

        ${t ? u`
              <p
                class="view-toggle-button hover:text-[#0b9a72]"
                @click=${this._toggleView}
                role="button"
                tabindex="0"
              >
                ${this._isExpanded ? u`View Less Availability
                      <span aria-hidden="true">↑</span>` : u`View More Availability
                      <span aria-hidden="true">↓</span>`}
              </p>
            ` : null}
      </div>
    `;
  }
};
f.styles = [
  ...mt(f, f, "styles") ? [mt(f, f, "styles")] : [],
  N`
      :host {
        display: block;
        font-family: "Source Sans Pro", sans-serif;
      }
      .time-slots-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      .time-slots-container {
        display: flex;
        gap: 1rem;
        width: 100%;
      }
      .date-column {
        flex: 1;
        min-width: 90px;
        max-width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .slot-item {
        width: 101%;
        padding: 0.5rem 0.25rem;
        margin-bottom: 0.25rem;
        text-align: center;
        border: 1px solid #e2e8f0;
        border-radius: 0.25rem;
        box-sizing: border-box;
        font-size: 12px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
      }
      .slot-button {
        color: black;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .meeting-icon {
        width: 14px;
        height: 14px;
      }
      .unavailable-slot {
        color: #718096;
        background-color: #f7fafc;
        cursor: not-allowed;
      }
      .view-toggle-button {
        text-align: center;
        padding: 0.75rem 0;
        font-size: 0.875rem;
        cursor: pointer;
        background-color: white;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        margin-top: 1rem;
        width: 100%;
      }
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #0FCC93;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 2rem auto;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
];
L([
  C({ type: Array })
], f.prototype, "availableSlotsData", 2);
L([
  C({ type: Array })
], f.prototype, "displayedDates", 2);
L([
  C({ type: Boolean })
], f.prototype, "isLoading", 2);
L([
  y()
], f.prototype, "_uniqueTimeSlots", 2);
L([
  y()
], f.prototype, "_isExpanded", 2);
f = L([
  Z("time-slots-display")
], f);
const ge = "data:image/svg+xml,%3csvg%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.4418%209.62762C11.7752%209.94963%2011.909%2010.4265%2011.7916%2010.8749C11.6742%2011.3233%2011.3239%2011.6735%2010.8754%2011.7909C10.4269%2011.9082%209.94995%2011.7745%209.62786%2011.4411L6.00008%207.81284L2.3723%2011.4411C1.86895%2011.9272%201.06886%2011.9202%200.574033%2011.4255C0.07921%2010.9308%200.0722574%2010.1309%200.558406%209.62762L4.18619%205.99935L0.558406%202.37108C0.224932%202.04907%200.0911911%201.57222%200.208588%201.12381C0.325985%200.675405%200.676249%200.325217%201.12476%200.207846C1.57326%200.0904753%202.05022%200.224186%202.3723%200.557588L6.00008%204.18586L9.62786%200.557588C9.94995%200.224186%2010.4269%200.0904753%2010.8754%200.207846C11.3239%200.325217%2011.6742%200.675405%2011.7916%201.12381C11.909%201.57222%2011.7752%202.04907%2011.4418%202.37108L7.81397%205.99935L11.4418%209.62762Z'%20fill='%23354354'/%3e%3c/svg%3e";
var fe = Object.defineProperty, me = Object.getOwnPropertyDescriptor, we = Object.getPrototypeOf, ye = Reflect.get, E = (a, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? me(t, e) : t, o = a.length - 1, r; o >= 0; o--)
    (r = a[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && fe(t, e, s), s;
}, wt = (a, t, e) => ye(we(a), e, t);
const ve = K($);
let g = class extends ve {
  constructor() {
    super(), this.showPopup = !1, this._email = "", this.subdomain = "", this._availableSlotsData = [], this._displayedDates = [], this._isLoading = !1, this.addEventListener(
      "dates-displayed-changed",
      this._handleDatesDisplayedChanged
    );
  }
  set email(a) {
    const t = this._email;
    this._email = a, this.requestUpdate("email", t);
  }
  get email() {
    return this._email;
  }
  // Event handler for 'dates-displayed-changed' event from the date-slider.
  // It updates the _displayedDates state with the new array of dates.
  // A new array reference is assigned to trigger Lit's change detection in child components.
  _handleDatesDisplayedChanged(a) {
    this._displayedDates = [...a.detail.dates], console.log(
      "ClinicianAvailabilityContainer: Displayed Dates updated:",
      this._displayedDates
    );
  }
  // Async method to fetch clinician availability data from the API
  async fetchClinicianAvailability() {
    var a;
    try {
      this._isLoading = !0;
      const e = await (await fetch(
        `https://${this.subdomain}/questionnaires-service/clinician-availability-data/_search?limit=10&offset=0`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            filters: [
              {
                sequence: 35,
                filter_key: "ageGroup",
                filter_label: "Works With Ages",
                filter_sub_header: "WORK WITH AGE GROUPS",
                filter_component_type: "single-select",
                filter_group: "COMMONLY_USED",
                locked: !1,
                skip_for_self_match: !1,
                is_grouped: !1,
                filter_selection_data: [
                  {
                    label: "18 – 24 years old",
                    unique_key: "clientAge1825YearsOldTherapistChoiceV1",
                    selected: !0,
                    metadata: "filter-age-group-range:18_24",
                    group: []
                  }
                ]
              }
            ],
            schedule_request: {
              start_date: "2025-06-15T03:23:52.544+05:30",
              callAPI: !0,
              time_from: null,
              time_until: null,
              schedule_day: [],
              schedules_with_slots: !1,
              for_days: 15,
              user_time_zone: "Asia/Calcutta",
              sort_by: "MOST",
              meeting_pref: ["Online or In Person"],
              service_type: "individualTherapyChoiceV1"
            },
            therapist_id: "01HTEV7PAN1S6YATGBAT3VGPWE",
            is_clinician_availability_page: !1,
            client_id: ""
          })
        }
      )).json();
      if (console.log(" Clinician Availability API Response:", e), e.match_scores && ((a = e.match_scores[0]) != null && a.slots_data)) {
        const i = e.match_scores[0].slots_data;
        this._availableSlotsData = [...this.transformSlotsData(i)], console.log(
          "ClinicianAvailabilityContainer: Transformed slots data updated:",
          this._availableSlotsData
        );
      }
    } catch (t) {
      console.error(" Error fetching clinician availability:", t);
    } finally {
      this._isLoading = !1;
    }
  }
  // Helper method to transform the raw slots data from the API into a date-grouped format
  transformSlotsData(a) {
    const t = /* @__PURE__ */ new Map();
    a.forEach((i) => {
      var o;
      const s = i.slot_start_date_time.split("T")[0];
      t.has(s) || t.set(s, []), (o = t.get(s)) == null || o.push(i);
    });
    const e = Array.from(t.entries()).map(([i, s]) => ({
      [i]: s
    }));
    return console.log("result", e), e;
  }
  // LitElement lifecycle callback: Called once after the component is added to the DOM.
  // The API call is now triggered by togglePopup, not here, to ensure data is fetched when the modal opens.
  connectedCallback() {
    super.connectedCallback();
  }
  // Method to toggle the visibility of the appointment booking popup
  togglePopup() {
    this.showPopup = !this.showPopup, this.showPopup && this.fetchClinicianAvailability(), console.log(window.location.origin);
  }
  // Method to explicitly close the popup modal
  closePopup() {
    this.showPopup = !1;
  }
  // LitElement render method: Defines the component's UI
  render() {
    return u`
      <div class="flex flex-col items-center gap-2 ms-10">
        // <button
        //   class="bg-[#0FCC93] text-white px-4 py-2 rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0FCC93] focus:ring-offset-2"
        //   @click=${this.togglePopup} // Click handler to open/close the popup
        // >
        //   Book an Appointment
        // </button>
      </div>

      ${this.showPopup ? u`
            <div
              class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[10] p-4 main-container"
              @click=${(a) => {
      a.target === a.currentTarget && this.closePopup();
    }}
            >
              <div
                class="bg-white rounded-lg shadow-xl max-w-[632px]  max-h-[670px] modal-content-box relative"
              >
                <button
                  class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 z-10 "
                  @click=${this.closePopup} // Click handler to close the modal
                  aria-label="Close modal"
                >
                  <img src="${ge}" alt="close" class="w-3 h-3" />
                </button>

                <ca-widget-header .email=${this.email}></ca-widget-header>
                <div class=" mt-2">
                <div class="flex justify-center">
                  <date-slider
                    // Pass the current date as initialDate to ensure the slider starts from today
                    .initialDate=${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}
                  ></date-slider>
                  </div>

                  <div class="time-slots-scroll-container flex justify-center">
                    <time-slots-display
                      // Pass the transformed available slots data to the time-slot-display component
                      .availableSlotsData=${this._availableSlotsData}
                      // Pass the currently displayed dates from the slider to the time-slot-display component
                      .displayedDates=${this._displayedDates}
                      .isLoading=${this._isLoading}
                      class = "w-[514px] flex"
                    ></time-slots-display>
                  </div>
                </div>
              </div>
            </div>
          ` : null}
    `;
  }
};
g.styles = [
  ...wt(g, g, "styles") ? [wt(g, g, "styles")] : [],
  N`
      :host {
        font-family: "Source Sans Pro", sans-serif;
      }
      .modal-content-box {
        font-family: "Source Sans Pro", sans-serif;
        display: flex;
        flex-direction: column;
        width: 632px;
      }
      @media (min-width: 320px) and (max-width: 640px) {
      .modal-content-box {
        max-width: auto;
        width: 100%;
      }
    }
    `
];
E([
  y()
], g.prototype, "showPopup", 2);
E([
  C({ type: String, attribute: "data-email" })
], g.prototype, "email", 1);
E([
  C({ type: String, attribute: "data-subdomain" })
], g.prototype, "subdomain", 2);
E([
  y()
], g.prototype, "_availableSlotsData", 2);
E([
  y()
], g.prototype, "_displayedDates", 2);
E([
  y()
], g.prototype, "_isLoading", 2);
g = E([
  Z("clinician-availability-container")
], g);
class be {
  constructor() {
    this.widgetElement = null, this.subDomain = "", this.container = document.createElement("div"), this.container.id = "clinician-availability-widget-container";
  }
  init(t) {
    this.subDomain = t, this.widgetElement = document.createElement("clinician-availability-container"), this.widgetElement.dataset.subdomain = t, this.container.appendChild(this.widgetElement), document.body.appendChild(this.container);
  }
  openWidget(t) {
    this.widgetElement && (this.widgetElement.email = t, this.widgetElement.togglePopup());
  }
  closeWidget() {
    this.widgetElement && this.widgetElement.closePopup();
  }
}
window.ClinicianAvailabilityWidget = be;
export {
  be as ClinicianAvailabilityWidget
};
