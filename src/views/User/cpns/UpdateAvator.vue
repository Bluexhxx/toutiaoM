<template>
  <div class="update-avatar">
    <img :src="photo" alt="" ref="image" />
    <div class="toolbar">
      <span>取消</span>
      <span @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadImg } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      require: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
      console.dir(this.myCropper)
    },
    confirm() {
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        const { data } = await uploadImg(blob)
        console.log(data.data.photo)
        this.$emit('update:avator', data.data.photo)
      })
    }
  }
}
</script>
<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 65%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 9999;
  }
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
