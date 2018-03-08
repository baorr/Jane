let I18N_CONSTANT = {
    "HOME":"home",
    "LIVE": "live.ly",
    "HOME_ANNOUNCE": "Global Video Community",
    "LIVE_ANNOUNCE": "live video streaming"
};

if(typeof window !== "undefined"){
    window.__i18n_const__ = (key) => {return (key && I18N_CONSTANT[key]) ? I18N_CONSTANT[key] : '';};
}else if(typeof module !== "undefined" && typeof module.exports !== "undefined"){
    module.exports = I18N_CONSTANT;
}
