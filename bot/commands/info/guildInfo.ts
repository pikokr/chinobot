import {Command} from "discord-akairo";
import {Message} from "discord.js";

export default class Help extends Command {
    constructor() {
        super('guild_info', {
            aliases: ['서버정보'],
            description: '서버 정보 표시하는 명령어',
            category: 'info'
        });
    }
    async exec(msg: Message) {
        const g = msg.guild!
        const e = msg.embed()
        e.addField('서버 이름', g.name, true)
        e.addField('서버 ID', g.id, true)
        e.addField('채팅 채널 수', g.channels.cache.filter(r=>r.type === 'text').size || '없음', true)
        e.addField('음성 채널 수', g.channels.cache.filter(r=>r.type === 'voice').size || '없음', true)
        e.addField('공지 채널 수', g.features.includes('NEWS') ? g.channels.cache.filter(r=>r.type === 'news').size : '없음', true)
        e.addField('카테고리 채널 수', g.channels.cache.filter(r=>r.type === 'category').size || '없음', true)
        e.addField('멤버 수(봇 포함)', g.members.cache.size, true)
        e.addField('멤버 수(유저만)', g.members.cache.filter(r=>!r.user.bot).size, true)
        e.addField('멤버 수(봇)', g.members.cache.filter(r=>r.user.bot).size, true)
        e.addField('활성화된 서버 기능(?)', g.features.map(r => {
            switch (r) {
                case "ANIMATED_ICON":
                    return '움직이는 아이콘'
                case "BANNER":
                    return '배너'
                case "COMMERCE":
                    return '상점'
                case "COMMUNITY":
                    return '커뮤니티'
                case "DISCOVERABLE":
                    return '서버 찾기'
                case "INVITE_SPLASH":
                    return '초대 배경'
                case "NEWS":
                    return '공지 채널'
                case "PARTNERED":
                    return '파트너'
                case "VANITY_URL":
                    return '커스텀 URL'
                case "VERIFIED":
                    return '인증됨'
                case "VIP_REGIONS":
                    return 'VIP 서버'
                case "WELCOME_SCREEN_ENABLED":
                    return '환영 화면'
                default:
                    return r
            }
        }).join(',') || '없음', true)
        e.setThumbnail(g.iconURL({dynamic: true})!)
        return msg.channel.send(e)
    }
}