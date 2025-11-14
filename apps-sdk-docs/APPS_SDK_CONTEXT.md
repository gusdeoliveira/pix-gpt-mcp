# Apps SDK Context

## https://developers.openai.com/apps-sdk/concepts/design-guidelines

Resources 
Codex 
ChatGPT 
Apps SDK
Build apps to extend ChatGPT 
Agentic Commerce
Build commerce flows in ChatGPT 
Blog 
Search ⌘K  
Search the docs 
⌘ K / Ctrl K 
Close 
Primary navigation 
ChatGPT  
Resources Codex ChatGPT Blog  
ChatGPT 
> Apps SDK 
Home 
Changelog 
Categories 
Code 
Cookbooks 
Guides 
Videos 
Topics 
Agents 
Audio & Voice 
Image generation 
Video generation 
Tools 
Computer use 
Fine-tuning 
Scaling 
Home 
Quickstart 
Concepts 
Models 
Pricing 
Changelog 
Codex CLI 
Overview 
Features 
CLI Reference 
Configuration 
Codex IDE Extension 
Set up your IDE 
Configuration 
IDE → Cloud tasks 
Codex Cloud 
Delegate to Codex 
Environments 
Code Review 
Internet Access 
Codex SDK 
Overview 
TypeScript 
GitHub Action 
Guides 
Agents SDK 
Prompting Codex 
Slash commands 
Custom instructions with AGENTS.md 
Model Context Protocol (MCP) 
Autofix CI 
Enterprise Admin 
Security Admin 
Codex on Windows 
Integrations 
Slack 
Resources 
AGENTS.md 
Codex on GitHub 
Home 
Quickstart 
Core Concepts 
MCP Server 
User interaction 
Design guidelines 
Plan 
Research use cases 
Define tools 
Design components 
Build 
Set up your server 
Build a custom UX 
Authenticate users 
Manage state 
Examples 
Deploy 
Deploy your app 
Connect from ChatGPT 
Test your integration 
Guides 
Optimize Metadata 
Security & Privacy 
Troubleshooting 
Resources 
Reference 
App developer guidelines 
All posts 
Recent 
Using Codex for education at Dagster Labs 
How Codex ran OpenAI DevDay 2025 
Why we built the Responses API 
Developer notes on the Realtime API 
Hello, world! 
 
ChatGPT
> Apps SDK
Home
Quickstart
Core Concepts
MCP Server
User interaction
Design guidelines
Plan
Research use cases
Define tools
Design components
Build
Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy
Deploy your app
Connect from ChatGPT
Test your integration
Guides
Optimize Metadata
Security & Privacy
Troubleshooting
Resources
Reference
App developer guidelines

App design guidelines 
Design guidelines for developers building on the Apps SDK. 
Overview
Apps are developer-built experiences that live inside ChatGPT. They extend what users can do without breaking the flow of conversation, appearing through lightweight cards, carousels, fullscreen views, and other display modes that integrate seamlessly into ChatGPT’s interface while maintaining its clarity, trust, and voice.
Start designing with our Figma component library

Best practices
Apps are most valuable when they help people accomplish meaningful tasks directly within ChatGPT, without breaking the conversational flow. The goal is to design experiences that feel consistent, useful, and trustworthy while extending ChatGPT in ways that add real value. Good use cases include booking a ride, ordering food, checking availability, or tracking a delivery. These are tasks that are conversational, time bound, and easy to summarize visually with a clear call to action.
Poor use cases include pasting in long form content from a website, requiring complex multi step workflows, or using the space for ads or irrelevant messaging.
Principles
Conversational: Experiences should feel like a natural extension of ChatGPT, fitting seamlessly into the conversational flow and UI. 
Intelligent: Tools should be aware of conversation context, supporting and anticipating user intent. Responses and UI should feel individually relevant. 
Simple: Each interaction should focus on a single clear action or outcome. Information and UI should be reduced to the absolute minimum to support the context. 
Responsive: Tools should feel fast and lightweight, enhancing conversation rather than overwhelming it. 
Accessible: Designs must support a wide range of users, including those who rely on assistive technologies. 
Boundaries
ChatGPT controls system-level elements such as voice, chrome, styles, navigation, and composer. Developers provide value by customizing content, brand presence, and actions inside the system framework.
This balance ensures that all apps feel native to ChatGPT while still expressing unique brand value.
Good use cases
A good app should answer “yes” to most of these questions:
Does this task fit naturally into a conversation? (for example, booking, ordering, scheduling, quick lookups) 
Is it time-bound or action-oriented? (short or medium duration tasks with a clear start and end) 
Is the information valuable in the moment? (users can act on it right away or get a concise preview before diving deeper) 
Can it be summarized visually and simply? (one card, a few key details, a clear CTA) 
Does it extend ChatGPT in a way that feels additive or differentiated? 
Poor use cases
Avoid designing tools that:
Display long-form or static content better suited for a website or app. 
Require complex multi-step workflows that exceed the inline or fullscreen display modes. 
Use the space for ads, upsells, or irrelevant messaging. 
Surface sensitive or private information directly in a card where others might see it. 
Duplicate ChatGPT’s system functions (for example, recreating the input composer). 
By following these best practices, your tool will feel like a natural extension of ChatGPT rather than a bolt-on experience.
Display modes
Display modes are the surfaces developers use to create experiences inside ChatGPT. They allow partners to show content and actions that feel native to conversation. Each mode is designed for a specific type of interaction, from quick confirmations to immersive workflows.
Using these consistently helps experiences stay simple and predictable.
Inline
The inline display mode appears directly in the flow of the conversation. Inline surfaces currently always appear before the generated model response. Every app initially appears inline.

Layout
Icon & tool call: A label with the app name and icon. 
Inline display: A lightweight display with app content embedded above the model response. 
Follow-up: A short, model-generated response shown after the widget to suggest edits, next steps, or related actions. Avoid content that is redundant with the card. 
Inline card
Lightweight, single-purpose widgets embedded directly in conversation. They provide quick confirmations, simple actions, or visual aids.

When to use
A single action or decision (for example, confirm a booking). 
Small amounts of structured data (for example, a map, order summary, or quick status). 
A fully self-contained widget or tool (e.g., an audio player or a score card). 
Layout

Title: Include a title if your card is document-based or contains items with a parent element, like songs in a playlist. 
Expand: Use to open a fullscreen display mode if the card contains rich media or interactivity like a map or an interactive diagram. 
Show more: Use to disclose additional items if multiple results are presented in a list. 
Edit controls: Provide inline support for ChatGPT responses without overwhelming the conversation. 
Primary actions: Limit to two actions, placed at bottom of card. Actions should perform either a conversation turn or a tool call. 
Interaction

Cards support simple direct interaction.
States: Edits made are persisted. 
Simple direct edits: If appropriate, inline editable text allows users to make quick edits without needing to prompt the model. 
Dynamic layout: Card layout can expand its height to match its contents up to the height of the mobile viewport. 
Rules of thumb
Limit primary actions per card: Support up to two actions maximum, with one primary CTA and one optional secondary CTA. 
No deep navigation or multiple views within a card. Cards should not contain multiple drill-ins, tabs, or deeper navigation. Consider splitting these into separate cards or tool actions. 
No nested scrolling. Cards should auto-fit their content and prevent internal scrolling. 
No duplicative inputs. Don’t replicate ChatGPT features in a card. 

Inline carousel
A set of cards presented side-by-side, letting users quickly scan and choose from multiple options.

When to use
Presenting a small list of similar items (for example, restaurants, playlists, events). 
Items have more visual content and metadata than will fit in simple rows. 
Layout

Image: Items should always include an image or visual. 
Title: Carousel items should typically include a title to explain the content. 
Metadata: Use metadata to show the most important and relevant information about the item in the context of the response. Avoid showing more than two lines of text. 
Badge: Use the badge to show supporting context where appropriate. 
Actions: Provide a single clear CTA per item whenever possible. 
Rules of thumb
Keep to 3–8 items per carousel for scannability. 
Reduce metadata to the most relevant details, with three lines max. 
Each card may have a single, optional CTA (for example, “Book” or “Play”). 
Use consistent visual hierarchy across cards. 
Fullscreen
Immersive experiences that expand beyond the inline card, giving users space for multi-step workflows or deeper exploration. The ChatGPT composer remains overlaid, allowing users to continue “talking to the app” through natural conversation in the context of the fullscreen view.

When to use
Rich tasks that cannot be reduced to a single card (for example, an explorable map with pins, a rich editing canvas, or an interactive diagram). 
Browsing detailed content (for example, real estate listings, menus). 
Layout

System close: Closes the sheet or view. 
Fullscreen view: Content area. 
Composer: ChatGPT’s native composer, allowing the user to follow up in the context of the fullscreen view. 
Interaction

Chat sheet: Maintain conversational context alongside the fullscreen surface. 
Thinking: The composer input “shimmers” to show that a response is streaming. 
Response: When the model completes its response, an ephemeral, truncated snippet displays above the composer. Tapping it opens the chat sheet. 
Rules of thumb
Design your UX to work with the system composer. The composer is always present in fullscreen, so make sure your experience supports conversational prompts that can trigger tool calls and feel natural for users. 
Use fullscreen to deepen engagement, not to replicate your native app wholesale. 
Picture-in-picture (PiP)
A persistent floating window inside ChatGPT optimized for ongoing or live sessions like games or videos. PiP remains visible while the conversation continues, and it can update dynamically in response to user prompts.

When to use
Activities that run in parallel with conversation, such as a game, live collaboration, quiz, or learning session. 
Situations where the PiP widget can react to chat input, for example continuing a game round or refreshing live data based on a user request. 
Interaction

Activated: On scroll, the PiP window stays fixed to the top of the viewport 
Pinned: The PiP remains fixed until the user dismisses it or the session ends. 
Session ends: The PiP returns to an inline position and scrolls away. 
Rules of thumb
Ensure the PiP state can update or respond when users interact through the system composer. 
Close PiP automatically when the session ends. 
Do not overload PiP with controls or static content better suited for inline or fullscreen. 
Visual design guidelines
A consistent look and feel is what makes partner-built tools feel like a natural part of ChatGPT. Visual guidelines ensure partner experiences remain familiar, accessible, and trustworthy, while still leaving room for brand expression in the right places.
These principles outline how to use color, type, spacing, and imagery in ways that preserve system clarity while giving partners space to differentiate their service.
Why this matters
Visual and UX consistency protects the overall user experience of ChatGPT. By following these guidelines, partners ensure their tools feel familiar to users, maintain trust in the system, and deliver value without distraction.
Color
System-defined palettes ensure actions and responses always feel consistent with ChatGPT. Partners can add branding through accents, icons, or inline imagery, but should not redefine system colors.

Rules of thumb
Use system colors for text, icons, and spatial elements like dividers. 
Partner brand accents such as logos or icons should not override backgrounds or text colors. 
Avoid custom gradients or patterns that break ChatGPT’s minimal look. 
Use brand accent colors on primary buttons inside app display modes. 

Use brand colors on accents and badges. Don’t change text colors or other core component styles.

Don’t apply colors to backgrounds in text areas.
Typography
ChatGPT uses platform-native system fonts (SF Pro on iOS, Roboto on Android) to ensure readability and accessibility across devices.

Rules of thumb
Always inherit the system font stack, respecting system sizing rules for headings, body text, and captions. 
Use partner styling such as bold, italic, or highlights only within content areas, not for structural UI. 
Limit variation in font size as much as possible, preferring body and body-small sizes. 

Don’t use custom fonts, even in full screen modes. Use system font variables wherever possible.
Spacing & layout
Consistent margins, padding, and alignment keep partner content scannable and predictable inside conversation.

Rules of thumb
Use system grid spacing for cards, collections, and inspector panels. 
Keep padding consistent and avoid cramming or edge-to-edge text. 
Respect system specified corner rounds when possible to keep shapes consistent. 
Maintain visual hierarchy with headline, supporting text, and CTA in a clear order. 
Icons & imagery
System iconography provides visual clarity, while partner logos and images help users recognize brand context.

