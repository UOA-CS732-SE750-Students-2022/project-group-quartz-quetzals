import express from "express";
import axios from "axios";
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

require('dotenv').config()
const api = process.env.NETEASE_MUSIC_API;
const endpoint = process.env.TRANSLATE_ENDPOINT;
const subscriptionKey = process.env.TRANSLATE_SUBSCRIPTION_KEY;
const location = process.env.TRANSLATE_LOCATION;


// Retrieve hot comments with provided id.
router.get('/hot', async function (req, res){
    if (req.query.id === undefined) {
        res.status(404);
    }
    const musicId = req.query.id;
    const requestUrl = api + '/comment/hot?type=0&id=' + musicId;
    const initRequest = await axios.get(requestUrl);
    const initHotComments = initRequest.data.hotComments;

    if ( initHotComments.length > 0 ) {
        const simplifiedComment = await Promise.all(initHotComments.map(x => simplifyHotComment(x)))
        res.json(simplifiedComment);
    }
    else {
        res.status(404);
    }
})

async function simplifyHotComment(comment) {
    const result = {
        "content": comment.content,
        "translatedContent": await translateToEn(comment.content),
        "time": comment.timeStr,
        "username": comment.user.nickname,
        "translatedUsername": await translateToEn(comment.user.nickname),
        "userAvatarUrl": comment.user.avatarUrl
    };
    return result;
}

async function translateToEn(content) {
    const r = await axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': 'zh-Hans',
            'to': ['en']
        },
        data: [{
            'text': content
        }],
        responseType: 'json'
    });
    return r.data[0].translations[0].text;
}

export default router;