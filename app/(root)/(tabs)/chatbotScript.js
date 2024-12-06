export const embedChatbot = async function embedChatbot() {
  let d = {
    token: "tgupbU3GseH1Zjj4",
    baseUrl: "https://3f6c-49-207-195-210.ngrok-free.app",
    iconColor: "#0370B6",
  };
  let n = d?.iconColor ?? "#0370B6";
  if (d && d.token) {
    let i = `<img src='${d.baseUrl}/logo/speechbubble.png' style="height: 35px; width: 35px" />`,
      o = `<img src='${d.baseUrl}/logo/arrow-down-s-line.svg' style="height: 35px; width: 35px"/>`,
      r = d.baseUrl;
    if (!document.getElementById("chatbot-bubble-button")) {
      let e = document.createElement("div"),
        t = ((e.id = "chatbot-bubble-button"), document.createElement("div"));
      (e.style.cssText = `
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
    cursor: pointer;
    z-index: 2147483647;
    transition: all 0.2s ease-in-out;
    background-color: ${n};
  `),
        (t.style.cssText = `
    display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;
  `),
        (t.innerHTML = i),
        e.appendChild(t),
        document.body.appendChild(e),
        e.addEventListener("mouseenter", () => {
          e.style.backgroundColor = n;
        }),
        e.addEventListener("mouseleave", () => {
          e.style.backgroundColor = n;
        }),
        e.addEventListener("click", () => {
          if (document.getElementById("chatbot-bubble-window")) {
            let e = document.getElementById("chatbot-bubble-container");
            "scale(0)" === e.style.transform || "0" === e.style.opacity
              ? ((e.style.visibility = "visible"),
                setTimeout(() => {
                  (e.style.transform = "scale(1)"), (e.style.opacity = "1");
                }, 10),
                (t.innerHTML = o))
              : ((e.style.transform = "scale(0)"),
                (e.style.opacity = "0"),
                setTimeout(() => {
                  (e.style.visibility = "hidden"), (t.innerHTML = i);
                }, 500));
          } else {
            {
              let n = document.createElement("div");
              (n.id = "chatbot-bubble-container"),
                (n.style.cssText =
                  "position: fixed; bottom: 5rem; right: 1rem; height: 0; width: 24rem; max-width: calc(100vw - 1rem); max-height: calc(100vh - 6rem); border-radius: 0.75rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px; z-index: 2147483647; overflow: hidden; background-color: #FFFFFF; transition: transform 0.5s ease, opacity 0.5s ease; transform: scale(0); opacity: 0; visibility: hidden;");
              var e = document.createElement("button");
              (e.innerHTML =
                '<svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L1 9M1 1L9 9" stroke="#475467" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
                (e.style.cssText = `
    position: absolute;
    top: 23px;
    right: 8px;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 2147483648;
    display: none;
  `),
                e.addEventListener("click", () => {
                  (n.style.transform = "scale(0)"),
                    (n.style.opacity = "0"),
                    setTimeout(() => {
                      (n.style.visibility = "hidden"),
                        (document
                          .getElementById("chatbot-bubble-button")
                          .querySelector("div").innerHTML = i);
                    }, 500);
                });
              let s = document.createElement("iframe");
              (s.allow = "fullscreen;microphone"),
                (s.title = "Chatbot window"),
                (s.id = "chatbot-bubble-window"),
                (s.src = r + "/chatbot/" + d.token),
                (s.style.cssText = `
    border: none;
    height: 100%;
    width: 100%;
    border-radius: 0.75rem;
  `),
                n.appendChild(e),
                n.appendChild(s),
                document.body.appendChild(n),
                (e = () => {
                  var e = window.matchMedia("(max-width: 768px)").matches,
                    t = n.style.visibility,
                    i = n.style.transform,
                    o = n.style.opacity;
                  e
                    ? ((n.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100vw;
        height: 100%; /* Adjust height dynamically */
        border-radius: 0;
        z-index: 2147483647;
        background-color: #FFFFFF;
        display: flex;
        justify-content: center;
        overflow: hidden;
        transition: transform 0.5s ease, opacity 0.5s ease;
      `),
                      (s.style.cssText = `
        border: none;
        height: 100%;
        width: 100%;
        border-radius: 0;
      `))
                    : ((n.style.cssText = `
        position: fixed;
        bottom: 5rem;
        right: 1rem;
        height: 85%;
        width: 24rem;
        max-width: calc(100vw - 1rem);
        max-height: calc(100vh-6rem);
        border-radius: 0.75rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px;
        z-index: 2147483647;
        overflow: hidden;
        background-color: #FFFFFF;
        transition: transform 0.5s ease, opacity 0.5s ease;
      `),
                      (s.style.cssText = `
        border: none;
        height: 100%;
        width: 100%;
        border-radius: 0.75rem;
      `)),
                    (n.style.visibility = t),
                    (n.style.transform = i),
                    (n.style.opacity = o);
                })(),
                window.addEventListener("resize", e);
            }
            setTimeout(() => {
              let e = document.getElementById("chatbot-bubble-container");
              (e.style.visibility = "visible"),
                setTimeout(() => {
                  (e.style.transform = "scale(1)"), (e.style.opacity = "1");
                }, 10),
                (t.innerHTML = o);
            }, 10);
          }
        });
    }
    function embed(e) {
      if ("closeChatWindow" === e.data?.action) {
        let e = document.getElementById("chatbot-bubble-container");
        e &&
          ((e.style.transform = "scale(0)"),
          (e.style.opacity = "0"),
          setTimeout(() => {
            e.style.visibility = "hidden";
          }, 500));
      }
    }

    window.addEventListener("message", embed),
      (window.onunload = function () {
        window.removeEventListener("message", embed);
      });
  } else console.error("Chatbot token is empty");
};
