import { Component } from '@angular/core';

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

  ngOnInit(): void {
    this.initMap();
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
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
      const markerOptions = {
        icon: customIcon,
      };
      const marker = L.marker(event.latlng, markerOptions).addTo(this.map);
      marker.bindPopup('This is a marker popup').openPopup();
      marker.on('click', (event: L.LeafletMouseEvent) => {
      marker.openPopup();
    });
    });

    
  }
}
