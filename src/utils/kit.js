class message {
      static showMessage() {
            const _message = document.getElementById("message");

            //出现动画
            _message.childNodes[1].style.transform = "translateY(16px)"
      }

      static hideMessage() {
            const _message = document.getElementById("message");

            //消失动画
            _message.childNodes[1].style.transform = "translateY(-48px)"
      }

      static clearMessage() {
            const _message = document.getElementById('message');

            if (_message != null) {
                  _message.parentNode.removeChild(_message);
            }
      }

      static common(color, shadow_color, title) {
            this.clearMessage();

            const body = document.getElementsByTagName("body")[0];
            const modal_style = `
                  width:100vw;
                  height:100vh;
                  background-color:transparent;
                  position:fixed;
                  top:0;
                  left:0;
                  z-index:999999;
                  display:flex;
                  justify-content:center;
            `

            let nodes_style = `
                  "height:36px;
                  line-height:36px;
                  padding:0 20px;
                  background-color:${color};
                  box-shadow: 4px 4px 32px ${shadow_color};
                  color:white;
                  font-size:13px;
                  letter-spacing:1px;
                  border-radius:100px;
                  transition:all ease 0.3s;
                  transform:translateY(-36px);"
            `

            let nodes = document.createElement('div');
            nodes.setAttribute("id", "message");
            nodes.setAttribute("style", modal_style);

            const nodes_main = `
                  <span style=${nodes_style}>${title}</span>
            `;
            nodes.innerHTML = nodes_main;

            body.appendChild(nodes);

            setTimeout(() => {
                  this.showMessage()
            }, 0);

            setTimeout(() => {
                  this.hideMessage()
            }, 1500);

            setTimeout(() => {
                  this.clearMessage()
            }, 1800);
      }

      static error(title) {
            this.common('#eb3939', 'rgba(235, 57, 57, 0.24)', title);
      }

      static warn(title) {
            this.common('#f1803f', 'rgba(241, 128, 63, 0.24)', title);
      }

      static success(title) {
            this.common('#19b119', 'rgba(25, 177, 25, 0.24)', title);
      }
}

class loading {
      static show(color) {
            const body = document.getElementsByTagName("body")[0];
            const modal_style = `
                  width:100vw;
                  height:100vh;
                  background-color:white;
                  position:fixed;
                  top:0;
                  left:0;
                  z-index:999999;
                  display:flex;
                  justify-content:center;
                  align-items:center;
            `

            let nodes = document.createElement('div');
            nodes.setAttribute("id", "loading");
            nodes.setAttribute("style", modal_style);

            const nodes_main = `
                  <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100" height="100" fill="${color ? color : 'black'}">
                              <circle transform="translate(8 0)" cx="0" cy="16" r="0"> 
                              <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0"
                              keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
                              </circle>
                              <circle transform="translate(16 0)" cx="0" cy="16" r="0"> 
                              <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.3"
                              keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
                              </circle>
                              <circle transform="translate(24 0)" cx="0" cy="16" r="0"> 
                              <animate attributeName="r" values="0; 4; 0; 0" dur="1.2s" repeatCount="indefinite" begin="0.6"
                              keytimes="0;0.2;0.7;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8" calcMode="spline" />
                              </circle>
                        </svg>
                  </div>
            `;
            nodes.innerHTML = nodes_main;

            body.appendChild(nodes);
      }

      static hide() {
            const _loading = document.getElementById('loading');

            if (_loading != null) {
                  _loading.parentNode.removeChild(_loading);
            }
      }
}

export {
      message,
      loading
}