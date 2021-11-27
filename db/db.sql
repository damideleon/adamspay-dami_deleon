
CREATE TABLE public.producto (
                producto_id INTEGER NOT NULL,
                producto_descripcion VARCHAR(300) NOT NULL,
                producto_precio NUMERIC NOT NULL,
                product_img VARCHAR NOT NULL,
                existencia NUMERIC NOT NULL,
                CONSTRAINT producto_pk PRIMARY KEY (producto_id)
);


CREATE TABLE public.usuarios (
                user_id INTEGER NOT NULL,
                password VARCHAR NOT NULL,
                usuario VARCHAR NOT NULL,
                nombre VARCHAR NOT NULL,
                apellido VARCHAR NOT NULL,
                celular VARCHAR NOT NULL,
                fechanac DATE NOT NULL,
                CONSTRAINT user_id PRIMARY KEY (user_id)
);


CREATE TABLE public.cliente (
                cliente_id INTEGER NOT NULL,
                cliente_nombre VARCHAR NOT NULL,
                cliente_user VARCHAR NOT NULL,
                cliente_password VARCHAR NOT NULL,
                cliente_mail VARCHAR NOT NULL,
                cliente_celular VARCHAR NOT NULL,
                cliente_fechanacimiento DATE NOT NULL,
                user_id INTEGER NOT NULL,
                CONSTRAINT cliente_pk PRIMARY KEY (cliente_id)
);


CREATE TABLE public.venta (
                venta_id INTEGER NOT NULL,
                cliente_id INTEGER NOT NULL,
                venta_precio_total VARCHAR NOT NULL,
                venta_fecha_hora TIMESTAMP NOT NULL,
                venta_cobro NUMERIC NOT NULL,
                venta_estado VARCHAR NOT NULL,
                venta_cobro_estado VARCHAR NOT NULL,
                venta_cobrada_fechahora TIMESTAMP NOT NULL,
                CONSTRAINT venta_pk PRIMARY KEY (venta_id)
);


CREATE TABLE public.ctrl_productos (
                producto_id INTEGER NOT NULL,
                venta_id INTEGER NOT NULL,
                cantidad NUMERIC NOT NULL,
                CONSTRAINT ctrl_productos_pk PRIMARY KEY (producto_id, venta_id)
);


ALTER TABLE public.ctrl_productos ADD CONSTRAINT producto_ctrl_productos_fk
FOREIGN KEY (producto_id)
REFERENCES public.producto (producto_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.cliente ADD CONSTRAINT user_cliente_fk
FOREIGN KEY (user_id)
REFERENCES public.usuarios (user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.venta ADD CONSTRAINT cliente_venta_fk
FOREIGN KEY (cliente_id)
REFERENCES public.cliente (cliente_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.ctrl_productos ADD CONSTRAINT venta_ctrl_productos_fk
FOREIGN KEY (venta_id)
REFERENCES public.venta (venta_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;
