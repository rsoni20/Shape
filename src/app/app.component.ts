import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, Renderer } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  //Properties
  id: string;
  coordinate1: Coordinate;
  coordinate2: Coordinate;
  coordinate3: Coordinate;
  coordinate4: Coordinate;

  //ViewChilds
  @ViewChild('line1') private line1: ElementRef;
  @ViewChild('line2') private line2: ElementRef;
  @ViewChild('line3') private line3: ElementRef;
  @ViewChild('line4') private line4: ElementRef;
  @ViewChild('point1') private point1: ElementRef;
  @ViewChild('point2') private point2: ElementRef;
  @ViewChild('point3') private point3: ElementRef;
  @ViewChild('point4') private point4: ElementRef;

  //Constructor
  constructor() { }

  //ngAfterViewInit
  public ngAfterViewInit(): void {
    this.coordinate1 = {
      x: 110,
      y: 50
    };

    this.coordinate2 = {
      x: 200,
      y: 50
    };

    this.coordinate3 = {
      x: 200,
      y: 100

    };

    this.coordinate4 = {
      x: 110,
      y: 100
    };

    this.initializePoints();
    this.drawLines();
  }

  private drawLines() {
    this.drawLine(this.coordinate1, this.coordinate2, this.line1);
    this.drawLine(this.coordinate2, this.coordinate3, this.line2);
    this.drawLine(this.coordinate3, this.coordinate4, this.line3);
    this.drawLine(this.coordinate4, this.coordinate1, this.line4);
  }

  private onDragOver(event): void {
    if (this.id != null) {

      if (this.id == "point1") {
        //change 2 and 4
        this.coordinate4 = {
          x: event.clientX,
          y: this.coordinate4.y
        }

        this.coordinate1 = {
          x: event.clientX,
          y: event.clientY
        }

        this.coordinate2 = {
          x: this.coordinate2.x,
          y: this.coordinate1.y
        }
        this.initializePoints();
        this.drawLines();
      }

      if (this.id == "point2") {
        //change 3 and 1
        this.coordinate2 = {
          x: event.clientX,
          y: event.clientY,
        }

        this.coordinate3 = {
          x: event.clientX,
          y: this.coordinate4.y
        }

        this.coordinate1 = {
          x: this.coordinate1.x,
          y: event.clientY
        }

        this.initializePoints();
        this.drawLines();
      }

      if (this.id == "point3") {
        //change 2 and 4

        this.coordinate2 = {
          x: event.clientX,
          y: this.coordinate2.y,
        }
        this.coordinate3 = {
          x: event.clientX,
          y: event.clientY
        }
        this.coordinate4 = {
          x: this.coordinate4.x,
          y: event.clientY
        }
        this.initializePoints();
        this.drawLines();
      }

      if (this.id == "point4") {
        //change 3 and 1

        this.coordinate1 = {
          x: event.clientX,
          y: this.coordinate1.y,
        }
        this.coordinate4 = {
          x: event.clientX,
          y: event.clientY
        }
        this.coordinate3 = {
          x: this.coordinate3.x,
          y: event.clientY
        }

        this.initializePoints();
        this.drawLines();
      }
    }
  }

  private onDragStart(event): void {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id'));
    this.id = event.target.getAttribute('id');
  }

  private showHotPoints(): void {
    this.point1.nativeElement.style.visibility = 'visible';
    this.point2.nativeElement.style.visibility = 'visible';
    this.point3.nativeElement.style.visibility = 'visible';
    this.point4.nativeElement.style.visibility = 'visible';
  }

  private hideHotPoints(): void {
    this.point1.nativeElement.style.visibility = 'hidden';
    this.point2.nativeElement.style.visibility = 'hidden';
    this.point3.nativeElement.style.visibility = 'hidden';
    this.point4.nativeElement.style.visibility = 'hidden';
  }

  private initializePoints() {
    this.point1.nativeElement.style.top = `${this.coordinate1.y}px`;
    this.point1.nativeElement.style.left = `${this.coordinate1.x}px`;

    this.point2.nativeElement.style.top = `${this.coordinate2.y}px`;
    this.point2.nativeElement.style.left = `${this.coordinate2.x}px`;

    this.point3.nativeElement.style.top = `${this.coordinate3.y}px`;
    this.point3.nativeElement.style.left = `${this.coordinate3.x}px`;

    this.point4.nativeElement.style.top = `${this.coordinate4.y}px`;
    this.point4.nativeElement.style.left = `${this.coordinate4.x}px`;
  }

  private drawLine(coordinate1: Coordinate, coordinate2: Coordinate, line: ElementRef) {
    var distance = Math.sqrt(
      ((coordinate1.x - coordinate2.x) * (coordinate1.x - coordinate2.x)) +
      ((coordinate1.y - coordinate2.y) * (coordinate1.y - coordinate2.y)));

    //Mid Points
    var xMid = (coordinate1.x + coordinate2.x) / 2;
    var yMid = (coordinate1.y + coordinate2.y) / 2;

    //Slope
    var angleInRadian = Math.atan2(coordinate2.y - coordinate1.y, coordinate2.x - coordinate1.x);
    var angleInDegrees = (angleInRadian * 180) / Math.PI;

    //Assign styles
    line.nativeElement.style.width = `${distance}px`;
    line.nativeElement.style.top = `${yMid}px`;
    line.nativeElement.style.left = `${xMid - distance / 2}px`;
    line.nativeElement.style.transform = `rotate(${angleInDegrees}deg)`;
    line.nativeElement.style.backgroundColor = `black`;
    line.nativeElement.style.position = `absolute`;
    line.nativeElement.style.height = `3px`;
  }
}

//Coordinate Class
export class Coordinate {
  x: number;
  y: number;
}
