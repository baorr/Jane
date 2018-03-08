module.exports = app => {
  class UiController extends app.Controller {
    /**
     * 首页视图
     */
    async indexView() {
    	let {ctx} = this;
      
      //生成视图  
      await ctx.render('/ui/index');
    }

  }
      
  return UiController;
};
