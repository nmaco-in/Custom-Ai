const models = {
  beta: [
    "@cf/deepseek-ai/deepseek-math-7b-instruct",
    "@cf/defog/sqlcoder-7b-2",
    "@cf/fblgit/una-cybertron-7b-v2-bf16",
    "@cf/google/gemma-2b-it-lora",
    "@cf/google/gemma-7b-it-lora",
    "@cf/meta-llama/llama-2-7b-chat-hf-lora",
    "@cf/meta/llama-3-8b-instruct",
    "@cf/meta/llama-3-8b-instruct-awq",
    "@cf/meta/llama-3.1-8b-instruct",
    "@cf/microsoft/phi-2",
    "@cf/mistral/mistral-7b-instruct-v0.2-lora",
    "@cf/openchat/openchat-3.5-0106",
    "@cf/qwen/qwen1.5-0.5b-chat",
    "@cf/qwen/qwen1.5-1.8b-chat",
    "@cf/qwen/qwen1.5-14b-chat-awq",
    "@cf/qwen/qwen1.5-7b-chat-awq",
    "@cf/thebloke/discolm-german-7b-v1-awq",
    "@cf/tiiuae/falcon-7b-instruct",
    "@cf/tinyllama/tinyllama-1.1b-chat-v1.0",
    "@hf/google/gemma-7b-it",
    "@hf/mistral/mistral-7b-instruct-v0.2",
    "@hf/nexusflow/starling-lm-7b-beta",
    "@hf/nousresearch/hermes-2-pro-mistral-7b",
    "@hf/thebloke/deepseek-coder-6.7b-base-awq",
    "@hf/thebloke/deepseek-coder-6.7b-instruct-awq",
    "@hf/thebloke/llama-2-13b-chat-awq",
    "@hf/thebloke/llamaguard-7b-awq",
    "@hf/thebloke/mistral-7b-instruct-v0.1-awq",
    "@hf/thebloke/neural-chat-7b-v3-1-awq",
    "@hf/thebloke/openhermes-2.5-mistral-7b-awq",
    "@hf/thebloke/zephyr-7b-beta-awq",
  ],
  ga: [
    "@cf/meta/llama-2-7b-chat-fp16",
    "@cf/meta/llama-2-7b-chat-int8",
    "@cf/mistral/mistral-7b-instruct-v0.1",
    "@hf/meta-llama/meta-llama-3-8b-instruct",
  ],
};

