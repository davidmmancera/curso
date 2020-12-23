import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetallePedido } from 'src/app/domain/pedido-detalle';
import { Producto } from 'src/app/domain/producto';
import { DetallePedidoService } from 'src/app/services/pedido-detalle.service';
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
              private productoService: ProductoService
              ) { }

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

  cancelar(){
    this.mostrarDetallePedido = false;
  } 

  guardar(){
    debugger;
    if (!this.formDetalle.valid) {
      return;
    }

    this.mostrarDetallePedido = false;
    let copia: DetallePedido = Object.assign(new DetallePedido(), this.formDetalle.value);

    copia.prodDescripcion = this.productos.find(p => p.prodId == copia.detaProdId)!.prodDescripcion

    if(this.i == -1){
      this.detallePedidoService.post(copia).subscribe((data:any) =>{
        copia.detaId = data.detaId;
        copia.detaFechaAlta = data.detaFechaAlta;
        copia.detaBorrado = data.detaBorrado;

        this.detalles.push(copia);
        this.actualizarTabla();
      })
    }else{
      this.detallePedidoService.put(copia.detaId, copia).subscribe(()=>{
        this.detalles[this.i] = copia;
        this.actualizarTabla();
      })
    }
  }



  actualizarTabla() {
    this.dataSource.data = this.detalles;
  }
}