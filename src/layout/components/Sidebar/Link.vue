<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>

import {isExternal} from '@/utils/validate'

export default {
  props: {
    to: {
        type: [String, Object],
        required: true
    }
  },
  computed: {
    isExternal() {
        return isExternal(this.to)
    },
    type() {
        if(this.isExternal){
            return 'a'
        }else{
            return 'router-link'
        }
    }
  },
  methods: {
    linkProps(to){
        if(this.isExternal){
            return {
                herf: to,
                target: '_blank',
                rel: 'noopener'
            }
        }
        return {
            to: to
        }
    }
  }
}
</script>

