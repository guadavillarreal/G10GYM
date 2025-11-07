CREATE DATABASE gimnasio;
USE gimnasio;

CREATE TABLE personas(
id_personas INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
apellido VARCHAR(100) NOT NULL,
dni INT(20) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
telefono VARCHAR(100) NOT NULL 
);

CREATE TABLE  empleados (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    id_personas INT NOT NULL,
    cargo ENUM('admin','profesor') NOT NULL,
    FOREIGN KEY (id_personas) REFERENCES personas(id_personas)
);
CREATE TABLE  socios (
    id_socio INT AUTO_INCREMENT PRIMARY KEY,
    id_personas INT NOT NULL,
    fecha_alta DATE NOT NULL,
    FOREIGN KEY (id_personas) REFERENCES personas(id_personas)
);
CREATE TABLE usuarios (
    id_usuarios INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,       -- Asegura nombre de usuario único
    contraseña VARCHAR(255) NOT NULL,           -- Para almacenar el hash seguro
    id_personas INT NOT NULL UNIQUE,            -- Clave foránea a la tabla personas
    rol ENUM('socio', 'empleado') NOT NULL,     -- Indica el tipo de acceso
    
    FOREIGN KEY (id_personas) REFERENCES personas(id_personas)
);

CREATE TABLE planes (
    id_plan INT AUTO_INCREMENT PRIMARY KEY,
    nombre_plan VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    duracion_meses INT NOT NULL
);


CREATE TABLE metodos_pago (
    id_metodo_pago INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('tarjeta_credito','tarjeta_debito','efectivo','transferencia','promocion') NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE contrataciones (
    id_contratacion INT AUTO_INCREMENT PRIMARY KEY,
    id_socio INT NOT NULL,
    id_plan INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    FOREIGN KEY (id_socio) REFERENCES socios(id_socio),
    FOREIGN KEY (id_plan) REFERENCES planes(id_plan)
);

CREATE TABLE comprobantes (
    id_comprobante INT AUTO_INCREMENT PRIMARY KEY,
    id_socio INT NOT NULL,
    fecha DATE NOT NULL,
    monto_total DECIMAL(12,2) NOT NULL,
    id_metodo_pago INT NOT NULL,
    detalle TEXT,
    FOREIGN KEY (id_socio) REFERENCES socios(id_socio),
    FOREIGN KEY (id_metodo_pago) REFERENCES metodos_pago(id_metodo_pago)
);

CREATE TABLE comprobante_contrataciones (
    id_comprobante INT NOT NULL,
    id_contratacion INT NOT NULL,
    PRIMARY KEY (id_comprobante, id_contratacion),
    FOREIGN KEY (id_comprobante) REFERENCES comprobantes(id_comprobante) ON DELETE CASCADE,
    FOREIGN KEY (id_contratacion) REFERENCES contrataciones(id_contratacion) ON DELETE CASCADE
);

SHOW TABLES;

CREATE TABLE clases (
    id_clase INT AUTO_INCREMENT PRIMARY KEY,
    nombre_clase VARCHAR(100) NOT NULL,
    descripcion TEXT,
    cupo_maximo INT NOT NULL,
    id_instructor INT,
    FOREIGN KEY (id_instructor) REFERENCES empleados(id_empleado)
);

CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_socio INT NOT NULL,
    id_clase INT NOT NULL,
    fecha_reserva DATE NOT NULL,
    FOREIGN KEY (id_socio) REFERENCES socios(id_socio),
    FOREIGN KEY (id_clase) REFERENCES clases(id_clase)
);

CREATE TABLE equipos (
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    ubicacion VARCHAR(50),
    estado ENUM('disponible','mantenimiento','fuera de servicio') DEFAULT 'disponible',
    fecha_compra DATE
);
CREATE TABLE mantenimientos (
    id_mantenimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_equipo INT NOT NULL,
    fecha DATE NOT NULL,
    tipo ENUM('preventivo','correctivo','inspeccion') NOT NULL,
    observaciones TEXT,
    responsable VARCHAR(100),
    costo DECIMAL(10,2),
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);

CREATE TABLE rutinas (
    id_rutina INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rutina VARCHAR(100) NOT NULL,
    descripcion TEXT,
    objetivo VARCHAR(100),
    id_empleado INT,
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

CREATE TABLE rutinas_equipos (
    id_rutina INT NOT NULL,
    id_equipo INT NOT NULL,
    PRIMARY KEY (id_rutina, id_equipo),
    FOREIGN KEY (id_rutina) REFERENCES rutinas(id_rutina),
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);
CREATE TABLE rutinas_asignadas (
    id_rutina INT NOT NULL,
    id_socio INT NOT NULL,
    fecha_asignacion DATE NOT NULL,
    PRIMARY KEY (id_rutina, id_socio),
    FOREIGN KEY (id_rutina) REFERENCES rutinas(id_rutina),
    FOREIGN KEY (id_socio) REFERENCES socios(id_socio)
);

CREATE TABLE dietas (
    id_dieta INT AUTO_INCREMENT PRIMARY KEY,
    nombre_dieta VARCHAR(100) NOT NULL,
    descripcion TEXT,
    id_empleado INT,
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

CREATE TABLE dietas_asignadas (
    id_dieta INT NOT NULL,
    id_socio INT NOT NULL,
    fecha_asignacion DATE NOT NULL,
    PRIMARY KEY (id_dieta, id_socio),
    FOREIGN KEY (id_dieta) REFERENCES dietas(id_dieta),
    FOREIGN KEY (id_socio) REFERENCES socios(id_socio)
);

CREATE TABLE progresos (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    id_socio INT NOT NULL,
    fecha DATE NOT NULL,
    peso DECIMAL(6,2),
    altura DECIMAL(6,2),
    grasa_corporal DECIMAL(5,2),
    musculo DECIMAL(5,2),
    observaciones TEXT,
    FOREIGN KEY (id_socio) REFERENCES socios(id_socio)
);
CREATE TABLE clases_equipos (
    id_clase INT NOT NULL,
    id_equipo INT NOT NULL,
    PRIMARY KEY (id_clase, id_equipo),
    FOREIGN KEY (id_clase) REFERENCES clases(id_clase),
    FOREIGN KEY (id_equipo) REFERENCES equipos(id_equipo)
);