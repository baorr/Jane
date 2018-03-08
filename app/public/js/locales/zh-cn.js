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
    "portal_title": "账户总览",
    "portal_title_bluemix": "万达云余额",
    "portal_title_market": "云市场余额",
    "portal_title_invoice": "可开发票余额",
    "portal_user_type_standard": "标准",
    "portal_user_type_subscribtion": "预定",
    "portal_bluemix_tip_desc": "显示的余额 = 现金余额 + 赠送余额 - 欠费金额",
    "portal_bluemix_tip_recharge": "现金余额",
    "portal_bluemix_tip_coupon": "赠送余额",
    "portal_bluemix_tip_debt": "欠费金额",
    "portal_invoice_tip_desc": "可开票金额 = 万达云消费金额 + 云市场消费金额 - 已开票金额",
    "portal_invoice_tip_wce": "万达云消费金额",
    "portal_invoice_tip_wcme": "云市场消费金额",
    "portal_invoice_tip_receipted": "已开票金额",
    "portal_invoice_tip_timeout": "获取可开票金额超时",

    "refund_market_tip_desc": "云市场可退款金额 = 云市场实际线上充值余额 - 云市场实际线上充值余额 * 退款手续费率",
    "refund_market_tip_actualAmount": "云市场实际线上充值余额",
    "refund_market_tip_ratio": "退款手续费率",
    "refund_bluemix_tip_desc": "万达云可退款金额 = 万达云实际线上充值余额 - 万达云实际线上充值余额 * 退款手续费率",
    "refund_bluemix_tip_actualAmount": "万达云实际线上充值余额",
    "refund_bluemix_tip_ratio": "退款手续费率",

    "button_recharge": "充值",
    "button_refund": "退款",
    "button_apply": "申请开发票",
    "button_retry": "点击请重试",
    "menu_portal": "账户总览",
    "menu_amount": "资金管理",
    "menu_amount_recharge": "充值",
    "menu_amount_offline": "线下汇款",
    "menu_amount_refund": "退款",
    "menu_bill": "账单管理",
    "menu_bill_balance": "收支明细",
    "menu_bill_detail": "账单明细",
    "menu_bill_source": "资源用量",
    "menu_coupon": "代金券管理",
    "menu_invoice": "发票管理"
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