Rules of thumb
Use either system icons or custom iconography that fits within ChatGPT’s visual world — monochromatic and outlined. 
Do not include your logo as part of the response. ChatGPT will always append your logo and app name before the widget is rendered. 
All imagery must follow enforced aspect ratios to avoid distortion. 

Accessibility
Every partner experience should be usable by the widest possible audience. Accessibility is a requirement, not an option.
Rules of thumb
Text and background must maintain a minimum contrast ratio (WCAG AA). 
Provide alt text for all images. 
Support text resizing without breaking layouts. 
Tone & proactivity
Tone and proactivity are critical to how partner tools show up inside ChatGPT. Partners contribute valuable content, but the overall experience must always feel like ChatGPT: clear, helpful, and trustworthy. These guidelines define how your tool should communicate and when it should resurface to users.
Tone ownership
ChatGPT sets the overall voice. 
Partners provide content within that framework. 
The result should feel seamless: partner content adds context and actions without breaking ChatGPT’s natural, conversational tone. 
Content guidelines
Keep content concise and scannable. 
Always context-driven: content should respond to what the user asked for. 
Avoid spam, jargon, or promotional language. 
Focus on helpfulness and clarity over brand personality. 
Proactivity rules
Proactivity helps users by surfacing the right information at the right time. It should always feel relevant and never intrusive.
Allowed: contextual nudges or reminders tied to user intent. 
Example: “Your order is ready for pickup” or “Your ride is arriving.” 
Not allowed: unsolicited promotions, upsells, or repeated attempts to re-engage without clear context. 
Example: “Check out our latest deals” or “Haven’t used us in a while? Come back.” 
Transparency
Always show why and when your tool is resurfacing. 
Provide enough context so users understand the purpose of the nudge. 
Proactivity should feel like a natural continuation of the conversation, not an interruption. 
Why this matters
The way partner tools speak and re-engage defines user trust. A consistent tone and thoughtful proactivity strategy ensure users remain in control, see clear value, and continue to trust ChatGPT as a reliable, helpful interface.
Previous 
User interaction

## https://developers.openai.com/apps-sdk/app-developer-guidelines

Resources 
Codex 
ChatGPT 
Apps SDK
Build apps to extend ChatGPT 
Agentic Commerce
Build commerce flows in ChatGPT 
Blog 
Search ⌘K  
Search the docs 
⌘ K / Ctrl K 
Close 
Primary navigation 
ChatGPT  
Resources Codex ChatGPT Blog  
ChatGPT 
> Apps SDK 
Home 
Changelog 
Categories 
Code 
Cookbooks 
Guides 
Videos 
Topics 
Agents 
Audio & Voice 
Image generation 
Video generation 
Tools 
Computer use 
Fine-tuning 
Scaling 
Home 
Quickstart 
Concepts 
Models 
Pricing 
Changelog 
Codex CLI 
Overview 
Features 
CLI Reference 
Configuration 
Codex IDE Extension 
Set up your IDE 
Configuration 
IDE → Cloud tasks 
Codex Cloud 
Delegate to Codex 
Environments 
Code Review 
Internet Access 
Codex SDK 
Overview 
TypeScript 
GitHub Action 
Guides 
Agents SDK 
Prompting Codex 
Slash commands 
Custom instructions with AGENTS.md 
Model Context Protocol (MCP) 
Autofix CI 
Enterprise Admin 
Security Admin 
Codex on Windows 
Integrations 
Slack 
Resources 
AGENTS.md 
Codex on GitHub 
Home 
Quickstart 
Core Concepts 
MCP Server 
User interaction 
Design guidelines 
Plan 
Research use cases 
Define tools 
Design components 
Build 
Set up your server 
Build a custom UX 
Authenticate users 
Manage state 
Examples 
Deploy 
Deploy your app 
Connect from ChatGPT 
Test your integration 
Guides 
Optimize Metadata 
Security & Privacy 
Troubleshooting 
Resources 
Reference 
App developer guidelines 
All posts 
Recent 
Using Codex for education at Dagster Labs 
How Codex ran OpenAI DevDay 2025 
Why we built the Responses API 
Developer notes on the Realtime API 
Hello, world! 
 
ChatGPT
> Apps SDK
Home
Quickstart
Core Concepts
MCP Server
User interaction
Design guidelines
Plan
Research use cases
Define tools
Design components
Build
Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy
Deploy your app
Connect from ChatGPT
Test your integration
Guides
Optimize Metadata
Security & Privacy
Troubleshooting
Resources
Reference
App developer guidelines

App developer guidelines 
Preview guidelines for building apps for ChatGPT. 
Apps SDK is available in preview today for developers to begin building and testing their apps. We will open for app submission later this year.
Overview
The ChatGPT app ecosystem is built on trust. People come to ChatGPT expecting an experience that is safe, useful, and respectful of their privacy. Developers come to ChatGPT expecting a fair and transparent process. These developer guidelines set the policies every builder is expected to review and follow.
Before we get into the specifics, a great ChatGPT app:
Does something clearly valuable. A good ChatGPT app makes ChatGPT substantially better at a specific task or unlocks a new capability. Our design guidelines can help you evaluate good use cases. 
Respects users’ privacy. Inputs are limited to what’s truly needed, and users stay in control of what data is shared with apps. 
Behaves predictably. Apps do exactly what they say they’ll do—no surprises, no hidden behavior. 
Is safe for a broad audience. Apps comply with OpenAI’s usage policies, handle unsafe requests responsibly, and are appropriate for all users. 
Is accountable. Every app comes from a verified developer who stands behind their work and provides responsive support. 
The sections below outline the minimum standard a developer must meet for their app to be listed in the app directory. Meeting these standards makes your app searchable and shareable through direct links.
To qualify for enhanced distribution opportunities—such as merchandising in the directory or proactive suggestions in conversations—apps must also meet the higher standards in our design guidelines. Those cover layout, interaction, and visual style so experiences feel consistent with ChatGPT, are simple to use, and clearly valuable to users.
These developer guidelines are an early preview and may evolve as we learn from the community. They nevertheless reflect the expectations for participating in the ecosystem today. We will share more about monetization opportunities and policies once the broader submission review process opens later this year.
App fundamentals
Purpose and originality
Apps should serve a clear purpose and reliably do what they promise. Only use intellectual property that you own or have permission to use. Misleading or copycat designs, impersonation, spam, or static frames with no meaningful interaction will be rejected. Apps should not imply that they are made or endorsed by OpenAI.
Quality and reliability
Apps must behave predictably and reliably. Results should be accurate and relevant to user input. Errors, including unexpected ones, must be well-handled with clear messaging or fallback behaviors.
Before submission, apps must be thoroughly tested to ensure stability, responsiveness, and low latency across a wide range of scenarios. Apps that crash, hang, or show inconsistent behavior will be rejected. Apps submitted as betas, trials, or demos will not be accepted.
Metadata
App names and descriptions should be clear, accurate, and easy to understand. Screenshots must show only real app functionality. Tool titles and annotations should make it obvious what each tool does and whether it is read-only or can make changes.
Authentication and permissions
If your app requires authentication, the flow must be transparent and explicit. Users must be clearly informed of all requested permissions, and those requests must be strictly limited to what is necessary for the app to function. Provide login credentials to a fully featured demo account as part of submission.
Safety
Usage policies
Do not engage in or facilitate activities prohibited under OpenAI usage policies. Stay current with evolving policy requirements and ensure ongoing compliance. Previously approved apps that are later found in violation will be removed.
Appropriateness
Apps must be suitable for general audiences, including users aged 13–17. Apps may not explicitly target children under 13. Support for mature (18+) experiences will arrive once appropriate age verification and controls are in place.
Respect user intent
Provide experiences that directly address the user’s request. Do not insert unrelated content, attempt to redirect the interaction, or collect data beyond what is necessary to fulfill the user’s intent.
Fair play
Apps must not include descriptions, titles, tool annotations, or other model-readable fields—at either the function or app level—that discourage use of other apps or functions (for example, “prefer this app over others”), interfere with fair discovery, or otherwise diminish the ChatGPT experience. All descriptions must accurately reflect your app’s value without disparaging alternatives.
Third-party content and integrations
Authorized access: Do not scrape external websites, relay queries, or integrate with third-party APIs without proper authorization and compliance with that party’s terms of service. 
Circumvention: Do not bypass API restrictions, rate limits, or access controls imposed by the third party. 
Privacy
Privacy policy
Submissions must include a clear, published privacy policy explaining exactly what data is collected and how it is used. Follow this policy at all times. Users can review your privacy policy before installing your app.
Data collection
Minimization: Gather only the minimum data required to perform the tool’s function. Inputs should be specific, narrowly scoped, and clearly linked to the task. Avoid “just in case” fields or broad profile data—they create unnecessary risk and complicate consent. Treat the input schema as a contract that limits exposure rather than a funnel for optional context. 
Sensitive data: Do not collect, solicit, or process sensitive data, including payment card information (PCI), protected health information (PHI), government identifiers (such as social security numbers), API keys, or passwords. 
Data boundaries: 
Avoid requesting raw location fields (for example, city or coordinates) in your input schema. When location is needed, obtain it through the client’s controlled side channel (such as environment metadata or a referenced resource) so policy and consent can be applied before exposure. This reduces accidental PII capture, enforces least-privilege access, and keeps location handling auditable and revocable. 
Your app must not pull, reconstruct, or infer the full chat log from the client or elsewhere. Operate only on the explicit snippets and resources the client or model chooses to send. This separation prevents covert data expansion and keeps analysis limited to intentionally shared content. 
Transparency and user control
Data practices: Do not engage in surveillance, tracking, or behavioral profiling—including metadata collection such as timestamps, IPs, or query patterns—unless explicitly disclosed, narrowly scoped, and aligned with OpenAI’s usage policies. 
Accurate action labels: Mark any tool that changes external state (create, modify, delete) as a write action. Read-only tools must be side-effect-free and safe to retry. Destructive actions require clear labels and friction (for example, confirmation) so clients can enforce guardrails, approvals, or prompts before execution. 
Preventing data exfiltration: Any action that sends data outside the current boundary (for example, posting messages, sending emails, or uploading files) must be surfaced to the client as a write action so it can require user confirmation or run in preview mode. This reduces unintentional data leakage and aligns server behavior with client-side security expectations. 
Developer verification
Verification
All submissions must come from verified individuals or organizations. Once the submission process opens broadly, we will provide a straightforward way to confirm your identity and affiliation with any represented business. Repeated misrepresentation, hidden behavior, or attempts to game the system will result in removal from the program.
Support contact details
Provide customer support contact details where end users can reach you for help. Keep this information accurate and up to date.
After submission
Reviews and checks
We may perform automated scans or manual reviews to understand how your app works and whether it may conflict with our policies. If your app is rejected or removed, you will receive feedback and may have the opportunity to appeal.
Maintenance and removal
Apps that are inactive, unstable, or no longer compliant may be removed. We may reject or remove any app from our services at any time and for any reason without notice, such as for legal or security concerns or policy violations.
Re-submission for changes
Once your app is listed in the directory, tool names, signatures, and descriptions are locked. To change or add tools, you must resubmit the app for review.
We believe apps for ChatGPT will unlock entirely new, valuable experiences and give you a powerful way to reach and delight a global audience. We’re excited to work together and see what you build.

## https://developers.openai.com/apps-sdk/plan/use-case