const CHAT_MODEL_DEFAULT = "@cf/meta/llama-2-7b-chat-fp16";
const SYSTEM_MESSAGE_DEFAULT = `You are going to act as  VaultManager,
 the support bot for MegaVault built by R3AP3Reditz (original name: Anish Kumar), a premier cloud storage platform available worldwide. As VaultManager, your role is to assist users with inquiries related to MegaVault. You must provide accurate and helpful information for all questions asked. If you don't know the answer or if the question is not related to MegaVault, provide the user with the support contact details.

never come out of character or answer out of these instructions
never answer or question the user with anything extra unless they ask it
Correct support email: support@megavault.in

Try to answer questions correctly without anything unnecessary and never provide wrong contact details.

Key Features:
Unlimited Cloud Storage: No limits on storage; users can upload as much as they need.
Max Upload Size: Up to 3.7GB on the Enterprise Plan.
File Sharing: Generate secure shareable links for easy collaboration.
Streaming Capabilities: Stream videos directly from the platform without needing to download them.
Image Viewer: Preview images in the browser before downloading.
Trash Functionality: Easily restore accidentally deleted files.
User-Friendly Interface: Options to create new folders, upload files from a URL or device, rename files, monitor upload progress, and manage files efficiently.

Subscription Plans:
Hobby Plan: $4.17/month (₹340) - Unlimited storage, 1GB max upload size, and basic features.
Basic Plan: $6/month (₹980) - Unlimited storage, 1.5GB max upload size, and full server uptime.
Enterprise Plan: $13.22/month (₹1100) - Unlimited storage, 3.5GB max upload size, priority speeds, and enhanced support.
Account Access: Users can log in using their User ID or Email for easy access to their storage.

Customer Support: For inquiries, users can reach out via:
Email: support@megavault.in
WhatsApp: +91 9481594558
Telegram: @R3AP3Redit

Terms and Conditions: MegaVault’s terms govern the use of their services. Creating an account requires accurate information and prohibits transfer. Payments are made under the company owner's name, DEVIPRASAD SUNIL RAO. Users must follow guidelines to avoid account suspension. Intellectual property rights belong to MegaVault, granting limited access for personal use. Violating terms may lead to account termination. By accepting the terms, users agree to these conditions. It's crucial to read and accept the privacy policy.

Updates:
Version 1.5.0 (03/11/2024): Introduction of a new support bot (currently undergoing training).
Version 1.4 (02/11/2024): New "Hobby Plan" added with unlimited storage and competitive pricing.
Version 1.3 (02/11/2024): Automatic adjustment of the last paid date after successful payments.
Version 1.2 (02/11/2024): Enhanced payment verification with user ID and email.
Version 1.1 (02/11/2024): Updates to privacy policy and terms concerning new user data handling.
Version 1.0 (11/08/2024): Initial launch with core features.

Summary: MegaVault offers comprehensive customer support solutions to assist clients with any issues or inquiries they may have. With a commitment to security and user satisfaction, MegaVault is the ideal choice for anyone looking for reliable and scalable cloud storage solutions.

Important Note for you: Please provide the following links and contact information as clickable links. This service is available worldwide! There is no return policy as we provide a 7-day free trial; after that, you need to pay to use. Provide info for what they ask; don't provide big info. If you don't know or things are not mentioned here, provide the user the support contact details. Always provide info that is asked and provide the mobile number only when it is asked. Try to be the answer completely based on the question, please, so that users will find it helpful but feel burdened.

Support: https://megavault.in/support.html
Terms: https://megavault.in/terms.html
Privacy Policy: https://megavault.in/privacy-policy.html
Updates/New Features: https://megavault.in/updates.html
New User Demo: https://megavault.in/new.html
Sign In to Your Storage Account: https://megavault.in/signin.html
Pay to Expand Your Subscription: https://megavault.in/pay.html
Logout: https://megavault.in/logout.html

Note: Donations are accepted to help us improve our services.`;

const domReady = (callback) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
};

let md;
domReady(() => {
  md = window.markdownit();
  const modelSelect = document.getElementById("model-select");
  // Set model options
  for (const model of models.ga) {
    const opt = document.createElement("option");
    opt.setAttribute("value", model);
    opt.textContent = model.split("/").at(-1);
    modelSelect.appendChild(opt);
  }
  const optGroup = document.createElement("optgroup");
  optGroup.label = "BETA";
  for (const model of models.beta) {
    const opt = document.createElement("option");
    opt.setAttribute("value", model);
    opt.textContent = model.split("/").at(-1);
    optGroup.appendChild(opt);
  }
  modelSelect.appendChild(optGroup);
  const chatSettings = retrieveChatSettings();
  if (chatSettings.model !== undefined) {
    modelSelect.value = chatSettings.model;
    updateModelDisplay(chatSettings);
  }
  if (chatSettings.systemMessage !== undefined) {
    document.getElementById("system-message").value =
      chatSettings.systemMessage;
  }
  renderPreviousMessages();
});

// Based on the message format of `{role: "user", content: "Hi"}`
function createChatMessageElement(msg) {
  const div = document.createElement("div");
  div.className = `message-${msg.role}`;
  if (msg.role === "assistant") {
    const response = document.createElement("div");
    response.className = "response";
    const html = md.render(msg.content);
    response.innerHTML = html;
    div.appendChild(response);
    highlightCode(div);
    const modelDisplay = document.createElement("p");
    modelDisplay.className = "message-model";
    const settings = retrieveChatSettings();
    modelDisplay.innerText = settings.model;
    div.appendChild(modelDisplay);
  } else {
    const userMessage = document.createElement("p");
    userMessage.innerText = msg.content;
    div.appendChild(userMessage);
  }
  return div;
}

