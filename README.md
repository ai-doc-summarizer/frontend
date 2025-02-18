# Frontend for ai-doc-summarizer


## Setup instructions
In order to run the Frontend, you need to run the Backend. Here you can get it running: https://github.com/ai-doc-summarizer/backend
First of all, you need to follow this steps:

1. Download and install Next.js:
https://nodejs.org/es/download
1. Clone this repo: 
    ```bash
    git clone https://github.com/ai-doc-summarizer/frontend
    ```
2. Install Node Dependencies:
    ```bash
    npm run install
    ```
2. Run server:
    ```bash
    npm run dev
    ```
## Documentation
### Technical choices
#### Node.js.
I decided going with Node.js cause I use it as well in the Backend and wanted to be consistent, also I´m familiar to it.
#### Next.js and React. 
I used React and Next.js because they offer a powerful, efficient, and scalable development stack. Next.js provides server-side rendering (SSR) and static site generation (SSG), improving performance and SEO. Additionally, it integrates seamlessly with Vercel for easy deployment.
#### Typescript. 
In addition, I chose TypeScript to make the code easier for you to understand and to minimize errors on my end, thanks to its strongly typed nature.
#### Tailwind.
For styling, I selected Tailwind CSS due to its lightweight utility-based approach, allowing for fast and flexible UI design. My initial choice was Material UI, but I found it too heavy for this project’s needs.
#### Fetch and Next Server.
I used the Fetch API to handle network requests efficiently, ensuring smooth interaction between the frontend and backend. Also, is native!, we don´t need extra dependencies.

### Limitations
1. We could improve error handling signfically, also provide better UX to the user.
2. Because of time limitations, we don´t handle .txt. This is a Backend limitation, Frontend is ready to handle it.

