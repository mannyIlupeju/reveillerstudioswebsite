"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/Cursor/cursor.tsx":
/*!******************************************!*\
  !*** ./src/components/Cursor/cursor.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Context_context_CanvasContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Context/context/CanvasContext */ \"(app-pages-browser)/./src/Context/context/CanvasContext.tsx\");\n/* harmony import */ var _Cursor_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Cursor.css */ \"(app-pages-browser)/./src/components/Cursor/Cursor.css\");\n/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gsap */ \"(app-pages-browser)/./node_modules/gsap/index.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst Cursor = ()=>{\n    _s();\n    const cursorRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const { canvasPosition } = (0,_Context_context_CanvasContext__WEBPACK_IMPORTED_MODULE_2__.useCanvas)();\n    const margin = 50;\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const handleMouseMove = (e)=>{\n            setCursorTracker(e);\n        };\n        window.addEventListener(\"mousemove\", handleMouseMove);\n        return ()=>{\n            window.removeEventListener(\"mousemove\", handleMouseMove);\n        };\n    }, []);\n    function setCursorTracker(e) {\n        var _cursorRef_current, _cursorRef_current1;\n        let cursorX = e.clientX;\n        let cursorY = e.clientY;\n        const cursorWidth = ((_cursorRef_current = cursorRef.current) === null || _cursorRef_current === void 0 ? void 0 : _cursorRef_current.offsetWidth) || 0;\n        const cursorHeight = ((_cursorRef_current1 = cursorRef.current) === null || _cursorRef_current1 === void 0 ? void 0 : _cursorRef_current1.offsetHeight) || 0;\n        if (cursorX < (window.innerWidth / 2 - cursorX / 2) / 4) cursorX = (window.innerWidth / 2 - cursorX / 2) / 4;\n        if (cursorX > window.innerWidth * 0.5 + cursorWidth - margin) cursorX = window.innerWidth * 0.5 + cursorWidth - margin;\n        if (cursorY - margin < (cursorHeight - window.innerHeight / 2) * 0.5 + (margin + 12)) cursorY = (cursorHeight - window.innerHeight / 2) * 0.5 - (margin + 12);\n        if (cursorY - margin > (cursorHeight + window.innerHeight / 2) * 0.5 + (margin - 2)) cursorY = (cursorHeight + window.innerHeight / 2) * 0.5 + (margin - 8);\n        if (cursorRef.current) {\n            cursorRef.current.style.left = \"\".concat(cursorX, \"px\");\n            cursorRef.current.style.top = \"\".concat(cursorY, \"px\");\n        }\n        if (cursorRef.current) {\n            gsap__WEBPACK_IMPORTED_MODULE_4__[\"default\"].quickTo(cursorRef.current, \"x\", {\n                ease: \"power2.out\",\n                duration: 0.5\n            });\n        }\n    }\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        window.addEventListener(\"mousemove\", setCursorTracker);\n        return ()=>{\n            window.removeEventListener(\"mousemove\", setCursorTracker);\n        };\n    }, [\n        canvasPosition\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"custom-cursor\",\n        ref: cursorRef\n    }, void 0, false, {\n        fileName: \"/Users/mannyilupeju/reveillerstudios-website/reveillerstudios/src/components/Cursor/cursor.tsx\",\n        lineNumber: 79,\n        columnNumber: 10\n    }, undefined);\n};\n_s(Cursor, \"eSDdbcCL405iGd5ePChev3xT2QM=\", false, function() {\n    return [\n        _Context_context_CanvasContext__WEBPACK_IMPORTED_MODULE_2__.useCanvas\n    ];\n});\n_c = Cursor;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cursor);\nvar _c;\n$RefreshReg$(_c, \"Cursor\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL0N1cnNvci9jdXJzb3IudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFpRDtBQUNXO0FBQ3RDO0FBQ0U7QUFFeEIsTUFBTUssU0FBUzs7SUFDYixNQUFNQyxZQUFZTCw2Q0FBTUEsQ0FBd0I7SUFDaEQsTUFBTSxFQUFFTSxjQUFjLEVBQUUsR0FBR0oseUVBQVNBO0lBQ3BDLE1BQU1LLFNBQVM7SUFHZk4sZ0RBQVNBLENBQUM7UUFDUixNQUFNTyxrQkFBa0IsQ0FBQ0M7WUFDdkJDLGlCQUFpQkQ7UUFDbkI7UUFFQUUsT0FBT0MsZ0JBQWdCLENBQUMsYUFBYUo7UUFDckMsT0FBTztZQUNMRyxPQUFPRSxtQkFBbUIsQ0FBQyxhQUFhTDtRQUMxQztJQUNGLEdBQUcsRUFBRTtJQUVMLFNBQVNFLGlCQUFpQkQsQ0FBYTtZQUdqQkosb0JBQ0NBO1FBSHJCLElBQUlTLFVBQVVMLEVBQUVNLE9BQU87UUFDdkIsSUFBSUMsVUFBVVAsRUFBRVEsT0FBTztRQUN2QixNQUFNQyxjQUFjYixFQUFBQSxxQkFBQUEsVUFBVWMsT0FBTyxjQUFqQmQseUNBQUFBLG1CQUFtQmUsV0FBVyxLQUFJO1FBQ3RELE1BQU1DLGVBQWVoQixFQUFBQSxzQkFBQUEsVUFBVWMsT0FBTyxjQUFqQmQsMENBQUFBLG9CQUFtQmlCLFlBQVksS0FBSTtRQUd4RCxJQUFJUixVQUFVLENBQUNILE9BQU9ZLFVBQVUsR0FBRyxJQUFJVCxVQUFVLEtBQUssR0FDcERBLFVBQVUsQ0FBQ0gsT0FBT1ksVUFBVSxHQUFHLElBQUlULFVBQVUsS0FBSztRQUNwRCxJQUFJQSxVQUFVSCxPQUFPWSxVQUFVLEdBQUcsTUFBTUwsY0FBY1gsUUFDcERPLFVBQVVILE9BQU9ZLFVBQVUsR0FBRyxNQUFNTCxjQUFjWDtRQUdwRCxJQUNFUyxVQUFVVCxTQUNWLENBQUNjLGVBQWVWLE9BQU9hLFdBQVcsR0FBRyxLQUFLLE1BQU9qQixDQUFBQSxTQUFTLEVBQUMsR0FFNURTLFVBQVUsQ0FBQ0ssZUFBZVYsT0FBT2EsV0FBVyxHQUFHLEtBQUssTUFBT2pCLENBQUFBLFNBQVMsRUFBQztRQUV0RSxJQUNFUyxVQUFVVCxTQUNWLENBQUNjLGVBQWVWLE9BQU9hLFdBQVcsR0FBRyxLQUFLLE1BQU9qQixDQUFBQSxTQUFTLElBRTVEUyxVQUFVLENBQUNLLGVBQWVWLE9BQU9hLFdBQVcsR0FBRyxLQUFLLE1BQU9qQixDQUFBQSxTQUFTO1FBR3BFLElBQUlGLFVBQVVjLE9BQU8sRUFBRTtZQUNyQmQsVUFBVWMsT0FBTyxDQUFDTSxLQUFLLENBQUNDLElBQUksR0FBRyxHQUFXLE9BQVJaLFNBQVE7WUFDMUNULFVBQVVjLE9BQU8sQ0FBQ00sS0FBSyxDQUFDRSxHQUFHLEdBQUcsR0FBVyxPQUFSWCxTQUFRO1FBQzNDO1FBRUMsSUFBSVgsVUFBVWMsT0FBTyxFQUFFO1lBQ3RCaEIsNENBQUlBLENBQUN5QixPQUFPLENBQUN2QixVQUFVYyxPQUFPLEVBQUUsS0FBSztnQkFDbkNVLE1BQU07Z0JBQ05DLFVBQVU7WUFDWjtRQUNGO0lBR0Y7SUFNQTdCLGdEQUFTQSxDQUFDO1FBRVJVLE9BQU9DLGdCQUFnQixDQUFDLGFBQWFGO1FBRXJDLE9BQU87WUFDTEMsT0FBT0UsbUJBQW1CLENBQUMsYUFBYUg7UUFDMUM7SUFHRixHQUFHO1FBQUNKO0tBQWU7SUFFbkIscUJBQU8sOERBQUN5QjtRQUFJQyxXQUFVO1FBQWdCQyxLQUFLNUI7Ozs7OztBQUM3QztHQTFFTUQ7O1FBRXVCRixxRUFBU0E7OztLQUZoQ0U7QUE0RU4sK0RBQWVBLE1BQU1BLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvQ3Vyc29yL2N1cnNvci50c3g/OGQ2MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNhbnZhcyB9IGZyb20gXCJAL0NvbnRleHQvY29udGV4dC9DYW52YXNDb250ZXh0XCI7XG5pbXBvcnQgXCIuL0N1cnNvci5jc3NcIjtcbmltcG9ydCBnc2FwIGZyb20gXCJnc2FwXCI7XG5cbmNvbnN0IEN1cnNvciA9ICgpID0+IHtcbiAgY29uc3QgY3Vyc29yUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHsgY2FudmFzUG9zaXRpb24gfSA9IHVzZUNhbnZhcygpO1xuICBjb25zdCBtYXJnaW4gPSA1MDtcblxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIHNldEN1cnNvclRyYWNrZXIoZSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgZnVuY3Rpb24gc2V0Q3Vyc29yVHJhY2tlcihlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgbGV0IGN1cnNvclggPSBlLmNsaWVudFg7XG4gICAgbGV0IGN1cnNvclkgPSBlLmNsaWVudFk7XG4gICAgY29uc3QgY3Vyc29yV2lkdGggPSBjdXJzb3JSZWYuY3VycmVudD8ub2Zmc2V0V2lkdGggfHwgMDtcbiAgICBjb25zdCBjdXJzb3JIZWlnaHQgPSBjdXJzb3JSZWYuY3VycmVudD8ub2Zmc2V0SGVpZ2h0IHx8IDA7XG5cblxuICAgIGlmIChjdXJzb3JYIDwgKHdpbmRvdy5pbm5lcldpZHRoIC8gMiAtIGN1cnNvclggLyAyKSAvIDQpXG4gICAgICBjdXJzb3JYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMiAtIGN1cnNvclggLyAyKSAvIDQ7XG4gICAgaWYgKGN1cnNvclggPiB3aW5kb3cuaW5uZXJXaWR0aCAqIDAuNSArIGN1cnNvcldpZHRoIC0gbWFyZ2luKVxuICAgICAgY3Vyc29yWCA9IHdpbmRvdy5pbm5lcldpZHRoICogMC41ICsgY3Vyc29yV2lkdGggLSBtYXJnaW47XG5cblxuICAgIGlmIChcbiAgICAgIGN1cnNvclkgLSBtYXJnaW4gPFxuICAgICAgKGN1cnNvckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogMC41ICsgKG1hcmdpbiArIDEyKVxuICAgIClcbiAgICAgY3Vyc29yWSA9IChjdXJzb3JIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIDAuNSAtIChtYXJnaW4gKyAxMik7XG4gICAgIFxuICAgIGlmIChcbiAgICAgIGN1cnNvclkgLSBtYXJnaW4gPlxuICAgICAgKGN1cnNvckhlaWdodCArIHdpbmRvdy5pbm5lckhlaWdodCAvIDIpICogMC41ICsgKG1hcmdpbiAtIDIpXG4gICAgKVxuICAgIGN1cnNvclkgPSAoY3Vyc29ySGVpZ2h0ICsgd2luZG93LmlubmVySGVpZ2h0IC8gMikgKiAwLjUgKyAobWFyZ2luIC0gOCk7XG5cblxuICAgIGlmIChjdXJzb3JSZWYuY3VycmVudCkge1xuICAgICAgY3Vyc29yUmVmLmN1cnJlbnQuc3R5bGUubGVmdCA9IGAke2N1cnNvclh9cHhgO1xuICAgICAgY3Vyc29yUmVmLmN1cnJlbnQuc3R5bGUudG9wID0gYCR7Y3Vyc29yWX1weGA7XG4gICAgfVxuXG4gICAgIGlmIChjdXJzb3JSZWYuY3VycmVudCkge1xuICAgICAgZ3NhcC5xdWlja1RvKGN1cnNvclJlZi5jdXJyZW50LCBcInhcIiwge1xuICAgICAgICBlYXNlOiBcInBvd2VyMi5vdXRcIixcbiAgICAgICAgZHVyYXRpb246IDAuNSxcbiAgICAgIH0pO1xuICAgIH1cblxuXG4gIH1cblxuXG5cblxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgc2V0Q3Vyc29yVHJhY2tlcik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgc2V0Q3Vyc29yVHJhY2tlcik7XG4gICAgfTtcblxuICAgIFxuICB9LCBbY2FudmFzUG9zaXRpb25dKTtcblxuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9J2N1c3RvbS1jdXJzb3InIHJlZj17Y3Vyc29yUmVmfT48L2Rpdj47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDdXJzb3I7Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlUmVmIiwidXNlRWZmZWN0IiwidXNlQ2FudmFzIiwiZ3NhcCIsIkN1cnNvciIsImN1cnNvclJlZiIsImNhbnZhc1Bvc2l0aW9uIiwibWFyZ2luIiwiaGFuZGxlTW91c2VNb3ZlIiwiZSIsInNldEN1cnNvclRyYWNrZXIiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImN1cnNvclgiLCJjbGllbnRYIiwiY3Vyc29yWSIsImNsaWVudFkiLCJjdXJzb3JXaWR0aCIsImN1cnJlbnQiLCJvZmZzZXRXaWR0aCIsImN1cnNvckhlaWdodCIsIm9mZnNldEhlaWdodCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInN0eWxlIiwibGVmdCIsInRvcCIsInF1aWNrVG8iLCJlYXNlIiwiZHVyYXRpb24iLCJkaXYiLCJjbGFzc05hbWUiLCJyZWYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Cursor/cursor.tsx\n"));

/***/ })

});