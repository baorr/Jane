/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var I18N_CONSTANT = {
    "money_unit": "元",
    "portal_title": "Portal",
    "portal_title_Subscribtion": "My Subscribtion",
    "portal_title_bluemix": "Wanda Cloud",
    "portal_title_market": "Wanda Cloud Market",
    "portal_title_invoice": "Invoice",
    "portal_user_type_standard": "Standard",
    "portal_user_type_subscribtion": "Subscribtion",
    "portal_bluemix_tip_desc": "Balance = Recharged + Coupon - Debt",
    "portal_bluemix_tip_recharge": "Recharged",
    "portal_bluemix_tip_coupon": "Coupon",
    "portal_bluemix_tip_debt": "Debt",
    "portal_invoice_tip_desc": "Receipt = Wanda Cloud Expense + Wanda Cloud Market Expense - Receipted",
    "portal_invoice_tip_wce": "Wanda Cloud Expense",
    "portal_invoice_tip_wcme": "Wanda Cloud Market Expense",
    "portal_invoice_tip_receipted": "Receipted",
    "portal_invoice_tip_timeout": "Timout[get invoice infomation]",
    "button_recharge": "Recharge",
    "button_refund": "Refund",
    "button_apply": "Apply",
    "button_retry": "Retry",

    "menu_portal": "Portal",
    "menu_amount": "Currency",
    "menu_amount_recharge": "Recharge",
    "menu_amount_offline": "Remitance",
    "menu_amount_refund": "Refund",
    "menu_bill": "Bill",
    "menu_bill_balance": "Balances",
    "menu_bill_detail": "Details",
    "menu_bill_source": "Reports",
    "menu_coupon": "Coupon",
    "menu_invoice": "Invoice"
};

if (typeof window !== "undefined") {
    window.__i18n_const__ = function (key) {
        return key && I18N_CONSTANT[key] ? I18N_CONSTANT[key] : '';
    };
} else if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = I18N_CONSTANT;
}

/***/ })
/******/ ]);