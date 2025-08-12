create database mi_base;
use mi_base;

create table usuarios (
id_usuario int auto_increment primary key,
nombre_completo varchar(255) not null,
identificacion varchar(50) not null unique,
correo varchar(255) default null,
telefono varchar(30) default null,
fecha_creacion timestamp default current_timestamp,
fecha_actualizacion timestamp default current_timestamp on update current_timestamp
);

create table libros (
isbn varchar(50) not null primary key,
titulo varchar(200)  not null,
anio_de_publicacion year default null,
autor varchar(100) default null,
fecha_creacion timestamp default current_timestamp,
fecha_actualizacion timestamp default current_timestamp on update current_timestamp
);


create table prestamos (
id_prestamo int auto_increment primary key,
id_usuario int,
isbn varchar(50),
fecha_prestamo date not null,
fecha_devolucion date not null,
estado enum("entregado", "retrasado", "activo") default null,
fecha_creacion timestamp default current_timestamp,
fecha_actualizacion timestamp default current_timestamp on update current_timestamp,
foreign key (id_usuario) references usuarios(id_usuario) on delete set null on update cascade,
foreign key (isbn) references libros(isbn) on delete set null on update cascade
);


-- consula join
select
prestamos.id_prestamo as prestamo,
usuarios.nombre_completo as usuario,
libros.isbn,
libros.titulo as libro
from prestamos
join usuarios on usuarios.id_usuario = prestamos.id_usuario
join libros on libros.isbn=prestamos.isbn;