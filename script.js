const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCredit = document.getElementById('lightbox-credit');

let currentImages = [];
let currentIndex = 0;

const UNSPLASH_ACCESS_KEY = 'xXus-wTWbWXDGtMN3-aTCVMHn5l-k4Q45XMO9_xw2lA';

async function loadImages(query = 'nature') {
  gallery.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${UNSPLASH_ACCESS_KEY}`);
    const data = await res.json();

    // Store image + credit info
    currentImages = data.results.map(img => ({
      url: img.urls.regular,
      userName: img.user.name,
      userLink: img.user.links.html,
      photoLink: img.links.html
    }));

    displayImages(currentImages);
  } catch (err) {
    console.error(err);
    gallery.innerHTML = "<p>Error loading images.</p>";
  }
}

function displayImages(images) {
  gallery.innerHTML = '';
  images.forEach((imgObj, index) => {
    const div = document.createElement('div');
    div.classList.add('image');
    const img = document.createElement('img');
    img.src = imgObj.url;
    img.alt = "Gallery Image";
    img.onclick = () => openLightbox(index);
    div.appendChild(img);
    gallery.appendChild(div);
  });
}

function openLightbox(index) {
  currentIndex = index;
  const imgData = currentImages[index];
  lightboxImg.src = imgData.url;

  // Display credit
  lightboxCredit.innerHTML = `
    <p style="color: #ccc; font-size: 14px; margin-top: 15px;">
      Photo by 
      <a href="${imgData.userLink}" target="_blank" style="color: #6e8efb; text-decoration: none;">
        ${imgData.userName}
      </a> 
      on 
      <a href="${imgData.photoLink}" target="_blank" style="color: #6e8efb; text-decoration: none;">
        Unsplash
      </a>
    </p>
  `;

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function changeImage(step) {
  currentIndex += step;
  if (currentIndex < 0) currentIndex = currentImages.length - 1;
  if (currentIndex >= currentImages.length) currentIndex = 0;

  const imgData = currentImages[currentIndex];
  lightboxImg.src = imgData.url;

  // Update credit
  lightboxCredit.innerHTML = `
    <p style="color: #ccc; font-size: 14px; margin-top: 15px;">
      Photo by 
      <a href="${imgData.userLink}" target="_blank" style="color: #6e8efb; text-decoration: none;">
        ${imgData.userName}
      </a> 
      on 
      <a href="${imgData.photoLink}" target="_blank" style="color: #6e8efb; text-decoration: none;">
        Unsplash
      </a>
    </p>
  `;
}

// Load default category
loadImages('nature');