Resources 
Codex 
ChatGPT 
Apps SDK
Build apps to extend ChatGPT 
Agentic Commerce
Build commerce flows in ChatGPT 
Blog 
Search ⌘K  
Search the docs 
⌘ K / Ctrl K 
Close 
Primary navigation 
ChatGPT  
Resources Codex ChatGPT Blog  
ChatGPT 
> Apps SDK 
Home 
Changelog 
Categories 
Code 
Cookbooks 
Guides 
Videos 
Topics 
Agents 
Audio & Voice 
Image generation 
Video generation 
Tools 
Computer use 
Fine-tuning 
Scaling 
Home 
Quickstart 
Concepts 
Models 
Pricing 
Changelog 
Codex CLI 
Overview 
Features 
CLI Reference 
Configuration 
Codex IDE Extension 
Set up your IDE 
Configuration 
IDE → Cloud tasks 
Codex Cloud 
Delegate to Codex 
Environments 
Code Review 
Internet Access 
Codex SDK 
Overview 
TypeScript 
GitHub Action 
Guides 
Agents SDK 
Prompting Codex 
Slash commands 
Custom instructions with AGENTS.md 
Model Context Protocol (MCP) 
Autofix CI 
Enterprise Admin 
Security Admin 
Codex on Windows 
Integrations 
Slack 
Resources 
AGENTS.md 
Codex on GitHub 
Home 
Quickstart 
Core Concepts 
MCP Server 
User interaction 
Design guidelines 
Plan 
Research use cases 
Define tools 
Design components 
Build 
Set up your server 
Build a custom UX 
Authenticate users 
Manage state 
Examples 
Deploy 
Deploy your app 
Connect from ChatGPT 
Test your integration 
Guides 
Optimize Metadata 
Security & Privacy 
Troubleshooting 
Resources 
Reference 
App developer guidelines 
All posts 
Recent 
Using Codex for education at Dagster Labs 
How Codex ran OpenAI DevDay 2025 
Why we built the Responses API 
Developer notes on the Realtime API 
Hello, world! 
 
ChatGPT
> Apps SDK
Home
Quickstart
Core Concepts
MCP Server
User interaction
Design guidelines
Plan
Research use cases
Define tools
Design components
Build
Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy
Deploy your app
Connect from ChatGPT
Test your integration
Guides
Optimize Metadata
Security & Privacy
Troubleshooting
Resources
Reference
App developer guidelines

Research use cases 
Identify and prioritize Apps SDK use cases. 
Why start with use cases
Every successful Apps SDK app starts with a crisp understanding of what the user is trying to accomplish. Discovery in ChatGPT is model-driven: the assistant chooses your app when your tool metadata, descriptions, and past usage align with the user’s prompt and memories. That only works if you have already mapped the tasks the model should recognize and the outcomes you can deliver.
Use this page to capture your hypotheses, pressure-test them with prompts, and align your team on scope before you define tools or build components.
Gather inputs
Begin with qualitative and quantitative research:
User interviews and support requests – capture the jobs-to-be-done, terminology, and data sources users rely on today. 
Prompt sampling – list direct asks (e.g., “show my Jira board”) and indirect intents (“what am I blocked on for the launch?”) that should route to your app. 
System constraints – note any compliance requirements, offline data, or rate limits that will influence tool design later. 
Document the user persona, the context they are in when they reach for ChatGPT, and what success looks like in a single sentence for each scenario.
Define evaluation prompts
Decision boundary tuning is easier when you have a golden set to iterate against. For each use case:
Author at least five direct prompts that explicitly reference your data, product name, or verbs you expect the user to say. 
Draft five indirect prompts where the user states a goal but not the tool (“I need to keep our launch tasks organized”). 
Add negative prompts that should not trigger your app so you can measure precision. 
Use these prompts later in Optimize metadata to hill-climb on recall and precision without overfitting to a single request.
Scope the minimum lovable feature
For each use case decide:
What information must be visible inline to answer the question or let the user act. 
Which actions require write access and whether they should be gated behind confirmation in developer mode. 
What state needs to persist between turns—for example, filters, selected rows, or draft content. 
Rank the use cases based on user impact and implementation effort. A common pattern is to ship one P0 scenario with a high-confidence component, then expand to P1 scenarios once discovery data confirms engagement.
Translate use cases into tooling
Once a scenario is in scope, draft the tool contract:
Inputs: the parameters the model can safely provide. Keep them explicit, use enums when the set is constrained, and document defaults. 
Outputs: the structured content you will return. Add fields the model can reason about (IDs, timestamps, status) in addition to what your UI renders. 
Component intent: whether you need a read-only viewer, an editor, or a multiturn workspace. This influences the component planning and storage model later. 
Review these drafts with stakeholders—especially legal or compliance teams—before you invest in implementation. Many integrations require PII reviews or data processing agreements before they can ship to production.
Prepare for iteration
Even with solid planning, expect to revise prompts and metadata after your first dogfood. Build time into your schedule for:
Rotating through the golden prompt set weekly and logging tool selection accuracy. 
Collecting qualitative feedback from early testers in ChatGPT developer mode. 
Capturing analytics (tool calls, component interactions) so you can measure adoption. 
These research artifacts become the backbone for your roadmap, changelog, and success metrics once the app is live.
Next 
Define tools

## https://developers.openai.com/apps-sdk/plan/tools

Resources 
Codex 
ChatGPT 
Apps SDK
Build apps to extend ChatGPT 
Agentic Commerce
Build commerce flows in ChatGPT 
Blog 
Search ⌘K  
Search the docs 
⌘ K / Ctrl K 
Close 
Primary navigation 
ChatGPT  
Resources Codex ChatGPT Blog  
ChatGPT 
> Apps SDK 
Home 
Changelog 
Categories 
Code 
Cookbooks 
Guides 
Videos 
Topics 
Agents 
Audio & Voice 
Image generation 
Video generation 
Tools 
Computer use 
Fine-tuning 
Scaling 
Home 
Quickstart 
Concepts 
Models 
Pricing 
Changelog 
Codex CLI 
Overview 
Features 
CLI Reference 
Configuration 
Codex IDE Extension 
Set up your IDE 
Configuration 
IDE → Cloud tasks 
Codex Cloud 
Delegate to Codex 
Environments 
Code Review 
Internet Access 
Codex SDK 
Overview 
TypeScript 
GitHub Action 
Guides 
Agents SDK 
Prompting Codex 
Slash commands 
Custom instructions with AGENTS.md 
Model Context Protocol (MCP) 
Autofix CI 
Enterprise Admin 
Security Admin 
Codex on Windows 
Integrations 
Slack 
Resources 
AGENTS.md 
Codex on GitHub 
Home 
Quickstart 
Core Concepts 
MCP Server 
User interaction 
Design guidelines 
Plan 
Research use cases 
Define tools 
Design components 
Build 
Set up your server 
Build a custom UX 
Authenticate users 
Manage state 
Examples 
Deploy 
Deploy your app 
Connect from ChatGPT 
Test your integration 
Guides 
Optimize Metadata 
Security & Privacy 
Troubleshooting 
Resources 
Reference 
App developer guidelines 
All posts 
Recent 
Using Codex for education at Dagster Labs 
How Codex ran OpenAI DevDay 2025 
Why we built the Responses API 
Developer notes on the Realtime API 
Hello, world! 
 
ChatGPT
> Apps SDK
Home
Quickstart
Core Concepts
MCP Server
User interaction
Design guidelines
Plan
Research use cases
Define tools
Design components
Build
Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy
Deploy your app
Connect from ChatGPT
Test your integration
Guides
Optimize Metadata
Security & Privacy
Troubleshooting
Resources
Reference
App developer guidelines

Define tools 
Plan and define tools for your assistant. 
Tool-first thinking
In Apps SDK, tools are the contract between your MCP server and the model. They describe what the connector can do, how to call it, and what data comes back. Good tool design makes discovery accurate, invocation reliable, and downstream UX predictable.
Use the checklist below to turn your use cases into well-scoped tools before you touch the SDK.
Draft the tool surface area
Start from the user journey defined in your use case research:
One job per tool – keep each tool focused on a single read or write action (“fetch_board”, “create_ticket”), rather than a kitchen-sink endpoint. This helps the model decide between alternatives. 
Explicit inputs – define the shape of inputSchema now, including parameter names, data types, and enums. Document defaults and nullable fields so the model knows what is optional. 
Predictable outputs – enumerate the structured fields you will return, including machine-readable identifiers that the model can reuse in follow-up calls. 
If you need both read and write behavior, create separate tools so ChatGPT can respect confirmation flows for write actions.
Capture metadata for discovery
Discovery is driven almost entirely by metadata. For each tool, draft:
Name – action oriented and unique inside your connector (kanban.move_task). 
Description – one or two sentences that start with “Use this when…” so the model knows exactly when to pick the tool. 
Parameter annotations – describe each argument and call out safe ranges or enumerations. This context prevents malformed calls when the user prompt is ambiguous. 
Global metadata – confirm you have app-level name, icon, and descriptions ready for the directory and launcher. 
Later, plug these into your MCP server and iterate using the Optimize metadata workflow.
Model-side guardrails
Think through how the model should behave once a tool is linked:
Prelinked vs. link-required – if your app can work anonymously, mark tools as available without auth. Otherwise, make sure your connector enforces linking via the onboarding flow described in Authentication. 
Read-only hints – set the readOnlyHint annotation for tools that cannot mutate state so ChatGPT can skip confirmation prompts when possible. 
Result components – decide whether each tool should render a component, return JSON only, or both. Setting _meta["openai/outputTemplate"] on the tool descriptor advertises the HTML template to ChatGPT. 
Golden prompt rehearsal
Before you implement, sanity-check your tool set against the prompt list you captured earlier:
For every direct prompt, confirm you have exactly one tool that clearly addresses the request. 
For indirect prompts, ensure the tool descriptions give the model enough context to select your connector instead of a built-in alternative. 
For negative prompts, verify your metadata will keep the tool hidden unless the user explicitly opts in (e.g., by naming your product). 
Capture any gaps or ambiguities now and adjust the plan—changing metadata before launch is much cheaper than refactoring code later.
Handoff to implementation
When you are ready to implement, compile the following into a handoff document:
Tool name, description, input schema, and expected output schema. 
Whether the tool should return a component, and if so which UI component should render it. 
Auth requirements, rate limits, and error handling expectations. 
Test prompts that should succeed (and ones that should fail). 
Bring this plan into the Set up your server guide to translate it into code with the MCP SDK of your choice.
Previous 
Research use cases
Next 
Design components

## https://developers.openai.com/apps-sdk/plan/components

Resources 
Codex 
ChatGPT 
Apps SDK
Build apps to extend ChatGPT 
Agentic Commerce
Build commerce flows in ChatGPT 
Blog 
Search ⌘K  
Search the docs 
⌘ K / Ctrl K 
Close 
Primary navigation 
ChatGPT  
Resources Codex ChatGPT Blog  
ChatGPT 
> Apps SDK 
Home 
Changelog 
Categories 
Code 
Cookbooks 
Guides 
Videos 
Topics 
Agents 
Audio & Voice 
Image generation 
Video generation 
Tools 
Computer use 
Fine-tuning 
Scaling 
Home 
Quickstart 
Concepts 
Models 
Pricing 
Changelog 
Codex CLI 
Overview 
Features 
CLI Reference 
Configuration 
Codex IDE Extension 
Set up your IDE 
Configuration 
IDE → Cloud tasks 
Codex Cloud 
Delegate to Codex 
Environments 
Code Review 
Internet Access 
Codex SDK 
Overview 
TypeScript 
GitHub Action 
Guides 
Agents SDK 
Prompting Codex 
Slash commands 
Custom instructions with AGENTS.md 
Model Context Protocol (MCP) 
Autofix CI 
Enterprise Admin 
Security Admin 
Codex on Windows 
Integrations 
Slack 
Resources 
AGENTS.md 
Codex on GitHub 
Home 
Quickstart 
Core Concepts 
MCP Server 
User interaction 
Design guidelines 
Plan 
Research use cases 
Define tools 
Design components 
Build 
Set up your server 
Build a custom UX 
Authenticate users 
Manage state 
Examples 
Deploy 
Deploy your app 
Connect from ChatGPT 
Test your integration 
Guides 
Optimize Metadata 
Security & Privacy 
Troubleshooting 
Resources 
Reference 
App developer guidelines 
All posts 
Recent 
Using Codex for education at Dagster Labs 
How Codex ran OpenAI DevDay 2025 
Why we built the Responses API 
Developer notes on the Realtime API 
Hello, world! 
 
ChatGPT
> Apps SDK
Home
Quickstart
Core Concepts
MCP Server
User interaction
Design guidelines
Plan
Research use cases
Define tools
Design components
Build
Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy
Deploy your app
Connect from ChatGPT
Test your integration
Guides
Optimize Metadata
Security & Privacy
Troubleshooting
Resources
Reference
App developer guidelines

