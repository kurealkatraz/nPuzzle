/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   genMap.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: nowl <nowl@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/06 03:08:28 by nowl              #+#    #+#             */
/*   Updated: 2017/12/06 03:41:05 by nowl             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

var GenPuzzleMap = function(size, print)
{
	this.size				= size || 3;
	this.print				= print || false;
	this.mapString			= '#Generated ' + new Date().toDateString() + '\n' + this.size + '\n';
	var availableNumbers	= this.genAvailableNums(this.size);

	for (var y = 0; y < this.size; y++)
	{
		for (var x = 0; x < this.size; x++)
		{
			var index = this.randMinMax(0, availableNumbers.length - 1);
			var r = availableNumbers[index];

			this.mapString += r;
			if (x + 1 < this.size)
				this.mapString += ' ';
			availableNumbers.splice(index, 1);
		}
		this.mapString += '\n'
	}
	if (print === true)
		this.printOut();
}

GenPuzzleMap.prototype.printOut = function()
{
	process.stdout.write(this.mapString);
}

GenPuzzleMap.prototype.randMinMax = function(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return (Math.floor(Math.random() * (max - min)) + min)
}

GenPuzzleMap.prototype.genAvailableNums = function(size)
{
	var arr = [];

	size = (size * size) - 1;
	while (size >= 0)
	{
		arr.push(size);
		size--;
	}
	return (arr);
}

module.exports = GenPuzzleMap;