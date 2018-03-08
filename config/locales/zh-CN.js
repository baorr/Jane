let I18N_CONSTANT = {
    "HOME":"首页",
    "LIVE": "直播",
    "HOME_ANNOUNCE": "世界因视频而聚",
    "LIVE_ANNOUNCE": "直播因你而精彩"
}

if(typeof window !== "undefined"){
    window.__i18n_const__ = (key) => {return (key && I18N_CONSTANT[key]) ? I18N_CONSTANT[key] : '';};
}else if(typeof module !== "undefined" && typeof module.exports !== "undefined"){
    module.exports = I18N_CONSTANT;
}