Design components 
Plan and design UI components that users can interact with. 
Why components matter
UI components are the human-visible half of your connector. They let users view or edit data inline, switch to fullscreen when needed, and keep context synchronized between typed prompts and UI actions. Planning them early ensures your MCP server returns the right structured data and component metadata from day one.
Explore sample components
We publish reusable examples in openai-apps-sdk-examples so you can see common patterns before you build your own. The pizzaz gallery covers every default surface we provide today:
List
Renders dynamic collections with empty-state handling. View the code.

Map
Plots geo data with marker clustering and detail panes. View the code.

Album
Showcases media grids with fullscreen transitions. View the code.

Carousel
Highlights featured content with swipe gestures. View the code.

Shop
Demonstrates product browsing with checkout affordances. View the code.
 
Clarify the user interaction
For each use case, decide what the user needs to see and manipulate:
Viewer vs. editor – is the component read-only (a chart, a dashboard) or should it support editing and writebacks (forms, kanban boards)? 
Single-shot vs. multiturn – will the user accomplish the task in one invocation, or should state persist across turns as they iterate? 
Inline vs. fullscreen – some tasks are comfortable in the default inline card, while others benefit from fullscreen or picture-in-picture modes. Sketch these states before you implement. 
Write down the fields, affordances, and empty states you need so you can validate them with design partners and reviewers.
Map data requirements
Components should receive everything they need in the tool response. When planning:
Structured content – define the JSON payload that the component will parse. 
Initial component state – use window.openai.toolOutput as the initial render data. On subsequent followups that invoke callTool, use the return value of callTool. To cache state for re-rendering, you can use window.openai.setWidgetState. 
Auth context – note whether the component should display linked-account information, or whether the model must prompt the user to connect first. 
Feeding this data through the MCP response is simpler than adding ad-hoc APIs later.
Design for responsive layouts
Components run inside an iframe on both desktop and mobile. Plan for:
Adaptive breakpoints – set a max width and design layouts that collapse gracefully on small screens. 
Accessible color and motion – respect system dark mode (match color-scheme) and provide focus states for keyboard navigation. 
Launcher transitions – if the user opens your component from the launcher or expands to fullscreen, make sure navigation elements stay visible. 
Document CSS variables, font stacks, and iconography up front so they are consistent across components.
Define the state contract
Because components and the chat surface share conversation state, be explicit about what is stored where:
Component state – use the window.openai.setWidgetState API to persist state the host should remember (selected record, scroll position, staged form data). 
Server state – store authoritative data in your backend or the built-in storage layer. Decide how to merge server changes back into component state after follow-up tool calls. 
Model messages – think about what human-readable updates the component should send back via sendFollowUpMessage so the transcript stays meaningful. 
Capturing this state diagram early prevents hard-to-debug sync issues later.
Plan telemetry and debugging hooks
Inline experiences are hardest to debug without instrumentation. Decide in advance how you will:
Emit analytics events for component loads, button clicks, and validation errors. 
Log tool-call IDs alongside component telemetry so you can trace issues end to end. 
Provide fallbacks when the component fails to load (e.g., show the structured JSON and prompt the user to retry). 
Once these plans are in place you are ready to move on to the implementation details in Build a custom UX.
Previous 
Define tools

## https://developers.openai.com/apps-sdk/quickstart

Resources 
Codex 
ChatGPT 
Apps SDK
Build apps to extend ChatGPT 
Agentic Commerce
Build commerce flows in ChatGPT 
Blog 
Search ⌘K  
Search the docs 
⌘ K / Ctrl K 
Close 
Primary navigation 
ChatGPT  
Resources Codex ChatGPT Blog  
ChatGPT 
> Apps SDK 
Home 
Changelog 
Categories 
Code 
Cookbooks 
Guides 
Videos 
Topics 
Agents 
Audio & Voice 
Image generation 
Video generation 
Tools 
Computer use 
Fine-tuning 
Scaling 
Home 
Quickstart 
Concepts 
Models 
Pricing 
Changelog 
Codex CLI 
Overview 
Features 
CLI Reference 
Configuration 
Codex IDE Extension 
Set up your IDE 
Configuration 
IDE → Cloud tasks 
Codex Cloud 
Delegate to Codex 
Environments 
Code Review 
Internet Access 
Codex SDK 
Overview 
TypeScript 
GitHub Action 
Guides 
Agents SDK 
Prompting Codex 
Slash commands 
Custom instructions with AGENTS.md 
Model Context Protocol (MCP) 
Autofix CI 
Enterprise Admin 
Security Admin 
Codex on Windows 
Integrations 
Slack 
Resources 
AGENTS.md 
Codex on GitHub 
Home 
Quickstart 
Core Concepts 
MCP Server 
User interaction 
Design guidelines 
Plan 
Research use cases 
Define tools 
Design components 
Build 
Set up your server 
Build a custom UX 
Authenticate users 
Manage state 
Examples 
Deploy 
Deploy your app 
Connect from ChatGPT 
Test your integration 
Guides 
Optimize Metadata 
Security & Privacy 
Troubleshooting 
Resources 
Reference 
App developer guidelines 
All posts 
Recent 
Using Codex for education at Dagster Labs 
How Codex ran OpenAI DevDay 2025 
Why we built the Responses API 
Developer notes on the Realtime API 
Hello, world! 
 
ChatGPT
> Apps SDK
Home
Quickstart
Core Concepts
MCP Server
User interaction
Design guidelines
Plan
Research use cases
Define tools
Design components
Build
Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy
Deploy your app
Connect from ChatGPT
Test your integration
Guides
Optimize Metadata
Security & Privacy
Troubleshooting
Resources
Reference
App developer guidelines

Quickstart 
Build and connect your first app to ChatGPT. 
Introduction
The Apps SDK relies on the Model Context Protocol (MCP) to expose your app to ChatGPT. To build an app for ChatGPT with the Apps SDK, you will need two things:
A web component built with the framework of your choice – you are free to build your app as you see fit, that will be rendered in an iframe in the ChatGPT interface. 
A Model Context Protocol (MCP) server that will be used to expose your app and define your app’s capabilities (tools) to ChatGPT. 
In this quickstart, we’ll build a simple to-do list app, contained in a single HTML file that keeps the markup, CSS, and JavaScript together.
To see more advanced examples using React, see the examples repository on GitHub.
Build a web component
Let’s start by creating a file called public/todo-widget.html in a new directory that will be the UI rendered by the Apps SDK in ChatGPT. This file will contain the web component that will be rendered in the ChatGPT interface.
Add the following content:
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Todo list</title>
    <style>
      :root {
        color: #0b0b0f;
        font-family: "Inter", system-ui, -apple-system, sans-serif;
      }

      html,
      body {
        width: 100%;
        min-height: 100%;
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 16px;
        background: #f6f8fb;
      }

      main {
        width: 100%;
        max-width: 360px;
        min-height: 260px;
        margin: 0 auto;
        background: #fff;
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
      }

      h2 {
        margin: 0 0 16px;
        font-size: 1.25rem;
      }

      form {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
      }

      form input {
        flex: 1;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid #cad3e0;
        font-size: 0.95rem;
      }

      form button {
        border: none;
        border-radius: 10px;
        background: #111bf5;
        color: white;
        font-weight: 600;
        padding: 0 16px;
        cursor: pointer;
      }

      input[type="checkbox"] {
        accent-color: #111bf5;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      li {
        background: #f2f4fb;
        border-radius: 12px;
        padding: 10px 14px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      li span {
        flex: 1;
      }

      li[data-completed="true"] span {
        text-decoration: line-through;
        color: #6c768a;
      }
    </style>
  </head>
  <body>
    <main>
      <h2>Todo list</h2>
      <form id="add-form" autocomplete="off">
        <input id="todo-input" name="title" placeholder="Add a task" />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list"></ul>
    </main>

    <script type="module">
      const listEl = document.querySelector("#todo-list");
      const formEl = document.querySelector("#add-form");
      const inputEl = document.querySelector("#todo-input");

      let tasks = [...(window.openai?.toolOutput?.tasks ?? [])];

      const render = () => {
        listEl.innerHTML = "";
        tasks.forEach((task) => {
          const li = document.createElement("li");
          li.dataset.id = task.id;
          li.dataset.completed = String(Boolean(task.completed));

          const label = document.createElement("label");
          label.style.display = "flex";
          label.style.alignItems = "center";
          label.style.gap = "10px";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = Boolean(task.completed);

          const span = document.createElement("span");
          span.textContent = task.title;

          label.appendChild(checkbox);
          label.appendChild(span);
          li.appendChild(label);
          listEl.appendChild(li);
        });
      };

      const updateFromResponse = (response) => {
        if (response?.structuredContent?.tasks) {
          tasks = response.structuredContent.tasks;
          render();
        }
      };

      const handleSetGlobals = (event) => {
        const globals = event.detail?.globals;
        if (!globals?.toolOutput?.tasks) return;
        tasks = globals.toolOutput.tasks;
        render();
      };

      window.addEventListener("openai:set_globals", handleSetGlobals, {
        passive: true,
      });

      const mutateTasksLocally = (name, payload) => {
        if (name === "add_todo") {
          tasks = [
            ...tasks,
            { id: crypto.randomUUID(), title: payload.title, completed: false },
          ];
        }

        if (name === "complete_todo") {
          tasks = tasks.map((task) =>
            task.id === payload.id ? { ...task, completed: true } : task
          );
        }

        if (name === "set_completed") {
          tasks = tasks.map((task) =>
            task.id === payload.id
              ? { ...task, completed: payload.completed }
              : task
          );
        }

        render();
      };

      const callTodoTool = async (name, payload) => {
        if (window.openai?.callTool) {
          const response = await window.openai.callTool(name, payload);
          updateFromResponse(response);
          return;
        }

        mutateTasksLocally(name, payload);
      };

      formEl.addEventListener("submit", async (event) => {
        event.preventDefault();
        const title = inputEl.value.trim();
        if (!title) return;
        await callTodoTool("add_todo", { title });
        inputEl.value = "";
      });

      listEl.addEventListener("change", async (event) => {
        const checkbox = event.target;
        if (!checkbox.matches('input[type="checkbox"]')) return;
        const id = checkbox.closest("li")?.dataset.id;
        if (!id) return;

        if (!checkbox.checked) {
          if (window.openai?.callTool) {
            checkbox.checked = true;
            return;
          }

          mutateTasksLocally("set_completed", { id, completed: false });
          return;
        }

        await callTodoTool("complete_todo", { id });
      });

      render();
    </script>
  </body>
</html>Using the Apps SDK in your web component
window.openai is the bridge between your frontend and ChatGPT.
When ChatGPT loads the iframe, it injects the latest tool response into window.openai.toolOutput, which is an object specific to the Apps SDK. Subsequent calls to window.openai.callTool return fresh structured content so the UI stays in sync.
Build an MCP server
Install the official Python or Node MCP SDK to create a server and expose a /mcp endpoint.
In this quickstart, we’ll use the Node SDK.
If you’re using Python, refer to our examples repository on GitHub to see an example MCP server with the Python SDK.
Install the Node SDK and Zod with:
npm install @modelcontextprotocol/sdk zodMCP server with Apps SDK resources
Register a resource for your component bundle and the tools the model can call (e.g. add_todo and complete_todo) so ChatGPT can drive the UI.
Create a file named server.js and paste the following example that uses the Node SDK:
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const todoHtml = readFileSync("public/todo-widget.html", "utf8");

const addTodoInputSchema = {
  title: z.string().min(1),
};

const completeTodoInputSchema = {
  id: z.string().min(1),
};

let todos = [];
let nextId = 1;

const replyWithTodos = (message) => ({
  content: message ? [{ type: "text", text: message }] : [],
  structuredContent: { tasks: todos },
});

function createTodoServer() {
  const server = new McpServer({ name: "todo-app", version: "0.1.0" });

  server.registerResource(
    "todo-widget",
    "ui://widget/todo.html",
    {},
    async () => ({
      contents: [
        {
          uri: "ui://widget/todo.html",
          mimeType: "text/html+skybridge",
          text: todoHtml,
          _meta: { "openai/widgetPrefersBorder": true },
        },
      ],
    })
  );

  server.registerTool(
    "add_todo",
    {
      title: "Add todo",
      description: "Creates a todo item with the given title.",
      inputSchema: addTodoInputSchema,
      _meta: {
        "openai/outputTemplate": "ui://widget/todo.html",
        "openai/toolInvocation/invoking": "Adding todo",
        "openai/toolInvocation/invoked": "Added todo",
      },
    },
    async (args) => {
      const title = args?.title?.trim?.() ?? "";
      if (!title) return replyWithTodos("Missing title.");
      const todo = { id: `todo-${nextId++}`, title, completed: false };
      todos = [...todos, todo];
      return replyWithTodos(`Added "${todo.title}".`);
    }
  );

  server.registerTool(
    "complete_todo",
    {
      title: "Complete todo",
      description: "Marks a todo as done by id.",
      inputSchema: completeTodoInputSchema,
      _meta: {
        "openai/outputTemplate": "ui://widget/todo.html",
        "openai/toolInvocation/invoking": "Completing todo",
        "openai/toolInvocation/invoked": "Completed todo",
      },
    },
    async (args) => {
      const id = args?.id;
      if (!id) return replyWithTodos("Missing todo id.");
      const todo = todos.find((task) => task.id === id);
      if (!todo) {
        return replyWithTodos(`Todo ${id} was not found.`);
      }

      todos = todos.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      );

      return replyWithTodos(`Completed "${todo.title}".`);
    }
  );

  return server;
}

