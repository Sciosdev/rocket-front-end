import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { RegistroService } from '../../services/registro.service';
import { Estatus } from '../../models/estatus.model';
import { TipoEstatus } from 'src/app/models/tipo.estatus.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  events: any[];
  registerKey: string = '';
  loading = false;
  estatusActual: Estatus;
  tipoEstatus: string = '';
  colorEstatus: string = '';
  mainEvents: any[];
  mainIcon: string;
  destino: any;

  constructor(private route: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    protected registroService: RegistroService,
    private toastrService: NbToastrService,
    private router: Router
  ) {}

 blueColor = '#3F5AA5';
 grayColor = '#DFDFDF';
  redColor = '#EA1A1A';
  yellowColor = '#E7C809';
  public id: string;


  ngOnInit(): void {

    

    this.events = [];
    this.mainIcon = "cogs";
    this.mainEvents = [
      {
        type: "Orden creada",
        color: this.grayColor,
        icon: PrimeIcons.CLOCK
      },
      {
        type: "En proceso",
        color: this.grayColor,
        icon: PrimeIcons.CLOCK
      },
      {
        type: "Entrega en curso",
        color: this.grayColor,
        icon: PrimeIcons.CLOCK
      },
      {
        type: "Entregado",
        color: this.grayColor,
        icon: PrimeIcons.CLOCK
      }
    ]

    this.route.queryParams
    .subscribe(params => {
      console.log(params);
      if(params.orderKey) {
        this.registerKey = params.orderKey;
        this.obtenerRegistro();
      }
    }
  );
   
  }

  public myMethodChangingQueryParams() {
    const queryParams: Params = { orderKey: this.registerKey };
  
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
  
  obtenerRegistro() {
    this.loading = true;
    this.events = [];
    this.registroService.obtenerEstatusLogRegistro(this.registerKey).subscribe(
      (response: any) => {
        this.loading = false;

        this.estatusActual = response.estatus_actual;

        switch (this.estatusActual.tipo) {
          case TipoEstatus.INICIAL:
            this.tipoEstatus = 'Orden creada con éxito';
            this.colorEstatus = 'callout callout-primary';
            this.mainIcon = "calendar-check-o";
            this.mainEvents = [
              {
                type: "Orden creada",
                color: this.blueColor,
                icon: PrimeIcons.MAP_MARKER
              },
              {
                type: "En proceso",
                color: this.grayColor,
                icon: PrimeIcons.CLOCK
              },
              {
                type: "Entrega en curso",
                color: this.grayColor,
                icon: PrimeIcons.CLOCK
              },
              {
                type: "Entregado",
                color: this.grayColor,
                icon: PrimeIcons.CLOCK
              }
            ]
            break;
          case TipoEstatus.PROCESO:
            this.tipoEstatus = 'En proceso';
            this.colorEstatus = 'callout callout-info';
            this.mainIcon = "hourglass-half";
            this.mainEvents = [
              {
                type: "Orden creada",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "En proceso",
                color: this.blueColor,
                icon: PrimeIcons.MAP_MARKER
              },
              {
                type: "Entrega en curso",
                color: this.grayColor,
                icon: PrimeIcons.CLOCK
              },
              {
                type: "Entregado",
                color: this.grayColor,
                icon: PrimeIcons.CLOCK
              }
            ]
            break;
          case TipoEstatus.TRANSITO:
            this.tipoEstatus = 'Entrega en curso';
            this.colorEstatus = 'callout callout-info';
            this.mainIcon = "rocket";
            this.mainEvents = [
              {
                type: "Orden creada",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "En proceso",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "Entrega en curso",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "Entregado",
                color: this.grayColor,
                icon: PrimeIcons.CLOCK
              }
            ]
            break;
          case TipoEstatus.FINAL:
            this.tipoEstatus = 'Entregado';
            this.colorEstatus = 'callout callout-success';
            this.mainIcon = "check-square-o";
            this.mainEvents = [
              {
                type: "Orden creada",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "En proceso",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "Entrega en curso",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "Entregado",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              }
            ]
            break;
          case TipoEstatus.EXCEPCION:
            this.tipoEstatus = 'Orden rechazada';
            this.colorEstatus = 'callout callout-danger';
            this.mainIcon = "exclamation-triangle";
            this.mainEvents = [
              {
                type: "Orden creada",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "En proceso",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "Orden rechazada",
                color: this.redColor,
                icon: PrimeIcons.TIMES_CIRCLE
              }
            ]
            break;
          case TipoEstatus.REASIGNACION:
            this.tipoEstatus = 'En proceso';
            this.colorEstatus = 'callout callout-info';
            this.mainIcon = "hourglass-half";
            this.mainEvents = [
              {
                type: "Orden creada",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "En proceso",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "Entrega en curso",
                color: this.grayColor,
                icon: PrimeIcons.CLOCK
              },
              {
                type: "Entregado",
                color: this.grayColor,
                icon: PrimeIcons.CLOCK
              }
            ]
            break;
        
          default:
            this.tipoEstatus = 'En proceso';
            this.colorEstatus = 'callout callout-warning';
            this.mainEvents = [
              {
                type: "Orden creada",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "En proceso",
                color: this.blueColor,
                icon: PrimeIcons.CHECK_SQUARE
              },
              {
                type: "Entrega en curso",
                color: this.grayColor,
                icon: PrimeIcons.CLOCK
              },
              {
                type: "Entregado",
                color: this.grayColor,
                icon: PrimeIcons.CLOCK
              }
            ]
            break;
        }

        this.events = response.historico;
        this.destino = response.destino;
        
      },
      (error) => {
        this.loading = false;
        this.toastrService.warning(error.error.responseMessage, 'Error al consultar');
      }
    );
  }

  public toDate(year: number, month:number, day: number): Date {
    let fecha = new Date();

    fecha.setUTCFullYear(year,month-1,day);

    console.log(fecha);

    return fecha;
  }
}
