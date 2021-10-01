const fs = require('fs');
const { CV_32F, Size } = require('@koush/opencv4nodejs');
const cv = require('@koush/opencv4nodejs')

const l = fs.readFileSync('l.jpg');
const r = fs.readFileSync('r.jpg');
let limg = cv.imdecode(l);
let rimg = cv.imdecode(r);

limg = limg.cvtColor(cv.COLOR_BGR2GRAY);
limg = cv.gaussianBlur(limg, new Size(21, 21), 0);

rimg = rimg.cvtColor(cv.COLOR_BGR2GRAY);
rimg = cv.gaussianBlur(rimg, new Size(21, 21), 0);

const frameDelta = limg.absdiff(rimg)
let thresh = frameDelta.threshold(25, 255, cv.THRESH_BINARY)

cv.imwrite('test.jpg', frameDelta);

thresh = thresh.dilate(cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(4, 4)),new cv.Point(-1, -1), 2)
const cnts = thresh.copy().findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE).filter(cnt => cnt.area > 1000);
cnts.forEach(c => console.log(c.boundingRect()));
