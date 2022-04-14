let proxyObj = {}

proxyObj["/empl"] = {
    ws: false,
    target: 'http://localhost:9090',
    changeOrigin: true,
    pathRewrite: {
        '^/empl': '/empl'
    }
}
proxyObj["/position"] = {
    ws: false,
    target: 'http://localhost:9090',
    changeOrigin: true,
    pathRewrite: {
        '^/position': '/position'
    }
}
proxyObj["/dept"] = {
    ws: false,
    target: 'http://localhost:9090',
    changeOrigin: true,
    pathRewrite: {
        '^/dept': '/dept'
    }
}

proxyObj["/post"] = {
    ws: false,
    target: 'http://localhost:9090',
    changeOrigin: true,
    pathRewrite: {
        '^/post': '/post'
    }
}

proxyObj["/admin"] = {
    ws: false,
    target: 'http://localhost:9090',
    changeOrigin: true,
    pathRewrite: {
        '^/admin': '/admin'
    }
}
// "/position": {
//     ws: false,
//     target: 'http://localhost:9090',
//     changeOrigin: true,
//     pathRewrite: {
//         '^/position': '/position'
//     }
// }


module.exports = {
    devServer: {
        host: 'localhost',
        port: '8082',
        proxy: proxyObj,
    }
}