/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, et = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, it = Symbol(), ot = /* @__PURE__ */ new WeakMap();
let bt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== it) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (et && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ot.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ot.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const _t = (i) => new bt(typeof i == "string" ? i : i + "", void 0, it), L = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new bt(e, i, it);
}, kt = (i, t) => {
  if (et) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = G.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, at = et ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return _t(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ct, defineProperty: Pt, getOwnPropertyDescriptor: Et, getOwnPropertyNames: Ot, getOwnPropertySymbols: Mt, getPrototypeOf: Tt } = Object, x = globalThis, nt = x.trustedTypes, Ut = nt ? nt.emptyScript : "", J = x.reactiveElementPolyfillSupport, U = (i, t) => i, W = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Ut : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, st = (i, t) => !Ct(i, t), lt = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: st };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = lt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && Pt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: o } = Et(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: r, set(a) {
      const l = r == null ? void 0 : r.call(this);
      o == null || o.call(this, a), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? lt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = Tt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, s = [...Ot(e), ...Mt(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(at(r));
    } else t !== void 0 && e.push(at(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return kt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var o;
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const a = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : W).toAttribute(e, s.type);
      this._$Em = t, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, a;
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const l = s.getPropertyOptions(r), n = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : W;
      this._$Em = r, this[r] = n.fromAttribute(e, l.type) ?? ((a = this._$Ej) == null ? void 0 : a.get(r)) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var r;
    if (t !== void 0) {
      const o = this.constructor, a = this[t];
      if (s ?? (s = o.getPropertyOptions(t)), !((s.hasChanged ?? st)(a, e) || s.useDefault && s.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: o }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, a] of r) {
        const { wrapped: l } = a, n = this[o];
        l !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, a, n);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var r;
      return (r = s.hostUpdated) == null ? void 0 : r.call(s);
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
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[U("elementProperties")] = /* @__PURE__ */ new Map(), P[U("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: P }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, q = j.trustedTypes, ct = q ? q.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, xt = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + b, jt = `<${$t}>`, C = document, N = () => C.createComment(""), H = (i) => i === null || typeof i != "object" && typeof i != "function", rt = Array.isArray, Nt = (i) => rt(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, dt = /-->/g, ht = />/g, D = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pt = /'/g, ut = /"/g, St = /^(?:script|style|textarea|title)$/i, Ht = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), u = Ht(1), E = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), gt = /* @__PURE__ */ new WeakMap(), A = C.createTreeWalker(C, 129);
function Dt(i, t) {
  if (!rt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ct !== void 0 ? ct.createHTML(t) : t;
}
const zt = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = T;
  for (let l = 0; l < e; l++) {
    const n = i[l];
    let d, p, c = -1, y = 0;
    for (; y < n.length && (a.lastIndex = y, p = a.exec(n), p !== null); ) y = a.lastIndex, a === T ? p[1] === "!--" ? a = dt : p[1] !== void 0 ? a = ht : p[2] !== void 0 ? (St.test(p[2]) && (r = RegExp("</" + p[2], "g")), a = D) : p[3] !== void 0 && (a = D) : a === D ? p[0] === ">" ? (a = r ?? T, c = -1) : p[1] === void 0 ? c = -2 : (c = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? D : p[3] === '"' ? ut : pt) : a === ut || a === pt ? a = D : a === dt || a === ht ? a = T : (a = D, r = void 0);
    const v = a === D && i[l + 1].startsWith("/>") ? " " : "";
    o += a === T ? n + jt : c >= 0 ? (s.push(d), n.slice(0, c) + xt + n.slice(c) + b + v) : n + b + (c === -2 ? l : v);
  }
  return [Dt(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class z {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const l = t.length - 1, n = this.parts, [d, p] = zt(t, e);
    if (this.el = z.createElement(d, s), A.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = A.nextNode()) !== null && n.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(xt)) {
          const y = p[a++], v = r.getAttribute(c).split(b), B = /([.?@])?(.*)/.exec(y);
          n.push({ type: 1, index: o, name: B[2], strings: v, ctor: B[1] === "." ? Rt : B[1] === "?" ? Ft : B[1] === "@" ? It : Z }), r.removeAttribute(c);
        } else c.startsWith(b) && (n.push({ type: 6, index: o }), r.removeAttribute(c));
        if (St.test(r.tagName)) {
          const c = r.textContent.split(b), y = c.length - 1;
          if (y > 0) {
            r.textContent = q ? q.emptyScript : "";
            for (let v = 0; v < y; v++) r.append(c[v], N()), A.nextNode(), n.push({ type: 2, index: ++o });
            r.append(c[y], N());
          }
        }
      } else if (r.nodeType === 8) if (r.data === $t) n.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(b, c + 1)) !== -1; ) n.push({ type: 7, index: o }), c += b.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = C.createElement("template");
    return s.innerHTML = t, s;
  }
}
function O(i, t, e = i, s) {
  var a, l;
  if (t === E) return t;
  let r = s !== void 0 ? (a = e._$Co) == null ? void 0 : a[s] : e._$Cl;
  const o = H(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = r : e._$Cl = r), r !== void 0 && (t = O(i, r._$AS(i, t.values), r, s)), t;
}
class Lt {
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
    const { el: { content: e }, parts: s } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? C).importNode(e, !0);
    A.currentNode = r;
    let o = A.nextNode(), a = 0, l = 0, n = s[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let d;
        n.type === 2 ? d = new R(o, o.nextSibling, this, t) : n.type === 1 ? d = new n.ctor(o, n.name, n.strings, this, t) : n.type === 6 && (d = new Vt(o, this, t)), this._$AV.push(d), n = s[++l];
      }
      a !== (n == null ? void 0 : n.index) && (o = A.nextNode(), a++);
    }
    return A.currentNode = C, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class R {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    t = O(this, t, e), H(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Nt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && H(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = z.createElement(Dt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const a = new Lt(r, this), l = a.u(this.options);
      a.p(e), this.T(l), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = gt.get(t.strings);
    return e === void 0 && gt.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    rt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t) r === e.length ? e.push(s = new R(this.O(N()), this.O(N()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = O(this, t, e, 0), a = !H(t) || t !== this._$AH && t !== E, a && (this._$AH = t);
    else {
      const l = t;
      let n, d;
      for (t = o[0], n = 0; n < o.length - 1; n++) d = O(this, l[s + n], e, n), d === E && (d = this._$AH[n]), a || (a = !H(d) || d !== this._$AH[n]), d === h ? t = h : t !== h && (t += (d ?? "") + o[n + 1]), this._$AH[n] = d;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Rt extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class Ft extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class It extends Z {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = O(this, t, e, 0) ?? h) === E) return;
    const s = this._$AH, r = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== h && (s === h || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Vt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    O(this, t);
  }
}
const X = j.litHtmlPolyfillSupport;
X == null || X(z, R), (j.litHtmlVersions ?? (j.litHtmlVersions = [])).push("3.3.0");
const Bt = (i, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = r = new R(t.insertBefore(N(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bt(e, this.renderRoot, this.renderOptions);
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
    return E;
  }
}
var mt;
$._$litElement$ = !0, $.finalized = !0, (mt = k.litElementHydrateSupport) == null || mt.call(k, { LitElement: $ });
const tt = k.litElementPolyfillSupport;
tt == null || tt({ LitElement: $ });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: st }, Wt = (i = Gt, t, e) => {
  const { kind: s, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: a } = e;
    return { set(l) {
      const n = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(a, n, i);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, i, l), l;
    } };
  }
  if (s === "setter") {
    const { name: a } = e;
    return function(l) {
      const n = this[a];
      t.call(this, l), this.requestUpdate(a, n, i);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function M(i) {
  return (t, e) => typeof e == "object" ? Wt(i, t, e) : ((s, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function S(i) {
  return M({ ...i, state: !0, attribute: !1 });
}
const qt = '/*! tailwindcss v4.1.7 | MIT License | https://tailwindcss.com */@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-space-x-reverse:0;--tw-border-style:solid;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-gray-100:oklch(96.7% .003 264.542);--color-gray-200:oklch(92.8% .006 264.531);--color-gray-400:oklch(70.7% .022 261.325);--color-gray-500:oklch(55.1% .027 264.364);--color-gray-600:oklch(44.6% .03 256.802);--color-gray-700:oklch(37.3% .034 259.733);--color-black:#000;--color-white:#fff;--spacing:.25rem;--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-lg:1.125rem;--text-lg--line-height:calc(1.75/1.125);--font-weight-semibold:600;--radius-md:.375rem;--radius-lg:.5rem;--blur-sm:8px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.inset-0{inset:calc(var(--spacing)*0)}.top-4{top:calc(var(--spacing)*4)}.right-4{right:calc(var(--spacing)*4)}.z-10{z-index:10}.z-\\[10000\\]{z-index:10000}.ms-10{margin-inline-start:calc(var(--spacing)*10)}.mt-2{margin-top:calc(var(--spacing)*2)}.mr-1{margin-right:calc(var(--spacing)*1)}.mr-auto{margin-right:auto}.mb-1{margin-bottom:calc(var(--spacing)*1)}.ml-auto{margin-left:auto}.flex{display:flex}.h-3{height:calc(var(--spacing)*3)}.h-4{height:calc(var(--spacing)*4)}.max-h-\\[670px\\]{max-height:670px}.w-3{width:calc(var(--spacing)*3)}.w-4{width:calc(var(--spacing)*4)}.w-\\[100\\%\\]{width:100%}.w-\\[500px\\]{width:500px}.w-\\[552px\\]{width:552px}.w-full{width:100%}.max-w-\\[552px\\]{max-width:552px}.max-w-\\[600px\\]{max-width:600px}.flex-shrink{flex-shrink:1}.flex-shrink-0{flex-shrink:0}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.flex-row{flex-direction:row}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.justify-evenly{justify-content:space-evenly}.gap-2{gap:calc(var(--spacing)*2)}:where(.space-y-2>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*2)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*2)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-x-1>:not(:last-child)){--tw-space-x-reverse:0;margin-inline-start:calc(calc(var(--spacing)*1)*var(--tw-space-x-reverse));margin-inline-end:calc(calc(var(--spacing)*1)*calc(1 - var(--tw-space-x-reverse)))}.overflow-x-hidden{overflow-x:hidden}.rounded{border-radius:.25rem}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.border{border-style:var(--tw-border-style);border-width:1px}.border-transparent{border-color:#0000}.bg-\\[\\#0FCC93\\]{background-color:#0fcc93}.bg-black\\/30{background-color:#0000004d}@supports (color:color-mix(in lab,red,red)){.bg-black\\/30{background-color:color-mix(in oklab,var(--color-black)30%,transparent)}}.bg-white{background-color:var(--color-white)}.p-1{padding:calc(var(--spacing)*1)}.p-2{padding:calc(var(--spacing)*2)}.p-4{padding:calc(var(--spacing)*4)}.px-1{padding-inline:calc(var(--spacing)*1)}.px-4{padding-inline:calc(var(--spacing)*4)}.px-6{padding-inline:calc(var(--spacing)*6)}.py-2{padding-block:calc(var(--spacing)*2)}.py-3{padding-block:calc(var(--spacing)*3)}.py-8{padding-block:calc(var(--spacing)*8)}.pt-5{padding-top:calc(var(--spacing)*5)}.pb-4{padding-bottom:calc(var(--spacing)*4)}.text-center{text-align:center}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-gray-200{color:var(--color-gray-200)}.text-gray-400{color:var(--color-gray-400)}.text-gray-500{color:var(--color-gray-500)}.text-gray-600{color:var(--color-gray-600)}.text-white{color:var(--color-white)}.shadow-sm{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a),0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px var(--tw-shadow-color,#0000001a),0 8px 10px -6px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.backdrop-blur-sm{--tw-backdrop-blur:blur(var(--blur-sm));-webkit-backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,)var(--tw-backdrop-brightness,)var(--tw-backdrop-contrast,)var(--tw-backdrop-grayscale,)var(--tw-backdrop-hue-rotate,)var(--tw-backdrop-invert,)var(--tw-backdrop-opacity,)var(--tw-backdrop-saturate,)var(--tw-backdrop-sepia,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,visibility,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}@media (hover:hover){.hover\\:bg-gray-100:hover{background-color:var(--color-gray-100)}.hover\\:bg-gray-200:hover{background-color:var(--color-gray-200)}.hover\\:text-\\[\\#0b9a72\\]:hover{color:#0b9a72}.hover\\:text-gray-700:hover{color:var(--color-gray-700)}}.focus\\:ring-2:focus{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus\\:ring-\\[\\#0FCC93\\]:focus{--tw-ring-color:#0fcc93}.focus\\:ring-gray-400:focus{--tw-ring-color:var(--color-gray-400)}.focus\\:ring-offset-1:focus{--tw-ring-offset-width:1px;--tw-ring-offset-shadow:var(--tw-ring-inset,)0 0 0 var(--tw-ring-offset-width)var(--tw-ring-offset-color)}.focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px;--tw-ring-offset-shadow:var(--tw-ring-inset,)0 0 0 var(--tw-ring-offset-width)var(--tw-ring-offset-color)}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}@media (min-width:40rem){.sm\\:px-2{padding-inline:calc(var(--spacing)*2)}.sm\\:px-3{padding-inline:calc(var(--spacing)*3)}}}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-space-x-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}', Zt = _t(qt), K = (i) => {
  var t;
  return t = class extends i {
    constructor(...s) {
      super(...s);
    }
  }, t.styles = [
    ...Array.isArray(i.styles) ? i.styles : [i.styles].filter(Boolean),
    L`${Zt}`
  ], t;
};
var Yt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, Jt = Object.getPrototypeOf, Qt = Reflect.get, At = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? Kt(t, e) : t, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (r = (s ? a(t, e, r) : a(r)) || r);
  return s && r && Yt(t, e, r), r;
}, ft = (i, t, e) => Qt(Jt(i), e, t);
const Xt = K($);
let _ = class extends Xt {
  constructor() {
    super(...arguments), this.email = "email@example.com";
  }
  render() {
    return u`
      <div class="pt-5 pb-4 px-6 text-center flex flex-col items-center flex-shrink-0">
        <p class="text-sm font-semibold mb-1">BOOK YOUR APPOINTMENT WITH</p>
        <h2 class="text-lg  text-gray-600">${this.email}</h2>
      </div>
    `;
  }
};
_.styles = [
  ...ft(_, _, "styles") ? [ft(_, _, "styles")] : [],
  L`
      /* Add any specific styles for this component if needed */
      :host {
        display: block; /* Ensure it takes up its own space */
      }
    `
];
At([
  M({ type: String })
], _.prototype, "email", 2);
_ = At([
  Y("ca-widget-header")
], _);
var te = Object.defineProperty, ee = Object.getOwnPropertyDescriptor, ie = Object.getPrototypeOf, se = Reflect.get, F = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? ee(t, e) : t, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (r = (s ? a(t, e, r) : a(r)) || r);
  return s && r && te(t, e, r), r;
}, wt = (i, t, e) => se(ie(i), e, t);
const re = K($), oe = u`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="8" fill="#354354"/>
<path d="M9.354 6.10169V10.1432C9.354 10.3072 9.26072 10.4576 9.11232 10.5337C8.96364 10.6098 8.78409 10.5989 8.64639 10.5055L5.58906 8.43285C5.47996 8.35902 5.41526 8.23739 5.41554 8.10783C5.4161 7.97814 5.48168 7.85689 5.59107 7.78366L8.6484 5.738C8.78669 5.64557 8.9654 5.63554 9.11354 5.71176C9.26132 5.78809 9.354 5.93812 9.354 6.10169Z" fill="white"/>
</svg>
`, ae = u`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8" r="8" transform="rotate(-180 8 8)" fill="#354354"/>
<path d="M6.646 9.89831V5.8568C6.646 5.69279 6.73928 5.54236 6.88768 5.4663C7.03636 5.39024 7.21591 5.40112 7.35361 5.49452L10.4109 7.56715C10.52 7.64098 10.5847 7.76261 10.5845 7.89217C10.5839 8.02186 10.5183 8.14311 10.4089 8.21634L7.3516 10.262C7.21331 10.3544 7.0346 10.3645 6.88646 10.2882C6.73868 10.2119 6.646 10.0619 6.646 9.89831Z" fill="white"/>
</svg>
`;
let g = class extends re {
  constructor() {
    super(...arguments), this.initialDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0], this._currentStartDate = /* @__PURE__ */ new Date(), this._selectedDate = null, this._datesToDisplay = [], this.DAYS_TO_SHOW = 5, this._today = /* @__PURE__ */ new Date();
  }
  connectedCallback() {
    super.connectedCallback(), this._today = /* @__PURE__ */ new Date(), this._today.setHours(0, 0, 0, 0);
    let i = /* @__PURE__ */ new Date(this.initialDate + "T00:00:00");
    if (isNaN(i.getTime()) ? i = new Date(this._today) : i.setHours(0, 0, 0, 0), this._currentStartDate = i < this._today ? new Date(this._today) : new Date(i), (!this._selectedDate || this._isPastDate(this._selectedDate)) && (this._selectedDate = new Date(this._currentStartDate), this._isPastDate(this._selectedDate))) {
      const e = new Date(this._today);
      this._selectedDate = e, this._currentStartDate = e;
    }
    this._generateDates();
    const t = this._datesToDisplay.find((e) => !this._isPastDate(e));
    t && (!this._selectedDate || this._isPastDate(this._selectedDate) || !this._datesToDisplay.some((e) => this._isSameDate(e, this._selectedDate))) ? this._handleDateClick(t) : this._selectedDate && !this._isPastDate(this._selectedDate) ? this._emitDateSelected(this._selectedDate) : this._emitDateSelected(null);
  }
  _generateDates() {
    const i = [];
    for (let t = 0; t < this.DAYS_TO_SHOW; t++) {
      const e = new Date(this._currentStartDate);
      e.setDate(this._currentStartDate.getDate() + t), i.push(e);
    }
    this._datesToDisplay = i;
  }
  _formatDate(i) {
    const t = i.toLocaleDateString(void 0, { weekday: "short" }), e = i.toLocaleDateString(void 0, { month: "numeric", day: "numeric" });
    return { dayName: t, monthDay: e };
  }
  _isPastDate(i) {
    const t = new Date(i);
    return t.setHours(0, 0, 0, 0), t < this._today;
  }
  _isSameDate(i, t) {
    return t ? i.getFullYear() === t.getFullYear() && i.getMonth() === t.getMonth() && i.getDate() === t.getDate() : !1;
  }
  _emitDateSelected(i) {
    this.dispatchEvent(
      new CustomEvent("date-selected", {
        detail: { date: i ? new Date(i) : null },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _handleDateClick(i) {
    this._isPastDate(i) || (this._selectedDate = new Date(i), this._emitDateSelected(this._selectedDate), this.requestUpdate());
  }
  _navigate(i) {
    const t = new Date(this._currentStartDate), e = i === "prev" ? -5 : 5;
    t.setDate(this._currentStartDate.getDate() + e), i === "prev" && t < this._today ? this._currentStartDate = new Date(this._today) : this._currentStartDate = t, this._generateDates();
    const s = this._selectedDate && this._datesToDisplay.some((r) => this._isSameDate(r, this._selectedDate));
    if (!this._selectedDate || !s || this._isPastDate(this._selectedDate)) {
      const r = this._datesToDisplay.find((o) => !this._isPastDate(o));
      r ? this._handleDateClick(r) : this._selectedDate && (this._selectedDate = null, this._emitDateSelected(null));
    }
    this.requestUpdate();
  }
  render() {
    const i = !this._isSameDate(this._currentStartDate, this._today) && this._currentStartDate > this._today;
    return u`
      <div class="flex items-center justify-between px-1 sm:px-2 py-3 bg-white w-[552px]">
        <button
          @click=${() => this._navigate("prev")}
          class="nav-button p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0FCC93]"
          .disabled=${!i}
          aria-label="Previous dates"
        >
          ${oe}
        </button>
        <div class="flex space-x-1 overflow-x-hidden justify-evenly w-[100%]">
          ${this._datesToDisplay.map((t) => {
      const { dayName: e, monthDay: s } = this._formatDate(t), r = this._isPastDate(t), o = this._isSameDate(t, this._selectedDate);
      return u`
              <button
                @click=${() => this._handleDateClick(t)}
                class="date-item-base flex flex-row items-center justify-center p-2 border border-transparent rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0FCC93]
                       ${r ? "disabled" : "cursor-pointer"}
                       ${o ? "selected" : "bg-white"}"
                .disabled=${r}
                aria-pressed="${o}"
                aria-label="Select date ${e} ${s}"
              >
                <span class="day-name text-sm font-semibold ${o ? "" : r ? "text-gray-400" : "text-gray-600"} mr-1">${e}</span>
                <span class="month-day text-sm ${o ? "" : r ? "text-gray-200" : "text-gray-400"}">${s}</span>
              </button>
            `;
    })}
        </div>
        <button
          @click=${() => this._navigate("next")}
          class="nav-button p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0FCC93]"
          aria-label="Next dates"
        >
          ${ae}
        </button>
      </div>
    `;
  }
};
g.styles = [
  ...wt(g, g, "styles") ? [wt(g, g, "styles")] : [],
  L`
      :host {
        display: block;
        font-family: "Source Sans Pro", sans-serif;
      }
      .date-item-base {
        max-width: 84px; /* Adjust as needed */
        flex-shrink: 0;
      }
      .disabled {
        color: #a0aec0; /* Tailwind gray-500 */
        cursor: not-allowed;
        opacity: 0.6;
      }
      
      .nav-button:disabled {
        color: #cbd5e0; /* Tailwind gray-400 */
        cursor: not-allowed;
        opacity: 0.5;
      }
    `
];
F([
  M({ type: String })
], g.prototype, "initialDate", 2);
F([
  S()
], g.prototype, "_currentStartDate", 2);
F([
  S()
], g.prototype, "_selectedDate", 2);
F([
  S()
], g.prototype, "_datesToDisplay", 2);
g = F([
  Y("date-slider")
], g);
var ne = Object.defineProperty, le = Object.getOwnPropertyDescriptor, ce = Object.getPrototypeOf, de = Reflect.get, I = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? le(t, e) : t, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (r = (s ? a(t, e, r) : a(r)) || r);
  return s && r && ne(t, e, r), r;
}, yt = (i, t, e) => de(ce(i), e, t);
const he = K($), pe = u`<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.17188 3.7002C8.13367 3.7004 8.9246 4.47213 8.9248 5.45312V9.50977C8.92455 10.4751 8.13723 11.2625 7.17188 11.2627H2.70312C1.73777 11.2625 0.950448 10.4751 0.950195 9.50977V5.45312C0.9504 4.48774 1.73774 3.7004 2.70312 3.7002H7.17188ZM11.5186 4.37012C12.3276 4.20441 13.0498 4.8304 13.0498 5.61035V9.3291C13.0497 9.56573 12.9837 9.77718 12.8838 9.95703L12.8779 9.96777C12.5257 10.5687 11.7624 10.7902 11.1436 10.4307V10.4316L9.25391 9.34863L8.97754 9.19043V5.76172L9.25195 5.60254L11.1299 4.51953C11.2035 4.47586 11.3306 4.4089 11.4854 4.37695V4.37598C11.4909 4.3747 11.4964 4.37327 11.502 4.37207C11.5075 4.37104 11.513 4.37007 11.5186 4.36914V4.37012Z" fill="#354354" stroke="white" stroke-width="1.1"/>
</svg>
`, ue = u`<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.97827 1.89355C8.66001 1.89366 10.0339 3.26746 10.0339 4.94922C10.0339 6.13574 9.34852 7.16624 8.35522 7.67188C9.82558 8.068 11.0611 9.0845 11.615 10.4854H11.616C11.8391 11.0209 11.8027 11.6979 11.4275 12.2139L11.4255 12.2129C11.0993 12.7025 10.5281 13.0048 9.94702 13.0049H4.00952C3.42849 13.0049 2.85728 12.7025 2.53101 12.2129L2.52905 12.2139C2.15153 11.6948 2.12183 11.0536 2.33472 10.5L2.33569 10.4961L2.40601 10.3271C2.98792 9.00783 4.186 8.05308 5.60034 7.67188C4.6073 7.16615 3.92261 6.13556 3.92261 4.94922C3.92261 3.26739 5.29645 1.89355 6.97827 1.89355Z" fill="#354354" stroke="white" stroke-width="1.11111"/>
</svg>
`, ge = u`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1 text-gray-500"><path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM7.75 11a.75.75 0 0 0-1.5 0V12c0 .513.044 1.015.129 1.494-.02.004-.039.007-.058.011a9.957 9.957 0 0 0-5.053 2.795 1.23 1.23 0 0 0 .41 1.412A9.955 9.955 0 0 0 10 18a9.955 9.955 0 0 0 7.322-2.288 1.23 1.23 0 0 0 .41-1.412 9.957 9.957 0 0 0-5.053-2.795c-.02-.004-.038-.007-.058-.011.085-.479.129-.981.129-1.494v-1a.75.75 0 0 0-1.5 0v.532c.039.052.076.106.11.16l.002.003c.015.023.03.047.043.072.021.04.04.082.058.126.014.034.027.068.039.103.018.052.033.105.046.159.012.047.02.095.026.144.007.058.01.117.01.177h-3.02c0-.06.003-.119.01-.177.005-.049.014-.097.026-.144a2.399 2.399 0 0 1 .046-.159c.012-.035.025-.069.039-.103.018-.044.037-.086.058-.126.013-.025.028-.049.043-.072l.002-.003a1.494 1.494 0 0 1 .11-.16V11Z" /></svg>`;
let f = class extends he {
  constructor() {
    super(...arguments), this.selectedDate = null, this.availability = {}, this._slotsForSelectedDate = [], this._selectedSlot = null;
  }
  _getSlotDetails(i) {
    return i === "8:00 AM" || i === "10:00 AM" ? { icon: ue, typeName: "Individual Session" } : i === "4:00 PM" || i === "2:30 PM" ? { icon: ge, typeName: "Group Session" } : { icon: pe, typeName: "Video Call" };
  }
  willUpdate(i) {
    (i.has("selectedDate") || i.has("availability")) && (console.log(Object.values(this.availability)), this._slotsForSelectedDate = Object.values(this.availability), this._selectedSlot = null);
  }
  _handleSlotClick(i) {
    this._selectedSlot = i, this.dispatchEvent(
      new CustomEvent("slot-selected", {
        detail: { slot: i, date: this.selectedDate },
        bubbles: !0,
        composed: !0
      })
    ), this.requestUpdate();
  }
  render() {
    return this.selectedDate ? this._slotsForSelectedDate.length === 0 ? u`<p class="text-center text-gray-500 py-8">No availability for this date.</p>` : u`
    <div class="flex items-center justify-end px-1 sm:px-3 py-3 bg-white w-[552px]">
      <div class="space-y-2 py-2w-[500px] flex overflow-x-hidden">
        ${this._slotsForSelectedDate.slice(0, 5).map((i) => u`
          <div class="flex flex-col gap-2">
          ${i.map((t) => {
      const e = this._getSlotDetails(t), s = this._selectedSlot === t;
      return u`
            <button
              class="slot-button ${s ? "selected" : ""}"
              @click=${() => this._handleSlotClick(t)}
              aria-pressed="${s}"
              aria-label="Select time slot ${t}, type ${e.typeName}"
            >
              <div class=" slot-details">
                ${e.icon}
              </div>
              <span class="slot-time">${t}</span>
            </button>
          `;
    })}</div>`)}
      </div>
      </div>
    ` : u`<p class="text-center text-gray-500 py-8">Select a date to see availability.</p>`;
  }
};
f.styles = [
  ...yt(f, f, "styles") ? [yt(f, f, "styles")] : [],
  L`
      :host {
        display: block;
        font-family: "Source Sans Pro", sans-serif;
        padding: 0 0.8rem; /* Consistent with image padding */
      }
      .slot-button {
        display: flex;
        align-items: center;
        justify-content: space-around;
        max-width: 86px;
        width: 86px;
        /* height: 25px; */
        padding: 4px 3px;
        margin-bottom: 0.5rem;
        margin-right: 6px;
        border: 2px solid #E2E8F0; /* gray-300 */
        border-radius: 0.375rem; /* rounded-md */
        background-color: white;
        text-align: left;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
      }
      .slot-button:hover {
        background-color: #F7FAFC; /* gray-50 */
        border-color: #CBD5E0; /* gray-400 */
      }
      .slot-button.selected {
        border-color: #0FCC93; /* Primary green */
        background-color: #F0FDFA; /* Lighter green */
        box-shadow: 0 0 0 1px #0FCC93; /* Ring effect */
      }
      .slot-button.selected .slot-time {
          color: #047857; /* Darker green text */
          font-weight: 600;
      }
      .slot-button.selected .slot-type,
      .slot-button.selected svg { /* Target svg within selected button for icon color change */
          color: #059669; /* Mid green */
      }
      .slot-details {
        display: flex;
        align-items: center;
        color: #4A5568; /* gray-700 */
        font-size: 0.875rem; /* text-sm */
      }
      .slot-time {
        font-weight: 500; /* medium */
        font-size: 0.875rem; /* text-sm */
        color: #374151; /* gray-700 */
      }
    `
];
I([
  M({ type: Object })
], f.prototype, "selectedDate", 2);
I([
  M({ type: Object })
], f.prototype, "availability", 2);
I([
  S()
], f.prototype, "_slotsForSelectedDate", 2);
I([
  S()
], f.prototype, "_selectedSlot", 2);
f = I([
  Y("time-slots-display")
], f);
const fe = "data:image/svg+xml,%3csvg%20width='12'%20height='12'%20viewBox='0%200%2012%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.4418%209.62762C11.7752%209.94963%2011.909%2010.4265%2011.7916%2010.8749C11.6742%2011.3233%2011.3239%2011.6735%2010.8754%2011.7909C10.4269%2011.9082%209.94995%2011.7745%209.62786%2011.4411L6.00008%207.81284L2.3723%2011.4411C1.86895%2011.9272%201.06886%2011.9202%200.574033%2011.4255C0.07921%2010.9308%200.0722574%2010.1309%200.558406%209.62762L4.18619%205.99935L0.558406%202.37108C0.224932%202.04907%200.0911911%201.57222%200.208588%201.12381C0.325985%200.675405%200.676249%200.325217%201.12476%200.207846C1.57326%200.0904753%202.05022%200.224186%202.3723%200.557588L6.00008%204.18586L9.62786%200.557588C9.94995%200.224186%2010.4269%200.0904753%2010.8754%200.207846C11.3239%200.325217%2011.6742%200.675405%2011.7916%201.12381C11.909%201.57222%2011.7752%202.04907%2011.4418%202.37108L7.81397%205.99935L11.4418%209.62762Z'%20fill='%23354354'/%3e%3c/svg%3e";
var we = Object.defineProperty, ye = Object.getOwnPropertyDescriptor, ve = Object.getPrototypeOf, me = Reflect.get, V = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? ye(t, e) : t, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (r = (s ? a(t, e, r) : a(r)) || r);
  return s && r && we(t, e, r), r;
}, vt = (i, t, e) => me(ve(i), e, t);
const m = (i) => {
  if (!i) return null;
  const t = i.getFullYear(), e = (i.getMonth() + 1).toString().padStart(2, "0"), s = i.getDate().toString().padStart(2, "0");
  return `${t}-${e}-${s}`;
}, be = K($);
let w = class extends be {
  // Will be populated in constructor
  constructor() {
    super(), this.showPopup = !1, this.email = "", this._selectedDate = null, this._selectedSlot = null, this.mockAvailability = {}, this.mockAvailability = {
      [m(this.getFutureDate(0))]: [
        "8:00 AM",
        "2:30 PM",
        "3:30 PM"
      ],
      [m(this.getFutureDate(1))]: ["10:00 AM", "4:00 PM"],
      [m(this.getFutureDate(2))]: [
        "10:00 AM",
        "11:00 AM",
        "3:00 PM"
      ],
      [m(this.getFutureDate(3))]: [
        "10:00 AM",
        "11:00 AM",
        "3:00 PM"
      ],
      [m(this.getFutureDate(4))]: [
        "10:00 AM",
        "11:00 AM",
        "3:00 PM"
      ],
      [m(this.getFutureDate(5))]: ["9:00 AM", "1:00 PM"],
      [m(this.getFutureDate(6))]: ["11:30 AM"],
      [m(this.getFutureDate(10))]: ["2:00 PM", "2:30 PM"]
    };
  }
  getFutureDate(i) {
    const t = /* @__PURE__ */ new Date();
    return t.setDate(t.getDate() + i), t.setHours(0, 0, 0, 0), t;
  }
  _handleDateSelected(i) {
    this._selectedDate = i.detail.date ? new Date(i.detail.date) : null, this._selectedSlot = null, console.log("Date selected in container:", this._selectedDate);
  }
  _handleSlotSelected(i) {
    var t;
    this._selectedSlot = i.detail.slot, console.log(
      `Slot selected: ${this._selectedSlot} on ${(t = this._selectedDate) == null ? void 0 : t.toLocaleDateString()}`
    );
  }
  togglePopup() {
    if (this.showPopup = !this.showPopup, console.log(window.location.origin), this.showPopup && !this._selectedDate) {
      const i = /* @__PURE__ */ new Date();
      i.setHours(0, 0, 0, 0), this._selectedDate = i;
    }
  }
  closePopup() {
    this.showPopup = !1;
  }
  render() {
    const i = this._selectedDate && this._selectedDate >= new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)) ? this._selectedDate.toISOString().split("T")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    return u`
      <div class="flex flex-col items-center gap-2 ms-10">
        <button
          class="bg-[#0FCC93] text-white px-4 py-2 rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0FCC93] focus:ring-offset-2"
          @click=${this.togglePopup}
        >
          Book an Appointment
        </button>
      </div>

      ${this.showPopup ? u`
            <div
              class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[10000] p-4 main-container"
              @click=${(t) => {
      t.target === t.currentTarget && this.closePopup();
    }}
            >
              <div
                class="bg-white rounded-lg shadow-xl w-full max-w-[600px]  max-h-[670px] modal-content-box relative"
              >
                <button
                  class="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 z-10 "
                  @click=${this.closePopup}
                  aria-label="Close modal"
                >
                  <img src="${fe}" alt="close" class="w-3 h-3" />
                </button>

                <ca-widget-header .email=${this.email}></ca-widget-header>
                <div class="max-w-[552px] ml-auto mr-auto mt-2">
                  <date-slider
                    .initialDate=${i}
                    @date-selected=${this._handleDateSelected}
                  ></date-slider>

                  <div class="time-slots-scroll-container">
                    <time-slots-display
                      .selectedDate=${this._selectedDate}
                      .availability=${this.mockAvailability}
                      @slot-selected=${this._handleSlotSelected}
                      class = "w-[500px] flex overflow-x-hidden"
                    ></time-slots-display>
                  </div>

                  <p
                    class="view-more-availability hover:text-[#0b9a72]"
                    @click=${() => console.log("View More Availability clicked")}
                    role="button"
                    tabindex="0"
                  >
                    View More Availability <span aria-hidden="true">↓</span>
                  </p>
                </div>
              </div>
            </div>
          ` : null}
    `;
  }
};
w.styles = [
  ...vt(w, w, "styles") ? [vt(w, w, "styles")] : [],
  L`
      :host {
        font-family: "Source Sans Pro", sans-serif;
      }
      .modal-content-box {
        font-family: "Source Sans Pro", sans-serif; /* Ensure font propagates */
        display: flex;
        flex-direction: column;
        overflow: hidden; /* Important for rounded corners and internal scrolling */
        width: 600px; /* Based on Figma image, seems around this width */
      }
      .time-slots-scroll-container {
        width:500px;
        overflow-y: auto;
        /* Smooth scrolling */
        -webkit-overflow-scrolling: touch;
        max-width:500px;
        display: flex;
        margin: 0 auto; 
        overflow-x : hidden;
        max-width: 500px;
      }
      .view-more-availability {
        text-align: center;
        padding: 0.75rem 0; /* 12px top/bottom */
        font-size: 0.875rem; /* text-sm */
        cursor: pointer;
        background-color: white; /* To overlay on content if sticky needed */
        border-top: 1px solid #e5e7eb; /* gray-200 */
        flex-shrink: 0; /* Prevent shrinking */
        display: flex; /* Use flex to center content including icon */
        justify-content: center;
        align-items: center;
        gap: 0.25rem; /* Small gap between text and icon */
      }
    `
];
V([
  S()
], w.prototype, "showPopup", 2);
V([
  M({ type: String, attribute: "data-email" })
], w.prototype, "email", 2);
V([
  S()
], w.prototype, "_selectedDate", 2);
V([
  S()
], w.prototype, "_selectedSlot", 2);
w = V([
  Y("clinician-availability-container")
], w);