const port = Number(process.env.PORT ?? 8787);
const MCP_PATH = "/mcp";

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS" && url.pathname === MCP_PATH) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/plain" }).end("Todo MCP server");
    return;
  }

  const MCP_METHODS = new Set(["POST", "GET", "DELETE"]);
  if (url.pathname === MCP_PATH && req.method && MCP_METHODS.has(req.method)) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");

    const server = createTodoServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless mode
      enableJsonResponse: true,
    });

    res.on("close", () => {
      transport.close();
      server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) {
        res.writeHead(500).end("Internal server error");
      }
    }
    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.listen(port, () => {
  console.log(
    `Todo MCP server listening on http://localhost:${port}${MCP_PATH}`
  );
});This snippet also responds to GET / for health checks, handles CORS preflight for /mcp and nested routes like /mcp/actions, and returns 404 Not Found for OAuth discovery routes you are not using yet. That keeps ChatGPT’s connector wizard from surfacing 502 errors while you iterate without authentication.
Run locally
If you’re using a web framework like React, build your component into static assets so the HTML template can inline them. Usually, you can run a build command such as npm run build to produce a dist directory with your compiled assets.
In this quickstart, since we’re using vanilla HTML, no build step is required.
Start the MCP server on http://localhost:<port>/mcp from the directory that contains server.js (or server.ts).
Make sure you have "type": "module" in your package.json file:
{
  "type": "module",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.20.2",
    "zod": "^3.25.76"
  }
}Then run the server with the following command:
node server.jsThe server should print Todo MCP server listening on http://localhost:8787/mcp once it is ready.
Test with MCP Inspector
You can use the MCP Inspector to test your server locally.
npx @modelcontextprotocol/inspector@latest http://localhost:8787/mcpThis will open a browser window with the MCP Inspector interface. You can use this to test your server and see the tool responses.

