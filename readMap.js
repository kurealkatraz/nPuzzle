/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   readMap.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/06 03:36:52 by nowl              #+#    #+#             */
/*   Updated: 2017/12/07 16:41:40 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

var MapNode	= require('./mapNode.js')
var MapGen	= require('./genMap.js');
var log		= require('./logs.js');
var askArr	= require('./askMe.js');
var fs		= require('fs');
var argv	= process.argv.slice(2);

if (argv.length === 0)
	main();
else
{
	for (var i = 0; i < argv.length; i++)
		main(argv[i]);
}

function askNumber(asked) {
	var mapObj;
	var input;

	process.stdin.once('data', (data) => {
		input = (data.toString('utf8')).trim();
		input = Number(input);
		if (input)
		{
			input = Math.ceil(input);
			mapObj = new MapGen(input, false);
			processMap(mapObj.mapString, mapObj.size);
		}
		else
			askAgain(asked);
	});
}

function askAgain(asked) {
	if (asked >= askArr.length)
		asked = askArr.length - 1;
	log.err(askArr[asked])
	if (asked > 300000)
	{
		log.err('You are displaying a really unacceptable behavior human, goodye');
		process.exit();
	}
	askNumber(asked + 1);
}

function main(mapPath) {
	if (!mapPath)
	{
		log.warn('No map provided, generating our own, please provide a size :');
		askNumber(0);
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
				processMap(content.toString('utf8').trim());
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
			return (j + 1);
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
			return ({num : num, index : j + 1});
		else
			return (null);
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
			rowArray.push(reVals.num);
			j = retVals.index;
		}
		else if (rawMap[j] === '#')
			j = skipComment(rawMap, j);
		else if (rawMap[j] === ' ')
		{
			while (rawMap[j] === ' ' && j < rawMap.length)
				j++;
			size--;
		}
		else if (rawMap[j] === '\n')
		{
			if (size !== 0)
			{
				log.err('Row length does not match given size specified in the map');
				return (null);
			}
			else
				return (rowArray);
		}
		else
			return (null);
	}
}

function getMapArrFromRaw(rawMap) {
	var lookingForSize = true;
	var retArr = [];
	var c;
	var size = 0;

	for (var i = 0; i < rawMap.length; i++)
	{
		c = rawMap[i];
		if (c === '#')
			i = skipComment(rawMap, i);
		else if (lookingForSize)
		{
			if (c.match(/[0-9]/) !== null)
			{
				var retVals = null;

				lookingForSize = false;
				reVals = getNumber(rawMap, i);
				if (!reVals)
					return (failParsing(rawMap, j));
				else
				{
					i = retVals.index;
					size = retVals.num;
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

				if (!row)
					return (failParsing(rawMap, i));
				retArr.push(row);
			}
		}
		else if (c === '\n')
			log.warn('Lonesome \\n spotted and ingored');
		else
			return (failParsing(rawMap, i));
	}
	if (retArr.length > size)
	{
		log.err('Map height does not match the specified size in the map');
		return (null);
	}
	else
		return (retArr);
}

function processMap(rawMap, mapObj) {
	var size;
	var mapArr;
	var mapTree;

	if (mapObj)
	{
		size = mapObj.size;
		mapArr = mapObj.mapArr;
		console.log(rawMap, mapObj);
	}
	else
	{
		if (mapArr = getMapArrFromRaw(rawMap) === null)
			return (0);
		size = mapArr.length;
		console.log(mapArr, size);
	}
}