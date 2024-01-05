# Website-Reverse-Proxy

## Overview

The `website-reverse-proxy` application serves as a reverse proxy, forwarding content from a specified domain to its own domain on port 3000. This ensures that users remain on the proxy domain while rendering content from the proxied domain, including JavaScript, HTML, and CSS.

## Features

- Forwarding of HTTP and HTTPS traffic through the reverse proxy.
- Handling AJAX requests and CORS.
- URL rewriting within the proxied content.

## Technology Stack

- Node.js
- Express
- http-proxy-middleware
- dotenv
- TypeScript

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

- Node.js (LTS)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd website-reverse-proxy
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file and adjust the `TARGET_DOMAIN`:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and set the `TARGET_DOMAIN` to the domain you want to proxy.

4. Build and run the project:

   - To start in development mode with hot-reloading:

     ```bash
     npm run dev
     ```

   - To start the application in production mode:

     ```bash
     npm start
     ```

   The server will start listening on port 3000. Navigate to `http://localhost:3000` to interact with the reverse proxy.

## Configuration

No direct user interface is provided for configuration. Server administrators are required to edit the `.env` file to configure the target domain for the reverse proxy.

## Limitations

The application currently does not support:

- User authentication and access control mechanisms.
- Logging requests and responses.
- Websockets and other real-time data channels.
- Transforming cookies, local storage, or session data during transfer.

## License

This project is licensed under the MIT - see the LICENSE.md file for details
