import parse from 'url-parse'
import axios from 'axios'


var localUrl = ""
function getUrl(url) {
    var localUrl = document.location.href;
    var parseUrl = parse(localUrl, true);
    return parseUrl.origin == "https://git.page" ? url : this.cors + url;
}
const dataGetter = {
    getDataFromFILE: function (fileLocal) {

    },
    getDataFromURL: function (url) {
        let jsonData = {}
        axios.get(getUrl(url)).then(
            res => { jsonData = res.data }
        )
        return jsonData
    },
    getDataFromURT: function (urt) {

    },
    getDataFromJSON: function (json) {

    }

}


function getLocalUrl() {
    localUrl = window.location.href
}





function getParamsUrlQuery(query) {
    let cloudDataObject = {}
    Object.keys(query).forEach(
        key => {
            // console.log(dataGetter)
            let temp = dataGetter[`getDataFrom${key.toUpperCase()}`](query[key])
            Object.defineProperty(cloudDataObject, key, { value: temp })
        }
    )

}


export default function ConsoleTest() {
    getLocalUrl();

    let parseUrl = parse(localUrl, true)
    let query = parseUrl.query
    // console.log(localUrl, parseUrl, parseUrl.query, query);
    // console.log(dataGetter)
    // Object.keys(query).forEach(
    //     key => {
    //         console.log(key)


    //     }
    // )
    getParamsUrlQuery(query)

    return true

}