const successHandler = require('../utility/successHandler');
const errorHandler   = require('../utility/errorHandler');
const PostModel      = require('../models/posts');

const buffleHandler = async (request) => {
  let buffers = [];
  for await(let buffle of request) {
    buffers.push(buffle);
  }
  const data =  (Buffer.concat(buffers).toString());
  return JSON.parse(data);
}



const posts = {
  async getPosts(response){
    const posts = await PostModel.getDB();
    successHandler(response, {data: posts});
  },


  async postPost(request, response){
    try {
      const data = await buffleHandler(request);
      PostModel.postDB(data)
        .then(async(result) => 
          successHandler(response, {message: '新增成功', data: await PostModel.getDB()}))
        .catch(error => errorHandler({response, statusCode:400, content:{message:error.errors}}));
    }
    catch(error) {
      errorHandler({response, statusCode: 400, content: { message: '格式錯誤', error }});
    }
  },


  async patchPost(request,response){
    const id = request.url.split('/').pop();
    const isexist = await PostModel.existsDB(id);
    try {
      if (!isexist) {
        errorHandler(  {response, statusCode:400, content:{message:'查無此ID'}}  );
        return;
      }

      const data = await buffleHandler(request);
      PostModel.patchDB(id, data)
        .then(async(result) => {
          const posts = await PostModel.getDB()
          successHandler(response, {data: posts, message: '更新成功'})
        })
        .catch(error => {
          errorHandler({response, statusCode:400, content:{message:error}}); 
        });
    }
    catch(error){
      errorHandler({response, statusCode: 400, content: { message: '格式錯誤', error }});
    }
  },


  async deletePost(request,response){
    const id = request.url.split('/').pop();
    const isexist = await PostModel.existsDB(id)
    if(!isexist) {
      errorHandler(  {response, statusCode:400, content:{message:'查無此ID'}}  );
      return;
    }
    PostModel.deleteOneDB(id)
      .then(async(result) => {
        const posts = await PostModel.getDB()
        successHandler(response, {data: posts, message: '刪除成功'})
      })
      .catch(error => {
        errorHandler({response, statusCode:400, content:{message:error}}); 
      });
  },



  async deletePosts(response){
    PostModel.deleteAllDB()
      .then(() => successHandler(response, {message:'全部項目刪除成功', data: []}))
      .catch(error => errorHandler({response, statusCode:400, content:{message:'刪除失敗', error}}));
  },
};

module.exports = posts;