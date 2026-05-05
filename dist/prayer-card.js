var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i5 = 0, fns = array[flags >> 1], n5 = fns && fns.length; i5 < n5; i5++) flags & 1 ? fns[i5].call(self) : value = fns[i5].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k2 = flags & 7, s4 = !!(flags & 8), p3 = !!(flags & 16);
  var j = k2 > 3 ? array.length + 1 : k2 ? s4 ? 1 : 2 : 0, key = __decoratorStrings[k2 + 5];
  var initializers = k2 > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k2 && (!p3 && !s4 && (target = target.prototype), k2 < 5 && (k2 > 3 || !p3) && __getOwnPropDesc(k2 < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x2) {
    return __privateSet(this, extra, x2);
  } }, name));
  k2 ? p3 && k2 < 4 && __name(extra, (k2 > 2 ? "set " : k2 > 1 ? "get " : "") + name) : __name(target, name);
  for (var i5 = decorators.length - 1; i5 >= 0; i5--) {
    ctx = __decoratorContext(k2, name, done = {}, array[3], extraInitializers);
    if (k2) {
      ctx.static = s4, ctx.private = p3, access = ctx.access = { has: p3 ? (x2) => __privateIn(target, x2) : (x2) => name in x2 };
      if (k2 ^ 3) access.get = p3 ? (x2) => (k2 ^ 1 ? __privateGet : __privateMethod)(x2, target, k2 ^ 4 ? extra : desc.get) : (x2) => x2[name];
      if (k2 > 2) access.set = p3 ? (x2, y3) => __privateSet(x2, target, y3, k2 ^ 4 ? extra : desc.set) : (x2, y3) => x2[name] = y3;
    }
    it = (0, decorators[i5])(k2 ? k2 < 4 ? p3 ? extra : desc[key] : k2 > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k2 ^ 4 || it === void 0) __expectFn(it) && (k2 > 4 ? initializers.unshift(it) : k2 ? p3 ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k2 || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p3 ? k2 ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t4, e5, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4, this.t = e5;
  }
  get styleSheet() {
    let t4 = this.o;
    const s4 = this.t;
    if (e && void 0 === t4) {
      const e5 = void 0 !== s4 && 1 === s4.length;
      e5 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s4, t4));
    }
    return t4;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
