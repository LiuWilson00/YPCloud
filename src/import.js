import parse from 'url-parse'
import axios from 'axios'

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



    return await getParamsUrlQuery(query)

}