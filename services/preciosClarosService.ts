const API_KEY = "zIgFou7Gta7g87VFGL9dZ4BEEs19gNYS1SOQZt96";
const BASE_URL = "https://d3e6htiiul5ek9.cloudfront.net/prod";

const SUCURSALES_TUCUMAN = [
  "10-2-176", "9-1-71", "10-2-177", "9-1-659", "9-1-125",
  "9-1-134", "9-1-660", "10-1-46", "9-1-727", "9-1-958",
  "9-1-73", "16-1-802", "16-1-702", "9-1-72", "9-3-5227",
  "9-1-70", "10-2-601", "9-1-728", "9-1-903", "9-1-904",
  "9-1-906", "15-1-825", "9-1-730", "16-1-1002", "9-1-13",
  "2005-1-73", "9-1-887", "15-1-8014", "9-1-242", "9-1-243"
];

const HEADERS = {
  "x-api-key": API_KEY,
  "Accept": "application/json, text/plain, */*",
  "Origin": "https://www.preciosclaros.gob.ar",
  "Referer": "https://www.preciosclaros.gob.ar/",
  "User-Agent": "Mozilla/5.0 (Mobile; rv:40.0) Gecko/40.0 Firefox/40.0"
};

export async function obtenerPreciosPorEan(ean: string): Promise<{
  coincidencias: [string, number][],
  precio_promedio: number | null,
  precio_min: number | null,
  precio_max: number | null,
  ean_usado: string,
  nombre: string | null
}> {
  let resultados: [string, number][] = [];
  let nombre_producto: string | null = null;

  // Procesar en bloques de 20 sucursales
  for (let i = 0; i < SUCURSALES_TUCUMAN.length; i += 20) {
    const bloque = SUCURSALES_TUCUMAN.slice(i, i + 20);
    const params = new URLSearchParams({
      id_producto: ean,
      array_sucursales: bloque.join(','),
      limit: '30',
    });
    try {
      const res = await fetch(
        `${BASE_URL}/producto?${params.toString()}`,
        { headers: HEADERS }
      );
      if (!res.ok) {
        // Bloqueado, ignoramos y seguimos
        continue;
      }
      const data = await res.json();

      if (!nombre_producto && data.producto && data.producto.nombre)
        nombre_producto = data.producto.nombre;

      (data.sucursales || []).forEach((s: any) => {
        if ("message" in s) return;
        const precio = s?.preciosProducto?.precioLista;
        const nombre_sucursal = s?.sucursalNombre || "";
        const comercio = s?.banderaDescripcion || "";
        if (precio) {
          resultados.push([`${comercio} ${nombre_sucursal}`, precio]);
        }
      });
    } catch (e) {
      // Error silencioso, seguimos
    }
    // Pausa conservadora: 3 segundos
    await new Promise(res => setTimeout(res, 3000));
  }

  return procesarResultados(ean, resultados, nombre_producto);
}

function procesarResultados(
  ean: string,
  resultados: [string, number][],
  nombre_producto?: string | null
) {
  const precios = resultados.map(r => r[1]);
  if (!precios.length) {
    return {
      coincidencias: [],
      precio_promedio: null,
      precio_min: null,
      precio_max: null,
      ean_usado: ean,
      nombre: nombre_producto ?? null,
    };
  }
  const promedio = Math.round(
    (precios.reduce((a, b) => a + b, 0) / precios.length) * 100
  ) / 100;
  return {
    coincidencias: resultados,
    precio_promedio: promedio,
    precio_min: Math.min(...precios),
    precio_max: Math.max(...precios),
    ean_usado: ean,
    nombre: nombre_producto ?? null,
  };
}
