echo "Enter your commit message"
read message
cd client
npm run build-live
cd ..
git add .
git commit -m"${message}"
echo "Pushing data to remote server!!!"
git push