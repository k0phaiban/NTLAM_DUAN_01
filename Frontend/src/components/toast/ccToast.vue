<template>
  <div id="product-list">
    <DxToast
      :visible="isVisible"
      :message="message"
      :type="type"
      position="bottom right"
      @hidden="isVisible = false"
    />
  </div>
</template>
<script>
import { DxToast } from 'devextreme-vue/toast';

export default {
  components: {
    DxToast,
  },

  data() {
    return {
      isVisible: false,
      message: '',
      type: 'info',
    };
  },
  methods: {
    checkAvailability(type, message) {
      this.type = type;
      this.message = message;
      this.isVisible = true;
    },
  },
};
</script>
<style>
#product-list {
  padding: 10px;
}

#product-list ul {
  text-align: center;
  list-style-type: none;
  margin: 20px 0;
}

#product-list ul li {
  display: inline-block;
  width: 160px;
  margin: 10px;
}

#product-list ul li img {
  width: 100px;
}

.dx-toast-content {
  min-width: 300px;
  max-width: 400px;
}
</style>
