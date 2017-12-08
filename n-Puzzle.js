/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   n-Puzzle.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/08 15:02:57 by mgras             #+#    #+#             */
/*   Updated: 2017/12/08 15:09:12 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

var Mapreader	= require('./readMap.js');
var log			= require('./logs.js');
var argv		= process.argv.slice(2);

if (argv.length === 0)
	Mapreader();
else
{
	for (var i = 0; i < argv.length; i++)
	{
		var mapObj = Mapreader(argv[i]);
	}
}