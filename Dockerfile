FROM node:10.13-slim
COPY dist /nodejs/Project/jj/
RUN npm install -g serve
WORKDIR /nodejs/Project

ENV TZ=utc-8 

CMD ["serve", "-s", "jj"]

