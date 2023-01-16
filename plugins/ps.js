import Pornsearch from 'pornsearch';

const Searcher = new Pornsearch( query, driver = 'pornhub');
Pornsearch.videos()
  .then(videos => console.log(videos))
  .then(() => Pornsearch.gifs())
  .then(gifs => console.log(gifs))
let handler = async (m, { conn, args, command, usedPrefix }) => {
if (!db.data.chats[m.chat].modohorny && m.isGroup) throw '*Contact Owner to Turn on horny mode in group*'
if (!args[0]) throw `*Where is the text*`
let res = await
}
handler.command = /^(phs|phdl|ph)$/i
export default handler
