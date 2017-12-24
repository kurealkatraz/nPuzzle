/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   logs.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: nowl <nowl@student.42.fr>                  +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/06 12:15:37 by mgras             #+#    #+#             */
/*   Updated: 2017/12/24 12:09:07 by nowl             ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

var chalk = require('chalk');

module.exports = {
	succ : function(str) {
		console.log(chalk.green('[SUCC] : ' + str));
	},
	err : function(str) {
		console.log(chalk.white(chalk.bgRed('[ERR] : ' + str)));
	},
	warn : function(str) {
		console.log(chalk.black(chalk.bgYellow('[WARN] : ' + str)));
	},
	info : function(str) {
		console.log(chalk.bgBlue(chalk.white('[INFO] : ' + str)));
	},
	time : function(logObj) {
		if (!logObj)
			return ;
		for (var logData in logObj)
			this.info(logData + ' ' + (logObj[logData].end - logObj[logData].start) + 'ms');
	},
	printBoard : function(board) {
		for (var y = 0; y < board.length; y++)
		{
			for (var x = 0; x < board[y].length; x++)
			{
				process.stdout.write(board[y][x] + ' ');
			}
			process.stdout.write('\n');
		}
		process.stdout.write('\n__--__\n\n');
	},
	printStats : function(stats, nbMoves) {
		var time = stats.timeofSearch.end - stats.timeofSearch.start;

		this.info('Solved in : ' + time + 'ms');
		this.info('Total number of states ever selected in the "opened" set : ' + stats.nbOpenSelected);
		this.info('Maximum number of states ever represented in memory at the same time during the search : ' + (stats.maxExistingState));
		this.info('Number of moves required to transition from the initial state to the final state according to the search : ' + nbMoves);
	}
}