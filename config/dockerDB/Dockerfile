FROM postgres:12

FROM library/postgres

ENV POSTGRES_USER docker
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB bodenchufe

ADD init.sql /docker-entrypoint-initdb.d

EXPOSE 5432