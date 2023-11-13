import { Component } from '@angular/core';
import { itemsForHeader } from 'src/app/constants';

@Component({
  selector: 'app-items-for-selling-drops-header',
  templateUrl: './items-for-selling-drops-header.component.html',
  styleUrls: ['./items-for-selling-drops-header.component.scss']
})
export class ItemsForSellingDropsHeaderComponent {
  itemsForSelling=itemsForHeader
}
