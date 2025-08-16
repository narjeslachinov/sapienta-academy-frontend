document.addEventListener('DOMContentLoaded', () => {

  // ######## Home Page ##########
  // Navbar Section
  document.querySelectorAll('.main-nav').forEach(nav => {
    const navInner = nav.querySelector('.nav-inner');
    const menuToggle = nav.querySelector('.menu-toggle');
    const menuClose = nav.querySelector('.menu-close');
    const mobileMenu = nav.querySelector('.nav-menu-mobile');

    // Ensure all navbar elements exist before adding events
    if (menuToggle && menuClose && mobileMenu && navInner) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
          mobileMenu.classList.remove('opacity-0', 'scale-95');
          mobileMenu.classList.add('opacity-100', 'scale-100');
        }, 10);
      });

      menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('opacity-100', 'scale-100');
        mobileMenu.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
      });

      // Change navbar background color on scroll
      const rootStyles = getComputedStyle(document.documentElement);
      const primaryLightColor = rootStyles.getPropertyValue('--secondary-verydark-color').trim();
      const whiteBg = 'rgba(255, 255, 255, 0.1)';
      window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
          navInner.style.backgroundColor = primaryLightColor;
          navInner.classList.add('shadow-md');
        } else {
          navInner.style.backgroundColor = whiteBg;
          navInner.classList.remove('shadow-md');
          navInner.style.backdropFilter = 'blur(5px)';
        }
      });
    }
  });
  // End Navbar Section
/* -------------------------
   Modal: Open / Close
-------------------------- */

// Open login modal
function openLoginModal() {
  const overlay = document.getElementById('login-modal-overlay');
  const box = document.getElementById('login-modal-box');

  // Show overlay
  overlay.classList.remove('hidden', 'pointer-events-none', 'opacity-0');
  overlay.classList.add('flex');
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

  // Disable page scroll
  document.body.classList.add('overflow-hidden');

  // Animation for modal box
  setTimeout(() => {
    box.classList.remove('scale-95', 'opacity-0');
    box.classList.add('scale-100', 'opacity-100');
  }, 10);
}
window.openLoginModal = openLoginModal;

// Close login modal
function closeLoginModal() {
  const overlay = document.getElementById('login-modal-overlay');
  const box = document.getElementById('login-modal-box');

  // Animate close
  box.classList.remove('scale-100', 'opacity-100');
  box.classList.add('scale-95', 'opacity-0');

  // Hide overlay after animation ends
  setTimeout(() => {
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100');
    document.body.classList.remove('overflow-hidden');
  }, 300);
}
window.closeLoginModal = closeLoginModal;

/* -------------------------
   Password Toggle (Eye Icon)
   Works for ALL forms
-------------------------- */
document.addEventListener('click', function (e) {
  const btn = e.target.closest('[data-toggle="password"]');
  if (!btn) return;

  const input = btn.previousElementSibling; // password input
  const icon = btn.querySelector('i');

  if (input && input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else if (input) {
    input.type = 'password';
    icon.classList.add('fa-eye');
    icon.classList.remove('fa-eye-slash');
  }
});

/* -------------------------
   Auth Form Switch (Login / Signup)
-------------------------- */
const studentBtn = document.getElementById('StudentForm');
const instructorBtn = document.getElementById('InstructorForm');

const studentLoginForm = document.getElementById('studentloginForm');
const studentSignupForm = document.getElementById('studentSignupForm');
const instructorLoginForm = document.getElementById('instructorLoginForm');
const instructorSignupForm = document.getElementById('instructorSignupForm');

const authSwitchBtn = document.getElementById('authSwitchBtn');
const authSwitchLabel = document.getElementById('authSwitchLabel');

// Switch to student login
studentBtn.addEventListener('click', () => {
  showOnly(studentLoginForm);
  hideAll([studentSignupForm, instructorLoginForm, instructorSignupForm]);
  resetAuthSwitch();
  activateButton(studentBtn, instructorBtn);
});

// Switch to instructor login
instructorBtn.addEventListener('click', () => {
  showOnly(instructorLoginForm);
  hideAll([studentLoginForm, studentSignupForm, instructorSignupForm]);
  resetAuthSwitch();
  activateButton(instructorBtn, studentBtn);
});

// Toggle login/sign-up form (prevent page reload)
authSwitchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleAuthForm();
});

