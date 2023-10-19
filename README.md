# DimoVR: frontend

This frontend project is based on VueJS and related to DimoVR project.
Link to the backend of application : https://github.com/justOne6/dimo_vr_backend

## Project setup

### Run in docker

To avoid downloading node on your computer you can use docker in local.

Use command via makefile :

- make build (build docker image)
- make run (create the container and enter into)

When in container you can use :

- `npm install`

and then : `npm run serve`

You will find your work preview at : http://localhost:8080/

When you'll modify your work server is automatly update no need to build docker again.

### Run by common way :

- npm install
- npm run serve

And then it's will be at : http://localhost:8080/
