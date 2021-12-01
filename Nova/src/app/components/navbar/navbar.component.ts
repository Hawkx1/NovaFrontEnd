import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces/product';
import { DataService } from 'src/app/services/data.service';
import { ConnectableObservable, Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  cart = faShoppingCart;
  products: Product[] = [];
  productNames: String[] = [];
  productsService: ProductsService;
  searchForm!: FormGroup;
  message!: String;
  subscription!: Subscription;
  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data => {
      let setGames: Set<String> = new Set;
      for(const item of data) {
        let {productId, title, genre, price, rating, endpoint, platform, imageUrl, cart} = item;
        this.products.push({productId, title, genre, price, rating, endpoint, platform, imageUrl, cart});
        setGames = new Set(this.products.map(p => p.title));
      }
      for (const title of setGames) {
        this.productNames.push(title);
      }
      this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
    })
  }

  showDropDown = false;

  async toggleSearchOff() {
    setTimeout(() => {
      this.showDropDown = false;
    }, 50)
    //console.log('...timeout passed.');
    
  }

  //Check If the value of the form group exists or not
  toggleSearchOn() {
    if (this.searchForm.value.search === null || this.searchForm.value.search === '') {
      this.showDropDown = false;
    } else {
      this.showDropDown = true;
    }
  }

  constructor( private fb: FormBuilder, _productsService: ProductsService, private data: DataService) {
    this.initForm()
    this.productsService = _productsService;
  }

  initForm(): FormGroup {
    return this.searchForm = this.fb.group({
      search: [null]
    })
  }

  getSearchValue() {
    this.showDropDown = true;
    return this.searchForm.value.search;
    
  }

  searchFor(value: any) {
    this.showDropDown = false;
    let a = this.searchForm.value.search;
    this.data.changeMessage(a)
    
    
  }

  selectValue(value: any) {
    
    this.searchForm.patchValue({"search": value});
    this.showDropDown = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
}