function activateButton(activeBtn, inactiveBtn) {
  activeBtn.classList.add('primaryBtn', 'text-white');
  activeBtn.classList.remove('selectedBarItem');
  inactiveBtn.classList.add('selectedBarItem');
  inactiveBtn.classList.remove('primaryBtn', 'text-white');
}
// Show only one element
function showOnly(element) {
  element.classList.remove('hidden');
}

// Hide multiple elements
function hideAll(elements) {
  elements.forEach(el => el.classList.add('hidden'));
}

// Reset auth switch text
function resetAuthSwitch() {
  authSwitchBtn.textContent = 'Sign up';
  authSwitchLabel.childNodes[0].textContent = "Don't have an account? ";
}

// Toggle between login and sign-up forms
function toggleAuthForm() {
  const isStudentLoginVisible = !studentLoginForm.classList.contains('hidden');
  const isStudentSignupVisible = !studentSignupForm.classList.contains('hidden');
  const isInstructorLoginVisible = !instructorLoginForm.classList.contains('hidden');
  const isInstructorSignupVisible = !instructorSignupForm.classList.contains('hidden');

  if (isStudentLoginVisible) {
    hideAll([studentLoginForm]);
    showOnly(studentSignupForm);
    authSwitchBtn.textContent = 'Login';
    authSwitchLabel.childNodes[0].textContent = 'Already have an account? ';
  } else if (isStudentSignupVisible) {
    hideAll([studentSignupForm]);
    showOnly(studentLoginForm);
    authSwitchBtn.textContent = 'Sign up';
    authSwitchLabel.childNodes[0].textContent = "Don't have an account? ";
  } else if (isInstructorLoginVisible) {
    hideAll([instructorLoginForm]);
    showOnly(instructorSignupForm);
    authSwitchBtn.textContent = 'Login';
    authSwitchLabel.childNodes[0].textContent = 'Already have an account? ';
  } else if (isInstructorSignupVisible) {
    hideAll([instructorSignupForm]);
    showOnly(instructorLoginForm);
    authSwitchBtn.textContent = 'Sign up';
    authSwitchLabel.childNodes[0].textContent = "Don't have an account? ";
  }
}

/* -------------------------
   Closing modal: ESC key / click outside
-------------------------- */
/* -------------------------
   opnen dialoge
-------------------------- */
   const openDialoge = document.getElementById("openDialoge");
    const closeDialoge = document.getElementById("closeDialoge");
    const chatBox = document.getElementById("chatBox");

    openDialoge.addEventListener("click", () => {
        chatBox.classList.remove("hidden");
    });

    closeDialoge.addEventListener("click", () => {
        chatBox.classList.add("hidden");
    });

    document.addEventListener("click", (event) => {
        if (!chatBox.classList.contains("hidden")) {
            if (!chatBox.contains(event.target) && !openDialoge.contains(event.target)) {
                chatBox.classList.add("hidden"); 
            }
        }
    });
    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;
    let timerInterval;
    let seconds = 0;

    const recordBtn = document.getElementById("recordBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const sendBtn = document.getElementById("sendBtn");
    const timer = document.getElementById("timer");
    const file = document.querySelector(".upload-label"); 
    const messageInput = document.getElementById("messageInput");

    function updateTimer() {
    seconds++;
    let m = String(Math.floor(seconds / 60)).padStart(2, '0');
    let s = String(seconds % 60).padStart(2, '0');
    timer.textContent = `${m}:${s}`;
    }

    function toggleSendAndAttach() {
    if (!isRecording) { 
        if (messageInput.value.trim() !== "") {
        sendBtn.style.display = "inline";
        file.style.display = "none";
        } else {
        sendBtn.style.display = "none";
        file.style.display = "inline";
        }
    }
    }

    messageInput.addEventListener("input", toggleSendAndAttach);

    recordBtn.addEventListener("click", async () => {
    if (!isRecording) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = e => {
                if (e.data.size > 0) audioChunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                console.log("Recorded audio:", audioBlob);
                isRecording = false; 
            };

            mediaRecorder.start();
            isRecording = true;

            // UI
            recordBtn.style.display = "none";
            timer.style.display = "inline";
            deleteBtn.style.display = "inline";
            sendBtn.style.display = "inline";
            messageInput.style.display = "none";
            file.style.display = "none";

            // Timer
            seconds = 0;
            timer.textContent = "00:00";
            timerInterval = setInterval(updateTimer, 1000);

        } catch (err) {
            alert("Microphone access denied!");
        }
    }
});

