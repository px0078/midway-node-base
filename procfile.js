module.exports = (pandora) => {

  pandora
  
    // 默认启动到 worker 进程分组
    .cluster('./app.js'); 
 
  /* 自定义 Worker 数量
  pandora
    .process('worker')
    
    // 修改 worker 进程分组启动 2 个 worker 
    // ，默认是 pandora.dev ? 1 : 'auto'。
    // 意思就是 pandora dev 启动的话就不 Cluster 
    // ，如果 pandora start 启动的话就 Cluster 到 CPU 数量。
    .scale(2); 
  */
    
}