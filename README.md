# KT Nestjs Base

Support for CRUD api generic and dynamic filter

# Getting started
```
cd existing_repo
git remote add origin https://git.savvycom.vn/nodejs-base/be/packages/kt-nestjs-base.git
git branch -M main
git push -uf origin main
```

# Publish package
```
echo "@gym-project:registry=https://git.savvycom.vn/api/v4/projects/1208/packages/npm/ 
        //git.savvycom.vn/api/v4/projects/1208/packages/npm/:_authToken=<yourPersonalAccessToken>" >.npmrc 
npm install
npm run build
npm publish --registry https://git.savvycom.vn/api/v4/projects/1208/packages/npm/
```
yourPersonalAccessToken - https://git.savvycom.vn/-/profile/personal_access_tokens

