import { useReducer, useRef, useEffect, useImperativeHandle, useState } from "react";
import { forwardRef } from "react";

function musicListReducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, action.data]
        case 'shift':
            return state.slice(1)
        case 'init':
            return [action.data]
        default:
            throw new Error("False action.type");
    }
}
var MyRadio = forwardRef((props, ref) => {
    // 音乐列表
    const [musicList, setMusicList] = useReducer(musicListReducer, [])
    function setMusic(data) {
        if (firstClick === false) {
            setMusicList({ type: 'init', data: data })
        } else {
            setMusicList({ type: 'add', data: data })
        }
    }
    // 播完自动切歌
    useEffect(() => {
        audioRef.current.onended = () => {
            setMusicList({ type: 'shift' })
        }
    }, [])

    // 由于谷歌浏览器新协议限制不能自动播放
    // 默认进来的时候是静音
    // 点击后开始播放
    const [playing, setPlaying] = useState(false);
    const [firstClick, setFirstClick] = useState(false);
    const audioRef = useRef(null);
    function setCurrentTime(sec) {
        audioRef.current.currentTime = sec;
    }
    function switchPlaying() {
        if (firstClick === false) {
            setFirstClick(true)
            // 如果是第一次开播，需要先获取到第一首歌的进度
            fetch("http://localhost:8080/ws/getRadioProcess").then((response) => {
                return response.json()
            }).then(json => {
                const data = json.data
                setCurrentTime(data.current)
                audioRef.current.play();
            })
        }
        setPlaying(!playing);
    }

    useImperativeHandle(ref, () => ({
        setMusic,
        setCurrentTime
    }))
    // 用emoji吧，懒得弄SVG
    return (
        <div onClick={switchPlaying}>
            <audio style={{ display: 'none' }} src={musicList[0]?.url} ref={audioRef} autoPlay muted={!playing}></audio>
            {playing ? <span>🔈</span> : <span>🔕</span>}
            <span>正在播放：{musicList[0]?.name}</span>
        </div>
    )
})

export default MyRadio