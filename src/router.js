import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [
        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Home.vue')
              },
              {
                path: '/page2',
                name: 'page-2',
                component: () => import('./views/Page2.vue')
              },
              {
                path: '/profile',
                name: 'profile',
                component: () => import('./views/pages/user/UserProfile.vue')
              },
              {
                path: '/customers',
                name: 'Customers',
                component: () => import('./views/pages/customers/Index.vue')
              },
              {
                path: '/view_customer/:id',
                name: 'View Customers',
                component: () => import('./views/pages/customers/view-customer/Index.vue')
              },
              {
                path: '/customer_activation',
                name: 'Customer Activation',
                component: () => import('./views/pages/customers/CustomerActivation.vue')
              },
              {
                path: '/create_customer',
                name: 'Create Customer',
                component: () => import('./views/pages/customers/CreateCustomer.vue')
              },
              {
                path: '/entity',
                name: 'Entity',
                component: () => import('./views/pages/entity/Index.vue')
              },
              {
                path: '/createEntity',
                name: 'CreateEntity',
                component: () => import('./views/pages/entity/CreateEntity.vue')
              },
              {
                path: '/officeactivitylog',
                name: 'Office Activity Log',
                component: () => import('./views/pages/Activity/ActivityLog')
              },
              {
                path: '/view_entity/:id',
                name: 'View Entity',
                component: () => import('./views/pages/entity/view-entity/Index')
              },
              {
                path: '/edit_entity/:id',
                name: 'Edit Entity',
                component: () => import('./views/pages/entity/UpdateEntity')
              },
              {
                path: '/view_order/:cid/:id',
                name: 'View Order',
                component: () => import('./views/pages/customers/view-customer/view-order/Index')
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/login',
                name: 'page-login',
                component: () => import('@/views/pages/Login.vue')
              },
              {
                path: '/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
