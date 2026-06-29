
/*
 * @description Formato de moneda local (Chile) para mostrar los precios de los productos en formato $00.000
 */
export const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
});
