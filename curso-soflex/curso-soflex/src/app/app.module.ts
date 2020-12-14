import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProductoComponent } from './components/producto/producto.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { PedidoDetalleComponent } from './components/pedido-detalle/pedido-detalle.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ProductoComponent,
    PedidoComponent,
    PedidoDetalleComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
