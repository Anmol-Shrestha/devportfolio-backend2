"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMDXComponent = getMDXComponent;
exports.getMDXExport = getMDXExport;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _jsx_runtime = _interopRequireWildcard(require("react/jsx-runtime"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @typedef {import('../types').MDXContentProps} MDXContentProps
 */

/**
 *
 * @param {string} code - The string of code you got from bundleMDX
 * @param {Record<string, unknown>} [globals] - Any variables your MDX needs to have accessible when it runs
 * @return {(props: MDXContentProps) => JSX.Element}
 */
function getMDXComponent(code, globals) {
  const mdxExport = getMDXExport(code, globals);
  return mdxExport.default;
}

/**
 * @template {{}} ExportedObject
 * @template {{}} Frontmatter
 * @type {import('../types').MDXExportFunction<ExportedObject, Frontmatter>}
 * @param {string} code - The string of code you got from bundleMDX
 * @param {Record<string, unknown>} [globals] - Any variables your MDX needs to have accessible when it runs
 *
 */
function getMDXExport(code, globals) {
  const jsxGlobals = {
    React,
    ReactDOM,
    _jsx_runtime
  };
  const scope = {
    ...jsxGlobals,
    ...globals
  };
  // eslint-disable-next-line
  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope));
}