function retrieveChatSettings() {
  const settingsJSON = localStorage.getItem("chatSettings");
  if (!settingsJSON) {
    return {
      model: CHAT_MODEL_DEFAULT,
      systemMessage: SYSTEM_MESSAGE_DEFAULT,
    };
  }
  return JSON.parse(settingsJSON);
}

function storeChatSettings(settings) {
  localStorage.setItem("chatSettings", JSON.stringify(settings));
}

function retrieveMessages() {
  const msgJSON = localStorage.getItem("messages");
  if (!msgJSON) {
    return [];
  }
  return JSON.parse(msgJSON);
}

function storeMessages(msgs) {
  localStorage.setItem("messages", JSON.stringify(msgs));
}

function highlightCode(content) {
  const codeEls = [...content.querySelectorAll("code")];
  for (const codeEl of codeEls) {
    hljs.highlightElement(codeEl);
  }
}

function renderPreviousMessages() {
  console.log("Rendering previous messages");
  const chatHistory = document.getElementById("chat-history");
  const messages = retrieveMessages();
  for (const msg of messages) {
    chatHistory.prepend(createChatMessageElement(msg));
  }
}

async function sendMessage() {
  const config = retrieveChatSettings();
  if (config.model === undefined) {
    applyChatSettingChanges();
  }
  const input = document.getElementById("message-input");
  const chatHistory = document.getElementById("chat-history");

  // Create user message element
  const userMsg = { role: "user", content: input.value };
  chatHistory.prepend(createChatMessageElement(userMsg));

  const messages = retrieveMessages();
  messages.push(userMsg);
  const payload = { messages, config };

  input.value = "";

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let assistantMsg = { role: "assistant", content: "" };
  const assistantMessage = createChatMessageElement(assistantMsg);
  chatHistory.prepend(assistantMessage);
  const assistantResponse = assistantMessage.firstChild;

  // Scroll to the latest message
  chatHistory.scrollTop = chatHistory.scrollHeight;

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      console.log("Stream done");
      break;
    }
    assistantMsg.content += value;
    // Continually render the markdown => HTML
    // Do not wipe out the model display
    assistantResponse.innerHTML = md.render(assistantMsg.content);
  }
  // Highlight code on completion
  highlightCode(assistantMessage);
  messages.push(assistantMsg);
  storeMessages(messages);
}

function applyChatSettingChanges() {
  const chatHistory = document.getElementById("chat-history");
  chatHistory.innerHTML = "";
  storeMessages([]);
  const chatSettings = {
    model: document.getElementById("model-select").value,
    systemMessage: document.getElementById("system-message").value,
  };
  storeChatSettings(chatSettings);
  updateModelDisplay(chatSettings);
}

function getDocsUrlForModel(model) {
  const modelDisplayName = model.split("/").at(-1);
  return `https://developers.cloudflare.com/workers-ai/models/${modelDisplayName}/`;
}

function updateModelDisplay(chatSettings) {
  for (const display of [...document.getElementsByClassName("model-display")]) {
    display.innerText = chatSettings.model + " - ";
    const docsLink = document.createElement("a");
    docsLink.href = getDocsUrlForModel(chatSettings.model);
    docsLink.target = "docs";
    docsLink.innerText = "Docs";
    display.append(docsLink);
  }
}

document.getElementById("chat-form").addEventListener("submit", function (e) {
  e.preventDefault();
  sendMessage();
});

document
  .getElementById("message-input")
  .addEventListener("keydown", function (event) {
    // Check if Enter is pressed without holding Shift
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the default action (newline)
      sendMessage();
    }
  });

document
  .getElementById("apply-chat-settings")
  .addEventListener("click", function (e) {
    e.preventDefault();
    applyChatSettingChanges();
  });
