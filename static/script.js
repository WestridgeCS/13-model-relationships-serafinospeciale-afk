document.querySelectorAll('.delete-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const form = btn.closest('form');

    if (btn.confirming === 'true') {
      form.submit();
      return;
    }

    btn.confirming = 'true';
    btn.textContent = 'Confirm delete';

    setTimeout(() => {
      btn.confirming = 'false';
      btn.textContent = 'Delete';
    }, 3000);
  });
});

