import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProductoComponent } from './components/producto/producto.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { PedidoDetalleComponent } from './components/pedido-detalle/pedido-detalle.component';
import { HomeComponent } from './components/home/home.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ProductoComponent,
    PedidoComponent,
    PedidoDetalleComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ScrollingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule    
  ],
  exports: [
    MatCardModule,
    ScrollingModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
