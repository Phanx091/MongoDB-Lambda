FROM public.ecr.aws/lambda/nodejs:14

# Copy function code
# COPY dist/index.js ./
# COPY dist/index.js.map ./

# Set the CMD to your handler
CMD [ "index.handler" ]