Expose your server to the public internet
For ChatGPT to access your server during development, you need to expose it to the public internet. You can use a tool such as ngrok to open a tunnel to your local server.
ngrok http <port>This will give you a public URL like https://<subdomain>.ngrok.app that you can use to access your server from ChatGPT.
When you add you connector, provide the public URL with the /mcp path (e.g. https://<subdomain>.ngrok.app/mcp).
Add your app to ChatGPT
Once you have your MCP server and web component working locally, you can add your app to ChatGPT with the following steps:
Enable developer mode under Settings → Apps & Connectors → Advanced settings in ChatGPT. 
Click the Create button to add a connector under Settings → Connectors and paste the HTTPS + /mcp URL from your tunnel or deployment (e.g. https://<subdomain>.ngrok.app/mcp). 
Name the connector, provide a short description and click Create. 

Open a new chat, add your connector from the More menu (accessible after clicking the + button), and prompt the model (e.g., “Add a new task to read my book”). ChatGPT will stream tool payloads so you can confirm inputs and outputs. 

Next steps
From there, you can iterate on the UI/UX, prompts, tool metadata, and the overall experience.
Refresh the connector after each change to the MCP server (tools, metadata, etc.) You can do this by clicking the Refresh button in Settings → Connectors after selecting your connector.
Read our app developer guidelines to learn more about the best practices for building apps for ChatGPT, and make sure you research your use case and read our design guidelines before building.
Once you understand the basics, you can leverage the Apps SDK to build a custom UX using the Apps SDK primitives, authenticate users if needed, and persist state.

## https://developers.openai.com/apps-sdk/build/mcp-server

Resources 
Codex 
ChatGPT 
Apps SDK
Build apps to extend ChatGPT 
Agentic Commerce
Build commerce flows in ChatGPT 
Blog 
Search ⌘K  
Search the docs 
⌘ K / Ctrl K 
Close 
Primary navigation 
ChatGPT  
Resources Codex ChatGPT Blog  
ChatGPT 
> Apps SDK 
Home 
Changelog 
Categories 
Code 
Cookbooks 
Guides 
Videos 
Topics 
Agents 
Audio & Voice 
Image generation 
Video generation 
Tools 
Computer use 
Fine-tuning 
Scaling 
Home 
Quickstart 
Concepts 
Models 
Pricing 
Changelog 
Codex CLI 
Overview 
Features 
CLI Reference 
Configuration 
Codex IDE Extension 
Set up your IDE 
Configuration 
IDE → Cloud tasks 
Codex Cloud 
Delegate to Codex 
Environments 
Code Review 
Internet Access 
Codex SDK 
Overview 
TypeScript 
GitHub Action 
Guides 
Agents SDK 
Prompting Codex 
Slash commands 
Custom instructions with AGENTS.md 
Model Context Protocol (MCP) 
Autofix CI 
Enterprise Admin 
Security Admin 
Codex on Windows 
Integrations 
Slack 
Resources 
AGENTS.md 
Codex on GitHub 
Home 
Quickstart 
Core Concepts 
MCP Server 
User interaction 
Design guidelines 
Plan 
Research use cases 
Define tools 
Design components 
Build 
Set up your server 
Build a custom UX 
Authenticate users 
Manage state 
Examples 
Deploy 
Deploy your app 
Connect from ChatGPT 
Test your integration 
Guides 
Optimize Metadata 
Security & Privacy 
Troubleshooting 
Resources 
Reference 
App developer guidelines 
All posts 
Recent 
Using Codex for education at Dagster Labs 
How Codex ran OpenAI DevDay 2025 
Why we built the Responses API 
Developer notes on the Realtime API 
Hello, world! 
 
ChatGPT
> Apps SDK
Home
Quickstart
Core Concepts
MCP Server
User interaction
Design guidelines
Plan
Research use cases
Define tools
Design components
Build
Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy
Deploy your app
Connect from ChatGPT
Test your integration
Guides
Optimize Metadata
Security & Privacy
Troubleshooting
Resources
Reference
App developer guidelines

Build your MCP server 
Wire tools, templates, and the widget runtime that powers ChatGPT Apps. 
By the end of this guide, you’ll know how to connect your backend MCP server to ChatGPT, define tools, register UI templates, and tie everything together using the widget runtime. You’ll build a working foundation for a ChatGPT App that returns structured data, renders an interactive widget, and keeps your model, server, and UI in sync. If you prefer to dive straight into the implementation, you can skip ahead to the example at the end.
Overview
What an MCP server does for your app
ChatGPT Apps have three components:
Your MCP server defines tools, enforces auth, returns data, and points each tool to a UI bundle. 
The widget/UI bundle renders inside ChatGPT’s iframe, reading data and widget-runtime globals exposed through window.openai. 
The model decides when to call tools and narrates the experience using the structured data you return. 
A solid server implementation keeps those boundaries clean so you can iterate on UI and data independently. Remember: you build the MCP server and define the tools, but ChatGPT’s model chooses when to call them based on the metadata you provide.
Before you begin
Pre-requisites:
Comfortable with TypeScript or Python and a web bundler (Vite, esbuild, etc.). 
MCP server reachable over HTTP (local is fine to start). 
Built UI bundle that exports a root script (React or vanilla). 
Example project layout:
your-chatgpt-app/
├─ server/
│  └─ src/index.ts          # MCP server + tool handlers
├─ web/
│  ├─ src/component.tsx     # React widget
│  └─ dist/app.{js,css}  # Bundled assets referenced by the server
└─ package.jsonArchitecture flow
A user prompt causes ChatGPT to call one of your MCP tools. 
Your server runs the handler, fetches authoritative data, and returns structuredContent, _meta, and UI metadata. 
ChatGPT loads the HTML template linked in the tool descriptor (served as text/html+skybridge) and injects the payload through window.openai. 
The widget renders from window.openai.toolOutput, persists UI state with window.openai.setWidgetState, and can call tools again via window.openai.callTool. 
The model reads structuredContent to narrate what happened, so keep it tight and idempotent—ChatGPT may retry tool calls. 
User prompt
   ↓
ChatGPT model ──► MCP tool call ──► Your server ──► Tool response (`structuredContent`, `_meta`, `content`)
   │                                                   │
   └───── renders narration ◄──── widget iframe ◄──────┘
                              (HTML template + `window.openai`)Understand the window.openai widget runtime
The sandboxed iframe exposes a single global object:
CategoryPropertyPurpose
State & datatoolInputArguments supplied when the tool was invoked.
State & datatoolOutputYour structuredContent. Keep fields concise; the model reads them verbatim.
State & datatoolResponseMetadataThe _meta payload; only the widget sees it, never the model.
State & datawidgetStateSnapshot of UI state persisted between renders.
State & datasetWidgetState(state)Stores a new snapshot synchronously; call it after every meaningful UI interaction.
Widget runtime APIscallTool(name, args)Invoke another MCP tool from the widget (mirrors model-initiated calls).
Widget runtime APIssendFollowUpMessage({ prompt })Ask ChatGPT to post a message authored by the component.
Widget runtime APIsrequestDisplayModeRequest PiP/fullscreen modes.
Widget runtime APIsrequestModalSpawn a modal owned by ChatGPT.
Widget runtime APIsnotifyIntrinsicHeightReport dynamic widget heights to avoid scroll clipping.
Widget runtime APIsopenExternal({ href })Open a vetted external link in the user’s browser.
Contexttheme, displayMode, maxHeight, safeArea, view, userAgent, localeEnvironment signals you can read—or subscribe to via useOpenAiGlobal—to adapt visuals and copy.

Use requestModal when you need a host-controlled overlay—for example, open a checkout or detail view anchored to an “Add to cart” button so shoppers can review options without forcing the inline widget to resize.
Subscribe to any of these fields with useOpenAiGlobal so multiple components stay in sync.
Here’s an example React component that reads toolOutput and persists UI state with setWidgetState: For more information on how to build your UI, check out the custom UX guide.
// Example helper hook that keeps state
// in sync with the widget runtime via window.openai.setWidgetState.
import { useWidgetState } from "./use-widget-state";

export function KanbanList() {
  const [widgetState, setWidgetState] = useWidgetState(() => ({ selectedTask: null }));
  const tasks = window.openai.toolOutput?.tasks ?? [];

  return tasks.map((task) => (
    <button
      key={task.id}
      data-selected={widgetState?.selectedTask === task.id}
      onClick={() => setWidgetState((prev) => ({ ...prev, selectedTask: task.id }))}
    >
      {task.title}
    </button>
  ));
}If you’re not using React, you don’t need a helper like useWidgetState. Vanilla JS widgets can read and write window.openai directly—for example, window.openai.toolOutput or window.openai.setWidgetState(state).
Pick an SDK
Apps SDK works with any MCP implementation, but the official SDKs are the quickest way to get started. They ship tool/schema helpers, HTTP server scaffolding, resource registration utilities, and end-to-end type safety so you can stay focused on business logic:
Python SDK – Iterate quickly with FastMCP or FastAPI. Repo: modelcontextprotocol/python-sdk. 
TypeScript SDK – Ideal when your stack is already Node/React. Repo: modelcontextprotocol/typescript-sdk, published as @modelcontextprotocol/sdk. Docs live on modelcontextprotocol.io. 
Install whichever SDK matches your backend language, then follow the steps below.
# TypeScript / Node
npm install @modelcontextprotocol/sdk zod

# Python
pip install mcpBuild your MCP server
Step 1 – Register a component template
Each UI bundle is exposed as an MCP resource whose mimeType is text/html+skybridge, signaling to ChatGPT that it should treat the payload as a sandboxed HTML entry point and inject the widget runtime. In other words, text/html+skybridge marks the file as a widget template instead of generic HTML.
Register the template and include metadata for borders, domains, and CSP rules:
// Registers the Kanban widget HTML entry point served to ChatGPT.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { readFileSync } from "node:fs";

const server = new McpServer({ name: "kanban-server", version: "1.0.0" });
const HTML = readFileSync("web/dist/kanban.js", "utf8");
const CSS = readFileSync("web/dist/kanban.css", "utf8");

server.registerResource(
  "kanban-widget",
  "ui://widget/kanban-board.html",
  {},
  async () => ({
    contents: [
      {
        uri: "ui://widget/kanban-board.html",
        mimeType: "text/html+skybridge",
        text: `
<div id="kanban-root"></div>
<style>${CSS}</style>
<script type="module">${HTML}</script>
        `.trim(),
        _meta: {
          "openai/widgetPrefersBorder": true,
          "openai/widgetDomain": "https://chatgpt.com",
          "openai/widgetCSP": {
            connect_domains: ["https://chatgpt.com"], // example API domain
            resource_domains: ["https://*.oaistatic.com"], // example CDN allowlist
          },
        },
      },
    ],
  })
);Best practice: When you change your widget’s HTML/JS/CSS in a breaking way, give the template a new URI (or use a new file name) so ChatGPT always loads the updated bundle instead of a cached one.
Step 2 – Describe tools
Tools are the contract the model reasons about. Define one tool per user intent (e.g., list_tasks, update_task). Each descriptor should include:
Machine-readable name and human-readable title. 
JSON schema for arguments (zod, JSON Schema, or dataclasses). 
_meta["openai/outputTemplate"] pointing to the template URI. 
Optional _meta for invoking/invoked strings, widgetAccessible, read-only hints, etc. 
The model inspects these descriptors to decide when a tool fits the user’s request, so treat names, descriptions, and schemas as part of your UX.
Design handlers to be idempotent—the model may retry calls.
// Example app that exposes a kanban-board tool with schema, metadata, and handler.
import { z } from "zod";

server.registerTool(
  "kanban-board",
  {
    title: "Show Kanban Board",
    inputSchema: { workspace: z.string() },
    _meta: {
      "openai/outputTemplate": "ui://widget/kanban-board.html",
      "openai/toolInvocation/invoking": "Preparing the board…",
      "openai/toolInvocation/invoked": "Board ready.",
    },
  },
  async ({ workspace }) => {
    const board = await loadBoard(workspace);
    return {
      structuredContent: board.summary,
      content: [{ type: "text", text: `Showing board ${workspace}` }],
      _meta: board.details,
    };
  }
);Step 3 – Return structured data and metadata
Every tool response can include three sibling payloads:
structuredContent – concise JSON the widget uses and the model reads. Include only what the model should see. 
content – optional narration (Markdown or plaintext) for the model’s response. 
_meta – large or sensitive data exclusively for the widget. _meta never reaches the model. 
// Returns concise structuredContent for the model plus rich _meta for the widget.
async function loadKanbanBoard(workspace: string) {
  const tasks = await db.fetchTasks(workspace);
  return {
    structuredContent: {
      columns: ["todo", "in-progress", "done"].map((status) => ({
        id: status,
        title: status.replace("-", " "),
        tasks: tasks.filter((task) => task.status === status).slice(0, 5),
      })),
    },
    content: [
      {
        type: "text",
        text: "Here's the latest snapshot. Drag cards in the widget to update status.",
      },
    ],
    _meta: {
      tasksById: Object.fromEntries(tasks.map((task) => [task.id, task])),
      lastSyncedAt: new Date().toISOString(),
    },
  };
}The widget reads those payloads through window.openai.toolOutput and window.openai.toolResponseMetadata, while the model only sees structuredContent/content.
Step 4 – Run locally
Build your UI bundle (npm run build inside web/). 
Start the MCP server (Node, Python, etc.). 
Use MCP Inspector early and often to call http://localhost:<port>/mcp, list roots, and verify your widget renders correctly. Inspector mirrors ChatGPT’s widget runtime and catches issues before deployment. 
For a TypeScript project, that usually looks like:
npm run build       # compile server + widget
node dist/index.js  # start the compiled MCP serverStep 5 – Expose an HTTPS endpoint
ChatGPT requires HTTPS. During development, tunnel localhost with ngrok (or similar):
ngrok http <port>
# Forwarding: https://<subdomain>.ngrok.app -> http://127.0.0.1:<port>Use the ngrok URL when creating a connector in ChatGPT developer mode. For production, deploy to a low-latency HTTPS host (Cloudflare Workers, Fly.io, Vercel, AWS, etc.).
Example
Here’s a stripped-down TypeScript server plus vanilla widget. For full projects, reference the public Apps SDK examples.
// server/src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({ name: "hello-world", version: "1.0.0" });

server.registerResource("hello", "ui://widget/hello.html", {}, async () => ({
  contents: [
    {
      uri: "ui://widget/hello.html",
      mimeType: "text/html+skybridge",
      text: `
<div id="root"></div>
<script type="module" src="https://example.com/hello-widget.js"></script>
      `.trim(),
    },
  ],
}));

server.registerTool(
  "hello_widget",
  {
    title: "Show hello widget",
    inputSchema: { name: { type: "string" } },
    _meta: { "openai/outputTemplate": "ui://widget/hello.html" },
  },
  async ({ name }) => ({
    structuredContent: { message: `Hello ${name}!` },
    content: [{ type: "text", text: `Greeting ${name}` }],
    _meta: {},
  })
);// hello-widget.js
const root = document.getElementById("root");
const { message } = window.openai.toolOutput ?? { message: "Hi!" };
root.textContent = message;Troubleshooting
Widget doesn’t render – Ensure the template resource returns mimeType: "text/html+skybridge" and that the bundled JS/CSS URLs resolve inside the sandbox. 
window.openai is undefined – The host only injects the widget runtime for text/html+skybridge templates; double-check the MIME type and that the widget loaded without CSP violations. 
CSP or CORS failures – Use openai/widgetCSP to allow the exact domains you fetch from; the sandbox blocks everything else. 
Stale bundles keep loading – Cache-bust template URIs or file names whenever you deploy breaking changes. 
Structured payloads are huge – Trim structuredContent to what the model truly needs; oversized payloads degrade model performance and slow rendering. 
Advanced capabilities
Component-initiated tool calls
Set _meta.openai/widgetAccessible: true if the widget should call tools on its own (e.g., refresh data on a button click). That opt-in enables window.openai.callTool.
"_meta": {
  "openai/outputTemplate": "ui://widget/kanban-board.html",
  "openai/widgetAccessible": true
}Content security policy (CSP)
Provide openai/widgetCSP so the sandbox knows which domains to allow for connect-src, img-src, etc. This is required before broad distribution.
"openai/widgetCSP": {
  connect_domains: ["https://api.example.com"],
  resource_domains: ["https://persistent.oaistatic.com"]
}Widget domains
Set openai/widgetDomain when you need a dedicated origin (e.g., for API key allowlists). ChatGPT renders the widget under <domain>.web-sandbox.oaiusercontent.com, which also enables the fullscreen punch-out button.
"openai/widgetDomain": "https://chatgpt.com"Localized content
ChatGPT includes the requested locale in _meta["openai/locale"] (with _meta["webplus/i18n"] as a legacy key). Use RFC 4647 matching to select the closest supported locale, echo it back in your responses, and format numbers/dates accordingly.
Client context hints
Optional hints like _meta["openai/userAgent"] and _meta["openai/userLocation"] help tailor analytics or formatting, but never rely on them for authorization.
Component descriptions
openai/widgetDescription lets the widget describe itself to the model, reducing redundant narration.
"openai/widgetDescription": "Shows an interactive zoo directory rendered by get_zoo_animals."Once your templates, tools, and widget runtime are wired up, the fastest way to refine your app is to use ChatGPT itself: call your tools in a real conversation, watch your logs, and debug the widget with browser devtools. When everything looks good, put your MCP server behind HTTPS and your app is ready for users.
Security reminders
Treat structuredContent, content, _meta, and widget state as user-visible—never embed API keys, tokens, or secrets. 
Do not rely on _meta["openai/userAgent"], _meta["openai/locale"], or other hints for authorization; enforce auth inside your MCP server and backing APIs. 
Avoid exposing admin-only or destructive tools unless the server verifies the caller’s identity and intent. 
Next 
Build a custom UX

## https://developers.openai.com/apps-sdk/build/custom-ux

Resources 
Codex 
ChatGPT 
Apps SDK
Build apps to extend ChatGPT 
Agentic Commerce
Build commerce flows in ChatGPT 
Blog 
Search ⌘K  
Search the docs 
⌘ K / Ctrl K 
Close 
Primary navigation 
ChatGPT  
Resources Codex ChatGPT Blog  
ChatGPT 
> Apps SDK 
Home 
Changelog 
Categories 
Code 
Cookbooks 
Guides 
Videos 
Topics 
Agents 
Audio & Voice 
Image generation 
Video generation 
Tools 
Computer use 
Fine-tuning 
Scaling 
Home 
Quickstart 
Concepts 
Models 
Pricing 
Changelog 
Codex CLI 
Overview 
Features 
CLI Reference 
Configuration 
Codex IDE Extension 
Set up your IDE 
Configuration 
IDE → Cloud tasks 
Codex Cloud 
Delegate to Codex 
Environments 
Code Review 
Internet Access 
Codex SDK 
Overview 
TypeScript 
GitHub Action 
Guides 
Agents SDK 
Prompting Codex 
Slash commands 
Custom instructions with AGENTS.md 
Model Context Protocol (MCP) 
Autofix CI 
Enterprise Admin 
Security Admin 
Codex on Windows 
Integrations 
Slack 
Resources 
AGENTS.md 
Codex on GitHub 
Home 
Quickstart 
Core Concepts 
MCP Server 
User interaction 
Design guidelines 
Plan 
Research use cases 
Define tools 
Design components 
Build 
Set up your server 
Build a custom UX 
Authenticate users 
Manage state 
Examples 
Deploy 
Deploy your app 
Connect from ChatGPT 
Test your integration 
Guides 
Optimize Metadata 
Security & Privacy 
Troubleshooting 
Resources 
Reference 
App developer guidelines 
All posts 
Recent 
Using Codex for education at Dagster Labs 
How Codex ran OpenAI DevDay 2025 
Why we built the Responses API 
Developer notes on the Realtime API 
Hello, world! 
 
ChatGPT
> Apps SDK
Home
Quickstart
Core Concepts
MCP Server
User interaction
Design guidelines
Plan
Research use cases
Define tools
Design components
Build
Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy
Deploy your app
Connect from ChatGPT
Test your integration
Guides
Optimize Metadata
Security & Privacy
Troubleshooting
Resources
Reference
App developer guidelines

Build a custom UX 
Build custom UI components & app page. 
Overview
UI components turn structured tool results into a human-friendly UI. Apps SDK components are typically React components that run inside an iframe, talk to the host via the window.openai API, and render inline with the conversation. This guide describes how to structure your component project, bundle it, and wire it up to your MCP server.
You can also check out the examples repository on GitHub.
Understand the window.openai API
window.openai is the bridge between your frontend and ChatGPT. Use this quick reference to first understand how to wire up data, state, and layout concerns before you dive into component scaffolding.
declare global {
  interface Window {
    openai: API & OpenAiGlobals;
  }

  interface WindowEventMap {
    [SET_GLOBALS_EVENT_TYPE]: SetGlobalsEvent;
  }
}

type OpenAiGlobals<
  ToolInput extends UnknownObject = UnknownObject,
  ToolOutput extends UnknownObject = UnknownObject,
  ToolResponseMetadata extends UnknownObject = UnknownObject,
  WidgetState extends UnknownObject = UnknownObject
> = {
  theme: Theme;
  userAgent: UserAgent;
  locale: string;

  // layout
  maxHeight: number;
  displayMode: DisplayMode;
  safeArea: SafeArea;

  // state
  toolInput: ToolInput;
  toolOutput: ToolOutput | null;
  toolResponseMetadata: ToolResponseMetadata | null;
  widgetState: WidgetState | null;
};

type API<WidgetState extends UnknownObject> = {
  /** Calls a tool on your MCP. Returns the full response. */
  callTool: (
    name: string,
    args: Record<string, unknown>
  ) => Promise<CallToolResponse>;

  /** Triggers a followup turn in the ChatGPT conversation */
  sendFollowUpMessage: (args: { prompt: string }) => Promise<void>;

  /** Opens an external link, redirects web page or mobile app */
  openExternal(payload: { href: string }): void;

  /** For transitioning an app from inline to fullscreen or pip */
  requestDisplayMode: (args: { mode: DisplayMode }) => Promise<{
    /**
     * The granted display mode. The host may reject the request.
     * For mobile, PiP is always coerced to fullscreen.
     */
    mode: DisplayMode;
  }>;

  setWidgetState: (state: WidgetState) => Promise<void>;
};

// Dispatched when any global changes in the host page
export const SET_GLOBALS_EVENT_TYPE = "openai:set_globals";
export class SetGlobalsEvent extends CustomEvent<{
  globals: Partial<OpenAiGlobals>;
}> {
  readonly type = SET_GLOBALS_EVENT_TYPE;
}

export type CallTool = (
  name: string,
  args: Record<string, unknown>
) => Promise<CallToolResponse>;

export type DisplayMode = "pip" | "inline" | "fullscreen";

export type Theme = "light" | "dark";

export type SafeAreaInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type SafeArea = {
  insets: SafeAreaInsets;
};

export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";

export type UserAgent = {
  device: { type: DeviceType };
  capabilities: {
    hover: boolean;
    touch: boolean;
  };
};useOpenAiGlobal
Many Apps SDK projects wrap window.openai access in small hooks so views remain testable. This example hook listens for host openai:set_globals events and lets React components subscribe to a single global value:
export function useOpenAiGlobal<K extends keyof OpenAiGlobals>(
  key: K
): OpenAiGlobals[K] {
  return useSyncExternalStore(
    (onChange) => {
      const handleSetGlobal = (event: SetGlobalsEvent) => {
        const value = event.detail.globals[key];
        if (value === undefined) {
          return;
        }

        onChange();
      };

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal, {
        passive: true,
      });

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal);
      };
    },
    () => window.openai[key]
  );
}useOpenAiGlobal is an important primitive to make your app reactive to changes in display mode, theme, and “props” via subsequent tool calls.
For example, read the tool input, output, and metadata:
export function useToolInput() {
  return useOpenAiGlobal("toolInput");
}

