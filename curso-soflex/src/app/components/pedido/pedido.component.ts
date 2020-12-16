import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/domain/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { Pedido } from 'src/app/domain/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pedidos: Pedido[] = [];
  clientes: Cliente[] = [];

  form = new FormGroup({});
  mostrarFormulario = false;
  i = 1;
  nombredatos: string[] = ['Id','FechaPed','Cliente','Fecha','Acciones']

  mostrarDetallePedido = false;
  detaPediId: any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Pedido>();
  
  constructor(private formBuilder: FormBuilder, 
    private pedidoService: PedidoService,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pediId: [''],
      pediFecha: ['', Validators.required],
      pediClienId: ['', Validators.required],
      pediBorrado: [''],
      pediFechaAlta: [''],
      clienNombre:['']
    });    

    this.cargarClientes();
    this.cargarPedidos();
  }

  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }

  cargarClientes(){
    this.clienteService.get().subscribe((data: any) =>{
      this.clientes = data;
    })
  }

  cargarPedidos(){
    this.pedidoService.get().subscribe((x: Pedido[]) => {
      this.pedidos = x;
      this.actualizarTabla();
    }, () => {
      console.log('Error al cargar datos desde la API');
    });
  }

  agregarPedido(){
    this.form.reset();
    this.mostrarFormulario = true;
    this.i = -1
  }

  editarPedido(pedido: Pedido){
    this.form.setValue(pedido)
    this.mostrarFormulario = true;
    this.mostrarDetallePedido = true;
    this.i = this.pedidos.findIndex(elem => elem === pedido)

    this.detaPediId = pedido.pediId
  }

  eliminarPedido(pedido: Pedido){
    debugger;
    this.pedidoService.delete(pedido.pediId).subscribe(() => {
      pedido.pediBorrado = true;
      this.pedidos = this.pedidos.filter(pedi => pedi != pedido);
      this.actualizarTabla();
    })      
  }

  actualizarTabla() {
    this.dataSource.data = this.pedidos;
  }

  guardarPedido(){
    if (!this.form.valid) {
      return;
    }

    let copy: Pedido = Object.assign(new Pedido(), this.form.value);

    copy.clienNombre = this.clientes.find(c => c.clienId == copy.pediClienId)!.clienNombre

    if(this.i == -1){
      this.pedidoService.post(copy).subscribe((data:any) =>{
        copy.pediId = data.pediId;
        copy.pediFechaAlta = data.pediFechaAlta;
        copy.pediBorrado = data.pediBorrado;

        this.detaPediId = data.pediId

        this.pedidos.push(copy);
        this.actualizarTabla();
        this.i = this.pedidos.findIndex(elem => elem === copy)
        this.mostrarDetallePedido = true
      })
    }else{
      this.pedidoService.put(copy.pediId, copy).subscribe((data:any)=>{
        this.pedidos[this.i] = copy;
        this.actualizarTabla();
        this.mostrarFormulario = false;
    })
    }
  }

  cancelar(){
    this.mostrarFormulario = false;
    this.mostrarDetallePedido = false;
  }


}
