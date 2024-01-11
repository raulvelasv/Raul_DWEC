import { User } from "./User.js";

/** ATENCION: este código se puede optimizar evitando duplicidad
 * y siguiendo SRP (Single Responsibility Principle).
 * La finalidad es comprender el asincronismo y la diferencia
 * de gestionarlo que tienen las funciones forEach y map
 */

/** En este metodo usaremos un for tradicional para resolver el problema.
 * La solicion es totalmente sincrona y por lo tanto más lenta.
 * Realizamos una petición transporte por cada usuario.
 */
export async function getUsersFor() {
  const usuariosFetch = await fetch(
    "http://34.90.153.139/ejercicios/usuarios.php"
  );
  const users = await usuariosFetch.json();

  let resultado = [];

  for (let i = 0; i < users.length; i++) {
    const transportFetch = await fetch(
      "http://34.90.153.139/ejercicios/transporte.php?id=" + users[i].transport
    );
    const transporte = await transportFetch.json();

    const usuario = new User(
      users[i].iduser,
      users[i].username,
      users[i].name,
      users[i].surname,
      users[i].sex,
      transporte
    );

    resultado.push(usuario);
  }

  return resultado;
}

/** En este metodo usaremos un forEach realizando una petición
 * transporte por cada usuario
 */
export async function getUsersForEach() {
  const usuariosFetch = await fetch(
    "http://34.90.153.139/ejercicios/usuarios.php"
  );
  const users = await usuariosFetch.json();

  let resultado = [];
  const transportesPromesas = [];
  users.forEach((user) => {
    const transportFecth = fetch(
      "http://34.90.153.139/ejercicios/transporte.php?id=" + user.transport
    ).then((r) => r.json());
    transportesPromesas.push(transportFecth);

    const usuario = new User(
      user.iduser,
      user.username,
      user.name,
      user.surname,
      user.sex,
      user.transport
    );
    resultado.push(usuario);
  });
  const respuestaTrasportes = await Promise.all(transportesPromesas);

  for (let i = 0; i < resultado.length; i++) {
    resultado[i].transporte = respuestaTrasportes.find((transport) => {
      return transport.id === resultado[i].transporte;
    });
  }

  return resultado;
}

/*********************** map vs forEach *****************************/
/*              map retorna un array y el forEAch no                */
/*              map bloquea y forEach no                            */

/** En este metodo usaremos un map realizando una petición
 * transporte por cada usuario
 */
export async function getUsersMap() {
  const usersFetch = await fetch(
    "http://34.90.153.139/ejercicios/usuarios.php"
  );
  let users = await usersFetch.json();

  const transportesPromesas = [];
  let resultadoMapTransport = users.map(async (user) => {
    const transportFetch = await fetch(
      "http://34.90.153.139/ejercicios/transporte.php?id=" + user.transport
    );
    const transport = await transportFetch.json();

    return new User(
      user.iduser,
      user.username,
      user.name,
      user.surname,
      user.sex,
      transport
    );
  });

  return await Promise.all(resultadoMapTransport);
}

/** En este metodo usaremos un forEach pero solo realizaremos las
 * peticiones a tranportes estrictamente necesarias
 */
export async function getUsersForEachOptimized() {
  const usersFetch = await fetch(
    "http://34.90.153.139/ejercicios/usuarios.php"
  );
  let users = await usersFetch.json();

  let resultado = [];
  users.forEach((user) => {
    const usuario = new User(
      user.iduser,
      user.username,
      user.name,
      user.surname,
      user.sex,
      user.transport
    );
    resultado.push(usuario);
  });

  const transportesDiferentes = new Set(
    resultado.map((user) => user.transporte)
  );
  const transportesPromesas = [];

  transportesDiferentes.forEach((transporte) => {
    const transportFecth = fetch(
      "http://34.90.153.139/ejercicios/transporte.php?id=" + transporte
    ).then((r) => r.json());

    transportesPromesas.push(transportFecth);
  });

  const respuestaTransportes = await Promise.all(transportesPromesas);

  for (let i = 0; i < resultado.length; i++) {
    resultado[i].transporte = respuestaTransportes.find((transport) => {
      return transport.id === resultado[i].transporte;
    });
  }

  return resultado;
}

/** Si has llegado hasta aquí, enhorabuena!! vas a ser un gran IT Software developer!!
 * y como se que te has quedado con ganas de más, te reto a realizar la siguiente función 
 */
export async function getUsersMapOptimized() {

}

/** FELICES FIESTAS!! 
 * https://adventofcode.com/
 */