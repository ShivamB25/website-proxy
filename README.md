
# Website-Reverse-Proxy

## Overview

The `website-reverse-proxy` application serves as a reverse proxy, forwarding content from a specified domain to its own domain on port 3000. This ensures that users remain on the proxy domain while rendering content from the proxied domain, including JavaScript, HTML, and CSS.

## Features

- Forwarding of HTTP and HTTPS traffic through the reverse proxy.
- Handling AJAX requests and CORS.
- URL rewriting within the proxied content.
- Periodic caching of target site content.

## Technology Stack

- Node.js
- Express
- http-proxy-middleware
- dotenv
- TypeScript
- Docker
- Kubernetes

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

- Node.js 22 (LTS)
- npm (comes with Node.js)
- Docker (for containerization)
- Kubernetes (for orchestration)

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

## Docker

### Building the Docker Image

To build the Docker image, run:

```bash
docker build -t your-dockerhub-username/website-reverse-proxy:latest .
```

### Running the Docker Container

To run the Docker container, use:

```bash
docker run -p 3000:3000 --env-file .env your-dockerhub-username/website-reverse-proxy:latest
```

## Docker Compose

### Using Docker Compose

To deploy the application using Docker Compose, create a `docker-compose.yml` file with the following content:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - TARGET_DOMAIN=${TARGET_DOMAIN}
    restart: always
```

Then run:

```bash
docker-compose up -d
```

## Kubernetes

### Deploying to Kubernetes

1. Ensure your Docker image is pushed to a container registry (e.g., Docker Hub):

   ```bash
   docker push your-dockerhub-username/website-reverse-proxy:latest
   ```

2. Create Kubernetes deployment and service manifests in a `k8s` directory:

#### `k8s/deployment.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: website-reverse-proxy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: website-reverse-proxy
  template:
    metadata:
      labels:
        app: website-reverse-proxy
    spec:
      containers:
        - name: website-reverse-proxy
          image: your-dockerhub-username/website-reverse-proxy:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: "production"
            - name: TARGET_DOMAIN
              value: "http://your-target-domain.com"
          resources:
            limits:
              memory: "512Mi"
              cpu: "500m"
            requests:
              memory: "256Mi"
              cpu: "250m"
```

#### `k8s/service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: website-reverse-proxy
spec:
  selector:
    app: website-reverse-proxy
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

3. Apply the Kubernetes manifests:

   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

## Configuration

No direct user interface is provided for configuration. Server administrators are required to edit the `.env` file to configure the target domain for the reverse proxy.

## Limitations

The application currently does not support:

- User authentication and access control mechanisms.
- Logging requests and responses.
- ~~Websockets and other real-time data channels.~~ Supports now to some extent to the Target website for faster initial load with cache
- Transforming cookies, local storage, or session data during transfer.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.