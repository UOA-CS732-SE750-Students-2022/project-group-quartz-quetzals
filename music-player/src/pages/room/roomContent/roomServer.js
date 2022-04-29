
var radio_config = require("./config.json");
var process_s = 0; // 进度（秒）
var song_index = 0; // 歌曲索引
/* ...... */
// 计算播放进度
function calcRadioProcess() {
	setInterval(() => {
		if (process_s > radio_config[song_index].duration) {
			song_index = song_index + 1 >= radio_config.length ? 0 : song_index + 1
			process_s = 0
			console.log("切歌", radio_config[song_index])
			bc(clientList, JSON.stringify({
				type: 'song',
				song: radio_config[song_index],
				current: 0
			}))
		} else {
			process_s += 1
		}
	}, 1000)
}
calcRadioProcess()
router.get("/getRadioProcess", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.end(JSON.stringify({
		"success": true,
		"data": {
			type: 'song',
			song: radio_config[song_index],
			current: process_s
		}
	}))
})
/* ...... */
// 
router.ws("/", function(ws, req) {
	ws.clientId = req.query.id
	clientList.push(ws)
	console.log("新IP" + req.query.id);
	console.log("当前在线人数" + clientList.length);
	// websocket一连进来的时候就告诉现在正在播放的音乐与进度
	ws.send(JSON.stringify({
		type: 'song',
		song: radio_config[song_index],
		current: process_s
	}))
})