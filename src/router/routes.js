
const About = () => import('@/views/About.vue');
const Home = () => import('@/views/Home.vue');
const Mote = () => import('@/views/Mote.vue');
const Form = () => import('@/views/Form.vue');
const CustomForm = () => import('@/views/CustomForm.vue');
const Memo = () => import('@/views/Memo.vue');
const HelloWorld = () => import('@/views/HelloWorld.vue');

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
    path: '/form',
    name: 'CustomForm',
    components: {
      default: CustomForm,
      nav: Header
    }
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
  }
];

export default routes;