deleteBtn.addEventListener("click", () => {
    if (isRecording && mediaRecorder) {
        mediaRecorder.stop(); 
        clearInterval(timerInterval);
    }
    audioChunks = [];
    deleteBtn.style.display = "none";
    timer.style.display = "none";
    messageInput.style.display = "inline";
    file.style.display = "inline";
    recordBtn.style.display = "inline";
    sendBtn.style.display = "none";
    messageInput.value = "";
    isRecording = false; 
    toggleSendAndAttach();
});

sendBtn.addEventListener("click", () => {
    if (isRecording && mediaRecorder) {
        mediaRecorder.stop(); 
        clearInterval(timerInterval);
    }
    alert("File sent ✅");
    deleteBtn.style.display = "none";
    sendBtn.style.display = "none";
    timer.style.display = "none";
    messageInput.style.display = "inline";
    file.style.display = "inline";
    recordBtn.style.display = "inline";
    messageInput.value = "";
    isRecording = false; 
    toggleSendAndAttach();
});
/* -------------------------
   close dialoge
-------------------------- */

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLoginModal();
});

document.getElementById('login-modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLoginModal();
});

  // --------- Filter Button Groups (Reusable) ----------
  /**
   * Applies group button filtering logic with optional icon and parent color support
   * @param {Object} config
   */
  function setupFilterGroup({selector, selectedClass, unselectedClass, iconSelector, parentSelectedClass}) {
    const buttons = document.querySelectorAll(selector);
    if (!buttons.length) return;
    buttons.forEach(btn => {
      btn.addEventListener('click', function () {
        buttons.forEach(b => {
          b.classList.remove(selectedClass);
          b.classList.add(unselectedClass);
          // Hide icons (if provided)
          if (iconSelector) {
            const icon = b.querySelector(iconSelector);
            if (icon) icon.classList.add('hidden');
            // For contestPreparationBtn
            if (parentSelectedClass && icon && icon.parentElement) {
              icon.parentElement.classList.remove(parentSelectedClass);
            }
          }
        });

        this.classList.add(selectedClass);
        this.classList.remove(unselectedClass);
        // Show icons (if provided)
        if (iconSelector) {
          const icon = this.querySelector(iconSelector);
          if (icon) icon.classList.remove('hidden');
          if (parentSelectedClass && icon && icon.parentElement) {
            icon.parentElement.classList.add(parentSelectedClass);
          }
        }
      });
    });
  }

  // Featured section (button filters)
  setupFilterGroup({
    selector: '.filter-btn',
    selectedClass: 'selectedFilteringTags',
    unselectedClass: 'unselectedFilteringTags'
  });
   // courses section
const coursesCountainer = document.getElementById('coursesCountainer');
const coursesBtn = document.getElementById('coursesBtn');
const fadeEnd = document.getElementById('fadeEnd');

if (coursesCountainer && coursesBtn && fadeEnd) {
  let expanded = false;

  coursesBtn.addEventListener('click', () => {
    expanded = !expanded;
    coursesCountainer.classList.toggle('maxHeight36', !expanded);
    coursesCountainer.classList.toggle('overflow-hidden', !expanded);
    coursesBtn.classList.toggle('rotate-180')
    fadeEnd.classList.toggle('hidden')
    overlay.style.display = expanded ? 'none' : 'block';
  });
}
  // --------- Swiper Sliders Initialization ---------
  if (window.Swiper) {
    // Main Swiper Slider on homepage
    if (document.querySelector('.mySwiper')) {
      new Swiper('.mySwiper', {
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: { delay: 30000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
          0: { slidesPerView: 1, centeredSlides: true, spaceBetween: 15 },
          640: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
          1024: { slidesPerView: 3, centeredSlides: false, spaceBetween: 25 },
          1440: { slidesPerView: 4, centeredSlides: false, spaceBetween: 30 },
        }
      });
    }
    // About section Swiper Slider
    if (document.querySelector('.approvedSectionSwiper')) {
      new Swiper('.approvedSectionSwiper', {
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: { delay: 30000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
          0: { slidesPerView: 1, centeredSlides: true, spaceBetween: 15 },
          640: { slidesPerView: 2, centeredSlides: false, spaceBetween: 20 },
          1024: { slidesPerView: 3, centeredSlides: false, spaceBetween: 25 },
          1440: { slidesPerView: 4, centeredSlides: false, spaceBetween: 30 },
        }
      });
    }
  }

  // --------- Courses Page Filter Button Groups ---------
      // open and close mobile filter pannel