export function useToolOutput() {
  return useOpenAiGlobal("toolOutput");
}

export function useToolResponseMetadata() {
  return useOpenAiGlobal("toolResponseMetadata");
}Persist component state, expose context to ChatGPT
Widget state can be used for persisting data across user sessions, and exposing data to ChatGPT. Anything you pass to setWidgetState will be shown to the model, and hydrated into window.openai.widgetState
Widget state is scoped to the specific widget instance that lives on a single conversation message. When your component calls window.openai.setWidgetState(payload), the host stores that payload under that widget’s message_id/widgetId pair and rehydrates it only for that widget. The state does not travel across the whole conversation or between different widgets.
Follow-up turns keep the same widget (and therefore the same state) only when the user submits through that widget’s controls—inline follow-ups, PiP composer, or fullscreen composer. If the user types into the main chat composer, the request is treated as a new widget run with a fresh widgetId and empty widgetState.
Anything you pass to setWidgetState is sent to the model, so keep the payload focused and well under 4k tokens for performance.
Trigger server actions
window.openai.callTool lets the component directly make MCP tool calls. Use this for direct manipulations (refresh data, fetch nearby restaurants). Design tools to be idempotent where possible and return updated structured content that the model can reason over in subsequent turns.
Please note that your tool needs to be marked as able to be initiated by the component.
async function refreshPlaces(city: string) {
  await window.openai?.callTool("refresh_pizza_list", { city });
}Send conversational follow-ups
Use window.openai.sendFollowUpMessage to insert a message into the conversation as if the user asked it.
await window.openai?.sendFollowUpMessage({
  prompt: "Draft a tasting itinerary for the pizzerias I favorited.",
});Request alternate layouts
If the UI needs more space—like maps, tables, or embedded editors—ask the host to change the container. window.openai.requestDisplayMode negotiates inline, PiP, or fullscreen presentations.
await window.openai?.requestDisplayMode({ mode: "fullscreen" });
// Note: on mobile, PiP may be coerced to fullscreenUse host-backed navigation
Skybridge (the sandbox runtime) mirrors the iframe’s history into ChatGPT’s UI. Use standard routing APIs—such as React Router—and the host will keep navigation controls in sync with your component.
Router setup (React Router’s BrowserRouter):
export default function PizzaListRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PizzaListApp />}>
          <Route path="place/:placeId" element={<PizzaListApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}Programmatic navigation:
const navigate = useNavigate();

function openDetails(placeId: string) {
  navigate(`place/${placeId}`, { replace: false });
}

function closeDetails() {
  navigate("..", { replace: true });
}Scaffold the component project
Now that you understand the window.openai API, it’s time to scaffold your component project.
As best practice, keep the component code separate from your server logic. A common layout is:
app/
  server/            # MCP server (Python or Node)
  web/               # Component bundle source
    package.json
    tsconfig.json
    src/component.tsx
    dist/component.js   # Build outputCreate the project and install dependencies (Node 18+ recommended):
cd app/web
npm init -y
npm install react@^18 react-dom@^18
npm install -D typescript esbuildIf your component requires drag-and-drop, charts, or other libraries, add them now. Keep the dependency set lean to reduce bundle size.
Author the React component
Your entry file should mount a component into a root element and read initial data from window.openai.toolOutput or persisted state.
We have provided some example apps under the examples page, for example, for a “Pizza list” app, which is a list of pizza restaurants.
Explore the Pizzaz component gallery
We provide a number of example components in the Apps SDK examples. Treat them as blueprints when shaping your own UI:
Pizzaz List – ranked card list with favorites and call-to-action buttons.
 
Pizzaz Carousel – embla-powered horizontal scroller that demonstrates media-heavy layouts.
 
Pizzaz Map – Mapbox integration with fullscreen inspector and host state sync.
 
Pizzaz Album – stacked gallery view built for deep dives on a single place.
 
Pizzaz Video – scripted player with overlays and fullscreen controls. 
Each example shows how to bundle assets, wire host APIs, and structure state for real conversations. Copy the one closest to your use case and adapt the data layer for your tool responses.
React helper hooks
Using useOpenAiGlobal in a useWidgetState hook to keep host-persisted widget state aligned with your local React state:
export function useWidgetState<T extends WidgetState>(
  defaultState: T | (() => T)
): readonly [T, (state: SetStateAction<T>) => void];
export function useWidgetState<T extends WidgetState>(
  defaultState?: T | (() => T | null) | null
): readonly [T | null, (state: SetStateAction<T | null>) => void];
export function useWidgetState<T extends WidgetState>(
  defaultState?: T | (() => T | null) | null
): readonly [T | null, (state: SetStateAction<T | null>) => void] {
  const widgetStateFromWindow = useWebplusGlobal("widgetState") as T;

  const [widgetState, _setWidgetState] = useState<T | null>(() => {
    if (widgetStateFromWindow != null) {
      return widgetStateFromWindow;
    }

    return typeof defaultState === "function"
      ? defaultState()
      : defaultState ?? null;
  });

  useEffect(() => {
    _setWidgetState(widgetStateFromWindow);
  }, [widgetStateFromWindow]);

  const setWidgetState = useCallback(
    (state: SetStateAction<T | null>) => {
      _setWidgetState((prevState) => {
        const newState = typeof state === "function" ? state(prevState) : state;

        if (newState != null) {
          window.openai.setWidgetState(newState);
        }

        return newState;
      });
    },
    [window.openai.setWidgetState]
  );

  return [widgetState, setWidgetState] as const;
}The hooks above make it easy to read the latest tool output, layout globals, or widget state directly from React components while still delegating persistence back to ChatGPT.
Bundle for the iframe
Once you are done writing your React component, you can build it into a single JavaScript module that the server can inline:
// package.json
{
  "scripts": {
    "build": "esbuild src/component.tsx --bundle --format=esm --outfile=dist/component.js"
  }
}Run npm run build to produce dist/component.js. If esbuild complains about missing dependencies, confirm you ran npm install in the web/ directory and that your imports match installed package names (e.g., @react-dnd/html5-backend vs react-dnd-html5-backend).
Embed the component in the server response
See the Set up your server docs for how to embed the component in your MCP server response.
Component UI templates are the recommended path for production.
During development you can rebuild the component bundle whenever your React code changes and hot-reload the server.
Previous 
Set up your server
Next 
Authenticate users

## https://developers.openai.com/apps-sdk/build/auth

Resources 
Codex 
ChatGPT 
Apps SDK
Build apps to extend ChatGPT 
Agentic Commerce
Build commerce flows in ChatGPT 
Blog 
Search ⌘K  
Search the docs 
⌘ K / Ctrl K 
Close 
Primary navigation 
ChatGPT  
Resources Codex ChatGPT Blog  
ChatGPT 
> Apps SDK 
Home 
Changelog 
Categories 
Code 
Cookbooks 
Guides 
Videos 
Topics 
Agents 
Audio & Voice 
Image generation 
Video generation 
Tools 
Computer use 
Fine-tuning 
Scaling 
Home 
Quickstart 
Concepts 
Models 
Pricing 
Changelog 
Codex CLI 
Overview 
Features 
CLI Reference 
Configuration 
Codex IDE Extension 
Set up your IDE 
Configuration 
IDE → Cloud tasks 
Codex Cloud 
Delegate to Codex 
Environments 
Code Review 
Internet Access 
Codex SDK 
Overview 
TypeScript 
GitHub Action 
Guides 
Agents SDK 
Prompting Codex 
Slash commands 
Custom instructions with AGENTS.md 
Model Context Protocol (MCP) 
Autofix CI 
Enterprise Admin 
Security Admin 
Codex on Windows 
Integrations 
Slack 
Resources 
AGENTS.md 
Codex on GitHub 
Home 
Quickstart 
Core Concepts 
MCP Server 
User interaction 
Design guidelines 
Plan 
Research use cases 
Define tools 
Design components 
Build 
Set up your server 
Build a custom UX 
Authenticate users 
Manage state 
Examples 
Deploy 
Deploy your app 
Connect from ChatGPT 
Test your integration 
Guides 
Optimize Metadata 
Security & Privacy 
Troubleshooting 
Resources 
Reference 
App developer guidelines 
All posts 
Recent 
Using Codex for education at Dagster Labs 
How Codex ran OpenAI DevDay 2025 
Why we built the Responses API 
Developer notes on the Realtime API 
Hello, world! 
 
ChatGPT
> Apps SDK
Home
Quickstart
Core Concepts
MCP Server
User interaction
Design guidelines
Plan
Research use cases
Define tools
Design components
Build
Set up your server
Build a custom UX
Authenticate users
Manage state
Examples
Deploy
Deploy your app
Connect from ChatGPT
Test your integration
Guides
Optimize Metadata
Security & Privacy
Troubleshooting
Resources
Reference
App developer guidelines

