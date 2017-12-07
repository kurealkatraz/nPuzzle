/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mapGeneratorForCorrection.js                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mgras <mgras@student.42.fr>                +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/12/07 16:34:15 by mgras             #+#    #+#             */
/*   Updated: 2017/12/07 16:34:54 by mgras            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

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