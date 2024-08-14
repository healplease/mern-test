export const navigationItems = [
  {
    title: 'Home',
    value: 'home',
    props: {
      prependIcon: 'mdi-home',
      link: true,
      to: '/',
    }
  },
  {
    title: 'My Todo Lists',
    value: 'todolists',
    props: {
      prependIcon: 'mdi-format-list-checks',
      link: true,
      to: '/todolists',
    }
  },
  {
    title: 'Create New Todo List',
    value: 'create-todolist',
    props: {
      prependIcon: 'mdi-plus',
      link: true,
      to: '/todolists/create',
    }
  },
]