var i = (t4, ...e5) => {
  const o6 = 1 === t4.length ? t4[0] : e5.reduce((e6, s4, o7) => e6 + ((t5) => {
    if (true === t5._$cssResult$) return t5.cssText;
    if ("number" == typeof t5) return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t4[o7 + 1], t4[0]);
  return new n(o6, t4, s);
};
var S = (s4, o6) => {
  if (e) s4.adoptedStyleSheets = o6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
  else for (const e5 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e5.cssText, s4.appendChild(o7);
  }
};
var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e5 = "";
  for (const s4 of t5.cssRules) e5 += s4.cssText;
  return r(e5);
})(t4) : t4;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t4, s4) => t4;
var u = { toAttribute(t4, s4) {
  switch (s4) {
    case Boolean:
      t4 = t4 ? l : null;
      break;
    case Object:
    case Array:
      t4 = null == t4 ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, s4) {
  let i5 = t4;
  switch (s4) {
    case Boolean:
      i5 = null !== t4;
      break;
    case Number:
      i5 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t4);
      } catch (t5) {
        i5 = null;
      }
  }
  return i5;
} };
var f = (t4, s4) => !i2(t4, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var y = class extends HTMLElement {
  static addInitializer(t4) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t4);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t4, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t4) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t4, s4), !s4.noAccessor) {
      const i5 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t4, i5, s4);
      void 0 !== h3 && e2(this.prototype, t4, h3);
    }
  }
  static getPropertyDescriptor(t4, s4, i5) {
    const { get: e5, set: r6 } = h(this.prototype, t4) ?? { get() {
      return this[s4];
    }, set(t5) {
      this[s4] = t5;
    } };
    return { get: e5, set(s5) {
      const h3 = e5?.call(this);
      r6?.call(this, s5), this.requestUpdate(t4, h3, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t4 = n2(this);
    t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t5 = this.properties, s4 = [...r2(t5), ...o2(t5)];
      for (const i5 of s4) this.createProperty(i5, t5[i5]);
    }
    const t4 = this[Symbol.metadata];
    if (null !== t4) {
      const s4 = litPropertyMetadata.get(t4);
      if (void 0 !== s4) for (const [t5, i5] of s4) this.elementProperties.set(t5, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t5, s4] of this.elementProperties) {
      const i5 = this._$Eu(t5, s4);
      void 0 !== i5 && this._$Eh.set(i5, t5);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i5 = [];
    if (Array.isArray(s4)) {
      const e5 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e5) i5.unshift(c(s5));
    } else void 0 !== s4 && i5.push(c(s4));
    return i5;
  }
  static _$Eu(t4, s4) {
    const i5 = s4.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t4) => t4(this));
  }
  addController(t4) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
  }
  removeController(t4) {
    this._$EO?.delete(t4);
  }
  _$E_() {
    const t4 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t4.set(i5, this[i5]), delete this[i5]);
    t4.size > 0 && (this._$Ep = t4);
  }
  createRenderRoot() {
    const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t4, this.constructor.elementStyles), t4;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t4) => t4.hostConnected?.());
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t4) => t4.hostDisconnected?.());
  }
  attributeChangedCallback(t4, s4, i5) {
    this._$AK(t4, i5);
  }
  _$ET(t4, s4) {
    const i5 = this.constructor.elementProperties.get(t4), e5 = this.constructor._$Eu(t4, i5);
    if (void 0 !== e5 && true === i5.reflect) {
      const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
      this._$Em = t4, null == h3 ? this.removeAttribute(e5) : this.setAttribute(e5, h3), this._$Em = null;
    }
  }
  _$AK(t4, s4) {
    const i5 = this.constructor, e5 = i5._$Eh.get(t4);
    if (void 0 !== e5 && this._$Em !== e5) {
      const t5 = i5.getPropertyOptions(e5), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
      this._$Em = e5;
      const r6 = h3.fromAttribute(s4, t5.type);
      this[e5] = r6 ?? this._$Ej?.get(e5) ?? r6, this._$Em = null;
    }
  }
  requestUpdate(t4, s4, i5, e5 = false, h3) {
    if (void 0 !== t4) {
      const r6 = this.constructor;
      if (false === e5 && (h3 = this[t4]), i5 ?? (i5 = r6.getPropertyOptions(t4)), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(r6._$Eu(t4, i5)))) return;
      this.C(t4, s4, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t4, s4, { useDefault: i5, reflect: e5, wrapped: h3 }, r6) {
    i5 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t4) && (this._$Ej.set(t4, r6 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r6) || (this._$AL.has(t4) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t4, s4)), true === e5 && this._$Em !== t4 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t4));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return null != t4 && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t6, s5] of this._$Ep) this[t6] = s5;
        this._$Ep = void 0;
      }
      const t5 = this.constructor.elementProperties;
      if (t5.size > 0) for (const [s5, i5] of t5) {
        const { wrapped: t6 } = i5, e5 = this[s5];
        true !== t6 || this._$AL.has(s5) || void 0 === e5 || this.C(s5, void 0, i5, e5);
      }
    }
    let t4 = false;
    const s4 = this._$AL;
    try {
      t4 = this.shouldUpdate(s4), t4 ? (this.willUpdate(s4), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t4 = false, this._$EM(), s5;
    }
    t4 && this._$AE(s4);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    this._$EO?.forEach((t5) => t5.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t5) => this._$ET(t5, this[t5]))), this._$EM();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t4) => t4;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
