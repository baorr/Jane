(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var doc = document;
var submitOrder = function submitOrder() {
	var agreement = doc.querySelector('[name="agreement"]');
	var id = doc.querySelector('[name="__id"]');

	if (agreement.checked) {
		location.href = '/confirm/' + id;
	}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMzAwYTVkZmMuanMiXSwibmFtZXMiOlsiZG9jIiwiZG9jdW1lbnQiLCJzdWJtaXRPcmRlciIsImFncmVlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpZCIsImNoZWNrZWQiLCJsb2NhdGlvbiIsImhyZWYiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUlBLE1BQU1DLFFBQVY7QUFDQSxJQUFJQyxjQUFjLFNBQVNBLFdBQVQsR0FBdUI7QUFDeEMsS0FBSUMsWUFBWUgsSUFBSUksYUFBSixDQUFrQixvQkFBbEIsQ0FBaEI7QUFDQSxLQUFJQyxLQUFLTCxJQUFJSSxhQUFKLENBQWtCLGVBQWxCLENBQVQ7O0FBRUEsS0FBSUQsVUFBVUcsT0FBZCxFQUF1QjtBQUN0QkMsV0FBU0MsSUFBVCxHQUFnQixjQUFjSCxFQUE5QjtBQUNBO0FBQ0QsQ0FQRCIsImZpbGUiOiJmYWtlXzMwMGE1ZGZjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jID0gZG9jdW1lbnQ7XG52YXIgc3VibWl0T3JkZXIgPSBmdW5jdGlvbiBzdWJtaXRPcmRlcigpIHtcblx0dmFyIGFncmVlbWVudCA9IGRvYy5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cImFncmVlbWVudFwiXScpO1xuXHR2YXIgaWQgPSBkb2MucXVlcnlTZWxlY3RvcignW25hbWU9XCJfX2lkXCJdJyk7XG5cblx0aWYgKGFncmVlbWVudC5jaGVja2VkKSB7XG5cdFx0bG9jYXRpb24uaHJlZiA9ICcvY29uZmlybS8nICsgaWQ7XG5cdH1cbn07Il19
},{}]},{},[1])