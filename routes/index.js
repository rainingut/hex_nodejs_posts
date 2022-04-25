const HttpController  = require('../controllers/http');
const PostsController = require('../controllers/posts');

const router = (request, response) => {
  if (request.method === 'GET' && request.url === '/posts') {
    PostsController.getPosts(response);
  }
  else if (request.method === 'POST' && request.url === '/posts') {
    PostsController.postPost(request,response);
  }
  else if (request.method === 'DELETE' && request.url === '/posts') {
    PostsController.deletePosts(response);
  }
  else if (request.method === 'DELETE' && request.url.startsWith('/posts/')) {
    PostsController.deletePost(request,response);
  }
  else if (request.method === 'PATCH' && request.url.startsWith('/posts/')) {
    PostsController.patchPost(request,response);
  }
  else if (request.method === 'OPTIONS'){
    HttpController.cors(response); 
  }
  else {
    HttpController.notFound(response); 
  }
}

module.exports = router;
