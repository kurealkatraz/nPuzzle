/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   n-Puzzle.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/08 15:02:57 by mgras             #+#    #+#             */
/*   Updated: 2017/12/12 12:07:46 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

var MapReader			= require('./readMap.js');
var log					= require('./logs.js');
var heuristics			= require('./heuristics.js');
var nUtils				= require('./nUtils.js');
var argv				= process.argv.slice(2);
var timelog				= {};

if (argv.length === 0)
{
	MapReader(null, (mapObj) => {
		solve(mapObj);
		process.exit();
	});
}
else
{
	for (var i = 0; i < argv.length; i++)
	{
		MapReader(argv[i], (mapObj) => {
			solve(mapObj);
			process.exit();
		});
	}
}

function getWeakerF(open) {
	var index		= 0;
	var winningF	= null;

	for (var i = 0; i < open.length; i++)
	{
		if (winningF === null)
		{
			winningF = open[i].g + open[i].h;
			index = i;
		}
		else if (open[i].g + open[i].h < winningF)
		{
			winningF = open[i].g + open[i].h;
			index = i;
		}
	}
	return (index);
}

function getExpectedBoard(size)
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
}

function findBoardInStatusArr(stArr, board)
{
	for (var i = 0; i < stArr.length; i++)
	{
		if (cmpBoards(stArr[i].board, board) === 0)
			return (i);
	}
	return (null);
}

function placeInOpen(open, childNode)
{
	var score = childNode.h + childNode.g;

	for (var i = 0; i < open.length; i++)
	{
		if (score < open[i].g + open[i].h)
		{
			open.splice(i, 0, childNode);
			return (open);
		}
	}
	open.push(childNode);
	return (open);
}

function updateStats(stats, openL, closeL)
{
	stats.nbOpenSelected++;
	if (openL > stats.maxOpenState)
		stats.maxOpenState = openL;
	if (closeL > stats.maxCloseState)
		stats.maxCloseState = closeL;
	return (stats);
}

function solve(mapObj)
{
	var size	= mapObj.size;
	var exBoard = getExpectedBoard(size);
	var open	= [{board : mapObj.mapArr, g : 0, h : heuristics(mapObj.mapArr, exBoard), childs : [], parent : null}];
	var closed	= [];
	var stats	= {
		nbOpenSelected	: 0,
		maxOpenState	: 0,
		maxCloseState	: 0,
		timeofSearch	: {
			start	: new Date().getTime()
		}
	};

	while (open.length > 0)
	{
		var selectedNode	= Object.assign({}, open[0]);
		var childs			= [];
		var vPos			= getVoidPiece(selectedNode.board);
		var moveList		= getMoveList(selectedNode.board, vPos);

		stats = updateStats(stats, open.length, closed.length);
		closed.push(selectedNode);
		open.shift();
		for (var i = 0; i < moveList.length; i++)
		{
			var move			= moveList[i]
			var newBoard		= selectedNode.board.map((arr) => {
				return (arr.slice(0));
			});
			var childNode		= Object.assign({});
			var childOpenIndex	= null;
			var childCloseIndex = null;

			newBoard[vPos.y][vPos.x] = newBoard[move.y][move.x];
			newBoard[move.y][move.x] = 0;
			childNode.g = selectedNode.g + 1;
			childNode.h = heuristics(newBoard, exBoard);
			childNode.childs = [];
			childNode.board = newBoard;
			childNode.parent = selectedNode;
			selectedNode.childs.push(childNode);
			if (childNode.h === 0)
				return (formulateAnswer(childNode, stats));
			childOpenIndex = findBoardInStatusArr(open, childNode.board);
			childCloseIndex = findBoardInStatusArr(closed, childNode.board);
			if (childCloseIndex === null && childOpenIndex === null)
				open = placeInOpen(open, childNode);
			else if (childOpenIndex !== null)
			{
				if (open[childOpenIndex].g + open[childOpenIndex].h > childNode.h + childNode.g)
				{
					open.splice(childOpenIndex, 1);
					open = placeInOpen(open, childNode);
				}
			}
			else if (childCloseIndex !== null)
			{
				if (closed[childCloseIndex].g + closed[childCloseIndex].h > childNode.h + childNode.g)
				{
					closed.splice(childCloseIndex, 1);
					open = placeInOpen(open, childNode);
				}
			}
		}
	}
	log.err('Puzzle is unsolvable');
	return (0);
}

function formulateAnswer(finishingNode, stats)
{
	var stepSolution = [];
	var endG = finishingNode.g;

	stats.timeofSearch.end = (new Date()).getTime();
	while (finishingNode.parent !== null)
	{
		stepSolution.unshift(finishingNode.board);
		finishingNode = finishingNode.parent;
	}
	for (var index = 0; index < stepSolution.length; index++)
		log.printBoard(stepSolution[index]);
	log.printStats(stats, endG);
	return (0);
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

function getVoidPiece(board) {
	for (var y = 0; y < board.length; y++)
	{
		for (var x = 0; x < board[y].length; x++)
		{
			if (board[y][x] === 0)
				return ({x : x, y : y});
		}
	}
}

function getMoveList(board, vPos) {
	var moveList	= []

	if (board[vPos.y + 1] && board[vPos.y + 1][vPos.x])
		moveList.push({y : vPos.y + 1, x : vPos.x});
	if (board[vPos.y - 1] && board[vPos.y - 1][vPos.x])
		moveList.push({y : vPos.y - 1, x : vPos.x});
	if (board[vPos.y][vPos.x + 1])
		moveList.push({y : vPos.y, x : vPos.x + 1});
	if (board[vPos.y][vPos.x - 1])
		moveList.push({y : vPos.y, x : vPos.x - 1});
	return (moveList);
}