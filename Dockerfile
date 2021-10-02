FROM koush/node-opencv

COPY ./opencv4nodejs-install /opencv4nodejs-install

WORKDIR /opencv4nodejs-install/opencv4nodejs
RUN npm install

RUN echo building
RUN CFLAGS=$(pkg-config --cflags opencv4) \
    CXXFLAGS=$(pkg-config --cflags opencv4) \
    LDFLAGS="-Wl,--no-as-needed $(pkg-config --libs opencv4)" \
    npm run build
