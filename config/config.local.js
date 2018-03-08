'use strict';
/**
 * 基础配置
 */
module.exports = appInfo => {
    const config = {};

    //国际化
    config.i18n = {
        queryField: 'locale',
        cookieField: 'locale',
        cookieMaxAge: '1y',
        defaultLocale: 'en-US'
    };
    
    //app key(share cookies)
    config.keys = 'Jane';

    //view template
    config.view = {
        defaultViewEngine: 'nunjucks',
        defaultExtension: '.html',
    };

    // log配置
    config.logger = {
        appLogName: `web.log`,
        coreLogName: `${appInfo.name}.log`,
        agentLogName: `agent.log`,
        errorLogName: `common-error.log`,
        dir: `/Users/baobao/Desktop/own/Jane/logs/${appInfo.name}`,
        level:'DEBUG', // 定义日志级别为DEBUG,以便在终端控制台输出
        consoleLevel:'DEBUG',
        disableConsoleAfterReady: false
    };

    return config;
};