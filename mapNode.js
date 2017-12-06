/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mapNode.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/06 12:34:40 by mgras             #+#    #+#             */
/*   Updated: 2017/12/06 12:56:21 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

var MapNode = function(value) {
	this.value = value;
	this.up = null;
	this.right = null;
	this.down = null;
	this.left = null;
}

MapNode.prototype.setLeft = function(node) {
	this.left = node;
}

MapNode.prototype.setUp = function(node) {
	this.up = node;
}

MapNode.prototype.setRight = function(node) {
	this.right = node;
}

MapNode.prototype.setDown = function(node) {
	this.down = node;
}

module.exports = MapNode;