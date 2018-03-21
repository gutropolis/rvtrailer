import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms'
@Component({
  selector: 'rv-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  newFirstDate: any;
  newSecondDate: any;
  
  public getFirstDate: Date[] = [];
  public getSecondDate: Date[] = [];



  onchangeFunction(targetVal, targetVal2, targetVal3){
  		 
		targetVal2.value = '';
		targetVal3.value = '';
		console.log(targetVal.value.length);

		for(let i = 0; i <= 9; i++){

			this.getFirstDate.push(targetVal.value[i]);

		}
		
		this.newFirstDate = this.getFirstDate.toString();
		targetVal2.value= this.newFirstDate.replace(/,/g , '');

		console.log(targetVal2.value)



		for(let i = 13; i <= 23; i++){

			this.getSecondDate.push(targetVal.value[i]);

		}

		this.newSecondDate = this.getSecondDate.toString();
		targetVal3.value= this.newSecondDate.replace(/,/g , '');
		console.log(targetVal3.value)

		targetVal.value= this.newFirstDate.replace(/,/g , '');
  }


//my date picker

  myForm: FormGroup;
 // bsValue = new Date();
 // bsRangeValue: Date[];
 // maxDate = new Date();
  constructor(private formBuilder: FormBuilder) {
    this.maxDate.setDate(this.maxDate.getDate() + 8);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    
      this.myForm = this.formBuilder.group({
       
        range: null
      });
   }

  ngOnInit() {

   
  }
  onsubmit()
  {
    console.log('Start Date  '+this.myForm.value.range[0]);
    console.log('End Date  ' +this.myForm.value.range[1]);
    
  }

}
