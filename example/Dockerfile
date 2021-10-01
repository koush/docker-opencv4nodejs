FROM opencv4nodejs

WORKDIR /opencv4nodejs-install/opencv4nodejs
RUN npm link
WORKDIR /app
COPY example.js example.js
COPY *.jpg .
RUN npm link @koush/opencv4nodejs
CMD node example.js