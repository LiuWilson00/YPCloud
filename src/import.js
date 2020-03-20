import parse from 'url-parse'
import axios from 'axios'
import webmms from 'webmms-client'
import config from './config'
import { set as setCookie, get as getCookie } from "es-cookie";

var mms = null;
var eiInfo = {
    eiName: "",
    eiTag: "",
    ddn: ""
};
var webmmsOptions = {
    EiToken: "",
    SToken: "",
    UToken: ""
}


const cors = "https://cors-anywhere.herokuapp.com/"
var localUrl = ""
function getUrl(url) {
    var localUrl = document.location.href;
    var parseUrl = parse(localUrl, true);
    return parseUrl.origin == "https://git.page" ? url : cors + url;
}
const dataGetter = {
    getDataFromFILE: function (fileLocal) {

    },
    getDataFromURL: function (url) {
        return new Promise((resolve, reject) => {
            axios.get(getUrl(url)).then((res) => {
                resolve({ data: res.data, key: "url" })
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getDataFromURT: function (urt) {

    },
    getDataFromJSON: function (json) {

    }

}




function getLocalUrl() {
    localUrl = window.location.href
}



function mmsInit() {
    webmmsOptions.EiToken = getCookie("EiToken") || "";
    webmmsOptions.SToken = getCookie("SToken") || "";
    let tempEiToken = webmmsOptions.EiToken;
    let tempSToken = webmmsOptions.EiToken;
    let tempWsurl = config.webConfig.wsurl;


    mms = webmms({
        wsurl: tempWsurl,
        EiToken: tempEiToken,
        SToken: tempSToken
    });
    mms.on("registered", reply => {
        console.log(reply);
        let {
            result: { DDN, EiToken, SToken }
        } = reply;
        let id = 0;
        // document.getElementById('DDN').innerText = `DDN: ${DDN}`
        setCookie("EiToken", EiToken, { expires: 7, path: "" });
        setCookie("SToken", SToken, { expires: 7, path: "" });
    });
}


async function getParamsUrlQuery(query) {

    var cloudDataObject = new Object()


    await
        Promise.all(await Object.keys(query).map(key => dataGetter[`getDataFrom${key.toUpperCase()}`](query[key]))).then(
            res => {
                res.forEach(
                    data => {
                        cloudDataObject[data.key] = data.data
                    }
                )
            }
        )
    return cloudDataObject


}


export default async function ConsoleTest() {
    getLocalUrl();

    let parseUrl = parse(localUrl, true)
    let query = parseUrl.query


    mmsInit()
    return await getParamsUrlQuery(query)

}