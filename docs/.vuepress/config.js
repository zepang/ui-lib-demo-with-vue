module.exports = {
  base: process.env.NODE_ENV === "production" ? "/lai-ui/" : "/",
  head: [["link", { rel: "icon", href: "/img/favicon.ico" }]],
  serviceWorker: false,
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "文档", link: "/posts/" },
      { text: "github", link: "https://github.com/zepang/lai-ui" }
    ],
    sidebar: [
      "/posts/",
      {
        title: "组件实践",
        collapsable: false,
        children: [
          "/posts/tutorial/1",
          // '/posts/tutorial/prerequsites',
          "/posts/tutorial/2",
          "/posts/tutorial/3",
          "/posts/tutorial/4",
          "/posts/tutorial/6",
          "/posts/tutorial/5",
          "/posts/tutorial/7",
          "/posts/tutorial/8",
          "/posts/tutorial/9",
          "/posts/tutorial/10"
        ]
      },
      {
        title: "样例组件",
        collapsable: false,
        children: [
          "/posts/components/button",
          "/posts/components/message",
          "/posts/components/modal",
          "/posts/components/checkbox",
          "/posts/components/tree",
          "/posts/components/date"
        ]
      }
    ]
  },
  configureWebpack: (config, isServer) => {
  }
}
