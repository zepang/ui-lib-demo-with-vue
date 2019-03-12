module.exports = {
  title: 'Components Learning With Vue',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico' }]
  ],
  serviceWorker: false,
  themeConfig: {
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'documents', link: '/posts/' },
      { text: 'github', link: 'https://google.com' },
    ],
    sidebar: [
      '/posts/',
      {
        title: '组件实践',
        collapsable: false,
        children: [
          '/posts/tutorial/1',
          // '/posts/tutorial/prerequsites',
          '/posts/tutorial/2',
          '/posts/tutorial/3',
          '/posts/tutorial/4',
          '/posts/tutorial/5',
          '/posts/tutorial/6',
          '/posts/tutorial/7',
          '/posts/tutorial/8',
          '/posts/tutorial/9',
          '/posts/tutorial/10',
        ]
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          '/posts/components/button',
          '/posts/components/message'
        ]
      }
    ]
  }
}