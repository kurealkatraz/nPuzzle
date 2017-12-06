/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   readMap.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: nowl <nowl@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/06 03:36:52 by nowl              #+#    #+#             */
/*   Updated: 2017/12/06 03:41:21 by nowl             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var Map = require('./genMap.js');

var MapReader = function(map) {
	this.map = map || new Map();
	this.map.printOut();
}

new MapReader();