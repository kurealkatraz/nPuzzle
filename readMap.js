/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   readMap.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/06 03:36:52 by nowl              #+#    #+#             */
/*   Updated: 2017/12/12 12:07:20 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

var nUtils		= require('./nUtils.js');
var log			= require('./logs.js');
var askArr		= require('./askMe.js');
var MapGen		= require('./genMap.js');
var fs			= require('fs');
var timeLog		= {};
var logTime		= true;

function askNumber(asked, cb)
{
	var mapObj;
	var input;

	process.stdin.once('data', (data) => {
		input = (data.toString('utf8')).trim();
		input = Number(input);
		if (input)
		{
			input = Math.ceil(input);
			timeLog.mapGen = {start : new Date().getTime()};
			mapObj = new MapGen(input, false);
			timeLog.mapGen.end = new Date().getTime();
			processMap(null, mapObj, cb);
		}
		else
			askAgain(asked, cb);
	});
}

function askAgain(asked, cb)
{
	if (asked >= askArr.length)
		asked = askArr.length - 1;
	log.err(askArr[asked])
	if (asked > 300000)
	{
		log.warn('You are displaying a really unacceptable behavior human, goodye');
		process.exit();
	}
	askNumber(asked + 1, cb);
}

function main(mapPath, cb)
{
	if (!mapPath)
	{
		log.succ('No map provided, generating our own, please provide a size :');
		askNumber(0, cb);
	}
	else
	{
		fs.readFile(mapPath, (err, content) => {
			if (err)
			{
				log.err('Something made the computer unhappy about the file you gave him');
				return (null);
			}
			else
			{
				processMap(content.toString('utf8').trim(), null, cb);
			}
		});
	}
}

function skipComment(rawMap, i)
{
	var j = i;

	while (j < rawMap.length)
	{
		if (rawMap[j] === '\n')
			return (j);
		j++
	}
	return (j);
}

function getNumber(rawMap, i)
{
	var j = i;
	var num = 0;

	while (j < rawMap.length)
	{
		if (rawMap[j].match(/[0-9]/) !== null)
			num = num * 10 + Number(rawMap[j]);
		else if (rawMap[j] === '\n' || rawMap[j] === ' ')
			return ({num : num, index : j});
		else
			return (null);
		j++;
	}
	return ({num : num, index : j});
}

function failParsing(rawMap, index)
{
	log.err('Unexpected character at index ' + index + ' (' + rawMap[index - 1] + ')');
	return (null);
}

function getArrayRow(size, rawMap, index)
{
	var j = index;
	var rowArray = [];

	while (j < rawMap.length)
	{
		if (rawMap[j].match(/[0-9]/) !== null)
		{
			var retVals = getNumber(rawMap, j);

			if (!retVals)
				return (null);
			rowArray.push(retVals.num);
			j = retVals.index;
			size--;
		}
		else if (rawMap[j] === '#')
			j = skipComment(rawMap, j);
		else if (rawMap[j] === ' ')
		{
			while (rawMap[j] === ' ' && j < rawMap.length)
				j++;
		}
		else if (rawMap[j] === '\n')
		{
			if (size !== 0)
			{
				log.err('Row length does not match given size specified in the map');
				return (null);
			}
			else
				return ({rowArray : rowArray, index : j});
		}
		else
			return (null);
	}
	return ({rowArray : rowArray, index : j});
}

function getMapArrFromRaw(rawMap)
{
	var lookingForSize	= true;
	var sizeEndOfLine	= false;
	var retArr			= [];
	var nbs				= [];
	var size			= 0;
	var retVals;
	var c;

	for (var i = 0; i < rawMap.length; i++)
	{
		retVals = null;
		c = rawMap[i];
		if (c === '#')
			i = skipComment(rawMap, i);
		else if (lookingForSize)
		{
			if (c.match(/[0-9]/) !== null)
			{
				var retVals = null;

				lookingForSize = false;
				retVals = getNumber(rawMap, i);
				if (!retVals)
					return (failParsing(rawMap, j));
				else
				{
					i = retVals.index;
					size = retVals.num;
					if (rawMap[i] === '\n')
						sizeEndOfLine = true;
				}
			}
			else if (c === '\n')
				continue;
			else
				return (failParsing(rawMap, i));
		}
		else if (!lookingForSize)
		{
			if (c.match(/[0-9]/) !== null)
			{
				var row = getArrayRow(size, rawMap, i);

				if (!sizeEndOfLine)
				{
					log.err('file seems to been poorly formated, you missed the \\n after the size value');
					return (null);
				}
				if (!row)
					return (failParsing(rawMap, i));
				retArr.push(row.rowArray);
				nbs = nbs.concat(row.rowArray);
				i = row.index;
			}
		}
		else if (c === '\n' || c === ' ')
		{
			if (!lookingForSize)
				sizeEndOfLine = true;
			continue;
		}
		else
		{
			return (failParsing(rawMap, i));
		}
	}
	if (retArr.length !== size)
	{
		log.err('Map height does not match the specified size in the map');
		return (null);
	}
	else if (lookingForSize)
	{
		log.err('Could not find any height in map file :(')
		return (null);
	}
	else
	{
		if (verifMapNodeValues(nbs, retArr.length) === false)
			return (null);
		else
			return (retArr);
	}
}

function verifMapNodeValues(nbs, size)
{
	var seen = [];

	for (var z = 0; z < nbs.length; z++)
	{
		if (nbs[z] === undefined)
		{
			log.err('Some parts are missing in your file map at verificationIndex ' + z);
			return (false);
		}
		else if (seen.indexOf(nbs[z]) === -1)
			seen.push(nbs[z]);
		else
		{
			log.err("Bamboozling duplicate Spoted (" + nbs[z] + ")");
			return (false);
		}
	}
	return (true);
}

function checkIfSolution(mapArr)
{
	var dNb			= 0;
	var expected	= nUtils.getExpectedBoard(mapArr.length);
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

function processMap(rawMap, mapObj, cb)
{
	var size;
	var mapArr;
	var solveNb;

	if (mapObj)
	{
		size = mapObj.size;
		mapArr = mapObj.mapArr;
		solveNb = nUtils.isOdd(checkIfSolution(mapArr));
		if (solveNb !== 0)
		{
			log.err('Puzzle is unsolvable :(, generating anotherone the same size');
			timeLog.mapGen = {start : new Date().getTime()};
			mapObj = new MapGen(size, false);
			timeLog.mapGen.end = new Date().getTime();
			processMap(null, mapObj, cb);
		}
		else
		{
			if (logTime)
				log.time(timeLog);
			cb({size : size, mapArr : mapArr});
		}
	}
	else
	{
		timeLog.mapParsing = {start : new Date().getTime()};
		mapArr = getMapArrFromRaw(rawMap);
		timeLog.mapParsing.end = new Date().getTime();
		if (mapArr === null)
			return (0);
		size = mapArr.length;
		solveNb = nUtils.isOdd(checkIfSolution(mapArr));
		if (solveNb !== 0)
		{
			log.err('Puzzle is unsolvable :(')
			return (0);
		}
		if (solveNb !== 0)
			process.exit();
		if (logTime)
			log.time(timeLog);
		cb({size : size, mapArr : mapArr});
	}
}

module.exports = main;