FROM python:alpine

MAINTAINER Tyler Walker "twalkerweb@gmail.com"

COPY app /app
WORKDIR /app
RUN ls -l  
RUN pip install -r requirements.txt

ENTRYPOINT ["python"]
CMD ["app.py"]

