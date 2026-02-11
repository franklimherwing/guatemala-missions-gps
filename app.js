if('serviceWorker' in navigator){
 navigator.serviceWorker.register('service-worker.js');
}

function startGPS(){
 navigator.geolocation.watchPosition(showLocations);
}

function showLocations(position){

 let userLat = position.coords.latitude;
 let userLng = position.coords.longitude;
 let output="";

 locations.forEach(place=>{

   let distance=getDistance(userLat,userLng,place.lat,place.lng);

   if(distance<10){
     output+=`
     <div class="card">
     <h3>${place.name}</h3>
     <p>${place.info}</p>
     <p><b>Interesting Fact:</b> ${place.fact}</p>
     </div>`;
   }

 });

 document.getElementById("output").innerHTML=output;
}

function getDistance(lat1,lon1,lat2,lon2){
 let R=6371;
 let dLat=(lat2-lat1)*Math.PI/180;
 let dLon=(lon2-lon1)*Math.PI/180;

 let a=Math.sin(dLat/2)**2+
 Math.cos(lat1*Math.PI/180)*
 Math.cos(lat2*Math.PI/180)*
 Math.sin(dLon/2)**2;

 return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

