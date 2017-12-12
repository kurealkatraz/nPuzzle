/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   heuristics.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/11 11:12:56 by mgras             #+#    #+#             */
/*   Updated: 2017/12/11 18:14:40 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

module.exports = function manhattan(board, expected) {
	var total = 0;

	for (var y = 0; y < board.length; y++)
	{
		for (var x = 0; x < board[y].length; x++)
		{
			var expPos		= findIndexInExpected(board[y][x], expected);
			var mDistance	= Math.abs(expPos.x - x) + Math.abs(expPos.y - y);

			total += mDistance;
		}
	}
	total += cmpBoards(board, expected);
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