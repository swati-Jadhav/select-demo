import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent implements OnInit {

  myForm: FormGroup;

  showFilter = true;
  singleSelection = false;

  colors: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.colors = [
      { item_id: 1, item_text: 'Blue' },
      { item_id: 2, item_text: 'Black' },
      { item_id: 3, item_text: 'Gray' },
      { item_id: 4, item_text: 'Red' },
      { item_id: 5, item_text: 'Green' },
      { item_id: 6, item_text: 'Pink' }
    ];
    this.dropdownSettings = {
      singleSelection: this.singleSelection,
      defaultOpen: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableCheckAll: !this.singleSelection,
      itemsShowLimit: 3,
      allowSearchFilter: this.showFilter,
      closeDropDownOnSelection:!this.singleSelection
    };
    this.myForm = this.fb.group({
      color: [this.selectedItems]
    });
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    console.log('form model', this.myForm.get('color').value);
  }
  onItemDeSelect(item: any) {
    console.log('onItem DeSelect', item);
    console.log('form model', this.myForm.get('color').value);
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  onDropDownClose() {
    console.log('dropdown closed');
  }

  toogleShowFilter() {
    this.showFilter = !this.showFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      allowSearchFilter: this.showFilter
    });
  }

  toogleSingleSelection() {
    this.myForm.get('color').setValue([]);
    this.singleSelection = !this.singleSelection;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      singleSelection: this.singleSelection,
      enableCheckAll: !this.singleSelection
    });
  }

  handleReset() {
    this.myForm.get('color').setValue([]);
  }

  handleSubmit() {
    console.log('form model', this.myForm.get('color').value);
    this.selectedItems  = this.myForm.get('color').value;
    alert(JSON.stringify(this.selectedItems));
  }

}
