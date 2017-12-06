/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   readMap.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/06 03:36:52 by nowl              #+#    #+#             */
/*   Updated: 2017/12/06 15:25:13 by mgras            ###   ########.fr       */
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
				//process code;
			}
		});
	}
}

function getMapArrFromRaw(rawMap) {
	var retArr = [];
	var c;

	for (var i = 0; i < rawMap.length; i++)
	{
		c = rawMap[i];
	}
}

function processMap(rawMap, mapObj) {
	var size;
	var mapArr;
	var mapTree;

	if (mapObj)
	{
		size = mapObj.size;
		mapArr = mapObj.mapArr;
	}
	else
	{
		if (mapArr = getMapArrFromRaw(rawMap) === null)
			return (0);
	}
}