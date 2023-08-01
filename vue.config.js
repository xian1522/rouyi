'use strict' //js 语法检查,严格模式
const path = require('path') //在代码中导入path,path模块是Node.js官方提供的、用来处理路径的模块

function resolve(dir){
  //_dirname Node.js变量，当前目录绝对路径
  return path.join(__dirname, dir) //路径拼接
}

const name = '若依管理系统';

// const CompressionPlugin = require('compression-webpack-plugin') //Gzip解压缩插件

module.exports={
  lintOnSave:false,
  devServer:{
    host:'localhost',
    port:'8085',
    open:false, //编译完成时打开网页
    proxy:{
      [process.env.VUE_APP_BASE_API]:{
        target:`http://localhost:8080`,
        changeOrigin:true,
        pathRewrite:{
          ['^' + process.env.VUE_APP_BASE_API]:''
        }
      }
    },
    historyApiFallback: true, //解决前端路由刷新，报404错误
    allowedHosts: ['all'] //允许其他设备访问本地服务
  },
  // webPack配置，如果是一个对象，会被webpack-merge到最终的webpack配置中
  configureWebpack:{
    name:name,
    resolve:{
      alias:{
        '@':resolve('src')
      }
    }
  },
  chainWebpack(config){
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  css:{
    loaderOptions:{
      sass:{
        sassOptions:{outputStyle:'expanded'}
      }
    }
  }
}
