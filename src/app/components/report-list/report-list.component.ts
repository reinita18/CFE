import { Component, OnInit, HostBinding } from '@angular/core';
import {ReportsService} from "../../services/reports.service"
const { PDFDocument, rgb } = require('pdf-lib');
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  reports: any = [];

  constructor(private reportsService:ReportsService) {}

  ngOnInit(): void {

    this.reportsService.getReports().subscribe(
      
      res => {
        console.log(res)
        this.reports = res;

      },
      err => console.error(err)
    );
    
  }

  generarPDF(idOrden: string) {
    // Utiliza el servicio para obtener datos
    this.reportsService.getReport(idOrden).subscribe(
      datos => {
        // console.log(datos);
        // Llama a la función para generar el PDF con los datos obtenidos
        this.generarPDFDesdeDatos(datos);
        // console.log(datos);
      },
      error => {
        console.error('Error al obtener datos del servicio:', error);
      });
  }

  async generarPDFDesdeDatos(datos: any): Promise<void> {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      // Agrega contenido al PDF utilizando las funciones de pdf-lib
      //encabezado
      page.drawText('HOJA DE SERVICIO', {x:200, y: height - 50, size: 20});
      page.drawText(`No de Orden: ${datos.noOrden}`, { x: 420, y: height - 50, size: 10 });
      //linea divisoria
      page.drawLine({
        start: { x: 35, y: height - 60 },
        end: { x: 565, y: height - 60 },
        thickness: 2,
        color: rgb(0, 0, 0), // Color rojo
      });
      //cabeza información
      page.drawText('INFORMACIÓN',{x:250,y: height - 80, size: 14 });
      page.drawText(`EMPRESA: ${datos.empresa}`, { x: 100, y: height - 95, size: 12 });
      page.drawText(`ZONA: ${datos.zona}`, { x: 100, y: height - 110, size: 12 });
      page.drawText(`AGENCIA: ${datos.agencia}`, { x: 300, y: height - 110, size: 12 });
      page.drawText(`FECHA: ${datos.fecha}`, { x: 100, y: height - 130, size: 12 });
      page.drawText(`HORA INICIO: ${datos.horaInicio}`, { x: 250, y: height - 130, size: 12 });
      page.drawText(`HORA TÉRMINO: ${datos.horaTermino}`, { x: 400, y: height - 130, size: 12 });

      //datos del cfematico
      page.drawLine({
        start: { x: 35, y: height - 140 },
        end: { x: 565, y: height - 140 },
        thickness: 2,
        color: rgb(0, 0, 0), // Color rojo
      });
      page.drawText('DATOS DEL CFEMATICO',{x:180,y: height - 155, size: 16 });
      page.drawLine({
        start: { x: 35, y: height - 60 },
        end: { x: 565, y: height - 60 },
        thickness: 2,
        color: rgb(0, 0, 0), // Color rojo
      });
      page.drawText(`N/EQUIPO: ${datos.noEquipo}`, { x: 100, y: height - 170, size: 12 });
      page.drawText(`N/SERIE: ${datos.noEquipoSerie}`, { x: 250, y: height - 170, size: 12 });
      page.drawText(`N/INVENTARIO: ${datos.noInventario}`, { x: 400, y: height - 170, size: 12 });
      
      page.drawText('DETALLE DE SERVICIO', { x: 50, y: height - 190, size: 14 });

      // Checkbox para PREVENTIVO COMPLETO
      const checkboxSize = 10;

      page.drawRectangle({
        x: 230,
        y: height - 190,
        width: checkboxSize,
        height: checkboxSize,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      // Texto asociado al checkbox
      page.drawText('PREVENTIVO COMPLETO', { x: 250, y: height - 190, size: 12 });

      // Marcar el checkbox si preventivoCompleto es true
      if (datos.preventivoCompleto) {
        page.drawText('X', { x: 231, y: height - 190, size: 12 });
      }

      

      page.drawRectangle({
        x: 420,
        y: height - 190,
        width: checkboxSize,
        height: checkboxSize,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      // Texto asociado al checkbox
      page.drawText('CORRECTIVO', { x: 440, y: height - 190, size: 12 });

      // Marcar el checkbox si correctivo es true
      if (datos.correctivo) {
        page.drawText('X', { x: 421, y: height -190, size: 12 });
      }

      //separador
      page.drawLine({
        start: { x: 35, y: height - 200 },
        end: { x: 565, y: height - 200 },
        thickness: 2,
        color: rgb(0, 0, 0), // Color rojo
      });

      //mantenimiento
      page.drawText('Para ser llenado por Proveedor', { x:50, y: height - 220, size: 9});
      page.drawText('Mantenimiento', { x:140, y: height - 235, size: 14});
      //gabinete
      page.drawText('MANTENIMIENTO DE GABINETE', { x:80, y: height - 260, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 260, datos.mantenimientoGabinete);
      //estado de cableado
      page.drawText('ORGANIZACIÓN Y ESTADO DE CABLEADO', { x:80, y: height - 275, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 275, datos.organizacionEstadoCableado);
      //a pc
      page.drawText('MANTENIMIENTO A PC', { x:80, y: height - 290, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 290, datos.mantenimientoPc);
      //a monitor
      page.drawText('MANTENIMIENTO A MONITOR', { x:80, y: height - 305, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 305, datos.mantenimientoMonitor);
      //escaner
      page.drawText('MANTENIMIENTO A ESCANER', { x:80, y: height - 320, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 320, datos.mantenimientoEscaner);
      //impresora
      page.drawText('MANTENIMIENTO A IMPRESORA', { x:80, y: height - 335, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 335, datos.mantenimientoImpresora);
      //tarjeta de interfaz
      page.drawText('MANTENIMIENTO A TARJETA DE INTERFAZ', { x:80, y: height - 350, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 350, datos.mantenimientoTarjetaInterfaz);
      //toneleros
      page.drawText('MANTENIMIENTO A TONELEROS', { x:80, y: height - 365, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 365, datos.mantenimientoToneleros);
      //dispensador de billetes
      page.drawText('MANTENIMIENTO A DISPENSADOR DE BILLETES', { x:80, y: height - 380, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 380, datos.mantenimientoDispensadorBilletes);
      //aceptador de billetes
      page.drawText('MANTENIMIENTO A ACEPTADOR DE BILLETES', { x:80, y: height - 395, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 395, datos.mantenimientoAceptadorBilletes);
      //aceptador de monedas
      page.drawText('MANTENIMIENTO A ACEPTADOR DE MONEDAS', { x:80, y: height - 410, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 410, datos.mantenimientoAceptadorMonedas);
      //ups
      page.drawText('REVISION DE UPS', { x:80, y: height - 425, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 425, datos.ups.estado);
      //entrada
      page.drawText('Voltaje de entrada: ' , { x: 60, y: height - 435, size: 7 });
      page.drawText(`NT: ${datos.ups.voltajesEntrada.nt}` , { x: 130, y: height - 435, size: 7 });
      page.drawText(`NF: ${datos.ups.voltajesEntrada.nf}` , { x: 160, y: height - 435, size: 7 });
      page.drawText(`TF: ${datos.ups.voltajesEntrada.tf}` , { x: 190, y: height - 435, size: 7 });
      //salida
      page.drawText('Voltaje de salida: ' , { x: 60, y: height - 445, size: 7 });
      page.drawText(`NT: ${datos.ups.voltajesEntrada.nt}` , { x: 130, y: height - 445, size: 7 });
      page.drawText(`NF: ${datos.ups.voltajesEntrada.nf}` , { x: 160, y: height - 445, size: 7 });
      page.drawText(`TF: ${datos.ups.voltajesEntrada.tf}` , { x: 190, y: height - 445, size: 7 });
      // page.drawText(datos.ups.voltajesEntrada.nt , { x: 60, y: height - 435, size: 10 });
      //versión
      page.drawText('VERIFICACIÓN DE LA ULTIMA', { x:80, y: height - 460, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 460, datos.estadoVerificacionUltimaVersionLiberada);
      page.drawText(`VERSION LIBERADA: ${datos.verificacionUltimaVersionLiberada}` , { x: 80, y: height - 475, size:9 });
      //antivirus
      page.drawText('ACTUALIZACIÓN DE ANTIVIRUS CORPORATIVO', { x:80, y: height - 490, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 490, datos.actualizacionAntivirusCorporativo);
      //fecha y hora
      page.drawText('VERIFICAR FECHA Y HORA CORRECTA', { x:80, y: height - 505, size: 9 });
      this.dibujarCheckbox(page, 60,  height - 505, datos.verificaFechaHora);
      //DERECHO
      //PRUEBAS
      page.drawText('Para ser llenado por Proveedor', { x:300, y: height - 220, size: 9});
      page.drawText('Mantenimiento', { x:380, y: height - 235, size: 14});
      //monitoreo
      page.drawText('VERIFICAR COMUNICACIÓN CON MONITOREO', { x:330, y: height - 260, size: 9 });
      this.dibujarCheckbox(page, 310,  height - 260, datos.mantenimientoGabinete);
      //sicom
      page.drawText('VERIFICAR COMUNICACIÓN CON SICOM', { x:330, y: height - 275, size: 9 });
      this.dibujarCheckbox(page, 310,  height - 275, datos.verificarComunicacionSicom);
      //monedas
      page.drawText('PRUEBAS DE ACEPTACIÓN DE MONEDAS', { x:330, y: height - 290, size: 9 });
      this.dibujarCheckbox(page, 310,  height - 290, datos.pruebasAceptadorMonedas);
      //billetes
      page.drawText('PRUEBAS DE ACEPTACIÓN DE BILLETES', { x:330, y: height - 305, size: 9 });
      this.dibujarCheckbox(page, 310,  height - 305, datos.preubasAceptacionBilletes);
      //monedas
      page.drawText('PRUEBA DE DISPENSADO DE MONEDAS', { x:330, y: height - 320, size: 9 });
      this.dibujarCheckbox(page, 310,  height - 320, datos.pruebasDispensadoMonedas);
      //billetes
      page.drawText('PRUEBA DE DISPENSADO DE BILLETES', { x:330, y: height - 335, size: 9 });
      this.dibujarCheckbox(page, 310,  height - 335, datos.preubasDispensadoBilletes);
      //recibos
      page.drawText('LECTURA DE RECIBOS', { x:330, y: height - 350, size: 9 });
      this.dibujarCheckbox(page, 310,  height - 350, true);
      //impresión
      page.drawText('PRUEBAS DE IMPRESIÓN', { x:330, y: height - 365, size: 9 });
      this.dibujarCheckbox(page, 310,  height - 365, datos.pruebasImpresion);
      //diagnostico
      page.drawText('Mantenimiento', { x:380, y: height - 390, size: 12});
      page.drawText(datos.diagnosticoFallas, { x:330, y: height - 400, size: 7});
      //separacion
      page.drawLine({
        start: { x: 35, y: height - 525 },
        end: { x: 565, y: height - 525 },
        thickness: 2,
        color: rgb(0, 0, 0), // Color rojo
      });
      //refacciones
      page.drawText('REFACCIONES Y MATERIAL UTILIZADO', { x:50, y: height - 545, size: 14});
      //nombre
      page.drawText('Nombre', { x:100, y: height - 565, size: 10 });
      page.drawText(datos.refaciones[0].nombre, { x:100, y: height - 580, size: 9 });
      page.drawText(datos.refaciones[1].nombre, { x:100, y: height - 595, size: 9 });
      //numero de seria
      page.drawText('Numero de Serie', { x:200, y: height - 565, size: 10 });
      page.drawText(datos.refaciones[0].noSerie, { x:200, y: height - 580, size: 9 });
      page.drawText(datos.refaciones[1].noSerie, { x:200, y: height - 595, size: 9 });
      //instalado
      page.drawText('Instalado', { x:350, y: height - 565, size: 10 });
      page.drawText(datos.refaciones[0].instalado, { x:350, y: height - 580, size: 9 });
      page.drawText(datos.refaciones[1].instalado, { x:350, y: height - 595, size: 9 });
      //retirado
      page.drawText('Retirado', { x:500, y: height - 565, size: 10 });
      page.drawText(datos.refaciones[0].retirado, { x:500, y: height - 580, size: 9 });
      page.drawText(datos.refaciones[1].retirado, { x:500, y: height - 595, size: 9 });


      //OBSERVACIONEEEEEEEEEEEES---------------------------------
      page.drawLine({
        start: { x: 35, y: height - 610 },
        end: { x: 565, y: height - 610 },
        thickness: 2,
        color: rgb(0, 0, 0), // Color rojo
      });
      page.drawText('OBSERVACIONES', { x:80, y: height - 625, size: 14});
      page.drawLine({
        start: { x: 75, y: height - 640 },
        end: { x: 450, y: height - 640 },
        thickness: 1,
        color: rgb(0, 0, 0), // Color rojo
      });
      page.drawLine({
        start: { x: 75, y: height - 650 },
        end: { x: 450, y: height - 650 },
        thickness: 1,
        color: rgb(0, 0, 0), // Color rojo
      });
      page.drawLine({
        start: { x: 75, y: height - 660 },
        end: { x: 450, y: height - 660 },
        thickness: 1,
        color: rgb(0, 0, 0), // Color rojo
      });
      //separación
      page.drawLine({
        start: { x: 35, y: height - 675 },
        end: { x: 565, y: height - 675 },
        thickness: 2,
        color: rgb(0, 0, 0), // Color rojo
      });
      //llenado por cfe
      page.drawText('PARA SER LLENADO POR CFE', { x:80, y: height - 695, size: 14});
      page.drawText('Se acepta mantenimiento', { x:100, y: height - 715, size: 10});
      page.drawText('Si', { x:255, y: height - 715, size: 10});
      page.drawText('No', { x:295, y: height - 715, size: 10});
      page.drawText(`Hora de finalización: ${datos.horaTermino}`, { x:350, y: height - 715, size: 10});
      if (datos.aceptaMantenimiento) {
        this.dibujarCheckbox(page, 241,  height - 715, true);
        this.dibujarCheckbox(page, 281,  height - 715, false);
      }else{
        this.dibujarCheckbox(page, 241,  height - 715, false);
        this.dibujarCheckbox(page, 281,  height - 715, true);
      }
      //2do renglon
      page.drawText('Calidad del servicio', { x:100, y: height - 730, size: 10});
      page.drawText('Bueno', { x:255, y: height - 730, size: 10});
      page.drawText('Malo', { x:355, y: height - 730, size: 10});
      page.drawText('Regular', { x:455, y: height - 730, size: 10});
      if (datos.calidadServicio == "BUENO") {
        this.dibujarCheckbox(page, 241,  height - 730, true);
        this.dibujarCheckbox(page, 341,  height - 730, false);
        this.dibujarCheckbox(page, 441,  height - 730, false);
        
      } else if (datos.calidadServicio == "MALO") {
        this.dibujarCheckbox(page, 241,  height - 730, false);
        this.dibujarCheckbox(page, 341,  height - 730, true);
        this.dibujarCheckbox(page, 441,  height - 730, false);
      } else{
        this.dibujarCheckbox(page, 241,  height - 730, false);
        this.dibujarCheckbox(page, 341,  height - 730, false);
        this.dibujarCheckbox(page, 441,  height - 730, true);
      }
      //separación
      // page.drawLine({
      //   start: { x: 35, y: height - 745 },
      //   end: { x: 565, y: height - 745 },
      //   thickness: 2,
      //   color: rgb(0, 0, 0), // Color rojo
      // });
      //firmas
      page.drawText('Responsable Proovedor', { x:40, y: height - 780, size: 9});
      page.drawLine({
        start: { x: 30, y: height - 820 },
        end: { x: 150, y: height - 820 },
        thickness: 1,
        color: rgb(0, 0, 0), // Color rojo
      });
      page.drawText('RPE, Nombre y Firma', { x:50, y: height - 830, size: 8});


      page.drawText('Operador CFEMATICO', { x:170, y: height - 780, size: 9});
      page.drawLine({
        start: { x: 160, y: height - 820 },
        end: { x: 280, y: height - 820 },
        thickness: 1,
        color: rgb(0, 0, 0), // Color rojo
      });
      page.drawText('RPE, Nombre y Firma', { x:180, y: height - 830, size: 8});


      page.drawText('Administrador contrato zona', { x:310, y: height - 780, size: 9});
      page.drawLine({
        start: { x: 310, y: height - 820 },
        end: { x: 430, y: height - 820 },
        thickness: 1,
        color: rgb(0, 0, 0), // Color rojo
      });
      page.drawText('RPE, Nombre y Firma', { x:330, y: height - 830, size: 8});


      page.drawText('Administrador contrato división', { x:450, y: height - 780, size: 9});
      page.drawLine({
        start: { x: 450, y: height - 820 },
        end: { x: 570, y: height - 820 },
        thickness: 1,
        color: rgb(0, 0, 0), // Color rojo
      });
      page.drawText('RPE, Nombre y Firma', { x:470, y: height - 830, size: 8});

      



      


      // Guarda el PDF en un Blob
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      // Obtiene la fecha y hora actuales en el formato "yyyyMMdd_HHmmss"
      const fechaHoraActual = new Date().toISOString().replace(/[-:T.]/g, '').substring(0, 15);

    // Construye el nombre del archivo con el formato noOrden + _ + fechayhoraactual
      const nombreArchivo = `${datos.noOrden}_${fechaHoraActual}.pdf`;

      // Guarda el Blob como un archivo
      saveAs(pdfBlob, nombreArchivo);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  }

  dibujarCheckbox(page: any, x: number, y: number, checked: boolean): void {
    const checkboxSize = 10;
  
    // Dibuja el cuadro del checkbox
    page.drawRectangle({
      x,
      y: y,
      width: 10,
      height: 10,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
  
    // Marca el checkbox si está marcado
    if (checked) {
      page.drawText('X', { x: x + 1, y:y, size: 12 });
    }
  }

  

  

}
