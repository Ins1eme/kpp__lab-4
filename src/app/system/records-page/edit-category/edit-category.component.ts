import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'hm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[]  = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId: number = 1;
  currentCategory: Category;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find((category) => category.id === +this.currentCategoryId);
  }

  
  
  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if(capacity < 0) capacity *= -1;

    const category = new Category(name, +capacity, +this.currentCategoryId);

    this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
      }) 
  }

}
