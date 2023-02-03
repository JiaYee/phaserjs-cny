1. Host a local server by running "npm run dev"
2. Change something in "index.html" and watch the HMR (Hot Module Replacement) magic!
3. Copy paste and replace "index.html" into "dist" folder, and deploy to your server.

Deploying to Firebase (Optional)

1. Run "firebase init"
2. Choose your project
3. Choose "Hosting"
4. Use "dist" as destination
5. Use "Yes" to reroute all links to "index.html"
6. Change "site" in "firebase.json" shall your project have multiple sites.
7. Use "No" to not overwriting our "index.html"
8. Run "npm run deploy"
