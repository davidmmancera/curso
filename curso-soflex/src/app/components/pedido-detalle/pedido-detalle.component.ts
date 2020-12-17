import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetallePedido } from 'src/app/domain/detalle-pedido';
import { Producto } from 'src/app/domain/producto';
import { DetallePedidoService } from 'src/app/services/detalle-pedido.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.scss']
})
export class PedidoDetalleComponent implements OnInit {

  
  @Input() pediId!: number;
  @Input() iPedido!: number;
  @Output() cerrarDetalle = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<boolean>();

  mostrarDetallePedido = false;
  detalles: DetallePedido[] = [];
  productos: Producto[] = [];
  precioSugerido = 0;
  
  
  columnas: string[] = ['id', 'producto', 'cantidad', 'precio', 'fecha','acciones'];
  dataSource = new MatTableDataSource<DetallePedido>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formDetalle = new FormGroup({});
  i!: number;

  constructor(private formBuilder: FormBuilder,
              private detallePedidoService: DetallePedidoService,
              private productoService: ProductoService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formDetalle = this.formBuilder.group({
      detaId: [''],
      detaPediId: [''],
      detaProdId: ['', Validators.required],
      detaCantidad: ['', Validators.required],
      detaPrecio: ['', Validators.required],
      detaBorrado: [''],
      prodDescripcion:[''],
      prodPrecio:['']
    });

    this.cargarDetalles();
    this.cargarProductos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarDetalles(){
    this.detallePedidoService.get(this.pediId).subscribe((data: any) =>{
      this.detalles = data;
      this.actualizarTabla();
      }, () => {
        console.log('Error al cargar datos desde la API');
    })
  }

  cargarProductos(){
    this.productoService.get().subscribe((x: Producto[]) => {
      this.productos = x;
    });
  }

  agregar(){
    this.formDetalle.reset();
    this.iPedido = 0;
    this.formDetalle.controls.detaPediId.setValue(this.pediId);
    this.mostrarDetallePedido = true;
    this.i = -1
  }

  editar(detalle: DetallePedido){
    this.formDetalle.setValue(detalle)
    this.mostrarDetallePedido = true;
    this.i = this.detalles.findIndex(elem => elem === detalle)
  }

  eliminar(detalle: DetallePedido){    
    this.detallePedidoService.delete(detalle.detaId).subscribe(() => {
      detalle.detaBorrado = true;
      this.detalles = this.detalles.filter(deta => deta != detalle);
      this.actualizarTabla();
    })      
  }

  guardar(){
    if (!this.formDetalle.valid) {
      return;
    }

    this.mostrarDetallePedido = false;
    let copy: DetallePedido = Object.assign(new DetallePedido(), this.formDetalle.value);

    copy.prodDescripcion = this.productos.find(p => p.prodId == copy.detaProdId)!.prodDescripcion

    if(this.i == -1){
      this.detallePedidoService.post(copy).subscribe((data:any) =>{
        copy.detaId = data.detaId;
        copy.detaFechaAlta = data.detaFechaAlta;
        copy.detaBorrado = data.detaBorrado;

        this.detalles.push(copy);
        this.actualizarTabla();
      })
    }else{
      this.detallePedidoService.put(copy.detaId, copy).subscribe(()=>{
        this.detalles[this.i] = copy;
        this.actualizarTabla();
      })
    }
  }

  cancelar(){
    this.mostrarDetallePedido = false;
  }

  actualizarPedido(){
    this.mostrarDetallePedido = false;
    this.update.emit(true);
  }

  volver(){
    this.cerrarDetalle.emit(false);
  }

  actualizarTabla() {
    this.dataSource.data = this.detalles;
  }

  changePrecioSugerido($event: any){
    if(this.formDetalle.controls.detaCantidad.value == null){
      this.formDetalle.controls.prodPrecio
        .setValue(this.productos.filter(pr => pr.prodId == this.formDetalle.controls.detaProdId.value)[0].prodPrecio)
      this.precioSugerido = this.formDetalle.controls.prodPrecio.value;
    }else{
      this.precioSugerido = this.precioSugerido * this.formDetalle.controls.detaCantidad.value
    }
  }
}