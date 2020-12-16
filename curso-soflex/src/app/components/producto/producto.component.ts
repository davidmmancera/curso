import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/domain/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  productos: Producto[] = [];
  form = new FormGroup({});
  mostrarFormulario = false;
  i = 1;
  nombredatos: string[] = ['Id','Descripcion','Precio','Fecha','Acciones']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Producto>();

  constructor(private formBuilder: FormBuilder, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      prodId: [''],
      prodDescripcion: ['', Validators.required], 
      prodPrecio: ['', Validators.required],
      prodBorrado: [''],
      prodFechaAlta: ['']
    });

    this.cargarProductos()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cancelar(){
    this.mostrarFormulario = false;
  }

  agregarProducto(){
    this.form.reset();
    this.mostrarFormulario = true;
    this.i = -1
  }

  eliminarProducto(producto: Producto){
    debugger;
    this.productoService.delete(producto.prodId).subscribe(() => {
      producto.prodBorrado = true;
      this.productos = this.productos.filter(pro => pro != producto);
      this.actualizarTabla();
    })
  }

  editarProducto(producto: Producto){
    debugger;
    this.form.setValue(producto)
    this.mostrarFormulario = true;
    this.i = this.productos.findIndex(el => el === producto)
  }

  cargarProductos(){
    this.productoService.get().subscribe((x: Producto[]) => {
      this.productos = x;
      this.actualizarTabla();
    }, () => {
      console.log('Error al cargar datos desde la API');
    });
  }

  guardarProducto(){
    debugger;
    if (!this.form.valid) {
      return;
    }
    let auxProd: Producto = Object.assign(new Producto(), this.form.value)

    if(this.i == -1){
      this.productoService.post(auxProd).subscribe((data:any) =>{
        auxProd.prodId = data.prodId;
        auxProd.prodFechaAlta = data.prodFechaAlta;
        auxProd.prodBorrado = data.prodBorrado;

        this.productos.push(auxProd);
        this.actualizarTabla();
      })
    }else{
      this.productoService.put(auxProd.prodId, auxProd).subscribe((data:any)=>{
        this.productos[this.i] = auxProd;
        this.actualizarTabla();
      })
    }
  }

  actualizarTabla() {
    this.dataSource.data = this.productos;
  }

}
