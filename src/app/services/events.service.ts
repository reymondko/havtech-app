import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  events: any;
  special_events: any;
  general_events: any;
  upcoming_events: any;
  learning_informations: any;
  my_events: any;
  current_selected_event_id: Number;
  current_selected_event_data: any;
  current_selected_event_schedule_id: Number;
  current_map: any;
  constructor(
    private http: HttpClient,
    private env: EnvService,
    private auth: AuthService
  ){}

  // Get all events from the api and set the events state value
  getAllEventsDataFromApi(type = null) {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/events', { headers: headers })
    .pipe(
      tap(events => {
        this.events = events;
        return events;
      })
    )
  }

  // Get all special events from the api and set the special_events state value
  getAllSpecialEventsDataFromApi() {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/events/2', { headers: headers })
    .pipe(
      tap(special_events => {
        this.special_events = special_events;
        return special_events;
      })
    )
  }

  // Get all learning informations from the api and set the learning_informations state value
   getAllLearningInformationDataFromApi() {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/events/3', { headers: headers })
    .pipe(
      tap(learning_informations => {
        this.learning_informations = learning_informations;
        return learning_informations;
      })
    )
  }

  // Get all learning informations from the api and set the learning_informations state value
  getAllmyEventsDataFromApi() {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/events/99', { headers: headers })
    .pipe(
      tap(my_events => {
        this.my_events = my_events;
        return my_events;
      })
    )
  }
  // Get all General events from the api and set the general_events state value
  getAllGeneralEventsDataFromApi() {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/events/1', { headers: headers })
    .pipe(
      tap(general_events => {
        this.general_events = general_events;
        return general_events;
      })
    )
  }

  // Get single event data from event id provided
  getEventData(id){
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/event/' + id, { headers: headers })
    .pipe(
      tap(current_selected_event_data => {
        this.current_selected_event_data = current_selected_event_data;
        return current_selected_event_data;
      })
    )
  }

  // Updates the selected event data from  this -> `current_selected_event_id`
  updateSelectedEventData(){
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/event/' + this.current_selected_event_id, { headers: headers })
    .pipe(
      tap(current_selected_event_data => {
        this.current_selected_event_data = current_selected_event_data;
        return current_selected_event_data;
      })
    )
  }

  // Upload photos from the current selected event
  uploadEventPhotos(images: any) {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.post(this.env.API_URL + 'auth/event/photos/upload',
    {event_id: this.current_selected_event_id, images: images},
    {headers: headers}
    ).pipe(
      tap(result => {
        console.log(result);
      }),
    );
  }

  // Get all industries
  getAllEventsIndustriesApi() {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/industries', { headers: headers })
    .pipe(
      tap(industries => {
        return industries;
      })
    )
  }

  // Upload photos from the current selected event
  registerEvent(data,event_id) {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.post(this.env.API_URL + 'auth/event/register/'+event_id,
    {data: data},
    {headers: headers}
    ).pipe(
      tap(result => {
        console.log(result);
      }),
    );
  }

  // Saves custom schedule
  saveCustomEventSchedule(data) {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.post(this.env.API_URL + 'auth/event/custom-schedule/save',
    {data: data},
    {headers: headers}
    ).pipe(
      tap(result => {
        console.log(result);
      }),
    );
  }

  // Saves custom schedule
  deleteCustomEventSchedule(id) {
    const headers = new HttpHeaders({
      'Authorization': this.auth.token["token_type"]+" "+this.auth.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/event/custom-schedule/delete/'+id,{headers: headers}
    ).pipe(
      tap(result => {
        console.log(result);
      }),
    );
  }
  
  // Set current_selected_event_id state value based on the `id` passed
  setCurrentSelectedEvent(id){
    return this.current_selected_event_id = id
  }

  // Set current_selected_event_id state value based on the `id` passed
  setCurrentSelectedEventData(data){
    return this.current_selected_event_data = data
  }

  // Set current_selected_event_schedule_id based on the `id` passed
  setCurrentSelectedEventScheduleId(id){
    return this.current_selected_event_schedule_id = id
  }

  // Set current_map_url based on the `url` passed
  setCurrentSelectedMap(data){
    return this.current_map = data
  }

}
