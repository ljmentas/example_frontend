#!/bin/bash
npm install
npm run-script build
docker build -t ljmentas/frontend:latest .
docker push ljmentas/frontend:latest
