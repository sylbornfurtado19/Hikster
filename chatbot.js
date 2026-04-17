(function () {
    if (window.__hkChatbotMounted) return;
    window.__hkChatbotMounted = true;

    const CHAT_API_URL = window.HIKSTER_CHAT_API_URL || "http://localhost:8080/api/chat";
    const HISTORY_KEY = "hiksterChatHistory";
    const SUGGESTED_QUESTIONS = [
        "Suggest me a beginner trek under ₹5000",
        "What should I pack for a snow trek?",
        "Best treks in India for beginners",
        "How do I prepare for high-altitude trekking?"
    ];

    function safeParse(value, fallback) {
        try {
            return value ? JSON.parse(value) : fallback;
        } catch {
            return fallback;
        }
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function ensureStylesheet() {
        if (document.querySelector("link[data-hk-chatbot-style]")) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "chatbot.css";
        link.setAttribute("data-hk-chatbot-style", "true");
        document.head.appendChild(link);
    }

    function loadHistory() {
        const history = safeParse(localStorage.getItem(HISTORY_KEY), []);
        return Array.isArray(history) ? history.slice(-30) : [];
    }

    function saveHistory(items) {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(-30)));
    }

    function resolveFriendlyError(response, payload) {
        const status = Number(response?.status || 0);
        const rawMessage = String(payload?.message || "");
        const lower = rawMessage.toLowerCase();

        if (status === 429 || lower.includes("insufficient_quota") || lower.includes("quota")) {
            return "Travel Assistant is temporarily unavailable because API quota is exhausted. Please try again later.";
        }

        if (status === 401 || lower.includes("invalid_api_key") || lower.includes("api key")) {
            return "Travel Assistant is not configured correctly right now. Please try again in a few minutes.";
        }

        if (status >= 500) {
            return "Travel Assistant is temporarily unavailable. Please try again shortly.";
        }

        return rawMessage || "Chat service is unavailable right now. Please try again.";
    }

    function mount() {
        ensureStylesheet();

        const root = document.createElement("div");
        root.className = "hk-chatbot-root";
        root.innerHTML = `
            <div class="hk-chatbot-panel" id="hk-chat-panel" aria-live="polite">
                <div class="hk-chatbot-header">
                    <div>
                        <div class="hk-chatbot-title">Hikster Travel Assistant</div>
                        <div class="hk-chatbot-subtitle">Trekking tips in seconds</div>
                    </div>
                    <button class="hk-chatbot-close" id="hk-chat-close" aria-label="Close chat">×</button>
                </div>
                <div class="hk-chatbot-suggestions" id="hk-chat-suggestions"></div>
                <div class="hk-chatbot-messages" id="hk-chat-messages"></div>
                <div class="hk-chatbot-input-row">
                    <input class="hk-chatbot-input" id="hk-chat-input" placeholder="Ask about treks, packing, budget..." maxlength="500" />
                    <button class="hk-chatbot-send" id="hk-chat-send">Send</button>
                </div>
            </div>
            <button class="hk-chatbot-toggle" id="hk-chat-toggle" aria-label="Open travel assistant">💬</button>
        `;

        document.body.appendChild(root);

        const panel = document.getElementById("hk-chat-panel");
        const toggleBtn = document.getElementById("hk-chat-toggle");
        const closeBtn = document.getElementById("hk-chat-close");
        const messagesBox = document.getElementById("hk-chat-messages");
        const input = document.getElementById("hk-chat-input");
        const sendBtn = document.getElementById("hk-chat-send");
        const suggestions = document.getElementById("hk-chat-suggestions");

        const history = loadHistory();

        function scrollToLatest() {
            messagesBox.scrollTop = messagesBox.scrollHeight;
        }

        function addMessage(role, text, persist) {
            const bubble = document.createElement("div");
            bubble.className = `hk-chatbot-bubble ${role === "user" ? "hk-chatbot-user" : "hk-chatbot-bot"}`;
            bubble.innerHTML = escapeHtml(text || "");
            messagesBox.appendChild(bubble);

            if (persist) {
                history.push({ role, text: text || "" });
                saveHistory(history);
            }

            scrollToLatest();
            return bubble;
        }

        function setSending(isSending) {
            input.disabled = isSending;
            sendBtn.disabled = isSending;
        }

        function renderHistory() {
            messagesBox.innerHTML = "";
            if (!history.length) {
                addMessage("bot", "Hi! I am your Trek Travel Assistant. Ask me about trek suggestions, packing lists, fitness, and budget planning.", false);
                return;
            }
            history.forEach((item) => addMessage(item.role, item.text, false));
        }

        async function sendMessage(rawMessage) {
            const message = (rawMessage || input.value || "").trim();
            if (!message) return;

            addMessage("user", message, true);
            input.value = "";
            setSending(true);

            const typing = document.createElement("div");
            typing.className = "hk-chatbot-bubble hk-chatbot-bot hk-chatbot-typing";
            typing.textContent = "Typing...";
            messagesBox.appendChild(typing);
            scrollToLatest();

            try {
                const response = await fetch(CHAT_API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message })
                });

                const payload = await response.json().catch(() => ({}));
                typing.remove();

                if (!response.ok) {
                    const errorMessage = resolveFriendlyError(response, payload);
                    addMessage("bot", errorMessage, true);
                    return;
                }

                const reply = (payload?.reply || "").trim();
                addMessage("bot", reply || "I could not generate a reply right now. Please try another question.", true);
            } catch {
                typing.remove();
                addMessage("bot", "I could not reach the server. Please ensure backend is running on port 8080.", true);
            } finally {
                setSending(false);
                input.focus();
            }
        }

        SUGGESTED_QUESTIONS.forEach((question) => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "hk-chatbot-chip";
            chip.textContent = question;
            chip.addEventListener("click", () => sendMessage(question));
            suggestions.appendChild(chip);
        });

        toggleBtn.addEventListener("click", () => {
            panel.classList.toggle("hk-open");
            if (panel.classList.contains("hk-open")) {
                input.focus();
                scrollToLatest();
            }
        });

        closeBtn.addEventListener("click", () => panel.classList.remove("hk-open"));

        sendBtn.addEventListener("click", () => sendMessage());
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
            }
        });

        renderHistory();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mount);
    } else {
        mount();
    }
})();