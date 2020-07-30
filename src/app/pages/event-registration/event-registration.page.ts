import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.page.html',
  styleUrls: ['./event-registration.page.scss'],
})
export class EventRegistrationPage implements OnInit {
  event: any;
  schedule: any;
  eventRegistrationData: any;
  industries: any;
  registered: any;
  user_data: any;
  payment:any;
  Total : any;
  payment_method:any;
  payment_method_cc:any;
  payment_method_check:any;
  errorMessage:any;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public alertController: AlertController,
    public loader: LoadingController,
    public user_service: UserService
  ) {
    
    this.registered = false;
    this.user_data = {
      first_name: this.user_service.user.first_name,
      last_name: this.user_service.user.last_name,
      company: this.user_service.user.company,
      email: this.user_service.user.email,
      phone: this.user_service.user.phone,
      title: this.user_service.user.title,
      industry: this.user_service.user.industry,
    }
    
    this.payment_method_cc=false;
    this.payment_method_check=true;

    this.payment = {
      payment_method:"check",
      check_number:"",
      cc_number:"",
      cc_name:this.user_service.user.first_name+" "+this.user_service.user.last_name,
      expiration_month:"",
      expiration_year:"",
      ccv:"",
      billing_address:"",
      billing_city:"",
      billing_state:"", billing_zip:"",
    }
    this.event = this.eventsService.current_selected_event_data;
    this.Total = parseFloat(this.event.cost_per_person).toFixed(2);
    for(let x = 0; x < this.event.schedules.length; x++){
      this.event.schedules[x].is_active = false;
    }
    

  }
  
  // Marks a schedule as selected to be used for custom schedules
  selectCustomSchedule(key,subkey){
    console.log(key+" - "+subkey)
    if(!this.event.grouped_schedules[key][subkey].selected){

      let selected_schedule_start_timestamp = this.event.grouped_schedules[key][subkey].start_timestamp;
      let selected_schedule_end_timestamp = this.event.grouped_schedules[key][subkey].end_timestamp;
      
      this.event.grouped_schedules[key][subkey].selected = true;
    }else{
      this.event.grouped_schedules[key][subkey].selected = false;
    }
    console.log("dri"+ this.event.grouped_schedules[key][subkey].selected);
  }

  ngOnInit() {
    if(this.eventsService.current_selected_event_id == undefined){
      this.router.navigate(['/']);
    }
    this.event = this.eventsService.current_selected_event_data;
    for(let x = 0;x<this.event.schedules.length;x++){
      if(this.event.schedules[x].id == this.eventsService.current_selected_event_schedule_id){
        this.schedule = this.event.schedules[x];
        break;
      }
    }

    this.industries = [];
    this.getIndustries();

    this.payment.payment_method="check";
  }

  formatDateKey(date) {
    let dateStri= date.split("-");
    let year = 20+dateStri[2];
    let f = new Date(year, dateStri[0] - 1, dateStri[1]);
    let dateConverted = f.toString()
    return dateConverted;
  }


  registerEvent(form: NgForm) {
    var validate = this.validateRegistration(form.value);
    if(validate){
      this.showAlert('Invalid Input',validate)
      return false;
    }

    this.register(form.value);
  }

  async showAlert(title,message){
    const alert = await this.alertController.create({
      header: title,
      subHeader: '',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  
  payment_method_event(val){
    this.payment_method=val;
    if(this.payment_method==1){
      this.payment_method_cc=true;
      this.payment_method_check=false;
    }
    else{
      this.payment_method_cc=false;
      this.payment_method_check=true;
    }
  }

  validateRegistration(formObj){
    if(formObj.first_name == ""  || formObj.first_name.length < 2){
      return "Invalid First Name"
    }

    if(formObj.last_name == "" || formObj.last_name.length < 2){
      return "Invalid Last Name"
    }

    if(formObj.company == "" || formObj.company.length < 2){
      return "Invalid Company Name"
    }

    if(formObj.title == "" || formObj.title.length < 2){
      return "Invalid Title"
    }
    if((formObj.check_number == "" && this.payment_method!='1')){
      return "Invalid Check"
    }
    
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailIsValid = emailRegex.test(formObj.email);

    if(!emailIsValid){
      return "Invalid Email"
    }

    let phoneIsValid = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(formObj.telephone);
    if(!phoneIsValid){
      return "Invalid Phone"
    }
    
    return false;
  }

  getIndustries(){
    this.eventsService.getAllEventsIndustriesApi().subscribe(
      data => {
        this.industries = data
      },
      error => {
        console.log(error)
      },
      () => {}
    );
  }

  register(data){
    console.log(data);
     data.event_schedule_id = [];
     data.event_id = [];
    for(let key in this.event.grouped_schedules){
      for(let subkey in this.event.grouped_schedules[key]){
        if(this.event.grouped_schedules[key][subkey].selected){
          console.log(this.event.grouped_schedules[key][subkey].id);
          console.log(this.event.grouped_schedules[key][subkey].event_id);
          data.event_schedule_id.push(this.event.grouped_schedules[key][subkey].id);
          data.event_id.push(this.event.grouped_schedules[key][subkey].event_id);
          /*data.push(
            {
              'event_schedule_id':this.event.grouped_schedules[key][subkey].id,
              'event_id':this.event.grouped_schedules[key][subkey].event_id,
            }
          )*/
        }
      }
    }
    this.loader.create({
      message: 'Registering'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    
    this.eventsService.registerEvent(data,this.event.id).subscribe(
      data => {
        this.industries = data
      },
      error => {
        console.log(error)
        console.log("Invalid Credit Card");
          this.errorMessage="Invalid CC";
          this.registered = false;
          alert("Invalid CC");
          this.loader.dismiss();
      },
      () => {
        console.log(data.success);
       
          console.log("valid cc");
          this.updateEvent(this.event.id);
          this.registered = true;
      }
    );
  }

  updateEvent(id){
    this.eventsService.getEventData(id).subscribe(
      data => {
        this.loader.dismiss();
        this.eventsService.setCurrentSelectedEvent(id);
        this.eventsService.setCurrentSelectedEventData(data);
        this.event = this.eventsService.current_selected_event_data;
        this.loader.dismiss();
      },
      error => {
        console.log(error);
      },
      () => {
        this.loader.dismiss();
      }
    );
  }

  formatDate(date) {
    return date.replace(/\s/g, "T");
  }
  
  addTotal(val){
    this.Total = parseFloat(this.Total) + parseFloat(val);
    //console.log("add "+this.Total);
    this.Total=parseFloat(this.Total).toFixed(2);
  }
  deductTotal(val){
    this.Total = parseFloat(this.Total) - parseFloat(val);
    //console.log("minus "+this.Total);
    this.Total=parseFloat(this.Total).toFixed(2);
  }
}