var u2 = Array.isArray;
var d2 = (t4) => u2(t4) || "function" == typeof t4?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t4) => (i5, ...s4) => ({ _$litType$: t4, strings: i5, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t4, i5) {
  if (!u2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
var N = (t4, i5) => {
  const s4 = t4.length - 1, e5 = [];
  let n5, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
  for (let i6 = 0; i6 < s4; i6++) {
    const s5 = t4[i6];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
    const x2 = c4 === p2 && t4[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e5.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i6 : x2);
  }
  return [V(t4, l3 + (t4[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e5];
};
var S2 = class _S {
  constructor({ strings: t4, _$litType$: i5 }, e5) {
    let r6;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = N(t4, i5);
    if (this.el = _S.createElement(f3, e5), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r6 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes()) for (const t5 of r6.getAttributeNames()) if (t5.endsWith(h2)) {
          const i6 = v2[a3++], s4 = r6.getAttribute(t5).split(o3), e6 = /([.?@])?(.*)/.exec(i6);
          d3.push({ type: 1, index: l3, name: e6[2], strings: s4, ctor: "." === e6[1] ? I : "?" === e6[1] ? L : "@" === e6[1] ? z : H }), r6.removeAttribute(t5);
        } else t5.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r6.removeAttribute(t5));
        if (y2.test(r6.tagName)) {
          const t5 = r6.textContent.split(o3), i6 = t5.length - 1;
          if (i6 > 0) {
            r6.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i6; s4++) r6.append(t5[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r6.append(t5[i6], c3());
          }
        }
      } else if (8 === r6.nodeType) if (r6.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t5 = -1;
        for (; -1 !== (t5 = r6.data.indexOf(o3, t5 + 1)); ) d3.push({ type: 7, index: l3 }), t5 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t4, i5) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t4, s4;
  }
};
function M(t4, i5, s4 = t4, e5) {
  if (i5 === E) return i5;
  let h3 = void 0 !== e5 ? s4._$Co?.[e5] : s4._$Cl;
  const o6 = a2(i5) ? void 0 : i5._$litDirective$;
  return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t4), h3._$AT(t4, s4, e5)), void 0 !== e5 ? (s4._$Co ?? (s4._$Co = []))[e5] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = M(t4, h3._$AS(t4, i5.values), h3, e5)), i5;
}
var R = class {
  constructor(t4, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    const { el: { content: i5 }, parts: s4 } = this._$AD, e5 = (t4?.creationScope ?? l2).importNode(i5, true);
    P.currentNode = e5;
    let h3 = P.nextNode(), o6 = 0, n5 = 0, r6 = s4[0];
    for (; void 0 !== r6; ) {
      if (o6 === r6.index) {
        let i6;
        2 === r6.type ? i6 = new k(h3, h3.nextSibling, this, t4) : 1 === r6.type ? i6 = new r6.ctor(h3, r6.name, r6.strings, this, t4) : 6 === r6.type && (i6 = new Z(h3, this, t4)), this._$AV.push(i6), r6 = s4[++n5];
      }
      o6 !== r6?.index && (h3 = P.nextNode(), o6++);
    }
    return P.currentNode = l2, e5;
  }
  p(t4) {
    let i5 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t4[i5])), i5++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t4, i5, s4, e5) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s4, this.options = e5, this._$Cv = e5?.isConnected ?? true;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t4?.nodeType && (t4 = i5.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i5 = this) {
    t4 = M(this, t4, i5), a2(t4) ? t4 === A || null == t4 || "" === t4 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t4 !== this._$AH && t4 !== E && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : d2(t4) ? this.k(t4) : this._(t4);
  }
  O(t4) {
    return this._$AA.parentNode.insertBefore(t4, this._$AB);
  }
  T(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
  }
  _(t4) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(l2.createTextNode(t4)), this._$AH = t4;
  }
  $(t4) {
    const { values: i5, _$litType$: s4 } = t4, e5 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e5) this._$AH.p(i5);
    else {
      const t5 = new R(e5, this), s5 = t5.u(this.options);
      t5.p(i5), this.T(s5), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i5 = C.get(t4.strings);
    return void 0 === i5 && C.set(t4.strings, i5 = new S2(t4)), i5;
  }
  k(t4) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s4, e5 = 0;
    for (const h3 of t4) e5 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e5], s4._$AI(h3), e5++;
    e5 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e5), i5.length = e5);
  }
  _$AR(t4 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t4 !== this._$AB; ) {
      const s5 = i3(t4).nextSibling;
      i3(t4).remove(), t4 = s5;
    }
  }
  setConnected(t4) {
    void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t4, i5, s4, e5, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e5, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t4, i5 = this, s4, e5) {
    const h3 = this.strings;
    let o6 = false;
    if (void 0 === h3) t4 = M(this, t4, i5, 0), o6 = !a2(t4) || t4 !== this._$AH && t4 !== E, o6 && (this._$AH = t4);
    else {
      const e6 = t4;
      let n5, r6;
      for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r6 = M(this, e6[s4 + n5], i5, n5), r6 === E && (r6 = this._$AH[n5]), o6 || (o6 = !a2(r6) || r6 !== this._$AH[n5]), r6 === A ? t4 = A : t4 !== A && (t4 += (r6 ?? "") + h3[n5 + 1]), this._$AH[n5] = r6;
    }
    o6 && !e5 && this.j(t4);
  }
  j(t4) {
    t4 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t4) {
    this.element[this.name] = t4 === A ? void 0 : t4;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t4) {
    this.element.toggleAttribute(this.name, !!t4 && t4 !== A);
  }
};
var z = class extends H {
  constructor(t4, i5, s4, e5, h3) {
    super(t4, i5, s4, e5, h3), this.type = 5;
  }
  _$AI(t4, i5 = this) {
    if ((t4 = M(this, t4, i5, 0) ?? A) === E) return;
    const s4 = this._$AH, e5 = t4 === A && s4 !== A || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== A && (s4 === A || e5);
    e5 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var Z = class {
  constructor(t4, i5, s4) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    M(this, t4);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.2");
var D = (t4, i5, s4) => {
  const e5 = s4?.renderBefore ?? i5;
  let h3 = e5._$litPart$;
  if (void 0 === h3) {
    const t5 = s4?.renderBefore ?? null;
    e5._$litPart$ = h3 = new k(i5.insertBefore(c3(), t5), t5, void 0, s4 ?? {});
  }
  return h3._$AI(t4), h3;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t4 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t4.firstChild), t4;
  }
  update(t4) {
    const r6 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = D(r6, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
(s3.litElementVersions ?? (s3.litElementVersions = [])).push("4.2.2");

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t4) => (e5, o6) => {
  void 0 !== o6 ? o6.addInitializer(() => {
    customElements.define(t4, e5);
  }) : customElements.define(t4, e5);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t4 = o5, e5, r6) => {
  const { kind: n5, metadata: i5 } = r6;
  let s4 = globalThis.litPropertyMetadata.get(i5);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t4 = Object.create(t4)).wrapped = true), s4.set(r6.name, t4), "accessor" === n5) {
    const { name: o6 } = r6;
    return { set(r7) {
      const n6 = e5.get.call(this);
      e5.set.call(this, r7), this.requestUpdate(o6, n6, t4, true, r7);
    }, init(e6) {
      return void 0 !== e6 && this.C(o6, void 0, t4, e6), e6;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r6;
    return function(r7) {
      const n6 = this[o6];
      e5.call(this, r7), this.requestUpdate(o6, n6, t4, true, r7);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t4) {
  return (e5, o6) => "object" == typeof o6 ? r4(t4, e5, o6) : ((t5, e6, o7) => {
    const r6 = e6.hasOwnProperty(o7);
    return e6.constructor.createProperty(o7, t5), r6 ? Object.getOwnPropertyDescriptor(e6, o7) : void 0;
  })(t4, e5, o6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}

// src/translations.ts
var TRANSLATIONS = {
  en: {
    "Fajr": "Fajr",
    "Sunrise": "Sunrise",
    "Dhuhr": "Dhuhr",
    "Asr": "Asr",
    "Maghrib": "Maghrib",
    "Isha": "Isha",
    "Now": "Now",
    "Hijri Date": "Hijri Date",
    "Next Events": "Next Events",
    "Qibla Direction": "Qibla Direction"
  },
  fr: {
    "Fajr": "Fajr",
    "Sunrise": "Lever du soleil",
    "Dhuhr": "Dhuhr",
    "Asr": "Asr",
    "Maghrib": "Maghrib",
    "Isha": "Isha",
    "Now": "Maintenant",
    "Hijri Date": "Date Hijri",
    "Next Events": "Prochains \xE9v\xE9nements",
    "Qibla Direction": "Direction Qibla"
  },
  id: {
    "Fajr": "Fajr",
    "Sunrise": "Matahari Terbit",
    "Dhuhr": "Dzuhur",
    "Asr": "Ashar",
    "Maghrib": "Maghrib",
    "Isha": "Isya",
    "Now": "Sekarang",
    "Hijri Date": "Tanggal Hijriah",
    "Next Events": "Acara Berikutnya",
    "Qibla Direction": "Arah Kiblat"
  },
  ms: {
    "Fajr": "Fajr",
    "Sunrise": "Matahari Terbit",
    "Dhuhr": "Zuhur",
    "Asr": "Asar",
    "Maghrib": "Maghrib",
    "Isha": "Isya",
    "Now": "Sekarang",
    "Hijri Date": "Tarikh Hijri",
    "Next Events": "Acara Akan Datang",
    "Qibla Direction": "Arah Kiblat"
  },
  de: {
    "Fajr": "Fadschr",
    "Sunrise": "Sonnenaufgang",
    "Dhuhr": "Dhuhr",
    "Asr": "Asr",
    "Maghrib": "Maghrib",
    "Isha": "Ischa",
    "Now": "Jetzt",
    "Hijri Date": "Hidschri-Datum",
    "Next Events": "N\xE4chste Ereignisse",
    "Qibla Direction": "Qibla-Richtung"
  },
  tr: {
    "Fajr": "Sabah (Fajr)",
    "Sunrise": "G\xFCne\u015F Do\u011Fu\u015Fu",
    "Dhuhr": "\xD6\u011Fle (Dhuhr)",
    "Asr": "\u0130kindi (Asr)",
    "Maghrib": "Aksham (Maghrib)",
    "Isha": "Yats\u0131 (Isha)",
    "Now": "\u015Eimdi",
    "Hijri Date": "Hicri Tarih",
    "Next Events": "Sonraki Etkinlikler",
    "Qibla Direction": "K\u0131ble Y\xF6n\xFC"
  },
  ar: {
    "Fajr": "\u0627\u0644\u0641\u062C\u0631",
    "Sunrise": "\u0627\u0644\u0634\u0631\u0648\u0642",
    "Dhuhr": "\u0627\u0644\u0638\u0647\u0631",
    "Asr": "\u0627\u0644\u0639\u0635\u0631",
    "Maghrib": "\u0627\u0644\u0645\u063A\u0631\u0628",
    "Isha": "\u0627\u0644\u0639\u0634\u0627\u0621",
    "Now": "\u0627\u0644\u0622\u0646",
    "Hijri Date": "\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0647\u062C\u0631\u064A",
    "Next Events": "\u0627\u0644\u0623\u062D\u062F\u0627\u062B \u0627\u0644\u0642\u0627\u062F\u0645\u0629",
    "Qibla Direction": "\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0642\u0628\u0644\u0629"
  },
  zh: {
    "Fajr": "\u6668\u793C (Fajr)",
    "Sunrise": "\u65E5\u51FA",
    "Dhuhr": "\u664C\u793C (Dhuhr)",
    "Asr": "\u6661\u793C (Asr)",
    "Maghrib": "\u660F\u793C (Maghrib)",
    "Isha": "\u5BB5\u793C (Isha)",
    "Now": "\u73B0\u5728",
    "Hijri Date": "\u5E0C\u5409\u83B1\u65E5\u671F",
    "Next Events": "\u4E0B\u4E00\u4E2A\u4E8B\u4EF6",
    "Qibla Direction": "\u671D\u5411"
  },
  it: {
    "Fajr": "Fajr",
    "Sunrise": "Alba",
    "Dhuhr": "Dhuhr",
    "Asr": "Asr",
    "Maghrib": "Maghrib",
    "Isha": "Isha",
    "Now": "Ora",
    "Hijri Date": "Data Hijri",
    "Next Events": "Prossimi Eventi",
    "Qibla Direction": "Direzione Qibla"
  },
  es: {
    "Fajr": "Fayr",
    "Sunrise": "Amanecer",
    "Dhuhr": "Dhuhr",
    "Asr": "Asr",
    "Maghrib": "Maghrib",
    "Isha": "Isha",
    "Now": "Ahora",
    "Hijri Date": "Fecha Hijri",
    "Next Events": "Pr\xF3ximos Eventos",
    "Qibla Direction": "Direcci\xF3n Qibla"
  },
  ur: {
    "Fajr": "\u0641\u062C\u0631",
    "Sunrise": "\u0633\u0648\u0631\u062C \u0646\u06A9\u0644\u0646",
    "Dhuhr": "\u0638\u06C1\u0631",
    "Asr": "\u0639\u0635\u0631",
    "Maghrib": "\u0645\u063A\u0631\u0628",
    "Isha": "\u0639\u0634\u0627\u0621",
    "Now": "\u0627\u0628\u06BE\u06CC",
    "Hijri Date": "\u06C1\u062C\u0631\u06CC \u062A\u0627\u0631\u06CC\u062E",
    "Next Events": "\u0627\u06AF\u0644\u06D2 \u0648\u0627\u0642\u0639\u0627\u062A",
    "Qibla Direction": "\u0642\u0628\u0644\u06C1 \u06A9\u06CC \u0633\u0645\u062A"
  },
  fa: {
    "Fajr": "\u0641\u062C\u0631",
    "Sunrise": "\u0637\u0644\u0648\u0639",
    "Dhuhr": "\u0638\u0647\u0631",
    "Asr": "\u0639\u0635\u0631",
    "Maghrib": "\u0645\u063A\u0631\u0628",
    "Isha": "\u0639\u0634\u0627",
    "Now": "\u0627\u06A9\u0646\u0648\u0646",
    "Hijri Date": "\u062A\u0627\u0631\u06CC\u062E \u0647\u062C\u0631\u06CC",
    "Next Events": "\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627\u06CC \u0628\u0639\u062F\u06CC",
    "Qibla Direction": "\u062C\u0647\u062A \u0642\u0628\u0644\u0647"
  }
};

// src/prayer-card.ts
var DEGREES = {
  0: "N",
  22.5: "NNE",
  45: "NE",
  67.5: "ENE",
  90: "E",
  112.5: "ESE",
  135: "SE",
  157.5: "SSE",
  180: "S",
  202.5: "SSW",
  225: "SW",
  247.5: "WSW",
  270: "W",
  292.5: "WNW",
  315: "NW",
  337.5: "NNW"
};
function timeToMinutes(timeStr) {
  if (!timeStr || timeStr === "--:--") return 0;
  const parts = timeStr.split(":");
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}
function cardinallyDegrees(deg) {
  return DEGREES[Math.round(deg / 22.5) * 22.5 % 360] || "N";
}
function getHass() {
  return window.homeAssistant?.hass;
}
var _theme_dec, _currentTime_dec, _nextEvents_dec, _events_dec, _hijriDate_dec, _qiblaDirection_dec, _prayerTimes_dec, _config_dec, _a, _PrayerHorizonCard_decorators, _init;
_PrayerHorizonCard_decorators = [t3("prayer-horizon-card")];
var PrayerHorizonCard = class extends (_a = i4, _config_dec = [n4({ type: Object })], _prayerTimes_dec = [r5()], _qiblaDirection_dec = [r5()], _hijriDate_dec = [r5()], _events_dec = [r5()], _nextEvents_dec = [r5()], _currentTime_dec = [r5()], _theme_dec = [r5()], _a) {
  constructor() {
    super(...arguments);
    __publicField(this, "config", __runInitializers(_init, 8, this)), __runInitializers(_init, 11, this);
    __publicField(this, "prayerTimes", __runInitializers(_init, 12, this, {})), __runInitializers(_init, 15, this);
    __publicField(this, "qiblaDirection", __runInitializers(_init, 16, this, 0)), __runInitializers(_init, 19, this);
    __publicField(this, "hijriDate", __runInitializers(_init, 20, this, "")), __runInitializers(_init, 23, this);
    __publicField(this, "events", __runInitializers(_init, 24, this, [])), __runInitializers(_init, 27, this);
    __publicField(this, "nextEvents", __runInitializers(_init, 28, this, [])), __runInitializers(_init, 31, this);
    __publicField(this, "currentTime", __runInitializers(_init, 32, this, 0)), __runInitializers(_init, 35, this);
    __publicField(this, "theme", __runInitializers(_init, 36, this, "light")), __runInitializers(_init, 39, this);
    __publicField(this, "_interval");
  }
  // --------------------------------------------------------------------------
  // Lifecycle
  // --------------------------------------------------------------------------
  connectedCallback() {
    super.connectedCallback();
    this._interval = window.setInterval(() => this._updateCurrentTime(), 6e4);
    this._updateCurrentTime();
    this._loadStates();
    window.addEventListener("homeassistant-updated", () => this._loadStates());
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._interval) clearInterval(this._interval);
    window.removeEventListener("homeassistant-updated", () => this._loadStates());
  }
  // --------------------------------------------------------------------------
  // State Loading
  // --------------------------------------------------------------------------
  _updateCurrentTime() {
    const now = /* @__PURE__ */ new Date();
    this.currentTime = now.getHours() * 60 + now.getMinutes();
    this.theme = document.querySelector("home-assistant")?.attributes.getNamedItem("theme")?.value === "dark" ? "dark" : "light";
  }
  _loadStates() {
    const hass = getHass();
    if (!hass) return;
    if (this.config.prayer_entities) {
      this.prayerTimes = {};
      for (const p3 of this.config.prayer_entities) {
        const state = hass.states[p3.entity];
        if (state) {
          const key = p3.entity.split("_").pop() || p3.entity;
          this.prayerTimes[key] = state.state;
        }
      }
    }
    if (this.config.qibla_entity) {
      const state = hass.states[this.config.qibla_entity];
      if (state) this.qiblaDirection = parseFloat(state.state) || 0;
    }
    if (this.config.hijri_entity) {
      const state = hass.states[this.config.hijri_entity];
      if (state) this.hijriDate = state.state;
    }
    if (this.config.events_entity) {
      const state = hass.states[this.config.events_entity];
      if (state) {
        try {
          const attrs = state.attributes || {};
          this.events = [];
          const eventKeys = [
            "next_event_name",
            "next_event_date",
            "event_islamic_new_year",
            "event_ashura",
            "event_first_day_of_ramadan",
            "event_eid_al_fitr",
            "event_day_of_arafat",
            "event_eid_al_adha"
          ];
          if (attrs.next_event_name) {
            this.nextEvents = [{ name: attrs.next_event_name, date: attrs.next_event_date || "" }];
          }
          for (const key of eventKeys.slice(2)) {
            if (attrs[key] && this.nextEvents.length < 2) {
              const evName = key.replace("event_", "").replace(/_/g, " ").replace(/\b\w/g, (c4) => c4.toUpperCase());
              this.nextEvents.push({ name: evName, date: attrs[key] || "" });
            }
          }
        } catch (e5) {
          console.error("Prayer card: error parsing events", e5);
        }
      }
    }
  }
  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  render() {
    return b2`
      <ha-card>
        <div class="card-container ${this.theme}">
          ${this._renderHorizonArc()}
          ${this._renderInfoBar()}
          ${this._renderEventsBar()}
          ${this._renderQiblaCompass()}
        </div>
      </ha-card>
    `;
  }
  _renderHorizonArc() {
    const prayers = [
      { key: "fajr", label: this._("Fajr"), time: this.prayerTimes["fajr"] },
      { key: "shuruq", label: this._("Sunrise"), time: this.prayerTimes["shuruq"] },
      { key: "dhuhr", label: this._("Dhuhr"), time: this.prayerTimes["dhuhr"] },
      { key: "asr", label: this._("Asr"), time: this.prayerTimes["asr"] },
      { key: "maghrib", label: this._("Maghrib"), time: this.prayerTimes["maghrib"] },
      { key: "isha", label: this._("Isha"), time: this.prayerTimes["isha"] }
    ];
    const prayerMinutes = prayers.map((p3) => ({
      ...p3,
      minutes: timeToMinutes(p3.time || "00:00")
    }));
    const now = this.currentTime;
    const viewStart = now - 120;
    const viewEnd = now + 120;
    const toX = (mins) => (mins - viewStart) / (viewEnd - viewStart) * 360;
    const toY = (mins, base, amplitude2) => {
      return base - amplitude2 * Math.sin((mins - viewStart) / (viewEnd - viewStart) * Math.PI);
    };
    const midY = 90;
    const amplitude = 60;
    const arcPoints = prayerMinutes.map((p3) => `${toX(p3.minutes)},${toY(p3.minutes, midY, amplitude)}`);
    const sunPath = `M ${toX(viewStart)},${midY} ` + prayerMinutes.map((p3) => `Q ${toX(p3.minutes)},${toY(p3.minutes, midY, amplitude)} ${toX(p3.minutes + 1)},${toY(p3.minutes + 1, midY, amplitude)}`).join(" ");
    const nowX = toX(now);
    const nowY = midY;
    return b2`
      <div class="horizon-section">
        <svg viewBox="0 0 360 120" class="horizon-svg">
          <!-- Background arc zones -->
          <defs>
            <linearGradient id="dayGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--card-bg-day, #f0f4ff)"/>
              <stop offset="100%" stop-color="var(--card-bg-horizon, #ffe0b2)"/>
            </linearGradient>
            <linearGradient id="nightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--card-bg-night, #1a237e)"/>
              <stop offset="100%" stop-color="var(--card-bg-night-deep, #0d1b3e)"/>
            </linearGradient>
          </defs>

          <!-- Horizon arc -->
          <path
            d="M 30,100 Q 90,30 180,25 Q 270,30 330,100"
            fill="none"
            stroke="var(--card-arc-color, #90caf9)"
            stroke-width="2"
            stroke-dasharray="4,2"
          />

          <!-- Prayer time markers -->
          ${prayerMinutes.map((p3, i5) => b2`
            <g class="prayer-marker" @click=${() => this._showPrayerInfo(p3)}>
              <circle
                cx="${toX(p3.minutes)}"
                cy="${toY(p3.minutes, midY, amplitude)}"
                r="6"
                fill="${i5 === 0 ? "#7B1FA2" : i5 === 4 ? "#E65100" : "#1565C0"}"
                stroke="white"
                stroke-width="1.5"
              />
              <line
                x1="${toX(p3.minutes)}"
                y1="${toY(p3.minutes, midY, amplitude) + 7}"
                x2="${toX(p3.minutes)}"
                y2="115"
                stroke="var(--card-line-color, #90caf9)"
                stroke-width="1"
                stroke-dasharray="2,2"
              />
              <text
                x="${toX(p3.minutes)}"
                y="118"
                text-anchor="middle"
                font-size="8"
                fill="var(--card-text-color, #37474f)"
              >${p3.label}</text>
              <text
                x="${toX(p3.minutes)}"
                y="${toY(p3.minutes, midY, amplitude) - 12}"
                text-anchor="middle"
                font-size="7"
                fill="var(--card-time-color, #1565C0)"
                font-weight="bold"
              >${p3.time || "--:--"}</text>
            </g>
          `)}

          <!-- Now indicator -->
          ${nowX >= 30 && nowX <= 330 ? b2`
            <line
              x1="${nowX}" y1="10"
              x2="${nowX}" y2="115"
              stroke="var(--card-now-color, #f44336)"
              stroke-width="2"
            />
            <circle cx="${nowX}" cy="10" r="4" fill="var(--card-now-color, #f44336)"/>
            <text x="${nowX}" y="8" text-anchor="middle" font-size="6" fill="var(--card-now-color, #f44336)">${this._("Now")}</text>
          ` : ""}
        </svg>
      </div>
    `;
  }
  _renderInfoBar() {
    return b2`
      <div class="info-bar">
        <div class="hijri-date">
          <span class="label">${this._("Hijri Date")}</span>
          <span class="value">${this.hijriDate || "\u2014"}</span>
        </div>
        <div class="time-display">
          <span class="current-time">${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
    `;
  }
  _renderEventsBar() {
    if (this.nextEvents.length === 0) return b2``;
    return b2`
      <div class="events-bar">
        ${this.nextEvents.map((ev) => b2`
          <div class="event-item">
            <span class="event-name">${ev.name}</span>
            ${ev.date ? b2`<span class="event-date">${ev.date}</span>` : ""}
          </div>
        `)}
      </div>
    `;
  }
  _renderQiblaCompass() {
    const deg = this.qiblaDirection;
    const cardinal = cardinallyDegrees(deg);
    const rad = (deg - 90) * Math.PI / 180;
    const needleX = Math.cos(rad) * 28;
    const needleY = Math.sin(rad) * 28;
    return b2`
      <div class="compass-section">
        <svg viewBox="-35 -35 70 70" class="compass-svg">
          <!-- Outer ring -->
          <circle cx="0" cy="0" r="33" fill="none" stroke="var(--card-compass-ring, #90a4ae)" stroke-width="1.5"/>
          <!-- Cardinal letters -->
          ${[["N", 0, -28], ["E", 28, 5], ["S", 0, 28], ["W", -28, 5]].map(([l3, x2, y3]) => b2`
            <text x="${x2}" y="${y3}" text-anchor="middle" dominant-baseline="middle" font-size="9" font-weight="bold" fill="var(--card-cardinal-color, #37474f)">${l3}</text>
          `)}
          <!-- Qibla needle -->
          <line x1="0" y1="0" x2="${needleX}" y2="${needleY}" stroke="#c62828" stroke-width="3" stroke-linecap="round"/>
          <circle cx="${needleX}" cy="${needleY}" r="4" fill="#c62828"/>
          <circle cx="0" cy="0" r="4" fill="#ef5350"/>
          <!-- Center dot -->
          <circle cx="0" cy="0" r="2" fill="var(--card-compass-ring, #90a4ae)"/>
        </svg>
        <div class="compass-info">
          <span class="qibla-degrees">${deg.toFixed(1)}°</span>
          <span class="qibla-direction">${cardinal}</span>
        </div>
      </div>
    `;
  }
  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------
  _(key) {
    const lang = document.querySelector("html")?.getAttribute("lang") || "en";
    return (TRANSLATIONS[lang] || TRANSLATIONS["en"])[key] || key;
  }
  _showPrayerInfo(prayer) {
    console.log("Prayer:", prayer);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 5, "config", _config_dec, PrayerHorizonCard);
__decorateElement(_init, 5, "prayerTimes", _prayerTimes_dec, PrayerHorizonCard);
__decorateElement(_init, 5, "qiblaDirection", _qiblaDirection_dec, PrayerHorizonCard);
__decorateElement(_init, 5, "hijriDate", _hijriDate_dec, PrayerHorizonCard);
__decorateElement(_init, 5, "events", _events_dec, PrayerHorizonCard);
__decorateElement(_init, 5, "nextEvents", _nextEvents_dec, PrayerHorizonCard);
__decorateElement(_init, 5, "currentTime", _currentTime_dec, PrayerHorizonCard);
__decorateElement(_init, 5, "theme", _theme_dec, PrayerHorizonCard);
PrayerHorizonCard = __decorateElement(_init, 0, "PrayerHorizonCard", _PrayerHorizonCard_decorators, PrayerHorizonCard);
// --------------------------------------------------------------------------
// Styles
// --------------------------------------------------------------------------
__publicField(PrayerHorizonCard, "styles", i`
    :host {
      display: block;
    }
    ha-card {
      padding: 0;
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background, #ffffff);
    }
    .card-container {
      padding: 12px;
      font-family: var(--font-family, 'Roboto', sans-serif);
    }
    .card-container.dark {
      --card-background: #1e1e1e;
      --card-text-color: #e0e0e0;
      --card-arc-color: #64b5f6;
      --card-line-color: #546e7a;
      --card-time-color: #90caf9;
      --card-bg-day: #1a237e;
      --card-bg-horizon: #ff8a65;
      --card-bg-night: #0d1b3e;
      --card-cardinal-color: #b0bec5;
      --card-compass-ring: #78909c;
      --card-now-color: #ef5350;
    }
    .card-container.light {
      --card-background: #ffffff;
      --card-text-color: #37474f;
      --card-arc-color: #42a5f5;
      --card-line-color: #bbdefb;
      --card-time-color: #1565c0;
      --card-bg-day: #e3f2fd;
      --card-bg-horizon: #fff3e0;
      --card-bg-night: #1a237e;
      --card-cardinal-color: #37474f;
      --card-compass-ring: #90a4ae;
      --card-now-color: #e53935;
    }

    /* Horizon Arc */
    .horizon-section { width: 100%; }
    .horizon-svg { width: 100%; height: 120px; }

    /* Info Bar */
    .info-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 4px;
      border-top: 1px solid rgba(0,0,0,0.06);
      margin-top: 4px;
    }
    .hijri-date { display: flex; flex-direction: column; }
    .hijri-date .label { font-size: 10px; color: var(--card-text-color); opacity: 0.7; text-transform: uppercase; }
    .hijri-date .value { font-size: 14px; font-weight: 600; color: var(--card-text-color); }
    .time-display { font-size: 20px; font-weight: 300; color: var(--card-text-color); }

    /* Events Bar */
    .events-bar {
      display: flex;
      gap: 12px;
      padding: 8px 4px;
      border-top: 1px solid rgba(0,0,0,0.06);
    }
    .event-item { display: flex; flex-direction: column; flex: 1; }
    .event-name { font-size: 11px; font-weight: 600; color: var(--card-text-color); }
    .event-date { font-size: 9px; color: var(--card-text-color); opacity: 0.7; }

    /* Compass */
    .compass-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 8px;
      border-top: 1px solid rgba(0,0,0,0.06);
    }
    .compass-svg { width: 100px; height: 100px; }
    .compass-info { display: flex; gap: 8px; align-items: baseline; }
    .qibla-degrees { font-size: 16px; font-weight: 700; color: var(--card-text-color); }
    .qibla-direction { font-size: 12px; color: var(--card-text-color); opacity: 0.8; }

    /* Prayer marker hover */
    .prayer-marker { cursor: pointer; }
    .prayer-marker:hover circle { r: 8; }
  `);
__runInitializers(_init, 1, PrayerHorizonCard);
export {
  PrayerHorizonCard
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
