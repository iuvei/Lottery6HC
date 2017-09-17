module.exports = {
	proxyList: {
		'/port':{
	        target: 'http://www.dfa05.com/tools',
	        changeOrigin:true,
	        pathRewrite: {
	        	//'^/port': ''
	        }
	    }
	}
}