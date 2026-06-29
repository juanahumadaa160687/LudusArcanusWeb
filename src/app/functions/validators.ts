import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

let users = JSON.parse(localStorage.getItem('users') || '[]');

/*
 *
 * @params Un email a validar y los users almacenados en el localStorage
 *
 * @description Validador que permite verificar si un email ya está registrado.
 *
 * @return true si el email existe y null si no.
 *
 */
export function emailExistsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    const emailExists = users.some((user: any) => user.email === email);
    return emailExists ? { emailExists: true } : null;
  }
}

/*
 *
 * @params Un password y un confirmPassword a validar.
 *
 * @description Validador que permite verificar si un password y un confirmPassword son iguales.
 *
 * @return true si los passwords no coinciden y null si coinciden.
 *
 */
export function passwordNotMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password !== confirmPassword ? { passwordNotMatch: true } : null;
  }
}

/*
 *
 * @params la fecha a validar y la fecha de hoy
 *
 * @description Verifica si la fecha ingresada es mayor a la fecha de hoy.
 *
 * @return si la fecha ingresada es mayor a la fecha de hoy retorna true, si no retorna null.
 *
 */
export function fechaFuturoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fecha = new Date(control.value);
    const today = new Date();
    return fecha > today ? { fechaFuturo: true } : null;
  }
}

/*
 *
 * @params la fecha a validar y la fecha de hoy
 *
 * @description Verifica si la edad calculada a partir de la fecha ingresada es menor a 13 años.
 *
 * @return si la edad es menor a 13 años retorna true, si no retorna null.
 *
 */
export function edadMinValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fecha = new Date(control.value);
    const today = new Date();
    const edad = today.getFullYear() - fecha.getFullYear();
    return edad < 13 ? { edadMin: true } : null;
  }
}

/*
 *
 * @params imagen con extensión a evaluar.
 *
 * @description Verifica si la extensión de la imagen corresponde a la extensión aceptada (en este caso webp).
 *
 * @return si la extensión es válida retorna null, si no retorna true.
 *
 */
export function imagenProductoExtension(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const imagen = control.value;
    const extension = imagen.split('.').pop()?.toLowerCase();
    const extensionesValidas = 'webp';
    return !extensionesValidas.includes(extension) ? { imagenProductoExtension: true } : null;

  }
}
