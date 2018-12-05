<template>
  <div class="lai-select__wrapper" style="width: 200px" v-click-outside="hideOptions">
    <div class="lai-select__selection" @click="showOptions" ref="selection">
      <input type="text" class="lai-select__input" v-show="filterable" v-model="filter" @blur="handleSelectInputBlur">
      <div class="lai-select__value" v-if="selected && !filter">{{selected.label || selected}}</div>
      <span class="lai-select__placeholder" v-if="!selected && !filter">请选择</span>
      <i class="iconfont icon-previewleft lai-select__icon"></i>
    </div>
    <div class="lai-select__options" v-show="isShow && selectOptions.length">
      <div 
        class="lai-select__option" 
        v-for="(option, index) in selectOptions" 
        :key="index"
        @click="handleSelected(option)">
          {{option.label}}
      </div>
    </div>
     <div class="lai-select__options" v-show="isShow && !selectOptions.length">
      <div 
        class="lai-select__option" 
        >
          未找到相关数据
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'lei-select',
  data () {
    return {
      filter: '',
      isShow: false,
      selected: this.value,
      selectOptions: [],
    }
  },
  props: {
    value: {
      type: [Array,String,Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    // 支持搜索
    filterable: {
      type: Boolean,
      default: false
    }
  },
  beforeMount () {
    // 初始化 selected 的值
    this.selectOptions = this.options
    this.getSelected()
  },
  methods: {
    getSelected () {
      if (!this.value || !this.options.length) return
      if (this.options.toString().indexOf('[object Object]') !== -1) {
        this.selected = this.options.find(({value}) => value === this.value)
      } else {
        this.selected = this.value
      }
    },
    handleSelected (selected) {
      let value 
      if (typeof selected === 'object') {
        value = selected.value
      } else {
        value = selected
      }
      this.selected = selected
      this.$emit('input', value)
      this.$emit('change', value)
      this.isShow = false
    },
    filterOptions () {
      if (!this.options.length) return 
      if (this.options.toString().indexOf('[object Object]') !== -1) {
        this.selectOptions = this.options.filter(item => item.label.indexOf(this.filter) !== -1)
      } else {
        this.selectOptions = this.options.filter(item => item.indexOf(this.filter) !== -1)
      }
    },
    handleSelectInputBlur () {
      this.filter = ''
    },
    showOptions () {
      this.isShow = true
    },
    hideOptions () {
      this.isShow = false
    }
  },
  watch: {
    filter (val) {
      if (val) {
        this.filterOptions()
      } else {
        this.isShow = false
        this.selectOptions = this.options
      }
    },  
    value (val) {
      this.getSelected()
    },
    isShow (val) {
      if (val) {
        this.$refs.selection.classList.add('lai-select__focus')
      } else {
        this.$refs.selection.classList.remove('lai-select__focus')
      }
    }
  }
}
</script>
