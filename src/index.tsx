import { Hono } from "hono";
import { streamText } from "hono/streaming";
import { renderer } from "./renderer";
import { EventSourceParserStream } from "eventsource-parser/stream";
import { Ai } from "@cloudflare/workers-types";

type Bindings = {
  AI: Ai;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

app.get("/", (c) => {
  const DEFAULT_MODEL = "@cf/meta/llama-2-7b-chat-fp16"; // Default model
  const DEFAULT_SYSTEM_MESSAGE = `You are going to act as  VaultManager,
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

Note: Donations are accepted to help us improve our services.`; // Updated system prompt

  const handleChatSettings = () => {
    const modelSelect = document.getElementById("model-select") as HTMLSelectElement;
    const systemMessage = document.getElementById("system-message") as HTMLTextAreaElement;

    // Logic to apply chat settings
    const chatSettings = {
      model: modelSelect.value,
      systemMessage: systemMessage.value,
    };

    // Here you can add any additional logic to handle the chat settings
    console.log("Chat settings applied:", chatSettings);
  };

  return c.render(
    <>
      <div className="flex flex-col h-screen bg-gray-200" id="chat-container">
        <div className="flex-grow flex flex-col">
          <div
            id="chat-history"
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-white flex flex-col-reverse messages-container"
          ></div>
          <div className="px-4 py-2 bg-white shadow-up">
            <form className="flex items-center" id="chat-form">
              <textarea
                id="message-input"
                className="flex-grow m-2 p-2 border border-chat-border rounded shadow-sm placeholder-chat-placeholder"
                placeholder="Type a message..."
              ></textarea>
              <button
                type="submit"
                className="m-2 px-4 py-2 bg-chat-button text-black rounded hover:bg-gray-300"
              >
                Send
              </button>
              <button
                type="button"
                id="apply-chat-settings"
                className="m-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  handleChatSettings(); // Call the function to apply changes
                }}
              >
                Reset
              </button>
            </form>
            {/* <div className="text-xs text-gray-500 mt-2">
              <p className="model-display">-</p>
              <input
                type="hidden"
                className="message-user message-assistant message-model"
              />
            </div>*/}
          </div>
        </div>
        <div className="w-full md:w-80 mx-auto bg-chat-settings p-4 shadow-xl flex flex-col justify-between chat-settings" style={{ display: 'none' }}>
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Chat Settings</h2>
              <p className="text-sm text-chat-helpertext mt-1">
                Try out different models and configurations for your chat application
              </p>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2">
                  Model
                </label>
                <select
                  id="model-select"
                  className="border border-chat-border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value={DEFAULT_MODEL}>{DEFAULT_MODEL}</option>
                  {/* Add other model options here */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2">
                  System Message
                </label>
                <p className="text-sm text-chat-helpertext mb-2">
                  Guides the tone of the response
                </p>
                <textarea
                  id="system-message"
                  className="border border-chat-border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter system message..."
                  defaultValue={DEFAULT_SYSTEM_MESSAGE}
                ></textarea>
              </div>
              <button
                id="apply-chat-settings"
                className="w-full px-4 py-2 bg-chat-apply text-white rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  handleChatSettings(); // Call the function to apply changes
                }}
              >
                Apply Changes
              </button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center">
            <span className="mr-2 pt-2">Powered by</span>
            <a href="https://megavault.in/" target="_blank">
              <img
                src="/static/logo.png"
                alt="Megavault Logo"
                style={{ height: '20px', width: '20px' }} // Set height and width directly
                className="inline"
              />
            </a>
          </div>
        </div>
      </div>
      <script src="/static/script.js"></script>
    </>
  );
});

app.post("/api/chat", async (c) => {
  const payload = await c.req.json();
  const messages = [...payload.messages];
  // Prepend the systemMessage
  if (payload?.config?.systemMessage) {
    messages.unshift({ role: "system", content: payload.config.systemMessage });
  }
  let eventSourceStream;
  let retryCount = 0;
  let successfulInference = false;
  let lastError;
  const MAX_RETRIES = 3;
  while (successfulInference === false && retryCount < MAX_RETRIES) {
    try {
      eventSourceStream = (await c.env.AI.run(payload.config.model, {
        messages,
        stream: true,
      })) as ReadableStream;
      successfulInference = true;
    } catch (err) {
      lastError = err;
      retryCount++;
      console.error(err);
      console.log(`Retrying #${retryCount}...`);
    }
  }
  if (eventSourceStream === undefined) {
    if (lastError) {
      throw lastError;
    }
    throw new Error(`Problem with model`);
  }
  const tokenStream = eventSourceStream
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new EventSourceParserStream());

  return streamText(c, async (stream) => {
    for await (const msg of tokenStream) {
      if (msg.data !== "[DONE]") {
        const data = JSON.parse(msg.data);
        stream.write(data.response);
      }
    }
  });
});

export default app;