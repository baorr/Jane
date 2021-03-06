module.exports = app => {
  class MusicalController extends app.Controller {
    /**
     * 首页视图
     */
    async indexView() {
    	  const { ctx } = this;

        //生成视图  
        await ctx.render('/musical/index');

    }

    async liveView() {
        const { ctx } = this;

        //生成视图  
        await ctx.render('/musical/live');

    }

  }
      
  return MusicalController;
};
