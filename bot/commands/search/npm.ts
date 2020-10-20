import {Command} from "discord-akairo";
import {Message, MessageEmbed} from "discord.js";
import fetch from "node-fetch";
import moment from "moment";

export default class Help extends Command {
    constructor() {
        super('npm', {
            aliases: ['npm'],
            description: 'npm 패키지 검색하는 명령어',
            category: 'search',
            args: [
                {
                    id: 'pkg1',
                    match: 'rest',
                    default: '',
                }
            ]
        });
    }
    async exec(msg: Message, {pkg1}: {pkg1: string}) {
        if (!pkg1) return msg.util!.reply(msg.embed().setTitle('명령어 사용법').setDescription('npm <패키지명>'))
        const pkg = encodeURI(pkg1)
        const res = await fetch(`https://registry.npmjs.com/${pkg}`)
        if (res.status === 404 || res.status === 405) {
            return msg.reply('검색 결과가 없어요!')
        }
        const body = await res.json()
        if (body.time && body.time.unpublish) {
            return msg.reply('')
        }
        const version = body['dist-tags'] ? body.versions[body['dist-tags'].latest] || body.versions[body['dist-tags']] : {}
        const maintainers = body.maintainers.map(((user: any) => `${user.name}<${user.email || 'None'}>`))
        const dependencies = version.dependencies ? (Object.keys(version.dependencies)) : null
        const embed = new MessageEmbed()
        embed
            .setColor(0xcb0000)
            .setFooter('NPM', 'https://i.imgur.com/ErKf5Y0.png')
            .setTitle(body.name)
            .setURL(`https://www.npmjs.com/package/${pkg}`)
            .setDescription(body.description || 'No description.')
            .addField('❯ Version', body['dist-tags'].latest || 'Unknown', true)
            .addField('❯ License', body.license || 'None', true)
            .addField('❯ Author', body.author ? body.author.name : 'Unknown', true)
            .addField('❯ Creation Date', moment(body.time.created).format('YYYY-MM-DD HH:mm:SS'), true)
            .addField('❯ Modification Date', moment(body.time.modified).format('YYYY-MM-DD HH:mm:SS'), true)
            .addField('❯ Main File', version.main || 'index.js', true)
            .addField('❯ Dependencies', dependencies && dependencies.length ? dependencies.length > 30 ? dependencies.slice(0,30).join(', ') + '...' : dependencies.join(',') : 'None')
            .addField('❯ Maintainers', maintainers.slice(0, 10).join(', '))

        return msg.reply(embed)
    }
}