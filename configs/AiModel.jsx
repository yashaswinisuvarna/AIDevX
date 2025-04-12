const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const fs = require("node:fs");
  const mime = require("mime-types");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in .env");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-preview-03-25",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "how do i get code option\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Here's a thinking process to arrive at the comprehensive answer about \"getting the code option\":\n\n1.  **Understand the User's Need:** The user is asking \"how do i get code option\". This is quite vague. What \"code option\" are they referring to? Where are they trying to get it? What is their goal? Since I don't have context, I need to cover the most likely scenarios.\n\n2.  **Identify Potential Meanings of \"Code Option\":**\n    *   **Formatting code in text:** Maybe they want to know how to make text *look* like code (e.g., in a chat, email, document, forum post). This involves using specific formatting tools like backticks or code blocks.\n    *   **Getting access to source code:** Maybe they want the underlying code *of* something (a website, an app, a program). This is often about viewing source, inspecting elements, or accessing open-source repositories.\n    *   **Enabling code-related features in software:** Perhaps they're using a specific application (like a text editor, IDE, or even a platform like WordPress) and a \"code option\" (like syntax highlighting, code completion, or a code editor view) isn't visible or enabled.\n    *   **Obtaining a software license/activation code:** Less likely given the phrasing, but \"code\" could refer to a product key or activation code.\n    *   **Learning to code/getting into programming:** A very broad interpretation – maybe they want to know how to *start* coding.\n    *   **Using code *with* me (the AI):** Maybe they want to know how to give *me* code snippets or ask me to *write* code.\n\n3.  **Structure the Answer:** Start with the most common interpretation and then branch out to others. A good structure would be:\n    *   Acknowledge the ambiguity and ask for clarification.\n    *   Provide answers for the most likely scenarios.\n    *   Offer guidance on how to ask a more specific question if the initial answers aren't right.\n\n4.  **Draft Answers for Each Scenario:**\n\n    *   **Formatting Code (Most Likely in Chat/Forums):**\n        *   Explain inline code using single backticks (`code`). Give an example.\n        *   Explain code blocks using triple backticks (```code block```). Give an example. Mention specifying the language (```python ... ```).\n        *   Mention that the specific method varies by platform (Markdown, specific WYSIWYG editors, etc.).\n\n    *   **Viewing Source Code (Websites):**\n        *   Explain \"View Page Source\" (usually right-click). Describe what it shows (HTML, CSS, JS).\n        *   Explain \"Inspect Element\" or \"Developer Tools\" (right-click or F12). Describe its purpose (debugging, seeing live DOM, CSS).\n\n    *   **Viewing Source Code (Software/Apps):**\n        *   Explain the difference between open-source and closed-source.\n        *   Mention repositories like GitHub, GitLab for open-source.\n        *   State that closed-source code is generally not accessible.\n\n    *   **Enabling Code Features in Software:**\n        *   Mention IDEs (like VS Code, PyCharm) and text editors (Sublime Text, Notepad++).\n        *   Suggest looking in settings, preferences, view menus, or extension/plugin marketplaces.\n        *   Use examples: \"Enable syntax highlighting,\" \"Switch to code view,\" \"Install a language server.\"\n\n    *   **Getting Code *from* Me (the AI):**\n        *   Explain that they can just *ask* me to write code.\n        *   Suggest providing clear requirements (language, purpose, inputs, outputs).\n        *   Explain how *they* can give *me* code using the formatting options mentioned earlier (backticks).\n\n    *   **Less Likely Scenarios (Briefly):**\n        *   *License/Activation Code:* Mention needing to purchase software or check email/account for keys.\n        *   *Learning to Code:* Suggest online courses, tutorials, documentation. (Keep this very brief unless they clarify).\n\n5.  **Refine and Organize:**\n    *   Start with a clear \"It depends on what you mean...\" statement.\n    *   Use headings or bullet points for clarity.\n    *   Use bold text for key terms (like `backticks`, **View Page Source**, **Developer Tools**, **IDE**).\n    *   Add a concluding sentence encouraging the user to provide more details.\n    *   Review for clarity, conciseness, and accuracy. Ensure the tone is helpful. Make sure the examples are simple and illustrative.\n\n6.  **Self-Correction/Improvements:**\n    *   Is the language simple enough? Avoid overly technical jargon where possible.\n    *   Are the most common scenarios covered first? Yes, formatting code seems most likely in a chat context.\n    *   Is the call to action (asking for more details) clear? Yes.\n    *   Could the user be asking about a *specific* platform (like Discord, Slack, Reddit)? Acknowledge that the exact method varies.\n    *   Maybe add a specific point about using code *with the AI* since that's the current context. Yes, added that."},
            {text: "That phrase \"get code option\" is a bit ambiguous! To give you the right answer, I need a little more context. What are you trying to do or where are you trying to see this \"code option\"?\n\nHere are a few common possibilities and how to achieve them:\n\n1.  **Formatting Text as Code (in chat, forums, documents):**\n    *   **Inline Code:** To make a small piece of text look like `code`, surround it with single backticks (`). For example, typing `` `variable_name` `` will often display as `variable_name`.\n    *   **Code Blocks:** To format a larger block of code, often with syntax highlighting, use triple backticks (```) before and after the code block. You can often specify the language after the opening backticks.\n        ```python\n        def hello(name):\n          print(f\"Hello, {name}!\")\n\n        hello(\"World\")\n        ```\n    *   *Where:* This works in many places like Discord, Slack, GitHub, Reddit, Stack Overflow, and many text editors that support Markdown.\n\n2.  **Viewing the Source Code of a Webpage:**\n    *   **View Page Source:** Right-click on a webpage and select \"View Page Source\" or similar. This shows you the raw HTML code sent from the server.\n    *   **Inspect Element / Developer Tools:** Right-click on a specific element on a webpage and select \"Inspect\" or \"Inspect Element\". Alternatively, press F12. This opens the browser's developer tools, allowing you to see the HTML, CSS, and JavaScript currently running, and even modify it temporarily in your browser.\n\n3.  **Getting the Source Code of Software/Apps:**\n    *   **Open Source:** If the software is open-source, its code is usually publicly available on platforms like GitHub, GitLab, or the project's own website. You can browse or download it from there.\n    *   **Closed Source:** If the software is proprietary (closed-source), you generally cannot get the source code unless the developers release it.\n\n4.  **Enabling a Code Editor or Code View in a Program:**\n    *   **Integrated Development Environments (IDEs) / Text Editors:** Software like VS Code, Sublime Text, PyCharm, Atom, etc., are *designed* for code. You just open or create a file with a code extension (like `.py`, `.js`, `.html`).\n    *   **Content Management Systems (CMS) like WordPress:** Often have a \"Text\", \"HTML\", or \"Code Editor\" view option when editing pages or posts, alongside the \"Visual\" editor. Look for tabs or buttons to switch modes.\n    *   **Other Software:** Some applications might have specific settings or modes to enable code-related features. Check the \"View\" menu, \"Settings/Preferences\", or look for specific buttons related to code.\n\n5.  **Asking Me (the AI) to Generate Code:**\n    *   Just ask! Tell me what programming language you want and describe what the code should do. For example: \"Write a Python function that takes two numbers and returns their sum.\"\n\n**To help me give you a better answer, please tell me:**\n\n*   **Where** are you trying to get this \"code option\"? (e.g., In this chat? On a website? In a specific program like Word or WordPress?)\n*   **What** are you trying to achieve? (e.g., Make text look like code? See how a website is built? Write actual program code?)"},
          ],
        },
      ],
    });
  
   /* const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // TODO: Following code needs to be updated for client-side apps.
    const candidates = result.response.candidates;
    for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        const part = candidates[candidate_index].content.parts[part_index];
        if(part.inlineData) {
          try {
            const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
            fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
            console.log(`Output written to: ${filename}`);
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
    console.log(result.response.text());*/
 