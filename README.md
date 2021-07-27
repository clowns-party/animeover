<p align="center">
  <img src="https://avatars.githubusercontent.com/u/71570015?s=200&v=4" alt="Logo" width="150" height="150" />
</p>
<h1 align="center">@clownsparty/animeoverapi</h1>
<p align="center">
<img src="https://img.shields.io/badge/contributors-2-red"/>
<img src="https://img.shields.io/badge/packages-1-blue"/>
<img src="https://img.shields.io/badge/release-v0.0-blue"/>
<img src="https://img.shields.io/badge/typescript-4.1.5-blue"/>
<img src="https://img.shields.io/badge/tsoa-3.5.2-blue"/>
<img src="https://img.shields.io/badge/express-4.17.1-blue"/>
<img src="https://img.shields.io/badge/firebase-8.2.9-blue"/>
	</p>

<p align="center">
  <b>The pet project is like a website with a database of anime series and   <br/>
  movies, with the ability to add a user to the list.</b>
  <br/>
  <sub>
  The basis of the database was to take the <code>anime-offline-database.json</code> from manami-project. This repository is   <br/>
 released as a backend part of the project.<sub>
</p>
<br/>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

<br/>

## ➤ Links

[![production](https://img.shields.io/badge/swagger-v1-blue)](https://animeover-api.herokuapp.com/docs/)



<br/>

## ➤ Launch

### 1. Requirements

To run project, you need to install Git, Node.js (version >= 14), and Yarn package manager.

- Git can be installed from the official site: https://git-scm.com/downloads
- Node.js can be installed from the official site: https://nodejs.org
- After Node.js is installed, you can run the following command in the console to install Yarn:

`$ npm install --global yarn `

### 2. Clone project

Go to the directory where your projects are stored, and run the following command to clone the project code.

`$ git clone https://github.com/clowns-party/animeover.git `

### 3. Install project dependencies

Now, go to alium-frontend project folder, and execute in the console:

`$ yarn install `

### 4. Create a file based on env.example
    FB_APIKEY 
    FB_AUTHDOMAIN
    FB_PROJECTID
    FB_STORAGEBUCKET
    FB_SENDERID
    FB_APPID=1
    FB_MEASUREMENTID
    PRIVATE_KEY_ID
    PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----\n",
    SECURETOKEN_API=console.cloud.google.com take api key

### 5. Start local development mode

Being in the project directory, execute in the console:

`$ yarn generate`

Generate swagger and routes.

`$ yarn dev `

Generate are firebase config and start nodemon.



<br/>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Features
- Search
- User anime list
- Filters
- Ongoing "integrate with [shikimori](https://shikimori.one/)"
- Anime list based on anime-offline-database.json
- Authorization, generate custom token by firebase-admin, generate refresh-token
- Pagination
- Rate and review for anime
- Calendar "integrate with [jikan](https://jikan.docs.apiary.io/#reference/0/schedule)"
<br/>


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ FAQ
### Why is the service not available?

Most likely, the firebase quota has run out, try waiting one day and trying again, since we use the basic plan.	  
	
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)
	  
	  

## ➤ Contributors


| [<img alt="sieugene" src="https://avatars.githubusercontent.com/u/37626545?v=4" width="100">](https://sieugene.vercel.app) | [<img alt="dLebrov" src="https://avatars.githubusercontent.com/u/51052818?v=4" width="100">](https://github.com/dLebrov) |
|:--------------------------------------------------:|:--------------------------------------------------:|
| [Sieugene](https://sieugene.vercel.app) | [dLebrov](https://github.com/dLebrov) |

