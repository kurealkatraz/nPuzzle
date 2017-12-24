/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   heuristics.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: nowl <nowl@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/11 11:12:56 by mgras             #+#    #+#             */
/*   Updated: 2017/12/24 16:28:27 by nowl             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

var nUtils = require('./nUtils.js');

module.exports = (board, expected) => {
	var total = 0;
	var xMiss = 0;
	var yMiss = 0;

	for (var y = 0; y < board.length; y++)
	{
		for (var x = 0; x < board[y].length; x++)
		{
			var expPos		= findIndexInExpected(board[y][x], expected);
			var mDistance	= Math.abs(expPos.x - x) + Math.abs(expPos.y - y);

			if (expPos.x !== x)
				xMiss++;
			if (expPos.y !== y)
				yMiss++;		
			total += mDistance;				//Manhattan
		}
	}
	total += cmpBoards(board, expected);	//nValid
	total += nMaxSwap(board, expected);		//nMaxSwap
	total += (xMiss + yMiss);				//Tiles out of row and column
	return (total);
}

function cmpBoards(a, b)
{
	var diff = 0;

	for (var y = 0; y < a.length; y++)
	{
		for (var x = 0; x < a[y].length; x++)
		{
			if (a[y][x] !== b[y][x])
				diff++;
		}
	}
	return (diff);
}

function findIndexInExpected(value, expected)
{
	for (var y = 0; y < expected.length; y++)
	{
		for (var x = 0; x < expected[y].length; x++)
		{
			if (expected[y][x] === value)
				return ({x : x, y : y});
		}
	}
}

function nMaxSwap(mapArr, expected)
{
	var dNb			= 0;
	var workingMap	= mapArr.map((arr) => {
		return (arr.slice(0));
	});

	while (nUtils.cmpBoards(expected, workingMap) !== 0)
	{
		var expPos	= nUtils.firstOccOfMissplacement(expected, workingMap);
		var missPos	= nUtils.findExpectedPosition(expPos, expected, workingMap);
		var swp;

		if (missPos === null)
			return (dNb);
		swp = workingMap[missPos.y][missPos.x];
		workingMap[missPos.y][missPos.x] = workingMap[expPos.y][expPos.x]
		workingMap[expPos.y][expPos.x] = swp;
		dNb++;
	}
	return (dNb);
}