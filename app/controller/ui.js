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

    async vueView() {
      let {ctx} = this;
      //生成视图  
      await ctx.render('/vue/index');
    }

    async reactView(){
      let {ctx} = this;
      //生成视图  
      await ctx.render('/react/index');
    }

    async hackView(){
      let {ctx} = this;
      //生成视图  
      await ctx.render('/hack/index');
    }
  }
      
  return UiController;
};