const openBtn = document.getElementById('openMobileFilters');
const closeBtn = document.getElementById('closeMobileFilters');

if (openBtn && closeBtn) {
  openBtn.addEventListener('click', () => {
    document.getElementById('mobileFilterDrawer').classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () => {
    document.getElementById('mobileFilterDrawer').classList.add('hidden');
  });
}


  document.querySelectorAll('.mobileFilterItem').forEach(header => {
  header.style.cursor = 'pointer';  

  header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      if (!content) return;
      content.classList.toggle('hidden');
          const icon = header.querySelector('i');
      if (icon) {
      icon.classList.toggle('rotate-180');  
      }
  });
  });
  setupFilterGroup({
    selector: '.subjectBtn',
    selectedClass: 'selectedFilteringTags',
    unselectedClass: 'unselectedFilteringTags'
  });

  setupFilterGroup({
    selector: '.filteringMobileItem',
    selectedClass: 'selectedBarItem',
    unselectedClass: 'unelectedBarItem'
  });

  setupFilterGroup({
    selector: '.learningFormatBtn',
    selectedClass: 'selectedFilteringTags',
    unselectedClass: 'unselectedFilteringTags',
    iconSelector: 'i'
  });

  setupFilterGroup({
    selector: '.courseEntryBtn',
    selectedClass: 'selectedFilteringTags',
    unselectedClass: 'unselectedFilteringTags',
    iconSelector: 'i'
  });

  setupFilterGroup({
    selector: '.contestPreparationBtn',
    selectedClass: 'selectedFilteringTags',
    unselectedClass: 'unselectedFilteringTags',
  });
  /**
 * This code handles filtering course cards based on user-selected criteria.
 * There are four filter categories: subject, format, entry level, and contest.
 * Clicking a filter button updates the `filters` object and applies filtering
 * by showing/hiding course cards based on matching data attributes.
 */

const filters = {
  subject: null,
  format: null,
  entry: null,
  contest: null,
};

// Find all subject filter buttons (sidebar) and set event listeners
document.querySelectorAll('.subjectBtn').forEach(btn =>
  btn.addEventListener('click', function () {
    // Remove 'selected' class from all other buttons
    document.querySelectorAll('.subjectBtn').forEach(b => b.classList.remove('selectedFilteringTags'));
    this.classList.add('selectedFilteringTags');
    filters.subject = btn.textContent.trim().toLowerCase();
    applyFilters();
  })
);

document.querySelectorAll('.learningFormatBtn').forEach(btn =>
  btn.addEventListener('click', function () {
    document.querySelectorAll('.learningFormatBtn').forEach(b => b.classList.remove('selectedFilteringTags'));
    this.classList.add('selectedFilteringTags');
    filters.format = btn.textContent.trim().toLowerCase();
    applyFilters();
  })
);

document.querySelectorAll('.courseEntryBtn').forEach(btn =>
  btn.addEventListener('click', function () {
    document.querySelectorAll('.courseEntryBtn').forEach(b => b.classList.remove('selectedFilteringTags'));
    this.classList.add('selectedFilteringTags');
    filters.entry = btn.textContent.trim().toLowerCase();
    applyFilters();
  })
);

document.querySelectorAll('.contestPreparationBtn').forEach(btn =>
  btn.addEventListener('click', function () {
    document.querySelectorAll('.contestPreparationBtn').forEach(b => b.classList.remove('selectedFilteringTags'));
    this.classList.add('selectedFilteringTags');
    // Here, value is read from data-contest attribute
    filters.contest = btn.getAttribute('data-contest');
    applyFilters();
  })
);

