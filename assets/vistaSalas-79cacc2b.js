import { s as supabase } from "./main-f8b5675b.js";
console.log("Conecciton done");
class ReservaSalas {
  // Mapping de propiedades de la tabla perfiles
  constructor(id = null, created_at = null, usuario_id = null, sala_id = null, fecha_reserva = null, fecha_fin = null, estado = null) {
    this.id = id;
    this.created_at = created_at;
    this.usuario_id = usuario_id;
    this.sala_id = sala_id;
    this.fecha_reserva = fecha_reserva;
    this.fecha_fin = fecha_fin;
    this.estado = estado;
  }
  static async getAllReservas() {
    const { data: reservas, error } = await supabase.from("reserva_sala").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return reservas.map(({ id, created_at, usuario_id, sala_id, fecha_reserva, fecha_fin, estado }) => {
      return new ReservaSalas(id, created_at, usuario_id, sala_id, fecha_reserva, fecha_fin, estado);
    });
  }
  static async reservar(sala, usuario) {
    const { data, error } = await supabase.from("reserva_sala").insert([
      { usuario_id: `${usuario}`, sala_id: `${sala}`, estado: "Reservado" }
    ]);
    if (error) {
      swal({ title: "Error", text: "Ya tienes una reserva en curso o no está disponible", icon: "warning" });
    } else {
      swal({ title: "Reservado", text: `Has reservado la sala ${sala}`, icon: "success" });
    }
  }
  static async getReservasByUserId(id) {
    const { data: reservas, error } = await supabase.from("reserva_sala").select("*").eq("usuario_id", `${id}`);
    if (error) {
      throw new Error(error.message);
    }
    return reservas.map(({ id: id2, created_at, usuario_id, sala_id, fecha_reserva, fecha_fin, estado }) => {
      return new ReservaSalas(id2, created_at, usuario_id, sala_id, fecha_reserva, fecha_fin, estado);
    });
  }
  static async update(dataSala) {
    const { data: reservas, error } = await supabase.from("reserva_sala").update({
      usuario_id: `${dataSala.id}`,
      fecha_reserva: `${dataSala.fecha}`,
      estado: "Reservado"
    }).match({ sala_id: `${dataSala.sala}` });
    if (error) {
      swal({ title: "Error", text: "Ya tienes una reserva en curso o no está disponible", icon: "warning" });
    } else {
      swal({ title: "Reservado", text: `Has reservado la sala ${dataSala.sala}`, icon: "success" });
      return reservas.map(({ id, created_at, usuario_id, sala_id, fecha_reserva, fecha_fin, estado }) => {
        return new ReservaSalas(id, created_at, usuario_id, sala_id, fecha_reserva, fecha_fin, estado);
      });
    }
  }
  static async liberar(dataSala) {
    const { data: reservas, error } = await supabase.from("reserva_sala").update({
      usuario_id: null,
      estado: "Disponible"
    }).match({ sala_id: `${dataSala}` });
    if (error) {
      swal({ title: "Error", text: "No se ha podido liberar", icon: "warning" });
    } else {
      swal({ title: "Sala liberada", text: `Has liberado la sala: ${dataSala}`, icon: "success" });
    }
  }
}
console.log("Conecciton done");
class Salas {
  constructor(id = null, created_at = null, nombre = null, aforo = null, sala_descripcion = null, imagen = null) {
    this.id = id;
    this.created_at = created_at;
    this.nombre = nombre;
    this.aforo = aforo;
    this.sala_descripcion = sala_descripcion;
    this.imagen = imagen;
  }
  static async getAllSalas() {
    const { data: salas, error } = await supabase.from("salas").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return salas.map(({ id, created_at, nombre, aforo, sala_descripcion, imagen }) => {
      return new Salas(id, created_at, nombre, aforo, sala_descripcion, imagen);
    });
  }
  static async getSearchSalas(texto) {
    const { data: salas, error } = await supabase.from("salas").select("*").ilike("nombre", `%${texto}%`);
    if (error) {
      throw new Error(error.message);
    }
    return salas.map(({ id, created_at, nombre, aforo, sala_descripcion, imagen }) => {
      return new Salas(id, created_at, nombre, aforo, sala_descripcion, imagen);
    });
  }
  static async eliminar(salaId) {
    const { data, error } = await supabase.from("salas").delete().match({ id: `${salaId}` });
    if (error) {
      swal({ title: "No se ha podido eliminar", text: `${error}`, icon: "warning" });
    } else {
      swal({ title: "Eliminado Correctamente", icon: "success" });
    }
  }
  static async addSala(dataSala) {
    const { data, error } = await supabase.from("salas").insert({
      nombre: dataSala.nombre,
      sala_descripcion: dataSala.descripcion,
      aforo: dataSala.aforo,
      imagen: dataSala.imagen
    });
    if (error) {
      swal({ title: "No se ha podido añadir la sala", text: `${error}`, icon: "warning" });
    } else {
      swal({ title: "Añadido Correctamente", icon: "success" });
    }
  }
  static async updateSala(dataSala) {
    const { data, error } = await supabase.from("salas").update({
      nombre: `${dataSala.nombre}`,
      sala_descripcion: `${dataSala.descripcion}`,
      aforo: `${dataSala.aforo}`,
      imagen: `${dataSala.imagen}`
    }).match({ id: `${dataSala.id}` });
    if (error) {
      swal({ title: "No se ha podido actualizar la sala", text: `${error}`, icon: "warning" });
    } else {
      swal({ title: "Actualizado", icon: "success" });
    }
  }
  static async estado(salaId) {
    const { data, error } = await supabase.from("reserva_sala").select("estado").eq("id", `${salaId}`);
    if (data && data.length > 0 && data[0].estado == "Reservado") {
      swal({ title: "No disponible", icon: "warning" });
    } else {
      swal({ title: "Confirmado", icon: "success" });
      const userId = document.querySelector("#guardarUser-id");
      const fecha_actual = new Date().toISOString().substring(0, 10);
      const dataSala = {
        id: userId.value,
        fecha: fecha_actual,
        sala: salaId
      };
      console.log("problema?", dataSala.id, dataSala.fecha, dataSala.sala);
      await ReservaSalas.update(dataSala);
    }
  }
  static async getByID(id) {
    const { data: salas, error } = await supabase.from("salas").select("*").eq("id", `${id}`);
    if (error) {
      throw new Error(error.message);
    }
    return salas.map(({ id: id2, created_at, nombre, aforo, sala_descripcion, imagen }) => {
      return new Salas(id2, created_at, nombre, aforo, sala_descripcion, imagen);
    });
  }
}
export {
  ReservaSalas as R,
  Salas as S
};
