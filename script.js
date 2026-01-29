document.addEventListener('DOMContentLoaded', function () {
  const activitiesList = document.getElementById('activitiesList');
  const activityForm = document.getElementById('activityForm');
  const addModal = $('#addModal');

  //create list item element
  function createActivityElement({ title, meta }) {
    const li = document.createElement('li');
    li.className = 'list-group-item activity-item d-flex align-items-center justify-content-between manage';

    li.innerHTML = `
      <div class="activity-main">
        <div class="activity-title">${escapeHtml(title)}</div>
        <div class="activity-meta text-muted">${escapeHtml(meta || '')}</div>
      </div>

      <div class="activity-actions d-flex align-items-center">
        <button class="btn btn-link done-indicator" title="Done" aria-hidden="true" type="button">
          <i class="fas fa-check-circle"></i>
        </button>

        <div class="dropdown dropleft">
          <button class="btn btn-link ellipsis-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button">
            <i class="fas fa-ellipsis-v"></i>
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item mark-done" type="button">Mark as Done</button>
            <button class="dropdown-item delete-item" type="button">Delete</button>
          </div>
        </div>
      </div>
    `;

    // Attach event listeners for mark and delete
    const markBtn = li.querySelector('.mark-done');
    const deleteBtn = li.querySelector('.delete-item');

    markBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      li.classList.toggle('is-done');
      
      $(markBtn).closest('.dropdown').removeClass('show').find('.dropdown-menu').removeClass('show');
    });

    deleteBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      li.remove();
    });

    return li;
  }

/////
  activityForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const nick = document.getElementById('nickName').value.trim();
    const date = document.getElementById('dateOfBirth').value;

    // Choose values
    const title = nick || fullName || 'New Activity';
    const metaParts = [];
    if (date) metaParts.push(date);
    if (fullName) metaParts.push(fullName);
    const meta = metaParts.join(' | ');

    const newItem = createActivityElement({ title, meta });
    activitiesList.appendChild(newItem);

    activityForm.reset();
    addModal.modal('hide');
  });

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  document.addEventListener('click', function (e) {
    const openDrop = document.querySelector('.dropdown.show');
    if (openDrop && !openDrop.contains(e.target)) {
      $(openDrop).removeClass('show').find('.dropdown-menu').removeClass('show');
    }
  });


});