// Main function to filter course cards
function applyFilters() {
  document.querySelectorAll('.course-card').forEach(card => {
    let show = true;

    // Filter by subject
    if (filters.subject && filters.subject !== 'all subject') {
      let subjectData = card.getAttribute('data-subject') || '';
      show = show && subjectData.includes(filters.subject);
    }
    // Filter by format
    if (filters.format && filters.format !== 'all grade level') {
      let formatData = card.getAttribute('data-format') || '';
      show = show && formatData.includes(filters.format);
    }
    // Filter by entry level
    if (filters.entry && filters.entry !== 'all entry') {
      let entryData = card.getAttribute('data-entry') || '';
      show = show && entryData.includes(filters.entry);
    }
    // Filter by contest preparation
    if (filters.contest && filters.contest !== 'all contests') {
      let contestData = card.getAttribute('data-contest') || '';
      show = show && contestData.includes(filters.contest);
    }

    // Show or hide the card based on the filter match
    card.style.display = show ? '' : 'none';
  });
}

 // --------- Detail Courses Page: Description Toggle & Accordion ---------
const desc = document.getElementById('course-description');
const btn = document.getElementById('toggle-btn');
const overlay = document.getElementById('fade-overlay');

if (desc && btn && overlay) {
  const textSpan = btn.querySelector('.toggle-text');
  const icon = btn.querySelector('.toggle-icon');
  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;

    desc.classList.toggle('max-h-32', !expanded);
    desc.classList.toggle('overflow-hidden', !expanded);
    overlay.style.display = expanded ? 'none' : 'block';

    textSpan.childNodes[0].textContent = expanded ? 'Show Less ' : 'Show More '; 

    if (icon) {
      icon.classList.toggle('rotate-180', expanded); 
    }
  });
}

  // Accordion section for course details. Call as: toggleAccordion('id')
  window.toggleAccordion = function (section, id) {
    const content = document.getElementById(`content-${section}-${id}`);
    const icon = document.getElementById(`icon-${section}-${id}`);
    if (content && icon) {
      content.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
    }
}


  // --------- Detail Courses Page: Video Modal Controls ---------
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const videoModal = document.getElementById('videoModal');
  if (openModalBtn && closeModalBtn && videoModal) {
    openModalBtn.addEventListener('click', () => {
      videoModal.classList.remove('hidden');
    });
    closeModalBtn.addEventListener('click', () => {
      videoModal.classList.add('hidden');
      // Pause the video (reset iframe src)
      const iframe = videoModal.querySelector('iframe');
      if (iframe) iframe.src = iframe.src;
    });
  }

  // --------- About Page: Team Filter Button Logic ---------
  const TeamFilterBtn = document.querySelectorAll('.TeamFilterBtn');
  const sapintaTeamCard = document.querySelectorAll('.sapintaTeamCard');

  if (TeamFilterBtn.length && sapintaTeamCard.length) {
    TeamFilterBtn.forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.dataset.role;
        TeamFilterBtn.forEach(b => {
          b.classList.remove('selectedBarItem');
          b.classList.add('unelectedBarItem');
        });
        btn.classList.add('selectedBarItem');
        btn.classList.remove('unelectedBarItem');

        sapintaTeamCard.forEach(card => {
          const cardRole = card.dataset.role;
          if (role === 'all' || cardRole === role) {
            card.classList.remove('hidden');
            card.classList.add('block'); // Card layout is flex
          } else {
            card.classList.remove('block');
            card.classList.add('hidden');
          }
        });
      });
    });
  }

// --------- R&D Page: animation title ---------
  
  const quote = "\"Learning is not the product of teaching. Learning is the product of the activity of learners.\" – John Holt";
const quoteElement = document.getElementById("animated-quote");
if (quoteElement) {
  let i = 0;
  function typeWriter() {
    if (i < quote.length) {
      quoteElement.innerHTML += quote.charAt(i);
      i++;
      setTimeout(typeWriter, 30);
    }
  }
  typeWriter();
}
// detail blog page
  // <!-- Reply Toggle Script -->
document.querySelectorAll('.reply-btn').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;

    if (content && content.classList.contains('reply-form')) {
      content.classList.toggle('hidden');
      button.textContent = content.classList.contains('hidden') ? 'Reply' : 'Close';
    }
  });
});


  

}); // End DOMContentLoaded
