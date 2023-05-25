import { s as supabase } from "./main-5054c098.js";
console.log("Conecciton done");
class ReservaLibros {
  // Mapping de propiedades de la tabla perfiles
  constructor(id = null, id_usuario = null, id_libro = null, fecha_reserva = null, fecha_entrega = null, estado = null) {
    this.id = id;
    this.id_usuario = id_usuario;
    this.id_libro = id_libro;
    this.fecha_reserva = fecha_reserva;
    this.fecha_entrega = fecha_entrega;
    this.estado = estado;
  }
  static async getAllReservas() {
    const { data: reservas, error } = await supabase.from("reserva_libros").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return reservas.map(({ id, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado }) => {
      return new ReservaLibros(id, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado);
    });
  }
  static async getReservasById(id) {
    const { data: reservas, error } = await supabase.from("reserva_libros").select("*").eq("id", `${id}`);
    if (error) {
      throw new Error(error.message);
    }
    return reservas.map(({ id: id2, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado }) => {
      return new ReservaLibros(id2, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado);
    });
  }
  static async getReservasByUserId(id) {
    const { data: reservas, error } = await supabase.from("reserva_libros").select("*").eq("id_usuario", `${id}`);
    if (error) {
      throw new Error(error.message);
    }
    return reservas.map(({ id: id2, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado }) => {
      return new ReservaLibros(id2, id_usuario, id_libro, fecha_reserva, fecha_entrega, estado);
    });
  }
  //
  static async estado(libroId) {
    const { data, error } = await supabase.from("reserva_libros").select("estado").eq("id_libro", `${libroId}`);
    if (data[data.length - 1].estado === "Reservado") {
      swal({ title: "No disponible", icon: "warning" });
    } else {
      console.log("Este es el estado", data[data.length - 1]);
      console.log("Dispo");
      const userId = document.querySelector("#guardarUser-id");
      swal({ title: "Confirmado", icon: "success" });
      await ReservaLibros.reservar(libroId, userId.value);
    }
  }
  //
  static async reservar(libro, usuario) {
    const { data, error } = await supabase.from("reserva_libros").insert([
      { id_usuario: `${usuario}`, id_libro: `${libro}`, estado: "Reservado" }
    ]);
    if (error) {
      swal({ title: "Error", text: "Ya tienes una reserva en curso", icon: "warning" });
    } else {
      swal({ title: "Reservado", text: `Has reservado el libro ${libro}`, icon: "success" });
    }
  }
  static async confirmarDev(libro, usuario) {
    const { data, error } = await supabase.from("reserva_libros").update({ estado: "Devuelto" }).match({ id_usuario: usuario, id_libro: libro, estado: "Pending" });
    if (error) {
      swal({ title: "Error", text: "No se ha podido devolver", icon: "warning" });
    } else {
      swal({ title: "Devuelto", text: `Gracias, ya puedes reservar un nuevo libro `, icon: "success" });
    }
  }
  static async devolver(libro, usuario) {
    const { data, error } = await supabase.from("reserva_libros").update({ estado: "Pending" }).match({ id_usuario: usuario, id_libro: libro, estado: "Reservado" });
    if (error) {
      swal({ title: "Error", text: "No se ha podido devolver", icon: "warning" });
    } else {
      swal({ title: "Devuelto", text: `Gracias, ya puedes reservar un nuevo libro `, icon: "success" });
    }
  }
}
console.log("Conecciton done");
class Libros {
  constructor(id = null, created_at = null, titulo = null, autor = null, isbn = null, fecha_publicacion = null, imagen = null, descripcion = null) {
    this.id = id;
    this.created_at = created_at;
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.fecha_publicacion = fecha_publicacion;
    this.imagen = imagen;
    this.descripcion = descripcion;
  }
  static async getAll() {
    const { data: libros, error } = await supabase.from("libros").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return libros.map(({ id, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion }) => {
      return new Libros(id, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion);
    });
  }
  static async getAllByID(id) {
    const { data: libros, error } = await supabase.from("libros").select("*").eq("id", `${id}`);
    if (error) {
      throw new Error(error.message);
    }
    return libros.map(({ id: id2, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion }) => {
      return new Libros(id2, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion);
    });
  }
  static async getSearch(texto) {
    const { data: libros, error } = await supabase.from("libros").select("*").ilike("titulo", `%${texto}%`);
    if (error) {
      throw new Error(error.message);
    }
    return libros.map(({ id, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion }) => {
      return new Libros(id, created_at, titulo, autor, isbn, fecha_publicacion, imagen, descripcion);
    });
  }
  static async eliminar(libroId) {
    const { data, error } = await supabase.from("libros").delete().match({ id: `${libroId}` });
    if (error) {
      swal({ title: "No se ha podido eliminar", text: `${error}`, icon: "warning" });
    } else {
      swal({ title: "Eliminado Correctamente", icon: "success" });
    }
  }
  static async addLibro(dataLibro) {
    const { data, error } = await supabase.from("libros").insert({
      titulo: dataLibro.titulo,
      autor: dataLibro.autor,
      isbn: dataLibro.isbn,
      fecha_publicacion: dataLibro.fecha,
      imagen: dataLibro.imagen
    });
    if (error) {
      swal({ title: "No se ha podido añadir el libro", text: `${error}`, icon: "warning" });
    } else {
      swal({ title: "Añadir Correctamente", icon: "success" });
    }
  }
  static async updateLibro(dataLibro) {
    const { data, error } = await supabase.from("libros").update({
      titulo: `${dataLibro.titulo}`,
      autor: `${dataLibro.autor}`,
      isbn: `${dataLibro.isbn}`,
      fecha_publicacion: `${dataLibro.fecha}`,
      imagen: `${dataLibro.imagen}`,
      descripcion: `${dataLibro.descripcion}`
    }).match({ id: `${dataLibro.id}` });
    if (error) {
      swal({ title: "No se ha podido actualizar el libro", text: `${error}`, icon: "warning" });
    } else {
      swal({ title: "Actualizado", icon: "success" });
    }
  }
}
export {
  Libros as L,
  ReservaLibros as R
};
