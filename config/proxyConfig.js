module.exports = {
	proxyList: {
		'/api':{
	        target: 'http://test.a.com',
	        changeOrigin:true,
	        pathRewrite: {
	        	'^/api': ''				// 比如请求带有 '/api' 才会转发。
	        }
	    }
	}
}