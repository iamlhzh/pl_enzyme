import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import molecularDocking from '@/components/molecularDocking'
import fileList from '@/components/fileList'
import index from '@/components/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/molecularDocking',
      name: 'molecularDocking',
      component: molecularDocking
    },
    {
      path: '/fileList',
      name: 'fileList',
      component: fileList
    }
  ]
})
