import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/domain/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  form = new FormGroup({});
  mostrarFormulario = false
  i = 1;
  nombredatos: string[] = ['Id','Nombre','Direccion','Fecha','Acciones']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Cliente>();

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      clienId: [''],
      clienNombre: ['', Validators.required], 
      clienDireccion: ['', Validators.required],
      clienBorrado: [''],
      clienFechaAlta: ['']
    });

    this.cargarClientes()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cancelar(){
    this.mostrarFormulario = false;
  }

  agregarCliente(){
    this.form.reset();
    this.mostrarFormulario = true;
    this.i = -1
  }

  eliminarCliente(cliente: Cliente){
    debugger;
    this.clienteService.delete(cliente.clienId).subscribe(() => {
      cliente.clienBorrado = true;
      this.clientes = this.clientes.filter(cli => cli != cliente);
      this.actualizarTabla();
    })
  }

  editarCliente(cliente: Cliente){
    debugger;
    this.form.setValue(cliente)
    this.mostrarFormulario = true;
    this.i = this.clientes.findIndex(el => el === cliente)
  }

  cargarClientes(){
    this.clienteService.get().subscribe((x: Cliente[]) => {
      this.clientes = x;
      this.actualizarTabla();
    }, () => {
      console.log('Error al cargar datos desde la API');
    });
  }

  guardarCliente(){
    debugger;
    if (!this.form.valid) {
      return;
    }
    let auxCli: Cliente = Object.assign(new Cliente(), this.form.value)

    if(this.i == -1){
      this.clienteService.post(auxCli).subscribe((data:any) =>{
        auxCli.clienId = data.clienId;
        auxCli.clienFechaAlta = data.clienFechaAlta;
        auxCli.clienBorrado = data.clienBorrado;

        this.clientes.push(auxCli);
        this.actualizarTabla();
      })
    }else{
      this.clienteService.put(auxCli.clienId, auxCli).subscribe((data:any)=>{
        this.clientes[this.i] = auxCli;
        this.actualizarTabla();
      })
    }
  }

  actualizarTabla() {
    this.dataSource.data = this.clientes;
  }

}
