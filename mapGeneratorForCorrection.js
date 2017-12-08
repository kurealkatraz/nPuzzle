/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mapGeneratorForCorrection.js                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/07 16:34:15 by mgras             #+#    #+#             */
/*   Updated: 2017/12/08 15:09:35 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict";

var MapGen	= require('./genMap.js');
var argv	= process.argv.slice(2);

if (argv.length > 0)
{
	var size = Number(argv[0]);

	if (size)
		new MapGen(Math.ceil(size), true);
	else
		console.log('#:^(');
}