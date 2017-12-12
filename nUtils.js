/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   nUtils.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/11 18:53:05 by mgras             #+#    #+#             */
/*   Updated: 2017/12/12 11:47:30 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

module.exports = {
	getExpectedBoard : function(size)
	{
		var piece = 1;
		var expectedBoard = [];

		for (var y = 0; y < size; y++)
		{
			expectedBoard.push([]);
			for (var x = 0; x < size; x++)
				expectedBoard[y][x] = piece++;
		}
		expectedBoard[size - 1][size - 1] = 0;
		return (expectedBoard);
	},
	cmpBoards : function(a, b)
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
	},
	firstOccOfMissplacement : function(expected, current)
	{
		for (var y = 0; y < current.length; y++)
		{
			for (var x = 0; x < current[y].length; x++)
			{
				if (expected[y][x] !== current[y][x])
					return ({y : y, x : x});
			}
		}
		return (null);
	},
	findExpectedPosition : function(expectedPos, expected, current)
	{
		if (expectedPos === null)
			return (null);
		var value = current[expectedPos.y][expectedPos.x];

		for (var y = 0; y < expected.length; y++)
		{
			for (var x = 0; x < expected[y].length; x++)
			{
				if (value === expected[y][x])
					return ({x : x, y : y});
			}
		}
	},
	swapTwoCells : function(arr, pos1, pos2)
	{
		var swp = arr[pos1.y][pos1.x];

		arr[pos1.y][pos1.x] = arr[pos2.y][pos2.x]
		arr[pos2.y][pos2.x] = swp;
		return (arr);
	},
	isOdd : function(nb)
	{
		return (nb % 2);
	}
}