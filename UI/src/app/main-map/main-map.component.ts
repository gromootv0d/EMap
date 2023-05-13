import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss']
})
export class MainMapComponent {
  private map: any;
  private marker: any;
  private lat = 55.751244;
  private lng = 37.618423;
  private zoom = 13;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.fetchMarkerData();
  }

  private initMap(): void {
    
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: this.zoom,
      attributionControl: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(this.map);
    this.map.invalidateSize();

    this.map.on('contextmenu', (event: L.LeafletMouseEvent) => {
      const customIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/446/446075.png',
        iconSize: [30, 30],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      const markerOptions = {
        icon: customIcon,
      };
      const marker = L.marker(event.latlng, markerOptions).addTo(this.map);

      // Create the description input field
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.placeholder = 'Enter a description';

    // Create the confirmation button
    const confirmButton = document.createElement('button');
    confirmButton.innerText = 'Confirm';
    confirmButton.addEventListener('click', () => {
      this.confirmMarker(marker, descriptionInput.value);
    });

    // Create the popup content
    const popupContent = document.createElement('div');
    popupContent.appendChild(descriptionInput);
    popupContent.appendChild(confirmButton);

    marker.bindPopup(popupContent).openPopup();
      marker.on('click', () => {
        marker.openPopup();
      });
    });
    }

  private confirmMarker(marker: any,  description: string): void {
    // Save the marker coordinates
    const { lat, lng } = marker.getLatLng();
    this.saveMarker(lat, lng, description);
  
    // Close the popup after confirmation
    marker.closePopup();
  }

  private saveMarker(latitude: number, longitude: number, description: string): void {
    const markerData = { latitude, longitude, description };
    console.log(markerData);
    
    // Send a POST request to your API to save the marker coordinates
    this.http.post('https://localhost:44367/Marker', markerData)
    .subscribe({
      next: (response) => {
        console.log('Marker saved successfully!', response);
        // Next handler code
      },
      error: (error) => {
        console.error('Failed to save marker !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', error);
        this.removeMarker();
        // Error handler code
      },
      complete: () => {
        // Complete handler code
      }
    });      
  }

  private removeMarker(): void {
    console.log(this.marker);
    // Remove the marker from the map\ 
    console.log("error! marker removed!");
  }

  private fetchMarkerData(): void {
    this.http.get<Marker[]>('https://localhost:44367/Marker')
      .subscribe(
        (data: Marker[]) => {
          console.log(data);
          
          data.forEach((markerData: Marker) => {
            const { latitude, longitude, description } = markerData;
            this.addMarkerToMap(latitude, longitude, description);
          });
        },
        (error: any) => {
          console.error('Failed to fetch marker data:', error);
        }
      );
  }
  

  private addMarkerToMap(lat: number, lng: number, description: string): void {
    const customIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/446/446075.png',
      iconSize: [30, 30],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
    const markerOptions = {
      icon: customIcon,
    };
    const marker = L.marker([lat, lng], markerOptions).addTo(this.map);
    marker.bindPopup(description).openPopup();
  }
  
}

interface Marker {
  latitude: number;
  longitude: number;
  description: string;
}