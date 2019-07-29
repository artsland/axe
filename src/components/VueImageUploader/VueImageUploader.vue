<template>
      <div>
            <vue-dropzone
                  ref="filesImage"
                  class="files-image"
                  :id="`${this.id}`"
                  :style="{
                        minWidth: `${this.width}px`,
                        minHeight: `${this.height}px`,
                        height: 'auto',
                        textAlign: 'left'
                  }"
                  :options="dropzoneOptions"
                  :useCustomSlot="true"
                  @vdropzone-files-added="onFilesAdded"
                  @vdropzone-max-files-exceeded="onMaxFilesExceeded"
                  @vdropzone-error="onError"
                  @vdropzone-removed-file="onRemoved"
                  @vdropzone-success="onSuccess"
                  @vdropzone-complete="onComplete"
                  @vdropzone-thumbnail="thumbnail"
            >
                  <div
                        class="dropzone-custom-content flex flex_column justify_center align_center"
                        :style="{ width: `${this.width}px` }"
                  >
                        <i class="md-icon mb_10">{{icon}}</i>
                        <span>{{ label }}</span>
                  </div>
            </vue-dropzone>
      </div>
</template>

<script src='./VueImageUploader.js'></script>

<style scoped lang="less">
@import "./VueImageUploader.less";
</style>

