
const About = () => import('@/views/About.vue');
const Home = () => import('@/views/Home.vue');
const Mote = () => import('@/views/Mote.vue');
const Form = () => import('@/views/Form.vue');
const CustomForm = () => import('@/views/CustomForm.vue');
const Memo = () => import('@/views/Memo.vue');
const HelloWorld = () => import('@/views/HelloWorld.vue');
const List = () => import('@/views/List.vue');
const animateJS = () => import('@/views/animateJS.vue');
const qapps = () => import('@/views/qapp.vue');

import Header from '../views/Header.vue'
import Manager from '../views/Manager.vue'
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      nav: Header
    }
  },
  {
    path: '/hello',
    name: 'Hello',
    components: {
      default: HelloWorld,
      nav: Header
    }
  },
  {
    path: '/list',
    name: 'list',
    components: {
      default: List,
      nav: Header
    },
    meta: {
      title: 'List',
    },

  },
  {
    path: '/animateJS',
    name: 'animateJS',
    meta: {
      title: 'animateJS',
    }
    , components: {
      default: animateJS,
      nav: Header
    }
  },
  {
    path: '/form/:formName',
    name: 'CustomForm',
    components: {
      default: CustomForm,
      nav: Header
    },
    meta: {
      title: 'form',
    },
    props: { default: true, nav: false }
  },
  {
    path: '/memo',
    name: 'Memo',
    components: {
      default: Memo,
      nav: Header
    },
    meta: {
      title: 'Memo',
    }
  },

  {
    path: '/123',

    name: 'Form123',
    components: {
      default: Form,
      nav: Header
    },
    meta: {
      title: '123',
    }
  },
  {
    path: '/manager',
    name: 'Manager',
    components: {
      default: Manager,
      nav: Header
    }
  },

  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/mote',
    name: 'Mote',
    component: Mote
  },
  {
    path: '/RunApps',
    name: 'RunApps',
    components: {
      default: qapps,
      nav: Header
    },
    meta: {
      title: 'RunApp',
    }
  }
];

export default routes;
