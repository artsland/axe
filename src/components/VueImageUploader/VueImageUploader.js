import Swal from "sweetalert2";
import vue2Dropzone from "vue2-dropzone";
import { message } from '../../utils/kit'
import "vue2-dropzone/dist/vue2Dropzone.min.css"

export default {
      components: {
            vueDropzone: vue2Dropzone
      },
      model: {
            props: "value", //这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
            event: "updateValue" //这个字段，是指父组件监听 parent-event 事件
      },
      props: {
            value: {
                  type: [Object, Array],
                  default: () => {
                        return {};
                  }
            },
            width: {
                  type: Number,
                  default: 150
            },
            height: {
                  type: Number,
                  default: 150
            },
            label: {
                  type: String,
                  default: ""
            },
            icon: {
                  type: String,
                  default: "cloud_upload"
            },
            ratio: {
                  type: Number,
                  default: 1
            },
            maxFiles: {
                  type: Number,
                  default: 9
            },
            maxFileSize: {
                  type: Number,
                  default: 1024
            },
            allow: Array,
            api: String,
            token: {
                  type: String,
                  default: ""
            },
            private: {
                  type: Boolean,
                  default: false
            }
      },

      mounted() {
            if (Object.keys(this.value).length == 0) {
                  return;
            }

            // 如果初次载入，则初始化数据
            let files = [];

            // 数据初始化
            if (Array.isArray(this.value)) {
                  if (this.value.length == 0) {
                        return;
                  }
                  files = this.value;
            } else {
                  if (Object.keys(this.value).length === 0) {
                        return;
                  }
                  files = [this.value];
            }

            files.forEach(file => {
                  if (!file.path || !file.url) {
                        return;
                  }
                  let namer = file.path.split("/");
                  let name = namer[namer.length - 1];
                  let remote_file = {
                        name: name,
                        fileUrl: file.url,
                        size: 1024 * Math.random() * 1000
                  };
                  this.$refs.filesImage.manuallyAddFile(remote_file, file.url);
            });
      },

      watch: {
            value: function () {
                  let files = this.$refs.filesImage.getAcceptedFiles();
                  if (files.length != 0) {
                        return;
                  }
                  // 如果初次载入，则初始化数据
                  // 数据初始化
                  if (Array.isArray(this.value)) {
                        if (this.value.length == 0) {
                              return;
                        }
                        files = this.value;
                  } else {
                        if (Object.keys(this.value).length === 0) {
                              return;
                        }
                        files = [this.value];
                  }
                  files.forEach(file => {
                        if (!file.path || !file.url) {
                              return;
                        }
                        let namer = file.path.split("/");
                        let name = namer[namer.length - 1];
                        let remote_file = {
                              name: name,
                              fileUrl: file.url,
                              size: 1024 * Math.random() * 1000
                        };
                        this.$refs.filesImage.manuallyAddFile(remote_file, file.url);
                  });
            }
      },

      data() {
            return {
                  id: Date.now() + "." + Math.floor(Math.random() * 100000),
                  dropzoneOptions: {
                        url: this.api,
                        maxFilesize: (this.maxFileSize / 1024).toFixed(2),
                        withCredentials: true,
                        chunking: true,
                        forceChunking: true,
                        addRemoveLinks: true,
                        chunkSize: 1048576, // 1M
                        acceptedFiles: this.allow.join(","),
                        maxFiles: this.maxFiles,
                        previewTemplate: this.template(),
                        thumbnailWidth: this.width,
                        thumbnailHeight: this.thumbnailHeight,
                        dictDefaultMessage: "",
                        dictInvalidFileType: "文件类型不允许上传",
                        dictFileTooBig: "上传文件不能超过{{maxFilesize}}M",
                        dictMaxFilesExceeded: "最多可以上传{{maxFiles}}个文件",
                        dictRemoveFile: `<i class="md-icon md-icon-font md-theme-default">delete_forever</i>`,
                        params: (files, xhr, chunk) => {
                              if (chunk) {
                                    let options = this.$refs.filesImage.options || {};
                                    return {
                                          token: this.token,
                                          private: this.private ? 1 : 0,
                                          uuid: chunk.file.upload.uuid,
                                          mimeType: chunk.file.type,
                                          chunkIndex: chunk.index,
                                          totalFileSize: chunk.file.size,
                                          currentChunkSize: chunk.dataBlock.data.size,
                                          totalChunkCount: chunk.file.upload.totalChunkCount,
                                          chunkByteOffset: chunk.index * options.chunkSize,
                                          chunkSize: options.chunkSize,
                                          filename: chunk.file.name
                                    };
                              }
                              return {
                                    token: this.token,
                                    private: this.private ? 1 : 0
                              };
                        }
                  }
            };
      },
      methods: {
            template: function () {
                  return `
                  <a  class="dz-preview dz-file-preview" style="width:${this.width}px;height:${this.height}px;">
                        <img data-dz-thumbnail style="width:${this.width}px;height:${this.height}px;object-fit: cover;"/>
                        <div class="dz-details">
                              <div class="dz-size">${this.label}</div>
                        </div>
                        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                        <div class="dz-success-mark">
                        <span>
                              <i class="md-icon md-icon-font md-theme-default">check_circle_outline</i>
                        </span>
                        </div>
                        <div class="dz-error-mark"><span>✘</span></div>
                        <div class="dz-error-message">
                        <span>
                              <i class="md-icon md-icon-font md-theme-default">error</i>
                        </span>
                        </div>
                  </a>
                  `
            },
            thumbnail: function (file, dataUrl) {
                  // 大图预览
                  if (file.previewElement) {
                        file.previewElement.addEventListener("click", () => {
                              Swal.fire({
                                    text: this.label,
                                    imageUrl: dataUrl,
                                    imageWidth: "auto",
                                    imageHeight: "auto",
                                    imageAlt: "Custom image",
                                    confirmButtonText: "确定",
                                    confirmButtonColor: "#EB1212",
                                    animation: false
                              });
                        });
                  }
            },
            onFilesAdded: function () { },
            onMaxFilesExceeded: function () { },
            onRemoved: function () { },
            onError: function (file, response) {
                  let _message = "上传失败";

                  if (typeof response == "object") {
                        _message = response.message ? response.message : "上传失败(服务端异常)";
                  } else if (typeof response == "string") {
                        _message = response;
                  } else {
                        _message = "上传失败(未知错误)";
                  }
                  this.$refs.filesImage.removeFile(file);

                  message.error(_message);
            },
            onSuccess: function (file) {
                  let data = JSON.parse(file.xhr.response);
                  // 单文件
                  if (this.maxFiles == 1) {
                        let value = {
                              path: data.path,
                              url: data.url
                        };

                        this.$emit("updateValue", value);

                        // 多文件
                  } else {
                        let value = Array.isArray(this.value) ? this.value : [];
                        value.push({
                              path: data.path,
                              url: data.url
                        });
                        this.$emit("updateValue", value);
                  }

                  // 更新预览图
                  if (file.previewElement) {
                        file.previewElement.addEventListener("click", () => {
                              Swal.fire({
                                    text: this.label,
                                    imageUrl: data.url,
                                    imageWidth: "auto",
                                    imageHeight: "auto",
                                    imageAlt: this.url,
                                    confirmButtonText: "确定",
                                    confirmButtonColor: "#EB1212",
                                    animation: false
                              });
                        });
                  }
            },
            onComplete: function () { }
      }
};