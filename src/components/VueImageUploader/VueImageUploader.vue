<template>
      <div>
            <vue-dropzone
                  ref="filesImage"
                  class="files-image"
                  :id="`${this.id}`"
                  :style="{
                        width: `${this.width}px`,
                        height: `${this.height}px`,
                        marginTop:0,
                        fontSize:'13px'
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
                        class="dropzone-custom-content flex flex_column justify_center align_center h_100 w_100"
                        :style="{ width: `${this.width}px` }"
                  >
                        <i
                              class="md-icon mb_10"
                              style="margin-right:0;"
                        >{{icon}}</i>
                        <span class="color_aaa">{{ label }}</span>
                  </div>
            </vue-dropzone>
      </div>
</template>

<script src='./VueImageUploader.js'></script>

<style lang="less">
@import "./VueImageUploader.less";
</style>

