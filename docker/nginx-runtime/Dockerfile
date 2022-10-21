# Use the offical nginx (based on debian)
FROM redhat/ubi8
# FROM nginx:stable
USER root
#
RUN yum remove -y nodejs
COPY nginx.repo /etc/yum.repos.d/
# Required for HTTP Basic feature
RUN yum update -y
RUN yum install -y openssl ca-certificates
#
RUN yum install -y nginx
RUN rm -rf /var/lib/apt/lists/*

ENV STI_SCRIPTS_PATH=/usr/libexec/s2i

# Required for HTTP Basic feature
# RUN apt-get update -y && \
#     apt-get install -y openssl ca-certificates && \
#     rm -rf /var/lib/apt/lists/*

# Copy our OpenShift s2i scripts over to default location
COPY ./s2i/bin/ /usr/libexec/s2i/

# Expose this variable to OpenShift
LABEL io.openshift.s2i.scripts-url=image:///usr/libexec/s2i

# Copy config from source to container
COPY nginx.conf.template /tmp/

COPY error.log /var/log/nginx
COPY access.log /var/log/nginx
RUN mkdir -p /var/cache/nginx
# =================================================================================
# Fix up permissions
# ref: https://torstenwalter.de/openshift/nginx/2017/08/04/nginx-on-openshift.html
# - S2I sripts must be executable
# - Make sure nginx can read and write it's working directories.
# - The container dynamically configures nginx on startup
# - The application artifacts live in /tmp
# ---------------------------------------------------------------------------------
RUN chmod -R g+rwx $STI_SCRIPTS_PATH
RUN chmod g+rw /var/cache/nginx \ 
               /var/run \
               /var/log/nginx \
               /etc/nginx/nginx.conf \
               /tmp
RUN chmod g+rw /var/log/nginx/error.log
RUN chmod g+rw /var/log/nginx/access.log
# =================================================================================

# Work-around for issues with S2I builds on Windows
WORKDIR /tmp

# Nginx runs on port 8080 by default
EXPOSE 8080

# Switch to usermode
USER 104