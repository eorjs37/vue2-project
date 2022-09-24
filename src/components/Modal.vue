<template>
  <transition name="fade">
    <div class="modal" v-if="visible">
      <div class="wrap">
        <div class="modal-header">
          <div class="title">
            <h1>모달 제목</h1>
          </div>
          <div class="close" @click="closeModal()">X</div>
        </div>

        <div class="modal-body">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta culpa alias saepe fugiat amet blanditiis dolorum officia pariatur hic, laboriosam, illum repudiandae ab illo eius laborum labore temporibus reprehenderit incidunt.</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false);
    },
  },
};
</script>

<style>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 400px;
  border-radius: 10px;
}

.wrap > .modal-header {
  text-align: left;
  border-bottom: 1px solid #eee;
  font-size: 30px;
  line-height: 1.2em;
  padding: 10px;
  overflow: hidden;
}

.modal-header > .title {
  float: left;
}

.modal-header > .close {
  float: right;
  cursor: pointer;
}

.wrap > .modal-body {
  padding: 10px;
  line-height: 1.5em;
}

/*############ ############*/
.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>
