
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/PageTodo.vue')
      },
      {
        path: '/users',
        component: () => import('pages/PageUsers.vue')
      },
      {
        path: '/project',
        component: () => import('pages/PageProject.vue')
      },
      {
        path: '/worksheet',
        component: () => import('pages/PageWorksheet.vue')

      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
