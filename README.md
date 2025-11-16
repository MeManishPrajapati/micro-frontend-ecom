# micro-frontend-ecom

A small micro-frontend demo using Webpack Module Federation. The repo contains a host application and one or more remotes (example: product listing) that are exposed as federated modules.

## Structure
- host/ — the shell application that composes remotes
- product-listing/ — example remote that exposes a Listing component
- (other remotes may be present under the repo)

## Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- Git configured (SSH keys or HTTPS remote)

## Quick start (local)
1. Install dependencies for each package:
   - cd product-listing && npm install
   - cd ../host && npm install

2. Run remotes and host (run each in its own terminal):
   - cd product-listing && npm start
   - cd host && npm start

By default remotes often run on ports like 3001; the host should be configured to consume the remote entries (check each package's webpack config).

## Notes on Module Federation and React
- Shared libs (react / react-dom) must be compatible between host and remotes.
- If you encounter runtime errors about shared modules (e.g. "Shared module is not available for eager consumption"), check the ModuleFederationPlugin shared configuration in the remote webpack config and ensure compatibility with the host.

## Contributing
PRs and issues welcome. Keep changes small and focused.

## License
Check repository root/LICENSE (if present) or assume MIT-style usage unless otherwise specified.
