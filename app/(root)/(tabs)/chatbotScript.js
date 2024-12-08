export const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        .chatbot-bubble-button {
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
        }

        .chatbot-bubble-button-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }

        .chatbot-bubble-container {
            position: fixed;
            bottom: 5rem;
            right: 1rem;
            height: 85%;
            width: 24rem;
            max-width: calc(100vw - 1rem);
            max-height: calc(100vh - 6rem);
            border-radius: 0.75rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px,
                      rgba(150, 150, 150, 0.2) 0px 0px 0px 1px;
            z-index: 2147483647;
            overflow: hidden;
            background-color: #FFFFFF;
            transition: transform 0.5s ease, opacity 0.5s ease;
            transform: scale(0);
            opacity: 0;
            visibility: hidden;
        }

        .chatbot-close-button {
            position: absolute;
            top: 23px;
            right: 8px;
            background: transparent;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 2147483648;
            display: none;
        }

        .chatbot-iframe {
            border: none;
            height: 100%;
            width: 100%;
            border-radius: 0.75rem;
        }

        @media (max-width: 768px) {
            .chatbot-bubble-container {
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: 100vw;
                height: 100%;
                border-radius: 0;
            }

            .chatbot-iframe {
                border-radius: 0;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; border:1px solid red; height:200px; width:200px;">
    <script>
        class Chatbot {
            constructor(config) {
                this.config = {
                    token: "tgupbU3GseH1Zjj4,
                    baseUrl: "https://obliging-welcome-lamb.ngrok-free.app",
                    iconColor: "#0370B6"
                };
                this.elements = {};
                this.initialize();
            }

            initialize() {
                if (!this.config.token) {
                    console.error("Chatbot token is empty");
                    return;
                }

                this.createBubbleButton();
                this.setupEventListeners();
            }

            createBubbleButton() {
                if (document.getElementById("chatbot-bubble-button")) {
                    return;
                }

                const button = document.createElement("div");
                button.id = "chatbot-bubble-button";
                button.className = "chatbot-bubble-button";
                button.style.backgroundColor = this.config.iconColor;

                const buttonInner = document.createElement("div");
                buttonInner.className = "chatbot-bubble-button-inner";
                buttonInner.innerHTML = this.getChatIcon();

                button.appendChild(buttonInner);
                document.body.appendChild(button);
                this.elements.button = button;
                this.elements.buttonInner = buttonInner;
            }

            getChatIcon() {
                return \`<img src='\${this.config.baseUrl}/logo/speechbubble.png' style="height: 35px; width: 35px" />\`;
            }

            getMinimizeIcon() {
                return \`<img src='\${this.config.baseUrl}/logo/arrow-down-s-line.svg' style="height: 35px; width: 35px"/>\`;
            }

            createChatWindow() {
                const container = document.createElement("div");
                container.id = "chatbot-bubble-container";
                container.className = "chatbot-bubble-container";

                const closeButton = document.createElement("button");
                closeButton.className = "chatbot-close-button";
                closeButton.innerHTML = \`
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L1 9M1 1L9 9" stroke="#475467" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                \`;

                const iframe = document.createElement("iframe");
                iframe.className = "chatbot-iframe";
                iframe.allow = "fullscreen;microphone";
                iframe.title = "Chatbot window";
                iframe.id = "chatbot-bubble-window";
                iframe.src = \`\${this.config.baseUrl}/chatbot/\${this.config.token}\`;

                container.appendChild(closeButton);
                container.appendChild(iframe);
                document.body.appendChild(container);

                this.elements.container = container;
                this.elements.closeButton = closeButton;
                this.elements.iframe = iframe;

                this.setupCloseButton();
                this.setupResponsiveness();
            }

            setupEventListeners() {
                this.elements.button.addEventListener("click", () => this.toggleChatWindow());

                window.addEventListener("message", this.handleMessage.bind(this));
                window.addEventListener("unload", () => {
                    window.removeEventListener("message", this.handleMessage.bind(this));
                });
            }

            setupCloseButton() {
                this.elements.closeButton.addEventListener("click", () => {
                    this.hideChatWindow();
                });
            }

            setupResponsiveness() {
                const handleResize = () => {
                    const isMobile = window.matchMedia("(max-width: 768px)").matches;
                    if (isMobile) {
                        this.elements.closeButton.style.display = "block";
                    } else {
                        this.elements.closeButton.style.display = "none";
                    }
                };

                handleResize();
                window.addEventListener("resize", handleResize);
            }

            toggleChatWindow() {
                if (!this.elements.container) {
                    this.createChatWindow();
                    this.showChatWindow();
                    return;
                }

                const isVisible = this.elements.container.style.visibility === "visible";
                if (isVisible) {
                    this.hideChatWindow();
                } else {
                    this.showChatWindow();
                }
            }

            showChatWindow() {
                this.elements.container.style.visibility = "visible";
                setTimeout(() => {
                    this.elements.container.style.transform = "scale(1)";
                    this.elements.container.style.opacity = "1";
                }, 10);
                this.elements.buttonInner.innerHTML = this.getMinimizeIcon();
            }

            hideChatWindow() {
                this.elements.container.style.transform = "scale(0)";
                this.elements.container.style.opacity = "0";
                setTimeout(() => {
                    this.elements.container.style.visibility = "hidden";
                    this.elements.buttonInner.innerHTML = this.getChatIcon();
                }, 500);
            }

            handleMessage(event) {
                if (event.data?.action === "closeChatWindow") {
                    this.hideChatWindow();
                }
            }
        }

        // Initialize chatbot when the page loads
        window.onload = function() {
            window.chatbot = new Chatbot({
                token: "tgupbU3GseH1Zjj4",
                baseUrl: "https://obliging-welcome-lamb.ngrok-free.app",
                iconColor: "#0370B6"
            });
        };
    </script>
</body>
</html>
`;
