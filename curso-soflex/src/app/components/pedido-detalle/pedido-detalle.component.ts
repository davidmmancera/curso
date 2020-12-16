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

  detalles: DetallePedido[] = [];
  productos: Producto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formDetallePedido = new FormGroup({});
  mostrarDetallePedido = false
  i!: number;

  columnas: string[] = ['Id', 'Producto', 'Cantidad', 'Precio', 'Fecha','Acciones'];
  dataSource = new MatTableDataSource<DetallePedido>();


  constructor(private formBuilder: FormBuilder,
    private detallePedidoService: DetallePedidoService,
    private productoService: ProductoService) { }

  ngOnInit(): void {
    this.formDetallePedido = this.formBuilder.group({
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

  actualizarTabla() {
    this.dataSource.data = this.detalles;
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

  editar(detalle: DetallePedido){
    this.formDetallePedido.setValue(detalle)
    this.mostrarDetallePedido = true;
    this.i = this.detalles.findIndex(elem => elem === detalle)
  }

  agregar(){
    debugger;
    this.formDetallePedido.reset();
    this.formDetallePedido.controls.detaPediId.setValue(this.pediId);
    this.mostrarDetallePedido = true;
    this.i = -1
  }

  cancelar(){
    this.mostrarDetallePedido = false;
  } 

  guardar(){
    if (!this.formDetallePedido.valid) {
      return;
    }

    this.mostrarDetallePedido = false;
    let copy: DetallePedido = Object.assign(new DetallePedido(), this.formDetallePedido.value);

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


  eliminar(detalle: DetallePedido){  
    this.detallePedidoService.delete(detalle.detaId).subscribe(() => {
      detalle.detaBorrado = true;
      this.detalles = this.detalles.filter(deta => deta != detalle);
      this.actualizarTabla();
    })     
  }

}
