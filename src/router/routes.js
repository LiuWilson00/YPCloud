
const About = () => import('@/views/About.vue');
const Home = () => import('@/views/Home.vue');
const Mote = () => import('@/views/Mote.vue');
const Form = () => import('@/views/Form.vue');
const Tel = () => import('@/views/TelForm.vue');
const Memo = () => import('@/views/Memo.vue');

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
    path: '/form',
    name: 'TelForm',
    components: {
      default: Tel,
      nav: Header
    }
  },
  {
    path: '/memo',
    name: 'Memo',
    components: {
      default: Memo,
      nav: Header
    }
  },

  {
    path: '/123',
    name: 'Form123',
    components: {
      default: Form,
      nav: Header
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
