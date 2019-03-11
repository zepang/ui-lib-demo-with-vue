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
          '/posts/tutorial/instruction',
          // '/posts/tutorial/prerequsites',
          '/posts/tutorial/basic',
          '/posts/tutorial/communication',
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