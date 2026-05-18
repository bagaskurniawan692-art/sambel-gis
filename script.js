// Smooth active nav link
function setActive(el) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    el.classList.add('active');
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Update active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  // Form submit feedback
  function handleSubmit() {
    const btn = document.querySelector('.btn-submit');
    btn.textContent = '✓ Pesan Terkirim!';
    btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    setTimeout(() => {
      btn.textContent = 'Kirim Pesan →';
      btn.style.background = '';
    }, 3000);
  }
// ===== MAP LEAFLET DENGAN BASEMAP SWITCH =====
let map;

function initMap() {
  if (map) return;

  // Inisialisasi map
  map = L.map('map', {
  zoomControl: false
}).setView([-7.9666, 112.6326], 13);

// pindahkan zoom control ke kanan atas
L.control.zoom({
  position: 'topright'
}).addTo(map);

  // ===== BASEMAP =====
  
  // 1. Peta biasa (OSM)
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  });

  // 2. Satelit (ESRI)
  const satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: 'Tiles &copy; Esri'
    }
  );

  // default tampil
  satellite.addTo(map);

  // ===== CONTROL SWITCH =====
  const baseMaps = {
    "Peta Biasa": osm,
    "Satelit": satellite
  };

  L.control.layers(baseMaps).addTo(map);

  // Marker contoh
  L.marker([-7.9666, 112.6326])
    .addTo(map)
    .bindPopup("Lowokwaru, Malang")
    .openPopup();
}


// tombol eksplorasi
function openMap() {
  setTimeout(() => {
    initMap();

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

  }, 400);
}
function openMapPage(){

  const transition =
    document.getElementById('transition');

  transition.classList.add('active');

  setTimeout(() => {

    window.location.href = 'map.html';

  }, 2200);

}
const exportBtn =
document.getElementById('exportPNG');

exportBtn.addEventListener('click', () => {

  html2canvas(document.body).then(canvas => {

    const link =
      document.createElement('a');

    link.download =
      'peta-sambel.png';

    link.href =
      canvas.toDataURL();

    link.click();

  });

});
