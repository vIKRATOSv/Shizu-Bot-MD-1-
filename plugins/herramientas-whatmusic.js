import fs from 'fs'
import acrcloud from 'acrcloud'
let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/audio|video/.test(mime)) {
let media = await q.download()
let ext = mime.split('/')[1]
fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
let { code, msg } = res.status
if (code !== 0) throw msg
let { title, artists, album, genres, release_date } = res.metadata.music[0]
let txt = `
𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾𝚂 𝙳𝙴 𝙻𝙰 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰

• 📌 TITLE: ${title}
• 👨‍🎤 ARTIST: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'Not found'}
• 💾 𝙰𝙻𝙱𝚄𝙼: ${album.name || 'Not found'}
• 🌐 GENERE: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'Not found'}
• 📆 RELEASE DATE: ${release_date || 'Not found'}
`.trim()
fs.unlinkSync(`./tmp/${m.sender}.${ext}`)
m.reply(txt)
} else throw '*Respond to an AUDIO*'
}
handler.command = /^quemusica|quemusicaes|whatmusic|findm$/i
export default handler
