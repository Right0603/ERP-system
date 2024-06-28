import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BillOfMaterialDto, Client, ProductDto } from 'app/api-client/api-client';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-of-materials-details',
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    FormsModule],
  templateUrl: './bill-of-materials-details.component.html',
  styleUrl: './bill-of-materials-details.component.css'
})
export class BillOfMaterialsDetailsComponent {
  client = new Client('https://localhost:44340');
  bill: BillOfMaterialDto = new BillOfMaterialDto();
  id: number;
  hours: number;
  minutes: number;
  duration: string;
  product: ProductDto;


  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.fetchData();
  }

  async fetchData() {
    try {
      this.bill = await this.client.billsOfMaterialsGET(this.id);
      this.duration = this.bill.duration.slice(0, -9);
      this.hours = Math.floor(Number(this.duration) / 3600);
      this.minutes = (Number(this.duration) - this.hours*3600) / 60;
      this.product = await this.client.productsGET(this.bill.fk_product);
    } catch (error) {
      console.error(error);
    }
  }

  update(){
    this._router.navigate(['/mrp/bills', this.id]);
  }
}