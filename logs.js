/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   logs.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/06 12:15:37 by mgras             #+#    #+#             */
/*   Updated: 2017/12/08 13:18:30 by mgras            ###   ########.fr       */
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
	}
}