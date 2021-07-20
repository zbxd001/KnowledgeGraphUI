const LOCAL_STORAGE_NODE_KEY = "searchNodeHistory";
const LOCAL_STORAGE_LINK_KEY = "searchLinkHistory";
const LOCAL_STORAGE_HEAD_KEY = "searchHeadHistory";

class Store { }

Store.saveNodeHistory = (arr) => {
    localStorage.setItem(LOCAL_STORAGE_NODE_KEY, JSON.stringify(arr));
}

Store.loadNodeHistory = () =>JSON.parse(localStorage.getItem(LOCAL_STORAGE_NODE_KEY))

Store.removeAllNodeHistory=()=>{localStorage.removeItem(LOCAL_STORAGE_NODE_KEY)}

Store.saveLinkHistory = (arr) => {
    localStorage.setItem(LOCAL_STORAGE_LINK_KEY, JSON.stringify(arr));
}

Store.loadLinkHistory = () =>JSON.parse(localStorage.getItem(LOCAL_STORAGE_LINK_KEY))

Store.removeAllLinkHistory=()=>{localStorage.removeItem(LOCAL_STORAGE_LINK_KEY)}

Store.saveHeadHistory = (arr) => {
    localStorage.setItem(LOCAL_STORAGE_HEAD_KEY, JSON.stringify(arr));
}

Store.loadHeadHistory = () =>JSON.parse(localStorage.getItem(LOCAL_STORAGE_HEAD_KEY))

Store.removeAllHeadHistory=()=>{localStorage.removeItem(LOCAL_STORAGE_HEAD_KEY)}


module.exports = Store