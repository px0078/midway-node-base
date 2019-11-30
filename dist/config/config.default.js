"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1574519964458_8021';
    // add your config here
    config.middleware = [
        'graphql'
    ];
    config.security = {
        csrf: false,
    };
    // mongoose
    config.mongoose = {
        clients: {
            back: {
                url: 'mongodb://127.0.0.1:27017/pyedu',
                options: {
                    useUnifiedTopology: true
                },
            },
        },
    };
    config.redis = {
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: 'auth',
            db: 0,
        },
    };
    config.graphql = {
        router: '/graphql',
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
        // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
        graphiql: true,
        // graphQL 路由前的拦截器
        onPreGraphQL: async (ctx) => { },
        // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
        onPreGraphiQL: async (ctx) => { },
    };
    return config;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWUsQ0FBQyxPQUFZLEVBQUUsRUFBRTtJQUM5QixNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFFdkIsdUVBQXVFO0lBQ3ZFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxxQkFBcUIsQ0FBQztJQUVuRCx1QkFBdUI7SUFDdkIsTUFBTSxDQUFDLFVBQVUsR0FBRztRQUNsQixTQUFTO0tBQ1YsQ0FBQztJQUVGLE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsSUFBSSxFQUFFLEtBQUs7S0FDWixDQUFBO0lBRUQsV0FBVztJQUNYLE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFO2dCQUNKLEdBQUcsRUFBRSxpQ0FBaUM7Z0JBQ3RDLE9BQU8sRUFBRTtvQkFDUCxrQkFBa0IsRUFBRSxJQUFJO2lCQUN6QjthQUNGO1NBQ0Y7S0FDRixDQUFDO0lBRUYsTUFBTSxDQUFDLEtBQUssR0FBRztRQUNiLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLFdBQVc7WUFDakIsUUFBUSxFQUFFLE1BQU07WUFDaEIsRUFBRSxFQUFFLENBQUM7U0FDTjtLQUNGLENBQUE7SUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHO1FBQ2YsTUFBTSxFQUFFLFVBQVU7UUFDbEIsbUJBQW1CO1FBQ25CLEdBQUcsRUFBRSxJQUFJO1FBQ1QscUJBQXFCO1FBQ3JCLEtBQUssRUFBRSxLQUFLO1FBQ1oscURBQXFEO1FBQ3JELFFBQVEsRUFBRSxJQUFJO1FBQ2Qsa0JBQWtCO1FBQ2xCLFlBQVksRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLEVBQUUsR0FBRSxDQUFDO1FBQ3hDLDZDQUE2QztRQUM3QyxhQUFhLEVBQUUsS0FBSyxFQUFFLEdBQVksRUFBRSxFQUFFLEdBQUUsQ0FBQztLQUMxQyxDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=