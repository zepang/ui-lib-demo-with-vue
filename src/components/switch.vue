<template lang="html">
  <div :class="wrapperClass">
    <input type="checkbox" id="switch-input" :checked="isChecked" class="switch-input" @change="toggleSwitch">
    <label for="" :class="innerClass" for="switch-input"></label>
  </div>
</template>

<script>
export default {
  name: 'switchPage',
  data () {
    return {
      isChecked: this.value,
      prefix: 'lai'
    }
  },
  computed: {
    wrapperClass () {
      return [
        `${this.prefix}-switch ${this.prefix}-switch__${this.size}`,
        {
          [`${this.prefix}-switch__checked`]: this.isChecked,
          [`${this.prefix}-switch__disabled`]: this.disabled
        }
      ]
    },
    innerClass () {
      return `${this.prefix}-switch-label`
    }
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: (value) => {
        return ['small', 'middle', 'large'].indexOf(value) > -1
      },
      default: 'middle'
    }
  },
  watch: {
    value (value) {
      this.isChecked = value
    }
  },
  methods: {
    toggleSwitch (e) {
      this.isChecked = e.target.checked
      this.$emit('input', e.target.checked)
      this.$emit('change', e.target.checked)
    }
  }
}
</script>

<style lang="less">
@prefix: lai;
@size-list: small, middle, large;

@large-width: 56px;
@large-height: 22px;
@middle-width: 44px;
@middle-height: 22px;
@small-width: 28px;
@small-height: 16px;

.loop(@i) when (@i <= length(@size-list)) {
  @type: extract(@size-list, @i);
  @width: "@{type}-width";
  @height: "@{type}-height";
  .@{prefix}-switch__@{type} {
    &.@{prefix}-switch__checked {
      .@{prefix}-switch-label {
        background-color: #7983ff;
      }
      .@{prefix}-switch-label:after {
        transform: translateX(@@width - @@height);
      }
    }
    .@{prefix}-switch-label {
      width: @@width;
      height: @@height;
      &:after {
        width: @@height - 2px;
        height: @@height - 2px;
      }
    }
  }
  .loop((@i + 1));
}
.loop(1);
.@{prefix}-switch {
  width: 100%;
  display: inline-block;
  .@{prefix}-switch-label {
    display: inline-block;
    position: relative;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: all 0.3s;
    &:after {
      content: '';
      position: absolute;
      top: 1px;
      left: 1px;
      transition: all 0.3s;
      border-radius: 50%;
      background-color: white;
    }
  }
  .switch-input {
    width: 0;
    height: 0;
    position: absolute;
    z-index: -9999;
    border: 0;
    opacity: 0;
  }
}
</style>
