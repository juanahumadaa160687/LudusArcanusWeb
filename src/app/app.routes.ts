import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import {Categorias} from './components/categorias/categorias';
import {Producto} from './components/producto/producto';
import {SignIn} from './components/sign-in/sign-in';
import {SignUp} from './components/sign-up/sign-up';
import {ShoppingCart} from './components/shopping-cart/shopping-cart';
import {Privacy} from './components/privacy/privacy';
import {TermnsConditions} from './components/termns-conditions/termns-conditions';
import {AdminDashboard} from './components/admin-dashboard/admin-dashboard';
import {UserProfile} from './components/user-profile/user-profile';
import {EditProfile} from './components/edit-profile/edit-profile';
import {ForgotPassword} from './components/forgot-password/forgot-password';
import {NotFound} from './components/not-found/not-found';
import {authGuard} from './guards/auth-guard';
import {adminGuard} from './guards/admin-guard';
import {loggedUserGuard} from './guards/logged-user-guard';


export const routes: Routes = [

  {
    path: 'home',
    component: Home,
    title: 'Ludus Arcanus',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'categoria/:categoria',
    component: Categorias,
    title: 'Categorías',
  },
  {
    path: 'producto/:id',
    component: Producto,
    title: 'Productos'
  },
  {
    path: 'sign-in',
    component: SignIn,
    title: 'Iniciar Sesión',
    canActivate: [loggedUserGuard]
  },
  {
    path: 'sign-up',
    component: SignUp,
    title: 'Registrarse',
    canActivate: [loggedUserGuard]
  },
  {
    path: 'shopping-cart',
    component: ShoppingCart,
    title: 'Carrito de Compras',
  },
  {
    path: 'privacidad',
    component: Privacy,
    title: 'Política de Privacidad'
  },
  {
    path: 'terminos-condiciones',
    component: TermnsConditions,
    title: 'Términos y Condiciones'
  },
  {
    path: 'administradores',
    component: AdminDashboard,
    title: 'Administradores',
    canActivate: [adminGuard]
  },
  {
    path: 'profile/:email',
    component: UserProfile,
    title: 'Perfil de Usuario',
    canActivate: [authGuard]
  },
  {
    path: 'edit-profile/:email',
    component: EditProfile,
    title: 'Editar Perfil',
    canActivate: [authGuard]
  },
  {
    path: 'reset-password/:email',
    component: ForgotPassword,
    title: 'Restablecer Contraseña',
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotFound
  }

];