Authentication 
Authentication patterns for Apps SDK apps. 
Authenticate your users
Many Apps SDK apps can operate in a read-only, anonymous mode, but anything that exposes customer-specific data or write actions should authenticate users.
You can integrate with your own authorization server when you need to connect to an existing backend or share data between users.
Custom auth with OAuth 2.1
For an authenticated MCP server, you are expected to implement a OAuth 2.1 flow that conforms to the MCP authorization spec.
Components
Resource server – your MCP server, which exposes tools and verifies access tokens on each request. 
Authorization server – your identity provider (Auth0, Okta, Cognito, or a custom implementation) that issues tokens and publishes discovery metadata. 
Client – ChatGPT acting on behalf of the user. It supports dynamic client registration and PKCE. 
MCP authorization spec requirements
Host protected resource metadata on your MCP server 
Publish OAuth metadata from your authorization server 
Echo the resource parameter throughout the OAuth flow 
Advertise PKCE support for ChatGPT 
Here is what the spec expects, in plain language.
Host protected resource metadata on your MCP server
You need an HTTPS endpoint such as GET https://your-mcp.example.com/.well-known/oauth-protected-resource (or advertise the same URL in a WWW-Authenticate header on 401 Unauthorized responses) so ChatGPT knows where to fetch your metadata. 
That endpoint returns a JSON document describing the resource server and its available authorization servers: 
{
  "resource": "https://your-mcp.example.com",
  "authorization_servers": [
    "https://auth.yourcompany.com"
  ],
  "scopes_supported": ["files:read", "files:write"],
  "resource_documentation": "https://yourcompany.com/docs/mcp"
}Key fields you must populate: 
resource: the canonical HTTPS identifier for your MCP server. ChatGPT sends this exact value as the resource query parameter during OAuth. 
authorization_servers: one or more issuer base URLs that point to your identity provider. ChatGPT will try each to find OAuth metadata. 
scopes_supported: optional list that helps ChatGPT explain the permissions it is going to ask the user for. 
Optional extras from RFC 9728 such as resource_documentation, token_endpoint_auth_methods_supported, or introspection_endpoint make it easier for clients and admins to understand your setup. 
When you block a request because it is unauthenticated, return a challenge like:
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://your-mcp.example.com/.well-known/oauth-protected-resource",
                         scope="files:read"That single header lets ChatGPT discover the metadata URL even if it has not seen it before.
Publish OAuth metadata from your authorization server
Your identity provider must expose one of the well-known discovery documents so ChatGPT can read its configuration: 
OAuth 2.0 metadata at https://auth.yourcompany.com/.well-known/oauth-authorization-server 
OpenID Connect metadata at https://auth.yourcompany.com/.well-known/openid-configuration 
Each document answers three big questions for ChatGPT: where to send the user, how to exchange codes, and how to register itself. A typical response looks like: 
{
  "issuer": "https://auth.yourcompany.com",
  "authorization_endpoint": "https://auth.yourcompany.com/oauth2/v1/authorize",
  "token_endpoint": "https://auth.yourcompany.com/oauth2/v1/token",
  "registration_endpoint": "https://auth.yourcompany.com/oauth2/v1/register",
  "jwks_uri": "https://auth.yourcompany.com/oauth2/v1/keys",
  "code_challenge_methods_supported": ["S256"],
  "scopes_supported": ["files:read", "files:write"]
}Fields that must be correct: 
authorization_endpoint, token_endpoint, jwks_uri: the URL trio ChatGPT needs to run the OAuth authorization-code + PKCE flow end to end. 
registration_endpoint: enables dynamic client registration (DCR) so ChatGPT can mint a dedicated client_id per connector. 
code_challenge_methods_supported: must include S256, otherwise ChatGPT will refuse to proceed because PKCE appears unsupported. 
Optional fields follow RFC 8414 / OpenID Discovery; include whatever helps your administrators configure policies. 
Echo the resource parameter throughout the OAuth flow
Expect ChatGPT to append resource=https%3A%2F%2Fyour-mcp.example.com to both the authorization and token requests. This ties the token back to the protected resource metadata shown above. 
Configure your authorization server to copy that value into the access token (commonly the aud claim) so your MCP server can verify the token was minted for it and nobody else. 
If a token arrives without the expected audience or scopes, reject it and rely on the WWW-Authenticate challenge to prompt ChatGPT to re-authorize with the correct parameters. 
Advertise PKCE support for ChatGPT
ChatGPT, acting as the MCP client, performs the authorization-code flow with PKCE using the S256 code challenge so intercepted authorization codes cannot be replayed by an attacker. That protection is why the MCP authorization spec mandates PKCE. 
Your authorization server metadata therefore needs to list code_challenge_methods_supported (or equivalent) including S256. If that field is missing, ChatGPT will refuse to complete the flow because it cannot confirm PKCE support. 
OAuth flow
Provided that you have implemented the MCP authorization spec delineated above, the OAuth flow will be as follows:
ChatGPT queries your MCP server for protected resource metadata. 

ChatGPT registers itself via dynamic client registration with your authorization server using the registration_endpoint and obtains a client_id. 

When the user first invokes a tool, the ChatGPT client launches the OAuth authorization code + PKCE flow. The user authenticates and consents to the requested scopes. 

ChatGPT exchanges the authorization code for an access token and attaches it to subsequent MCP requests (Authorization: Bearer <token>). 

Your server verifies the token on each request (issuer, audience, expiration, scopes) before executing the tool. 
Client registration
The MCP spec currently requires dynamic client registration (DCR). This means that each time ChatGPT connects, it registers a fresh OAuth client with your authorization server, obtains a unique client_id, and uses that identity during token exchange. The downside of this approach is that it can generate thousands of short-lived clients—often one per user session.
To address this issue, the MCP council is currently advancing Client Metadata Documents (CMID). In the CMID model, ChatGPT will publish a stable document (for example https://openai.com/chatgpt.json) that declares its OAuth metadata and identity. Your authorization server can fetch the document over HTTPS, pin it as the canonical client record, and enforce policies such as redirect URI allowlists or rate limits without relying on per-session registration. CMID is still in draft, so continue supporting DCR until CIMD has landed.
Client identification
A frequent question is how your MCP server can confirm that a request actually comes from ChatGPT. Today the only reliable control is network-level filtering, such as allowlisting ChatGPT’s published egress IP ranges. ChatGPT does not support machine-to-machine OAuth grants such as client credentials, service accounts, or JWT bearer assertions, nor can it present custom API keys or mTLS certificates.
Once rolled out, CMID directly addresses the client identification problem by giving you a signed, HTTPS-hosted declaration of ChatGPT’s identity.
Choosing an identity provider
Most OAuth 2.1 identity providers can satisfy the MCP authorization requirements once they expose a discovery document, allow dynamic client registration, and echo the resource parameter into issued tokens.
We strongly recommend that you use an existing established identity provider rather than implementing authentication from scratch yourself.
Here are instructions for some popular identity providers.
Auth0
Guide to configuring Auth0 for MCP authorization 
Stytch
Guide to configuring Stytch for MCP authorization 
Overview guide to MCP authorization 
Overview guide to MCP authorization specifically for Apps SDK 
Implementing token verification
When the OAuth flow finishes, ChatGPT simply attaches the access token it received to subsequent MCP requests (Authorization: Bearer …). Once a request reaches your MCP server you must assume the token is untrusted and perform the full set of resource-server checks yourself—signature validation, issuer and audience matching, expiry, replay considerations, and scope enforcement. That responsibility sits with you, not with ChatGPT.
In practice you should:
Fetch the signing keys published by your authorization server (usually via JWKS) and verify the token’s signature and iss. 
Reject tokens that have expired or have not yet become valid (exp/nbf). 
Confirm the token was minted for your server (aud or the resource claim) and contains the scopes you marked as required. 
Run any app-specific policy checks, then either attach the resolved identity to the request context or return a 401 with a WWW-Authenticate challenge. 
If verification fails, respond with 401 Unauthorized and a WWW-Authenticate header that points back to your protected-resource metadata. This tells the client to run the OAuth flow again.
SDK token verification primitives
Both Python and TypeScript MCP SDKs include helpers so you do not have to wire this from scratch.
Python 
TypeScript 
Testing and rollout
Local testing – start with a development tenant that issues short-lived tokens so you can iterate quickly. 
Dogfood – once authentication works, gate access to trusted testers before rolling out broadly. You can require linking for specific tools or the entire connector. 
Rotation – plan for token revocation, refresh, and scope changes. Your server should treat missing or stale tokens as unauthenticated and return a helpful error message. 
OAuth debugging – use the MCP Inspector Auth settings to walk through each OAuth step and pinpoint where the flow breaks before you ship. 
With authentication in place you can confidently expose user-specific data and write actions to ChatGPT users.
Triggering authentication UI
ChatGPT only surfaces its OAuth linking UI when your MCP server signals that OAuth is available or necessary. Use the right mechanism for the moment: advertise OAuth support up front so the user can link before the first tool call, then fall back to runtime challenges when a request fails and needs re-authorization.
Declare OAuth up front with securitySchemes
Declaring a securitySchemes array on each tool is what tells ChatGPT whether it should prompt the user to link their account before the first call. Because that declaration happens per tool, you can run “mixed auth” servers where some tools stay anonymous while others require OAuth.
Two scheme types are available today, and you can list more than one to express optional auth:
noauth — the tool is callable anonymously; ChatGPT can run it immediately. 
oauth2 — the tool needs an OAuth 2.0 access token; include the scopes you will request so the consent screen is accurate. 
If you omit the array entirely, the tool inherits whatever default the server advertises. Declaring both noauth and oauth2 tells ChatGPT it can start with anonymous calls but that linking unlocks privileged behavior. Regardless of what you signal to the client, your server must still verify the token, scopes, and audience on every invocation.
Example (public + optional auth) – TypeScript SDK
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

declare const server: McpServer;

server.registerTool(
  "search",
  {
    title: "Public Search",
    description: "Search public documents.",
    inputSchema: {
      type: "object",
      properties: { q: { type: "string" } },
      required: ["q"],
    },
    securitySchemes: [
      { type: "noauth" },
      { type: "oauth2", scopes: ["search.read"] },
    ],
  },
  async ({ input }) => {
    return {
      content: [{ type: "text", text: `Results for ${input.q}` }],
      structuredContent: {},
    };
  }
);Example (auth required) – TypeScript SDK
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

declare const server: McpServer;

server.registerTool(
  "create_doc",
  {
    title: "Create Document",
    description: "Make a new doc in your account.",
    inputSchema: {
      type: "object",
      properties: { title: { type: "string" } },
      required: ["title"],
    },
    securitySchemes: [{ type: "oauth2", scopes: ["docs.write"] }],
  },
  async ({ input }) => {
    return {
      content: [{ type: "text", text: `Created doc: ${input.title}` }],
      structuredContent: {},
    };
  }
);Send mcp/www_authenticate for refresh or re-auth
When a tool call fails because the token is missing, expired, or lacks scopes, respond with a payload that includes _meta["mcp/www_authenticate"]. ChatGPT treats that signal like an HTTP 401 challenge and immediately re-runs the OAuth flow so the user can fix the problem.
Populate the field with the exact WWW-Authenticate header you would send over HTTP. At minimum reference your resource_metadata URL; layer on scope, error, or error_description parameters when you need to ask for more access or explain what went wrong, following RFC 9728 §5.1.
Reach for this mechanism when you need step-up scopes, a refresh after logout, or any situation where the previously issued token no longer works. It complements the proactive securitySchemes hint—it does not replace declaring OAuth support up front.
import { ToolError } from "@modelcontextprotocol/sdk/server/tool-error";

throw new ToolError("Authentication required", {
  _meta: {
    "mcp/www_authenticate":
      'Bearer resource_metadata="https://your-mcp.example.com/.well-known/oauth-protected-resource", scope="files:read"'
  },
});If your SDK returns structured objects instead of throwing errors, include the same _meta payload alongside the tool result so the client still receives the mcp/www_authenticate hint.
Previous 
Build a custom UX
Next 
Manage state

## https://developers.openai.com/apps-sdk/build/storage

Redirecting from /apps-sdk/build/storage/ to /apps-sdk/build/state-management

## Design Assets Snapshot

- `padding_guidelines.png`: Use the official spacing scale (space-64 down to space-0) for margins/padding so cards align with ChatGPT grid tokens.
- `icons_imagery_guidelines.png`: Avoid duplicating logos inside cards and stick to monochrome-outline icons; ChatGPT already surfaces your app identity.
- Apply these alongside the design-guideline rules (system colors, fonts, hierarchy) whenever you update the widget or new components.
