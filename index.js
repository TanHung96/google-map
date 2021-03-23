function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  var myLatlng = new google.maps.LatLng(10.901243, 106.795257);
  var schLatlng = new google.maps.LatLng(10.845854060340471,106.79454802852483);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 20,
    center: myLatlng,
  });
  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);


  //Hiển thị thông tin
  const infowindow1 = new google.maps.InfoWindow({
    content:
      '<div id="content"><b>Nguyen Dang Tan Hung</b> <br> MSSV: 5951071126<br> Mail: 5951071126@st.utc2.edu.vn</div>',
    position: myLatlng,
  });

  //Hiển thị thông tin
  const infowindow2 = new google.maps.InfoWindow({
    content:
      '<div id="content"><b>PHÂN HIỆU TRƯỜNG ĐH GTVT TẠI TP. HỒ CHÍ MINH</b> <br> 450-451 Le Van Viet, Tang Nhon Phu A Ward, Thu Duc City</div>',
    position: schLatlng,
  });

  // Marker
  const marker = new google.maps.Marker({
    position: myLatlng,
    title: "My house",
    map: map,
    icon: "./img/hungimg.jpg",
  });

  const marker1 = new google.maps.Marker({
    position: schLatlng,
    title: "Đại học GTVT Phân hiệu Tp.HCM",
    map: map,
    icon: "./img/utc2.jpg",
  });

  
  google.maps.event.addListener(marker, "click", function () {
    infowindow1.open(map, marker);
  });
  google.maps.event.addListener(marker1, "click", function () {
    infowindow2.open(map, marker1);
  });
}

google.maps.event.addDomListener(window, "load", initMap);
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}