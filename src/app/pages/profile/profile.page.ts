import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  event: any;
  schedule: any;
  eventRegistrationData: any;
  industries: any;
  registered: any;
  user_data: any;
  receive_notifications1:any;
  receive_notifications2:any;
  receive_notifications:any;
  constructor(
    public eventsService: EventsService,
    public router: Router,
    public alertController: AlertController,
    public loader: LoadingController,
    public user_service: UserService
  ) {
    this.registered = false;
  }

  ngOnInit() {
    this.industries = [];
    this.getIndustries();
    this.updateUserData();
    this.user_data = {
      first_name: this.user_service.user.first_name,
      last_name: this.user_service.user.last_name,
      company: this.user_service.user.company,
      email: this.user_service.user.email,
      phone: this.user_service.user.phone,
      title: this.user_service.user.title,
      customer_type: this.user_service.user.customer_type,
      industry: this.user_service.user.industry,
      receive_notifications: this.user_service.user.receive_notifications,
      password:''
    }
    if(this.user_service.user.receive_notifications==1){
      this.receive_notifications1=true;
      this.receive_notifications2=false;
    }
    else{
      this.receive_notifications1=false;
      this.receive_notifications2=true;
    }
    console.log(this.user_service.user);
   console.log(this.user_service.user.industry);
  }
  
  receive_notification(val){
    this.receive_notifications=val;
    if(this.receive_notifications==1){
      this.receive_notifications1=true;
      this.receive_notifications2=false;
    }
    else{
      this.receive_notifications1=false;
      this.receive_notifications2=true;
    }
  }
  updateProfile(form: NgForm) {
    var validate = this.validateProfile(form.value);
    if(validate){
      this.showAlert('Invalid Input',validate)
      return false;
    }
    this.update(form.value);
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

  validateProfile(formObj){
    if(formObj.first_name == ""){
      return "Invalid First Name"
    }

    if(formObj.last_name == ""){
      return "Invalid Last Name"
    }

    if(formObj.company == ""){
      return "Invalid Company Name"
    }

    if(formObj.title == ""){
      return "Invalid Title"
    }

    if(formObj.industry == "" || formObj.industry == null){
      return "Invalid Industry"
    }

    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailIsValid = emailRegex.test(formObj.email);

    if(!emailIsValid){
      return "Invalid Email"
    }

    let phoneIsValid = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(formObj.phone);
    if(!phoneIsValid){
      return "Invalid Phone"
    }

    if(formObj.password != ""){
      if(formObj.password.length < 4){
        return "Invalid Password"
      }
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

  updateUserData(){
    this.user_service.getUserDataFromApi().subscribe();
  }
  update(data){
    this.loader.create({
      message: 'Updating'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    
    this.user_service.updateUser(data,this.receive_notifications).subscribe(
      data => {
        this.loader.dismiss();
        this.updateUserData();
        this.showAlert('Success','User profile updated successfully');
      },
      error => {
        console.log(error)
        this.loader.dismiss();
      },
      () => {      
      }
    );
  }


}
